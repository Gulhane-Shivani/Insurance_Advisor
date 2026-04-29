import React from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Download
} from 'lucide-react';

const PolicyManagement: React.FC = () => {
  const policies = [
    { id: 'POL-8829', holder: 'Amit Sharma', type: 'Life Insurance', status: 'Active', amount: '₹12.5L', date: '24 Apr 2024' },
    { id: 'POL-7731', holder: 'Priya Verma', type: 'Health Care', status: 'Pending', amount: '₹4.2L', date: '25 Apr 2024' },
    { id: 'POL-6642', holder: 'Rajesh Kumar', type: 'Motor Policy', status: 'Expiring', amount: '₹8.8L', date: '22 Apr 2024' },
    { id: 'POL-5510', holder: 'Sneha Reddy', type: 'Life Insurance', status: 'Active', amount: '₹25.0L', date: '20 Apr 2024' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Policies', val: '1,284', icon: Shield, color: 'indigo' },
          { label: 'Active Plans', val: '1,150', icon: CheckCircle2, color: 'emerald' },
          { label: 'Pending Apps', val: '42', icon: Clock, color: 'amber' },
          { label: 'Expiring Soon', val: '18', icon: AlertCircle, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3">
                <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                   <stat.icon className="w-4 h-4" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-xl font-black text-slate-800 leading-tight">{stat.val}</h3>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Policy Repository */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-white">
           <div>
              <h3 className="text-lg font-black text-slate-800">Policy Repository</h3>
              <p className="text-xs text-slate-500 font-medium">Manage and audit all customer insurance plans</p>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search policies..." 
                   className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium w-64 outline-none focus:border-indigo-500"
                 />
              </div>
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                <Filter className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                <Plus className="w-3.5 h-3.5" /> New Policy
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy ID</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy Holder</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Coverage</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {policies.map((policy) => (
                <tr key={policy.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-3">
                    <span className="text-xs font-black text-slate-800">{policy.id}</span>
                    <p className="text-[10px] text-slate-400 font-medium">{policy.date}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-bold text-slate-800">{policy.holder}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold">
                      {policy.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        policy.status === 'Active' ? 'bg-emerald-500' :
                        policy.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        policy.status === 'Active' ? 'text-emerald-600' :
                        policy.status === 'Pending' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {policy.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-black text-slate-700">
                    {policy.amount}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
           <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest">
             <Download className="w-3.5 h-3.5" /> Export Data
           </button>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Page 1 of 32</span>
              <div className="flex gap-1.5">
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
                    <ArrowUpRight className="w-3.5 h-3.5 rotate-[225deg]" />
                 </button>
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyManagement;
