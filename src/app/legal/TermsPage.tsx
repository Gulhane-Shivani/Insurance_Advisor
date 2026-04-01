/* src/app/legal/TermsPage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';

const TermsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container py-20">
        <SectionTitle 
          title="Terms of Service" 
          subtitle="Please read our terms and conditions carefully before using our platform services."
          badge="Legal"
        />
        <div className="max-w-4xl mx-auto mt-12 prose prose-slate prose-lg bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-black text-slate-900 mb-6">1. Acceptance of Terms</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            By accessing and using this Insurance Advisor platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please refrain from using our services.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6 mt-12">2. Advisor Disclosure</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We act as a digital comparison platform. While we provide expert recommendations, final policy selection and purchase are between you and the insurance carrier. We ensure data accuracy but recommend verifying specific policy documents before purchase.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6 mt-12">3. User Responsibilities</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Users must provide accurate, current, and complete information during the quote process. Falsification of data can lead to policy premium changes or claim rejections by carriers.
          </p>

          <div className="mt-16 p-8 bg-blue-50 rounded-3xl border border-blue-100">
             <p className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-widest">Questions about these terms?</p>
             <p className="text-slate-600">Contact our legal team at <span className="font-black text-slate-900">legal@insuranceadvisor.com</span></p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
