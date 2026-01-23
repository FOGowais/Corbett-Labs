
import React from 'react';

const certifications = [
  {
    title: 'ISO 9001:2015',
    authority: 'International Organization for Standardization',
    description: 'Quality Management Systems certification ensuring consistent product quality and customer satisfaction.',
    status: 'Active',
    expires: 'Dec 2025'
  },
  {
    title: 'Good Manufacturing Practice (GMP)',
    authority: 'European Medicines Agency',
    description: 'Pharmaceutical-grade manufacturing standards for product safety and quality assurance.',
    status: 'Active',
    expires: 'Jun 2026'
  },
  // {
  //   title: 'FDA Facility Registration',
  //   authority: 'US Food and Drug Administration',
  //   description: 'Registered manufacturing facility for tobacco products with FDA compliance protocols.',
  //   status: 'Active',
  //   expires: 'Annual'
  // },
  {
    title: 'TPD Compliance',
    authority: 'European Union',
    description: 'Tobacco Products Directive compliance for European market entry and distribution.',
    status: 'Active',
    expires: 'Ongoing'
  }
];

const additionalStandards = [
  { name: 'HACCP', description: 'Hazard Analysis Critical Control Points' },
  { name: 'Child-resistant packaging compliance', description: 'Ensures safety features to prevent child access' },
  { name: 'ISO 22000 / HACCP', description: 'Food safety management systems standard' },
  // { name: 'TPD', description: 'Occupational Safety and Health Standards' }
];

const ComplianceSection = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section id="compliance" className="section-padding bg-base-grey">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            Compliance & Certifications
          </h2>
          <p className="text-xl text-cool-grey max-w-3xl mx-auto">
            Our commitment to regulatory excellence ensures your products meet the highest 
            international standards for safety, quality, and market compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Active Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-deep-navy mb-8">Active Certifications</h3>
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.title} className="glass-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-deep-navy text-lg">{cert.title}</h4>
                      <p className="text-sm text-cool-grey">{cert.authority}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="bg-accent-blue text-white px-3 py-1 rounded-full text-xs font-medium">
                        {cert.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-cool-grey text-sm mb-4">{cert.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-cool-grey">
                    <span>Expires: {cert.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Standards */}
          <div>
            <h3 className="text-2xl font-bold text-deep-navy mb-8">Additional Standards</h3>
            <div className="space-y-4 mb-8">
              {additionalStandards.map((standard) => (
                <div key={standard.name} className="flex items-center p-4 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-accent-blue rounded-full mr-4" />
                  <div>
                    <h4 className="font-medium text-deep-navy">{standard.name}</h4>
                    <p className="text-sm text-cool-grey">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Support Services */}
            <div className="glass-card p-6">
              <h4 className="font-bold text-deep-navy text-lg mb-4">Regulatory Support Services</h4>
              <ul className="space-y-2 text-sm text-cool-grey">
                <li>• PMTA (Premarket Tobacco Application) assistance</li>
                <li>• Health Canada product notification</li>
                <li>• Australian TGA compliance</li>
                <li>• Custom regulatory documentation</li>
              </ul>
              
              <button className="btn-secondary w-full mt-6" onClick={onContactClick}>
                Request Certificate Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
