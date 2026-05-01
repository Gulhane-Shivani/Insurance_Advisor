import React, { useState } from 'react';
import { Banknote, Info, History, ArrowRight, ShieldCheck, Clock, Download, ArrowLeft, Wallet, Calculator } from 'lucide-react';
import toast from 'react-hot-toast';

const PolicyLoan: React.FC = () => {
   const [showApplyForm, setShowApplyForm] = useState(false);
   const [loanAmount, setLoanAmount] = useState('100000');

   const handleApplyLoan = (e: React.FormEvent) => {
      e.preventDefault();
      toast.loading('Processing loan application...', { duration: 2500 });
      setTimeout(() => {
         toast.success('Loan application submitted! You will receive an update within 24 hours.');
         setShowApplyForm(false);
      }, 2500);
   };

   const handleDownloadStatement = (id: string) => {
      const content = `Loan Statement for ${id}\nOutstanding: ₹1,85,420\nLast Repayment: ₹5,400 on Apr 05, 2024`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Loan_Statement_${id}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Statement downloaded');
   };

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

   if (showApplyForm) {
      return (
         <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
               <button onClick={() => setShowApplyForm(false)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <h1 className="text-2xl font-black text-slate-900 tracking-tight">Loan Application</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10">
                  <form className="space-y-8" onSubmit={handleApplyLoan}>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligible Policy</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-blue-50">
                           <option>Jeevan Anand Life (Surrender Value: ₹5.2L)</option>
                        </select>
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested Amount</label>
                           <span className="text-2xl font-black text-blue-600">₹{Number(loanAmount).toLocaleString()}</span>
                        </div>
                        <input
                           type="range"
                           min="50000"
                           max="450000"
                           step="5000"
                           value={loanAmount}
                           onChange={(e) => setLoanAmount(e.target.value)}
                           className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                           <span>Min: ₹50K</span>
                           <span>Max Eligible: ₹4.5L</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Interest</p>
                           <p className="text-lg font-black text-slate-900">₹{(Number(loanAmount) * 0.085 / 12).toFixed(0)}</p>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Processing Fee</p>
                           <p className="text-lg font-black text-slate-900">₹500</p>
                        </div>
                     </div>

                     <div className="flex gap-4 pt-4 border-t border-slate-50">
                        <button type="button" onClick={() => setShowApplyForm(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Submit Application</button>
                     </div>
                  </form>
               </div>

               <div className="space-y-6">
                  <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                     <Calculator className="w-10 h-10 text-blue-400 mb-6" />
                     <h3 className="text-xl font-black mb-2">Instant Quote</h3>
                     <p className="text-slate-400 text-xs leading-relaxed mb-8">
                        Your loan will be disbursed directly to your registered bank account within 24 hours of approval.
                     </p>
                     <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-xs">
                           <span className="text-white/40 font-bold uppercase tracking-widest">Interest Rate</span>
                           <span className="font-black text-blue-400">8.5% Fixed</span>
                        </div>
                        <div className="flex justify-between text-xs">
                           <span className="text-white/40 font-bold uppercase tracking-widest">Repayment Mode</span>
                           <span className="font-black">Monthly Interest</span>
                        </div>
                        <div className="flex justify-between text-xs">
                           <span className="text-white/40 font-bold uppercase tracking-widest">Prepayment Fee</span>
                           <span className="font-black text-emerald-400">Zero</span>
                        </div>
                     </div>
                     <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

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
                     <button
                        onClick={() => setShowApplyForm(true)}
                        className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 mx-auto"
                     >
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
                                    <button
                                       onClick={() => handleDownloadStatement(loan.id)}
                                       className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                                    >
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
                  <button
                     onClick={() => {
                        const pay = window.confirm('Pay EMI of ₹5,400?');
                        if (pay) toast.success('EMI Payment Successful');
                     }}
                     className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors"
                  >
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
