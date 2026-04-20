import PageLayout from '../components/common/PageLayout';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import QuoteForm from '../components/forms/QuoteForm';
import SmartAdvisor from '../components/advisor/SmartAdvisor';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ProcessSection from '../components/home/ProcessSection';
import { partners } from '../data/partners';
import '../styles/globals.css';

const Home: React.FC = () => {
  return (
    <PageLayout bg="bg-white">
      <Hero />

      {/* Trust Bar / Partners */}
      <div className="bg-slate-50 py-12 relative z-30 overflow-hidden border-y border-slate-100">
        <div className="container">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Trusted by 50+ Global Insurance Carriers</p>
          <div className="relative flex items-center overflow-hidden">
            <div className="animate-marquee flex items-center gap-10 md:gap-16">
              {[...partners, ...partners].map((partner, idx) => (
                <div key={`${partner.id}-${idx}`} className="bg-white p-4 px-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center min-w-[160px] flex-shrink-0 group/partner">
                  <img
                    src={`https://logo.clearbit.com/${partner.domain}`}
                    alt={partner.name}
                    className="h-8 md:h-10 object-contain transition-all duration-500"
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
      </div>

      <StatsSection />
      
      <div className="relative z-20 rounded-[32px] md:rounded-[64px] overflow-hidden bg-white">
        <Categories />
        
        <FeaturesSection />

        <ProcessSection />

        <Testimonials />

        <div className="pt-8 pb-8 bg-slate-50 relative scroll-mt-28" id="advisor">
          <div className="container relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Meet Your Digital <span className="text-blue-600">Insurance Advisor</span></h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">Get unbiased, AI-powered recommendations based on your exact profile, goals, and risk appetite.</p>
            </div>
            <SmartAdvisor />
          </div>
        </div>

        <div className="py-8">
          <FAQ />
        </div>

        <div className="py-8 bg-slate-50" id="getquote">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
