import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Download,
  X
} from 'lucide-react';

const PolicyManagement: React.FC = () => {
  const [policies, setPolicies] = useState([
    { id: 'POL-8829', holder: 'Amit Sharma', type: 'Life Insurance', status: 'Active', amount: '₹12.5L', date: '24 Apr 2024' },
    { id: 'POL-7731', holder: 'Priya Verma', type: 'Health Care', status: 'Pending', amount: '₹4.2L', date: '25 Apr 2024' },
    { id: 'POL-6642', holder: 'Rajesh Kumar', type: 'Motor Policy', status: 'Expiring', amount: '₹8.8L', date: '22 Apr 2024' },
    { id: 'POL-5510', holder: 'Sneha Reddy', type: 'Life Insurance', status: 'Active', amount: '₹25.0L', date: '20 Apr 2024' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    holder: '',
    type: 'Life Insurance',
    status: 'Active',
    amount: ''
  });

  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => 
      policy.holder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [policies, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (policy?: any) => {
    if (policy) {
      setEditingPolicyId(policy.id);
      setFormData({
        holder: policy.holder,
        type: policy.type,
        status: policy.status,
        amount: policy.amount.replace('₹', '').replace('L', '')
      });
    } else {
      setEditingPolicyId(null);
      setFormData({ holder: '', type: 'Life Insurance', status: 'Active', amount: '' });
    }
    setIsModalOpen(true);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPolicyId) {
      setPolicies(policies.map(p => p.id === editingPolicyId ? {
        ...p,
        ...formData,
        amount: `₹${formData.amount}L`
      } : p));
    } else {
      const newPolicy = {
        id: `POL-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        amount: `₹${formData.amount}L`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setPolicies([newPolicy, ...policies]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Policies', val: '1,284', icon: Shield, color: 'indigo' },
          { label: 'Active Plans', val: '1,150', icon: CheckCircle2, color: 'emerald' },
          { label: 'Pending Apps', val: '42', icon: Clock, color: 'amber' },
          { label: 'Expiring Soon', val: '18', icon: AlertCircle, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3">
                <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                   <stat.icon className="w-4 h-4" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-xl font-black text-slate-800 leading-tight">{stat.val}</h3>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Policy Repository */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-white">
           <div>
              <h3 className="text-lg font-black text-slate-800">Policy Repository</h3>
              <p className="text-xs text-slate-500 font-medium">Manage and audit all customer insurance plans</p>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search policies..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium w-64 outline-none focus:border-indigo-500 transition-all"
                 />
              </div>
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                <Filter className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
              >
                <Plus className="w-3.5 h-3.5" /> New Policy
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy ID</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy Holder</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Coverage</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-3">
                    <span className="text-xs font-black text-slate-800">{policy.id}</span>
                    <p className="text-[10px] text-slate-400 font-medium">{policy.date}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-bold text-slate-800">{policy.holder}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold">
                      {policy.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        policy.status === 'Active' ? 'bg-emerald-500' :
                        policy.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        policy.status === 'Active' ? 'text-emerald-600' :
                        policy.status === 'Pending' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {policy.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-black text-slate-700">
                    {policy.amount}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button 
                      onClick={() => handleOpenModal(policy)}
                      className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors"
                      title="Edit Policy"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPolicies.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-[11px] font-bold">No policies found matching "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
           <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest">
             <Download className="w-3.5 h-3.5" /> Export Data
           </button>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Page 1 of 32</span>
              <div className="flex gap-1.5">
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
                    <ArrowUpRight className="w-3.5 h-3.5 rotate-[225deg]" />
                 </button>
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Add/Edit Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">{editingPolicyId ? 'Edit Policy' : 'Add New Policy'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSavePolicy} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Policy Holder Name</label>
                <input 
                  type="text" 
                  name="holder" 
                  required 
                  value={formData.holder} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" 
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Policy Type</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Life Insurance</option>
                    <option>Health Care</option>
                    <option>Motor Policy</option>
                    <option>Home Insurance</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Expiring</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Coverage Amount (in Lakhs)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">₹</span>
                  <input 
                    type="number" 
                    name="amount" 
                    required 
                    value={formData.amount} 
                    onChange={handleInputChange} 
                    className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" 
                    placeholder="10.5"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">L</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors"
                >
                  {editingPolicyId ? 'Update Policy' : 'Create Policy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyManagement;
