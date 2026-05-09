import React from 'react';
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Mail, 
  ChevronRight,
  Monitor,
  Eye,
  LogOut,
  CreditCard,
  Zap,
  Clock
} from 'lucide-react';

const SettingsManagement: React.FC = () => {
  const settingGroups = [
    {
      title: 'Personal Account',
      items: [
        { id: 'profile', icon: User, label: 'Profile Information', sub: 'Name, email, and phone settings', color: 'indigo' },
        { id: 'security', icon: Lock, label: 'Security & Password', sub: '2FA, password management', color: 'rose' },
        { id: 'payout', icon: CreditCard, label: 'Payout Settings', sub: 'Bank details for commissions', color: 'emerald' },
      ]
    },
    {
      title: 'System Preferences',
      items: [
        { id: 'notif', icon: Bell, label: 'Notification Settings', sub: 'Email, push, and SMS alerts', color: 'amber' },
        { id: 'display', icon: Monitor, label: 'Display & UI', sub: 'Dark mode and dashboard layout', color: 'blue' },
        { id: 'regional', icon: Globe, label: 'Regional & Language', sub: 'TimeZone and currency settings', color: 'purple' },
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        { id: 'privacy', icon: Shield, label: 'Privacy Control', sub: 'Manage your data visibility', color: 'emerald' },
        { id: 'sessions', icon: Smartphone, label: 'Active Sessions', sub: 'Manage logged in devices', color: 'indigo' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
         <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
            <Settings size={32} />
         </div>
         <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
            <p className="text-sm font-bold text-slate-400 mt-1">Configure your advisor experience and workspace</p>
         </div>
      </div>

      <div className="space-y-12">
        {settingGroups.map((group, i) => (
          <div key={i} className="space-y-6">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">{group.title}</h3>
             <div className="grid grid-cols-1 gap-4">
                {group.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                       <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                          <item.icon size={28} />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-slate-900 tracking-tight">{item.label}</h4>
                          <p className="text-xs font-bold text-slate-400 mt-0.5">{item.sub}</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="pt-10 border-t border-slate-200">
         <div className="bg-rose-50 rounded-[32px] p-8 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <h4 className="text-lg font-black text-rose-900">Sign Out Session</h4>
               <p className="text-sm font-bold text-rose-600 mt-1">Sign out from the SafeGuard Advisor CRM on this device.</p>
            </div>
            <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center gap-2">
               <LogOut size={16} /> Sign Out
            </button>
         </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
