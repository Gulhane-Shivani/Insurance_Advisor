/* src/app/faq/page.tsx */
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const FAQPage: React.FC = () => {
  const faqs = [
    { question: 'What is the best insurance for a family of four?', answer: 'The best insurance depends on your needs, but generally a comprehensive health and life insurance policy is recommended for a family of four.' },
    { question: 'How much insurance do I need?', answer: 'A common rule of thumb is to have 10-15 times your annual income in life insurance, but this varies based on your financial goals and debts.' },
    { question: 'What is the claim process?', answer: 'The claim process is straightforward: notify our support team, submit the required documents, and our advisors will handle the rest with the provider.' },
    { question: 'Can I change my policy later?', answer: 'Yes, you can upgrade or modify your policy during the renewal period or when life circumstances change, like marriage or having a child.' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 max-w-4xl">
          <SectionTitle 
            title="Have any questions?"
            subtitle="Explore our most frequently asked questions or get in touch with our team for personalized assistance."
            badge="FAQ"
            align="center"
          />
          <div className="flex flex-col gap-8 mt-16">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-10 group overflow-hidden">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-20 p-16 bg-blue-600 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="max-w-xl relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">Still have questions?</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed font-medium">Our support team is available 24/7 to help you with any inquiries you might have.</p>
              <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 shadow-2xl transition-all">
                Contact Support Now
              </button>
            </div>
            <div className="w-56 h-56 rounded-full border-4 border-white overflow-hidden shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500">
               <img src="https://i.pravatar.cc/150?img=12" alt="Support" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default FAQPage;
