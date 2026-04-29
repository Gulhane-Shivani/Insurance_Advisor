import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

const LeadManagement: React.FC = () => {
  const leads = [
    { name: 'Rohan Mehta', product: 'Term Life', source: 'Web Inquiry', status: 'Hot', agent: 'Sneha K.', date: '10m ago' },
    { name: 'Vikram Singh', product: 'Comprehensive Car', source: 'Referral', status: 'Warm', agent: 'Amit D.', date: '1h ago' },
    { name: 'Anjali Gupta', product: 'Family Health', source: 'Social Media', status: 'Cold', agent: 'Unassigned', date: '3h ago' },
    { name: 'Karan Malhotra', product: 'Business Liability', source: 'Web Inquiry', status: 'Hot', agent: 'Rahul V.', date: '5h ago' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'New Leads', val: '24', trend: '+12%', color: 'blue' },
          { label: 'Active Pipeline', val: '142', trend: '+5%', color: 'indigo' },
          { label: 'Avg. Conv. Time', val: '4.2 Days', trend: '-8%', color: 'emerald' },
          { label: 'Lost Leads', val: '12', trend: '-2%', color: 'rose' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <TrendingUp className={`w-3 h-3 text-${s.color}-500`} />
             </div>
             <h3 className="text-xl font-black text-slate-800">{s.val}</h3>
             <p className="text-[9px] font-bold text-emerald-600 mt-1">{s.trend} vs last week</p>
          </div>
        ))}
      </div>

      {/* Lead Management Table */}
      <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
           <div>
              <h3 className="text-base font-black text-slate-800">Lead Pipeline</h3>
              <p className="text-[11px] text-slate-500 font-medium">Distribute and track leads across the sales team</p>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search leads..." 
                   className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium w-48 outline-none focus:border-indigo-500"
                 />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-md shadow-indigo-100">
                <Plus className="w-3.5 h-3.5" /> Add Lead
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Lead Name</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Interested Product</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Assigned Agent</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-600">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-[12px] font-bold text-slate-800">{lead.name}</p>
                          <p className="text-[9px] text-slate-400 font-medium">{lead.source}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-bold text-slate-600">{lead.product}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                      lead.status === 'Hot' ? 'bg-rose-50 text-rose-600' :
                      lead.status === 'Warm' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${lead.agent === 'Unassigned' ? 'bg-slate-300' : 'bg-emerald-500'}`} />
                       <span className="text-[11px] font-bold text-slate-700">{lead.agent}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                       <button className="p-1.5 text-slate-400 hover:text-indigo-600"><Phone className="w-3.5 h-3.5" /></button>
                       <button className="p-1.5 text-slate-400 hover:text-indigo-600"><Mail className="w-3.5 h-3.5" /></button>
                       <button className="p-1.5 text-slate-400 hover:text-slate-800"><MoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
           <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-800 transition-colors">
             <Clock className="w-3.5 h-3.5" /> View Full Pipeline History
           </button>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
