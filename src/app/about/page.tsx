import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle 
              title="We're on a mission to redefine insurance."
              subtitle="With over 15 years in the industry, we've helped over 500,000 clients find peace of mind with tailored protection plans."
              badge="Our Story"
            />
            <div className="flex flex-col gap-8 md:pr-10">
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">Transparency First</h4>
                  <p className="text-slate-600 font-medium">No hidden fees, no complicated jargon. Just honest advice when you need it most.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">Family-Centric</h4>
                  <p className="text-slate-600 font-medium">We treat every client like family, ensuring you get the same protection we'd want for ourselves.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">Always Innovative</h4>
                  <p className="text-slate-600 font-medium">Using cutting-edge tech to compare 1,000s of plans in seconds for the best rates possible.</p>
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

      {/* Advisors Section */}
      <section className="py-24 bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 mb-12">
        <div className="container">
          <SectionTitle 
            title="Meet Our Expert Advisors"
            subtitle="Our team of certified professionals is dedicated to helping you navigate the complex world of insurance."
            badge="The Team"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {[
              { name: 'David Wilson', role: 'Head of Life Insurance', image: 'https://i.pravatar.cc/150?img=68' },
              { name: 'Sarah Miller', role: 'Health Coverage Expert', image: 'https://i.pravatar.cc/150?img=47' },
              { name: 'Robert Fox', role: 'Business Risk Analyst', image: 'https://i.pravatar.cc/150?img=11' },
              { name: 'Emily Davis', role: 'Senior Claims Advisor', image: 'https://i.pravatar.cc/150?img=32' },
            ].map((advisor, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 rounded-[40px] overflow-hidden mb-6 shadow-xl group-hover:-translate-y-2 transition-transform duration-500 border-4 border-slate-50">
                  <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{advisor.name}</h4>
                <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{advisor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden rounded-[48px]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 blur-[100px] rounded-full translate-x-[-50%] translate-y-[-50%]"></div>
        </div>
        <div className="container relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-black mb-2 animate-bounce-slow">500k+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Happy Clients</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2 animate-bounce-slow">15+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Years Experience</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2 animate-bounce-slow">99%</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Claims Settled</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2 animate-bounce-slow">50+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Insurance Partners</div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
