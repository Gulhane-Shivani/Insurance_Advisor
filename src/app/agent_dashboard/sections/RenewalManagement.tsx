import React, { useState } from 'react';
import { 
  RefreshCw, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  MessageSquare,
  Eye
} from 'lucide-react';
import PolicyDetailView from '../../super_admin/sections/PolicyDetailView';

const RenewalManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [viewPolicyId, setViewPolicyId] = useState<string | null>(null);

  const renewals = [
    { id: 'REN-201', customer: 'Amit Singh', policy: 'POL-8829', type: 'Life', amount: '₹12,400', dueDate: '2026-05-30', status: 'Renewal Due', daysLeft: 21 },
    { id: 'REN-202', customer: 'Neha Kapoor', policy: 'POL-8828', type: 'Health', amount: '₹8,200', dueDate: '2026-06-15', status: 'Renewal Due', daysLeft: 36 },
    { id: 'REN-205', customer: 'Priya Verma', policy: 'POL-8825', type: 'Health', amount: '₹9,500', dueDate: '2026-05-24', status: 'Renewal Due', daysLeft: 15 },
    { id: 'REN-206', customer: 'Suresh Raina', policy: 'POL-8826', type: 'Life', amount: '₹22,000', dueDate: '2026-05-01', status: 'Renewal Due', daysLeft: 3 },
  ];

  const handleSendReminder = (customer: string) => {
    alert(`Renewal reminder sent successfully to ${customer}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Renewed': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'Expired': return <XCircle size={16} className="text-rose-500" />;
      default: return <Clock size={16} className="text-amber-500" />;
    }
  };

  if (viewPolicyId) {
    return <PolicyDetailView policyId={viewPolicyId} onBack={() => setViewPolicyId(null)} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Renewal Hub</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Track and process upcoming policy renewals</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
           {['All', 'Renewal Due'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Expiry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Expiring in 7 Days', count: renewals.filter(r => r.daysLeft > 0 && r.daysLeft <= 7).length, color: 'rose', icon: AlertTriangle },
          { label: 'Expiring in 15 Days', count: renewals.filter(r => r.daysLeft > 7 && r.daysLeft <= 15).length, color: 'amber', icon: Clock },
          { label: 'Expiring in 30 Days', count: renewals.filter(r => r.daysLeft > 15 && r.daysLeft <= 30).length, color: 'indigo', icon: Calendar },
        ].map((card, i) => (
          <div key={i} className={`bg-white p-6 rounded-[32px] border-b-4 border-indigo-500 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative`}>
            <div className={`absolute -right-8 -top-8 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform`}></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{card.label}</p>
                <h4 className="text-3xl font-black text-slate-900">{card.count}</h4>
              </div>
              <div className={`w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Renewal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renewals
          .filter(r => activeTab === 'All' || r.status === activeTab)
          .map((renewal) => (
          <div key={renewal.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center font-black shadow-inner border border-slate-100">
                    {renewal.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{renewal.customer}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{renewal.policy} • {renewal.type} Insurance</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(renewal.status)}
                      <span className="text-[11px] font-black uppercase tracking-widest">{renewal.status}</span>
                   </div>
                   {renewal.daysLeft > 0 && (
                     <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg ${
                       renewal.daysLeft <= 7 ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                     }`}>
                       {renewal.daysLeft} days remaining
                     </span>
                   )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Renewal Amount</p>
                  <p className="text-sm font-black text-slate-900">{renewal.amount}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                  <p className="text-sm font-black text-slate-900">{renewal.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleSendReminder(renewal.customer)}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                >
                  <MessageSquare size={14} /> Send Reminder
                </button>
                <button 
                  onClick={() => setViewPolicyId(renewal.policy)}
                  className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
            
            {/* Progress Bar for Renewal Due */}
            {renewal.status === 'Renewal Due' && (
              <div className="h-1.5 w-full bg-slate-100">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    renewal.daysLeft <= 7 ? 'bg-rose-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${Math.max(0, 100 - (renewal.daysLeft * 3))}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenewalManagement;
