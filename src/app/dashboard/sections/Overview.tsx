import React from 'react';
import { Shield, Clock, AlertCircle, CreditCard, FileText, Phone, ChevronRight, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OverviewProps {
  user: any;
  onNavigate: (section: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ user, onNavigate }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with quick stats */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
           <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100">Premium Member</span>
              <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                 <Activity className="w-3 h-3 text-emerald-500" /> System Active
              </span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
             Hello, {(user?.full_name || user?.name || 'User').split(' ')[0]}<span className="text-blue-600">.</span>
           </h1>
           <p className="text-slate-500 font-medium text-base mt-1">Your insurance portfolio summary.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <button 
             onClick={() => navigate('/compare')}
             className="px-6 py-3.5 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
           >
              <Zap className="w-4 h-4" /> Add Policy
           </button>

           <div className="flex flex-wrap gap-4">
              {[
                { label: 'Active Policies', value: '03', icon: Shield, color: 'text-blue-600' },
                { label: 'Pending Claims', value: '01', icon: AlertCircle, color: 'text-orange-500' },
                { label: 'Reward Points', value: '2,450', icon: Zap, color: 'text-purple-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                   <div className={`w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-4.5 h-4.5" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                      <p className="text-lg font-black text-slate-900 leading-none">{stat.value}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Card: Health Score */}
        <div className="md:col-span-8 bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden group hover:border-blue-200 transition-all">
           <div className="p-8 flex flex-col md:flex-row items-center gap-10">
              <div className="relative flex items-center justify-center shrink-0">
                 <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                    <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" 
                      strokeDasharray="452.4" 
                      strokeDashoffset="67.8"
                      className="text-blue-600 transition-all duration-1000 ease-out" 
                    />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-slate-900">85</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</span>
                 </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h2 className="text-2xl font-black text-slate-900 mb-3">Optimal Protection</h2>
                 <p className="text-slate-500 font-medium leading-relaxed mb-6 max-w-sm text-sm">
                    Your insurance health is excellent. You are currently covered for all critical risks based on your profile.
                 </p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <button onClick={() => onNavigate('policies')} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
                       Full Report
                    </button>
                    <button onClick={() => onNavigate('support')} className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                       Ask Advisor
                    </button>
                 </div>
              </div>
           </div>
           <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-8">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sum Assured</p>
                    <p className="text-base font-black text-slate-900">₹2.5 Cr</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium</p>
                    <p className="text-base font-black text-slate-900">₹4,850</p>
                 </div>
              </div>
              <div className="hidden sm:flex -space-x-2.5">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="insurer" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Action Grid */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
           {[
             { label: 'Pay Now', icon: CreditCard, color: 'bg-emerald-50 text-emerald-600', target: 'payments' },
             { label: 'Policies', icon: Shield, color: 'bg-blue-50 text-blue-600', target: 'policies' },
             { label: 'Claims', icon: FileText, color: 'bg-orange-50 text-orange-600', target: 'claims' },
             { label: 'Support', icon: Phone, color: 'bg-purple-50 text-purple-600', target: 'support' },
           ].map((action, i) => (
             <button
               key={i}
               onClick={() => onNavigate(action.target)}
               className="bg-white p-5 rounded-[28px] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all group"
             >
                <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                   <action.icon className="w-6 h-6" />
                 </div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{action.label}</span>
             </button>
           ))}
        </div>

        {/* Secondary Row */}
        <div className="md:col-span-6 bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-8 group">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                 <Clock className="w-5 h-5 text-orange-500" />
                 Upcoming
              </h3>
              <button onClick={() => onNavigate('payments')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
           </div>
           <div className="space-y-3">
              {[
                { id: 1, type: 'Health', name: 'Optima Secure', date: 'Oct 24, 2024', amount: '₹1,550', icon: '🏥' },
                { id: 2, type: 'Car', name: 'Auto Safe', date: 'May 12, 2024', amount: '₹790', icon: '🚗' },
              ].map((renewal) => (
                <div key={renewal.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                         {renewal.icon}
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-slate-900">{renewal.name}</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Due: {renewal.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-base font-black text-slate-900">{renewal.amount}</p>
                      <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Pay</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="md:col-span-6 bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <span className="px-2 py-0.5 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest mb-2 inline-block">Active Claim</span>
                    <h3 className="text-xl font-black mb-1">Accidental Damage</h3>
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">#CLM-90210 • Tata AIG</p>
                 </div>
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                 </div>
              </div>
              
              <div className="mb-8">
                 <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Progress</p>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">75% Complete</span>
                 </div>
                 <div className="w-full h-1.5 bg-white/10 rounded-full">
                    <div className="w-3/4 h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                 </div>
              </div>

              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Under Final Review</span>
                 </div>
                 <button onClick={() => onNavigate('claims')} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-colors">
                    Track <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
           
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>

      {/* Quick Action Footer */}
      
    </div>
  );
};

export default Overview;
