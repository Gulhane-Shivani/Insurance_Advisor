import { Link } from 'react-router-dom';
import '../../styles/globals.css';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-indigo-100/20 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-white text-blue-600 font-semibold text-sm mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Trusted by 50,000+ Families
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-slate-900 leading-[1.05] tracking-tight">
            Smart Insurance for a <span className="text-blue-600">Secure Future</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
            Compare the best insurance plans from top providers side-by-side. Get personalized quotes in minutes with zero hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/compare" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1 text-center no-underline">
              Start Free Comparison
            </Link>
            <Link to="/quote" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all text-center no-underline">
              Schedule Review
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-md">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                +2k
              </div>
            </div>
            <div>
              <div className="flex text-yellow-500 text-sm mb-1">
                {'★★★★★'}
              </div>
              <p className="text-slate-500 text-sm font-medium">4.9/5 Based on 12k+ reviews</p>
            </div>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl skew-y-3 group-hover:skew-y-0 transition-transform duration-700 border-8 border-white/50 backdrop-blur-sm">
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
                <p className="font-bold text-slate-900">$2.5M+</p>
                <p className="text-slate-500 text-xs">Claims Settled Weekly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
