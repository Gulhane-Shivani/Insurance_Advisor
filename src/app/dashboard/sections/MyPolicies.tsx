import React from 'react';
import { Shield, ExternalLink, Download, CreditCard, RefreshCw, ChevronRight, MoreHorizontal, Calendar, Info } from 'lucide-react';

const MyPolicies: React.FC = () => {
  const policies = [
    {
      id: 'POL-12345',
      company: 'HDFC Ergo',
      product: 'Optima Secure Health',
      type: 'Health',
      sumAssured: '₹10,00,000',
      premium: '₹1,550',
      dueDate: 'Oct 24, 2024',
      status: 'Active',
      startDate: 'Oct 24, 2023',
      endDate: 'Oct 23, 2024',
      icon: '🏥',
      color: 'blue'
    },
    {
      id: 'POL-67890',
      company: 'Tata AIG',
      product: 'Auto Safe Car Insurance',
      type: 'Car',
      sumAssured: '₹8,50,000',
      premium: '₹7,900',
      dueDate: 'May 12, 2024',
      status: 'Expiring Soon',
      startDate: 'May 13, 2023',
      endDate: 'May 12, 2024',
      icon: '🚗',
      color: 'orange'
    },
    {
      id: 'POL-44556',
      company: 'LIC India',
      product: 'Jeevan Anand',
      type: 'Life',
      sumAssured: '₹50,00,000',
      premium: '₹12,400',
      dueDate: 'Jan 15, 2025',
      status: 'Active',
      startDate: 'Jan 15, 2020',
      endDate: 'Jan 14, 2040',
      icon: '👴',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Portfolio Management</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Coverage</h1>
           <p className="text-slate-500 font-medium mt-1 text-sm">Manage, renew and download documents for all your policies.</p>
        </div>
        <div className="flex gap-2.5 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-500">
              <Download className="w-3.5 h-3.5" /> Export
           </button>
           <button className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
              Add Policy
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all group relative">
             <div className="p-7 relative">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                         {policy.icon}
                      </div>
                      <div>
                         <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{policy.product}</h3>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                            {policy.company} • <span className="text-slate-300 font-bold">{policy.id}</span>
                         </p>
                      </div>
                   </div>
                   <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                   </button>
                </div>

                <div className="grid grid-cols-3 gap-4 py-5 border-y border-slate-50 mb-6">
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sum Assured</p>
                      <p className="text-base font-black text-slate-900 tracking-tight">{policy.sumAssured}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium</p>
                      <p className="text-base font-black text-slate-900 tracking-tight">{policy.premium}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                        policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                         {policy.status}
                      </span>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                   <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="flex items-center gap-2.5">
                         <Calendar className="w-3.5 h-3.5 text-slate-300" />
                         <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Renewal Date</p>
                            <p className="text-xs font-bold text-slate-700">{policy.dueDate}</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors">
                         <Download className="w-3.5 h-3.5" />
                         PDF
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                         Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
             </div>
             
             {/* Simple progress bar */}
             <div className="h-1 w-full bg-slate-50">
                <div className={`h-full opacity-40 ${
                  policy.color === 'blue' ? 'bg-blue-600' : policy.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'
                }`} style={{ width: '65%' }}></div>
             </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-white rounded-[32px] border border-blue-100 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
         <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-base font-black text-slate-900 mb-0.5">Consolidate your policies?</h3>
            <p className="text-slate-500 font-medium text-xs">Link policies purchased offline to manage everything in one secure place.</p>
         </div>
         <button className="px-6 py-2.5 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all">
            Link Policy
         </button>
      </div>
    </div>
  );
};

export default MyPolicies;
