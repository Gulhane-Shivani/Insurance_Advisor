import React, { useState, useEffect, useMemo } from 'react';
import { 
  CreditCard, 
  Search, 
  ArrowDownToLine,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  Smartphone,
  User,
  Shield,
  Filter
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  date: string;
  customer: string;
  policyId: string;
  policyType: string;
  amount: string;
  mode: string;
  collectedBy: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const PaymentManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeMonthFilter, setActiveMonthFilter] = useState('All Time');

  const [policies, setPolicies] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safeguard_policies_v2');
      if (saved) {
        try {
          setPolicies(JSON.parse(saved));
        } catch (e) { }
      }
    }
  }, []);

  const allPayments = useMemo(() => {
    let payments: PaymentRecord[] = [];
    
    // Add mock static payments for realistic view
    payments.push(
       { id: 'TXN-98234710', date: '2026-05-08', customer: 'Rohan Sharma', policyId: 'SG-MOTR-109', policyType: 'Motor Insurance', amount: '₹15,000', mode: 'UPI', collectedBy: 'Customer Portal', status: 'Completed' },
       { id: 'TXN-98234711', date: '2026-05-07', customer: 'Priya Patel', policyId: 'SG-LIFE-442', policyType: 'Life Insurance', amount: '₹45,000', mode: 'Credit Card', collectedBy: 'Agent App', status: 'Completed' },
       { id: 'TXN-98234712', date: '2026-05-06', customer: 'Amit Kumar', policyId: 'SG-HLTH-881', policyType: 'Health Insurance', amount: '₹22,500', mode: 'Net Banking', collectedBy: 'Admin Console', status: 'Completed' },
       { id: 'TXN-98234713', date: '2026-05-05', customer: 'Sneha Gupta', policyId: 'SG-PROP-229', policyType: 'Property Insurance', amount: '₹12,000', mode: 'UPI', collectedBy: 'Customer Portal', status: 'Pending' }
    );

    // Extract dynamic payments from local policies
    policies.forEach((p, idx) => {
       if (p.lastReceipt && p.lastRenewalDate) {
          payments.push({
             id: p.lastReceipt,
             date: p.lastRenewalDate,
             customer: p.customer,
             policyId: p.id,
             policyType: p.type,
             amount: p.premium,
             mode: 'Credit Card',
             collectedBy: 'Admin Console',
             status: 'Completed'
          });
       }
       // Add initial issuance payment
       if (p.issueDate) {
          payments.push({
             id: `TXN-INIT-${p.id.split('-')[2] || idx}`,
             date: p.issueDate,
             customer: p.customer,
             policyId: p.id,
             policyType: p.type,
             amount: p.premium,
             mode: 'Net Banking',
             collectedBy: idx % 2 === 0 ? 'Agent App' : 'Customer Portal',
             status: 'Completed'
          });
       }
    });

    // Sort by date descending
    return payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [policies]);

  const uniqueMonths = useMemo(() => {
    const months = new Set<string>();
    allPayments.forEach(p => {
       const dateObj = new Date(p.date);
       if (!isNaN(dateObj.getTime())) {
          const monthYear = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
          months.add(monthYear);
       }
    });
    return Array.from(months).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [allPayments]);

  const filteredPayments = allPayments.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.policyId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'Customer Side' && p.collectedBy !== 'Customer Portal') return false;
    if (activeFilter === 'Agent Side' && p.collectedBy !== 'Agent App') return false;
    if (activeFilter === 'Admin Side' && p.collectedBy !== 'Admin Console') return false;

    if (activeMonthFilter !== 'All Time') {
      const dateObj = new Date(p.date);
      if (!isNaN(dateObj.getTime())) {
         const monthYear = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
         if (monthYear !== activeMonthFilter) return false;
      }
    }

    return true;
  });

  const totalCollected = filteredPayments.filter(p => p.status === 'Completed').reduce((acc, curr) => {
      const val = parseInt(curr.amount.replace(/[^0-9]/g, '')) || 0;
      return acc + val;
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl p-7 rounded-[32px] border border-white/60 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-1.5 h-7 bg-gradient-to-b from-emerald-500 to-indigo-500 rounded-full"></div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Global Payment Ledger</h1>
          </div>
          <p className="text-slate-500 font-bold max-w-2xl leading-relaxed text-[11px] tracking-normal">
            Track and verify all inbound premium collections across customer, agent, and administrative channels.
          </p>
        </div>
        <div className="relative">
          <select 
            value={activeMonthFilter}
            onChange={(e) => setActiveMonthFilter(e.target.value)}
            className="appearance-none w-full min-w-[160px] flex items-center gap-2 px-5 py-3 pr-10 bg-slate-900 text-white rounded-xl font-black text-[11px] hover:bg-slate-800 transition-all shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
          >
            <option value="All Time">All Time</option>
            {uniqueMonths.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/70 pointer-events-none" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
               <TrendingUp className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Total Revenue</p>
               <p className="text-2xl font-black text-slate-900">₹{totalCollected.toLocaleString()}</p>
             </div>
          </div>
        </div>
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
               <CreditCard className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Total Transactions</p>
               <p className="text-2xl font-black text-slate-900">{filteredPayments.length}</p>
             </div>
          </div>
        </div>
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
               <Smartphone className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Agent Collections</p>
               <p className="text-2xl font-black text-slate-900">{filteredPayments.filter(p => p.collectedBy === 'Agent App').length}</p>
             </div>
          </div>
        </div>
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
               <User className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Customer Self-Serve</p>
               <p className="text-2xl font-black text-slate-900">{filteredPayments.filter(p => p.collectedBy === 'Customer Portal').length}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Table Interface */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-7 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="flex bg-slate-100/50 p-1.5 rounded-xl overflow-x-auto shadow-inner w-full lg:w-auto border border-slate-200/50">
             {['All', 'Customer Side', 'Agent Side', 'Admin Side'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveFilter(tab)}
                 className={`px-6 py-2 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                   activeFilter === tab ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                 }`}
               >
                  {tab}
               </button>
             ))}
          </div>
          
          <div className="relative w-full lg:w-72 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search TXN ID or Customer..." 
              className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-[12px] font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-600 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Transaction Details</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Customer & Policy</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Amount & Mode</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Source</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-[12px] font-bold text-slate-400">No payment records found.</p>
                  </td>
                </tr>
              ) : filteredPayments.map((payment) => (
                <tr key={payment.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-emerald-200 transition-colors">
                         <CreditCard className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                       </div>
                       <div>
                         <p className="text-[13px] font-black text-slate-900">{payment.id}</p>
                         <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                           <Clock className="w-3 h-3" />
                           {payment.date}
                         </p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <p className="text-[13px] font-bold text-slate-800">{payment.customer}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">{payment.policyId} • {payment.policyType}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col items-start">
                      <p className="text-[13px] font-black text-slate-900 bg-slate-50 inline-block px-2 py-0.5 rounded border border-slate-100">{payment.amount}</p>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">{payment.mode}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       {payment.collectedBy === 'Customer Portal' ? <User className="w-3.5 h-3.5 text-violet-500" /> :
                        payment.collectedBy === 'Agent App' ? <Smartphone className="w-3.5 h-3.5 text-blue-500" /> :
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />}
                       <span className="text-[11px] font-bold text-slate-700">{payment.collectedBy}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border ${
                      payment.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      payment.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {payment.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> :
                       payment.status === 'Pending' ? <Clock className="w-3 h-3" /> : 
                       <XCircle className="w-3 h-3" />}
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
