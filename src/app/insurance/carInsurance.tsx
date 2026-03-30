/* src/app/insurance/car/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';
import { Car, Wrench, Shield } from 'lucide-react';

const CarInsurancePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-400/10 blur-[120px] rounded-full translate-x-1/2 -z-0"></div>
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">
                <Car className="w-4 h-4" />
                Instant Digital Policy
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6">
                Advanced <br />
                <span className="text-blue-400">Vehicle Guard</span>
              </h1>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-xl">
                Get back on the road faster with 24/7 roadside assistance and cashless repairs at 4,000+ top-rated garages.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400"><Wrench className="w-6 h-6" /></div>
                  <div>
                    <p className="font-black text-lg leading-tight">4,000+</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Cashless Garages</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400"><Shield className="w-6 h-6" /></div>
                  <div>
                    <p className="font-black text-lg leading-tight">Zero Dep</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Available Cover</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[420px] shrink-0">
               <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-2xl shadow-blue-400/10 border border-white/10 relative group">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    🚗
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight">Get Your Car <br /><span className="text-blue-500">Quote In 2 Mins</span></h3>
                  <QuoteForm />
               </div>
            </div>
          </div>
        </div>
      </section>

      <InsuranceDetails type="car" />
    </PageLayout>
  );
};

export default CarInsurancePage;
