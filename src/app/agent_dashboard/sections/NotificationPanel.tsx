import React, { useState } from 'react';
import { 
  Bell, 
  RefreshCw, 
  ShieldCheck, 
  IndianRupee, 
  MessageSquare, 
  CreditCard,
  ChevronRight,
  Clock,
  MoreVertical,
  CheckCircle2,
  Trash2
} from 'lucide-react';

const NotificationPanel: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const notifications = [
    { id: 1, type: 'Renewal', title: 'Renewal Reminder', message: 'Policy POL-8826 for Suresh Raina is expiring in 3 days.', time: '10 mins ago', status: 'Unread', icon: RefreshCw, color: 'amber' },
    { id: 2, type: 'Approval', title: 'Policy Approved', message: 'New life insurance policy for Amit Singh (POL-8829) has been approved by Admin.', time: '2 hours ago', status: 'Unread', icon: ShieldCheck, color: 'emerald' },
    { id: 3, type: 'Commission', title: 'Commission Credited', message: 'Commission of ₹1,488 for policy POL-8829 has been credited to your wallet.', time: '5 hours ago', status: 'Read', icon: IndianRupee, color: 'indigo' },
    { id: 4, type: 'Message', title: 'New Customer Message', message: 'Anjali Sharma sent a message regarding health policy documentation.', time: 'Yesterday', status: 'Read', icon: MessageSquare, color: 'blue' },
    { id: 5, type: 'Payment', title: 'Payment Alert', message: 'Premium payment for Vikram Sahay (POL-8827) was successful.', time: 'Yesterday', status: 'Read', icon: CreditCard, color: 'emerald' },
    { id: 6, type: 'Renewal', title: 'Policy Expired', message: 'Policy POL-8825 for Priya Verma has expired. Immediate follow-up required.', time: '2 days ago', status: 'Read', icon: Clock, color: 'rose' },
  ];

  const getFilterStyle = (filter: string) => {
    return activeFilter === filter 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Notification Center</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Stay updated with real-time CRM alerts</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Mark All As Read</button>
           <button className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
              <Trash2 size={18} />
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex bg-white p-1.5 rounded-[20px] border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
         {['All', 'Renewal', 'Approval', 'Commission', 'Message', 'Payment'].map(f => (
           <button
             key={f}
             onClick={() => setActiveFilter(f)}
             className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${getFilterStyle(f)}`}
           >
             {f}
           </button>
         ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
         {notifications.filter(n => activeFilter === 'All' || n.type === activeFilter).map((item) => (
           <div 
             key={item.id} 
             className={`group relative bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all flex items-start gap-5 cursor-pointer ${
               item.status === 'Unread' ? 'before:absolute before:left-0 before:top-8 before:bottom-8 before:w-1.5 before:bg-indigo-600 before:rounded-r-full' : ''
             }`}
           >
              <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                 <item.icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start mb-1">
                    <h4 className="text-base font-black text-slate-800 tracking-tight">{item.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-lg">{item.time}</span>
                 </div>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">{item.message}</p>
                 
                 <div className="mt-4 flex items-center gap-4">
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                       View Details <ChevronRight size={12} />
                    </button>
                    {item.status === 'Unread' && (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                         <CheckCircle2 size={12} /> Mark Read
                      </div>
                    )}
                 </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                 <MoreVertical size={18} />
              </button>
           </div>
         ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
