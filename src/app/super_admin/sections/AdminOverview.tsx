import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  Users, 
  ShieldCheck, 
  Wallet, 
  FileWarning, 
  Clock, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  MoreVertical,
  MousePointer2,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';


const AdminOverview: React.FC = () => {
  const [revenueScope, setRevenueScope] = useState('Monthly');
  const [isAuditing, setIsAuditing] = useState(false);

  const revenueData = [
    { name: 'Jan', revenue: 2400 },
    { name: 'Feb', revenue: 1398 },
    { name: 'Mar', revenue: 9800 },
    { name: 'Apr', revenue: 3908 },
    { name: 'May', revenue: 4800 },
    { name: 'Jun', revenue: 3800 },
    { name: 'Jul', revenue: 4300 },
  ];

  const growthData = [
    { name: 'Jan', new: 400, churn: 240 },
    { name: 'Feb', new: 300, churn: 139 },
    { name: 'Mar', new: 200, churn: 980 },
    { name: 'Apr', new: 278, churn: 390 },
    { name: 'May', new: 189, churn: 480 },
    { name: 'Jun', new: 239, churn: 380 },
    { name: 'Jul', new: 349, churn: 430 },
  ];

  const pieData = [
    { name: 'Renewed', value: 94.2, color: '#10b981' },
    { name: 'Pending', value: 5.8, color: '#f1f5f9' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹2,04,00,000', trend: '12.5%', isUp: true, icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Total Customers', value: '480', trend: '8.2%', isUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Policies', value: '847', trend: '5.1%', isUp: true, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Renewal Due', value: '42', trend: '15% high', isUp: true, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Expired Policies', value: '15', trend: '2.4%', isUp: false, icon: FileWarning, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Pending Requests', value: '4', trend: 'Normal', isUp: true, icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
             Business Intelligence
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Monitor system-wide performance, revenue trends, and agent productivity across all branches.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => {
                setIsAuditing(true);
                setTimeout(() => {
                   setIsAuditing(false);
                   toast.success('System audit passed');
                }, 2000);
             }}
             disabled={isAuditing}
             className="px-6 py-3 bg-slate-900 rounded-2xl text-xs font-black text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-3"
           >
              {isAuditing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Zap className="w-4 h-4 text-emerald-400" />}
              System Audit
           </button>
        </div>
      </div>

      {/* Stats Cards — Premium compact layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[20px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative">
            {/* Gradient accent bar on top */}
            <div className={`h-[3px] w-full ${
              stat.color === 'text-emerald-500' ? 'bg-gradient-to-r from-emerald-400 to-teal-400' :
              stat.color === 'text-blue-500' ? 'bg-gradient-to-r from-blue-400 to-indigo-400' :
              stat.color === 'text-orange-500' ? 'bg-gradient-to-r from-orange-400 to-amber-400' :
              stat.color === 'text-red-500' ? 'bg-gradient-to-r from-rose-400 to-red-400' :
              'bg-gradient-to-r from-indigo-400 to-violet-400'
            }`} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                  <stat.icon size={17} />
                </div>
                <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.trend}
                </div>
              </div>

              <p className="text-[10px] font-bold text-slate-400 mb-1 tracking-wide">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{stat.value}</h3>

              <div className={`mt-3 h-0.5 w-6 rounded-full ${
                stat.color === 'text-emerald-500' ? 'bg-emerald-300' :
                stat.color === 'text-blue-500' ? 'bg-blue-300' :
                stat.color === 'text-orange-500' ? 'bg-orange-300' :
                stat.color === 'text-red-500' ? 'bg-rose-300' : 'bg-indigo-300'
              } group-hover:w-full transition-all duration-500`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Row: Revenue & Renewal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Revenue Trajectory</h3>
              <p className="text-xs text-slate-500 font-medium">Monthly premium collection flow</p>
            </div>
            <div className="flex bg-slate-100/80 backdrop-blur p-1 rounded-2xl border border-slate-200/50">
              {['Weekly', 'Monthly'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setRevenueScope(t)} 
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === revenueScope ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Renewal Pie Chart */}
        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-between group">
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Retention Hub</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><MoreVertical size={16} /></div>
          </div>

          <div className="relative w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">94.2%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Renewed</span>
            </div>
          </div>

          <div className="w-full space-y-4 mt-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-xs font-bold text-slate-600">Active Renewals</span>
              </div>
              <span className="text-sm font-black text-slate-900">7,240</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <span className="text-xs font-bold text-slate-600">Pending Actions</span>
              </div>
              <span className="text-sm font-black text-slate-900">124</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row: Growth & Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
               <h3 className="text-lg font-black text-slate-900 tracking-tight">Policy Growth Graph</h3>
               <p className="text-xs text-slate-500 font-medium">New issuances vs churn rate</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">New</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Churn</span>
               </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                />
                <Bar dataKey="new" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="churn" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Stats / Audit */}
        <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <MousePointer2 size={120} className="rotate-12" />
           </div>
           
           <h3 className="text-lg font-black mb-8 relative z-10">System Integrity</h3>
           
           <div className="space-y-8 relative z-10">
              {[
                { label: 'Uptime Score', val: '99.9%', sub: 'High Availability', color: 'bg-emerald-500' },
                { label: 'Sync Status', val: 'Healthy', sub: 'Real-time active', color: 'bg-indigo-500' },
                { label: 'Security Level', val: 'Tier-4', sub: 'Fully Encrypted', color: 'bg-blue-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className={`w-1.5 h-12 ${item.color} rounded-full`}></div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                      <div className="flex items-baseline gap-2">
                         <span className="text-xl font-black">{item.val}</span>
                         <span className="text-[10px] font-bold text-slate-600">{item.sub}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
              <button 
                onClick={() => {
                   setIsAuditing(true);
                   setTimeout(() => {
                      setIsAuditing(false);
                      toast.success('System audit passed');
                   }, 2000);
                }}
                disabled={isAuditing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40"
              >
                 {isAuditing ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                   <>
                     Run Deep Audit
                     <ArrowRight size={16} />
                   </>
                 )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
