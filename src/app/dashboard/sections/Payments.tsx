import React, { useState } from 'react';
import { CreditCard, History, Clock, Download, ChevronRight, Wallet, CheckCircle2, X, Plus, ShieldCheck, Zap, Lock } from 'lucide-react';

import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const Payments: React.FC = () => {
  const [upcomingPayments, setUpcomingPayments] = useState([
    { id: 1, policy: 'Optima Secure Health', amount: '₹1,550', date: 'Oct 24, 2024', status: 'Upcoming', type: 'Health' },
    { id: 2, policy: 'Auto Safe Car Insurance', amount: '₹7,900', date: 'May 12, 2024', status: 'Due Soon', type: 'Car' },
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 'TXN-90210', policy: 'Optima Secure Health', amount: '₹1,550', date: 'Sep 24, 2023', status: 'Paid', method: 'UPI' },
    { id: 'TXN-90209', policy: 'Jeevan Anand Life', amount: '₹12,400', date: 'Jan 15, 2023', status: 'Paid', method: 'Net Banking' },
    { id: 'TXN-90208', policy: 'Auto Safe Car', amount: '₹7,900', date: 'May 13, 2022', status: 'Paid', method: 'Credit Card' },
  ]);

  const [savedMethods, setSavedMethods] = useState([
    { id: 1, type: 'Card', last4: '4242', holder: 'Test Customer', expiry: '12/26', default: true },
    { id: 2, type: 'UPI', id_val: 'johndoe@okaxis', verified: true }
  ]);

  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showGateway, setShowGateway] = useState<{ active: boolean, policy: any | null, step: 'details' | 'success' }>({ active: false, policy: null, step: 'details' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);

  const handlePayNow = (policy: any) => {
    setShowGateway({ active: true, policy, step: 'details' });
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      if (!showGateway.policy) return;
      const newHistoryItem = {
        id: `TXN-${Math.floor(Math.random() * 90000) + 10000}`,
        policy: showGateway.policy.policy,
        amount: showGateway.policy.amount,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Paid',
        method: 'Visa •••• 4242'
      };
      setPaymentHistory(prev => [newHistoryItem, ...prev]);
      setUpcomingPayments(prev => prev.filter(p => p.id !== showGateway.policy?.id));
      setIsProcessing(false);
      setShowGateway(prev => ({ ...prev, step: 'success' }));
    }, 2000);
  };

  const handleAddMethod = (e: React.FormEvent) => {
     e.preventDefault();
     const form = e.target as HTMLFormElement;
     const cardNum = (form.elements.namedItem('cardNumber') as HTMLInputElement).value;
     
     toast.loading('Verifying method...', { id: 'add-method' });
     setTimeout(() => {
        const last4 = cardNum.slice(-4) || '1234';
        setSavedMethods(prev => [...prev, {
           id: Date.now(),
           type: 'Card',
           last4,
           holder: 'Test Customer',
           expiry: '09/28',
           default: false
        }]);
        toast.success('New method added!', { id: 'add-method' });
        setShowAddMethod(false);
     }, 1500);
  };

  const downloadReceipt = (txn: any) => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235); // Blue-600
      doc.text("INSURANCE ADVISOR", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("Payment Confirmation Receipt", 105, 28, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 35, 190, 35);
      
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      
      let currentY = 50;
      const addField = (label: string, value: string) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, 30, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(value, 80, currentY);
        currentY += 12;
      };

      addField("Transaction ID", txn.id);
      addField("Policy Name", txn.policy);
      addField("Payment Date", txn.date);
      addField("Payment Mode", txn.method);
      addField("Status", "SUCCESSFUL");
      
      currentY += 10;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(25, currentY - 8, 160, 25, 3, 3, 'F');
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Amount Paid:", 35, currentY + 8);
      doc.setTextColor(37, 99, 235);
      doc.text(txn.amount, 140, currentY + 8);
      
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("This receipt confirms your successful premium payment.", 105, 140, { align: 'center' });
      doc.text(`Generated securely on ${new Date().toLocaleString()}`, 105, 146, { align: 'center' });

      doc.save(`Premium_Receipt_${txn.id}.pdf`);
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const closeGateway = () => {
    setShowGateway({ active: false, policy: null, step: 'details' });
    setPin(['', '', '', '']);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-full">
      {/* Top Section: Navigation and Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payments & Billing</h1>
           <p className="text-slate-500 font-medium mt-0.5 text-xs">Efficiently manage your premiums and billing assets.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-white border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-black text-slate-900">₹42,850 <span className="text-slate-400 font-bold uppercase ml-1">Paid</span></span>
           </div>
           <div className="bg-white border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-black text-slate-900">₹7,900 <span className="text-slate-400 font-bold uppercase ml-1">Next</span></span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Payment Area */}
        <div className="xl:col-span-8 space-y-6">
           {/* Upcoming Section */}
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-5 px-7 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                 <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Pending Premiums
                 </h3>
                 <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest">{upcomingPayments.length} Active</span>
              </div>
              <div className="divide-y divide-slate-50">
                 {upcomingPayments.length > 0 ? upcomingPayments.map((payment) => (
                    <div key={payment.id} className="p-5 px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-all duration-300">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                             {payment.type === 'Health' ? '🏥' : '🚗'}
                          </div>
                          <div>
                             <h4 className="text-[13px] font-black text-slate-900 leading-tight">{payment.policy}</h4>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> Due: {payment.date}
                             </p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6 justify-between sm:justify-end">
                          <div className="text-right">
                             <p className="text-lg font-black text-slate-900 tracking-tight">{payment.amount}</p>
                             <span className="text-[8px] font-black text-red-500 uppercase tracking-widest px-1.5 py-0.5 bg-red-50 rounded-md">Immediate Pay</span>
                          </div>
                          <button 
                            onClick={() => handlePayNow(payment)}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                          >
                             Checkout
                          </button>
                       </div>
                    </div>
                 )) : (
                    <div className="p-10 text-center">
                       <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                       <h4 className="text-base font-black text-slate-900 mb-1">No Pending Dues</h4>
                       <p className="text-slate-500 text-xs font-medium">All premiums are settled.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Sidebar: Billing Assets */}
        <div className="xl:col-span-4 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                 <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Stored Wallets</h3>
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              
              <div className="space-y-3">
                 {savedMethods.map(method => (
                    <div key={method.id} className={`p-4 rounded-2xl border transition-all ${
                       method.type === 'Card' ? 'bg-slate-900 text-white shadow-lg relative overflow-hidden group' : 'bg-slate-50 border-slate-200 group'
                    }`}>
                       {method.type === 'Card' ? (
                          <div className="relative z-10">
                             <div className="flex justify-between items-start mb-4">
                                <Wallet className="w-5 h-5 text-blue-400" />
                                <span className="px-1.5 py-0.5 bg-white/10 rounded-md text-[7px] font-black uppercase tracking-widest border border-white/10">Default</span>
                             </div>
                             <p className="text-sm font-bold tracking-[0.2em] mb-4">•••• •••• {method.last4}</p>
                             <div className="flex justify-between items-end opacity-50">
                                <p className="text-[8px] font-black uppercase">{method.holder}</p>
                                <p className="text-[9px] font-black">{method.expiry}</p>
                             </div>
                             <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
                          </div>
                       ) : (
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-[8px] italic font-black text-blue-600 shadow-sm">UPI</div>
                                <div>
                                   <p className="text-[11px] font-black text-slate-800 leading-none mb-1">{method.id_val}</p>
                                   <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Verified</p>
                                </div>
                             </div>
                             <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 transition-colors" />
                          </div>
                       )}
                    </div>
                 ))}

                 <button 
                   onClick={() => setShowAddMethod(true)}
                   className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[8px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                 >
                    <Plus className="w-3 h-3" /> Add Method
                 </button>
              </div>
           </div>
        </div>

        {/* Transaction History - Full Width Row */}
        <div className="xl:col-span-12 bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
           <div className="p-5 px-7 border-b border-slate-50 bg-slate-50/30">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                 <History className="w-4 h-4 text-emerald-600" />
                 Transaction History
              </h3>
           </div>
           <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50">
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">Mode</th>
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                       <th className="px-7 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {paymentHistory.map((history) => (
                      <tr key={history.id} className="hover:bg-slate-50/30 transition-colors group">
                         <td className="px-7 py-4 text-[9px] font-black text-slate-400 tracking-tighter">#{history.id.split('-')[1]}</td>
                         <td className="px-7 py-4">
                            <p className="text-[11px] font-black text-slate-900 leading-tight">{history.policy}</p>
                         </td>
                         <td className="px-7 py-4 text-center">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded-md text-[7px] font-black text-slate-500 uppercase tracking-widest border border-slate-200/50">
                               {history.method}
                            </span>
                         </td>
                         <td className="px-7 py-4 text-[9px] font-bold text-slate-500">{history.date} • 10:42 AM</td>
                         <td className="px-7 py-4 text-[11px] font-black text-slate-900">{history.amount}</td>
                         <td className="px-7 py-4 text-center">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[7px] font-black uppercase tracking-widest">
                               {history.status}
                            </span>
                         </td>
                         <td className="px-7 py-4 text-right">
                            <button 
                              onClick={() => downloadReceipt(history)}
                              className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                              title="Download PDF Receipt"
                            >
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
      {showGateway.active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
              {showGateway.step === 'success' ? (
                 <div className="p-12 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner shadow-emerald-100">
                       <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-in bounce-in" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Payment Success!</h2>
                    <p className="text-slate-500 font-medium mb-8 text-xs">Your premium has been settled securely.</p>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8 flex flex-col gap-3">
                       <div className="flex justify-between">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ref ID</span>
                          <span className="text-[10px] font-black text-slate-900">TXN-{Math.floor(10000 + Math.random() * 90000)}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</span>
                          <span className="text-xl font-black text-blue-600">{showGateway.policy?.amount}</span>
                       </div>
                    </div>
                    <button 
                      onClick={closeGateway}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all"
                    >
                       Continue
                    </button>
                 </div>
              ) : (
                 <>
                    <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                             <Lock className="w-4 h-4" />
                          </div>
                          <div>
                             <h2 className="text-lg font-black tracking-tight leading-none mb-1">Gateway</h2>
                             <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Bank Grade Security</p>
                          </div>
                       </div>
                       <button onClick={closeGateway} className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-4 h-4" /></button>
                    </div>

                    <div className="p-8 space-y-6">
                       <div className="p-5 bg-slate-50 rounded-[28px] border border-slate-100 flex justify-between items-center">
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Renewal</p>
                             <p className="text-[13px] font-black text-slate-900">{showGateway.policy?.policy}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Payable</p>
                             <p className="text-2xl font-black text-blue-600">{showGateway.policy?.amount}</p>
                          </div>
                       </div>

                       <form onSubmit={handlePinSubmit} className="space-y-5">
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                             <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none" required />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry</label>
                                <input type="text" placeholder="MM/YY" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none" required />
                             </div>
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                                <input type="password" placeholder="***" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none" required />
                             </div>
                          </div>

                          <div className="space-y-3 pt-2">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Transaction PIN</p>
                             <div className="flex justify-center gap-3">
                                {pin.map((digit, i) => (
                                   <input
                                      key={i}
                                      type="password"
                                      maxLength={1}
                                      value={digit}
                                      onChange={(e) => {
                                         const newPin = [...pin];
                                         newPin[i] = e.target.value;
                                         setPin(newPin);
                                         if (e.target.value && i < 3) {
                                            const next = (e.target as any).nextElementSibling;
                                            next?.focus();
                                         }
                                      }}
                                      className="w-10 h-12 bg-slate-50 border border-slate-100 rounded-xl text-center text-lg font-black focus:ring-4 focus:ring-blue-50 outline-none"
                                      required
                                   />
                                ))}
                             </div>
                          </div>

                          <button 
                            type="submit"
                            disabled={isProcessing || pin.some(d => !d)}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-xl transition-all disabled:opacity-50 mt-4"
                          >
                             {isProcessing ? 'Authorizing...' : 'Pay Now'}
                          </button>
                       </form>
                       
                       <div className="flex items-center justify-center gap-2 opacity-50 border-t border-slate-50 pt-6">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-black uppercase tracking-widest">PCI DSS Secure</span>
                       </div>
                    </div>
                 </>
              )}
           </div>
        </div>
      )}

      {/* Add Method Modal */}
      {showAddMethod && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden relative">
              <button onClick={() => setShowAddMethod(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"><X className="w-4 h-4" /></button>
              <div className="p-8">
                 <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">Add New Card</h2>
                 <form className="space-y-5" onSubmit={handleAddMethod}>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                       <input name="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none" required />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                          <input type="password" placeholder="***" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none" required />
                       </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all mt-2">Link Securely</button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
