/* src/app/support/CarePage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';

const CarePage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container py-20 pb-32 relative">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-100/10 blur-[200px] rounded-full translate-x-1/2 -z-10 animate-pulse transition-all duration-700"></div>
        <div className="text-center mb-4">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Official Support Center of Future Invo Solution</span>
        </div>
        <SectionTitle 
          title="We Are Always At Your Service" 
          subtitle="Customer satisfaction is our ultimate goal. Our dedicated support team is available 24/7 to resolve your queries."
          badge="Customer Care"
          align="center"
        />
        
        <div className="mt-12 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Phone */}
            <div className="p-6 flex items-center gap-4 hover:bg-blue-50/30 transition-all cursor-pointer group">
               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">📞</div>
               <div>
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Call Support</h4>
                  <p className="text-xs font-black text-slate-900 tracking-tight">1800-INSURE-IA</p>
               </div>
            </div>

            {/* WhatsApp */}
            <div className="p-6 flex items-center gap-4 hover:bg-green-50/30 transition-all cursor-pointer group">
               <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl group-hover:bg-green-600 group-hover:text-white transition-all shrink-0">📱</div>
               <div>
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">WhatsApp Chat</h4>
                  <p className="text-xs font-black text-slate-900 tracking-tight">+91 99887-76655</p>
               </div>
            </div>

            {/* Email */}
            <div className="p-6 flex items-center gap-4 hover:bg-orange-50/30 transition-all cursor-pointer group">
               <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl group-hover:bg-orange-600 group-hover:text-white transition-all shrink-0">📧</div>
               <div>
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Support</h4>
                  <p className="text-xs font-black text-slate-900 tracking-tight">info@futureinvo.com</p>
               </div>
            </div>

            {/* Address */}
            <div className="p-6 flex items-center gap-4 hover:bg-indigo-50/30 transition-all cursor-pointer group">
               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">🏠</div>
               <div>
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Future Invo Solution</h4>
                  <p className="text-[10px] font-black text-slate-900 tracking-tighter leading-none">B-402, Future Invo Hub, Mumbai</p>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 p-8 md:p-12 bg-slate-50 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col items-center text-center relative">
           <div className="w-16 h-16 rounded-full bg-blue-600 shadow-xl shadow-blue-500/20 flex items-center justify-center text-white text-3xl font-black mb-6 -mt-16 md:-mt-20 border-4 border-white">
             🙋
           </div>
           <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Talk to Your Dedicated Advisor</h3>
           <p className="text-sm text-slate-500 font-bold max-w-lg mx-auto mb-10">Every IA client gets a personal certified advisor. No robotic scripts, just real human expertise.</p>
           <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-blue-600 active:scale-95 transition-all">Start Chat with Advisor</button>
        </div>
      </div>
    </PageLayout>
  );
};

export default CarePage;
