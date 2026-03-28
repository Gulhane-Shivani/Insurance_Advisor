import PageLayout from '../components/common/PageLayout';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import QuoteForm from '../components/forms/QuoteForm';
import '../styles/globals.css';

const Home: React.FC = () => {
  return (
    <PageLayout className="pt-0" bg="bg-white">
      <Hero />

      {/* Trust Bar / Partners */}
      <div className="bg-slate-50 py-16 relative z-30">
        <div className="container overflow-hidden">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Trusted by 50+ Global Insurance Carriers</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-70 group hover:opacity-100 transition-all duration-700">
            {['starhealth.in', 'hdfcergo.com', 'icicilombard.com', 'tataaig.com', 'bajajallianz.com'].map((domain) => (
              <div key={domain} className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center min-w-[120px]">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
                  alt={domain}
                  className="h-8 md:h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://logo.clearbit.com/${domain}`;
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
