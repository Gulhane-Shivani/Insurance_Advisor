import React, { useState } from 'react';
import { Ticket, Search, MessageSquare, AlertCircle, CheckCircle2, ChevronRight, User, Plus, X, CheckCheck } from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

interface TicketItem { id: string; customer: string; type: string; priority: string; status: string; created: string; description: string; }
interface TicketForm { customer: string; policyId: string; type: string; priority: string; description: string; }
interface Note { text: string; time: string; }

const TicketManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Open');
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<Record<string, Note[]>>({});
  const [formError, setFormError] = useState('');
  const [noteError, setNoteError] = useState('');
  const [lastCreated, setLastCreated] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState<Record<string, boolean>>({});
  const [escalated, setEscalated] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<TicketForm>({ customer: '', policyId: '', type: 'Query', priority: 'Medium', description: '' });
  const [tickets, setTickets] = useState<TicketItem[]>([
    { id: 'TKT-10492', customer: 'Arjun Singh', type: 'Endorsement', priority: 'High', status: 'Open', created: '2 hrs ago', description: 'Address change request for Motor Policy.' },
    { id: 'TKT-10493', customer: 'Priya Sharma', type: 'Complaint', priority: 'Urgent', status: 'In Progress', created: '5 hrs ago', description: 'Network hospital denied cashless claim.' },
    { id: 'TKT-10494', customer: 'Vikas Patel', type: 'Query', priority: 'Medium', status: 'Open', created: '1 day ago', description: 'Clarification on NCB bonus calculation.' },
    { id: 'TKT-10495', customer: 'Meera Reddy', type: 'Endorsement', priority: 'Low', status: 'Resolved', created: '3 days ago', description: 'Updated nominee details.' },
  ]);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem>(tickets[1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || !form.description) { setFormError('Customer name and description are required.'); return; }
    setFormError('');
    const newId = `TKT-${10496 + tickets.length}`;
    const newTicket: TicketItem = { id: newId, customer: form.customer, type: form.type, priority: form.priority, status: 'Open', created: 'Just now', description: form.description };
    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicket(newTicket);
    setLastCreated(newId);
    setShowModal(false);
    setForm({ customer: '', policyId: '', type: 'Query', priority: 'Medium', description: '' });
  };

  const handleMarkResolved = () => {
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: 'Resolved' } : t));
    setSelectedTicket(prev => ({ ...prev, status: 'Resolved' }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800">Create New Ticket</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Log a customer service request</p>
              </div>
              <button onClick={() => { setShowModal(false); setFormError(''); }} className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Customer Name *</label>
                  <input required placeholder="e.g. Rajesh Kumar" value={form.customer} onChange={e => setForm(f => ({ ...f, customer: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Policy ID</label>
                  <input placeholder="e.g. POL-10293" value={form.policyId} onChange={e => setForm(f => ({ ...f, policyId: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all">
                    <option>Query</option><option>Complaint</option><option>Endorsement</option><option>Claim Follow-Up</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Priority</label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                      <button key={p} type="button" onClick={() => setForm(f => ({ ...f, priority: p }))}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${form.priority === p
                          ? p === 'Urgent' ? 'bg-red-600 text-white border-red-600' : p === 'High' ? 'bg-amber-500 text-white border-amber-500' : p === 'Medium' ? 'bg-violet-600 text-white border-violet-600' : 'bg-slate-600 text-white border-slate-600'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description *</label>
                  <textarea required rows={3} placeholder="Briefly describe the customer's issue..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all resize-none" />
                </div>
              </div>
              {formError && <p className="text-xs text-red-500 font-bold pb-1">{formError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setFormError(''); }} className="flex-1 py-3 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:border-slate-300 transition-all text-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-xl transition-all text-sm shadow-lg shadow-violet-600/20">Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Ticket size={20} className="text-violet-600" /> Support Desk</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<Search size={14} />} onClick={() => setShowSearch(s => !s)}>Search</Button>
                <Button variant="primary" size="sm" icon={<Plus size={14} />} className="bg-violet-600 hover:bg-violet-700" onClick={() => { setShowModal(true); setLastCreated(''); }}>New Ticket</Button>
              </div>
            </div>
            {showSearch && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                <input autoFocus type="text" placeholder="Search tickets..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 transition-all" />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={13} /></button>}
              </div>
            )}
            {lastCreated && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCheck size={14} className="text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">{lastCreated} created successfully!</span>
              </div>
            )}
            <div className="flex gap-2 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
              {['All', 'Open', 'In Progress', 'Resolved'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-800'}`}>{tab}</button>
              ))}
            </div>
            <div className="space-y-4">
              {tickets.filter(t => (activeTab === 'All' || t.status === activeTab) && (!searchQuery || t.customer.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase()))).map(ticket => (
                <div key={ticket.id} onClick={() => setSelectedTicket(ticket)}
                  className={`p-5 border rounded-2xl flex flex-col md:flex-row justify-between gap-4 transition-all bg-white group cursor-pointer shadow-sm hover:shadow-md ${selectedTicket.id === ticket.id ? 'border-violet-400 ring-2 ring-violet-100' : 'border-slate-100 hover:border-violet-200'}`}>
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ticket.type === 'Complaint' ? 'bg-red-50 text-red-600' : ticket.type === 'Endorsement' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                      {ticket.type === 'Complaint' ? <AlertCircle size={18} /> : ticket.type === 'Endorsement' ? <Ticket size={18} /> : <MessageSquare size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{ticket.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{ticket.status}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${ticket.priority === 'Urgent' ? 'border-red-200 text-red-600' : ticket.priority === 'High' ? 'border-amber-200 text-amber-600' : 'border-slate-200 text-slate-500'}`}>{ticket.priority}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 mb-1">{ticket.description}</p>
                      <p className="text-[10px] font-bold text-slate-400">{ticket.id} • {ticket.type} • Created {ticket.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end"><ChevronRight size={16} className="text-slate-300 group-hover:text-violet-500 hidden md:block" /></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Active Ticket</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-xl font-black">{selectedTicket.id}</h2>
                  <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${selectedTicket.priority === 'Urgent' ? 'bg-red-500/20 text-red-400' : selectedTicket.priority === 'High' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-400'}`}>{selectedTicket.priority}</span>
                </div>
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1 mb-3"><User size={12} /> {selectedTicket.customer}</p>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">{selectedTicket.description}</p>
              </div>
              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quick Actions</h5>
                <button onClick={() => { setShowReply(r => !r); setReplySent(prev => ({ ...prev, [selectedTicket.id]: false })); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${replySent[selectedTicket.id] ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 hover:bg-white/10'}`}>
                  {replySent[selectedTicket.id] ? <><CheckCheck size={14} /> Reply Sent</> : <><MessageSquare size={14} className="text-violet-400" /> Reply to Customer</>}
                </button>
                {showReply && !replySent[selectedTicket.id] && (
                  <div className="space-y-2">
                    <textarea rows={3} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type reply message..."
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-violet-500 resize-none" />
                    <button onClick={() => { if (!replyText.trim()) return; setReplySent(prev => ({ ...prev, [selectedTicket.id]: true })); setShowReply(false); setReplyText(''); }}
                      className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black rounded-xl transition-all">Send Reply</button>
                  </div>
                )}
                <button onClick={() => setEscalated(prev => ({ ...prev, [selectedTicket.id]: true }))} disabled={!!escalated[selectedTicket.id]}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${escalated[selectedTicket.id] ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'}`}>
                  {escalated[selectedTicket.id] ? <><CheckCheck size={14} /> Escalated to TPA</> : <><AlertCircle size={14} className="text-violet-400" /> Escalate to TPA Desk</>}
                </button>
                <button onClick={handleMarkResolved} disabled={selectedTicket.status === 'Resolved'}
                  className={`w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${selectedTicket.status === 'Resolved' ? 'text-slate-600 cursor-not-allowed' : 'text-emerald-400 hover:text-emerald-300'}`}>
                  <CheckCircle2 size={14} /> {selectedTicket.status === 'Resolved' ? 'Already Resolved' : 'Mark as Resolved'}
                </button>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Internal Notes</h5>

                {/* Saved notes thread */}
                {(notes[selectedTicket.id] || []).length > 0 && (
                  <div className="mb-3 space-y-2 max-h-36 overflow-y-auto pr-1">
                    {(notes[selectedTicket.id] || []).map((note, idx) => (
                      <div key={idx} className="p-3 bg-violet-600/20 border border-violet-500/20 rounded-xl">
                        <p className="text-[10px] font-medium text-white/90 leading-relaxed">{note.text}</p>
                        <p className="text-[9px] font-black text-slate-500 mt-1.5 uppercase tracking-widest">CSR Agent • {note.time}</p>
                      </div>
                    ))}
                  </div>
                )}

                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add an internal note..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white outline-none focus:border-violet-500 resize-none h-20" />
                {noteError && <p className="text-[10px] text-red-400 font-bold pb-1">{noteError}</p>}
                <button
                  onClick={() => {
                    if (!noteText.trim()) { setNoteError('Note cannot be empty.'); return; }
                    setNoteError('');
                    const now = new Date();
                    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                    setNotes(prev => ({
                      ...prev,
                      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), { text: noteText.trim(), time }]
                    }));
                    setNoteText('');
                  }}
                  className="w-full mt-2 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black rounded-xl transition-all">
                  Add Note
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
