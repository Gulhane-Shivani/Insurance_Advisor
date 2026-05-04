import React, { useState } from 'react';
import { Settings, Search, User, Phone, FileText, Download, ShieldCheck, Edit3, CheckCircle2, CreditCard, Mail, CheckCheck, Loader2 } from 'lucide-react';
import { Card } from '../../../components/agent/UI';

const PolicyServicing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [policyData, setPolicyData] = useState({
    id: 'POL-10293', customer: 'Rajesh Kumar', type: 'Health Elite Plus', status: 'Active',
    contact: { phone: '+91 98765 43210', email: 'rajesh.k@example.com', address: '402, Sea View Apts, Andheri West, Mumbai, MH 400053' },
    nominee: { name: 'Sunita Kumar', relation: 'Spouse', age: '32' },
    payment: { nextDue: '15 May 2026', amount: '₹14,500' }
  });

  const [searching, setSearching] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);
  const [docStatus, setDocStatus] = useState<Record<string, string>>({});
  const [paymentSent, setPaymentSent] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setTimeout(() => { setHasSearched(true); setSearching(false); }, 600);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  const handleDoc = (label: string) => {
    setDocStatus(prev => ({ ...prev, [label]: 'sending' }));
    setTimeout(() => setDocStatus(prev => ({ ...prev, [label]: 'sent' })), 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Settings size={20} className="text-violet-600" /> Policy Servicing Desk</h3>
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Enter Policy Number (e.g. POL-10293)" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm" />
            </div>
            <button type="submit" disabled={searching} className="px-5 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2">
              {searching ? <><Loader2 size={14} className="animate-spin" /> Loading...</> : 'Load'}
            </button>
          </form>
        </div>
      </Card>

      {!hasSearched ? (
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
          <FileText size={48} className="mb-4 opacity-20" />
          <p className="text-sm font-black uppercase tracking-widest">Search a policy number to load servicing details</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                <div>
                  {savedBanner && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <CheckCheck size={14} className="text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">Policy details updated successfully.</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-black text-slate-800">{policyData.id}</h2>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-lg tracking-widest">{policyData.status}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-500">{policyData.customer} • {policyData.type}</p>
                </div>
                <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${isEditing ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400'}`}>
                  {isEditing ? <><CheckCircle2 size={14} /> Save Changes</> : <><Edit3 size={14} /> Edit Details</>}
                </button>
              </div>
              <div className="p-8 space-y-8">
                <section>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Phone size={14} /> Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Phone Number</label>
                      <input type="text" value={policyData.contact.phone} disabled={!isEditing}
                        onChange={e => setPolicyData(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Email Address</label>
                      <input type="email" value={policyData.contact.email} disabled={!isEditing}
                        onChange={e => setPolicyData(p => ({ ...p, contact: { ...p.contact, email: e.target.value } }))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500">Communication Address</label>
                      <textarea value={policyData.contact.address} disabled={!isEditing}
                        onChange={e => setPolicyData(p => ({ ...p, contact: { ...p.contact, address: e.target.value } }))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500 resize-none" />
                    </div>
                  </div>
                </section>
                <section className="pt-6 border-t border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><User size={14} /> Nominee Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Full Name</label>
                      <input type="text" value={policyData.nominee.name} disabled={!isEditing}
                        onChange={e => setPolicyData(p => ({ ...p, nominee: { ...p.nominee, name: e.target.value } }))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Relationship</label>
                      <select disabled={!isEditing} value={policyData.nominee.relation}
                        onChange={e => setPolicyData(p => ({ ...p, nominee: { ...p.nominee, relation: e.target.value } }))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500">
                        <option>Spouse</option><option>Child</option><option>Parent</option><option>Sibling</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Age</label>
                      <input type="number" value={policyData.nominee.age} disabled={!isEditing}
                        onChange={e => setPolicyData(p => ({ ...p, nominee: { ...p.nominee, age: e.target.value } }))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500" />
                    </div>
                  </div>
                </section>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Document Issuance</h4>
              <div className="space-y-3">
                {[{ label: 'Policy Schedule', icon: FileText, sub: 'Generate & Email PDF' }, { label: 'Health ID Card', icon: ShieldCheck, sub: 'Issue digital cashless card' }, { label: 'Tax Certificate (80D)', icon: Download, sub: 'Download FY 25-26 receipt' }].map(doc => (
                  <button key={doc.label} onClick={() => handleDoc(doc.label)} disabled={docStatus[doc.label] === 'sending'} className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors flex items-start gap-4 group">
                    <div className={`p-2 rounded-lg transition-colors ${docStatus[doc.label] === 'sent' ? 'bg-emerald-500 text-white' : 'bg-violet-500/20 text-violet-400 group-hover:bg-violet-500 group-hover:text-white'}`}>
                      {docStatus[doc.label] === 'sending' ? <Loader2 size={18} className="animate-spin" /> : docStatus[doc.label] === 'sent' ? <CheckCheck size={18} /> : <doc.icon size={18} />}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold mb-0.5">{doc.label}</h5>
                      <p className="text-[10px] text-slate-400 font-medium">{docStatus[doc.label] === 'sent' ? `Sent to ${policyData.contact.email}` : docStatus[doc.label] === 'sending' ? 'Generating...' : doc.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
            <Card className="p-6 border-none shadow-xl shadow-slate-200/40 border-t-4 border-t-amber-500">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><CreditCard size={14} className="text-amber-500" /> Payment Status</h4>
              <div className="flex justify-between items-center mb-4">
                <div><p className="text-xs font-bold text-slate-500 mb-1">Next Premium</p><p className="text-lg font-black text-slate-800">{policyData.payment.amount}</p></div>
                <div className="text-right"><p className="text-xs font-bold text-slate-500 mb-1">Due Date</p><p className="text-sm font-black text-slate-800">{policyData.payment.nextDue}</p></div>
              </div>
              <button onClick={() => { setPaymentSent(true); setTimeout(() => setPaymentSent(false), 3000); }} disabled={paymentSent}
                className={`w-full py-3 border-2 font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 ${paymentSent ? 'border-emerald-300 text-emerald-600 bg-emerald-50' : 'border-slate-200 text-slate-600 hover:border-violet-400 hover:text-violet-700'}`}>
                {paymentSent ? <><CheckCheck size={14} /> Payment Link Sent!</> : <><Mail size={14} /> Send Payment Link</>}
              </button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyServicing;
