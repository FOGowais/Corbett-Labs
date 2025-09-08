
import React, { useState } from 'react';
import EnhancedPreloader from '../components/EnhancedPreloader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Navigation from '../components/Navigation';
import EnhancedHero from '../components/EnhancedHero';
import MetricsCounter from '../components/MetricsCounter';
import EnhancedOEMCapabilities from '../components/EnhancedOEMCapabilities';
import ProductPortfolio from '../components/ProductPortfolio';
import ComplianceSection from '../components/ComplianceSection';
import AboutSection from '../components/AboutSection';
import ContactModal from '../components/ContactModal';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollRef } = useScrollAnimation();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleContactClose = () => {
    setIsContactModalOpen(false);
  };

  if (isLoading) {
    return <EnhancedPreloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation onContactClick={handleContactClick} />
      <main ref={scrollRef}>
        <EnhancedHero />
        <MetricsCounter />
        <EnhancedOEMCapabilities />
        <ProductPortfolio onContactClick={handleContactClick} />
        <ComplianceSection onContactClick={handleContactClick} />
        <AboutSection />
        <Footer onContactClick={handleContactClick} />
      </main>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleContactClose} 
      />
    </div>
  );
};

export default Index;
