import React, { useState } from 'react';
import { HelpCircle, Search, Phone, MessageSquare, Book, ExternalLink, MessageCircle, Heart, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showGuides, setShowGuides] = useState(false);

  const handleSearchKB = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    toast.success(`Found 3 results for "${searchQuery}"`);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Submitting review...', { duration: 1500 });
    setTimeout(() => {
      toast.success('Thank you for your feedback!');
      setShowFeedbackForm(false);
    }, 1500);
  };

  const faqs = [
    { q: 'How to download policy document?', a: 'Go to the "My Policies" section from the sidebar, click on your active policy card, and you will see a "Download PDF" button. Your document will be saved as a text file or PDF immediately.' },
    { q: 'What is the claim settlement ratio?', a: 'Our partners (HDFC Ergo, Tata AIG, LIC) maintain an industry-leading average claim settlement ratio of 98.5%, ensuring peace of mind for you and your family.' },
    { q: 'Can I pay premium via UPI?', a: 'Yes, we support all major UPI apps including Google Pay, PhonePe, and Paytm. You can find the payment option under the "Payments" tab in your dashboard.' },
    { q: 'How to add a new nominee?', a: 'To update your nominee, go to the "Services" section and select "Nominee Change". Fill out the required details and our team will update your records within 24 hours.' }
  ];

  const guides = [
    { title: 'Choosing the Right Plan', duration: '5 min read', icon: '🎯' },
    { title: 'Claim Process Walkthrough', duration: '8 min read', icon: '📋' },
    { title: 'Understanding Tax Benefits', duration: '6 min read', icon: '💰' },
    { title: 'Policy Renewal Guide', duration: '4 min read', icon: '🔄' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showFeedbackForm) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Write a Review</h1>
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 max-w-2xl">
           <form className="space-y-6" onSubmit={handleFeedbackSubmit}>
              <div className="flex gap-2">
                 {[1,2,3,4,5].map(star => (
                    <button key={star} type="button" className="text-3xl text-orange-400 hover:scale-110 transition-transform">★</button>
                 ))}
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share your experience</label>
                 <textarea 
                   rows={4}
                   placeholder="What do you like about our service?"
                   className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50"
                 />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowFeedbackForm(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Post Review</button>
              </div>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">How can we help?</h1>
        <p className="text-slate-500 font-medium">Search our knowledge base or get in touch with our experts.</p>
        
        <form onSubmit={handleSearchKB} className="relative mt-8 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for policies, claims, or account settings..."
            className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[24px] shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-sm font-medium"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
           <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-black text-slate-900 mb-2">Call Us</h3>
           <p className="text-slate-500 text-xs leading-relaxed mb-6">Talk to our experts for immediate assistance with your queries.</p>
           <a 
             href="tel:18002005555"
             className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center"
           >
              1800-200-5555
           </a>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
           <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-black text-slate-900 mb-2">WhatsApp</h3>
           <p className="text-slate-500 text-xs leading-relaxed mb-6">Quick resolutions for your service requests on WhatsApp.</p>
           <a 
             href="https://wa.me/919812345678"
             target="_blank"
             rel="noreferrer"
             className="w-full py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center"
           >
              Start Chat
           </a>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
           <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-black text-slate-900 mb-2">Guides</h3>
           <p className="text-slate-500 text-xs leading-relaxed mb-6">Read our detailed guides on choosing the right insurance.</p>
           <button 
             onClick={() => setShowGuides(!showGuides)}
             className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center border ${
               showGuides ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
             }`}
           >
              {showGuides ? 'Close Guides' : 'Browse KB'}
           </button>
        </div>
      </div>

      {showGuides && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-right-4 duration-500">
           {guides.map((guide, i) => (
             <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">{guide.icon}</div>
                <h4 className="text-sm font-black text-slate-900 mb-1">{guide.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{guide.duration}</p>
             </div>
           ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 px-2">
             <HelpCircle className="w-6 h-6 text-blue-600" />
             Frequently Asked Questions
           </h2>
           <div className="space-y-4">
              {(searchQuery ? filteredFaqs : faqs).map((faq, i) => (
                <div key={i} className="bg-white rounded-[24px] border border-slate-100 overflow-hidden group">
                   <button 
                     onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                     className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                   >
                      <span className={`text-sm font-black transition-colors ${expandedFaq === i ? 'text-blue-600' : 'text-slate-800'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-300 transition-all duration-300 ${expandedFaq === i ? 'rotate-180 text-blue-600' : ''}`} />
                   </button>
                   {expandedFaq === i && (
                     <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm text-slate-500 font-medium leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                           {faq.a}
                        </p>
                     </div>
                   )}
                </div>
              ))}
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-10">
                   <p className="text-slate-400 font-bold">No matching questions found.</p>
                </div>
              )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-blue-600 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-blue-200">
              <div className="relative z-10">
                 <Heart className="w-10 h-10 text-blue-200 mb-6 group-hover:scale-110 transition-transform duration-500" />
                 <h3 className="text-2xl font-black mb-2">Share Feedback</h3>
                 <p className="text-blue-100 text-xs font-medium leading-relaxed mb-8">
                    Your feedback helps us build a better experience for everyone.
                 </p>
                 <button 
                   onClick={() => setShowFeedbackForm(true)}
                   className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95"
                 >
                    Write a Review <ExternalLink className="w-3.5 h-3.5" />
                 </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white rounded-[40px] border border-slate-100 p-10 text-center">
              <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <h4 className="text-sm font-black text-slate-900 mb-1">Still stuck?</h4>
              <p className="text-xs text-slate-400 font-medium mb-6">Our average response time is 15 mins.</p>
              <button 
                onClick={() => toast('Connecting to live chat agent...')}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
              >
                 Start Live Chat
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
