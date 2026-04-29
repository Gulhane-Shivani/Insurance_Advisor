/* src/app/agent_dashboard/sections/CommissionStatement.tsx */
import React, { useState } from 'react';
import { 
  Wallet, Download, 
  Calendar, ChevronRight, ArrowUpRight
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const CommissionStatement: React.FC = () => {
  const [filterMonth, setFilterMonth] = useState('April');

  const history = [
    { id: '1', date: '2026-04-25', policy: 'Rajesh Kumar (Life)', type: 'New Business', amount: '₹12,400', status: 'Processed' },
    { id: '2', date: '2026-04-22', policy: 'Sunil Gupta (Car)', type: 'Renewal', amount: '₹3,200', status: 'Pending' },
    { id: '3', date: '2026-04-18', policy: 'Anjali Sharma (Health)', type: 'New Business', amount: '₹6,800', status: 'Processed' },
    { id: '4', date: '2026-04-10', policy: 'Rahul Verma (Life)', type: 'New Business', amount: '₹15,000', status: 'Processed' },
    { id: '5', date: '2026-04-05', policy: 'Priya Sharma (Car)', type: 'Service Fee', amount: '₹1,500', status: 'Paid' },
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Wallet Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-900 text-white border-none shadow-xl relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:scale-125 transition-transform duration-500">
             <Wallet size={80} />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                 Wallet Balance
              </p>
              <h2 className="text-3xl font-black tracking-tighter mb-4">₹2,84,050</h2>
            </div>
            <div className="flex gap-2">
               <Button variant="primary" size="sm" className="px-3 py-2 text-[9px] bg-indigo-600 hover:bg-indigo-500 border-none shadow-md">Request Payout</Button>
               <Button variant="outline" size="sm" className="px-3 py-2 text-[9px] border-white/20 text-white hover:bg-white/5">Transactions</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-between bg-white">
           <div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Earnings (YTD)</p>
             <h3 className="text-2xl font-black text-slate-800 tracking-tight">₹15,45,050</h3>
           </div>
           <div className="mt-4 flex items-center gap-1.5 text-emerald-600 font-black text-[9px] bg-emerald-50 w-fit px-2.5 py-1 rounded-lg border border-emerald-100">
              <ArrowUpRight size={12} /> +24% from last year
           </div>
        </Card>

        <Card className="p-6 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-between bg-white">
           <div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Upcoming Payouts</p>
             <h3 className="text-2xl font-black text-slate-800 tracking-tight">₹32,400</h3>
           </div>
           <div className="mt-4 flex items-center gap-1.5 text-indigo-600 font-black text-[9px] bg-indigo-50 w-fit px-2.5 py-1 rounded-lg border border-indigo-100">
              <Calendar size={12} /> Next payout on May 05
           </div>
        </Card>
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
            <Button variant="outline" size="sm" icon={<Download size={14} />}>Export</Button>
         </div>
      </div>

      {/* History Table */}
      <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
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
    </div>
  );
};

export default CommissionStatement;
