import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-4 pb-20 md:pt-8 md:pb-32 bg-slate-50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-indigo-100/20 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-100 bg-white text-blue-600 font-bold text-[10px] sm:text-xs mb-6 shadow-sm w-fit">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              Trusted by 50,000+ Families
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 leading-tight tracking-tight">
              Smart Insurance for a <span className="text-blue-600">Secure Future</span>
            </h1>
            
            <p className="text-sm sm:text-lg text-slate-500 mb-6 sm:mb-8 leading-relaxed max-w-lg font-medium">
              Compare the best insurance plans from top providers side-by-side. Get personalized quotes in minutes with zero hidden fees.
            </p>

            {/* Mobile Image: Only visible on lg and below, moved up */}
            <div className="lg:hidden relative mb-8">
               <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800" 
                    alt="Insurance Planning" 
                    className="w-full object-cover aspect-video"
                  />
               </div>
               <div className="absolute -bottom-3 -right-3 z-20 bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                  <p className="font-black text-slate-900 text-xs">$2.5M+</p>
                  <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Claims Weekly</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/compare" className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] text-center no-underline">
                Start Free Comparison
              </Link>
              <Link to="/quote" className="bg-white text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-black text-sm hover:border-blue-200 hover:bg-blue-50/30 transition-all active:scale-[0.98] text-center no-underline">
                Schedule Review
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-[10px] mb-0.5">
                  {'★★★★★'}
                </div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">12k+ Global Reviews</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative group perspective-1000">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl lg:skew-y-3 group-hover:skew-y-0 transition-transform duration-700 border-8 border-white/50 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200" 
                alt="Insurance Planning" 
                className="w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 z-20 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-2xl">
                  🛡️
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">$2.5M+</p>
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Claims Settled Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
