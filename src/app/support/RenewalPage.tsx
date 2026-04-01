/* src/app/support/RenewalPage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';

const RenewalPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container py-20">
        <SectionTitle 
          title="Instant Policy Renewal" 
          subtitle="Don't let your insurance coverage expire. Renew in under 2 minutes with current loyal customer benefits."
          badge="Renewals"
          align="center"
        />
        <div className="max-w-3xl mx-auto mt-16 bg-slate-50 border border-slate-200 rounded-[48px] p-10 md:p-14 text-center group">
          <div className="w-24 h-24 rounded-[32px] bg-blue-600 shadow-2xl shadow-blue-500/30 flex items-center justify-center text-white text-5xl mx-auto mb-10 group-hover:scale-110 transition-transform duration-500">
             ⚡
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Stay Protected with IA</h2>
          <p className="text-base text-slate-500 font-bold mb-12 max-w-lg mx-auto">Get exclusive renewal discounts of up to 15% by renewing early through our dashboard.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left">
                <h3 className="font-bold text-slate-900 text-base mb-2 italic grow">Personal Renewal</h3>
                <p className="text-xs text-slate-500 font-bold mb-6">Individual plans including health & life.</p>
                <button className="bg-blue-600 text-white w-full py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Begin Renewal</button>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left">
                <h3 className="font-bold text-slate-900 text-base mb-2 italic grow">Bulk/Corp Renewal</h3>
                <p className="text-xs text-slate-500 font-bold mb-6">Group or business policy renewals.</p>
                <button className="bg-slate-900 text-white w-full py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-slate-900/10 active:scale-95 transition-all">Business Renewal</button>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-200">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">Trusted by more than <span className="text-slate-900">4,500 families</span> for continuous insurance support.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RenewalPage;
