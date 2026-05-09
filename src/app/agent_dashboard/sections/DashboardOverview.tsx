import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  RefreshCw, 
  IndianRupee, 
  UserPlus, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Clock,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const chartData = [
  { name: 'Jan', revenue: 45000, leads: 12 },
  { name: 'Feb', revenue: 52000, leads: 15 },
  { name: 'Mar', revenue: 48000, leads: 18 },
  { name: 'Apr', revenue: 61000, leads: 22 },
  { name: 'May', revenue: 55000, leads: 19 },
  { name: 'Jun', revenue: 85000, leads: 25 },
];

const StatCard = ({ label, value, trend, isUp, icon: Icon, color }: any) => (
  <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150`}></div>
    <div className="flex items-start justify-between mb-4 relative z-10">
      <div className={`w-12 h-12 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend}
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
    </div>
  </div>
);

const DashboardOverview: React.FC<{ setSection: (s: string) => void }> = ({ setSection }) => {
  const stats = [
    { label: 'Total Policies Sold', value: '120', trend: '+14%', isUp: true, icon: ShieldCheck, color: 'indigo' },
    { label: 'Active Customers', value: '95', trend: '+8%', isUp: true, icon: Users, color: 'blue' },
    { label: 'Pending Renewals', value: '12', trend: 'Due Soon', isUp: false, icon: RefreshCw, color: 'amber' },
    { label: 'Monthly Commission', value: '₹85,000', trend: '+22%', isUp: true, icon: IndianRupee, color: 'emerald' },
    { label: 'Pending Payments', value: '5', trend: 'Urgent', isUp: false, icon: CreditCard, color: 'rose' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Welcome back, Rahul <Sparkles className="text-amber-500 w-6 h-6 animate-pulse" />
          </h1>
          <p className="text-sm font-bold text-slate-400 mt-1">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSection('Policies')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
          >
            Create Policy
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Earnings Performance</h3>
              <p className="text-xs font-bold text-slate-400 mt-1">Monthly commission growth & lead conversion</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest p-2 text-slate-500 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Tasks */}
        <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity size={120} className="rotate-12" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-2">Priority Actions</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Items requiring attention</p>
            
            <div className="space-y-4">
              {[
                { label: 'Renewal Call', target: 'Rajesh K.', time: '10:30 AM', icon: Clock, color: 'amber' },
                { label: 'Policy Draft', target: 'Priya S.', time: '02:00 PM', icon: Zap, color: 'indigo' },
                { label: 'Lead Followup', target: 'Anjali G.', time: '04:30 PM', icon: UserPlus, color: 'emerald' },
              ].map((task, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl bg-${task.color}-500/20 text-${task.color}-400 flex items-center justify-center`}>
                    <task.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black">{task.label}</p>
                    <p className="text-[10px] font-bold text-slate-400">{task.target} • {task.time}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          <button className="relative z-10 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40 mt-8">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Policies Snapshot */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900">Recent Policies</h3>
              <button onClick={() => setSection('Policies')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
           </div>
           <div className="divide-y divide-slate-50">
              {[
                { id: 'POL-8829', name: 'Amit Singh', type: 'Life Plus', date: '2 mins ago', amount: '₹12,400', status: 'Active' },
                { id: 'POL-8828', name: 'Neha Kapoor', type: 'Health Pro', date: '1 hour ago', amount: '₹8,200', status: 'Pending' },
                { id: 'POL-8827', name: 'Vikram Sahay', type: 'Car Shield', date: '3 hours ago', amount: '₹15,000', status: 'Active' },
              ].map((item, i) => (
                <div key={i} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">{item.id} • {item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{item.amount}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{item.date}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Lead Activity Snapshot */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900">New Leads</h3>
              <button onClick={() => setSection('Leads')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Manage Pipeline</button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Suresh Raina', type: 'Life', score: 85, time: 'Added today' },
                { name: 'Priya Verma', type: 'Health', score: 72, time: 'Added today' },
                { name: 'Rahul Dravid', type: 'Auto', score: 92, time: 'Yesterday' },
                { name: 'Sunil Chetri', type: 'Home', score: 64, time: 'Yesterday' },
              ].map((lead, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-black text-slate-800">{lead.name}</p>
                    <span className="text-[9px] font-black px-2 py-0.5 bg-white text-emerald-600 rounded-lg shadow-sm">{lead.score}%</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">{lead.type} Insurance</p>
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${lead.score}%` }}></div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 mt-2">{lead.time}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
