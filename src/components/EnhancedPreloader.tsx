import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const EnhancedPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 3;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          
          // Simple fade out
          setTimeout(() => {
            if (preloaderRef.current) {
              gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: onComplete
              });
            }
          }, 300);
          
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-2">Corbett Labs</h1>
          <p className="text-accent-blue">Premium OEM Manufacturing</p>
        </div>
        
        <div className="flex flex-col items-center w-full">
          <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-accent-blue transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-cool-grey mt-4">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPreloader;
