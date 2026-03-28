/* src/components/common/Footer.tsx */
import React from 'react';
import '../../styles/globals.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Our Solutions',
      links: ['Life Insurance', 'Health Insurance', 'Car Insurance', 'Business Insurance', 'House Protection'],
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Blog', 'Compare Plans', 'Calculators', 'FAQ'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Contact', 'Careers', 'Terms of Service', 'Privacy Policy'],
    },
    {
      title: 'Support',
      links: ['Claim Center', 'Policy Renewal', 'Customer Care', 'Advisor Connect', 'Feedback'],
    },
  ];

  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                IA
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Insu<span className="text-blue-500">Advisor</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Empowering families and businesses with reliable, affordable, and smart insurance solutions.
            </p>
            <div className="flex items-center gap-4 text-slate-300">
              <span className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-all">
                FB
              </span>
              <span className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-all">
                TW
              </span>
              <span className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-all">
                IG
              </span>
              <span className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-all">
                LI
              </span>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-6 text-lg">{section.title}</h4>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <p>© {currentYear} Insurance Advisor. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
