/* src/app/legal/PrivacyPage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';

const PrivacyPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container py-20">
        <SectionTitle 
          title="Privacy Policy" 
          subtitle="Your data security and privacy are our top priorities. Learn how we handle your information."
          badge="Privacy"
          align="center"
        />
        <div className="max-w-4xl mx-auto mt-16 bg-white p-10 md:p-16 rounded-[48px] border border-slate-100 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/50 transition-all duration-700"></div>
          
          <h2 className="text-2xl font-black text-slate-900 mb-6">1. Information Collection</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We collect personal information such as name, age, contact details, and relevant insurance profile data (e.g., health status, occupation). This is purely to provide accurate quotes and advisor recommendations.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6 mt-12">2. Data Usage</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Your data is shared with insurance carriers you select during the comparison process. We do not sell your personal data to non-insurance marketing agencies. All data is processed securely through encrypted channels.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6 mt-12">3. User Data Rights</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            You have the right to request, modify, or delete your data from our systems at any time. We comply with global data protection standards to ensure your information remains confidential and safe.
          </p>

          <div className="mt-20 p-10 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
               <p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2">GDPR Compliant</p>
               <h3 className="text-xl font-bold">Secure Global Platform</h3>
             </div>
             <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-600/30">
               🛡️
             </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
