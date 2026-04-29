/* src/app/csr_dashboard/sections/ClaimsSupport.tsx */
import React, { useState } from 'react';
import { 
  ShieldAlert, Clock, CheckCircle2, Search, 
  Filter, FileText, Upload, AlertCircle, ChevronRight
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const ClaimsSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  const claims = [
    { id: 'CLM-2026-881', customer: 'Rajesh Kumar', type: 'Health', amount: '₹1,25,000', date: '28 Apr 2026', status: 'Pending Info', priority: 'High', hospital: 'Apollo Mumbai' },
    { id: 'CLM-2026-882', customer: 'Anjali Sharma', type: 'Motor', amount: '₹45,000', date: '26 Apr 2026', status: 'Survey Done', priority: 'Medium', garage: 'Maruti Authorized' },
    { id: 'CLM-2026-883', customer: 'Sunil Gupta', type: 'Health', amount: '₹80,000', date: '20 Apr 2026', status: 'Approved', priority: 'Low', hospital: 'Fortis Delhi' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Claims List Column */}
        <div className="lg:col-span-8 lg:w-2/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <ShieldAlert size={20} className="text-violet-600" /> Claims Queue
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<Search size={14} />}>Search</Button>
                <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filter</Button>
              </div>
            </div>

            <div className="flex gap-2 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
              {['All', 'Pending', 'In Progress', 'Resolved'].map(tab => (
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
              {claims.map((claim) => (
                <div key={claim.id} className="p-5 border border-slate-100 rounded-2xl flex flex-col md:flex-row justify-between gap-4 hover:border-violet-200 transition-all bg-white group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${claim.type === 'Health' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{claim.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${claim.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">{claim.id} • {claim.type} • {claim.hospital || claim.garage}</p>
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

        {/* Claim Details / Action Column */}
        <div className="lg:col-span-4 lg:w-1/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Selected Claim</h4>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black mb-1">CLM-2026-881</h2>
                <p className="text-xs font-medium text-slate-400">Rajesh Kumar • Health Elite</p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                <AlertCircle size={20} className="text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Action Required</p>
                  <p className="text-[10px] font-medium text-slate-300 leading-relaxed">Discharge summary missing from Apollo Hospitals. Need to contact customer or hospital desk.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support Tools</h5>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <Upload size={14} className="text-violet-400" /> Upload Missing Documents
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <Clock size={14} className="text-violet-400" /> Send Status Update SMS
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-violet-400" /> Escalate to TPA
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
