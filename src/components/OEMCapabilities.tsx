import React from 'react';

const capabilities = [
  {
    title: 'Custom Formulation',
    description: 'Proprietary nicotine blends, flavor profiles, and strength variations tailored to your market requirements.',
    features: ['Nicotine salts & extracts', 'Natural & synthetic flavors', 'Strength: 2-20mg/pouch', 'pH optimization'],
    icon: '🧪'
  },
  {
    title: 'Private Labeling',
    description: 'Complete branding solutions from package design to regulatory documentation.',
    features: ['Custom packaging design', 'Brand compliance', 'Regulatory filing support', 'Market-specific labeling'],
    icon: '🏷️'
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous testing protocols ensuring product safety, consistency, and regulatory compliance.',
    features: ['Batch testing', 'Microbial analysis', 'Heavy metals screening', 'Stability studies'],
    icon: '✅'
  },
  {
    title: 'Scalable Production',
    description: 'Flexible manufacturing capacity from prototype runs to high-volume commercial production.',
    features: ['500K minimum order', '50M monthly capacity', '24/7 production', 'JIT delivery'],
    icon: '📈'
  },
  {
    title: 'Regulatory Support',
    description: 'Comprehensive regulatory assistance for global market entry and compliance maintenance.',
    features: ['TPD compliance', 'FDA registration', 'Health Canada', 'PMTA support'],
    icon: '📋'
  },
  {
    title: 'Global Logistics',
    description: 'Worldwide shipping with cold chain management and customs documentation.',
    features: ['Temperature control', 'Customs clearance', 'Express shipping', 'Track & trace'],
    icon: '🚚'
  }
];

const OEMCapabilities = () => {
  return (
    <section id="capabilities" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            End-to-End OEM Capabilities
          </h2>
          <p className="text-xl text-cool-grey max-w-3xl mx-auto">
            From initial concept through to market launch, we provide comprehensive 
            manufacturing and regulatory support for your nicotine pouch brand.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent-blue/20 hidden lg:block" />
          
          <div className="space-y-12">
            {capabilities.map((capability, index) => (
              <div 
                key={capability.title}
                className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-12`}
              >
                {/* Icon */}
                <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center text-2xl mb-6 lg:mb-0 z-10">
                  {capability.icon}
                </div>
                {/* Content and Video for Custom Formulation */}
                {index === 0 ? (
                  <>
                    <div className="glass-card p-8 w-full lg:w-5/12 lg:mr-auto">
                      <h3 className="text-2xl font-bold text-deep-navy mb-4">{capability.title}</h3>
                      <p className="text-cool-grey mb-6">{capability.description}</p>
                      <ul className="space-y-2">
                        {capability.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-cool-grey">
                            <div className="w-2 h-2 bg-accent-blue rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Video: Only on large screens, same width as card */}
                    <div className="hidden lg:block w-full lg:w-5/12 lg:ml-auto">
                      <video 
                        src="/lovable-uploads/fomulation.mp4" 
                        controls 
                        className="rounded-xl shadow-lg w-full h-full object-cover"
                        style={{ minHeight: '90%', maxHeight: '200px', background: '#000' }}
                      />
                    </div>
                  </>
                ) : (
                  <div className={`glass-card p-8 w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                    <h3 className="text-2xl font-bold text-deep-navy mb-4">{capability.title}</h3>
                    <p className="text-cool-grey mb-6">{capability.description}</p>
                    <ul className="space-y-2">
                      {capability.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-cool-grey">
                          <div className="w-2 h-2 bg-accent-blue rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OEMCapabilities;
