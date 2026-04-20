import React from 'react';

const stats = [
  { label: 'Active Policies', value: '1M+', icon: '📄' },
  { label: 'Claim Settlement Ratio', value: '99.2%', icon: '✅' },
  { label: 'Partner Insurers', value: '50+', icon: '🤝' },
  { label: 'Customer Support', value: '24/7', icon: '🎧' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-10 bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[100%] bg-blue-500 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[100%] bg-indigo-500 blur-[120px] rounded-full"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl mb-1.5 grayscale group-hover:grayscale-0 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-xl md:text-3xl font-black text-white mb-0.5">
                {stat.value}
              </div>
              <div className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
