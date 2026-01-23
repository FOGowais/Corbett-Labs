import React, { useEffect, useState } from 'react';

const stats = [
  { number: 2, suffix: 'M+', label: 'Cans Monthly', description: 'High-volume production capacity' },
  { number: 25, suffix: '+', label: 'Countries Served', description: 'Global distribution network' },
  { number: 100, suffix: '%', label: 'Quality Rate', description: 'Consistent manufacturing excellence' }
];

const values = [
  'Quality First',
  'Innovation',
  'Transparency',
  'Partnership'
];

const CounterAnimation = ({ targetNumber, suffix, label, description }: { targetNumber: number, suffix: string, label: string, description: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + increment >= targetNumber) {
          clearInterval(timer);
          return targetNumber;
        }
        return prev + increment;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [targetNumber]);

  // Display integer values
  const displayValue = Math.floor(count);

  return (
    <div className="text-center glass-card p-8 md:p-10 lg:p-12 animate-counter-up">
      <div className="text-5xl md:text-6xl lg:text-6xl font-bold text-accent-blue mb-3 md:mb-4">
        {displayValue}{suffix}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-deep-navy mb-2 md:mb-3">{label}</h3>
      <p className="text-sm md:text-base text-cool-grey">{description}</p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            Corbett Labs - Leading OEM Innovations Globally
          </h2>
          <p className="text-xl text-cool-grey max-w-4xl mx-auto">
            Built on a foundation of scientific excellence and manufacturing precision, we've grown 
            to become the trusted OEM partner for premium nicotine pouch brands worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 lg:gap-24 mb-20">
          {stats.map((stat) => (
            <CounterAnimation
              key={stat.label}
              targetNumber={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Our Story */}
          <div>
            <h3 className="text-2xl font-bold text-deep-navy mb-6">Our Story</h3>
            <div className="space-y-4 text-cool-grey">
              <p>
                What started as a small research laboratory focused on nicotine delivery systems 
                has evolved into one of India's most advanced OEM manufacturing facilities for 
                nicotine pouches and smokeless tobacco alternatives.
              </p>
              <p>
                Our team of chemists, engineers, and regulatory experts work together to deliver 
                innovative solutions that help brands enter new markets faster while maintaining 
                the highest standards of product safety and quality.
              </p>
              <p>
                Today, we partner with emerging startups and established multinational brands, 
                providing the same level of excellence and attention to detail regardless of order 
                size or complexity.
              </p>
            </div>

            {/* Core Values */}
            <div className="mt-8">
              <h4 className="font-bold text-deep-navy mb-4">Core Values</h4>
              <div className="flex flex-wrap gap-3">
                {values.map((value) => (
                  <div key={value} className="flex items-center">
                    <div className="w-2 h-2 bg-accent-blue rounded-full mr-2" />
                    <span className="text-cool-grey font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
