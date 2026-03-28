/* src/app/contact/page.tsx */
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ContactForm from '../../components/forms/ContactForm';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const ContactPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle 
              title="Get in touch with us"
              subtitle="Have a question? We're here to help. Reach out to us via email, phone, or stop by our office for a face-to-face consultation."
              badge="Contact Us"
            />
            <div className="flex flex-col gap-10 mt-12">
              <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">📧</div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Email Us</h4>
                  <p className="text-slate-600">hello@insuranceadvisor.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">📞</div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Call Us Anytime</h4>
                  <p className="text-slate-600">+1 (888) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">📍</div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Visit Our Office</h4>
                  <p className="text-slate-600">123 Business Way, Suite 400, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ContactPage;
