/* src/app/quote/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import QuoteForm from '../../components/forms/QuoteForm';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const QuotePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-10">
          <div className="animate-fade-in-up">
            <SectionTitle 
              title="Get Your Personalized Quote"
              subtitle="Fill out the form below and our AI engine will find the most competitive plans across 50+ providers instantly."
              badge="Fast & Free"
              align="left"
            />
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: '⭐', title: 'Top Rated', text: 'Highly reviewed by 10k+ happy customers.' },
                { icon: '🛡️', title: 'Secure', text: '128-bit bank-grade encryption for your data.' },
                { icon: '⚡', title: 'Fast', text: 'Quotes generated in less than 60 seconds.' },
                { icon: '💼', title: 'Expert Advice', text: 'Free consultation with certified agents.' },
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-2xl mb-1">{benefit.icon}</div>
                  <h4 className="font-bold text-slate-900 text-sm">{benefit.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-blue-800 text-sm font-medium italic">"The process was incredibly smooth. I saved over ₹50,000 annually on my family health cover."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                <div>
                  <p className="text-slate-900 text-xs font-bold">Rajesh Kumar</p>
                  <p className="text-slate-500 text-[10px]">Verified Policy Holder</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <QuoteForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default QuotePage;
