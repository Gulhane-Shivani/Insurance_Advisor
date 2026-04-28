import React from 'react';
import { Banknote, Info, History, ArrowRight, ShieldCheck, Clock, Download } from 'lucide-react';

const PolicyLoan: React.FC = () => {
  const loans = [
    {
      id: 'LN-5542',
      policy: 'Jeevan Anand Life',
      amount: '₹2,50,000',
      rate: '8.5% p.a.',
      status: 'Active',
      date: 'Jan 10, 2024'
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Policy Loan</h1>
          <p className="text-slate-500 font-medium text-sm">Check eligibility and apply for a loan against your Life Insurance policies.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-xl flex items-center gap-2">
           <ShieldCheck className="w-4 h-4 text-emerald-600" />
           <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Eligibility: ₹4.5L Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Loan Application Area */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-10 text-center border-b border-slate-50">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Banknote className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Need Quick Cash?</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                  Apply for a loan against your Life Insurance policy with minimal documentation and low interest rates.
                </p>
                <div className="flex flex-wrap justify-center gap-8 mt-10">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Interest Starting</p>
                      <p className="text-xl font-black text-slate-900">8.0% <span className="text-xs font-bold text-slate-400">p.a.</span></p>
                   </div>
                   <div className="w-px h-10 bg-slate-100"></div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Tenure</p>
                      <p className="text-xl font-black text-slate-900">10 Years</p>
                   </div>
                   <div className="w-px h-10 bg-slate-100"></div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Processing</p>
                      <p className="text-xl font-black text-slate-900">24 Hours</p>
                   </div>
                </div>
                <button className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 mx-auto">
                   Apply for Policy Loan
                   <ArrowRight className="w-5 h-5" />
                </button>
             </div>
             <div className="p-8 bg-slate-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                   <Info className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                   Policy loans are only available for Life Insurance policies that have completed at least 3 years and have a surrender value.
                </p>
             </div>
           </div>

           {/* Loan History */}
           <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Active Loans & History
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan ID</th>
                         <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy</th>
                         <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                         <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Interest</th>
                         <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                         <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Statement</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {loans.map((loan) => (
                        <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-5 text-xs font-bold text-slate-500">{loan.id}</td>
                           <td className="px-8 py-5 text-xs font-bold text-slate-800">{loan.policy}</td>
                           <td className="px-8 py-5 text-xs font-black text-slate-900">{loan.amount}</td>
                           <td className="px-8 py-5 text-xs font-medium text-slate-600">{loan.rate}</td>
                           <td className="px-8 py-5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                 <Clock className="w-3.5 h-3.5" /> {loan.status}
                              </span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                                 <Download className="w-4 h-4" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>
        </div>

        {/* Repayment Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Current Repayment</h3>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6">
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Outstanding Balance</p>
                 <h4 className="text-3xl font-black mb-6">₹1,85,420</h4>
                 <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                       <span className="text-white/60">Next EMI</span>
                       <span className="font-bold">₹5,400</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-white/60">Due Date</span>
                       <span className="font-bold">May 05, 2024</span>
                    </div>
                 </div>
              </div>
              <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
                 Make Repayment
              </button>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLoan;
