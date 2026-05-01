import React from 'react';
import { Server, Users, Network, AlertTriangle, Cpu, HardDrive } from 'lucide-react';

const SystemStats: React.FC = () => {
  const metrics = [
    { label: 'System Uptime', value: '99.99%', sub: 'Last 30 days', icon: Server, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Sessions', value: '1,248', sub: '+12% from yesterday', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'API Latency', value: '42ms', sub: 'Global average', icon: Network, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Error Rate', value: '0.04%', sub: '-0.01% from yesterday', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900">System Telemetry</h2>
           <p className="text-sm text-slate-500">Real-time platform performance metrics</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-bold uppercase tracking-widest">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {metrics.map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center ${m.color}`}>
                     <m.icon className="w-5 h-5" />
                  </div>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-2xl font-black text-slate-900 mb-1">{m.value}</p>
                  <p className="text-[10px] font-bold text-slate-400">{m.sub}</p>
               </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2"><Cpu className="w-4 h-4 text-indigo-500"/> CPU Utilization</h3>
            <div className="space-y-5">
               {[
                 { node: 'Node Alpha (US-East)', load: '45%' },
                 { node: 'Node Beta (EU-West)', load: '28%' },
                 { node: 'Node Gamma (AP-South)', load: '72%' },
               ].map((n, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-slate-700">{n.node}</span>
                       <span className="text-indigo-600">{n.load}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 rounded-full" style={{ width: n.load }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2"><HardDrive className="w-4 h-4 text-emerald-500"/> Storage Capacity</h3>
            <div className="space-y-5">
               {[
                 { disk: 'Master Database', used: '64%' },
                 { disk: 'Asset Storage', used: '42%' },
                 { disk: 'Log Archive', used: '89%' },
               ].map((d, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-slate-700">{d.disk}</span>
                       <span className={parseInt(d.used) > 80 ? 'text-red-500' : 'text-emerald-600'}>{d.used}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className={`h-full rounded-full ${parseInt(d.used) > 80 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: d.used }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemStats;
