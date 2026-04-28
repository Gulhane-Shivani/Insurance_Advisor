import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Bell, 
  ShieldCheck, 
  Database, 
  Save, 
  RefreshCw, 
  Monitor, 
  Lock, 
  Mail, 
  MessageSquare, 
  ChevronRight,
  HardDrive,
  Cpu,
  Clock,
  ShieldAlert,
  Terminal,
  Zap
} from 'lucide-react';

const SystemConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Platform');

  const configTabs = [
    { name: 'Platform', icon: Monitor, desc: 'Global Interface' },
    { name: 'Security', icon: Lock, desc: 'Authentication' },
    { name: 'Notifications', icon: Bell, desc: 'Global Alerts' },
    { name: 'Infrastructure', icon: Database, desc: 'Server Nodes' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">System Infrastructure</p>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Configuration Hub</h1>
           <p className="text-slate-500 font-medium mt-2">Manage the underlying infrastructure, security protocols, and system-wide default parameters.</p>
        </div>
        <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-3 active:scale-95 group">
           <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" /> Deploy Root Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Top Navigation Tabs */}
         <div className="lg:col-span-12 flex bg-slate-100 p-1.5 rounded-[28px] border border-slate-200 overflow-x-auto no-scrollbar">
            {configTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.name 
                    ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100' 
                    : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                 <tab.icon className={`w-5 h-5 transition-all ${activeTab === tab.name ? 'scale-110' : ''}`} />
                 <div className="text-left">
                    <p className="text-[11px] font-black uppercase tracking-widest leading-none">{tab.name}</p>
                    <p className={`text-[9px] font-bold mt-1.5 ${activeTab === tab.name ? 'text-indigo-400' : 'text-slate-400'}`}>{tab.desc}</p>
                 </div>
              </button>
            ))}
         </div>

         {/* Panel Content */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 lg:p-12 group">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                     <Terminal className="w-5 h-5 text-indigo-600" />
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">{activeTab} Parameters</h3>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all">
                     <RefreshCw className="w-3.5 h-3.5" /> Re-Sync Node
                  </button>
               </div>

               <div className="space-y-10">
                  {activeTab === 'Platform' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">Console Identity</label>
                          <input type="text" defaultValue="IA Master Root Console" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">Environment State</label>
                          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                             {['Dev', 'Stage', 'Prod'].map(m => (
                               <button key={m} className={`flex-1 py-2.5 rounded-lg text-[10px] font-black transition-all ${m === 'Prod' ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}>{m}</button>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">Maintenance Mode</label>
                          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer group/toggle p-1">
                                <div className="w-4 h-4 bg-white rounded-full transition-all group-hover/toggle:translate-x-0"></div>
                             </div>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OFFLINE: STABLE</span>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">Global Sync Zone</label>
                          <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 outline-none appearance-none cursor-pointer">
                             <option>(GMT+05:30) Asia/Kolkata</option>
                             <option>(GMT-00:00) UTC</option>
                          </select>
                       </div>
                    </div>
                  )}

                  {activeTab !== 'Platform' && (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                       <div className="w-20 h-20 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                          <Cpu className="w-10 h-10 text-slate-200 animate-pulse" />
                       </div>
                       <p className="text-xl font-black text-slate-900 tracking-tight">Handshaking with Node...</p>
                       <p className="text-[11px] text-slate-400 font-medium mt-2">Establishing secure tunnel with {activeTab.toLowerCase()} service.</p>
                    </div>
                  )}
               </div>
            </div>

            {/* Backups */}
            <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 lg:p-12 relative overflow-hidden">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Database className="w-5 h-5 text-indigo-600" /> Data Redundancy
               </h3>
               <div className="space-y-4">
                  {[
                    { type: 'Master DB Cluster', freq: '6H Cycles', last: '2h ago', status: 'Healthy' },
                    { type: 'Cloud Asset Vault', freq: 'Daily Pulse', last: '14h ago', status: 'Healthy' },
                    { type: 'Technical Audit Logs', freq: 'Hourly Flow', last: '15m ago', status: 'Syncing' },
                  ].map((job, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[28px] hover:border-indigo-100 hover:bg-white transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm border border-slate-100 transition-colors">
                             <HardDrive className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="text-[14px] font-black text-slate-900 leading-tight">{job.type}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{job.freq}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-8">
                          <div className="text-right hidden md:block">
                             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Last Success</p>
                             <p className="text-[11px] font-bold text-slate-400">{job.last}</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                            job.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100 animate-pulse'
                          }`}>
                             {job.status}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Security Pulse */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <h3 className="text-xl font-black mb-10 flex items-center gap-3 relative z-10">
                  <ShieldAlert className="w-6 h-6 text-indigo-500 shadow-lg" /> Security Pulse
               </h3>
               <div className="space-y-8 relative z-10">
                  {[
                    { label: 'TLS Protocol', val: 'TLS 1.3 v3' },
                    { label: 'Edge Firewall', val: 'ACTIVE' },
                    { label: 'MFA Enforcement', val: 'REQUIRED' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between group/s">
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest transition-colors group-hover/s:text-white">{s.label}</span>
                       <span className="text-[10px] font-black text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10">{s.val}</span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-12 p-8 bg-white/5 rounded-[32px] border border-white/5 relative z-10">
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-8">Access to global system config is restricted. Manual override requires <span className="text-white font-black underline">Root Key</span>.</p>
                  <button className="w-full py-4 bg-red-600/10 text-red-500 border border-red-600/20 rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95">
                     Revoke System Access
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-200/60 p-10 shadow-sm relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Build Info</h3>
               </div>
               <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">v2.4.0-STABLE</p>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all cursor-pointer">
                     <RefreshCw className="w-5 h-5" />
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">System core synchronized at 04:30 AM via automated deployment agent.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemConfig;
