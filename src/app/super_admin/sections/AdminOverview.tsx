import React from 'react';
import {
   TrendingUp,
   Users,
   ShieldCheck,
   Wallet,
   FileWarning,
   Clock,
   HandCoins,
   ArrowUpRight,
   ArrowDownRight,
   BarChart,
   Activity,
   Layers,
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
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
         {/* Welcome Header */}
         <div>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">System Authority</p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Master Command Center</h1>
            <p className="text-slate-500 font-medium mt-2 max-w-2xl">Real-time oversight of the entire insurance ecosystem. Monitoring sales, claims, and agent performance across all branches.</p>
         </div>

         {/* KPI Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
               <div key={i} className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group overflow-hidden relative">
                  <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-full ${kpi.color === 'blue' ? 'from-blue-600' :
                        kpi.color === 'indigo' ? 'from-indigo-600' :
                           kpi.color === 'emerald' ? 'from-emerald-600' :
                              kpi.color === 'red' ? 'from-red-600' : 'from-slate-600'
                     }`}></div>

                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                           kpi.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                              kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                 kpi.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'
                        }`}>
                        <kpi.icon className="w-6 h-6" />
                     </div>
                     <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {kpi.trend}
                     </div>
                  </div>

                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
               </div>
            ))}
         </div>

         {/* Analytics Highlights */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Matrix */}
            <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200/60 p-10 shadow-sm overflow-hidden relative">
               <div className="flex justify-between items-start mb-10">
                  <div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Trajectory</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Global performance metrics</p>
                  </div>
                  <div className="flex gap-2">
                     {['Weekly', 'Monthly', 'Quarterly'].map(t => (
                        <button key={t} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${t === 'Monthly' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>{t}</button>
                     ))}
                  </div>
               </div>

               {/* Mock Chart Visual */}
               <div className="h-64 w-full flex items-end gap-3 px-4">
                  {[40, 70, 45, 90, 65, 85, 100, 75, 95, 60, 80, 110].map((h, i) => (
                     <div key={i} className="flex-1 group relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹{h}L</div>
                        <div
                           className={`w-full rounded-t-lg transition-all duration-1000 ease-out delay-[${i * 50}ms] ${i === 11 ? 'bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'bg-slate-100 group-hover:bg-indigo-200'}`}
                           style={{ height: `${h}%` }}
                        ></div>
                     </div>
                  ))}
               </div>
               <div className="flex justify-between mt-6 px-4">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                     <span key={m} className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m}</span>
                  ))}
               </div>
            </div>

            {/* Distribution & Ratios */}
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
               <h3 className="text-xl font-black tracking-tight mb-8">Business Health</h3>

               <div className="space-y-8">
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loss Ratio</p>
                        <span className="text-emerald-400 text-xs font-black">42.5% Optimal</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '42.5%' }}></div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Retention Rate</p>
                        <span className="text-indigo-400 text-xs font-black">94.2% High</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94.2%' }}></div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Agency Performance</p>
                        <span className="text-blue-400 text-xs font-black">88% Target</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }}></div>
                     </div>
                  </div>
               </div>

               <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                     <Layers className="w-4 h-4 text-indigo-400" />
                     <p className="text-xs font-black uppercase tracking-widest">Master Audit</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">System security level is currently set to <span className="text-white font-bold">MAXIMUM</span>. All transactions are being logged and verified.</p>
                  <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">
                     Security Log <ArrowRight className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminOverview;
