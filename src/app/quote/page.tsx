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
        <div className="container relative z-10 max-w-4xl">
          <SectionTitle 
            title="Get Your Personalized Quote"
            subtitle="Fill out the form below and our AI engine will find the most competitive plans across 50+ providers instantly."
            badge="Fast & Free"
            align="center"
          />
          <div>
            <QuoteForm />
          </div>
         
        </div>
      </section>
    </PageLayout>
  );
};

export default QuotePage;
