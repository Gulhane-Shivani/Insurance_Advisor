import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero_family.png';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-40 bg-slate-50">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 -z-20"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-md text-blue-700 font-black text-xs mb-8 shadow-sm w-fit transition-transform hover:scale-105 duration-300 cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
              Trusted by 50,000+ Families Worldwide
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-slate-900 leading-[1.1] tracking-tight">
              Smart Insurance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">for your future.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed max-w-xl font-medium">
              Experience the next generation of insurance. Compare top plans, get AI-powered insights, and secure your world in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/compare" className="group relative bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-base hover:bg-blue-600 transition-all duration-300 shadow-2xl shadow-slate-900/20 active:scale-[0.98] text-center no-underline overflow-hidden">
                <span className="relative z-10">Start Free Comparison</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link to="/quote" className="bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-black text-base hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 active:scale-[0.98] text-center no-underline">
                Schedule Review
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-xl hover:translate-y-[-4px] transition-transform duration-300">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-xl">
                  +12k
                </div>
              </div>
              <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
              <div>
                <div className="flex text-amber-400 text-sm mb-1">
                  {'★★★★★'}
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Verified Excellence</p>
              </div>
            </div>
          </div>

          <div className="relative group lg:mt-0 mt-8">
            {/* Animated Cards Background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60 animate-bounce-slow"></div>
            
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-white p-2 max-w-lg mx-auto">
              <div className="rounded-[2rem] overflow-hidden relative group">
                <img 
                  src={heroImg} 
                  alt="Insurance Support" 
                  className="w-full object-cover aspect-[4/3] transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Floating Glass Widget 1 */}
            <div className="absolute -bottom-10 -left-10 z-20 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 animate-float max-w-[240px]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
                  🛡️
                </div>
                <div>
                  <p className="font-black text-slate-900 text-xl leading-none mb-1">$2.5M+</p>
                  <p className="text-slate-500 text-[9px] uppercase font-black tracking-widest leading-none">Claims Weekly</p>
                </div>
              </div>
            </div>

            {/* Floating Glass Widget 2 */}
            <div className="absolute top-10 -right-8 z-20 bg-white/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-white/50 animate-float-delayed flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-black text-slate-700">AI Advisor Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
