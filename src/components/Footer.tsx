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
      
      <div className="container-max py-12 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/lovable-uploads/logo.png" srcSet="/lovable-uploads/logo.webp 1x" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
              <span className="font-bold text-2xl">Corbett Labs</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Leading OEM manufacturer of premium nicotine pouches with extensive experience 
              in delivering innovative solutions for global brands.
            </p>
            {/* Social media buttons removed as requested */}
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
              <p>Uttarakhand, India</p>
              <p>pouchex@corbettlabs.in</p>
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
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2026 Corbett Labs. All rights reserved. Leading OEM Innovations Globally.
            </div>
            {/* Footer links removed as requested */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
