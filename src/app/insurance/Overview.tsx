/* src/app/insurance/Overview.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import { Heart, Activity, Car, Briefcase, ChevronRight, Star, CheckCircle2 } from 'lucide-react';
import TrustBar from '../../components/common/TrustBar';

const InsuranceOverview: React.FC = () => {
  const categories = [
    { 
      id: 'life', title: 'Life Insurance', icon: <Heart className="w-8 h-8" />, color: 'blue',
      desc: 'Protect your family\'s financial future with comprehensive life coverage.',
      features: ['99.2% Settlement', 'Tax Benefits', 'Instant Quote'],
      path: '/insurance/life'
    },
    { 
      id: 'health', title: 'Health Insurance', icon: <Activity className="w-8 h-8" />, color: 'green',
      desc: 'Get world-class medical care with cashless access to 15,000+ hospitals.',
      features: ['2hr Approval', 'No Room Cap', 'Global Cover'],
      path: '/insurance/health'
    },
    { 
      id: 'car', title: 'Car Insurance', icon: <Car className="w-8 h-8" />, color: 'indigo',
      desc: 'Advanced vehicle protection with zero-depreciation and 24/7 assistance.',
      features: ['Digital Claim', '4k+ Garages', 'Spot Survey'],
      path: '/insurance/car'
    },
    { 
      id: 'business', title: 'Business Insurance', icon: <Briefcase className="w-8 h-8" />, color: 'amber',
      desc: 'Scale your enterprise with professional risk management and asset protection.',
      features: ['Liability Cover', 'SME Experts', 'Loss Recovery'],
      path: '/insurance/business'
    }
  ];

  return (
    <PageLayout bg="bg-white">
      {/* Dynamic Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 -z-10"></div>
        
        <div className="container text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-100">The Modern Way to Insure</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            One Stop <span className="text-blue-600">Protection</span><br />For Everything.
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare premium insurance plans from top-rated providers. Simple, transparent, and built for your peace of mind.
          </p>
          
          <div className="flex flex-wrap justify-center gap-12 py-10">
            <div className="flex flex-col items-center">
               <p className="text-4xl font-black text-slate-900">1.5M+</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Active Policies</p>
            </div>
            <div className="w-[1px] h-12 bg-slate-100 hidden sm:block"></div>
            <div className="flex flex-col items-center">
               <p className="text-4xl font-black text-slate-900">99.8%</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Claim Success</p>
            </div>
            <div className="w-[1px] h-12 bg-slate-100 hidden sm:block"></div>
            <div className="flex flex-col items-center">
               <p className="text-4xl font-black text-slate-900">24/7</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Categories Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-xl">
               <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight mb-4">Choose the protection <br />you need today.</h2>
               <p className="text-slate-500 font-medium">All our plans are vetted by industry experts to ensure maximum coverage and minimum friction.</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group cursor-pointer">
               View All Products <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <a 
                key={cat.id} 
                href={cat.path}
                className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${cat.color}-50/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-${cat.color}-100 transition-colors`}></div>
                
                <div className="flex flex-col h-full relative z-10">
                   <div className={`w-16 h-16 bg-${cat.color}-50 rounded-2xl flex items-center justify-center text-${cat.color}-600 mb-8 group-hover:scale-110 transition-transform`}>
                     {cat.icon}
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 mb-4">{cat.title}</h3>
                   <p className="text-slate-500 font-medium leading-relaxed mb-8">{cat.desc}</p>
                   
                   <div className="flex flex-wrap gap-3 mt-auto mb-8">
                     {cat.features.map((f, i) => (
                       <span key={i} className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">{f}</span>
                     ))}
                   </div>

                   <button className={`w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] group-hover:bg-blue-600 transition-all shadow-lg active:scale-95`}>
                     Get Quote Now →
                   </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us / Differentiation Section */}
      <section className="py-24 container">
        <div className="bg-slate-900 text-white rounded-[40px] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tight">The Digital-First <br />Agent You Deserve.</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">We've stripped away the complexity, the paperwork, and the waiting. Insurance should be as fast as your fiber connection.</p>
              
              <div className="space-y-6">
                {[
                  { title: 'AI-Powered Underwriting', desc: 'Get accurate pricing based on real-time risk assessment.' },
                  { title: 'Zero Paperwork Policy', desc: 'Everything from quote to claim happens on your phone.' },
                  { title: 'Transparent Terms', desc: 'No hidden clauses. No complicated insurance jargon.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-blue-600/30 blur-[100px] rounded-full animate-pulse"></div>
                 <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] shadow-2xl">
                    <div className="flex items-center gap-1 mb-6">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-2xl font-bold leading-relaxed mb-8">"I've never seen an insurance claim settled this fast. Literally 2 minutes from upload to approval. Highly recommended!"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center font-black text-blue-500">JD</div>
                      <div>
                        <p className="font-black">John Doe</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Small Business Owner</p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global FAQ / Support CTA */}
      <section className="py-24 container text-center">
         <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Still Have Questions?</h2>
         <p className="text-slate-500 font-medium mb-12 max-w-xl mx-auto">Our licensed advisors are available 24/7 to help you choose the right plan for your unique needs.</p>
         <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95">
              Talk to an Expert
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-blue-600 transition-all active:scale-95">
              Browse Help Center
            </button>
         </div>
      </section>
    </PageLayout>
  );
};

export default InsuranceOverview;
