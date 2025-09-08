
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'Pouches/Month', value: 5, suffix: 'M' },
  { label: 'Quality Control', value: 99.8, suffix: '%' },
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
    <section className="py-16 bg-deep-navy" data-scroll-section>
      <div className="container-max">
        <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="counter-value">0</span>
                <span className="text-sky-glow">{metric.suffix}</span>
              </div>
              <p className="text-cool-grey">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsCounter;
