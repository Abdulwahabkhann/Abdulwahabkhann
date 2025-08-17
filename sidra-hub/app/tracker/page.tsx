import React from 'react';
import GoBackButton from '@/components/GoBackButton';

const TrackerPage = () => {
  return (
    <section id="whales" className="py-16">
      <div className="container mx-auto">
        <GoBackButton />
        <h2 className="font-heading text-4xl font-bold text-center mb-8">
          Whale Wallet Tracker
        </h2>
        <div className="bg-primary p-4 rounded-lg">
          <h3 className="font-heading text-xl font-bold mb-4">Recent Big Transactions (Last 24h)</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-text-muted/20">
                <th className="p-2">Time</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount (SIDRA)</th>
                <th className="p-2">Wallet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="text-center p-4 text-text-muted">
                  Whale tracking data is coming soon...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TrackerPage;
