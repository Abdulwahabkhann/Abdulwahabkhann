from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import pandas as pd
import numpy as np

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def calculate_rsi(prices: pd.Series, period: int = 14) -> float:
    delta = prices.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()

    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi.iloc[-1]

def calculate_macd(prices: pd.Series, fast_period: int = 12, slow_period: int = 26, signal_period: int = 9):
    fast_ema = prices.ewm(span=fast_period, adjust=False).mean()
    slow_ema = prices.ewm(span=slow_period, adjust=False).mean()
    macd_line = fast_ema - slow_ema
    signal_line = macd_line.ewm(span=signal_period, adjust=False).mean()

    macd_histogram = macd_line - signal_line

    return {
        "macd_line": macd_line.iloc[-1],
        "signal_line": signal_line.iloc[-1],
        "histogram": macd_histogram.iloc[-1]
    }

def calculate_bollinger_bands(prices: pd.Series, window: int = 20, num_std_dev: int = 2):
    middle_band = prices.rolling(window=window).mean()
    std_dev = prices.rolling(window=window).std()
    upper_band = middle_band + (std_dev * num_std_dev)
    lower_band = middle_band - (std_dev * num_std_dev)

    return {
        "upper_band": upper_band.iloc[-1],
        "middle_band": middle_band.iloc[-1],
        "lower_band": lower_band.iloc[-1]
    }

@app.get("/signals/{coin_id}")
async def get_signals(coin_id: str = "bitcoin", vs_currency: str = "usd", days: int = 90):
    """
    Fetches historical market data for a given coin and calculates trading signals.
    """
    url = f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart"
    params = {
        "vs_currency": vs_currency,
        "days": days,
        "interval": "daily"
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error fetching data from CoinGecko: {e.response.text}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

    prices_data = data.get("prices", [])
    if not prices_data:
        raise HTTPException(status_code=404, detail="No price data found for the given coin.")

    df = pd.DataFrame(prices_data, columns=['timestamp', 'price'])
    prices = df['price']

    try:
        rsi = calculate_rsi(prices)
        macd = calculate_macd(prices)
        bollinger_bands = calculate_bollinger_bands(prices)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating signals: {str(e)}")

    return {
        "coin_id": coin_id,
        "rsi": rsi,
        "macd": macd,
        "bollinger_bands": bollinger_bands
    }

@app.get("/")
def read_root():
    return {"message": "SIDRA Trading Hub Backend is running."}
