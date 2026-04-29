import React from 'react';
import { MessageSquare, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const CSRCommunications: React.FC = () => {
  const comms = [
    { type: 'SMS', to: '+91 98765 43210', content: 'Your health claim CLM-2026-881 is pending discharge summary. Please upload ASAP.', time: '10:30 AM', status: 'Delivered' },
    { type: 'Email', to: 'vikas.p@example.com', content: 'Reminder: Health Elite Plus renewal is due in 5 days. Link attached.', time: '09:15 AM', status: 'Opened' },
    { type: 'Call', to: '+91 98765 43211', content: 'Discussed NCB calculation query. Resolved on call.', time: 'Yesterday', status: 'Logged' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <MessageSquare size={20} className="text-violet-600" /> Communication Logs
          </h3>
          <button onClick={() => toast.success('Opening new communication form...')}
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
    </div>
  );
};

export default CSRCommunications;
