import React, { useState, useEffect } from 'react';
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
  Ban,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import PolicyIssuanceForm from './PolicyIssuanceForm';

interface Policy {
  id: string;
  type: string;
  customer: string;
  premium: string;
  status: 'Active' | 'Renewal Due' | 'Expired' | 'Inactive';
  expiryDate: string;
  isInactive?: boolean;
}

interface PolicyLifecycleManagementProps {
  onViewPolicy: (policyId: string) => void;
}

const INITIAL_MOCK_POLICIES: Policy[] = [];

const PolicyLifecycleManagement: React.FC<PolicyLifecycleManagementProps> = ({ onViewPolicy }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Policies');
  const [showForm, setShowForm] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  
  const [policies, setPolicies] = useState<Policy[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safeguard_policies_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse policies from localStorage');
        }
      }
    }
    return INITIAL_MOCK_POLICIES;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('safeguard_policies_v2', JSON.stringify(policies));
    }
  }, [policies]);

  const getPolicyStatus = (expiryDateStr: string, isInactive?: boolean): Policy['status'] => {
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

  const stats = [
    { label: 'Active Policies', value: processedPolicies.filter(p => p.status === 'Active').length.toString(), icon: Zap, color: 'violet' },
    { label: 'Renewals Due', value: processedPolicies.filter(p => p.status === 'Renewal Due').length.toString(), icon: Clock, color: 'blue' },
    { label: 'Expired Records', value: processedPolicies.filter(p => p.status === 'Expired').length.toString(), icon: AlertCircle, color: 'rose' },
    { label: 'Retention KPI', value: '98.2%', icon: TrendingUp, color: 'indigo' },
  ];

  const handleSavePolicy = (newPolicy: Policy) => {
    if (editingPolicyId) {
      setPolicies(policies.map(p => p.id === newPolicy.id ? newPolicy : p));
      setEditingPolicyId(null);
    } else {
      setPolicies([newPolicy, ...policies]);
      setShowForm(false);
    }
  };

  const handleToggleInactive = (policyId: string) => {
    if (confirm('Are you sure you want to change the active status of this policy?')) {
      setPolicies(policies.map(p => {
        if (p.id === policyId) {
           return { ...p, isInactive: !p.isInactive };
        }
        return p;
      }));
    }
  };



  const filteredPolicies = processedPolicies.filter(policy => {
    const matchesSearch = policy.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'Active') return policy.status === 'Active';
    if (activeTab === 'Renewal Due') return policy.status === 'Renewal Due';
    if (activeTab === 'Expired') return policy.status === 'Expired';
    if (activeTab === 'Inactive') return policy.status === 'Inactive';

    return true;
  });

  if (showForm || editingPolicyId) {
    return <PolicyIssuanceForm 
             onBack={() => { setShowForm(false); setEditingPolicyId(null); }} 
             onSave={handleSavePolicy} 
             editingPolicyId={editingPolicyId}
           />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Header */}
      <div className="bg-white/40 backdrop-blur-xl p-7 rounded-[32px] border border-white/60 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-1.5 h-7 bg-gradient-to-b from-violet-600 to-indigo-600 rounded-full"></div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Lifecycle Console</h1>
          </div>
          <p className="text-slate-500 font-bold max-w-2xl leading-relaxed text-[11px] tracking-normal">
            Institutional asset management and policy distribution authority
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="group relative flex items-center gap-2.5 bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-black transition-all hover:shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Plus className="relative z-10 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span className="relative z-10 text-[12px] tracking-tight">Deploy New Policy</span>
        </button>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
            <div className="flex flex-col gap-4 relative z-10">
               <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 shadow-inner ${
                 stat.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                 stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                 stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
               }`}>
                 <stat.icon className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-[11px] font-bold text-slate-400 mb-0.5">{stat.label}</p>
                 <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Interface */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-7 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="flex bg-slate-100/50 p-1.5 rounded-xl overflow-x-auto shadow-inner w-full lg:w-auto border border-slate-200/50">
             {['All Policies', 'Active', 'Renewal Due', 'Expired', 'Inactive'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-2 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                   activeTab === tab ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                 }`}
               >
                  {tab}
               </button>
             ))}
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search global archive..." 
                className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-[12px] font-bold focus:outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-600 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-violet-600 transition-all shadow-sm">
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Institutional Asset</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Policy Holder</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Premium Quote</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Lifecycle Status</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400">Maturity Date</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400 text-right">Master Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPolicies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-[12px] font-bold text-slate-400">No records deciphered</p>
                  </td>
                </tr>
              ) : filteredPolicies.map((policy) => (
                <tr key={policy.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-1 h-8 bg-slate-100 rounded-full group-hover:bg-violet-600 transition-colors"></div>
                       <div>
                         <p className="text-[13px] font-black text-slate-900">{policy.id}</p>
                         <p className="text-[10px] font-bold text-slate-400">{policy.type}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[13px] font-bold text-slate-800">{policy.customer}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[12px] font-black text-slate-900 bg-slate-50 inline-block px-2.5 py-1 rounded-lg border border-slate-100">{policy.premium}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border ${
                      policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      policy.status === 'Renewal Due' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      policy.status === 'Inactive' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        policy.status === 'Active' ? 'bg-emerald-500' :
                        policy.status === 'Renewal Due' ? 'bg-amber-500' : 
                        policy.status === 'Inactive' ? 'bg-slate-400' : 'bg-rose-500'
                      }`}></div>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-[11px] font-bold">{policy.expiryDate}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2.5 transition-all duration-300">
                      <button 
                        onClick={() => onViewPolicy(policy.id)}
                        className="p-2.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all border border-transparent hover:border-violet-100"
                        title="View asset profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingPolicyId(policy.id)}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                        title="Edit Expiry, Nominee & Benefits"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleInactive(policy.id)}
                        className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200"
                        title={policy.status === 'Inactive' ? "Reactivate Policy" : "Mark as Inactive"}
                      >
                        <Ban className="w-4 h-4" />
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

export default PolicyLifecycleManagement;
