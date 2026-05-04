import React, { useState, useEffect } from 'react';
import { RefreshCw, Phone, Mail, MessageSquare, Search, ChevronRight, AlertCircle, FileText, CheckCheck } from 'lucide-react';
import { Card } from '../../../components/agent/UI';

interface Renewal { id: string; customer: string; policy: string; expiry: string; premium: string; status: string; riskReason: string; }

const RenewalManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Upcoming (30 Days)');
  const [searchQuery, setSearchQuery] = useState('');
  const [renewals, setRenewals] = useState<Renewal[]>([
    { id: 'REN-001', customer: 'Vikas Patel', policy: 'Health Elite Plus', expiry: '05 May 2026', premium: '₹18,500', status: 'At Risk', riskReason: 'Skipped last call' },
    { id: 'REN-002', customer: 'Meera Reddy', policy: 'Motor Comprehensive', expiry: '12 May 2026', premium: '₹12,200', status: 'Follow Up', riskReason: 'Requested discount' },
    { id: 'REN-003', customer: 'Arjun Singh', policy: 'Term Life Shield', expiry: '20 May 2026', premium: '₹24,000', status: 'Payment Pending', riskReason: 'Link sent' },
  ]);
  const [selected, setSelected] = useState<Renewal | null>(renewals[0]);

  const [lastAction, setLastAction] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleAction = (label: string) => {
    if (!selected) return;
    setLastAction(label);
    setRenewals(prev => prev.map(r => r.id === selected.id ? { ...r, status: 'Follow Up', riskReason: label } : r));
    setSelected(prev => prev ? ({ ...prev, status: 'Follow Up', riskReason: label }) : null);
  };

  const handleProcessRenewal = () => {
    if (!selected) return;
    setProcessing(true);
    setTimeout(() => {
      const remaining = renewals.filter(r => r.id !== selected.id);
      setRenewals(remaining);
      setProcessing(false);
      setLastAction(null);
    }, 800);
  };

  const filtered = renewals.filter(r => {
    const searchMatch = r.customer.toLowerCase().includes(searchQuery.toLowerCase()) || r.policy.toLowerCase().includes(searchQuery.toLowerCase());
    
    // We parse the expiry date and compare to the app's current context date (e.g. May 4, 2026)
    const today = new Date('04 May 2026');
    const expiryDate = new Date(r.expiry);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let tabMatch = true;
    if (activeTab === 'Overdue') tabMatch = diffDays < 0;
    else if (activeTab === 'Upcoming (30 Days)') tabMatch = diffDays >= 0 && diffDays <= 30;
    else if (activeTab === 'Upcoming (60 Days)') tabMatch = diffDays > 30 && diffDays <= 60;

    return searchMatch && tabMatch;
  });

  useEffect(() => {
    if (filtered.length > 0) {
      if (!selected || !filtered.find(r => r.id === selected.id)) {
        setSelected(filtered[0]);
      }
    } else {
      setSelected(null);
    }
  }, [filtered, selected]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><RefreshCw size={20} className="text-violet-600" /> Renewal Desk</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search renewals..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-violet-500 transition-all w-48" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
              {['Overdue', 'Upcoming (30 Days)', 'Upcoming (60 Days)', 'All'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-800'}`}>{tab}</button>
              ))}
            </div>

            <div className="space-y-4">
              {filtered.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <RefreshCw size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-black uppercase tracking-widest">No renewals found</p>
                </div>
              )}
              {filtered.map(renewal => (
                <div key={renewal.id} onClick={() => setSelected(renewal)}
                  className={`p-5 border rounded-2xl flex flex-col md:flex-row justify-between gap-4 transition-all bg-white group cursor-pointer shadow-sm hover:shadow-md ${selected?.id === renewal.id ? 'border-violet-400 ring-2 ring-violet-100' : 'border-slate-100 hover:border-violet-200'}`}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0 font-black text-xl">{renewal.customer.charAt(0)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{renewal.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${renewal.status === 'At Risk' ? 'bg-red-100 text-red-700' : renewal.status === 'Follow Up' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{renewal.status}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">{renewal.policy} • Exp: {renewal.expiry}</p>
                      <p className="text-[10px] font-medium text-slate-400 mt-0.5">{renewal.riskReason}</p>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</p>
                      <p className="text-sm font-bold text-slate-800">{renewal.premium}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-violet-500 transition-colors hidden md:block mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white min-h-[400px]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Retention Actions</h4>
            
            {selected ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black mb-1">{selected.customer}</h2>
                  <p className="text-xs font-medium text-slate-400">{selected.policy} • {selected.premium}</p>
                </div>
                <div className={`p-4 rounded-2xl flex gap-3 ${selected.status === 'At Risk' ? 'bg-red-500/10 border border-red-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                  <AlertCircle size={20} className={`flex-shrink-0 ${selected.status === 'At Risk' ? 'text-red-500' : 'text-amber-400'}`} />
                  <div>
                    <p className={`text-xs font-black uppercase tracking-widest mb-1 ${selected.status === 'At Risk' ? 'text-red-500' : 'text-amber-400'}`}>{selected.status}</p>
                    <p className="text-[10px] font-medium text-slate-300 leading-relaxed">{selected.riskReason}</p>
                  </div>
                </div>
                {lastAction && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <CheckCheck size={14} className="text-emerald-400" />
                    <span className="text-[11px] font-bold text-emerald-300">{lastAction}</span>
                  </div>
                )}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Communication</h5>
                  <button onClick={() => handleAction('📞 Outbound call logged')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                    <Phone size={14} className="text-violet-400" /> Log Outbound Call
                  </button>
                  <button onClick={() => handleAction('💬 WhatsApp reminder sent')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                    <MessageSquare size={14} className="text-violet-400" /> Send WhatsApp Reminder
                  </button>
                  <button onClick={() => handleAction('📧 Payment link emailed')} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                    <Mail size={14} className="text-violet-400" /> Email Payment Link
                  </button>
                  <button onClick={handleProcessRenewal} disabled={processing} className="w-full text-left px-4 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 text-white shadow-lg shadow-violet-600/20">
                    <FileText size={14} /> {processing ? 'Processing...' : 'Process Manual Renewal'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 pt-10">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-600">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-300">No Renewal Selected</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Select a policy from the desk queue</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewalManagement;
