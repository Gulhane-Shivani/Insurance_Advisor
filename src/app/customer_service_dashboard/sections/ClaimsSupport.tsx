import React, { useState } from 'react';
import { ShieldAlert, Clock, CheckCircle2, Search, Filter, FileText, Upload, AlertCircle, ChevronRight, X, CheckCheck } from 'lucide-react';
import { Card } from '../../../components/agent/UI';

interface Claim {
  id: string; customer: string; type: string; amount: string;
  date: string; status: string; priority: string; facility: string;
  actionNote: string;
}

const INITIAL_CLAIMS: Claim[] = [
  { id: 'CLM-2026-881', customer: 'Rajesh Kumar', type: 'Health', amount: '₹1,25,000', date: '28 Apr 2026', status: 'Pending Info', priority: 'High', facility: 'Apollo Mumbai', actionNote: 'Discharge summary missing from Apollo Hospitals.' },
  { id: 'CLM-2026-882', customer: 'Anjali Sharma', type: 'Motor', amount: '₹45,000', date: '26 Apr 2026', status: 'Survey Done', priority: 'Medium', facility: 'Maruti Authorized', actionNote: 'Survey completed. Awaiting repair estimate from garage.' },
  { id: 'CLM-2026-883', customer: 'Sunil Gupta', type: 'Health', amount: '₹80,000', date: '20 Apr 2026', status: 'Approved', priority: 'Low', facility: 'Fortis Delhi', actionNote: 'Claim approved. Payment processing in 2–3 business days.' },
];

const ClaimsSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [selected, setSelected] = useState<Claim>(INITIAL_CLAIMS[0]);
  const [uploadDone, setUploadDone] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [uploadFile, setUploadFile] = useState<string | null>(null);

  const tabMap: Record<string, string[]> = {
    'All': ['Pending Info', 'Survey Done', 'Approved', 'In Progress', 'Resolved'],
    'Pending': ['Pending Info'],
    'In Progress': ['Survey Done', 'In Progress'],
    'Resolved': ['Approved', 'Resolved'],
  };

  const filtered = claims.filter(c => {
    const tabMatch = tabMap[activeTab]?.includes(c.status) ?? true;
    const searchMatch = !searchQuery || c.customer.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = filterType === 'All' || c.type === filterType;
    return tabMatch && searchMatch && typeMatch;
  });

  const handleSelect = (claim: Claim) => {
    setSelected(claim);
    setUploadDone(false); setSmsSent(false); setEscalated(false); setUploadFile(null);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file.name);
    setUploadDone(true);
    setClaims(prev => prev.map(c => c.id === selected.id ? { ...c, status: 'In Progress', actionNote: `Document "${file.name}" uploaded successfully.` } : c));
    setSelected(prev => ({ ...prev, status: 'In Progress', actionNote: `Document "${file.name}" uploaded successfully.` }));
  };

  const handleSendSMS = () => {
    setSmsSent(true);
    setClaims(prev => prev.map(c => c.id === selected.id ? { ...c, actionNote: selected.actionNote + ' Status SMS sent to customer.' } : c));
  };

  const handleEscalate = () => {
    setEscalated(true);
    setClaims(prev => prev.map(c => c.id === selected.id ? { ...c, status: 'In Progress', actionNote: `${selected.id} escalated to TPA Desk. Awaiting TPA response.` } : c));
    setSelected(prev => ({ ...prev, status: 'In Progress', actionNote: `${selected.id} escalated to TPA Desk. Awaiting TPA response.` }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Queue */}
        <div className="lg:w-2/3 space-y-4">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><ShieldAlert size={20} className="text-violet-600" /> Claims Queue</h3>
              <div className="flex gap-2">
                <button onClick={() => setShowSearch(s => !s)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${showSearch ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400'}`}>
                  <Search size={13} /> Search
                </button>
                <button onClick={() => setShowFilter(s => !s)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${showFilter ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400'}`}>
                  <Filter size={13} /> Filter
                </button>
              </div>
            </div>

            {showSearch && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input autoFocus type="text" placeholder="Search by customer name or claim ID..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 transition-all" />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
              </div>
            )}

            {showFilter && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {['All', 'Health', 'Motor', 'Life'].map(t => (
                  <button key={t} onClick={() => setFilterType(t)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${filterType === t ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300'}`}>{t}</button>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
              {['All', 'Pending', 'In Progress', 'Resolved'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-800'}`}>{tab}</button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-sm font-semibold">No claims match the current filters.</div>
              )}
              {filtered.map(claim => (
                <div key={claim.id} onClick={() => handleSelect(claim)}
                  className={`p-5 border rounded-2xl flex flex-col md:flex-row justify-between gap-4 transition-all bg-white group cursor-pointer shadow-sm hover:shadow-md ${selected.id === claim.id ? 'border-violet-400 ring-2 ring-violet-100' : 'border-slate-100 hover:border-violet-200'}`}>
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${claim.type === 'Health' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}><FileText size={20} /></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{claim.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${claim.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : claim.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{claim.status}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">{claim.id} • {claim.type} • {claim.facility}</p>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim Amount</p>
                      <p className="text-sm font-bold text-slate-800">{claim.amount}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-violet-500 transition-colors hidden md:block mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="lg:w-1/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Selected Claim</h4>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black mb-1">{selected.id}</h2>
                <p className="text-xs font-medium text-slate-400">{selected.customer} • {selected.type} — {selected.facility}</p>
              </div>

              <div className={`p-4 rounded-2xl flex gap-3 ${selected.status === 'Approved' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                <AlertCircle size={20} className={`flex-shrink-0 ${selected.status === 'Approved' ? 'text-emerald-400' : 'text-amber-500'}`} />
                <div>
                  <p className={`text-xs font-black uppercase tracking-widest mb-1 ${selected.status === 'Approved' ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {selected.status === 'Approved' ? 'Approved' : 'Action Required'}
                  </p>
                  <p className="text-[10px] font-medium text-slate-300 leading-relaxed">{selected.actionNote}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support Tools</h5>

                {/* Upload Documents */}
                <label className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${uploadDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 hover:bg-white/10'}`}>
                  {uploadDone ? <><CheckCheck size={14} className="text-emerald-400" /> Uploaded: {uploadFile}</> : <><Upload size={14} className="text-violet-400" /> Upload Missing Documents</>}
                  <input type="file" className="hidden" onChange={handleUpload} />
                </label>

                {/* Send SMS */}
                <button
                  onClick={handleSendSMS}
                  disabled={smsSent}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${smsSent ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'}`}>
                  {smsSent ? <><CheckCheck size={14} /> SMS Sent to Customer</> : <><Clock size={14} className="text-violet-400" /> Send Status Update SMS</>}
                </button>

                {/* Escalate */}
                <button
                  onClick={handleEscalate}
                  disabled={escalated}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${escalated ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'}`}>
                  {escalated ? <><CheckCheck size={14} /> Escalated to TPA Desk</> : <><CheckCircle2 size={14} className="text-violet-400" /> Escalate to TPA</>}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimsSupport;
