/* src/app/about/page.tsx */
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle 
              title="We're on a mission to redefine insurance."
              subtitle="With over 15 years in the industry, we've helped over 500,000 clients find peace of mind with tailored protection plans."
              badge="Our Story"
            />
            <div className="flex flex-col gap-8 md:pr-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Transparency First</h4>
                  <p className="text-slate-600">No hidden fees, no complicated jargon. Just honest advice when you need it most.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Family-Centric</h4>
                  <p className="text-slate-600">We treat every client like family, ensuring you get the same protection we'd want for ourselves.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">Always Innovative</h4>
                  <p className="text-slate-600">Using cutting-edge tech to compare 1,000s of plans in seconds for the best rates possible.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 blur-2xl rounded-3xl group-hover:bg-blue-600/10 transition-colors"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm -rotate-2 group-hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1521791136064-7986c295944b?auto=format&fit=crop&q=80&w=1200" alt="Team" className="w-full h-[600px] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-2xl shadow-2xl border border-slate-100 z-20 flex flex-col items-center">
              <span className="text-5xl font-black text-blue-600 mb-2">15+</span>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Years Experience</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AboutPage;
