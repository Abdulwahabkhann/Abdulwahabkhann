'use client';

import React, { useEffect, useState } from 'react';
import TradingViewWidget from '@/components/TradingViewWidget';
import GoBackButton from '@/components/GoBackButton';

// Helper function to format numbers
const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K';
  }
  return num.toString();
};

interface CoinGeckoData {
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
  };
}

const PriceChartPage = () => {
  const [data, setData] = useState<CoinGeckoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // NOTE: Using Bitcoin as a placeholder for SIDRA token
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
        if (!response.ok) {
          throw new Error('Failed to fetch data from CoinGecko');
        }
        const result: CoinGeckoData = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const marketData = data?.market_data;
  const price = marketData?.current_price?.usd ?? 0;
  const change24h = marketData?.price_change_percentage_24h ?? 0;
  const marketCap = marketData?.market_cap?.usd ?? 0;
  const totalVolume = marketData?.total_volume?.usd ?? 0; // Using total volume as a proxy for liquidity

  return (
    <section id="charts" className="py-16">
      <div className="container mx-auto">
        <GoBackButton />
        <h2 className="font-heading text-4xl font-bold text-center mb-8">
          Live Price & Chart
        </h2>
        <div className="bg-primary p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : marketData ? (
              <>
                <div>
                  <p className="text-sm text-gray-400">BITCOIN/USDT</p>
                  <p className="text-3xl font-bold text-accent">${price.toLocaleString()}</p>
                  <p className={`text-sm ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change24h.toFixed(2)}% (24h)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="font-mono">${formatNumber(marketCap)}</p>
                  <p className="text-sm text-gray-400">Volume (24h)</p>
                  <p className="font-mono">${formatNumber(totalVolume)}</p>
                </div>
              </>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
          <div className="h-[500px] bg-primary rounded-lg">
            <TradingViewWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceChartPage;
