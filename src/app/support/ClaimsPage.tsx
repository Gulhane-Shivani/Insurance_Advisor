/* src/app/support/ClaimsPage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';

const ClaimsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 animate-fade-in">
          <div className="flex-1">
             <SectionTitle 
               title="Professional Claim Center" 
               subtitle="Need to file a claim? We provide end-to-end guidance to ensure your settlement is fast and stress-free."
               badge="Claims"
               align="left"
             />
             <div className="flex items-center gap-6 mt-10">
               <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xl flex items-center justify-center w-24 h-24 text-4xl shadow-blue-500/10">🔥</div>
               <div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">98.5% Settlement Ratio</h3>
                  <p className="text-slate-500 font-bold text-sm">Among our top-tier global partners</p>
               </div>
             </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-[48px] shadow-2xl relative group overflow-hidden">
             <div className="bg-slate-900 p-10 md:p-14 rounded-[44px] text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none"></div>
               <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6">File Your Claim Now</h3>
               <form className="space-y-6">
                 <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-3">Policy Number</label>
                   <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:bg-white/10 outline-none transition-all" placeholder="IA-XXXX-XXXX-XXXX" />
                 </div>
                 <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-3">Your Email Address</label>
                   <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:bg-white/10 outline-none transition-all" placeholder="user@domain.com" />
                 </div>
                 <button className="w-full bg-white text-slate-900 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-white/10 active:scale-95 transition-all">Submit Case</button>
               </form>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500">
             <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-3xl mb-8">🔔</div>
             <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Step 1: Notify Us</h3>
             <p className="text-slate-500 font-medium leading-relaxed">Inform us within 24 hours of the incident or hospitalization for smooth cashless processing.</p>
          </div>
          <div className="bg-blue-600 p-10 rounded-[40px] border border-blue-500 shadow-xl shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 text-white">
             <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center text-3xl mb-8">📄</div>
             <h3 className="text-xl font-black mb-4 tracking-tight">Step 2: Collect Documents</h3>
             <p className="text-white/70 font-medium leading-relaxed">Keep all bills, medical reports, and policy details ready. Our advisors help organize them digitally.</p>
          </div>
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500">
             <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-3xl mb-8">💰</div>
             <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Step 3: Fast Settlement</h3>
             <p className="text-slate-500 font-medium leading-relaxed">Once verified, your claim is approved and the settlement amount is disbursed to your bank or hospital.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ClaimsPage;
