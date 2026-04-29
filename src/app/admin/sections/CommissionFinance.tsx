import React from 'react';
import { 
  Wallet, 
  HandCoins, 
  TrendingUp, 
  PieChart, 
  Download, 
  ArrowUpRight, 
  CreditCard,
  History,
  CheckCircle2,
  Clock
} from 'lucide-react';

const CommissionFinance: React.FC = () => {
  const agentPayouts = [
    { name: 'Rahul Verma', amount: '₹1,12,400', status: 'Paid', date: '25 Apr 2024' },
    { name: 'Sneha Kapoor', amount: '₹98,500', status: 'Processing', date: 'Pending' },
    { name: 'Amit Desai', amount: '₹75,200', status: 'Paid', date: '24 Apr 2024' },
    { name: 'Priya Reddy', amount: '₹62,000', status: 'Paid', date: '24 Apr 2024' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Wallet className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gross Premium Collected</p>
              <h3 className="text-2xl font-black text-slate-800">₹4.2Cr</h3>
              <div className="mt-3 flex items-center gap-1.5 text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">+12.4% vs last month</span>
              </div>
           </div>
           <PieChart className="absolute right-[-15px] bottom-[-15px] w-32 h-32 text-slate-50 rotate-12" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <HandCoins className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Commission Payable</p>
              <h3 className="text-2xl font-black text-slate-800">₹18.5L</h3>
              <div className="mt-3 flex items-center gap-1.5 text-amber-600">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Processing Cycle: 30 Apr</span>
              </div>
           </div>
           <TrendingUp className="absolute right-[-15px] bottom-[-15px] w-32 h-32 text-slate-50 -rotate-12" />
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
           <div className="flex justify-between items-start mb-8">
              <div>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Company Net Revenue</p>
                 <h3 className="text-2xl font-black">₹32.8L</h3>
              </div>
              <CreditCard className="w-6 h-6 text-indigo-400" />
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                 <span className="text-slate-400">Monthly Target</span>
                 <span>₹40L</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 rounded-full" style={{ width: '82%' }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
           <div>
              <h3 className="text-lg font-black text-slate-800">Commission Payouts</h3>
              <p className="text-xs text-slate-500 font-medium">Recent disbursements to agents and partners</p>
           </div>
           <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
             <Download className="w-3.5 h-3.5" /> Export
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Agent Name</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Commission</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Disbursement</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agentPayouts.map((payout, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-[9px] font-bold text-indigo-600">
                        {payout.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{payout.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-black text-slate-800">{payout.amount}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                       {payout.status === 'Paid' ? (
                         <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       ) : (
                         <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                       )}
                       <span className={`text-[9px] font-black uppercase tracking-widest ${
                         payout.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                       }`}>
                         {payout.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-medium text-slate-500">{payout.date}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-[10px] font-bold text-indigo-600 hover:underline">Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/50 flex justify-center">
           <button className="text-xs font-bold text-slate-500 flex items-center gap-2">
             <History className="w-4 h-4" /> Load More Financial History
           </button>
        </div>
      </div>
    </div>
  );
};

export default CommissionFinance;
