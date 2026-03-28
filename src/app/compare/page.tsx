/* src/app/compare/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';
import ComparisonSuite from '../../components/compare/ComparisonSuite';
import '../../styles/globals.css';

const ComparePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10">
          <SectionTitle 
            title="Policy Comparison Hub"
            subtitle="Compare top insurance policies side-by-side. Filter by price, coverage, and specific carriers to find your perfect match."
            badge="Advanced Comparison"
            align="center"
          />
          <div className="mt-16">
            <ComparisonSuite />
          </div>
          <div className="mt-24 p-16 bg-white rounded-[48px] border border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/50 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Need expert help choosing the right plan?</h3>
                <p className="text-lg text-slate-500 font-medium">Our certified advisors can help you navigate the fine print and find the best value for your specific needs.</p>
              </div>
              <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95 whitespace-nowrap">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ComparePage;
