import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, CheckCircle2, X } from 'lucide-react';
import { Card } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const CSRCommunications: React.FC = () => {
  const [comms, setComms] = useState([
    { type: 'SMS', to: '+91 98765 43210', content: 'Your health claim CLM-2026-881 is pending discharge summary. Please upload ASAP.', time: '10:30 AM', status: 'Delivered' },
    { type: 'Email', to: 'vikas.p@example.com', content: 'Reminder: Health Elite Plus renewal is due in 5 days. Link attached.', time: '09:15 AM', status: 'Opened' },
    { type: 'Call', to: '+91 98765 43211', content: 'Discussed NCB calculation query. Resolved on call.', time: 'Yesterday', status: 'Logged' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({ type: 'SMS', to: '', content: '' });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const message = {
      ...newMessage,
      time: 'Just now',
      status: newMessage.type === 'Call' ? 'Logged' : 'Sent'
    };
    setComms([message, ...comms]);
    setIsModalOpen(false);
    toast.success(`${newMessage.type} successfully ${newMessage.type === 'Call' ? 'logged' : 'sent'}`);
    setNewMessage({ type: 'SMS', to: '', content: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <MessageSquare size={20} className="text-violet-600" /> Communication Logs
          </h3>
          <button onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-violet-600/20">
            + New Message
          </button>
        </div>

        <div className="space-y-4">
          {comms.map((comm, i) => (
            <div key={i} className="p-5 border border-slate-100 rounded-2xl flex items-start gap-4 hover:border-violet-200 transition-colors bg-slate-50 cursor-pointer group"
              onClick={() => toast.success(`Opening ${comm.type} thread with ${comm.to}`)}>
              <div className={`p-3 rounded-xl flex-shrink-0 ${comm.type === 'SMS' ? 'bg-indigo-50 text-indigo-600' : comm.type === 'Email' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {comm.type === 'SMS' ? <MessageSquare size={16} /> : comm.type === 'Email' ? <Mail size={16} /> : <Phone size={16} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${comm.type === 'SMS' ? 'bg-indigo-100 text-indigo-700' : comm.type === 'Email' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{comm.type}</span>
                    <p className="text-sm font-bold text-slate-800">{comm.to}</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{comm.time}</span>
                </div>
                <p className="text-xs font-medium text-slate-600 mb-2">{comm.content}</p>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <CheckCircle2 size={12} /> {comm.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* New Message Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">New Communication</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm"><X size={20} /></button>
            </div>
            <form onSubmit={handleSendMessage} className="p-6 space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Type</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-violet-500 outline-none" value={newMessage.type} onChange={e => setNewMessage({...newMessage, type: e.target.value})}>
                      <option>SMS</option>
                      <option>Email</option>
                      <option>Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Recipient / Number</label>
                    <input required type={newMessage.type === 'Email' ? "email" : "text"} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-violet-500 outline-none" value={newMessage.to} onChange={e => setNewMessage({...newMessage, to: e.target.value})} placeholder={newMessage.type === 'Email' ? "customer@email.com" : "+91..."} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Message Content</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:border-violet-500 outline-none resize-none" value={newMessage.content} onChange={e => setNewMessage({...newMessage, content: e.target.value})} placeholder="Type your message or call notes here..."></textarea>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-violet-200">{newMessage.type === 'Call' ? 'Log Call' : 'Send Message'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSRCommunications;
