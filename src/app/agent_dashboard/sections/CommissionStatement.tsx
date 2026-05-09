import React from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter, 
  Calendar,
  DollarSign,
  PieChart as PieIcon,
  CreditCard,
  Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const chartData = [
  { month: 'Jan', earnings: 42000, target: 40000 },
  { month: 'Feb', earnings: 58000, target: 40000 },
  { month: 'Mar', earnings: 45000, target: 45000 },
  { month: 'Apr', earnings: 62000, target: 45000 },
  { month: 'May', earnings: 55000, target: 50000 },
  { month: 'Jun', earnings: 85000, target: 50000 },
];

const pieData = [
  { name: 'Paid', value: 75, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f1f5f9' },
];

const CommissionSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Earnings & Commissions</h2>
           <p className="text-sm font-bold text-slate-400 mt-1">Track your performance-based rewards</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
           <Download size={14} /> Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Commission', value: '₹12,45,000', icon: DollarSign, color: 'indigo', trend: '+18%' },
          { label: 'Monthly Earnings', value: '₹85,000', icon: TrendingUp, color: 'emerald', trend: '+12%' },
          { label: 'Pending Payout', value: '₹12,400', icon: Clock, color: 'amber', trend: 'Wait' },
          { label: 'Paid This Year', value: '₹4,12,000', icon: CreditCard, color: 'blue', trend: 'Verified' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 group">
             <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                  <stat.icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <ArrowUpRight size={10} /> {stat.trend}
                </div>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <h4 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-slate-900">Revenue Trajectory</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Actual</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Target</span>
                 </div>
              </div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                       <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={4} fill="url(#colorEarn)" />
                    <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Payout Distribution */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
           <h3 className="text-lg font-black text-slate-900 mb-8 self-start">Payout Status</h3>
           <div className="relative w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                       {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-black text-slate-900">75%</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paid out</span>
              </div>
           </div>
           <div className="w-full space-y-3 mt-8">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-600">Paid Commissions</span>
                 </div>
                 <span className="text-sm font-black text-slate-900">₹9,33,750</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <span className="text-xs font-bold text-slate-600">Pending Approvals</span>
                 </div>
                 <span className="text-sm font-black text-slate-900">₹3,11,250</span>
              </div>
           </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Commission History</h3>
            <button className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
               <Filter size={14} /> Month View
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy No</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Date</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Percentage</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                    { id: 'POL-8829', name: 'Amit Singh', date: '2026-05-09', premium: '₹12,400', rate: '12%', earned: '₹1,488', status: 'Paid' },
                    { id: 'POL-8827', name: 'Vikram Sahay', date: '2026-05-05', premium: '₹15,000', rate: '10%', earned: '₹1,500', status: 'Paid' },
                    { id: 'POL-8826', name: 'Suresh Raina', date: '2026-05-01', premium: '₹22,000', rate: '15%', earned: '₹3,300', status: 'Pending' },
                    { id: 'POL-8824', name: 'Sneha Gupta', date: '2026-04-28', premium: '₹18,000', rate: '12%', earned: '₹2,160', status: 'Paid' },
                    { id: 'POL-8822', name: 'Rahul Dravid', date: '2026-04-25', premium: '₹10,000', rate: '12%', earned: '₹1,200', status: 'Paid' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-5 text-xs font-black text-slate-900">{row.id}</td>
                       <td className="px-6 py-5 text-sm font-bold text-slate-700">{row.name}</td>
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-500">
                             <Calendar size={14} className="text-slate-400" />
                             <span className="text-xs font-bold">{row.date}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-sm font-bold text-slate-900">{row.premium}</td>
                       <td className="px-6 py-5 text-xs font-black text-indigo-600">{row.rate}</td>
                       <td className="px-6 py-5 text-sm font-black text-slate-900">{row.earned}</td>
                       <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            row.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                             {row.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default CommissionSection;
