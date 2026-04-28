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
    { city: 'Mumbai', revenue: '₹1.2Cr', growth: '+12%', efficiency: '94%' },
    { city: 'Delhi', revenue: '₹95L', growth: '+8%', efficiency: '88%' },
    { city: 'Bangalore', revenue: '₹88L', growth: '+15%', efficiency: '91%' },
    { city: 'Pune', revenue: '₹52L', growth: '+22%', efficiency: '96%' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Controls - Standard Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
         <div>
            <h2 className="text-xl font-bold text-slate-900">Business Intelligence</h2>
            <p className="text-sm text-slate-500">Performance metrics across all regions</p>
         </div>
         <div className="flex bg-slate-100 p-1 rounded-xl">
           {['Global', 'Regional', 'Local'].map(t => (
             <button key={t} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${t === 'Global' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>{t}</button>
           ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Chart Section */}
         <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="text-base font-bold text-slate-900">Issuance Velocity</h3>
                  <p className="text-xs text-slate-500">Daily policy issuance trend</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                     <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target</span>
                  </div>
               </div>
            </div>

            <div className="h-64 w-full flex items-end gap-1.5 border-b border-slate-100 pb-2">
               {Array.from({ length: 24 }).map((_, i) => {
                 const height = Math.floor(Math.random() * 70) + 20;
                 return (
                   <div key={i} className="flex-1 bg-indigo-600 rounded-t-sm transition-all hover:bg-indigo-400" style={{ height: `${height}%` }}></div>
                 );
               })}
            </div>
            <div className="flex justify-between mt-3">
               <span className="text-[10px] font-bold text-slate-400">Day 01</span>
               <span className="text-[10px] font-bold text-slate-400">Day 30</span>
            </div>
         </div>

         {/* Retention Card - Simplified */}
         <div className="lg:col-span-4 bg-indigo-600 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <h3 className="text-base font-bold">Retention Hub</h3>
               <Zap className="w-5 h-5 text-indigo-200" />
            </div>
            
            <div className="py-6 flex flex-col items-center">
               <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                     <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="42.4" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-2xl font-bold">85%</span>
               </div>
               <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest mt-4">System Efficiency</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
               <div>
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Renewals</p>
                  <p className="text-lg font-bold">12,482</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Churn</p>
                  <p className="text-lg font-bold">1.2%</p>
               </div>
            </div>
         </div>
      </div>

      {/* Regional Grid - Simplified Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {branchPerformance.map((branch, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <MapPin className="w-4 h-4" />
                 </div>
                 <h4 className="text-sm font-bold text-slate-900">{branch.city}</h4>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue</p>
                       <p className="text-base font-bold text-slate-900">{branch.revenue}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">{branch.growth}</span>
                 </div>
                 <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-500">
                    <div className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> {branch.efficiency} Eff.</div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Analytics;
