/* src/components/forms/ContactForm.tsx */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import '../../styles/globals.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/contact', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ full_name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to send message. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/40 transition-colors"></div>
      <h3 className="text-2xl font-black mb-6 text-slate-900 leading-tight">Got Questions? <br/><span className="text-blue-600">Let's Talk.</span></h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Full Name</label>
            <input 
              type="text" 
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Smith" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              disabled={loading}
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
              disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className={`bg-slate-900 text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-slate-400/20 transition-all mt-2 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800'}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
