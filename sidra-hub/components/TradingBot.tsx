import React from 'react';

const TradingBot = () => {
  return (
    <section id="bot" className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="font-heading text-4xl font-bold mb-4">
          Simple Trading Bot Integration
        </h2>
        <p className="mb-8">Connect your wallet to set up alerts and automate trades.</p>
        <button className="bg-secondary text-primary font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50" disabled>
          Connect Wallet (Coming Soon)
        </button>
      </div>
    </section>
  );
};

export default TradingBot;
