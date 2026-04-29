/* src/app/agent_dashboard/sections/CommissionStatement.tsx */
import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, DollarSign, Download, 
  Calendar, Filter, Search, ChevronRight,
  ArrowUpRight, ArrowDownRight, PieChart, BarChart3
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const CommissionStatement: React.FC = () => {
  const [filterMonth, setFilterMonth] = useState('April');

  const history = [
    { id: '1', date: '2026-04-25', policy: 'Amitabh Bachchan (Life)', type: 'New Business', amount: '₹12,400', status: 'Processed' },
    { id: '2', date: '2026-04-22', policy: 'Sachin Tendulkar (Car)', type: 'Renewal', amount: '₹3,200', status: 'Pending' },
    { id: '3', date: '2026-04-18', policy: 'Deepika Padukone (Health)', type: 'New Business', amount: '₹6,800', status: 'Processed' },
    { id: '4', date: '2026-04-10', policy: 'Rahul Verma (Life)', type: 'New Business', amount: '₹15,000', status: 'Processed' },
    { id: '5', date: '2026-04-05', policy: 'Priya Sharma (Car)', type: 'Service Fee', amount: '₹1,500', status: 'Paid' },
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Wallet Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-4 p-10 bg-indigo-600 text-white border-none shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
             <Wallet size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 mb-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
               Wallet Balance
            </p>
            <h2 className="text-5xl font-black tracking-tighter mb-8">₹2,84,050</h2>
            <div className="flex gap-3">
               <Button variant="secondary" size="sm" className="bg-white text-indigo-600 hover:bg-slate-50 border-none shadow-lg">Request Payout</Button>
               <Button variant="outline" size="sm" className="border-indigo-400 text-white hover:bg-indigo-500">View Transactions</Button>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="p-8 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Earnings (YTD)</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">₹15,45,050</h3>
              </div>
              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-xs bg-emerald-50 w-fit px-3 py-1.5 rounded-xl border border-emerald-100">
                 <ArrowUpRight size={16} /> +24% from last year
              </div>
           </Card>
           <Card className="p-8 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Upcoming Payouts</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">₹32,400</h3>
              </div>
              <div className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-xs bg-indigo-50 w-fit px-3 py-1.5 rounded-xl border border-indigo-100">
                 <Calendar size={16} /> Next payout on May 05
              </div>
           </Card>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
         <div>
            <h3 className="text-lg font-black text-slate-800">Payout History</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Track your individual commission details</p>
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <select 
              className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 uppercase tracking-widest outline-none focus:border-indigo-500 shadow-sm"
              value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}
            >
               <option>April</option>
               <option>March</option>
               <option>February</option>
               <option>January</option>
            </select>
            <Button variant="outline" size="sm" icon={<Download size={14} />}>Export Statement</Button>
         </div>
      </div>

      {/* History Table */}
      <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-800">{row.date}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref: TXN-{row.id}00</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-800">{row.policy}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${row.type === 'New Business' ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                       {row.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-800">{row.amount}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      row.status === 'Processed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                      row.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Analytics Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
               <PieChart size={18} className="text-indigo-600" /> Earning Distribution
            </h4>
            <div className="space-y-6">
               {[
                 { label: 'Life Insurance', value: 65, color: 'bg-indigo-600' },
                 { label: 'Health Insurance', value: 20, color: 'bg-indigo-400' },
                 { label: 'Car Insurance', value: 15, color: 'bg-indigo-200' },
               ].map((item, i) => (
                 <div key={i}>
                    <div className="flex justify-between mb-2">
                       <span className="text-[10px] font-black text-slate-500 uppercase">{item.label}</span>
                       <span className="text-[10px] font-black text-slate-800">{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </Card>
         <Card className="p-8 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-[24px] bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
               <BarChart3 size={32} />
            </div>
            <h4 className="text-lg font-black text-slate-800 tracking-tight">Performance Bonus</h4>
            <p className="text-xs font-medium text-slate-500 mt-2 max-w-xs">
               You are only ₹1.2 Lakh away from unlocking the **Elite Bonus** (₹25,000 extra).
            </p>
            <Button variant="outline" size="sm" className="mt-6">View Bonus Rules</Button>
         </Card>
      </div>
    </div>
  );
};

export default CommissionStatement;
