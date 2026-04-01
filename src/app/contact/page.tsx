import PageLayout from '../../components/common/PageLayout';
import ContactForm from '../../components/forms/ContactForm';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const ContactPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle 
              title="We're Here to Help You Secure Your Future"
              subtitle="Have questions about our plans or need expert advice? Reach out to us and we'll get back to you within 24 hours."
              badge="Contact Us"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {[
                { icon: '📞', title: 'Call Us', details: '+91 7981107131', sub: 'Future Invo Solution' },
                { icon: '✉️', title: 'Email', details: 'info@futureinvo.com', sub: '24/7 Support' },
                { icon: '📍', title: 'Office', details: '13th floor, Manjeera Trinity Corporate, KPHB phase 3, beside LULU Mall', sub: 'Hyderabad, Telangana, India' },
                { icon: '💬', title: 'Live Chat', details: 'Online Now', sub: 'Instant Response' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-md border border-slate-100 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h4>
                    <p className="text-blue-600 font-black text-xs">{item.details}</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
