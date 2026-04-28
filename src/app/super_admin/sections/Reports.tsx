import React, { useState } from 'react';
import {
   FileStack,
   Download,
   BarChart,
   FileText,
   History,
   Wallet,
   ArrowRight,
   Calendar,
   Filter,
   CheckCircle2,
   Clock,
   ChevronRight,
   TrendingUp,
   FileSpreadsheet,
   FileJson
} from 'lucide-react';

const Reports: React.FC = () => {
   const [reportType, setReportType] = useState('Financial');

   const reportCards = [
      { name: 'Financial Summary', icon: Wallet, color: 'emerald', stats: '₹12.4Cr Transacted' },
      { name: 'Sales Performance', icon: TrendingUp, color: 'indigo', stats: '2,450 New Policies' },
      { name: 'Claims Settlement', icon: CheckCircle2, color: 'blue', stats: '98.2% Ratio' },
      { name: 'Renewal Pipeline', icon: Clock, color: 'orange', stats: '450 Upcoming' },
   ];

   return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
               <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Data Intelligence</p>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">Intelligence & Exports</h1>
               <p className="text-slate-500 font-medium mt-2">Generate consolidated financial reports, audit sales performance, and export reconciled data for accounting.</p>
            </div>
            <div className="flex gap-3">
               <button className="px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Custom Period
               </button>
               <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-3">
                  <Download className="w-4 h-4" /> Global Export
               </button>
            </div>
         </div>

         {/* Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportCards.map((card, i) => (
               <div key={i} className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                        card.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                           card.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                     }`}>
                     <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{card.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-6">{card.stats}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 group-hover:gap-4 transition-all">
                     Generate <ArrowRight className="w-3.5 h-3.5" />
                  </div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Exports */}
            <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10">
               <div className="flex justify-between items-center mb-10">
                  <div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Report Generations</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit logs of data exports</p>
                  </div>
                  <button className="text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Logs</button>
               </div>

               <div className="space-y-4">
                  {[
                     { name: 'Monthly_Revenue_Reconciliation.xlsx', type: 'Spreadsheet', date: 'Oct 24, 2023', user: 'Admin Hub', size: '2.4 MB' },
                     { name: 'Agent_Commission_Payable_Q3.pdf', type: 'Document', date: 'Oct 22, 2023', user: 'Finance Lead', size: '1.1 MB' },
                     { name: 'Pending_Claims_Audit_Trail.csv', type: 'Data', date: 'Oct 20, 2023', user: 'System Bot', size: '840 KB' },
                     { name: 'Customer_Retention_Metrics_V2.json', type: 'Raw Data', date: 'Oct 15, 2023', user: 'Marketing Admin', size: '4.2 MB' },
                  ].map((log, i) => (
                     <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[28px] hover:border-indigo-100 hover:bg-white transition-all group">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm border border-slate-100 transition-colors">
                              {log.type === 'Spreadsheet' ? <FileSpreadsheet className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                           </div>
                           <div>
                              <p className="text-[13px] font-black text-slate-900 leading-tight">{log.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{log.user} • {log.date}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.size}</span>
                           <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
                              <Download className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Advanced Filters */}
            <div className="space-y-8">
               <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl">
                  <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                     <Filter className="w-5 h-5 text-indigo-400" /> Report Engine
                  </h3>

                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Category</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all">
                           <option>Financial Performance</option>
                           <option>Operational Audit</option>
                           <option>Marketing ROI</option>
                        </select>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Output Format</label>
                        <div className="grid grid-cols-2 gap-3">
                           {['Excel', 'PDF', 'CSV', 'JSON'].map(f => (
                              <button key={f} className="py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-indigo-600 hover:border-indigo-600 transition-all">{f}</button>
                           ))}
                        </div>
                     </div>

                     <button className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/40 hover:bg-indigo-500 active:scale-95 transition-all">
                        Run Master Report
                     </button>
                  </div>
               </div>

               <div className="bg-white rounded-[40px] border border-slate-200/60 p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                     <History className="w-4 h-4 text-indigo-600" />
                     <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Audit Policy</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">All generated reports are stored for <span className="text-slate-900 font-black underline">90 days</span> in the secure vault before being archived to cold storage.</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Reports;
