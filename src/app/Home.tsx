import PageLayout from '../components/common/PageLayout';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import QuoteForm from '../components/forms/QuoteForm';
import SmartAdvisor from '../components/advisor/SmartAdvisor';
import { partners } from '../data/partners';
import '../styles/globals.css';


const Home: React.FC = () => {
  return (
    <PageLayout bg="bg-white">
      <Hero />

      {/* Trust Bar / Partners */}
      <div className="bg-slate-50 py-12 relative z-30 overflow-hidden">
        <div className="container">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Trusted by 50+ Global Insurance Carriers</p>
          <div className="flex items-center justify-start xl:justify-center gap-6 md:gap-10 opacity-100 transition-all duration-700 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-0">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white p-3 px-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center min-w-[110px] md:min-w-[130px] group/partner">
                <img
                  src={`https://logo.clearbit.com/${partner.domain}`}
                  alt={partner.name}
                  className="h-6 md:h-8 object-contain transition-all duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('clearbit.com')) {
                      target.src = `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`;
                    } else {
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement('span');
                        span.className = 'text-xs font-black text-slate-400';
                        span.innerText = partner.name;
                        parent.appendChild(span);
                      }
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-20 rounded-[64px] shadow-2xl overflow-hidden pb-10 bg-white">
        <Categories />


        <Testimonials />

        <FAQ/>

        <div className="pt-8 pb-24 bg-slate-50 relative" id="advisor">
          <div className="container relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight">Meet Your Digital <span className="text-blue-600">Insurance Advisor</span></h2>
              <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">Get unbiased, AI-powered recommendations based on your exact profile, goals, and risk appetite.</p>
            </div>
            <SmartAdvisor />
          </div>
        </div>

        <div className="py-24" id="getquote">
          <div className="container">
            <QuoteForm />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
