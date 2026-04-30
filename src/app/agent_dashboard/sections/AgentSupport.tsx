import React, { useState } from 'react';
import { HelpCircle, FileText, MessageCircle, Phone, ArrowRight, Search, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import { Card } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const AgentSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    { q: 'How do I issue a new policy?', a: 'Navigate to the Customers tab and click on the "Issue Policy" button. Fill in the required details and click "Issue Policy Document".' },
    { q: 'How is my commission calculated?', a: 'Commission is calculated based on the policy type and premium amount. You can view detailed breakdowns in the Finance tab.' },
    { q: 'What happens to expired leads?', a: 'Expired leads are automatically moved to the "Cold" status after 30 days of inactivity. You can filter them in the Leads Management tab.' },
    { q: 'How do I reset my password?', a: 'Go to your Profile settings by clicking the gear icon in the sidebar, then navigate to Security and click "Change Password".' }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Support ticket submitted successfully! Ticket ID: #TCK-' + Math.floor(1000 + Math.random() * 9000));
      setTicketSubject('');
      setTicketDescription('');
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 py-8 bg-indigo-600 rounded-[32px] shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <HelpCircle size={200} />
        </div>
        <div className="relative z-10 px-6">
          <h2 className="text-3xl font-black tracking-tight">How can we help you?</h2>
          <p className="text-indigo-200 font-medium max-w-xl mx-auto">Search our knowledge base or submit a ticket to our agent support team.</p>
          
          <div className="mt-8 max-w-2xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent rounded-2xl text-slate-800 font-bold outline-none focus:border-indigo-400 focus:ring-4 focus:ring-white/20 transition-all shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Options */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-gradient-to-b from-white to-slate-50">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Phone size={20} className="text-indigo-600" /> Contact Support
            </h3>
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Agent Helpline (24/7)</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">1800-123-4567</h4>
                    <p className="text-xs text-slate-500 font-medium">Toll-free across India</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">agents@advisor.com</h4>
                    <p className="text-xs text-slate-500 font-medium">Avg. response: 2 hours</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Chat</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">Start a Conversation</h4>
                    <p className="text-xs text-slate-500 font-medium">Online right now</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-indigo-50 border-2 border-indigo-100">
            <h3 className="text-lg font-black text-indigo-900 mb-2">Training Academy</h3>
            <p className="text-sm text-indigo-700/80 font-medium mb-6">Upgrade your selling skills with our free certification courses.</p>
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
              Browse Courses <ExternalLink size={16} />
            </button>
          </Card>
        </div>

        {/* Right Column - FAQs and Ticket Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Submit a Ticket */}
          <Card className="p-8 border-none shadow-xl shadow-slate-200/40">
            <h3 className="text-xl font-black text-slate-800 mb-2">Submit a Request</h3>
            <p className="text-sm text-slate-500 font-medium mb-8">Need help with a specific issue? Send us a message and we'll get back to you.</p>
            
            <form onSubmit={handleTicketSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                <input 
                  required 
                  type="text" 
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 focus:bg-white outline-none transition-colors" 
                  placeholder="E.g., Issue with commission payout" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  required 
                  rows={5} 
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:bg-white outline-none resize-none transition-colors" 
                  placeholder="Please describe your issue in detail..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Ticket'} <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </Card>

          {/* Quick FAQs */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-indigo-600" /> Frequently Asked Questions
            </h3>
            
            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{faq.q}</h4>
                    <ChevronDown size={18} className="text-slate-400" />
                  </div>
                  <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed hidden group-hover:block border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-2">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSupport;
