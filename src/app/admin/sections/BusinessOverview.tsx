import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Wallet, 
  Activity, 
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const BusinessOverview: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState('Monthly');
  
  // Filter States
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [isDateOpen, setIsDateOpen] = useState(false);
  
  const [branch, setBranch] = useState('All Branches');
  const [isBranchOpen, setIsBranchOpen] = useState(false);

  // Close dropdowns on outside click
  const dateRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) setIsDateOpen(false);
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) setIsBranchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dateOptions = ['Today', 'Last 7 Days', 'Last 30 Days', 'This Quarter', 'This Year'];
  const branchOptions = ['All Branches', 'North Region (Delhi)', 'South Region (Bangalore)', 'West Region (Mumbai)', 'East Region (Kolkata)'];
  const kpis = [
    { label: 'Total Policies', value: '12,842', trend: '+12.5%', isUp: true, icon: ShieldCheck, color: 'blue' },
    { label: 'Total Revenue', value: '₹4.2Cr', trend: '+8.2%', isUp: true, icon: Wallet, color: 'indigo' },
    { label: 'Active Customers', value: '8,421', trend: '+15.3%', isUp: true, icon: Users, color: 'emerald' },
    { label: 'Total Leads', value: '452', trend: '-2.4%', isUp: false, icon: Activity, color: 'purple' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header with Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
           <h2 className="text-lg font-black text-slate-800">Operational Dashboard</h2>
           <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Real-time business monitoring</p>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Date Filter */}
           <div className="relative" ref={dateRef}>
             <button 
               onClick={() => { setIsDateOpen(!isDateOpen); setIsBranchOpen(false); }} 
               className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors"
             >
                <Calendar className="w-3.5 h-3.5" />
                <span>{dateRange}</span>
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
             </button>
             
             {isDateOpen && (
               <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                 {dateOptions.map(opt => (
                   <button 
                     key={opt}
                     onClick={() => { setDateRange(opt); setIsDateOpen(false); }}
                     className={`w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-slate-50 transition-colors ${dateRange === opt ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                   >
                     {opt}
                   </button>
                 ))}
               </div>
             )}
           </div>

           {/* Branch Filter */}
           <div className="relative" ref={branchRef}>
             <button 
               onClick={() => { setIsBranchOpen(!isBranchOpen); setIsDateOpen(false); }} 
               className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors"
             >
                <Filter className="w-3.5 h-3.5" />
                <span>{branch}</span>
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isBranchOpen ? 'rotate-180' : ''}`} />
             </button>

             {isBranchOpen && (
               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                 {branchOptions.map(opt => (
                   <button 
                     key={opt}
                     onClick={() => { setBranch(opt); setIsBranchOpen(false); }}
                     className={`w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-slate-50 transition-colors ${branch === opt ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                   >
                     {opt}
                   </button>
                 ))}
               </div>
             )}
           </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {kpis.map((kpi, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                   kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                   kpi.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                   kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                 }`}>
                    <kpi.icon className="w-4.5 h-4.5" />
                 </div>
                 <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-black ${
                   kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                 }`}>
                    {kpi.isUp ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                    {kpi.trend}
                 </div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{kpi.label}</p>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{kpi.value}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
         {/* Main Chart Card */}
         <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Revenue Stream</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Premium collections vs target trajectory</p>
               </div>
               <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {['Weekly', 'Monthly'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setChartPeriod(t)}
                      className={`px-3 py-1 rounded-md text-[9px] font-black transition-all uppercase ${
                        chartPeriod === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="h-48 w-full relative">
               <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <defs>
                     <linearGradient id="grad-ops" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                     </linearGradient>
                  </defs>
                  <path 
                    d="M 0 300 L 0 250 C 100 240, 200 280, 300 240 C 400 200, 500 220, 600 150 C 700 80, 800 120, 900 50 L 1000 30 L 1000 300 Z" 
                    fill="url(#grad-ops)" 
                  />
                  <path 
                    d="M 0 250 C 100 240, 200 280, 300 240 C 400 200, 500 220, 600 150 C 700 80, 800 120, 900 50 L 1000 30" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
               </svg>
            </div>
         </div>

         {/* Secondary Stats */}
         <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
            <h3 className="text-sm font-black mb-6 uppercase tracking-wider text-indigo-400">System Efficiency</h3>
            <div className="space-y-5">
               {[
                 { label: 'Loss Ratio', val: '42.5%', color: 'emerald' },
                 { label: 'Retention Rate', val: '94.2%', color: 'indigo' },
                 { label: 'Renewal Rate', val: '88.1%', color: 'blue' }
               ].map((r, i) => (
                 <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{r.label}</span>
                       <span className="text-white">{r.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className={`h-full bg-${r.color}-500`} style={{ width: r.val }}></div>
                    </div>
                 </div>
               ))}
            </div>
            
            <button 
              onClick={() => toast.success('Generating detailed system audit report...')}
              className="mt-8 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
            >
               Generate Detailed Audit
            </button>
         </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
