import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Share Your Details',
    description: 'Tell us a bit about yourself and what you\'re looking to protect.',
    icon: '📝',
  },
  {
    number: '02',
    title: 'Compare & Analyze',
    description: 'Our AI analyzes thousands of data points to find your best matches.',
    icon: '🔍',
  },
  {
    number: '03',
    title: 'Get Covered Instantly',
    description: 'Choose your plan and complete the process in minutes, 100% online.',
    icon: '💳',
  },
];

const ProcessSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-slate-900 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">Simple 3-Step Process</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Insurance made as easy as <span className="text-blue-500 italic">one, two, three.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg max-w-sm mb-2 font-medium">
            No endless paperwork. No confusing jargon. Just smart insurance in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent z-0 -ml-10"></div>
              )}
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 group-hover:-translate-y-2">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-xs font-black text-blue-400">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed font-regular">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
