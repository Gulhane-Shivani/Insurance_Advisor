/* src/app/csr_dashboard/sections/RenewalManagement.tsx */
import React, { useState } from 'react';
import { 
  RefreshCw, Phone, Mail, MessageSquare, 
  Search, Filter, ChevronRight, AlertCircle, FileText
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const RenewalManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Upcoming (30 Days)');

  const renewals = [
    { id: 'REN-001', customer: 'Vikas Patel', policy: 'Health Elite Plus', expiry: '05 May 2026', premium: '₹18,500', status: 'At Risk', riskReason: 'Skipped last call' },
    { id: 'REN-002', customer: 'Meera Reddy', policy: 'Motor Comprehensive', expiry: '12 May 2026', premium: '₹12,200', status: 'Follow Up', riskReason: 'Requested discount' },
    { id: 'REN-003', customer: 'Arjun Singh', policy: 'Term Life Shield', expiry: '20 May 2026', premium: '₹24,000', status: 'Payment Pending', riskReason: 'Link sent' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Renewals List */}
        <div className="lg:col-span-8 lg:w-2/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <RefreshCw size={20} className="text-violet-600" /> Renewal Desk
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<Search size={14} />}>Search</Button>
                <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filter</Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
              {['Overdue', 'Upcoming (30 Days)', 'Upcoming (60 Days)', 'All'].map(tab => (
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
              {renewals.map((renewal) => (
                <div key={renewal.id} className="p-5 border border-slate-100 rounded-2xl flex flex-col md:flex-row justify-between gap-4 hover:border-violet-200 transition-all bg-white group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0 font-black text-xl">
                      {renewal.customer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-slate-800">{renewal.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          renewal.status === 'At Risk' ? 'bg-red-100 text-red-700' : 
                          renewal.status === 'Follow Up' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {renewal.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">{renewal.policy} • Exp: {renewal.expiry}</p>
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

        {/* Action Column */}
        <div className="lg:col-span-4 lg:w-1/3 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Retention Actions</h4>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black mb-1">Vikas Patel</h2>
                <p className="text-xs font-medium text-slate-400">Health Elite Plus • {renewals[0].premium}</p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-1">High Risk</p>
                  <p className="text-[10px] font-medium text-slate-300 leading-relaxed">Customer skipped the last 2 reminder calls. Highly likely to port to competitor.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Communication</h5>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <Phone size={14} className="text-violet-400" /> Log Outbound Call
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <MessageSquare size={14} className="text-violet-400" /> Send WhatsApp Reminder
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <Mail size={14} className="text-violet-400" /> Email Payment Link
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-violet-400" /> Process Manual Renewal
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewalManagement;
