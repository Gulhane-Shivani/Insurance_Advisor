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
    { name: 'Platform', icon: Monitor, desc: 'UI & Global Theme' },
    { name: 'Security', icon: Lock, desc: 'Auth & Encryption' },
    { name: 'Notifications', icon: Bell, desc: 'Push & Alerts' },
    { name: 'Infrastructure', icon: Database, desc: 'Servers & Backups' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Configuration Hub Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-2xl font-black text-white tracking-tight">System Infrastructure</h2>
           <p className="text-slate-500 font-medium mt-1 text-sm">Managing core protocols, security layers, and data redundancy.</p>
        </div>
        <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-3 active:scale-95 group">
           <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" /> Deploy Root Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Navigation - Futuristic Tab Bar */}
         <div className="lg:col-span-12 flex bg-white/5 p-2 border border-white/5 rounded-[32px] shadow-2xl overflow-x-auto no-scrollbar relative">
            {configTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  flex items-center gap-5 px-10 py-5 rounded-2xl transition-all duration-500 whitespace-nowrap relative group
                  ${activeTab === tab.name 
                    ? 'text-white' 
                    : 'text-slate-500 hover:text-slate-300'}
                `}
              >
                 <tab.icon className={`w-5 h-5 transition-all ${activeTab === tab.name ? 'text-indigo-400 scale-110' : 'text-slate-600 group-hover:text-slate-400'}`} />
                 <div className="text-left">
                    <p className="text-[11px] font-black uppercase tracking-widest">{tab.name}</p>
                    <p className={`text-[9px] font-bold mt-0.5 ${activeTab === tab.name ? 'text-slate-400' : 'text-slate-600'}`}>{tab.desc}</p>
                 </div>
                 {activeTab === tab.name && (
                   <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 blur-[1px]"></div>
                 )}
              </button>
            ))}
         </div>

         {/* Configuration Panels - Command Center Style */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/5 border border-white/5 rounded-[48px] shadow-2xl p-10 lg:p-12 relative overflow-hidden group">
               <div className="flex justify-between items-center mb-12 relative z-10">
                  <div className="flex items-center gap-3">
                     <Terminal className="w-5 h-5 text-indigo-400" />
                     <h3 className="text-xl font-black text-white tracking-tight">{activeTab} Parameters</h3>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-all">
                     <RefreshCw className="w-3.5 h-3.5" /> Re-Sync
                  </button>
               </div>

               <div className="space-y-12 relative z-10">
                  {activeTab === 'Platform' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">System Identity</label>
                          <input type="text" defaultValue="IA Master Root Console" className="w-full bg-[#020617] border border-white/5 rounded-2xl p-4 text-sm font-bold text-white outline-none focus:border-indigo-500/50 transition-all" />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">Environment State</label>
                          <div className="flex bg-[#020617] p-1.5 rounded-2xl border border-white/5">
                             {['Dev', 'Stage', 'Prod'].map(m => (
                               <button key={m} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${m === 'Prod' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}>{m}</button>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">Maintenance Mode</label>
                          <div className="flex items-center gap-5 p-5 bg-[#020617] rounded-2xl border border-white/5">
                             <div className="w-14 h-7 bg-slate-800 rounded-full relative cursor-pointer group/toggle p-1">
                                <div className="w-5 h-5 bg-slate-500 rounded-full transition-all group-hover/toggle:bg-slate-400"></div>
                             </div>
                             <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">OFFLINE: NO EFFECT</span>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">Global Timezone</label>
                          <select className="w-full bg-[#020617] border border-white/5 rounded-2xl p-4 text-sm font-bold text-white outline-none appearance-none cursor-pointer">
                             <option>(GMT+05:30) Asia/Kolkata</option>
                             <option>(GMT-00:00) UTC</option>
                          </select>
                       </div>
                    </div>
                  )}

                  {activeTab !== 'Platform' && (
                    <div className="h-72 flex flex-col items-center justify-center text-center">
                       <div className="w-20 h-20 rounded-[32px] bg-white/5 border border-white/5 flex items-center justify-center mb-8 animate-pulse">
                          <Cpu className="w-10 h-10 text-indigo-400" />
                       </div>
                       <p className="text-xl font-black text-white tracking-tight">Accessing Institutional Node...</p>
                       <p className="text-xs text-slate-500 font-medium mt-3">Establishing handshake with {activeTab.toLowerCase()} microservice.</p>
                    </div>
                  )}
               </div>

               {/* Background Glow */}
               <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none"></div>
            </div>

            {/* Backups - Data Persistence */}
            <div className="bg-white/5 border border-white/5 rounded-[48px] shadow-2xl p-10 lg:p-12 relative overflow-hidden">
               <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                  <Database className="w-5 h-5 text-indigo-400" /> Persistent Backups
               </h3>
               <div className="space-y-5">
                  {[
                    { type: 'Master DB Cluster', freq: '6H Cycles', last: '2h ago', status: 'Healthy' },
                    { type: 'Cloud Storage Assets', freq: 'Daily Pulse', last: '14h ago', status: 'Healthy' },
                    { type: 'Technical Logs', freq: 'Hourly Flow', last: '15m ago', status: 'Syncing' },
                  ].map((job, i) => (
                    <div key={i} className="flex items-center justify-between p-7 bg-[#020617] border border-white/5 rounded-[36px] hover:border-indigo-500/30 transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-white transition-all shadow-inner">
                             <HardDrive className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="text-[14px] font-black text-white leading-tight">{job.type}</p>
                             <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">{job.freq}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-10">
                          <div className="text-right hidden md:block">
                             <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Last Success</p>
                             <p className="text-[11px] font-bold text-slate-500">{job.last}</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                            job.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 animate-pulse'
                          }`}>
                             {job.status}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Security & System Context */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-indigo-600 rounded-[48px] p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden group">
               <h3 className="text-xl font-black mb-10 flex items-center gap-3 relative z-10">
                  <ShieldAlert className="w-6 h-6 text-indigo-300" /> Security Pulse
               </h3>
               <div className="space-y-10 relative z-10">
                  {[
                    { label: 'SSL Protocol', val: 'TLS 1.3' },
                    { label: 'Firewall (WAF)', val: 'ENABLED' },
                    { label: 'Auth Method', val: 'OIDC/MFA' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between group/s">
                       <span className="text-[11px] font-black text-indigo-200 uppercase tracking-widest transition-colors group-hover/s:text-white">{s.label}</span>
                       <span className="text-xs font-black text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10">{s.val}</span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-12 p-8 bg-white/10 backdrop-blur-md rounded-[32px] border border-white/10 relative z-10">
                  <p className="text-[11px] text-indigo-100 font-medium leading-relaxed mb-8">Master security protocols are locked. Manual revocation requires <span className="text-white font-black underline">Root Authority</span>.</p>
                  <button className="w-full py-4.5 bg-white text-red-600 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95">
                     Revoke All Access
                  </button>
               </div>
               
               {/* Design Decor */}
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-1000"></div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[48px] p-10 shadow-2xl relative overflow-hidden">
               <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Build v2.4.0</h3>
               </div>
               <div className="flex items-center justify-between mb-6">
                  <p className="text-3xl font-black text-white tracking-tighter">STABLE-X</p>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-all cursor-pointer">
                     <RefreshCw className="w-5 h-5" />
                  </div>
               </div>
               <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest leading-relaxed">System core was last synchronized at 04:30 AM via institutional deployment.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemConfig;
