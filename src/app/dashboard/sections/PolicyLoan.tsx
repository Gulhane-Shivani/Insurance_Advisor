import React, { useState, useMemo } from 'react';
import { Banknote, Info, History, ArrowRight, ShieldCheck, Download, ArrowLeft, Calculator, CheckCircle2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateLoanPDF } from '../../../utils/pdfGenerator';

interface PolicyLoanProps {
  userPolicies?: any[];
}

const PolicyLoan: React.FC<PolicyLoanProps> = ({ userPolicies = [] }) => {
   const [showApplyForm, setShowApplyForm] = useState(false);
   const [loanAmount, setLoanAmount] = useState('100000');
   const [selectedPolicyId, setSelectedPolicyId] = useState('');
   
   const [loanHistory, setLoanHistory] = useState([
      {
         id: 'LN-5542',
         policy: 'Jeevan Anand Life',
         amount: '₹2,50,000',
         rate: '8.5% p.a.',
         status: 'Active',
         date: 'Jan 10, 2024'
      }
   ]);

   const fallbackEligible = [
      { id: 'POL-44556', product: 'Jeevan Anand', company: 'LIC India', surrenderValue: '₹5,20,000', maxLoan: 450000 },
      { id: 'POL-77889', product: 'Whole Life Plan', company: 'HDFC Life', surrenderValue: '₹3,10,000', maxLoan: 250000 }
   ];

   const eligiblePolicies = useMemo(() => {
      if (userPolicies.length > 0) {
         return userPolicies
            .filter(p => p.type === 'Life' || p.type === 'life')
            .map(p => ({
               id: p.id,
               product: p.product,
               company: p.company,
               surrenderValue: '₹5.2L',
               maxLoan: 450000
            }));
      }
      return fallbackEligible;
   }, [userPolicies]);

   useMemo(() => {
      if (eligiblePolicies.length > 0 && !selectedPolicyId) {
         setSelectedPolicyId(eligiblePolicies[0].id);
      }
   }, [eligiblePolicies]);

   const currentPolicy = eligiblePolicies.find(p => p.id === selectedPolicyId) || eligiblePolicies[0];

   const handleApplyLoan = (e: React.FormEvent) => {
      e.preventDefault();
      const loadingToast = toast.loading('Processing loan application...');
      setTimeout(() => {
         const newLoan = {
            id: `LN-${Math.floor(Math.random() * 9000) + 1000}`,
            policy: currentPolicy.product,
            amount: `₹${Number(loanAmount).toLocaleString()}`,
            rate: '8.5% p.a.',
            status: 'Processing',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
         };
         setLoanHistory(prev => [newLoan, ...prev]);
         toast.dismiss(loadingToast);
         toast.success('Loan application submitted!');
         setShowApplyForm(false);
      }, 2500);
   };

   const handleDownloadStatement = (id: string) => {
      const loan = loanHistory.find(l => l.id === id);
      if (loan) {
         generateLoanPDF(loan);
      }
   };

   if (showApplyForm) {
      return (
         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
               <button onClick={() => setShowApplyForm(false)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <h1 className="text-2xl font-black text-slate-900 tracking-tight">Loan Application</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-6 md:p-10">
                  <form className="space-y-8" onSubmit={handleApplyLoan}>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligible Policy</label>
                        <select 
                           value={selectedPolicyId}
                           onChange={(e) => setSelectedPolicyId(e.target.value)}
                           className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                        >
                           {eligiblePolicies.map(p => (
                              <option key={p.id} value={p.id}>{p.product} ({p.company})</option>
                           ))}
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
                           max={currentPolicy?.maxLoan || 450000}
                           step="5000"
                           value={loanAmount}
                           onChange={(e) => setLoanAmount(e.target.value)}
                           className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                           <span>Min: ₹50K</span>
                           <span>Max Eligible: ₹{(currentPolicy?.maxLoan / 100000).toFixed(1)}L</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <button type="button" onClick={() => setShowApplyForm(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all font-bold">Cancel</button>
                        <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all font-bold">Submit Application</button>
                     </div>
                  </form>
               </div>

               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                     <Calculator className="w-8 h-8 text-blue-400 mb-6" />
                     <h3 className="text-lg font-black mb-2">Disbursal Policy</h3>
                     <p className="text-slate-400 text-[11px] leading-relaxed mb-6">
                        Disbursed directly to your bank account within 24 hours of approval.
                     </p>
                     <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-[10px]">
                           <span className="text-white/40 font-bold uppercase tracking-widest">Rate</span>
                           <span className="font-black text-blue-400">8.5% Fixed</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                           <span className="text-white/40 font-bold uppercase tracking-widest">Prepayment</span>
                           <span className="font-black text-emerald-400">Zero Fee</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-10 animate-in slide-in-from-left-4 duration-500 max-w-full overflow-x-hidden">
         {/* Top Header Section */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Policy Loan Hub</h1>
               <p className="text-slate-500 font-medium text-sm mt-1">Unlock liquidity from your insurance assets.</p>
            </div>
            <div className="bg-emerald-50 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-emerald-100 shadow-sm">
               <ShieldCheck className="w-5 h-5 text-emerald-600" />
               <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Max Eligibility</p>
                  <p className="text-sm font-black text-emerald-900 leading-none">₹4.5L Available</p>
               </div>
            </div>
         </div>

         {/* Hero & Rules Section */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden group">
               <div className="p-8 md:p-12 text-center border-b border-slate-50 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-50/50 blur-3xl rounded-full -z-10 group-hover:bg-blue-100/50 transition-colors duration-700"></div>
                  <div className="w-20 h-20 bg-blue-600 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200 group-hover:scale-105 transition-transform duration-500">
                     <Banknote className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight">Financial Flexibility</h3>
                  <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium px-4">
                     Access up to 90% of your policy's surrender value with zero paperwork.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10">
                     <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Interest</p>
                        <p className="text-xl font-black text-slate-900">8.0% <span className="text-xs font-bold text-slate-400">p.a.</span></p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tenure</p>
                        <p className="text-xl font-black text-slate-900">10 <span className="text-xs font-bold text-slate-400">Years</span></p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Disbursal</p>
                        <p className="text-xl font-black text-blue-600">24 <span className="text-xs font-bold text-slate-400">Hrs</span></p>
                     </div>
                  </div>
                  
                  <button
                     onClick={() => setShowApplyForm(true)}
                     className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-4 mx-auto group/btn"
                  >
                     Apply for Policy Loan
                     <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
               <div className="p-6 bg-slate-50/50 flex items-center gap-4">
                  <Info className="w-5 h-5 text-blue-400 shrink-0" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                     Policies must be 3 years old. Capped at 90% surrender value.
                  </p>
               </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-[40px] border border-slate-200/60 p-8 md:p-10 shadow-sm flex flex-col justify-between">
               <div>
                  <div className="flex items-center gap-4 mb-8">
                     <Calculator className="w-6 h-6 text-blue-600" />
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Eligibility Rules</h3>
                  </div>
                  <ul className="space-y-6">
                     {[
                        'Minimum 3 years policy tenure',
                        'Active status with no defaults',
                        'Max 90% of surrender value',
                        'No physical documents needed'
                     ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                           <span className="text-xs font-bold text-slate-600 leading-tight">{text}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Support Available</p>
                  <p className="text-xs font-bold text-blue-800">Our experts are online to help with your application.</p>
               </div>
            </div>
         </div>

         {/* Full-Width History Section */}
         <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-8 px-10 border-b border-slate-50 flex justify-between items-center">
               <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <History className="w-6 h-6 text-blue-600" />
                  Active Loans & History
               </h3>
               <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">All Time Records</span>
               </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
               <table className="w-full text-left min-w-[900px]">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan ID</th>
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Source</th>
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Interest Rate</th>
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issued Date</th>
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {loanHistory.map((loan) => (
                        <tr key={loan.id} className="hover:bg-slate-50/30 transition-colors group">
                           <td className="px-10 py-6 text-xs font-black text-slate-400">{loan.id}</td>
                           <td className="px-10 py-6 text-xs font-black text-slate-900">{loan.policy}</td>
                           <td className="px-10 py-6 text-xs font-black text-blue-600">{loan.amount}</td>
                           <td className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{loan.rate}</td>
                           <td className="px-10 py-6 text-xs font-bold text-slate-500">{loan.date}</td>
                           <td className="px-10 py-6 text-center">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                 loan.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                              }`}>
                                 {loan.status}
                              </span>
                           </td>
                           <td className="px-10 py-6 text-right">
                              <button 
                                 onClick={() => handleDownloadStatement(loan.id)} 
                                 className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                                 title="Download Statement"
                              >
                                 <Download className="w-4.5 h-4.5" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-6 bg-slate-50/30 text-center border-t border-slate-50">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End of transaction history</p>
            </div>
         </div>
      </div>
   );
};

export default PolicyLoan;
