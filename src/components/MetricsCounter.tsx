
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Cans/Month', value: 2, suffix: 'M' },
  { label: 'Quality Control', value: 100, suffix: '%' },
  { label: 'Countries Served', value: 25, suffix: '+' }
];

const MetricsCounter = () => {
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !metricsRef.current) return;

    const counters = metricsRef.current.querySelectorAll('.counter-value');
    
    // Single ScrollTrigger for all counters
    ScrollTrigger.create({
      trigger: metricsRef.current,
      start: "top 80%",
      onEnter: () => {
        counters.forEach((counter, index) => {
          const target = metrics[index].value;
          const isDecimal = target % 1 !== 0;
          
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            delay: index * 0.2,
            snap: isDecimal ? { innerText: 0.1 } : { innerText: 1 },
            onUpdate: function() {
              const currentValue = parseFloat(this.targets()[0].innerText);
              counter.innerHTML = isDecimal ? currentValue.toFixed(1) : Math.ceil(currentValue).toString();
            }
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-10 bg-deep-navy" data-scroll-section>
      <div className="container-max">
        <div ref={metricsRef} className="flex flex-wrap justify-center gap-12 md:gap-20 lg:gap-24">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="text-center px-4 md:px-6 lg:px-16">
              <div className="text-5xl md:text-6xl  font-bold text-white mb-2">
                <span className="counter-value">0</span>
                <span className="text-sky-glow">{metric.suffix}</span>
              </div>
              <p className="text-base md:text-lg text-cool-grey">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsCounter;
