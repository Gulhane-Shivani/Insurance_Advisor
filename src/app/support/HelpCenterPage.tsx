/* src/app/support/HelpCenterPage.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';
import { Search, BookOpen, ShieldCheck, CreditCard, LifeBuoy } from 'lucide-react';

const HelpCenterPage: React.FC = () => {
  const helpCategories = [
    { title: 'Getting Started', icon: <BookOpen className="w-5 h-5" />, count: 12, color: 'bg-blue-50 text-blue-600' },
    { title: 'Claims & Support', icon: <ShieldCheck className="w-5 h-5" />, count: 8, color: 'bg-green-50 text-green-600' },
    { title: 'Payments & Billing', icon: <CreditCard className="w-5 h-5" />, count: 15, color: 'bg-orange-50 text-orange-600' },
    { title: 'Policy Management', icon: <LifeBuoy className="w-5 h-5" />, count: 10, color: 'bg-indigo-50 text-indigo-600' }
  ];

  const faqs = [
    { q: "How do I download my policy document?", a: "Login to your dashboard and go to the 'My Policies' section." },
    { q: "What documents are required for health claims?", a: "Original hospital bills, discharge summary, and medical reports." },
    { q: "Can I renew my policy after it has expired?", a: "Yes, but a vehicle/health inspection might be required depending on the gap." }
  ];

  return (
    <PageLayout>
      <div className="bg-slate-900 pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -z-0"></div>
        <div className="container relative z-10 text-center">
          <SectionTitle 
            title="How Can We Help You?" 
            subtitle="Search our knowledge base for instant answers or browse by category."
            badge="Help Center"
            align="center"
            variant="light"
          />
          <div className="max-w-2xl mx-auto mt-10 relative">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search by keyword, policy type, or claim ID..." 
               className="w-full bg-white/10 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:bg-white/20 outline-none transition-all placeholder:text-slate-500 font-bold"
             />
          </div>
        </div>
      </div>

      <div className="container -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {helpCategories.map((cat, i) => (
             <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   {cat.icon}
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">{cat.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.count} Articles</p>
             </div>
           ))}
        </div>

        <div className="max-w-3xl mx-auto mb-32">
           <h2 className="text-xl font-black text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Popular Questions</h2>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white transition-colors cursor-pointer group">
                   <h4 className="text-sm font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Q: {faq.q}</h4>
                   <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
           <div className="mt-12 text-center">
              <button className="text-blue-600 font-black text-xs uppercase tracking-widest border-b-2 border-blue-100 hover:border-blue-600 transition-all pb-1">View All FAQs</button>
           </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HelpCenterPage;
