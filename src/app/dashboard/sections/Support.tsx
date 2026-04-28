import React from 'react';
import { LifeBuoy, MessageSquare, Phone, Mail, FileQuestion, ChevronRight, Send, Search, Sparkles, ExternalLink } from 'lucide-react';

const Support: React.FC = () => {
  const faqs = [
    { q: 'How do I download my policy document?', a: 'Navigate to "My Policies" and click on the "PDF" button for the respective policy card.' },
    { q: 'Can I change my nominee online?', a: 'Yes, you can raise a "Nominee Change" request in the Service Requests section.' },
    { q: 'What is the grace period for premium payment?', a: 'Generally, it is 30 days for life insurance and 15 days for health/motor insurance.' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-3">
              <LifeBuoy className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer Assistance</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Help Center</h1>
           <p className="text-slate-500 font-medium mt-2">Get instant support or explore our knowledge base for answers.</p>
        </div>
        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3">
           <Sparkles className="w-5 h-5 text-blue-600" />
           <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">AI Support Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Grid */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Live Chat', icon: MessageSquare, color: 'bg-blue-50 text-blue-600', desc: 'Agent available', target: 'Chat' },
                { label: 'WhatsApp', icon: Phone, color: 'bg-emerald-50 text-emerald-600', desc: 'Instant reply', target: 'Connect' },
                { label: 'Call Support', icon: Phone, color: 'bg-purple-50 text-purple-600', desc: '1800-123-4567', target: 'Call' },
              ].map((method, i) => (
                <button key={i} className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all text-center group">
                   <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                      <method.icon className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 mb-1">{method.label}</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{method.desc}</p>
                   <span className="inline-flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:underline">
                      {method.target} <ExternalLink className="w-3 h-3" />
                   </span>
                </button>
              ))}
           </div>

           {/* Support Ticket Card */}
           <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <LifeBuoy className="w-6 h-6 text-blue-600" />
                    Open a Support Ticket
                 </h3>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Issue Category</label>
                       <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
                          <option>Premium Payment Issue</option>
                          <option>Claim Status Inquiry</option>
                          <option>Policy Correction</option>
                          <option>App Feedback</option>
                          <option>Other Queries</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Priority Level</label>
                       <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
                          <option>Normal</option>
                          <option>Urgent</option>
                          <option>Critical (System Failure)</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Short Description</label>
                    <input type="text" placeholder="e.g. Unable to download health policy PDF" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Detailed Message</label>
                    <textarea rows={4} placeholder="Please provide as much detail as possible..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all resize-none"></textarea>
                 </div>
                 <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3">
                    Submit Support Ticket
                    <Send className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        {/* Sidebar: FAQs */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-200/50">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-3">
                 <FileQuestion className="w-5 h-5 text-orange-500" />
                 Popular Questions
              </h3>
              <div className="space-y-6">
                 {faqs.map((faq, i) => (
                   <div key={i} className="group cursor-pointer">
                      <p className="text-sm font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                         {faq.q}
                         <ChevronRight className="w-4 h-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1">
                         {faq.a}
                      </p>
                      <div className="h-px bg-slate-200 mt-6 group-last:hidden"></div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                 Search Knowledge Base
              </button>
           </div>

           {/* Feedback Promo */}
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200 group">
              <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-3">Help us improve Insurance Advisor?</h3>
                 <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">
                   Your feedback drives our innovation. Share your experience with us.
                 </p>
                 <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95">
                    Share Feedback
                 </button>
              </div>
              {/* Decoration */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
