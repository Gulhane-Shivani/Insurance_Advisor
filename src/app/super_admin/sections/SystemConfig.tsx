import React, { useState } from 'react';
import toast from 'react-hot-toast';
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
  ShieldAlert,
  Key,
  Cpu,
  Activity,
  Server,
  Wifi
} from 'lucide-react';

const SystemConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Platform');
  const [env, setEnv] = useState('Prod');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRevoked, setIsRevoked] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      toast.success('Configuration deployed to ' + env);
    }, 2000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Parameters re-synced successfully');
    }, 1500);
  };

  const handleRevoke = () => {
    setIsRevoked(true);
    toast.error('Emergency protocol initiated: All access revoked');
  };

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
        <button 
          onClick={handleDeploy} 
          disabled={isDeploying || isRevoked}
          className={`w-full md:w-auto px-6 py-2.5 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${isRevoked ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
           {isDeploying ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Zap className="w-4 h-4" /> Deploy Config</>}
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
               <button onClick={handleSync} disabled={isSyncing} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1.5 uppercase tracking-widest disabled:opacity-50">
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} /> Re-Sync
               </button>
            </div>

             {activeTab === 'Platform' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Console ID</label>
                       <input type="text" defaultValue="IA Master Root Console" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Environment</label>
                       <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                          {['Dev', 'Prod'].map(m => (
                            <button key={m} onClick={() => setEnv(m)} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${m === env ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{m}</button>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Data Persistence</h3>
                    <div className="space-y-3">
                       {[
                         { type: 'Master DB Cluster', last: '2h ago', status: 'Healthy' },
                         { type: 'Cloud Asset Vault', last: '14h ago', status: 'Healthy' },
                         { type: 'Analytics Data Warehouse', last: '1h ago', status: 'Syncing' },
                       ].map((job, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all">
                            <div className="flex items-center gap-3">
                               <HardDrive className="w-5 h-5 text-indigo-400" />
                               <span className="text-sm font-bold text-slate-900">{job.type}</span>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.last}</span>
                               <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${job.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{job.status}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Session Timeout (Minutes)</label>
                       <input type="number" defaultValue="30" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">MFA Enforcement</label>
                       <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                          {['Strict', 'Optional', 'Disabled'].map(m => (
                            <button key={m} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${m === 'Strict' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{m}</button>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">API Access Keys</h3>
                    <div className="space-y-3">
                       {[
                         { name: 'Mobile App Gateway', prefix: 'pk_live_8f9...', status: 'Active' },
                         { name: 'Partner Integration API', prefix: 'pk_test_2b4...', status: 'Active' },
                         { name: 'Legacy CRM Sync', prefix: 'sk_live_9x1...', status: 'Revoked' },
                       ].map((key, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all">
                            <div className="flex items-center gap-3">
                               <Key className="w-5 h-5 text-indigo-400" />
                               <div>
                                  <p className="text-sm font-bold text-slate-900">{key.name}</p>
                                  <p className="text-[10px] font-mono text-slate-400">{key.prefix}</p>
                               </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${key.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{key.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Primary SMTP Gateway</label>
                       <input type="text" defaultValue="smtp.sendgrid.net" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">SMS Provider</label>
                       <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                          <option>Twilio Global</option>
                          <option>AWS SNS</option>
                          <option>MessageBird</option>
                       </select>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">System Event Hooks</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {[
                         { event: 'Critical Errors (500s)', active: true },
                         { event: 'New Agent Registration', active: true },
                         { event: 'Daily Database Backups', active: false },
                         { event: 'Suspicious Login Attempts', active: true },
                       ].map((hook, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                            <span className="text-sm font-bold text-slate-900">{hook.event}</span>
                            <div className={`w-10 h-5 rounded-full relative cursor-pointer ${hook.active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                               <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${hook.active ? 'left-5' : 'left-0.5'}`}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'Infrastructure' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                       <Cpu className="w-6 h-6 text-indigo-500 mb-3" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Global CPU Load</p>
                       <p className="text-2xl font-black text-slate-900">42%</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                       <Activity className="w-6 h-6 text-emerald-500 mb-3" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Connections</p>
                       <p className="text-2xl font-black text-slate-900">1,204</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                       <Server className="w-6 h-6 text-blue-500 mb-3" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Memory Usage</p>
                       <p className="text-2xl font-black text-slate-900">6.8 <span className="text-sm text-slate-500">GB</span></p>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Active Nodes</h3>
                    <div className="space-y-3">
                       {[
                         { name: 'API Gateway (US-East)', ip: '10.0.1.42', status: 'Healthy', load: '32%' },
                         { name: 'Worker Node Alpha', ip: '10.0.2.18', status: 'Healthy', load: '65%' },
                         { name: 'Redis Cache Layer', ip: '10.0.3.99', status: 'Warning', load: '89%' },
                       ].map((node, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all">
                            <div className="flex items-center gap-3">
                               <Wifi className={`w-5 h-5 ${node.status === 'Warning' ? 'text-orange-400' : 'text-emerald-400'}`} />
                               <div>
                                  <p className="text-sm font-bold text-slate-900">{node.name}</p>
                                  <p className="text-[10px] font-mono text-slate-400">{node.ip}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-6">
                               <div className="text-right">
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Load</p>
                                  <p className={`text-xs font-bold ${node.status === 'Warning' ? 'text-orange-600' : 'text-slate-900'}`}>{node.load}</p>
                               </div>
                               <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${node.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>{node.status}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
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
                    { label: 'Edge Firewall', val: isRevoked ? 'LOCKDOWN' : 'ACTIVE' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                       <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
                       <span className="text-[10px] font-bold text-white bg-white/5 px-3 py-1 rounded-lg">{s.val}</span>
                    </div>
                  ))}
                  <button 
                    onClick={handleRevoke} 
                    disabled={isRevoked}
                    className={`w-full mt-6 py-3.5 border rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isRevoked ? 'bg-red-600 text-white border-red-600 opacity-50 cursor-not-allowed' : 'bg-red-600/10 text-red-500 border-red-600/20 hover:bg-red-600 hover:text-white'}`}
                  >
                     {isRevoked ? 'Access Revoked' : 'Revoke All Access'}
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
