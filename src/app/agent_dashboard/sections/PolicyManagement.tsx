import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Eye, 
  Bell, 
  Calendar, 
  IndianRupee,
  ChevronRight,
  Zap,
  Clock,
  AlertCircle
} from 'lucide-react';
import PolicyIssuanceForm from '../../super_admin/sections/PolicyIssuanceForm';
import PolicyDetailView from '../../super_admin/sections/PolicyDetailView';

interface Policy {
  id: string;
  type: string;
  customer: string;
  premium: string;
  status: 'Active' | 'Renewal Due' | 'Expired' | 'Pending';
  expiryDate: string;
}

const PolicyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [viewPolicyId, setViewPolicyId] = useState<string | null>(null);

  const [policies, setPolicies] = useState<Policy[]>([
    { id: 'POL-8829', customer: 'Amit Singh', type: 'Life Insurance', premium: '₹12,400', expiryDate: '2026-05-30', status: 'Renewal Due' },
    { id: 'POL-8828', customer: 'Neha Kapoor', type: 'Health Insurance', premium: '₹8,200', expiryDate: '2026-06-15', status: 'Renewal Due' },
    { id: 'POL-8827', customer: 'Vikram Sahay', type: 'Car Insurance', premium: '₹15,000', expiryDate: '2026-05-20', status: 'Active' },
    { id: 'POL-8826', customer: 'Suresh Raina', type: 'Life Insurance', premium: '₹22,000', expiryDate: '2026-05-01', status: 'Renewal Due' },
    { id: 'POL-8825', customer: 'Priya Verma', type: 'Health Insurance', premium: '₹9,500', expiryDate: '2026-05-24', status: 'Renewal Due' },
  ]);

  // Removed localStorage sync to keep data consistent with requested "previous" mock state

  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.customer.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSavePolicy = (newPolicy: any) => {
    setPolicies([newPolicy, ...policies]);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <PolicyIssuanceForm 
        onBack={() => setShowForm(false)} 
        onSave={handleSavePolicy} 
      />
    );
  }

  if (viewPolicyId) {
    return (
      <PolicyDetailView 
        policyId={viewPolicyId} 
        onBack={() => setViewPolicyId(null)} 
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Policy Management</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Issue and manage insurance policies</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <Plus size={16} /> Create New Policy
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active', value: policies.filter(p => p.status === 'Active').length, icon: Zap, color: 'emerald' },
          { label: 'Renewal Due', value: policies.filter(p => p.status === 'Renewal Due').length, icon: Clock, color: 'amber' },
          { label: 'Pending', value: policies.filter(p => p.status === 'Pending').length, icon: AlertCircle, color: 'blue' },
          { label: 'Expired', value: policies.filter(p => p.status === 'Expired').length, icon: ShieldCheck, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tools Row */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full lg:w-auto pb-1 lg:pb-0">
          {['All', 'Active', 'Renewal Due', 'Expired', 'Pending'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeFilter === f ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by ID or customer..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Policies Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Number</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Renewal Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPolicies.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-slate-900">{p.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px]">
                        {p.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-sm font-black text-slate-800">{p.customer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-500">{p.type}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 text-slate-900 font-black">
                      <IndianRupee size={12} className="text-slate-400" />
                      <span className="text-sm">{p.premium}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-bold">{p.expiryDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      p.status === 'Renewal Due' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      p.status === 'Expired' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setViewPolicyId(p.id)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Send Renewal Reminder">
                        <Bell size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <div className="flex gap-4">
           </div>
           <div className="flex items-center gap-2">
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 transition-all">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <span className="text-[10px] font-black text-slate-800">1</span>
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 transition-all">
                <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyManagement;
