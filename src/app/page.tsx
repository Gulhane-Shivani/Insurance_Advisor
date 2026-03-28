import PageLayout from '../components/common/PageLayout';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import QuoteForm from '../components/forms/QuoteForm';
import '../../styles/globals.css';

const Home: React.FC = () => {
  return (
    <PageLayout className="pt-0" bg="bg-white">
      <Hero />
      
      {/* Trust Bar / Partners */}
      <div className="bg-slate-50 py-16 relative z-10">
        <div className="container overflow-hidden">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Trusted by 50+ Global Insurance Carriers</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {['starhealth.in', 'hdfcergo.com', 'icicilombard.com', 'tataaig.com', 'bajajallianz.com'].map((domain) => (
              <img 
                key={domain}
                src={`https://logo.clearbit.com/${domain}`} 
                alt={domain} 
                className="h-8 md:h-10 object-contain hover:scale-110 transition-transform duration-500" 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-20 rounded-[64px] shadow-2xl overflow-hidden pb-10 bg-white">
        <Categories />
        
        <div className="py-24 container">
          <div className="bg-blue-600 rounded-[64px] text-white p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden group shadow-2xl shadow-blue-500/30">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-all duration-1000"></div>
            <div className="max-w-xl relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">Still Unsure Which Plan To Choose?</h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium">Schedule a free 15-minute consultation with our expert advisors and get a custom strategy for your family.</p>
              <button className="bg-white text-blue-600 px-12 py-6 rounded-[32px] font-black text-xl hover:bg-slate-50 shadow-2xl transition-all active:scale-95 group-hover:-translate-y-1">
                Book Free Call
                <span className="ml-3">☎️</span>
              </button>
            </div>
            <div className="relative z-10">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[48px] border-8 border-white/20 overflow-hidden shadow-2xl group-hover:rotate-3 transition-transform duration-700">
                <img src="https://i.pravatar.cc/300?img=5" alt="Advisor" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
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
    </PageLayout>
  );
};

export default Home;
