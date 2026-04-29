/* src/app/agent_dashboard/sections/LeadsManagement.tsx */
import React, { useState } from 'react';
import { 
  Plus, Search, UserPlus, Edit2, Trash2, Phone, Mail, 
  Calendar, Search as SearchIcon, Filter, MoreVertical, 
  Clock, AlertCircle, TrendingUp
} from 'lucide-react';
import { Card, Button, Modal } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const initialLeads = [
  { id: '1', name: 'Arjun Mehta', type: 'Life Insurance', status: 'Hot', phone: '+91 98765 43210', email: 'arjun.mehta@email.com', lastContact: '2 hours ago', nextFollowUp: '2026-04-30', score: 85 },
  { id: '2', name: 'Priya Sharma', type: 'Car Insurance', status: 'Warm', phone: '+91 98765 43211', email: 'priya.s@email.com', lastContact: '1 day ago', nextFollowUp: '2026-05-02', score: 62 },
  { id: '3', name: 'Vikram Singh', type: 'Health Insurance', status: 'Cold', phone: '+91 98765 43212', email: 'v.singh@email.com', lastContact: '3 days ago', nextFollowUp: '2026-05-05', score: 24 },
  { id: '4', name: 'Ananya Iyer', type: 'Business Insurance', status: 'Hot', phone: '+91 98765 43213', email: 'ananya.i@email.com', lastContact: '1 hour ago', nextFollowUp: '2026-04-29', score: 92 },
  { id: '5', name: 'Rahul Verma', type: 'Life Insurance', status: 'Warm', phone: '+91 98765 43214', email: 'rahul.v@email.com', lastContact: '5 hours ago', nextFollowUp: '2026-05-01', score: 55 },
];

const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
    toast.success('Lead removed from pipeline');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingLead ? 'Lead details updated' : 'New lead captured successfully');
    setIsModalOpen(false);
    setEditingLead(null);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-red-50 border-red-100 flex items-center justify-between">
           <div>
             <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Hot Leads</p>
             <h4 className="text-2xl font-black text-red-900">12</h4>
           </div>
           <TrendingUp className="text-red-500 opacity-20" size={40} />
        </Card>
        <Card className="p-6 bg-amber-50 border-amber-100 flex items-center justify-between">
           <div>
             <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Follow-ups Today</p>
             <h4 className="text-2xl font-black text-amber-900">08</h4>
           </div>
           <Clock className="text-amber-500 opacity-20" size={40} />
        </Card>
        <Card className="p-6 bg-blue-50 border-blue-100 flex items-center justify-between">
           <div>
             <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Pipeline</p>
             <h4 className="text-2xl font-black text-blue-900">45</h4>
           </div>
           <Filter className="text-blue-500 opacity-20" size={40} />
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-wrap gap-2 flex-1 w-full max-w-2xl">
          <div className="relative flex-1 min-w-[240px]">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" placeholder="Search by name, insurance type or email..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-sm font-medium transition-all"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 uppercase tracking-widest outline-none focus:border-indigo-500" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Hot">🔥 Hot</option>
            <option value="Warm">⚡ Warm</option>
            <option value="Cold">❄️ Cold</option>
          </select>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<UserPlus size={18} />} className="w-full lg:w-auto shadow-xl shadow-indigo-600/20">Add New Lead</Button>
      </div>

      {/* Leads Table */}
      <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Interest</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lead Score</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm border border-indigo-100 group-hover:scale-110 transition-transform">{lead.name[0]}</div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{lead.name}</p>
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-0.5"><Phone size={12} /> {lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl">
                       <AlertCircle size={14} className="text-slate-400" />
                       <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{lead.type}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center justify-center gap-3">
                        <div className="w-full max-w-[60px] h-2 bg-slate-100 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full ${lead.score > 80 ? 'bg-indigo-500' : lead.score > 50 ? 'bg-amber-500' : 'bg-slate-300'}`} 
                             style={{ width: `${lead.score}%` }}
                           ></div>
                        </div>
                        <span className="text-xs font-black text-slate-700">{lead.score}%</span>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                      lead.status === 'Hot' ? 'bg-red-50 text-red-600 border-red-100' : 
                      lead.status === 'Warm' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {lead.status === 'Hot' ? '🔥 ' : lead.status === 'Warm' ? '⚡ ' : '❄️ '}
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all"><Phone size={16} /></button>
                      <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-amber-600 hover:border-amber-100 hover:shadow-lg transition-all"><Mail size={16} /></button>
                      <button onClick={() => { setEditingLead(lead); setIsModalOpen(true); }} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(lead.id)} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-600 hover:border-red-100 hover:shadow-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingLead(null); }} title={editingLead ? 'Modify Lead Details' : 'Capture New Lead'}>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1.5">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
               <input required className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all" defaultValue={editingLead?.name} placeholder="e.g. Rahul Gupta" />
             </div>
             <div className="space-y-1.5">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Interest</label>
               <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all">
                  <option>Life Insurance</option>
                  <option>Health Insurance</option>
                  <option>Car Insurance</option>
                  <option>Business Insurance</option>
               </select>
             </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Information</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all" defaultValue={editingLead?.phone} placeholder="Phone Number" />
               <input className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all" defaultValue={editingLead?.email} placeholder="Email Address" />
            </div>
          </div>
          <Button type="submit" className="w-full py-4 text-sm shadow-xl shadow-indigo-600/20">Save Lead to Pipeline</Button>
        </form>
      </Modal>
    </div>
  );
};

export default LeadsManagement;
