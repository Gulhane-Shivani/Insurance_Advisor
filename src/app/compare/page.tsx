/* src/app/compare/page.tsx */
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SectionTitle from '../../components/common/SectionTitle';
import CompareTable from '../../components/compare/CompareTable';
import '../../styles/globals.css';

const ComparePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 max-w-5xl">
          <SectionTitle 
            title="Side-by-side comparison"
            subtitle="Compare our top insurance plans and choose the one that's perfect for you. Our plans are tailored to meet every life stage and budget."
            badge="Comparison Tool"
            align="center"
          />
          <div className="mt-16">
            <CompareTable />
          </div>
          <div className="mt-24 p-16 bg-white rounded-[40px] border border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/50 transition-all duration-700"></div>
            <div className="max-w-xl relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-slate-900 leading-tight">Need a custom plan?</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">Looking for something more specific to your requirements? Our expert advisors can create a custom policy just for you.</p>
              <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-2xl transition-all">
                Request Custom Quote
                <span className="ml-3">🔥</span>
              </button>
            </div>
            <div className="relative z-10 w-full md:w-auto flex justify-center mt-12 md:mt-0">
               <div className="w-56 h-56 rounded-full border-4 border-white overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                 <img src="https://i.pravatar.cc/150?img=15" alt="Custom Advisor" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ComparePage;
