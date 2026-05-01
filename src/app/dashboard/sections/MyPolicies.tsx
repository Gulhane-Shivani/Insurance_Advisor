import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Download, CreditCard, RefreshCw, ChevronRight, MoreHorizontal, Calendar, Info, ArrowLeft, CheckCircle2, AlertCircle, FileText, PieChart, Activity, MapPin, Phone, Mail, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const MyPolicies: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleExport = () => {
    const data = JSON.stringify(policies, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'policy_portfolio_export.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Portfolio exported successfully');
  };

  const handleDownloadPDF = (id: string) => {
    const content = `Policy Document for ${id}\nGenerated on: ${new Date().toLocaleDateString()}\nStatus: Active\nCoverage: Premium Plus`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${id}_document.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Document ${id} downloaded`);
  };

  const handlePayNow = (amount: string) => {
    const confirmPayment = window.confirm(`Proceed to pay ${amount}?`);
    if (confirmPayment) {
      toast.loading('Processing payment...', { duration: 2000 });
      setTimeout(() => {
        toast.success('Payment successful! Your policy is now up to date.');
      }, 2000);
    }
  };

  const policies = [
    {
      id: 'POL-12345',
      company: 'HDFC Ergo',
      product: 'Optima Secure Health',
      type: 'Health',
      sumAssured: '₹10,00,000',
      premium: '₹1,550',
      dueDate: 'Oct 24, 2024',
      status: 'Active',
      startDate: 'Oct 24, 2023',
      endDate: 'Oct 23, 2024',
      icon: '🏥',
      color: 'blue',
      nextPremium: '₹1,550 on Oct 24, 2024',
      nominee: 'Jane Doe (Spouse)',
      coverage: ['Hospitalization', 'Day Care Treatments', 'Organ Donor Expenses', 'Ayush Treatment'],
      claims: '0 Claims',
      contact: { name: 'Rahul Sharma', phone: '+91 98123 45678', email: 'support@hdfcergo.com' }
    },
    {
      id: 'POL-67890',
      company: 'Tata AIG',
      product: 'Auto Safe Car Insurance',
      type: 'Car',
      sumAssured: '₹8,50,000',
      premium: '₹7,900',
      dueDate: 'May 12, 2024',
      status: 'Expiring Soon',
      startDate: 'May 13, 2023',
      endDate: 'May 12, 2024',
      icon: '🚗',
      color: 'orange',
      nextPremium: '₹7,900 on May 12, 2024',
      nominee: 'John Doe (Father)',
      coverage: ['Third Party Liability', 'Own Damage', 'Zero Depreciation', 'Engine Protect'],
      claims: '1 Claim processed',
      contact: { name: 'Ankita Verma', phone: '+91 98765 43210', email: 'service@tataaig.com' }
    },
    {
      id: 'POL-44556',
      company: 'LIC India',
      product: 'Jeevan Anand',
      type: 'Life',
      sumAssured: '₹50,00,000',
      premium: '₹12,400',
      dueDate: 'Jan 15, 2025',
      status: 'Active',
      startDate: 'Jan 15, 2020',
      endDate: 'Jan 14, 2040',
      icon: '👴',
      color: 'purple',
      nextPremium: '₹12,400 on Jan 15, 2025',
      nominee: 'Jane Doe (Spouse)',
      coverage: ['Death Benefit', 'Maturity Benefit', 'Accidental Death Rider', 'Term Rider'],
      claims: 'N/A',
      contact: { name: 'Suresh Kumar', phone: '+91 90000 11111', email: 'help@licindia.com' }
    }
  ];

  if (showAddForm) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowAddForm(false)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Link Offline Policy</h1>
        </div>
        
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 max-w-2xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success('Policy link request submitted'); setShowAddForm(false); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Number</label>
                <input type="text" placeholder="e.g. POL-XXXXX" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurer</label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all text-sm font-bold appearance-none">
                  <option>HDFC Ergo</option>
                  <option>Tata AIG</option>
                  <option>LIC India</option>
                  <option>ICICI Lombard</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Birth (Policy Holder)</label>
              <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all text-sm font-bold" />
            </div>
            <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-start gap-4">
               <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
               <p className="text-xs text-blue-800 font-medium leading-relaxed">
                 We will verify your details with the insurer. This process usually takes 2-4 hours. Once verified, the policy will appear in your dashboard.
               </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
              <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Link Policy</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (selectedPolicy) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
        {/* Detail Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setSelectedPolicy(null)}
               className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
             >
                <ArrowLeft className="w-5 h-5" />
             </button>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedPolicy.company} Portfolio</span>
                   <span className="text-slate-300">•</span>
                   <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{selectedPolicy.id}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{selectedPolicy.product}</h1>
             </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <button 
               onClick={() => handleDownloadPDF(selectedPolicy.id)}
               className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
             >
                <Download className="w-4 h-4" /> Download PDF
             </button>
             <button 
               onClick={() => handlePayNow(selectedPolicy.premium)}
               className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
             >
                {selectedPolicy.status === 'Expiring Soon' ? 'Renew Now' : 'Pay Premium'}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Main Overview Card */}
           <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
                 <div className="p-10">
                    <div className="flex justify-between items-start mb-10">
                       <h2 className="text-xl font-black text-slate-900">Coverage Overview</h2>
                       <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          selectedPolicy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                       }`}>
                          {selectedPolicy.status}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                       <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 group hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-500">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 text-blue-600">
                             <Shield className="w-5 h-5" />
                          </div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sum Assured</p>
                          <p className="text-xl font-black text-slate-900">{selectedPolicy.sumAssured}</p>
                       </div>
                       <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 group hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 text-indigo-600">
                             <CreditCard className="w-5 h-5" />
                          </div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium</p>
                          <p className="text-xl font-black text-slate-900">{selectedPolicy.premium}</p>
                       </div>
                       <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 group hover:bg-white hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50 transition-all duration-500">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 text-purple-600">
                             <RefreshCw className="w-5 h-5" />
                          </div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Frequency</p>
                          <p className="text-xl font-black text-slate-900">Yearly</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          What's Covered
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedPolicy.coverage.map((item: string, i: number) => (
                             <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-sm font-bold text-slate-700">{item}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                       <Activity className="w-4 h-4 text-orange-500" />
                       Claim History
                    </h3>
                    <div className="text-center py-6">
                       <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <FileText className="w-8 h-8 text-slate-300" />
                       </div>
                       <p className="text-base font-black text-slate-900">{selectedPolicy.claims}</p>
                       <p className="text-xs text-slate-400 font-medium mt-1">Status as of today</p>
                    </div>
                 </div>
                 <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                       <PieChart className="w-4 h-4 text-blue-500" />
                       Policy Period
                    </h3>
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</p>
                          <p className="text-sm font-bold text-slate-900">{selectedPolicy.startDate}</p>
                       </div>
                       <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</p>
                          <p className="text-sm font-bold text-slate-900">{selectedPolicy.endDate}</p>
                       </div>
                       <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-4">
                          <div className="h-full bg-blue-600 rounded-full w-[65%]"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar Info */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                 <h3 className="text-lg font-black mb-6 relative z-10">Next Premium</h3>
                 <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 relative z-10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Upcoming Payment</p>
                    <p className="text-xl font-black text-white mb-6">{selectedPolicy.premium}</p>
                    <button 
                      onClick={() => handlePayNow(selectedPolicy.premium)}
                      className="w-full py-3.5 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-slate-900/40"
                    >
                       Pay Now
                    </button>
                 </div>
                 <div className="mt-8 flex items-center gap-3 relative z-10">
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                    <p className="text-[10px] font-bold text-white/60">Auto-debit is disabled for this policy.</p>
                 </div>

                 {/* Abstract BG */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Personal Advisor</h3>
                 <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-xl font-black text-blue-600 border border-blue-100">
                          {selectedPolicy.contact.name.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900">{selectedPolicy.contact.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certified Agent</p>
                       </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-slate-50">
                       <a href={`tel:${selectedPolicy.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                             <Phone className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{selectedPolicy.contact.phone}</span>
                       </a>
                       <a href={`mailto:${selectedPolicy.contact.email}`} className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                             <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{selectedPolicy.contact.email}</span>
                       </a>
                       <div className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                             <MapPin className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">Mumbai, MH</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Portfolio Management</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Coverage</h1>
           <p className="text-slate-500 font-medium mt-1 text-sm">Manage, renew and download documents for all your policies.</p>
        </div>
        <div className="flex gap-2.5 w-full md:w-auto">
           <button 
             onClick={handleExport}
             className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-500"
           >
              <Download className="w-3.5 h-3.5" /> Export
           </button>
           <button 
             onClick={() => navigate('/compare')}
             className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
           >
              Add Policy
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all group relative">
             <div className="p-7 relative">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                         {policy.icon}
                      </div>
                      <div>
                         <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{policy.product}</h3>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                            {policy.company} • <span className="text-slate-300 font-bold">{policy.id}</span>
                         </p>
                      </div>
                   </div>
                   <button 
                     onClick={() => toast('Menu options opened')}
                     className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
                   >
                      <MoreHorizontal className="w-5 h-5" />
                   </button>
                </div>

                <div className="grid grid-cols-3 gap-4 py-5 border-y border-slate-50 mb-6">
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sum Assured</p>
                      <p className="text-base font-black text-slate-900 tracking-tight">{policy.sumAssured}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium</p>
                      <p className="text-base font-black text-slate-900 tracking-tight">{policy.premium}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                        policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                         {policy.status}
                      </span>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                   <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="flex items-center gap-2.5">
                         <Calendar className="w-3.5 h-3.5 text-slate-300" />
                         <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Renewal Date</p>
                            <p className="text-xs font-bold text-slate-700">{policy.dueDate}</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => handleDownloadPDF(policy.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                         <Download className="w-3.5 h-3.5" />
                         PDF
                      </button>
                      <button 
                        onClick={() => setSelectedPolicy(policy)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
                      >
                         Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="h-1 w-full bg-slate-50">
                <div className={`h-full opacity-40 ${
                  policy.color === 'blue' ? 'bg-blue-600' : policy.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'
                }`} style={{ width: '65%' }}></div>
             </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-white rounded-[32px] border border-blue-100 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
         <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-base font-black text-slate-900 mb-0.5">Consolidate your policies?</h3>
            <p className="text-slate-500 font-medium text-xs">Link policies purchased offline to manage everything in one secure place.</p>
         </div>
         <button 
           onClick={() => setShowAddForm(true)}
           className="px-6 py-2.5 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all"
         >
            Link Policy
         </button>
      </div>
    </div>
  );
};

export default MyPolicies;
