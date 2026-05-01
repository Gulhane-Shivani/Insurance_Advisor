/* src/app/agent_dashboard/sections/Customer360.tsx */
import React, { useState } from 'react';
import { 
  User, Shield, Info, Phone, Mail, MapPin, 
  FileText, History, Zap
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';

interface Customer360Props {
  customerData?: any;
}

const Customer360: React.FC<Customer360Props> = ({ customerData }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  // Use passed customerData or fall back to default
  const customer = {
    name: customerData?.customer || customerData?.name || 'Rajesh Kumar',
    id: customerData?.policyNo || customerData?.id || 'CUST-8800',
    role: 'Primary Insured',
    status: customerData?.status || 'VIP Client',
    since: 'Oct 2022',
    lastContact: 'Today, 10:30 AM',
    nextRenewal: customerData?.renewal || 'May 15, 2026',
    totalPolicies: 4,
    totalPremium: customerData?.premium || '₹2,45,000/yr',
    claimsRatio: '0%',
    details: {
      occupation: 'Senior Executive / Consultant',
      annualIncome: '₹50 LPA+',
      residence: 'Dwarka, Delhi',
      age: 45,
      healthStatus: 'Excellent'
    },
    activePolicies: [
      { id: '1', type: customerData?.type || 'Term Life', plan: 'HDFC Click 2 Protect', premium: customerData?.premium || '₹45,000', status: 'Active' },
      { id: '2', type: 'Health', plan: 'Star Health Optima', premium: '₹22,000', status: 'Active' },
    ],
    recentActivities: [
      { id: '1', type: 'Call', text: 'Renewal discussion for Policy', date: 'Today' },
      { id: '2', type: 'Email', text: 'Sent updated portfolio summary', date: 'Yesterday' },
    ]
  };

  const tabs = [
    { id: 'Overview', icon: User },
    { id: 'Policies', icon: Shield },
    { id: 'Activity', icon: History },
    { id: 'Documents', icon: FileText }
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Profile Header */}
      <Card className="p-10 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-indigo-500 to-transparent"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
          <div className="relative">
             <div className="w-40 h-40 rounded-[48px] bg-white/10 flex items-center justify-center border-4 border-white/20 backdrop-blur-xl shadow-2xl group transition-all duration-500 hover:rotate-3">
                <div className="w-full h-full rounded-[44px] bg-indigo-500/20 flex items-center justify-center text-4xl font-black text-white/40 group-hover:text-white/60 transition-colors">
                   {customer.name.substring(0, 2).toUpperCase()}
                </div>
             </div>
             <div className={`absolute -bottom-2 -right-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border-2 border-slate-900 ${customer.status.includes('Active') ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                {customer.status}
             </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left space-y-4">
             <div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-2">
                   <h2 className="text-4xl font-black tracking-tight">{customer.name}</h2>
                   <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-white/5">{customer.id}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-400">
                   <p className="flex items-center gap-2"><Phone size={16} className="text-indigo-400" /> {customerData?.phone || '+91 98XXX XXX11'}</p>
                   <p className="flex items-center gap-2"><Mail size={16} className="text-indigo-400" /> {customerData?.email || 'customer@example.com'}</p>
                   <p className="flex items-center gap-2"><MapPin size={16} className="text-indigo-400" /> Delhi, India</p>
                </div>
             </div>

             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button size="sm" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-50 border-none shadow-lg">Edit Profile</Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">Send Message</Button>
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-indigo-600 transition-all shadow-lg"><Zap size={20} /></button>
             </div>
          </div>

          <div className="lg:w-72 grid grid-cols-2 gap-4 border-l border-white/10 pl-10">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Since</p>
                <p className="text-base font-black text-white">{customer.since}</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Policies</p>
                <p className="text-base font-black text-white">{customer.totalPolicies}</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Prem.</p>
                <p className="text-base font-black text-emerald-400">{customer.totalPremium}</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Claims Ratio</p>
                <p className="text-base font-black text-indigo-400">{customer.claimsRatio}</p>
             </div>
          </div>
        </div>
      </Card>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-2 bg-slate-100 rounded-[24px] w-fit shadow-inner">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <tab.icon size={14} />
            {tab.id}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            {activeTab === 'Overview' && (
              <>
                <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
                  <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2"><Info size={20} className="text-indigo-600" /> Essential Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupation</p>
                        <p className="text-sm font-bold text-slate-800">{customer.details.occupation}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Income</p>
                        <p className="text-sm font-bold text-slate-800">{customer.details.annualIncome}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age</p>
                        <p className="text-sm font-bold text-slate-800">{customer.details.age} Years</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health Status</p>
                        <p className="text-sm font-bold text-emerald-600 uppercase italic">{customer.details.healthStatus}</p>
                     </div>
                     <div className="space-y-1 col-span-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residence</p>
                        <p className="text-sm font-bold text-slate-800">{customer.details.residence}</p>
                     </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === 'Policies' && (
               <div className="space-y-4">
                  {customer.activePolicies.map(p => (
                     <Card key={p.id} className="p-6 border-none shadow-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <Shield size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800">{p.type}</h4>
                              <p className="text-xs text-slate-400">{p.plan}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black text-slate-800">{p.premium}</p>
                           <span className="text-[9px] font-black uppercase text-emerald-600">{p.status}</span>
                        </div>
                     </Card>
                  ))}
               </div>
            )}
         </div>

         <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-none shadow-xl bg-white">
               <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3">Recent Intelligence</h4>
               <div className="space-y-6">
                  {customer.recentActivities.map(act => (
                     <div key={act.id} className="relative pl-6 border-l-2 border-slate-100">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                        <p className="text-xs font-bold text-slate-800">{act.text}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">{act.date}</p>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default Customer360;
