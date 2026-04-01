/* src/app/support/ClaimsPage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';

const ClaimsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16 animate-fade-in lg:px-10">
          <div className="flex-1 max-w-xl">
             <SectionTitle 
               title="Professional Claim Center" 
               subtitle="Need to file a claim? Expert guidance to ensure your settlement is fast and stress-free."
               badge="Claims"
               align="left"
             />
             <div className="flex items-center gap-5 mt-6">
               <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xl flex items-center justify-center w-16 h-16 text-3xl shadow-blue-500/5">🔥</div>
               <div>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">98.5% Settlement Ratio</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Fastest approval in the industry</p>
               </div>
             </div>
          </div>
          <div className="w-full lg:w-[420px] bg-white p-8 rounded-[32px] overflow-hidden relative shadow-2xl border border-slate-100">
             <h3 className="text-lg font-black text-slate-900 mb-8 border-b border-slate-50 pb-4">File Your Claim Now</h3>
             <form className="space-y-5">
               <div>
                 <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Policy Number</label>
                 <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-200 outline-none transition-all placeholder:text-slate-300" placeholder="IA-XXXX-XXXX" />
               </div>
               <div>
                 <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">Email Address</label>
                 <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-200 outline-none transition-all placeholder:text-slate-300" placeholder="your@email.com" />
               </div>
               <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all mt-2">Submit Claim Case</button>
             </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/30 hover:-translate-y-1.5 transition-all duration-500">
             <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl mb-6">🔔</div>
             <h3 className="text-base font-black text-slate-900 mb-3 tracking-tight">1. Notify Us</h3>
             <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">Inform us within 24 hours of the incident for smooth cashless processing.</p>
          </div>
          <div className="bg-blue-600 p-7 rounded-[32px] shadow-xl shadow-blue-600/20 hover:-translate-y-1.5 transition-all duration-500 text-white">
             <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center text-xl mb-6">📄</div>
             <h3 className="text-base font-black mb-3 tracking-tight text-white">2. Collect Docs</h3>
             <p className="text-[11px] font-bold text-white/70 leading-relaxed italic">Keep bills and medical reports ready. Our advisors help organize them.</p>
          </div>
          <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/30 hover:-translate-y-1.5 transition-all duration-500">
             <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl mb-6">💰</div>
             <h3 className="text-base font-black text-slate-900 mb-3 tracking-tight">3. Settlement</h3>
             <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">Once verified, the settlement amount is disbursed to your bank or hospital.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ClaimsPage;
