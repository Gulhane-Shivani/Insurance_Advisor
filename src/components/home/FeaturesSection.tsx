import React from 'react';
import SectionTitle from '../common/SectionTitle';

const features = [
  {
    title: 'Unbiased Advice',
    description: 'We don\'t favor any insurer. Our AI advisor works solely for your benefit.',
    icon: '⚖️',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Instant Comparison',
    description: 'Compare 50+ plans across categories in less than 2 minutes.',
    icon: '⚡',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Paperless Process',
    description: 'Buy or renew policies instantly with 100% digital documentation.',
    icon: '📱',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Priority Claims',
    description: 'Dedicated support team to help you navigate through every claim.',
    icon: '🛡️',
    color: 'bg-purple-50 text-purple-600',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 container">
      <SectionTitle 
        title="Why Thousands Trust SafeGuard"
        subtitle="We've reimagined insurance thinking of you first. Transparent, fast, and always reliable."
        align="center"
        badge="Our Advantages"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-8 rounded-[2rem] border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
