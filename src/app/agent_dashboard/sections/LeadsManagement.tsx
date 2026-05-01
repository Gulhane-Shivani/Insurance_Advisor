/* src/app/agent_dashboard/sections/LeadsManagement.tsx */
import React, { useState } from 'react';
import { 
  UserPlus, Edit2, Trash2, Phone, Mail, 
  Search as SearchIcon, X
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const initialLeads = [
  { id: '1', name: 'Rajesh Kumar', type: 'Life Insurance', status: 'Hot', phone: '+91 98765 43210', email: 'rajesh.k@email.com', lastContact: '2 hours ago', nextFollowUp: '2026-04-30', score: 85 },
  { id: '2', name: 'Anjali Sharma', type: 'Car Insurance', status: 'Warm', phone: '+91 98765 43211', email: 'anjali.s@email.com', lastContact: '1 day ago', nextFollowUp: '2026-05-02', score: 62 },
  { id: '3', name: 'Sunil Gupta', type: 'Health Insurance', status: 'Cold', phone: '+91 98765 43212', email: 'sunil.g@email.com', lastContact: '3 days ago', nextFollowUp: '2026-05-05', score: 24 },
  { id: '4', name: 'Suresh Gupta', type: 'Business Insurance', status: 'Hot', phone: '+91 98765 43213', email: 'suresh.g@email.com', lastContact: '1 hour ago', nextFollowUp: '2026-04-29', score: 92 },
  { id: '5', name: 'Rahul Verma', type: 'Life Insurance', status: 'Warm', phone: '+91 98765 43214', email: 'rahul.v@email.com', lastContact: '5 hours ago', nextFollowUp: '2026-05-01', score: 55 },
];

const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', type: 'Life Insurance', phone: '', email: '', status: 'Hot' as 'Hot' | 'Warm' | 'Cold', score: 50
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
    toast.success('Lead removed from pipeline');
  };

  const handleOpenModal = (lead?: any) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({
        name: lead.name,
        type: lead.type,
        phone: lead.phone,
        email: lead.email,
        status: lead.status,
        score: lead.score
      });
    } else {
      setEditingLead(null);
      setFormData({ name: '', type: 'Life Insurance', phone: '', email: '', status: 'Hot', score: 50 });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? { ...l, ...formData } : l));
      toast.success('Lead updated successfully');
    } else {
      const lead = {
        ...formData,
        id: Date.now().toString(),
        lastContact: 'Just now',
        nextFollowUp: 'Tomorrow'
      };
      setLeads([lead, ...leads]);
      toast.success('New lead added to pipeline');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <div className="relative flex-1 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name or type..." 
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {['All', 'Hot', 'Warm', 'Cold'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-white text-indigo-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {status}
              </button>
            ))}
          </div>
          <Button variant="primary" icon={<UserPlus size={18} />} onClick={() => handleOpenModal()}>Add New Lead</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map(lead => (
          <Card key={lead.id} className="p-6 border-none shadow-xl shadow-slate-200/40 hover:shadow-indigo-500/10 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button 
                  onClick={() => handleOpenModal(lead)}
                  className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                   <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(lead.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
             </div>

             <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl shadow-inner">
                   {lead.name.substring(0, 2)}
                </div>
                <div>
                   <h3 className="text-lg font-black text-slate-800 tracking-tight mb-1">{lead.name}</h3>
                   <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                        lead.status === 'Hot' ? 'bg-red-50 text-red-600 border border-red-100' :
                        lead.status === 'Warm' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}>
                        {lead.status} Lead
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{lead.type}</span>
                   </div>
                </div>
             </div>

             <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                   <Phone size={14} className="text-slate-300" /> {lead.phone}
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                   <Mail size={14} className="text-slate-300" /> {lead.email}
                </div>
             </div>

             <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Lead Score</p>
                   <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${lead.score > 80 ? 'bg-emerald-500' : lead.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${lead.score}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-slate-800">{lead.score}%</span>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Last Contact</p>
                   <p className="text-[10px] font-black text-slate-800">{lead.lastContact}</p>
                </div>
             </div>
          </Card>
        ))}
      </div>

      {/* Lead Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{editingLead ? 'Update Lead Details' : 'Add New Lead'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm"><X size={20} /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                   <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone</label>
                      <input required type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91..." />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email</label>
                      <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@email.com" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Insurance Type</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                         <option>Life Insurance</option>
                         <option>Health Insurance</option>
                         <option>Car Insurance</option>
                         <option>Business Insurance</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                         <option value="Hot">Hot Lead</option>
                         <option value="Warm">Warm Lead</option>
                         <option value="Cold">Cold Lead</option>
                      </select>
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lead Score ({formData.score}%)</label>
                   <input type="range" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" value={formData.score} onChange={e => setFormData({...formData, score: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all">Discard</button>
                 <button type="submit" className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200">
                    {editingLead ? 'Update Lead' : 'Create Lead'}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManagement;
