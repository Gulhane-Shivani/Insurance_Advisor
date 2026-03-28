/* src/app/page.tsx */
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import QuoteForm from '../components/forms/QuoteForm';
import '../styles/globals.css';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="bg-white relative z-20 -mt-10 rounded-t-[40px] shadow-2xl overflow-hidden pb-10">
        <Categories />
        <div className="py-24 container flex flex-col items-center">
          <div className="bg-blue-600 w-full p-20 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="max-w-xl relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.05]">Still Unsure Which Plan To Choose?</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed font-medium">Schedule a free 15-minute consultation with our expert advisors and get a custom strategy for your family.</p>
              <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 shadow-2xl transition-all active:scale-[0.98]">
                Book My Free Strategy Call
                <span className="ml-3">☎️</span>
              </button>
            </div>
            <div className="relative z-10 w-full md:w-auto flex justify-center">
              <div className="w-56 h-56 rounded-full border-4 border-white overflow-hidden shadow-2xl">
                <img src="https://i.pravatar.cc/150?img=5" alt="Advisor" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
        <Testimonials />
        <div className="py-24" id="getquote">
          <div className="container">
            <QuoteForm />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
