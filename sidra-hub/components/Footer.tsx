import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-secondary">API Docs</a>
          <a href="#" className="hover:text-secondary">FAQ</a>
          <a href="#" className="hover:text-secondary">Contact</a>
          <a href="#" className="hover:text-secondary">Twitter</a>
          <a href="#" className="hover:text-secondary">Telegram</a>
        </div>
        <p className="mb-2">Disclaimer: Not financial advice. Trade at your own risk.</p>
        <p>&copy; {new Date().getFullYear()} SIDRA Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
