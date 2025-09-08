import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useScrollDirection } from '../hooks/useScrollDirection';
const Navigation = ({
  onContactClick
}: {
  onContactClick: () => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navClass = `fixed top-0 w-full border-b border-white/20 z-40 transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'} ${atTop ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md'}`;
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <nav className={navClass}>
      <div className="container-max flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-2">
          <img src="/lovable-uploads/logo.png" srcSet="/lovable-uploads/logo.webp 1x" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-bold text-xl text-deep-navy">Corbett Labs</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('capabilities')} className="text-cool-grey hover:text-accent-blue transition-colors">
            Capabilities
          </button>
          <button onClick={() => scrollToSection('products')} className="text-cool-grey hover:text-accent-blue transition-colors">
            Products
          </button>
          <button onClick={() => scrollToSection('compliance')} className="text-cool-grey hover:text-accent-blue transition-colors">
            Compliance
          </button>
          <button onClick={() => scrollToSection('about')} className="text-cool-grey hover:text-accent-blue transition-colors">
            About
          </button>
          <Button onClick={onContactClick} className="btn-primary">
            Request Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span className={`block h-0.5 bg-deep-navy transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block h-0.5 bg-deep-navy transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-deep-navy transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="absolute top-full left-0 w-full bg-deep-navy/95 backdrop-blur-lg md:hidden">
            <div className="flex flex-col py-6 px-6 space-y-4">
              <button onClick={() => scrollToSection('capabilities')} className="text-white hover:text-sky-glow transition-colors text-left">
                Capabilities
              </button>
              <button onClick={() => scrollToSection('products')} className="text-white hover:text-sky-glow transition-colors text-left">
                Products
              </button>
              <button onClick={() => scrollToSection('compliance')} className="text-white hover:text-sky-glow transition-colors text-left">
                Compliance
              </button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-sky-glow transition-colors text-left">
                About
              </button>
              <Button onClick={onContactClick} className="btn-primary mt-4">
                Request Quote
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;