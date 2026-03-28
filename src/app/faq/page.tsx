/* src/app/faq/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const FAQPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 max-w-4xl">
          <SectionTitle 
            title="Common Questions & Answers"
            subtitle="Everything you need to know about our insurance policies and comparison platform."
            badge="Help Center"
            align="center"
          />
          <div className="mt-20 flex flex-col gap-6">
            {[
              { q: "How does the comparison tool work?", a: "Our AI-powered engine analyzes thousands of data points across global carriers to find the best balance of coverage and price for your specific profile." },
              { q: "Is my personal data secure?", a: "Absolutely. We use bank-grade encryption and never sell your lead data to third parties without your explicit consent." },
              { q: "Can I cancel my policy online?", a: "Most policies can be managed or cancelled directly through our integrated User Dashboard or by contacting our 24/7 claims support." },
              { q: "Do you charge any commission?", a: "Our service is free for users. We are compensated by our insurance partners, allowing us to offer you neutral, expert advice." },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group cursor-pointer">
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-between group-hover:text-blue-600 transition-colors">
                  {faq.q}
                  <span className="text-2xl text-blue-500 group-hover:rotate-90 transition-transform">→</span>
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
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
    </PageLayout>
  );
};

export default FAQPage;
