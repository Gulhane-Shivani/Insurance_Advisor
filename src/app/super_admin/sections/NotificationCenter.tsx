import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  UserPlus, 
  CreditCard, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  Trash2,
  Check
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'customer' | 'payment' | 'policy' | 'alert';
  time: string;
  isRead: boolean;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Generate intelligent notifications based on recent system activity
    const generateNotifications = () => {
       const notifs: Notification[] = [
         {
           id: 'notif-1',
           title: 'Payment Completed Successfully',
           message: 'A premium payment of ₹15,000 for SG-MOTR-109 was processed via UPI.',
           type: 'payment',
           time: '10 minutes ago',
           isRead: false
         },
         {
           id: 'notif-2',
           title: 'New Customer Registered',
           message: 'Priya Patel has completed the KYC verification process.',
           type: 'customer',
           time: '1 hour ago',
           isRead: false
         },
         {
           id: 'notif-3',
           title: 'Policy Issuance Approved',
           message: 'Life Insurance policy SG-LIFE-442 has been activated and sent to customer.',
           type: 'policy',
           time: '3 hours ago',
           isRead: true
         },
         {
           id: 'notif-4',
           title: 'Renewal Reminder Sent',
           message: 'Automated renewal notice sent to 14 customers expiring next week.',
           type: 'alert',
           time: '5 hours ago',
           isRead: true
         },
         {
           id: 'notif-5',
           title: 'High-Value Payment Flag',
           message: 'Admin console collected ₹45,000 for Life Insurance premium.',
           type: 'payment',
           time: 'Yesterday',
           isRead: true
         }
       ];

       setNotifications(notifs);
    };

    generateNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch(type) {
      case 'payment': return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case 'customer': return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'policy': return <ShieldCheck className="w-5 h-5 text-indigo-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const getIconBg = (type: string) => {
    switch(type) {
      case 'payment': return 'bg-emerald-50 border-emerald-100';
      case 'customer': return 'bg-blue-50 border-blue-100';
      case 'policy': return 'bg-indigo-50 border-indigo-100';
      case 'alert': return 'bg-amber-50 border-amber-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 max-w-5xl mx-auto">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl p-7 rounded-[32px] border border-white/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-1.5 h-7 bg-gradient-to-b from-rose-500 to-violet-500 rounded-full"></div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notification Center</h1>
             {unreadCount > 0 && (
               <span className="px-2.5 py-1 bg-rose-100 text-rose-600 rounded-lg text-[10px] font-black ml-2 animate-pulse">
                 {unreadCount} New
               </span>
             )}
          </div>
          <p className="text-slate-500 font-bold max-w-2xl leading-relaxed text-[11px] tracking-normal">
            Stay updated on new customer registrations, inbound payments, and system-wide automated operations.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <button onClick={markAllAsRead} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-[11px] hover:bg-slate-50 hover:text-emerald-600 transition-all shadow-sm">
             <Check className="w-3.5 h-3.5" />
             Mark All Read
           </button>
           <button onClick={clearAll} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-rose-600 rounded-xl font-bold text-[11px] hover:bg-rose-50 transition-all shadow-sm">
             <Trash2 className="w-3.5 h-3.5" />
             Clear All
           </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
               <Bell className="w-8 h-8 text-slate-300" />
             </div>
             <h3 className="text-lg font-black text-slate-800 mb-1">You're All Caught Up</h3>
             <p className="text-xs font-bold text-slate-400">There are no new notifications at this time.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-6 flex items-start gap-5 transition-colors group ${notif.isRead ? 'bg-white hover:bg-slate-50' : 'bg-rose-50/30 hover:bg-rose-50/50'}`}
              >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border flex-shrink-0 ${getIconBg(notif.type)} shadow-sm`}>
                   {getIcon(notif.type)}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 gap-4">
                       <h4 className={`text-sm tracking-tight ${notif.isRead ? 'font-bold text-slate-700' : 'font-black text-slate-900'}`}>
                         {notif.title}
                       </h4>
                       <div className="flex items-center gap-1.5 text-slate-400 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-bold">{notif.time}</span>
                       </div>
                    </div>
                    <p className={`text-xs leading-relaxed ${notif.isRead ? 'text-slate-500 font-medium' : 'text-slate-600 font-bold'}`}>
                       {notif.message}
                    </p>
                 </div>

                 {!notif.isRead && (
                   <button 
                     onClick={() => markAsRead(notif.id)}
                     className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                     title="Mark as Read"
                   >
                     <CheckCircle2 className="w-4 h-4" />
                   </button>
                 )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
