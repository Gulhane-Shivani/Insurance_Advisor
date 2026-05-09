import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Clock, 
  AlertCircle, 
  Search, 
  CheckCircle2,
  RefreshCw,
  CreditCard,
  History,
  Zap,
  Eye,
  Mail,
  X,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react';

interface Policy {
  id: string;
  type: string;
  customer: string;
  premium: string;
  status?: string;
  expiryDate: string;
  isInactive?: boolean;
  email?: string;
  contact?: string;
  lastRenewalDate?: string;
  lastReceipt?: string;
}

const RenewalManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRenewalModal, setActiveRenewalModal] = useState<string | null>(null);
  const [renewalForm, setRenewalForm] = useState({ date: new Date().toISOString().split('T')[0], receipt: '' });
  
  const [policies, setPolicies] = useState<Policy[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safeguard_policies_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse policies', e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('safeguard_policies_v2', JSON.stringify(policies));
    }
  }, [policies]);

  const getPolicyStatus = (expiryDateStr: string, isInactive?: boolean): string => {
    if (isInactive) return 'Inactive';
    if (!expiryDateStr) return 'Active';
    const expiry = new Date(expiryDateStr);
    const today = new Date();
    expiry.setHours(23, 59, 59, 999);
    if (expiry < today) return 'Expired';
    
    const thirtyDays = new Date();
    thirtyDays.setDate(today.getDate() + 30);
    if (expiry <= thirtyDays) return 'Renewal Due';
    
    return 'Active';
  };

  const processedPolicies = policies.map(p => ({
    ...p,
    status: getPolicyStatus(p.expiryDate, p.isInactive)
  }));

  // Only show Renewal Due and Expired policies
  const renewalPolicies = processedPolicies.filter(p => p.status === 'Renewal Due' || p.status === 'Expired');

  const filteredPolicies = renewalPolicies.filter(policy => {
    const matchesSearch = policy.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleRenewPolicyClick = (policyId: string) => {
     setActiveRenewalModal(policyId);
     setRenewalForm({ date: new Date().toISOString().split('T')[0], receipt: '' });
  };

  const handleRenewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeRenewalModal) {
      setPolicies(policies.map(p => {
        if (p.id === activeRenewalModal) {
           const oldExpiry = new Date(p.expiryDate);
           oldExpiry.setFullYear(oldExpiry.getFullYear() + 1);
           const newExpiryStr = oldExpiry.toISOString().split('T')[0];
           return { ...p, expiryDate: newExpiryStr, lastRenewalDate: renewalForm.date, lastReceipt: renewalForm.receipt };
        }
        return p;
      }));
      setActiveRenewalModal(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl p-7 rounded-[32px] border border-white/60 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-1.5 h-7 bg-gradient-to-b from-amber-500 to-rose-500 rounded-full"></div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Renewal Operations</h1>
          </div>
          <p className="text-slate-500 font-bold max-w-2xl leading-relaxed text-[11px] tracking-normal">
            Identify policies approaching maturity and process renewal terms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
               <Clock className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Renewals Due</p>
               <p className="text-2xl font-black text-slate-900">{processedPolicies.filter(p => p.status === 'Renewal Due').length}</p>
             </div>
          </div>
        </div>
        
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
               <AlertCircle className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Expired Policies</p>
               <p className="text-2xl font-black text-slate-900">{processedPolicies.filter(p => p.status === 'Expired').length}</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-4 relative z-10">
             <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
               <CheckCircle2 className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[11px] font-bold text-slate-400 mb-0.5">Retained This Month</p>
               <p className="text-2xl font-black text-slate-900">84%</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-7 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <h3 className="text-sm font-black text-slate-800">Pending Actions</h3>
          <div className="relative w-full lg:w-72 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search customers or policies..." 
              className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-[12px] font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Policy Details</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Customer Identity</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Expiry Date</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Status</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Premium</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPolicies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-[12px] font-bold text-slate-400">No pending renewals found.</p>
                  </td>
                </tr>
              ) : filteredPolicies.map((policy) => (
                <tr key={policy.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className={`w-1 h-8 rounded-full transition-colors ${
                         policy.status === 'Renewal Due' ? 'bg-amber-400 group-hover:bg-amber-500' : 'bg-rose-400 group-hover:bg-rose-500'
                       }`}></div>
                       <div>
                         <p className="text-[13px] font-black text-slate-900">{policy.id}</p>
                         <p className="text-[10px] font-bold text-slate-400">{policy.type}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <p className="text-[13px] font-bold text-slate-800">{policy.customer}</p>
                      {policy.contact && (
                        <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                          {policy.contact}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-bold">{policy.expiryDate}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border ${
                      policy.status === 'Renewal Due' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        policy.status === 'Renewal Due' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></div>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[12px] font-black text-slate-900 bg-slate-50 inline-block px-2.5 py-1 rounded-lg border border-slate-100">{policy.premium}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleRenewPolicyClick(policy.id)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[11px] font-black transition-all hover:bg-slate-800 hover:shadow-lg shadow-sm group"
                    >
                      <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      Renew Policy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeRenewalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900">Process Policy Renewal</h3>
              <button onClick={() => setActiveRenewalModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRenewSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  Payment Date
                </label>
                <input 
                  type="date" 
                  required
                  value={renewalForm.date}
                  onChange={(e) => setRenewalForm({ ...renewalForm, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Receipt / Transaction ID
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. TXN-98234710"
                  value={renewalForm.receipt}
                  onChange={(e) => setRenewalForm({ ...renewalForm, receipt: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setActiveRenewalModal(null)} className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                  <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Confirm Renewal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalManagement;
