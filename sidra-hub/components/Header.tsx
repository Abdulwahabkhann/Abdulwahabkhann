import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="p-4 border-b border-text-muted/20">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-heading text-2xl font-bold text-text-main">
          <span className="text-accent">SIDRA</span> Hub
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
          <Link href="/charts" className="hover:text-accent transition-colors">Charts</Link>
          <Link href="/signals" className="hover:text-accent transition-colors">Bot Signals</Link>
          <Link href="/tracker" className="hover:text-accent transition-colors">Wallet Tracker</Link>
          <Link href="/learn" className="hover:text-accent transition-colors">Learn</Link>
        </div>
        <div>
          <Link href="/login">
            <button className="btn-modern">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
