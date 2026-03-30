/* src/app/insurance/lifeInsurance.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';
import { ShieldCheck, Heart, Users } from 'lucide-react';

const LifeInsurancePage: React.FC = () => {
  return (
    <PageLayout>
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 -z-0"></div>
        
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">
                <ShieldCheck className="w-4 h-4" />
                Trusted by 250k+ Families
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6">
                Secure Your <br />
                <span className="text-blue-500">Family's Future</span> Today
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-xl">
                Get more than just a policy. Get peace of mind with our 99.2% claim settlement ratio and instant digital verification.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400"><Heart className="w-6 h-6" /></div>
                  <div>
                    <p className="font-black text-lg leading-tight">$1M+</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Life Coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400"><Users className="w-6 h-6" /></div>
                  <div>
                    <p className="font-black text-lg leading-tight">48 Hours</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Claim Payout</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[420px] shrink-0">
               <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-2xl shadow-blue-500/10 border border-white/10 relative group">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-600/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    💰
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight">Get Your Life <br /><span className="text-blue-600">Quote In 2 Mins</span></h3>
                  <QuoteForm />
                  <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Secure 256-bit encrypted application</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <InsuranceDetails type="life" />

      {/* Trust & CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="container text-center">
           <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Ready to Protect Your Loved Ones?</h2>
           <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-medium">Join thousands of families who have secured their future with us. Transparent, fast, and reliable.</p>
           <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
             Start Your Application →
           </button>
        </div>
      </section>
    </PageLayout>
  );
};

export default LifeInsurancePage;

