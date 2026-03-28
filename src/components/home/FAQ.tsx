/* src/components/home/FAQ.tsx */
import React, { useState } from 'react';
import SectionTitle from '../common/SectionTitle';

const faqs = [
  {
    question: "How does the Insurance Advisor comparison engine work?",
    answer: "Insurance Advisor uses a sophisticated AI-driven engine that scans over 50+ leading insurance providers in real-time. By analyzing your specific requirements—like age, health history, and coverage needs—we provide a sorted list of plans that offer the best value for your money, all in less than 60 seconds."
  },
  {
    question: "Is there any fee for using Insurance Advisor's services?",
    answer: "No, our service is completely free for all users. We believe that everyone should have access to the best insurance advice without any upfront costs. Our platform earns a small commission from insurance providers only when you choose to purchase through us, ensuring our goals are aligned with yours."
  },
  {
    question: "How do I know which insurance plan is right for me?",
    answer: "Our platform provides a detailed 'Match Score' for every plan based on its benefits, claim settlement ratio, and premium costs relative to your profile. Additionally, our certified expert advisors are available for a free consultation to help you understand the fine print."
  },
  {
    question: "Can I buy a policy directly through Insurance Advisor?",
    answer: "Yes, once you find the perfect plan, you can complete the entire application and payment process directly on our secure platform. We handle all the paperwork and coordinate with the insurance company to ensure your policy is issued quickly."
  },
  {
    question: "What support do I get after purchasing a policy?",
    answer: "Our relationship doesn't end with a sale. Insurance Advisor provides lifelong support, including assistance with renewals, policy changes, and most importantly, step-by-step guidance during the claim settlement process to ensure your family gets the benefits they deserve."
  },
  {
    question: "Are the quotes provided by Insurance Advisor unbiased?",
    answer: "Absolutely. Our comparison engine is built on transparency. We rank plans based on objective data like premium rates, coverage limits, and insurer track records. We do not prioritize any provider based on commissions, as our primary goal is your long-term security."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <SectionTitle 
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our advisory process and how we help you secure the best plans."
            badge="Got Questions?"
            align="center"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border-b border-slate-100 transition-all duration-300 ${openIndex === index ? 'bg-slate-50/50 rounded-2xl p-2' : ''}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 px-4 text-left group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-500'}`}>
                  {faq.question}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-blue-600' : 'text-slate-400'}`}>
                  {openIndex === index ? '×' : '+'}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-4 pb-8 text-slate-600 leading-relaxed text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-400/20 transition-all">
                More FAQs →
            </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
