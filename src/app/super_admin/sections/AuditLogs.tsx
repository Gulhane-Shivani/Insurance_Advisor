import React, { useState } from 'react';
import { Search, Filter, User } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const logs = [
    { id: 'LOG-8912', user: 'Admin_Super', action: 'Deployed new security policy (TLS 1.3)', type: 'Security', time: '2 mins ago', ip: '192.168.1.104' },
    { id: 'LOG-8911', user: 'CSR_Lead', action: 'Exported monthly commission report', type: 'Data', time: '14 mins ago', ip: '10.0.4.12' },
    { id: 'LOG-8910', user: 'System', action: 'Automated database backup completed', type: 'System', time: '1 hour ago', ip: 'Localhost' },
    { id: 'LOG-8909', user: 'Admin_Super', action: 'Created new product draft: Travel Global', type: 'Config', time: '3 hours ago', ip: '192.168.1.104' },
    { id: 'LOG-8908', user: 'Agent_102', action: 'Failed login attempt (3x)', type: 'Security', time: '5 hours ago', ip: '203.0.113.42' },
    { id: 'LOG-8907', user: 'Admin_Super', action: 'Revoked access key for Legacy CRM', type: 'Security', time: '1 day ago', ip: '192.168.1.104' },
  ];

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'Security': return 'bg-red-50 text-red-600 border-red-100';
      case 'Config': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'System': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Data': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-xl font-bold text-slate-900">System Audit Logs</h2>
           <p className="text-sm text-slate-500">Immutable record of all platform activities</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" />
           </div>
           <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Log ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Actor</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Action & Details</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Type</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 text-right">Timestamp</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {logs.filter(l => l.action.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase())).map((log) => (
                 <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">{log.id}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                             <User className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{log.user}</p>
                             <p className="text-[9px] font-mono text-slate-400 uppercase">{log.ip}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{log.action}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${getTypeStyle(log.type)}`}>
                         {log.type}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="text-xs font-bold text-slate-500">{log.time}</span>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default AuditLogs;
