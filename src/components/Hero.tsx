
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Blue Glow Background */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 blue-glow animate-glow-pulse opacity-60" />
      
      <div className="container-max relative z-10 text-center px-6">
        <div className={`transition-all duration-800 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-deep-navy">Premium Nicotine Pouches</span>
              <br />
              <span className="text-accent-blue">Made for Your Brand</span>
            </h1>
            <p className="text-xl text-cool-grey mb-8 max-w-2xl mx-auto">
              End-to-end OEM • 50M pouches/month • 99.8% Quality Control
            </p>
          </div>

          {/* Certification Badges */}
          <div className="flex justify-center space-x-6 mb-12">
            <div className="glass-card px-4 py-2">
              <span className="text-sm font-medium text-accent-blue">ISO 9001</span>
            </div>
            <div className="glass-card px-4 py-2">
              <span className="text-sm font-medium text-accent-blue">GMP</span>
            </div>
            <div className="glass-card px-4 py-2">
              <span className="text-sm font-medium text-accent-blue">FDA</span>
            </div>
          </div>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-600 delay-300 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
            <Button onClick={onContactClick} className="btn-primary text-lg px-10 py-5">
              Request Quote & Samples
            </Button>
            <Button className="btn-secondary text-lg px-10 py-5">
              Schedule Factory Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
