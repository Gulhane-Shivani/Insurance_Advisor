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
  FileSpreadsheet
} from 'lucide-react';

const Reports: React.FC = () => {
  const reportCards = [
    { name: 'Financials', icon: Wallet, color: 'emerald', stats: '₹12.4Cr' },
    { name: 'Sales', icon: TrendingUp, color: 'indigo', stats: '2,450 Policies' },
    { name: 'Claims', icon: CheckCircle2, color: 'blue', stats: '98.2% Ratio' },
    { name: 'Renewals', icon: Clock, color: 'orange', stats: '450 Due' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Action Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-xl font-bold text-slate-900">Intelligence hub</h2>
           <p className="text-sm text-slate-500">Data reconciliation & system exports</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">Period</button>
           <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Global Export
           </button>
        </div>
      </div>

      {/* Mini Cards - Standard Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {reportCards.map((card, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                card.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                card.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
              }`}>
                 <card.icon className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="text-sm font-bold text-slate-900">{card.name}</h3>
                 <p className="text-xs font-bold text-slate-400">{card.stats}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* History Table - Standard Card */}
         <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
               <h3 className="text-base font-bold text-slate-900">Recent Exports</h3>
            </div>
            <div className="divide-y divide-slate-50">
               {[
                 { name: 'Revenue_Reconciliation.xlsx', date: 'Oct 24', user: 'Admin Hub', size: '2.4 MB' },
                 { name: 'Commission_Payable.pdf', date: 'Oct 22', user: 'Finance', size: '1.1 MB' },
                 { name: 'Claims_Audit.csv', date: 'Oct 20', user: 'System', size: '840 KB' },
               ].map((log, i) => (
                 <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-3">
                       <FileSpreadsheet className="w-5 h-5 text-slate-400" />
                       <div>
                          <p className="text-sm font-bold text-slate-900">{log.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.user} • {log.date}</p>
                       </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Download className="w-4 h-4" /></button>
                 </div>
               ))}
            </div>
         </div>

         {/* Filter Console - Standard Card */}
         <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-base font-bold mb-8 flex items-center gap-2">
               <Filter className="w-4 h-4 text-indigo-400" /> Filter Engine
            </h3>
            <div className="space-y-5">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold outline-none focus:border-indigo-500">
                     <option className="bg-slate-900">Financial Performance</option>
                     <option className="bg-slate-900">Operational Audit</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Format</label>
                  <div className="grid grid-cols-2 gap-2">
                     {['Excel', 'PDF', 'CSV', 'JSON'].map(f => (
                       <button key={f} className="py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-indigo-600 transition-all">{f}</button>
                     ))}
                  </div>
               </div>
               <button className="w-full mt-4 py-3.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 transition-all">
                  Generate Report
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;
