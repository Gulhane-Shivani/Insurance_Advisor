import React, { useState } from 'react';
import { Search, User, Phone, Mail, ShieldCheck, History, FileText, Download } from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const CSRCustomer360: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const customerData = {
    name: 'Rajesh Kumar', status: 'Active Premium',
    phone: '+91 98765 43210', email: 'rajesh.k@example.com', address: 'Andheri West, Mumbai',
    policies: [
      { id: 'POL-10293', type: 'Health Elite', status: 'Active', renewal: '15 May 2026', premium: '₹14,500' },
      { id: 'POL-10294', type: 'Term Life', status: 'Active', renewal: '22 Aug 2026', premium: '₹22,000' },
    ],
    recentInteractions: [
      { date: '10 Apr 2026', type: 'Call', summary: 'Query regarding hospital network.' },
      { date: '15 Mar 2026', type: 'Email', summary: 'Sent policy document copy.' },
      { date: '01 Feb 2026', type: 'Portal', summary: 'Updated nominee details.' },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    toast.loading('Searching CRM database...', { duration: 800 });
    setTimeout(() => { setHasSearched(true); toast.success('Customer found'); }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-8 border-none shadow-xl shadow-slate-200/40">
        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          <Search size={20} className="text-violet-600" /> Customer Lookup
        </h3>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search by Name, Phone, Email, or Policy Number..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm" />
          </div>
          <Button type="submit" variant="primary" className="py-4 px-8 bg-violet-600 hover:bg-violet-700">Search</Button>
        </form>
      </Card>

      {!hasSearched ? (
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
          <User size={48} className="mb-4 opacity-20" />
          <p className="text-sm font-black uppercase tracking-widest">Search for a customer to view their 360° profile</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
              <div className="px-6 pb-6 relative">
                <div className="w-20 h-20 bg-white rounded-2xl p-1.5 shadow-lg absolute -top-10">
                  <div className="w-full h-full bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 font-black text-xl">
                    {customerData.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="pt-12">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">{customerData.name}</h2>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{customerData.status}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-600"><Phone size={16} className="text-slate-400" /> {customerData.phone}</div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-600"><Mail size={16} className="text-slate-400" /> {customerData.email}</div>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button onClick={() => toast.success('Opening update form...')} className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-violet-50 hover:text-violet-700 rounded-xl text-xs font-bold transition-colors">Update Contact Info</button>
                <button onClick={() => toast.success(`Payment link sent to ${customerData.email}`)} className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-violet-50 hover:text-violet-700 rounded-xl text-xs font-bold transition-colors">Send Payment Link</button>
                <button onClick={() => toast.success('Opening ticket creation form...')} className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-violet-50 hover:text-violet-700 rounded-xl text-xs font-bold transition-colors">Log New Ticket</button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck size={18} className="text-violet-600" /> Active Policies
              </h3>
              <div className="space-y-4">
                {customerData.policies.map(policy => (
                  <div key={policy.id} className="p-5 border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-violet-200 transition-colors bg-slate-50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{policy.type}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded">{policy.status}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">ID: {policy.id} • Premium: {policy.premium}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Renews On</p>
                      <p className="text-sm font-bold text-slate-700">{policy.renewal}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => toast.success(`Opening details for ${policy.id}`)} variant="outline" size="sm" icon={<FileText size={14} />}>Details</Button>
                      <Button onClick={() => toast.success('Downloading document...')} variant="outline" size="sm" icon={<Download size={14} />}>Doc</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <History size={18} className="text-violet-600" /> Interaction History
              </h3>
              <div className="space-y-6">
                {customerData.recentInteractions.map((interaction, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-violet-400 ring-4 ring-violet-50 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-slate-700">{interaction.type}</span>
                        <span className="text-[10px] font-bold text-slate-400">{interaction.date}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-600">{interaction.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSRCustomer360;
