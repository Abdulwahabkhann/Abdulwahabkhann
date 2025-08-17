'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const currentContainer = container.current;
      if (!currentContainer) {
        return;
      }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": true,
          "studies": [
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies",
            "BollingerBands@tv-basicstudies"
          ],
          "container_id": "tradingview_chart_container",
          "backgroundColor": "#0A1A2F",
          "gridColor": "rgba(0, 209, 255, 0.1)",
          "support_host": "https://www.tradingview.com"
        }`;
      currentContainer.appendChild(script);

      return () => {
        if (currentContainer && currentContainer.contains(script)) {
          currentContainer.removeChild(script);
        }
      }
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div id="tradingview_chart_container" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);
