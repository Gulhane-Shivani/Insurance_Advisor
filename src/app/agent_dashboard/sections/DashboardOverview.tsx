/* src/app/agent_dashboard/sections/DashboardOverview.tsx */
import React from 'react';
import { 
  FileCheck, RefreshCw, DollarSign, Target, ArrowUpRight, 
  ArrowDownRight, Phone, Mail, Users, Plus, Zap, UserPlus, Shield
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Card, Button } from '../../../components/agent/UI';

const chartData = [
  { name: 'Jan', policies: 12, commission: 24000 },
  { name: 'Feb', policies: 18, commission: 36000 },
  { name: 'Mar', policies: 15, commission: 30000 },
  { name: 'Apr', policies: 24, commission: 42500 },
  { name: 'May', policies: 20, commission: 38000 },
  { name: 'Jun', policies: 28, commission: 51000 },
];

const DashboardOverview: React.FC<{ setSection: (s: string) => void }> = ({ setSection }) => {
  const kpis = [
    { label: 'New Policies', value: '24', change: '+12%', trend: 'up', icon: FileCheck, bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { label: 'Renewals (This Month)', value: '18', change: '+5%', trend: 'up', icon: RefreshCw, bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { label: 'Commission Earned', value: '₹42,500', change: '+18%', trend: 'up', icon: DollarSign, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Conversion Rate', value: '18.5%', change: '-2%', trend: 'down', icon: Target, bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
  ];

  const recentLeads = [
    { name: 'Rajesh Kumar', type: 'Life', status: 'Hot', time: '2h ago' },
    { name: 'Anjali Sharma', type: 'Business', status: 'Hot', time: '5h ago' },
    { name: 'Suresh Gupta', type: 'Health', status: 'Warm', time: '1d ago' },
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setSection('Leads')} icon={<UserPlus size={18} />} className="shadow-lg shadow-indigo-600/10">Add Lead</Button>
        <Button variant="secondary" onClick={() => setSection('Quotes')} icon={<Zap size={18} />} className="shadow-lg shadow-slate-900/10">Create Quote</Button>
        <Button variant="outline" onClick={() => setSection('Customers')} icon={<Users size={18} />}>My Customers</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="p-6 hover:translate-y-[-4px] duration-300 border-none shadow-xl shadow-slate-200/50 group">
            <div className={`w-12 h-12 rounded-2xl ${kpi.bgColor} ${kpi.textColor} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
              <kpi.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{kpi.value}</h3>
              <div className={`flex items-center gap-1 text-[10px] font-black ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Target Achievement Card */}
      <Card className="p-8 border-none shadow-xl shadow-slate-200/50 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
            <Target size={160} />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
               <h3 className="text-xl font-black tracking-tight">Monthly Target Achievement</h3>
               <p className="text-sm text-slate-400 font-medium">You have achieved **75%** of your sales goal for April.</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="w-32 h-32 relative flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                     <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                     <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="91.1" className="text-indigo-500" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-2xl font-black">75%</span>
               </div>
               <div className="hidden lg:block space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                     <p className="text-[10px] font-black uppercase text-slate-400">₹3,75,000 Achieved</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-white/10"></div>
                     <p className="text-[10px] font-black uppercase text-slate-400">₹1,25,000 Pending</p>
                  </div>
               </div>
            </div>
         </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Policy Trend</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Monthly Policy Issuance Volume</p>
            </div>
          </div>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPolicies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="policies" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorPolicies)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Revenue Analysis</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Commission Growth (INR)</p>
            </div>
          </div>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="commission" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">Recent Leads</h3>
          <div className="space-y-4">
            {recentLeads.map((lead, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-indigo-600">
                    {lead.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{lead.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{lead.type} Insurance</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${lead.status === 'Hot' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                    {lead.status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{lead.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setSection('Leads')} className="w-full mt-6 py-4 text-xs font-black text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all uppercase tracking-widest">Explore Pipeline</button>
        </Card>

        {/* Activity Log Snapshot */}
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">Recent Activity</h3>
          <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {[
              { type: 'Call', text: 'Rajesh Kumar', icon: Phone, color: 'text-blue-600', bg: 'bg-blue-50' },
              { type: 'Email', text: 'Anjali Sharma', icon: Mail, color: 'text-amber-600', bg: 'bg-amber-50' },
              { type: 'Meeting', text: 'Sunil Gupta', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 relative">
                <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center z-10 border-4 border-white shadow-sm`}>
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{item.type}</p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setSection('Activity')} className="w-full mt-6 py-4 text-xs font-black text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all uppercase tracking-widest">Audit Full Log</button>
        </Card>

        {/* Reminders / Next Actions */}
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50 bg-indigo-600 text-white">
          <h3 className="text-lg font-black mb-6">Upcoming Reminders</h3>
          <div className="space-y-6">
            {[
              { title: 'Renewal: Rajesh K.', date: 'May 15', sub: 'Policy HL-7788' },
              { title: 'Meeting: Sunil G.', date: 'May 20', sub: 'Juhu Residence' },
            ].map((rem, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/5 hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-sm font-black tracking-tight">{rem.title}</p>
                      <p className="text-[10px] text-indigo-200 font-bold mt-0.5">{rem.sub}</p>
                   </div>
                   <span className="text-[10px] font-black bg-white text-indigo-600 px-2 py-0.5 rounded uppercase">{rem.date}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setSection('Tasks')} className="w-full mt-8 py-3 text-xs font-black text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all uppercase tracking-widest">Open Calendar</button>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
