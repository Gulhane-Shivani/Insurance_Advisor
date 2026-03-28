/* src/app/insurance/business/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';
import SectionTitle from '../../components/common/SectionTitle';

const BusinessInsurancePage: React.FC = () => {
  return (
    <PageLayout>
      <InsuranceDetails type="business" />
      <div className="py-24 container flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-slate-900 leading-tight text-center tracking-tight">Protect Your Enterprise <br/><span className="text-blue-600 underline decoration-blue-500/30 underline-offset-8">Get Expert Consultation</span></h2>
        <div className="w-full max-w-2xl bg-white p-8 rounded-[48px] shadow-2xl shadow-slate-200/50">
          <QuoteForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default BusinessInsurancePage;
