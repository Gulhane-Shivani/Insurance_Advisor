/* src/app/insurance/car/page.tsx */
import React from 'react';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import InsuranceDetails from '../../../components/insurance/InsuranceDetails';
import QuoteForm from '../../../components/forms/QuoteForm';
import SectionTitle from '../../../components/common/SectionTitle';
import '../../../styles/globals.css';

const CarInsurancePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 text-center mb-16">
          <SectionTitle 
            title="Advanced Vehicle Guard"
            subtitle="Keep your vehicle protected from accidents, theft, and natural disasters."
            badge="Car Insurance"
            align="center"
          />
        </div>
        <InsuranceDetails type="car" />
        <div className="py-24 container flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-slate-900 leading-tight text-center">Get Your Car Insurance <br/><span className="text-blue-600">Quote In 2 Minutes</span></h2>
            <div className="w-full max-w-2xl">
              <QuoteForm />
            </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CarInsurancePage;
