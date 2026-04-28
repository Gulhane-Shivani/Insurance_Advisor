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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-2xl font-black text-white tracking-tight">Business Intelligence</h2>
           <p className="text-slate-500 font-medium mt-1 text-sm">Real-time performance monitoring across 4 regional clusters.</p>
        </div>
        <div className="flex bg-[#020617] p-1.5 rounded-2xl border border-white/5">
           {['Global', 'Cluster', 'Local'].map(t => (
             <button key={t} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === 'Global' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/40' : 'text-slate-500 hover:text-white'}`}>{t}</button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Immersive Main Chart */}
         <div className="lg:col-span-8 bg-white/5 border border-white/5 rounded-[48px] p-10 lg:p-12 relative overflow-hidden group shadow-2xl">
            <div className="flex justify-between items-start mb-12 relative z-10">
               <div>
                  <h3 className="text-xl font-black text-white tracking-tight">System Velocity Index</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Daily issuance & renewal trajectories</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Master Target</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Baseline</span>
                  </div>
               </div>
            </div>

            {/* High-Density Data Visualization */}
            <div className="h-80 w-full relative flex items-end gap-1.5 pt-12 z-10">
               {Array.from({ length: 31 }).map((_, i) => {
                 const height = Math.floor(Math.random() * 60) + 30;
                 const targetHeight = height + (Math.random() * 20 - 10);
                 return (
                   <div key={i} className="flex-1 h-full flex flex-col justify-end gap-1 group/bar cursor-pointer">
                      <div className="w-full bg-indigo-500/10 rounded-t-sm transition-all group-hover/bar:bg-indigo-500/30" style={{ height: `${targetHeight}%` }}></div>
                      <div className="w-full bg-indigo-600 rounded-t-sm transition-all group-hover/bar:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover/bar:bg-indigo-400" style={{ height: `${height}%` }}></div>
                   </div>
                 );
               })}
               <div className="absolute top-0 left-0 w-full h-full border-b border-white/5 pointer-events-none"></div>
            </div>
            <div className="flex justify-between mt-8 relative z-10">
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Cycle Start</span>
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Mid-Cycle</span>
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Cycle End</span>
            </div>

            {/* Mesh Decor */}
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>
         </div>

         {/* Strategic Retention Hub */}
         <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-indigo-600 rounded-[48px] p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden flex-1 group">
               <h3 className="text-xl font-black mb-12 flex items-center gap-3 relative z-10">
                  <Zap className="w-6 h-6 text-indigo-300 shadow-lg" /> Yield Efficiency
               </h3>
               
               <div className="relative h-56 flex items-center justify-center z-10">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                     <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="42.4" strokeLinecap="round" className="transition-all duration-[1.5s] ease-out shadow-[0_0_20px_white]" />
                  </svg>
                  <div className="absolute text-center">
                     <p className="text-5xl font-black tracking-tighter">85%</p>
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mt-2">Active Retention</p>
                  </div>
               </div>

               <div className="mt-12 grid grid-cols-2 gap-8 pt-12 border-t border-white/10 relative z-10">
                  <div className="group/metric">
                     <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1.5 transition-colors group-hover/metric:text-white">Renewals</p>
                     <p className="text-2xl font-black tracking-tight">12,482</p>
                  </div>
                  <div className="group/metric text-right">
                     <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1.5 transition-colors group-hover/metric:text-white">Churn</p>
                     <p className="text-2xl font-black tracking-tight text-indigo-200">1.2%</p>
                  </div>
               </div>

               {/* Background Orbit */}
               <div className="absolute -right-20 -bottom-20 w-64 h-64 border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            </div>
         </div>
      </div>

      {/* Cluster Performance Grid */}
      <div className="bg-white/5 border border-white/5 rounded-[48px] shadow-2xl p-10 lg:p-12 overflow-hidden relative">
         <div className="flex justify-between items-center mb-12 relative z-10">
            <div>
               <h3 className="text-xl font-black text-white tracking-tight">Regional Node Audit</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Branch-specific revenue & operational health</p>
            </div>
            <button className="flex items-center gap-2 text-[11px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-all">
               Master Audit <ChevronRight className="w-4 h-4" />
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {branchPerformance.map((branch, i) => (
              <div key={i} className="p-8 rounded-[36px] bg-[#020617] border border-white/5 group hover:bg-white/5 hover:border-indigo-500/40 transition-all duration-700 relative overflow-hidden">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="text-[15px] font-black text-white tracking-tight">{branch.city}</h4>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Revenue Flow</p>
                          <p className="text-xl font-black text-white">{branch.revenue}</p>
                       </div>
                       <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">{branch.growth}</span>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors" />
                          <span className="text-[11px] font-bold text-slate-500">{branch.agents}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                          <span className="text-[11px] font-bold text-slate-500">{branch.efficiency} Eff.</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Selection Pulse */}
                 <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:shadow-[0_0_10px_#10b981] transition-all"></div>
              </div>
            ))}
         </div>

         {/* Bottom Fade Mesh */}
         <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Analytics;
