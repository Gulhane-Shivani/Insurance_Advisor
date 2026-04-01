/* src/app/insurance/healthInsurance.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const HealthInsurancePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-slate-900 pt-12 pb-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500/10 blur-[120px] rounded-full translate-x-1/2 -z-0"></div>
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                <Activity className="w-4 h-4" />
                15,000+ Network Hospitals
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight mb-4">
                World-Class <br />
                <span className="text-green-500">Health Guard</span>
              </h1>
              <p className="text-base text-slate-400 font-medium leading-relaxed mb-8 max-w-xl">
                Get instant cashless approval in 2 hours. comprehensive coverage for your family with no room-rent capping.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-green-400"><ShieldCheck className="w-5 h-5" /></div>
                  <div>
                    <p className="font-black text-base leading-tight">Cashless</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">At 15k+ Hospitals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-green-400"><Zap className="w-5 h-5" /></div>
                  <div>
                    <p className="font-black text-base leading-tight">2 Hours</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Approval Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[380px] shrink-0">
               <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-green-500/10 border border-white/10 relative group">
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white text-xl shadow-xl shadow-green-600/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    🏥
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-4 leading-tight">Compare Health <br /><span className="text-green-600">Quotes In 2 Mins</span></h3>
                  <QuoteForm />
               </div>
            </div>
          </div>
        </div>
      </section>

      <InsuranceDetails type="health" />
      
    </PageLayout>
  );
};

export default HealthInsurancePage;

