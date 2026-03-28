/* src/components/home/FAQ.tsx */
import React, { useState } from 'react';
import SectionTitle from '../common/SectionTitle';

const faqs = [
  {
    question: "How does the Beshak Community Connect Program work?",
    answer: "You can go through the profiles of advisor listed on our website and choose the one that you prefer. With the help of the advisor, you can generate a personalized Beshak TruMatch report to understand which plans fit your needs the best. This report will be created by Beshak's research-backed algorithm and will be 100% unbiased. The advisor will discuss this report with you and help you make informed decisions. After you zero down on a plan and make the purchase, the advisor will be there by your side and help you throughout your insurance journey."
  },
  {
    question: "How do I connect with the advisor?",
    answer: "Connecting with an advisor is simple. Once you browse the profiles and find a match, just click the 'Connect' button. You can then schedule a call or start a chat directly through our specialized portal."
  },
  {
    question: "Will I have to give my email id or mobile number before connecting with the advisor?",
    answer: "Yes, for security and verification purposes, we require a valid email or mobile number. This ensures that only real users are connected with our expert advisors and helps in maintaining professional communication."
  },
  {
    question: "How can I book an appointment with the advisor?",
    answer: "After selecting an advisor, you'll see their availability calendar. Simply pick a time slot that works for you, and you'll receive a confirmation email with all the necessary details for the meeting."
  },
  {
    question: "What if I don't want to continue with the advisor I chose?",
    answer: "You are never locked in. If you feel the advisor isn't the right fit for your needs, you can simply stop the engagement and choose a different advisor from our community at any time."
  },
  {
    question: "How can I connect with the Beshak Team in case of any queries?",
    answer: "Our support team is available 24/7. You can reach out via the 'Contact Us' page, email us at support@futureinvo.com, or use the live chat feature on our website for instant assistance."
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
