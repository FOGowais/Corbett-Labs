import React from 'react';

const Footer = ({ onContactClick }: { onContactClick: () => void }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-deep-navy text-white relative overflow-hidden">
      
      <div className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/lovable-uploads/logo.png" srcSet="/lovable-uploads/logo.webp 1x" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
              <span className="font-bold text-2xl">Corbett Industries</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Leading OEM manufacturer of premium nicotine pouches with over 15 years of experience 
              in delivering innovative solutions for global brands.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-colors cursor-pointer">
                <span className="text-xs">Li</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-colors cursor-pointer">
                <span className="text-xs">Tw</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-blue transition-colors cursor-pointer">
                <span className="text-xs">Fb</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection('capabilities')}
                className="block text-white/80 hover:text-sky-glow transition-colors"
              >
                OEM Capabilities
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block text-white/80 hover:text-sky-glow transition-colors"
              >
                Product Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('compliance')}
                className="block text-white/80 hover:text-sky-glow transition-colors"
              >
                Compliance
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-white/80 hover:text-sky-glow transition-colors"
              >
                About Us
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-3 text-white/80">
              <p>Ramnagar<br />Uttarakhand, India</p>
              <p>sales@corbettlabs.in</p>
              <button 
                onClick={onContactClick}
                className="btn-primary mt-4"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Corbett Industries. All rights reserved. Leading OEM Innovation Since 2009.
            </div>
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-sky-glow transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-sky-glow transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-sky-glow transition-colors">Quality Standards</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
