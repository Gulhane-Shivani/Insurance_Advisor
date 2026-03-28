/* src/app/insurance/health/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';

const HealthInsurancePage: React.FC = () => {
  return (
    <PageLayout>       
        <InsuranceDetails type="health" />
        <section className="relative overflow-hidden mb-16">
        <div className="py-24 container flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-slate-900 leading-tight text-center tracking-tight">Protect Your Health <br /><span className="text-blue-600 underline decoration-blue-500/30 underline-offset-8">Compare Quotes Now</span></h2>
          <div className="w-full max-w-2xl bg-white p-8 rounded-[48px] shadow-2xl shadow-slate-200/50">
            <QuoteForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HealthInsurancePage;
