import React, { useState } from 'react';
import { 
  Monitor, 
  Lock, 
  Bell, 
  Database, 
  Zap, 
  RefreshCw, 
  Terminal, 
  HardDrive, 
  Clock, 
  ShieldAlert
} from 'lucide-react';

const SystemConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Platform');

  const configTabs = [
    { name: 'Platform', icon: Monitor, desc: 'Interface' },
    { name: 'Security', icon: Lock, desc: 'Auth' },
    { name: 'Notifications', icon: Bell, desc: 'Alerts' },
    { name: 'Infrastructure', icon: Database, desc: 'Nodes' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-xl font-bold text-slate-900">System Infrastructure</h2>
           <p className="text-sm text-slate-500">Global protocols & security layers</p>
        </div>
        <button className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
           <Zap className="w-4 h-4" /> Deploy Config
        </button>
      </div>

      {/* Tabs - Standard Row */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar">
         {configTabs.map((tab) => (
           <button
             key={tab.name}
             onClick={() => setActiveTab(tab.name)}
             className={`
               flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all whitespace-nowrap
               ${activeTab === tab.name 
                 ? 'bg-white text-indigo-600 shadow-sm' 
                 : 'text-slate-500 hover:text-slate-900'}
             `}
           >
              <tab.icon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{tab.name}</span>
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Config Details - Standard Card */}
         <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">{activeTab} Parameters</h3>
               </div>
               <button className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1.5 uppercase tracking-widest">
                  <RefreshCw className="w-3 h-3" /> Re-Sync
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Console ID</label>
                  <input type="text" defaultValue="IA Master Root Console" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Environment</label>
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                     {['Dev', 'Prod'].map(m => (
                       <button key={m} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${m === 'Prod' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{m}</button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100">
               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Data Persistence</h3>
               <div className="space-y-3">
                  {[
                    { type: 'Master DB Cluster', last: '2h ago', status: 'Healthy' },
                    { type: 'Cloud Asset Vault', last: '14h ago', status: 'Healthy' },
                  ].map((job, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                       <div className="flex items-center gap-3">
                          <HardDrive className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-bold text-slate-900">{job.type}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.last}</span>
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold uppercase tracking-widest">{job.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Security Dashboard - Standard Card */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
               <h3 className="text-base font-bold mb-8 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-500" /> Security Pulse
               </h3>
               <div className="space-y-6">
                  {[
                    { label: 'TLS Protocol', val: 'TLS 1.3' },
                    { label: 'Edge Firewall', val: 'ACTIVE' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                       <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
                       <span className="text-[10px] font-bold text-white bg-white/5 px-3 py-1 rounded-lg">{s.val}</span>
                    </div>
                  ))}
                  <button className="w-full mt-6 py-3.5 bg-red-600/10 text-red-500 border border-red-600/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                     Revoke All Access
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-4 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Build v2.4.0</span>
               </div>
               <p className="text-2xl font-black text-slate-900">STABLE-X</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemConfig;
