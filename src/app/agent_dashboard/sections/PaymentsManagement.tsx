import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  IndianRupee, 
  Calendar,
  ArrowUpRight,
  Download,
  ShieldCheck,
  Activity
} from 'lucide-react';

const PaymentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const payments = [
    { id: 'PAY-7001', customer: 'Amit Singh', policy: 'POL-8829', amount: '₹12,400', date: '2026-05-09', method: 'UPI', status: 'Success' },
    { id: 'PAY-7002', customer: 'Neha Kapoor', policy: 'POL-8828', amount: '₹8,200', date: '2026-05-08', method: 'Credit Card', status: 'Pending' },
    { id: 'PAY-7003', customer: 'Vikram Sahay', policy: 'POL-8827', amount: '₹15,000', date: '2026-05-07', method: 'Bank Transfer', status: 'Success' },
    { id: 'PAY-7004', customer: 'Suresh Raina', policy: 'POL-8826', amount: '₹22,000', date: '2026-05-05', method: 'Debit Card', status: 'Failed' },
    { id: 'PAY-7005', customer: 'Priya Verma', policy: 'POL-8825', amount: '₹9,500', date: '2026-05-04', method: 'UPI', status: 'Success' },
    { id: 'PAY-7006', customer: 'Rahul Dravid', policy: 'POL-8824', amount: '₹10,000', date: '2026-05-01', method: 'Cash', status: 'Pending' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Failed': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle2 size={12} />;
      case 'Pending': return <Clock size={12} />;
      case 'Failed': return <XCircle size={12} />;
      default: return null;
    }
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.customer.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || p.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Payment Ledger</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Track policy premiums and transaction status</p>
          </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner overflow-x-auto scrollbar-hide">
           {['All', 'Success', 'Pending', 'Failed'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                 activeTab === tab ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[32px] text-white shadow-lg shadow-emerald-200 group">
           <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                 <CheckCircle2 size={20} />
              </div>
              <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Total Collected</p>
           <h4 className="text-3xl font-black mt-1">₹4,85,200</h4>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-[32px] text-white shadow-lg shadow-amber-200 group">
           <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                 <Clock size={20} />
              </div>
              <Activity size={20} className="text-white/40 group-hover:text-white transition-colors animate-pulse" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-amber-100">Pending Dues</p>
           <h4 className="text-3xl font-black mt-1">₹18,200</h4>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Success Rate</p>
              <span className="text-xs font-black text-emerald-600">92%</span>
           </div>
           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
           </div>
           <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Global Payout Health</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search transaction or customer..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
              <Download size={14} /> Export CSV
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Holder</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-slate-900">{p.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px] border border-indigo-100">
                        {p.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{p.customer}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{p.policy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-bold">{p.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{p.method}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 text-slate-900 font-black">
                      <IndianRupee size={12} className="text-slate-400" />
                      <span className="text-sm">{p.amount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(p.status)}`}>
                        {getStatusIcon(p.status)}
                        {p.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="p-20 text-center">
            <CreditCard size={48} className="mx-auto text-slate-200 mb-4" />
            <h4 className="text-lg font-black text-slate-800 tracking-tight">No transactions found</h4>
            <p className="text-xs font-bold text-slate-400 max-w-xs mx-auto mt-1">Adjust your search or filters to see the records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsManagement;
