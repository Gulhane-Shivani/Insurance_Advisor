import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Eye, 
  Edit3, 
  Upload, 
  Phone, 
  Mail, 
  Shield, 
  Calendar,
  ChevronRight,
  X,
  MapPin,
  ArrowLeft,
  FileText,
  Zap,
  CreditCard,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';

const CustomerManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [customers, setCustomers] = useState([
    { id: 'CU-501', name: 'Rajesh Kumar', mobile: '+91 98765 43210', email: 'rajesh.k@example.com', policyCount: 4, lastRenewal: '2026-04-12', status: 'Active', address: 'Mumbai, Maharashtra', joinedDate: '2024-01-15' },
    { id: 'CU-502', name: 'Anjali Sharma', mobile: '+91 91234 56789', email: 'anjali.s@example.com', policyCount: 2, lastRenewal: '2026-03-28', status: 'Active', address: 'Pune, Maharashtra', joinedDate: '2024-02-10' },
    { id: 'CU-503', name: 'Amit Singh', mobile: '+91 99887 76655', email: 'amit.singh@example.com', policyCount: 1, lastRenewal: '2025-12-05', status: 'Inactive', address: 'Delhi, NCR', joinedDate: '2023-11-20' },
    { id: 'CU-504', name: 'Suresh Raina', mobile: '+91 97766 55443', email: 'suresh.r@example.com', policyCount: 3, lastRenewal: '2026-05-01', status: 'Active', address: 'Chennai, Tamil Nadu', joinedDate: '2024-03-05' },
    { id: 'CU-505', name: 'Neha Kapoor', mobile: '+91 96655 44332', email: 'neha.k@example.com', policyCount: 1, lastRenewal: '2026-02-14', status: 'Pending', address: 'Bangalore, Karnataka', joinedDate: '2024-04-12' },
  ]);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newCustomer = {
      id: `CU-${Math.floor(Math.random() * 900) + 100}`,
      name: formData.get('name') as string,
      mobile: formData.get('mobile') as string,
      email: formData.get('email') as string,
      policyCount: 0,
      lastRenewal: 'N/A',
      status: 'Active',
      address: formData.get('address') as string,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
    toast.success('New customer added successfully');
  };

  const handleEditCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedCustomers = customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          name: formData.get('name') as string,
          mobile: formData.get('mobile') as string,
          email: formData.get('email') as string,
          address: formData.get('address') as string,
        };
      }
      return c;
    });
    setCustomers(updatedCustomers);
    setIsEditModalOpen(false);
    toast.success('Customer details updated');
  };

  const openDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setViewMode('details');
  };


  if (viewMode === 'details' && selectedCustomer) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-12">
        {/* Detail Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
              <ArrowLeft size={16} />
            </div>
            Back to Customer List
          </button>
          <div className="flex gap-3">
          </div>
        </div>

        {/* Profile Banner */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
           <div className="h-32 bg-gradient-to-r from-slate-900 to-indigo-900 p-6 flex items-end relative">
              <div className="absolute right-0 top-0 p-8 opacity-5">
                 <Shield size={80} />
              </div>
              <div className="flex items-center gap-4 relative z-10 translate-y-8 ml-4">
                 <div className="w-24 h-24 rounded-[28px] bg-white p-1.5 shadow-2xl border border-slate-100">
                    <div className="w-full h-full rounded-[22px] bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-2xl">
                       {selectedCustomer.name.split(' ').map((n: any) => n[0]).join('')}
                    </div>
                 </div>
                 <div className="pb-2">
                    <h2 className="text-2xl font-black text-white tracking-tight mb-1">{selectedCustomer.name}</h2>
                    <div className="flex items-center gap-2.5">
                       <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">{selectedCustomer.status}</span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client ID: {selectedCustomer.id}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="pt-16 px-10 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Contact & Info */}
              <div className="space-y-8">
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Contact Information</h4>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                             <Phone size={18} />
                          </div>
                          <div>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mobile Number</p>
                             <p className="text-sm font-black text-slate-800">{selectedCustomer.mobile}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                             <Mail size={18} />
                          </div>
                          <div>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                             <p className="text-sm font-black text-slate-800">{selectedCustomer.email}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                             <MapPin size={18} />
                          </div>
                          <div>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Address</p>
                             <p className="text-sm font-black text-slate-800">{selectedCustomer.address}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {selectedCustomer.policyCount > 0 && (
                   <div className="p-5 bg-slate-900 rounded-[24px] text-white shadow-xl relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 p-4 opacity-10">
                         <Zap size={60} />
                      </div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Relationship Status</p>
                      <h5 className="text-lg font-black mb-3">Prime Client</h5>
                      <div className="space-y-3 mb-6">
                         <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                            <span>Client Since</span>
                            <span className="text-white">{selectedCustomer.joinedDate}</span>
                         </div>
                         <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                            <span>Lifetime Value</span>
                            <span className="text-white">₹2,45,000</span>
                         </div>
                      </div>
                      <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">View Analytics</button>
                   </div>
                 )}
              </div>

              {/* Right Column: Policies & Activity */}
              <div className="lg:col-span-2 space-y-8">
                 <div>
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-lg font-black text-slate-900">Active Insurance Portfolio</h4>
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">{selectedCustomer.policyCount} Total Policies</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { id: 'POL-8829', type: 'Life Insurance', premium: '₹12,400', due: '2026-05-12', status: 'Active', icon: Shield },
                         { id: 'POL-8828', type: 'Health Insurance', premium: '₹8,200', due: '2026-06-15', status: 'Renewal Due', icon: Activity },
                         { id: 'POL-8827', type: 'Car Insurance', premium: '₹15,000', due: '2027-02-10', status: 'Active', icon: Zap },
                       ].slice(0, selectedCustomer.policyCount).map(policy => (
                         <div key={policy.id} className="p-4 bg-white border border-slate-100 rounded-[24px] hover:border-indigo-200 hover:shadow-lg transition-all group cursor-pointer shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                               <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <policy.icon size={24} />
                               </div>
                               <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                 policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                               }`}>{policy.status}</span>
                            </div>
                            <h5 className="text-base font-black text-slate-800 mb-1">{policy.type}</h5>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Policy ID: {policy.id}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                               <div>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase">Annual Premium</p>
                                  <p className="text-sm font-black text-slate-900">{policy.premium}</p>
                               </div>
                               <div className="text-right">
                                  <p className="text-[9px] font-bold text-slate-400 uppercase">Renewal Due</p>
                                  <p className="text-sm font-black text-slate-900">{policy.due}</p>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedCustomer.policyCount > 0 && (
                      <div className="space-y-4">
                         <h4 className="text-lg font-black text-slate-900">Recent Documents</h4>
                         <div className="space-y-3">
                            {['KYC_Document.pdf', 'Policy_Form_8829.pdf', 'Payment_Receipt.pdf'].map((doc, i) => (
                               <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                     <FileText size={18} className="text-slate-400 group-hover:text-indigo-600" />
                                     <span className="text-xs font-bold text-slate-700">{doc}</span>
                                  </div>
                                  <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600" />
                               </div>
                            ))}
                         </div>
                      </div>
                    )}
                    {selectedCustomer.policyCount > 0 && (
                      <div className="space-y-4">
                         <h4 className="text-lg font-black text-slate-900">Payment History</h4>
                         <div className="space-y-3">
                            {[
                              { date: 'May 08, 2026', amount: '₹12,400', status: 'Success' },
                              { date: 'Apr 12, 2026', amount: '₹8,200', status: 'Success' },
                            ].map((pay, i) => (
                               <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                  <div className="flex items-center gap-3">
                                     <CreditCard size={18} className="text-slate-400" />
                                     <div>
                                        <p className="text-xs font-black text-slate-800">{pay.amount}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{pay.date}</p>
                                     </div>
                                  </div>
                                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{pay.status}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 relative">
      {/* Header */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Customer Management</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage your assigned client portfolio</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <UserPlus size={16} /> Add New Customer
        </button>
      </div>

      {/* Tools & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search customers by name or ID..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-1 md:pb-0">
          {['All', 'Active', 'Pending', 'Inactive'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filterStatus === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Policy Count</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Renewal</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">ID: {c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Phone size={12} />
                        <span className="text-[11px] font-bold">{c.mobile}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Mail size={12} />
                        <span className="text-[11px] font-bold">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-800 text-xs font-black">
                      {c.policyCount}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-bold">{c.lastRenewal}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      c.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => openDetails(c)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                        title="View Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="Upload Documents">
                        <Upload size={16} />
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
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Client Records: {filteredCustomers.length}</p>
           <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all disabled:opacity-40" disabled>
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <span className="text-[10px] font-black text-slate-800">1</span>
              <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all disabled:opacity-40" disabled>
                <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Add New Customer</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enroll a new client into the system</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCustomer} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input required name="name" type="text" placeholder="e.g. Rahul Dravid" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                  <input required name="mobile" type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input required name="email" type="email" placeholder="rahul@example.com" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Location / Address</label>
                  <input required name="address" type="text" placeholder="e.g. Mumbai, MH" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Save Customer Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
                  <Edit3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Edit Customer</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modify client information</p>
                </div>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditCustomer} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input required name="name" type="text" defaultValue={selectedCustomer.name} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                  <input required name="mobile" type="tel" defaultValue={selectedCustomer.mobile} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input required name="email" type="email" defaultValue={selectedCustomer.email} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Location / Address</label>
                  <input required name="address" type="text" defaultValue={selectedCustomer.address} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                <button type="submit" className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Update Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
