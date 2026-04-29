import React from 'react';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ChevronRight,
  Medal,
  Zap
} from 'lucide-react';

const TeamPerformance: React.FC = () => {
  const agents = [
    { name: 'Rahul Verma', sales: '₹42.5L', conversion: '68%', leads: 124, rank: 1, trend: 'up' },
    { name: 'Sneha Kapoor', sales: '₹38.2L', conversion: '52%', leads: 145, rank: 2, trend: 'up' },
    { name: 'Amit Desai', sales: '₹31.0L', conversion: '45%', leads: 98, rank: 3, trend: 'down' },
    { name: 'Priya Reddy', sales: '₹28.5L', conversion: '58%', leads: 82, rank: 4, trend: 'up' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-indigo-600 rounded-[24px] p-5 text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold text-indigo-100 uppercase tracking-widest mb-1">Monthly Agency Target</p>
            <h3 className="text-2xl font-black mb-3">₹2.4 Cr / ₹3.0 Cr</h3>
            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-white rounded-full" style={{ width: '80%' }}></div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-100">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>80% achieved • 6 days left</span>
            </div>
          </div>
          <Target className="absolute right-[-15px] bottom-[-15px] w-24 h-24 text-white/10 -rotate-12" />
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Average Conversion</p>
            <h3 className="text-2xl font-black text-slate-800 mb-3">54.2%</h3>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
              <ArrowUpRight className="w-4 h-4" />
              <span>+4.2% from last month</span>
            </div>
          </div>
          <Zap className="absolute right-[-15px] bottom-[-15px] w-24 h-24 text-slate-50 rotate-12" />
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Agents</p>
            <h3 className="text-2xl font-black text-slate-800 mb-3">48 / 52</h3>
            <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs">
              <Users className="w-4 h-4" />
              <span>92% Workforce Activity</span>
            </div>
          </div>
          <Users className="absolute right-[-15px] bottom-[-15px] w-24 h-24 text-slate-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Leaderboard */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-800">Top Performing Agents</h3>
              <p className="text-[11px] text-slate-500 font-medium">Ranked by total premium generated this month</p>
            </div>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          
          <div className="p-5 space-y-3.5">
            {agents.map((agent, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                    agent.rank === 1 ? 'bg-amber-100 text-amber-600' :
                    agent.rank === 2 ? 'bg-slate-200 text-slate-600' :
                    agent.rank === 3 ? 'bg-orange-100 text-orange-600' : 'bg-white text-slate-400'
                  }`}>
                    {agent.rank}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{agent.name}</h4>
                    <p className="text-[10px] font-medium text-slate-400">{agent.leads} Leads Processed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">{agent.sales}</p>
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{agent.conversion} Conv.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto p-4 bg-slate-50/50 text-center border-t border-slate-100">
             <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">View Full Leaderboard</button>
          </div>
        </div>

        {/* Targets & Achievements */}
        <div className="lg:col-span-1 bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 flex flex-col">
           <h3 className="text-base font-black text-slate-800 mb-5">Product Wise Split</h3>
           
           <div className="space-y-5 flex-1">
              {[
                { label: 'Life Insurance', val: '₹1.2Cr', progress: 85, color: 'indigo' },
                { label: 'Health Insurance', val: '₹85L', progress: 72, color: 'emerald' },
                { label: 'Car Insurance', val: '₹35L', progress: 45, color: 'amber' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-slate-800">{item.val}</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-${item.color}-500 rounded-full`} style={{ width: `${item.progress}%` }}></div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
              <Medal className="w-8 h-8 text-indigo-600" />
              <div>
                 <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Agency Rank</p>
                 <h4 className="text-sm font-black text-indigo-600">Top 5% Regionally</h4>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;
