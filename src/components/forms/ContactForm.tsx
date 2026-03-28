/* src/components/forms/ContactForm.tsx */
import React, { useState } from 'react';
import '../../styles/globals.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending contact message:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/40 transition-colors"></div>
      <h3 className="text-2xl font-black mb-6 text-slate-900 leading-tight">Got Questions? <br/><span className="text-blue-600">Let's Talk.</span></h3>
      {submitted && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-xl border border-green-100 text-sm font-medium flex items-center gap-2">
          <span className="text-lg">✅</span> Message sent successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Subject</label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?" 
            className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Message</label>
          <textarea 
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..." 
            className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm resize-none"
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          className="bg-slate-900 text-white py-3.5 rounded-xl font-bold text-base hover:bg-slate-800 shadow-lg shadow-slate-400/20 transition-all mt-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
