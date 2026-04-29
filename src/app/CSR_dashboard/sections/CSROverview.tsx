/* src/app/csr_dashboard/sections/CSROverview.tsx */
import React from 'react';
import { 
  FileText, Clock, AlertCircle, CheckCircle2, 
  ArrowUpRight, Users, MessageSquare, ShieldAlert
} from 'lucide-react';
import { Card } from '../../../components/agent/UI';

const CSROverview: React.FC = () => {
  const stats = [
    { label: 'Pending Renewals', value: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Claims', value: '18', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Open Tickets', value: '07', icon: AlertCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Resolved Today', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const tasks = [
    { id: 1, type: 'Renewal', customer: 'Rajesh Kumar', priority: 'High', due: '2h', status: 'Pending' },
    { id: 2, type: 'Claim', customer: 'Anjali Sharma', priority: 'Medium', due: '4h', status: 'In Review' },
    { id: 3, type: 'Service', customer: 'Sunil Gupta', priority: 'Low', due: '1d', status: 'Queued' },
    { id: 4, type: 'Query', customer: 'Priya Sharma', priority: 'High', due: '1h', status: 'Urgent' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-xl shadow-slate-200/40 hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={18} className="text-slate-300" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h4>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Priority Queue */}
        <div className="lg:col-span-8 space-y-6">
           <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={16} className="text-violet-600" /> Today's Service Queue
                 </h3>
                 <span className="px-3 py-1 bg-violet-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-violet-600/20">4 Critical</span>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="bg-slate-50/30">
                          <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                          <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                          <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                          <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Time Left</th>
                          <th className="px-6 py-4 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {tasks.map((task) => (
                          <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                  task.type === 'Renewal' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  task.type === 'Claim' ? 'bg-red-50 text-red-600 border border-red-100' :
                                  'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                }`}>
                                  {task.type}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-sm font-bold text-slate-700">{task.customer}</td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5">
                                   <div className={`w-1.5 h-1.5 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                                   <span className="text-[10px] font-black uppercase text-slate-500">{task.priority}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-xs font-black text-slate-800">{task.due}</td>
                             <td className="px-6 py-4 text-right">
                                <button className="text-[9px] font-black text-violet-600 uppercase tracking-widest hover:text-violet-800 transition-colors">Start Case</button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>
        </div>

        {/* Support Tools Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <MessageSquare size={80} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Quick Response</h4>
              <div className="space-y-4">
                 {[
                   { label: 'Renewal Script', icon: FileText },
                   { label: 'Claim Checklist', icon: CheckCircle2 },
                   { label: 'Service Catalog', icon: Users },
                 ].map((tool, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3">
                         <tool.icon size={16} className="text-violet-400" />
                         <span className="text-xs font-bold">{tool.label}</span>
                      </div>
                      <ArrowUpRight size={14} className="opacity-40" />
                   </button>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default CSROverview;
