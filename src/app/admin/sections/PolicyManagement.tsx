import React, { useState } from 'react';
import { 
  Shield, 
  Clock, 
  AlertCircle, 
  Activity, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit2, 
  RotateCcw
} from 'lucide-react';
import PolicyDetailView from '../../super_admin/sections/PolicyDetailView';

interface Policy {
  id: string;
  type: string;
  customer: string;
  premium: string;
  status: 'ACTIVE' | 'RENEWAL DUE' | 'EXPIRED';
  expiryDate: string;
}

const PolicyManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  const stats = [
    { label: 'ACTIVE POLICIES', value: '4', icon: Shield, color: 'indigo' },
    { label: 'RENEWALS PENDING', value: '2', icon: Clock, color: 'amber' },
    { label: 'EXPIRED POLICIES', value: '0', icon: AlertCircle, color: 'rose' },
    { label: 'RETENTION RATE', value: '98.2%', icon: Activity, color: 'blue' },
  ];

  const policies: Policy[] = [
    {
      id: 'IA-HLTH-992',
      type: 'HEALTH INSURANCE',
      customer: 'Vijay Mehta',
      premium: '₹80,000',
      status: 'ACTIVE',
      expiryDate: '2027-05-02'
    },
    {
      id: 'IA-MOTR-441',
      type: 'MOTOR INSURANCE',
      customer: 'Deepak Singh',
      premium: '₹12,500',
      status: 'RENEWAL DUE',
      expiryDate: '2026-05-30'
    },
    {
      id: 'IA-LIFE-110',
      type: 'LIFE INSURANCE',
      customer: 'Sneh Lata',
      premium: '₹45,000',
      status: 'ACTIVE',
      expiryDate: '2027-05-06'
    },
    {
      id: 'IA-HLTH-885',
      type: 'HEALTH INSURANCE',
      customer: 'Rahul Verma',
      premium: '₹65,000',
      status: 'ACTIVE',
      expiryDate: '2027-06-12'
    }
  ];

  if (selectedPolicyId) {
    return <PolicyDetailView policyId={selectedPolicyId} onBack={() => setSelectedPolicyId(null)} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Policy Management</h1>
          </div>
          <p className="text-slate-500 font-bold max-w-2xl leading-relaxed uppercase text-[11px] tracking-widest">
            Manage insurance policies, track renewals, and view detailed customer insurance profiles.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_8px_20px_-6px_rgba(79,70,229,0.4)] group uppercase text-xs tracking-widest">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Policy</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 group">
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-transform group-hover:scale-110 ${
              stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
              stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
              stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
            }`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">Insurance Portfolio</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comprehensive list of all insurance plans currently managed.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="SEARCH RECORDS..." 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Policy Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Premium</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Expiry Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {policies.map((policy) => (
                <tr key={policy.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{policy.id}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{policy.type}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-800">{policy.customer}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900">{policy.premium}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border ${
                      policy.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      policy.status === 'RENEWAL DUE' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        policy.status === 'ACTIVE' ? 'bg-emerald-500' :
                        policy.status === 'RENEWAL DUE' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></div>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-black uppercase">{policy.expiryDate}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-3 transition-all duration-300">
                      <button 
                        onClick={() => setSelectedPolicyId(policy.id)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                        title="View Policy Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all border border-transparent hover:border-amber-100">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
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

export default PolicyManagement;
