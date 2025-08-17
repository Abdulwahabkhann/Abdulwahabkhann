import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20">
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4 text-white">
          The Future of Crypto Analysis is Here.
        </h1>
        <p className="text-xl text-text-muted mb-8">
          SIDRA Hub provides real-time data, advanced analytics, and powerful tools to help you navigate the crypto market with confidence.
        </p>
        <Link href="/charts">
          <button className="btn-modern">
            Get Started
          </button>
        </Link>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://negativespace.co/wp-content/uploads/2022/01/negative-space-ribbon-connection-1062x703.jpg"
          alt="Abstract technology background"
          width={1062}
          height={703}
          className="rounded-lg shadow-2xl"
        />
      </div>
    </section>
  );
};

export default LandingPage;
