'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const HeroCarousel = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide h-96 flex items-center justify-center bg-accent">
          <h1 className="text-5xl font-bold text-primary">Slide 1: Welcome to SIDRA Hub</h1>
        </div>
        <div className="embla__slide h-96 flex items-center justify-center bg-secondary">
          <h1 className="text-5xl font-bold text-white">Slide 2: Real-Time Analytics</h1>
        </div>
        <div className="embla__slide h-96 flex items-center justify-center bg-primary">
          <h1 className="text-5xl font-bold text-accent">Slide 3: Trade Smarter</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
