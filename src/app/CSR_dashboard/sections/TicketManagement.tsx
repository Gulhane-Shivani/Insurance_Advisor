/* src/app/csr_dashboard/sections/TicketManagement.tsx */
import React, { useState } from 'react';
import { 
  Ticket, Search, MessageSquare, 
  AlertCircle, CheckCircle2, ChevronRight, User, Plus
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const TicketManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Open');

  const tickets = [
    { id: 'TKT-10492', customer: 'Arjun Singh', type: 'Endorsement', priority: 'High', status: 'Open', created: '2 hrs ago', description: 'Address change request for Motor Policy.' },
    { id: 'TKT-10493', customer: 'Priya Sharma', type: 'Complaint', priority: 'Urgent', status: 'In Progress', created: '5 hrs ago', description: 'Network hospital denied cashless claim.' },
    { id: 'TKT-10494', customer: 'Vikas Patel', type: 'Query', priority: 'Medium', status: 'Open', created: '1 day ago', description: 'Clarification on NCB bonus calculation.' },
    { id: 'TKT-10495', customer: 'Meera Reddy', type: 'Endorsement', priority: 'Low', status: 'Resolved', created: '3 days ago', description: 'Updated nominee details.' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-8 lg:w-2/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Ticket size={20} className="text-violet-600" /> Support Desk
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<Search size={14} />}>Search</Button>
                <Button variant="primary" size="sm" icon={<Plus size={14} />} className="bg-violet-600 hover:bg-violet-700">New Ticket</Button>
              </div>
            </div>

            <div className="flex gap-2 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
              {['All', 'Open', 'In Progress', 'Resolved'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {tickets.filter(t => activeTab === 'All' || t.status === activeTab).map((ticket) => (
                <div key={ticket.id} className="p-5 border border-slate-100 rounded-2xl flex flex-col md:flex-row justify-between gap-4 hover:border-violet-200 transition-all bg-white group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      ticket.type === 'Complaint' ? 'bg-red-50 text-red-600' :
                      ticket.type === 'Endorsement' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {ticket.type === 'Complaint' ? <AlertCircle size={18} /> : ticket.type === 'Endorsement' ? <Ticket size={18} /> : <MessageSquare size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{ticket.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                          ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                          ticket.priority === 'Urgent' ? 'border-red-200 text-red-600' : 
                          ticket.priority === 'High' ? 'border-amber-200 text-amber-600' : 'border-slate-200 text-slate-500'
                        }`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 mb-1">{ticket.description}</p>
                      <p className="text-[10px] font-bold text-slate-400">{ticket.id} • {ticket.type} • Created {ticket.created}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-violet-500 transition-colors hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Selected Ticket Action Column */}
        <div className="lg:col-span-4 lg:w-1/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Active Ticket</h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-xl font-black">TKT-10493</h2>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-black uppercase rounded">Urgent</span>
                </div>
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1 mb-3"><User size={12}/> Priya Sharma</p>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">"Network hospital denied cashless claim despite having active Health Elite policy. Need immediate resolution, currently at admission desk."</p>
              </div>

              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quick Actions</h5>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <MessageSquare size={14} className="text-violet-400" /> Reply to Customer
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <AlertCircle size={14} className="text-violet-400" /> Escalate to TPA Desk
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
                  <CheckCircle2 size={14} /> Mark as Resolved
                </button>
              </div>

              <div className="pt-6 border-t border-white/10">
                 <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Internal Notes</h5>
                 <textarea 
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white outline-none focus:border-violet-500 resize-none h-24"
                    placeholder="Add an internal note..."
                 ></textarea>
                 <Button variant="primary" size="sm" className="w-full mt-2 bg-violet-600 hover:bg-violet-700">Add Note</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
