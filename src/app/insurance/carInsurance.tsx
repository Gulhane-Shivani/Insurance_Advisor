/* src/app/insurance/car/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';
import SectionTitle from '../../components/common/SectionTitle';

const CarInsurancePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 text-center mb-16">
          <SectionTitle
            title="Comprehensive Auto Protection"
            subtitle="Secure your vehicle with top-tier insurance that covers everything from accidents to theft."
            badge="Vehicle Insurance"
            align="center"
          />
        </div>
        <InsuranceDetails type="car" />
        <div className="py-24 container flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-slate-900 leading-tight text-center tracking-tight">Insure Your Ride <br /><span className="text-blue-600 underline decoration-blue-500/30 underline-offset-8">Quote In Seconds</span></h2>
          <div className="w-full max-w-2xl bg-white p-8 rounded-[48px] shadow-2xl shadow-slate-200/50">
            <QuoteForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CarInsurancePage;
