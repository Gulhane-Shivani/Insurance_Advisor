import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Wallet, 
  FileWarning, 
  Clock, 
  HandCoins,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ArrowRight
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  const kpis = [
    { label: 'Total Policies', value: '12,842', trend: '+12.5%', isUp: true, icon: ShieldCheck, color: 'blue' },
    { label: 'Total Revenue', value: '₹4.2Cr', trend: '+8.2%', isUp: true, icon: Wallet, color: 'indigo' },
    { label: 'Active Customers', value: '8,421', trend: '+15.3%', isUp: true, icon: Users, color: 'emerald' },
    { label: 'Total Leads', value: '452', trend: '-2.4%', isUp: false, icon: Activity, color: 'purple' },
    { label: 'Renewals Due', value: '124', trend: 'Next 30d', isUp: true, icon: Clock, color: 'orange' },
    { label: 'Claims Pending', value: '18', trend: '-4.1%', isUp: false, icon: FileWarning, color: 'red' },
    { label: 'Comm. Payable', value: '₹12.4L', trend: 'Processing', isUp: true, icon: HandCoins, color: 'slate' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Simple Welcome Header */}
      <div className="mb-8">
         <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome to Super Admin</h1>
         <p className="text-slate-500 font-medium mt-1">Global ecosystem overview and monitoring</p>
      </div>

      {/* KPI Grid - Simplified standard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {kpis.slice(0, 4).map((kpi, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                   kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                   kpi.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                   kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                 }`}>
                    <kpi.icon className="w-5 h-5" />
                 </div>
                 <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                   kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                 }`}>
                    {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.trend}
                 </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-10">
               <div>
                  <h3 className="text-base font-bold text-slate-900">Revenue Trajectory</h3>
                  <p className="text-xs text-slate-500">Flow analysis of global premium collections</p>
               </div>
               <div className="flex gap-2 bg-slate-50 p-1 rounded-lg">
                  {['Weekly', 'Monthly'].map(t => (
                    <button key={t} className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${t === 'Monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{t}</button>
                  ))}
               </div>
            </div>
            
            {/* Updated Area Chart Format (SVG) - Color: Sunset Amber */}
            <div className="h-64 w-full relative">
               <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <defs>
                     <linearGradient id="gradient-sunset" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                     </linearGradient>
                  </defs>
                  {/* Area Fill */}
                  <path 
                    d="M 0 300 L 0 250 C 100 240, 200 280, 300 240 C 400 200, 500 220, 600 150 C 700 80, 800 120, 900 50 L 1000 30 L 1000 300 Z" 
                    fill="url(#gradient-sunset)" 
                  />
                  {/* Trend Line */}
                  <path 
                    d="M 0 250 C 100 240, 200 280, 300 240 C 400 200, 500 220, 600 150 C 700 80, 800 120, 900 50 L 1000 30" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                  {/* Milestone Points */}
                  <circle cx="300" cy="240" r="6" fill="#F59E0B" stroke="white" strokeWidth="2" />
                  <circle cx="600" cy="150" r="6" fill="#F59E0B" stroke="white" strokeWidth="2" />
                  <circle cx="900" cy="50" r="6" fill="#F59E0B" stroke="white" strokeWidth="2" />
               </svg>

               {/* Background Grid Lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-full border-t border-slate-50"></div>
                  ))}
               </div>
            </div>

            <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span>Q1 Forecast</span>
               <span>Mid-Quarter</span>
               <span>Current Active</span>
            </div>
         </div>

         {/* Health Ratios */}
         <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between">
            <h3 className="text-base font-bold mb-6">System Ratios</h3>
            <div className="space-y-6">
               {[
                 { label: 'Loss Ratio', val: '42.5%', color: 'emerald' },
                 { label: 'Retention', val: '94.2%', color: 'indigo' },
                 { label: 'Growth', val: '12.8%', color: 'blue' }
               ].map((r, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                       <span className="text-slate-500">{r.label}</span>
                       <span className="text-white">{r.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className={`h-full bg-${r.color}-500`} style={{ width: r.val }}></div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
               <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                  Run Full Audit <ArrowRight className="w-3.5 h-3.5" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminOverview;
