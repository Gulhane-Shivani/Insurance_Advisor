import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle 
              title="We're on a mission to redefine insurance."
              subtitle="With over 15 years in the industry, we've helped over 500,000 clients find peace of mind with tailored protection plans."
              badge="Our Story"
            />
            <div className="flex flex-col gap-6 md:pr-6">
              {[
                { n: '1', t: 'Transparency First', d: 'No hidden fees, no complicated jargon. Just honest advice when you need it most.' },
                { n: '2', t: 'Family-Centric', d: 'We treat every client like family, ensuring you get the same protection we\'d want for ourselves.' },
                { n: '3', t: 'Always Innovative', d: 'Using cutting-edge tech to compare 1,000s of plans in seconds for the best rates possible.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold group-hover:scale-110 transition-transform flex-shrink-0">{item.n}</div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-slate-900 group-hover:text-blue-600 transition-colors">{item.t}</h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl overflow-hidden shadow-lg h-60 md:h-72">
              <img src="https://media.istockphoto.com/id/1226082621/photo/insurance-concept-stack-of-wooden-blocks-with-words-life-health-legal-expenses-business-house.jpg?s=612x612&w=0&k=20&c=5bKk7pRl9jewZM_nmIquyGOj4Q7BVNiYRcJC9H1smfE=" alt="Insurance Concepts" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-60 md:h-72 translate-y-6">
              <img src="https://www.avivaindia.com/sites/default/files/Types-of-Insurance.jpg" alt="Types of Insurance" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg h-56 md:h-64 mt-6">
              <img src="https://static.investindia.gov.in/s3fs-public/2019-05/Insurance1.jpg" alt="Insurance Statistics" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-16 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 mb-8 border border-slate-50">
        <div className="container">
          <SectionTitle 
            title="Meet Our Expert Advisors"
            subtitle="Our team of certified professionals is dedicated to helping you navigate the complex world of insurance."
            badge="The Team"
            align="center"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { name: 'David Wilson', role: 'Head of Life Insurance', image: 'https://i.pravatar.cc/150?img=68' },
              { name: 'Sarah Miller', role: 'Health Coverage Expert', image: 'https://i.pravatar.cc/150?img=47' },
              { name: 'Robert Fox', role: 'Business Risk Analyst', image: 'https://i.pravatar.cc/150?img=11' },
              { name: 'Emily Davis', role: 'Senior Claims Advisor', image: 'https://i.pravatar.cc/150?img=32' },
            ].map((advisor, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-32 h-32 rounded-3xl overflow-hidden mb-4 shadow-lg group-hover:-translate-y-1 transition-transform duration-500 border-2 border-slate-50">
                  <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{advisor.name}</h4>
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-wider">{advisor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden rounded-[32px]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 blur-[100px] rounded-full translate-x-[-50%] translate-y-[-50%]"></div>
        </div>
        <div className="container relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-black mb-1 animate-bounce-slow">500k+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1 animate-bounce-slow">15+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1 animate-bounce-slow">99%</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Claims Settled</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1 animate-bounce-slow">50+</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Partners</div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
