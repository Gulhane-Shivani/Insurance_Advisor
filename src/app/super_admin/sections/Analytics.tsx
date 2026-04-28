import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  MapPin, 
  ArrowUpRight, 
  PieChart, 
  Activity, 
  Users, 
  ChevronRight,
  Zap,
  Globe,
  Monitor
} from 'lucide-react';

const Analytics: React.FC = () => {
  const branchPerformance = [
    { city: 'Mumbai', revenue: '₹1.2Cr', growth: '+12%', agents: 42, efficiency: '94%' },
    { city: 'Delhi', revenue: '₹95L', growth: '+8%', agents: 38, efficiency: '88%' },
    { city: 'Bangalore', revenue: '₹88L', growth: '+15%', agents: 31, efficiency: '91%' },
    { city: 'Pune', revenue: '₹52L', growth: '+22%', agents: 18, efficiency: '96%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Institutional Analytics</p>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Business Intelligence</h1>
           <p className="text-slate-500 font-medium mt-2">Deeper insights into policy issuance trends, regional performance, and agent productivity metrics.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
           {['Global', 'Regional', 'Local'].map(t => (
             <button key={t} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === 'Global' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>{t}</button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-200/60 p-10 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-10 relative z-10">
               <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Issuance Velocity</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily trend comparison</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                     <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Current Period</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target</span>
                  </div>
               </div>
            </div>

            {/* Mock Graph Visual */}
            <div className="h-64 w-full relative flex items-end gap-2 pt-12 z-10">
               {Array.from({ length: 31 }).map((_, i) => {
                 const height = Math.floor(Math.random() * 60) + 30;
                 return (
                   <div key={i} className="flex-1 h-full flex flex-col justify-end gap-1 group/bar cursor-pointer">
                      <div className="w-full bg-indigo-50 rounded-t-sm transition-all group-hover/bar:bg-indigo-100" style={{ height: `${height + 10}%` }}></div>
                      <div className="w-full bg-indigo-600 rounded-t-sm transition-all group-hover/bar:bg-indigo-400" style={{ height: `${height}%` }}></div>
                   </div>
                 );
               })}
               <div className="absolute top-0 left-0 w-full h-full border-b border-slate-100 pointer-events-none"></div>
            </div>
            <div className="flex justify-between mt-6 relative z-10">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Day 01</span>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Day 15</span>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Day 31</span>
            </div>
         </div>

         {/* Side Metrics */}
         <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-indigo-600 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden flex-1 group">
               <h3 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10">
                  <Zap className="w-6 h-6 text-indigo-300" /> Retention Hub
               </h3>
               
               <div className="relative h-48 flex items-center justify-center z-10">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                     <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="42.4" strokeLinecap="round" className="transition-all duration-[1.5s] ease-out" />
                  </svg>
                  <div className="absolute text-center">
                     <p className="text-4xl font-black">85%</p>
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mt-1">Efficiency</p>
                  </div>
               </div>

               <div className="mt-10 grid grid-cols-2 gap-6 pt-10 border-t border-white/10 relative z-10">
                  <div>
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Renewals</p>
                     <p className="text-2xl font-black">12,482</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Churn</p>
                     <p className="text-2xl font-black">1.2%</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Cluster Performance */}
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 overflow-hidden">
         <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Regional Branch Performance</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit of key operational hubs</p>
            </div>
            <button className="text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Regional Audit</button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branchPerformance.map((branch, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all duration-500 relative overflow-hidden">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg transition-all">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-black text-slate-900 tracking-tight">{branch.city}</h4>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                          <p className="text-lg font-black text-slate-900">{branch.revenue}</p>
                       </div>
                       <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">{branch.growth}</span>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-200/50 flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                          <span className="text-[11px] font-bold text-slate-500">{branch.agents}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                          <span className="text-[11px] font-bold text-slate-500">{branch.efficiency} Eff.</span>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Analytics;
