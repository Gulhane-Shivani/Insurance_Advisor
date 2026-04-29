/* src/app/csr_dashboard/sections/PolicyServicing.tsx */
import React, { useState } from 'react';
import { 
  Settings, Search, User, Phone, 
  FileText, Download, ShieldCheck, Edit3, 
  CheckCircle2, CreditCard
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

const PolicyServicing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Mock selected policy data
  const [policyData] = useState({
    id: 'POL-10293',
    customer: 'Rajesh Kumar',
    type: 'Health Elite Plus',
    status: 'Active',
    contact: {
      phone: '+91 98765 43210',
      email: 'rajesh.k@example.com',
      address: '402, Sea View Apts, Andheri West, Mumbai, MH 400053'
    },
    nominee: {
      name: 'Sunita Kumar',
      relation: 'Spouse',
      age: '32'
    },
    payment: {
      mode: 'Annual',
      nextDue: '15 May 2026',
      amount: '₹14,500'
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header */}
      <Card className="p-6 border-none shadow-xl shadow-slate-200/40">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Settings size={20} className="text-violet-600" /> Policy Servicing Desk
          </h3>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Enter Policy Number (e.g. POL-10293)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Policy Details & Editing */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden">
            {/* Header info */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-black text-slate-800">{policyData.id}</h2>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-lg tracking-widest">{policyData.status}</span>
                </div>
                <p className="text-sm font-bold text-slate-500">{policyData.customer} • {policyData.type}</p>
              </div>
              <Button 
                variant={isEditing ? 'primary' : 'outline'} 
                size="sm" 
                icon={isEditing ? <CheckCircle2 size={14} /> : <Edit3 size={14} />}
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? 'bg-emerald-600 hover:bg-emerald-700 border-none' : ''}
              >
                {isEditing ? 'Save Changes' : 'Edit Details'}
              </Button>
            </div>

            <div className="p-8 space-y-8">
              {/* Contact Info */}
              <section>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Phone size={14} /> Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Phone Number</label>
                    <input 
                      type="text" 
                      value={policyData.contact.phone}
                      disabled={!isEditing}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Email Address</label>
                    <input 
                      type="email" 
                      value={policyData.contact.email}
                      disabled={!isEditing}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500">Communication Address</label>
                    <textarea 
                      value={policyData.contact.address}
                      disabled={!isEditing}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500 resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* Nominee Info */}
              <section className="pt-6 border-t border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User size={14} /> Nominee Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Full Name</label>
                    <input 
                      type="text" 
                      value={policyData.nominee.name}
                      disabled={!isEditing}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Relationship</label>
                    <select 
                      disabled={!isEditing}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500"
                      value={policyData.nominee.relation}
                    >
                      <option>Spouse</option>
                      <option>Child</option>
                      <option>Parent</option>
                      <option>Sibling</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Age</label>
                    <input 
                      type="number" 
                      value={policyData.nominee.age}
                      disabled={!isEditing}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 disabled:opacity-70 disabled:bg-slate-100 outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </section>
            </div>
          </Card>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Document Issuance</h4>
            
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors flex items-start gap-4 group">
                <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg group-hover:bg-violet-500 group-hover:text-white transition-colors"><FileText size={18} /></div>
                <div>
                  <h5 className="text-xs font-bold mb-0.5">Policy Schedule</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Generate & Email PDF</p>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors flex items-start gap-4 group">
                <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg group-hover:bg-violet-500 group-hover:text-white transition-colors"><ShieldCheck size={18} /></div>
                <div>
                  <h5 className="text-xs font-bold mb-0.5">Health ID Card</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Issue digital cashless card</p>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors flex items-start gap-4 group">
                <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg group-hover:bg-violet-500 group-hover:text-white transition-colors"><Download size={18} /></div>
                <div>
                  <h5 className="text-xs font-bold mb-0.5">Tax Certificate (80D)</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Download FY 25-26 receipt</p>
                </div>
              </button>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 border-t-4 border-t-amber-500">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <CreditCard size={14} className="text-amber-500" /> Payment Status
            </h4>
            <div className="flex justify-between items-center mb-4">
               <div>
                  <p className="text-xs font-bold text-slate-500 mb-1">Next Premium</p>
                  <p className="text-lg font-black text-slate-800">{policyData.payment.amount}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 mb-1">Due Date</p>
                  <p className="text-sm font-black text-slate-800">{policyData.payment.nextDue}</p>
               </div>
            </div>
            <Button variant="outline" className="w-full text-xs">Send Payment Link</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolicyServicing;
