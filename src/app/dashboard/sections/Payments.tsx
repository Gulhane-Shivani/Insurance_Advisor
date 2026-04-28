import React from 'react';
import { CreditCard, History, Clock, Download, ChevronRight, ArrowUpRight, Wallet } from 'lucide-react';

const Payments: React.FC = () => {
  const upcomingPayments = [
    { id: 1, policy: 'Optima Secure Health', amount: '₹1,550', date: 'Oct 24, 2024', status: 'Upcoming', type: 'Health' },
    { id: 2, policy: 'Auto Safe Car Insurance', amount: '₹7,900', date: 'May 12, 2024', status: 'Due Soon', type: 'Car' },
  ];

  const paymentHistory = [
    { id: 'TXN-90210', policy: 'Optima Secure Health', amount: '₹1,550', date: 'Sep 24, 2023', status: 'Paid', method: 'UPI' },
    { id: 'TXN-90209', policy: 'Jeevan Anand Life', amount: '₹12,400', date: 'Jan 15, 2023', status: 'Paid', method: 'Net Banking' },
    { id: 'TXN-90208', policy: 'Auto Safe Car', amount: '₹7,900', date: 'May 13, 2022', status: 'Paid', method: 'Credit Card' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Financial Overview</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payments</h1>
           <p className="text-slate-500 font-medium mt-1 text-sm">Manage subscriptions and track transaction history.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
           <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Auto-pay Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stats & Upcoming */}
        <div className="lg:col-span-8 space-y-6">
           {/* Summary Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-[32px] p-7 text-white relative overflow-hidden group">
                 <div className="relative z-10">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1.5">Total Paid (YTD)</p>
                    <h3 className="text-2xl font-black mb-4">₹42,850</h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-tight">
                       <ArrowUpRight className="w-3.5 h-3.5" /> 12% from last year
                    </div>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
              </div>
              <div className="bg-white rounded-[32px] p-7 border border-slate-200/60 shadow-sm flex flex-col justify-between">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Next Scheduled</p>
                    <h3 className="text-2xl font-black text-slate-900">₹7,900</h3>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-tight">
                    <Clock className="w-3.5 h-3.5 text-orange-500" /> May 12, 2024
                 </div>
              </div>
           </div>

           {/* Upcoming Payments List */}
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-7 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Renewals
                 </h3>
              </div>
              <div className="divide-y divide-slate-50">
                 {upcomingPayments.map((payment) => (
                   <div key={payment.id} className="p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner">
                            {payment.type === 'Health' ? '🏥' : '🚗'}
                         </div>
                         <div>
                            <h4 className="text-base font-black text-slate-900 leading-tight">{payment.policy}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Due: {payment.date}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 justify-between sm:justify-end">
                         <div className="text-right">
                            <p className="text-lg font-black text-slate-900">{payment.amount}</p>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${
                              payment.status === 'Due Soon' ? 'text-red-500' : 'text-orange-500'
                            }`}>{payment.status}</span>
                         </div>
                         <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
                            Pay Now
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* History Table */}
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-7 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                    <History className="w-5 h-5 text-emerald-600" />
                    History
                 </h3>
                 <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1.5">
                    Download <Download className="w-3.5 h-3.5" />
                 </button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Method</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Receipt</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {paymentHistory.map((history) => (
                         <tr key={history.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-7 py-5 text-[11px] font-bold text-slate-500">#{history.id}</td>
                            <td className="px-7 py-5">
                               <p className="text-[12px] font-bold text-slate-900">{history.policy}</p>
                               <p className="text-[9px] font-medium text-slate-400">{history.date}</p>
                            </td>
                            <td className="px-7 py-5 text-center">
                               <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                  {history.method}
                               </span>
                            </td>
                            <td className="px-7 py-5">
                               <p className="text-[12px] font-black text-slate-900">{history.amount}</p>
                            </td>
                            <td className="px-7 py-5 text-right">
                               <button className="p-2.5 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                                  <Download className="w-3.5 h-3.5" />
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Right: Wallets & Cards */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-7">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Saved Methods</h3>
              <div className="space-y-3.5">
                 <div className="p-6 rounded-[24px] bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl shadow-slate-200 group cursor-pointer hover:scale-[1.01] transition-transform">
                    <div className="flex justify-between items-start mb-6">
                       <Wallet className="w-7 h-7 text-blue-400" />
                       <div className="w-9 h-5 bg-white/10 rounded-md"></div>
                    </div>
                    <p className="text-base font-bold tracking-[0.2em] mb-4">•••• •••• •••• 4242</p>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Expires</p>
                          <p className="text-[11px] font-bold">12 / 26</p>
                       </div>
                       <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10">Default</span>
                    </div>
                 </div>
                 
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm italic font-black text-blue-600">
                          UPI
                       </div>
                       <p className="text-[11px] font-bold text-slate-700">johndoe@okaxis</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                 </div>

                 <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-all">
                    + Add New Method
                 </button>
              </div>
           </div>

           <div className="bg-blue-600 rounded-[32px] p-7 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <h3 className="text-lg font-black mb-3">Auto-Debit</h3>
              <p className="text-white/70 text-[11px] font-medium leading-relaxed mb-6">
                 Premiums are automated via e-NACH. You will be notified 48h before deduction.
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">System Active</span>
                 </div>
                 <button className="text-[9px] font-black uppercase tracking-widest hover:underline">Manage</button>
              </div>
              <button className="w-full py-3.5 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                 View Mandate
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
