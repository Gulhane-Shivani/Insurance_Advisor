import React from 'react';
import {
   ArrowLeft,
   Download,
   User,
   Mail,
   Phone,
   MapPin,
   Calendar,
   CreditCard,
   History,
   ShieldCheck,
   Zap,
   CheckCircle2,
   FileText,
   Activity,
   Sparkles,
   LayoutGrid,
   Clock,
   Edit2
} from 'lucide-react';

interface PolicyDetailViewProps {
   policyId: string;
   onBack: () => void;
}

const PolicyDetailView: React.FC<PolicyDetailViewProps> = ({ policyId, onBack }) => {
   // Enhanced Mock Data Repository
   const mockPolicies: Record<string, any> = {
      'POL-8829': {
         id: 'POL-8829',
         name: 'Life Insurance',
         status: 'Active',
         portfolio: 'Wealth Protection',
         theme: 'violet',
         customer: {
            fullName: 'Amit Singh',
            email: 'amit.singh@example.com',
            contact: '+91 98765 43210',
            address: 'H-45, Sector 15, Gurgaon, Haryana'
         },
         period: {
            issueDate: '09 May 2024',
            expiryDate: '09 May 2027',
            premium: '₹12,400',
            dueDate: '09 May 2025'
         },
         paymentHistory: [
            { amount: '₹12,400', date: '09 May 2024', type: 'Initial Premium', status: 'Success' }
         ],
         renewalLogs: [
            { status: 'Policy Issued', date: '09 May 2024', verified: true }
         ],
         coverage: ['Accidental Death', 'Term Life', 'Critical Illness'],
         benefits: ['Tax Benefit', 'Loyalty Bonus'],
         nominee: 'Priya Singh (Spouse)'
      },
      'POL-8828': {
         id: 'POL-8828',
         name: 'Health Insurance',
         status: 'Pending',
         portfolio: 'Health & Wellness',
         theme: 'blue',
         customer: {
            fullName: 'Neha Kapoor',
            email: 'neha.k@example.com',
            contact: '+91 88888 77777',
            address: 'Flat 202, Sunshine Apts, Mumbai'
         },
         period: {
            issueDate: '15 Jun 2023',
            expiryDate: '15 Jun 2026',
            premium: '₹8,200',
            dueDate: '15 Jun 2024'
         },
         paymentHistory: [
            { amount: '₹8,200', date: '15 Jun 2023', type: 'Initial Premium', status: 'Success' }
         ],
         renewalLogs: [
            { status: 'Pending Verification', date: '15 Jun 2023', verified: false }
         ],
         coverage: ['Hospitalization', 'OPD', 'Maternity'],
         benefits: ['Cashless', 'No Claim Bonus'],
         nominee: 'Rajesh Kapoor (Father)'
      },
      'POL-8827': {
         id: 'POL-8827',
         name: 'Car Insurance',
         status: 'Active',
         portfolio: 'Automobile Care',
         theme: 'indigo',
         customer: {
            fullName: 'Vikram Sahay',
            email: 'vikram.s@example.com',
            contact: '+91 77777 66666',
            address: 'Villa 12, Palm Grove, Bangalore'
         },
         period: {
            issueDate: '20 May 2023',
            expiryDate: '20 May 2026',
            premium: '₹15,000',
            dueDate: '20 May 2024'
         },
         paymentHistory: [
            { amount: '₹15,000', date: '20 May 2023', type: 'Full Premium', status: 'Success' }
         ],
         renewalLogs: [
            { status: 'Verified', date: '20 May 2023', verified: true }
         ],
         coverage: ['Third Party', 'Own Damage', 'Zero Dep'],
         benefits: ['Roadside Assistance'],
         nominee: 'Anjali Sahay (Wife)'
      },
      'POL-8826': {
         id: 'POL-8826',
         name: 'Life Insurance',
         status: 'Renewal Due',
         portfolio: 'Family Life Portfolio',
         theme: 'amber',
         customer: {
            fullName: 'Suresh Raina',
            email: 'suresh.r@example.com',
            contact: '+91 77766 55544',
            address: 'Plot 5, Sports City, Ghaziabad'
         },
         period: {
            issueDate: '12 May 2023',
            expiryDate: '12 May 2026',
            premium: '₹22,000',
            dueDate: '12 May 2024'
         },
         paymentHistory: [
            { amount: '₹22,000', date: '12 May 2023', type: 'Initial Premium', status: 'Success' }
         ],
         renewalLogs: [
            { status: 'Renewal Pending', date: '12 May 2024', verified: false }
         ],
         coverage: ['Critical Illness', 'Total Disability', 'Death Benefit'],
         benefits: ['Income Replacement', 'Child Education Rider'],
         nominee: 'Priyanka Raina (Wife)'
      },
      'POL-8825': {
         id: 'POL-8825',
         name: 'Health Insurance',
         status: 'Expired',
         portfolio: 'Personal Health Portfolio',
         theme: 'rose',
         customer: {
            fullName: 'Priya Verma',
            email: 'priya.v@example.com',
            contact: '+91 99887 76655',
            address: 'B-201, Green Park, South Delhi'
         },
         period: {
            issueDate: '01 May 2023',
            expiryDate: '01 May 2024',
            premium: '₹9,500',
            dueDate: '01 May 2024'
         },
         paymentHistory: [
            { amount: '₹9,500', date: '01 May 2023', type: 'Initial Premium', status: 'Success' }
         ],
         renewalLogs: [
            { status: 'Expired', date: '01 May 2024', verified: false }
         ],
         coverage: ['In-patient Hospitalization', 'AYUSH', 'Day Care'],
         benefits: ['Cashless Treatment', 'Restoration Benefit'],
         nominee: 'Sunil Verma (Husband)'
      },
      'SG-HLTH-002': {
         id: 'SG-HLTH-002',
         name: 'Star Comprehensive Health',
         status: 'Active',
         portfolio: 'Family Float Portfolio',
         theme: 'violet',
         customer: {
            fullName: 'Vijay Mehta',
            email: 'vijay.mehta@example.com',
            contact: '+91 98765 43210',
            address: 'Sector 42, Golf Course Road, Gurgaon, Haryana - 122001'
         },
         period: {
            issueDate: '01 Jan 2023',
            expiryDate: '02 May 2027',
            premium: '₹80,000',
            dueDate: '02 May 2027'
         },
         paymentHistory: [
            { amount: '₹80,000', date: '01 Jan 2023', type: 'New Issuance', status: 'Success' },
            { amount: '₹80,000', date: '02 Jan 2024', type: 'Renewal Payment', status: 'Success' }
         ],
         renewalLogs: [
            { status: 'Renewal Completed', date: '01 Jan 2024', verified: true },
            { status: 'Initial Issuance', date: '01 Jan 2023', verified: true }
         ],
         coverage: ['Hospitalization', 'OPD Cover', 'Maternity'],
         benefits: ['Platinum Plan'],
         nominee: 'Sunita Mehta (Wife)'
      }
   };

   // Fetch from localStorage to support newly created policies
   const getPolicyFromStorage = () => {
      if (typeof window !== 'undefined') {
         const saved = localStorage.getItem('safeguard_policies_v2');
         if (saved) {
            try {
               const parsed = JSON.parse(saved);
               return parsed.find((p: any) => p.id === policyId);
            } catch (e) {
               console.error(e);
            }
         }
      }
      return null;
   };

   const storedPolicy = getPolicyFromStorage();
   const basePolicy = mockPolicies[policyId] || mockPolicies['SG-HLTH-002'];

   const formatDate = (dateStr?: string) => {
      if (!dateStr) return '';
      if (dateStr.includes('-') && dateStr.length === 10) {
         const [year, month, day] = dateStr.split('-');
         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         const monthName = months[parseInt(month, 10) - 1];
         return `${day} ${monthName} ${year}`;
      }
      return dateStr;
   };

   const generateHistory = (issueDateStr: string, premium: string) => {
      const issueDate = new Date(issueDateStr);
      if (isNaN(issueDate.getTime())) {
         return {
            payments: [{ amount: premium, date: formatDate(issueDateStr) || issueDateStr, type: 'New Issuance', status: 'Success' }],
            renewals: [{ status: 'Initial Issuance', date: formatDate(issueDateStr) || issueDateStr, verified: true }]
         };
      }
      
      const today = new Date();
      const payments = [];
      const renewals = [];
      let currentDate = new Date(issueDate);
      let isFirst = true;
      
      do {
         const dateStr = formatDate(currentDate.toISOString().split('T')[0]);
         if (isFirst) {
            payments.unshift({ amount: premium, date: dateStr, type: 'New Issuance', status: 'Success' });
            renewals.unshift({ status: 'Initial Issuance', date: dateStr, verified: true });
            isFirst = false;
         } else {
            payments.unshift({ amount: premium, date: dateStr, type: 'Renewal Payment', status: 'Success' });
            renewals.unshift({ status: 'Renewal Completed', date: dateStr, verified: true });
         }
         currentDate.setFullYear(currentDate.getFullYear() + 1);
      } while (currentDate <= today);
      
      return { payments, renewals };
   };

   const generatedHistory = generateHistory(
      storedPolicy?.issueDate || basePolicy.period.issueDate, 
      storedPolicy?.premium || basePolicy.period.premium
   );

   const policyData = storedPolicy ? {
      ...basePolicy,
      id: storedPolicy.id,
      name: storedPolicy.type, // Using the type (e.g., 'Health Insurance') as the name for custom ones
      status: storedPolicy.status,
      customer: {
         fullName: storedPolicy.customer || basePolicy.customer.fullName,
         email: storedPolicy.email || basePolicy.customer.email,
         contact: storedPolicy.contact || basePolicy.customer.contact,
         address: basePolicy.customer.address // Mock address as it wasn't collected
      },
      period: {
         ...basePolicy.period,
         premium: storedPolicy.premium || basePolicy.period.premium,
         issueDate: storedPolicy.issueDate ? formatDate(storedPolicy.issueDate) : basePolicy.period.issueDate,
         expiryDate: storedPolicy.expiryDate ? formatDate(storedPolicy.expiryDate) : basePolicy.period.expiryDate,
         dueDate: storedPolicy.expiryDate ? formatDate(storedPolicy.expiryDate) : basePolicy.period.dueDate
      },
      nominee: storedPolicy.nominee || basePolicy.nominee,
      coverage: storedPolicy.coverage || basePolicy.coverage,
      benefits: storedPolicy.benefits || basePolicy.benefits,
      paymentHistory: storedPolicy.paymentHistory || generatedHistory.payments,
      renewalLogs: storedPolicy.renewalLogs || generatedHistory.renewals
   } : basePolicy;

   return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12">
         {/* Dynamic Background Elements */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${policyData.theme}-500/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse`}></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
         </div>

         {/* Navigation & Actions */}
         <div className="flex items-center justify-between">
            <button
               onClick={onBack}
               className="flex items-center gap-2.5 px-5 py-2.5 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 text-slate-500 hover:text-violet-600 font-bold text-[11px] transition-all group shadow-sm hover:shadow-md"
            >
               <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
               <span>Terminate Inspection</span>
            </button>

            <div className="flex items-center gap-3">
               <button className="p-2.5 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 text-slate-400 hover:text-violet-600 transition-all shadow-sm">
                  <LayoutGrid className="w-3.5 h-3.5" />
               </button>
               <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[11px] hover:bg-slate-800 transition-all shadow-lg">
                  <Download className="w-3.5 h-3.5" />
                  Download Statement
               </button>
            </div>
         </div>

         {/* Asset Header */}
         <div className="bg-[#0f172a] rounded-[40px] p-10 flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>

            <div className="flex items-center gap-8 z-10">
               <div className="relative">
                  <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl">
                     <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-emerald-500 border-4 border-[#0f172a] flex items-center justify-center">
                     <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
               </div>
               <div>
                  <div className="flex items-center gap-5 mb-2">
                     <h1 className="text-2xl font-black text-white tracking-tight">{policyData.name}</h1>
                     <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border backdrop-blur-md ${policyData.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                           policyData.status === 'Renewal Due' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}>
                        {policyData.status}
                     </span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-1 h-1 rounded-full bg-violet-500"></div>
                     <p className="text-slate-400 font-bold text-[11px] tracking-widest">
                        {policyData.id} <span className="mx-2 text-slate-700">|</span> {policyData.portfolio}
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-5 border border-white/10 flex items-center gap-6 z-10">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-500 mb-0.5 tracking-widest">Current Valuation</p>
                  <p className="text-xl font-black text-white">{policyData.period.premium}</p>
               </div>
               <div className="w-px h-10 bg-white/10"></div>
               <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-500 mb-0.5 tracking-widest">Maturity Date</p>
                  <p className="text-[13px] font-black text-violet-400">{policyData.period.expiryDate}</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
               {/* Asset Holder Identity */}
               <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative group overflow-hidden">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-inner">
                        <User className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">Asset Holder Identity</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest">Legal Identity</p>
                        <p className="text-base font-black text-slate-800">{policyData.customer.fullName}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest">Electronic Mail</p>
                        <p className="text-base font-bold text-slate-500">{policyData.customer.email}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest">Secure Contact</p>
                        <p className="text-base font-black text-slate-800">{policyData.customer.contact}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-[28px] border border-slate-100 group/addr hover:bg-slate-100 transition-colors">
                     <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1.5">Registered Residence</p>
                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{policyData.customer.address}</p>
                     </div>
                  </div>
               </div>

               {/* Comprehensive Specifications */}
               <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative group overflow-hidden">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                        <FileText className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">Comprehensive Specifications</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                     {[
                        { label: 'Insurance Company', value: 'SafeGuard Alliance' },
                        { label: 'Policy Type', value: policyData.portfolio || policyData.name },
                        { label: 'Policy Term', value: 'Annual Term' },
                        { label: 'Start Date', value: policyData.period.issueDate },
                        { label: 'Grace Period', value: '15 Days' },
                        { label: 'Sum Insured', value: '₹5,00,000 Base' },
                        { label: 'Premium Freq.', value: 'Annually' },
                        { label: 'Payment Mode', value: 'Net Banking' },
                        { label: 'Agent Assigned', value: 'Direct Digital' },
                        { label: 'CSR Assigned', value: 'Unassigned' },
                        { label: 'Coverage Type', value: 'Comprehensive' },
                        { label: 'Waiting Period', value: '30 Days Standard' },
                        { label: 'Add-ons / Riders', value: 'None Included' },
                        { label: 'Exclusions', value: 'Standard Protocol' },
                     ].map((item, i) => (
                        <div key={i} className="space-y-1 min-w-0">
                           <p className="text-[9px] font-bold text-slate-400 tracking-widest">{item.label}</p>
                           <p className="text-sm font-black text-slate-800 truncate">{item.value}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Coverage & Benefits */}
               <div className="bg-[#0f172a] rounded-[40px] p-10 border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                     </div>
                     <h3 className="text-lg font-black text-white tracking-tight">Coverage & Benefits</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">Included Coverage</p>
                        <div className="space-y-3">
                           {policyData.coverage.map((item: string, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                 <span className="text-sm font-bold text-slate-300">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">Core Benefits</p>
                        <div className="space-y-3">
                           {policyData.benefits.map((item: string, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                 <Zap className="w-4 h-4 text-violet-400" />
                                 <span className="text-sm font-bold text-slate-300">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ledger */}
                  <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center shadow-inner">
                           <CreditCard className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Ledger</h3>
                     </div>

                     <div className="space-y-3.5">
                        {policyData.paymentHistory.map((payment: any, i: number) => (
                           <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[28px] border border-transparent hover:border-slate-200 hover:bg-white transition-all shadow-sm">
                              <div>
                                 <p className="text-lg font-black text-slate-900">{payment.amount}</p>
                                 <p className="text-[9px] font-bold text-slate-400 mt-0.5">{payment.type}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-bold text-slate-800">{payment.date}</p>
                                 <div className={`mt-1.5 px-2.5 py-1 rounded-lg text-[8px] font-black tracking-widest inline-block ${payment.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {payment.status}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* History */}
                  <div className="bg-[#0f172a] rounded-[40px] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                           <History className="w-5 h-5 text-violet-400" />
                        </div>
                        <h3 className="text-lg font-black text-white tracking-tight">History</h3>
                     </div>

                     <div className="space-y-3.5">
                        {policyData.renewalLogs.map((log: any, i: number) => (
                           <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-[28px] border border-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all group">
                              <div>
                                 <p className="text-[9px] font-bold text-slate-400 tracking-widest">{log.status}</p>
                                 <p className="text-[10px] font-bold text-violet-400 mt-1">Authenticated {log.date}</p>
                              </div>
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${log.verified ? 'border-violet-500/50 bg-violet-500 text-white' : 'border-white/10 text-white/20'}`}>
                                 <CheckCircle2 className="w-4 h-4" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Schedule Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-violet-50 flex items-center justify-center">
                           <Calendar className="w-5 h-5 text-violet-600" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Policy Period</h3>
                     </div>
                     <button className="p-2 bg-slate-50 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all shadow-sm border border-slate-100" title="Edit Policy Period">
                        <Edit2 className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="space-y-6">
                     {[
                        { label: 'Issue Date', value: policyData.period.issueDate, icon: Sparkles },
                        { label: 'Expiry Date', value: policyData.period.expiryDate, icon: Clock, highlight: true },
                        { label: 'Premium', value: policyData.period.premium, icon: CreditCard },
                        { label: 'Due Date', value: policyData.period.dueDate, icon: Activity }
                     ].map((item, i) => (
                        <div key={i} className={`flex justify-between items-center p-3.5 rounded-xl transition-all ${item.highlight ? 'bg-violet-50 border border-violet-100 shadow-sm' : ''}`}>
                           <div className="flex items-center gap-2.5">
                              <item.icon className={`w-3 h-3 ${item.highlight ? 'text-violet-600' : 'text-slate-300'}`} />
                              <p className="text-[10px] font-bold text-slate-400 tracking-widest">{item.label}</p>
                           </div>
                           <p className={`text-[11px] font-black ${item.highlight ? 'text-violet-700' : 'text-slate-900'}`}>{item.value}</p>
                        </div>
                     ))}
                  </div>

                  <div className="mt-10 bg-[#0f172a] rounded-[32px] p-8 relative overflow-hidden">
                     <div className="flex items-center gap-5 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl">
                           <p className="text-lg font-black text-violet-400">{policyData.nominee.substring(0, 2).toUpperCase()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-violet-400 tracking-widest mb-0.5">Secure Nominee</p>
                           <p className="text-sm font-black text-white tracking-tight">{policyData.nominee}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <p className="text-[9px] font-bold text-slate-400 tracking-widest">Beneficiary Verified</p>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-xl shadow-indigo-100 group overflow-hidden">
                  <div className="flex items-start gap-5 relative z-10">
                     <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl">
                        <ShieldCheck className="w-5 h-5 text-white" />
                     </div>
                     <div>
                        <h4 className="text-base font-black tracking-tight mb-3 leading-tight">Asset Protection Protocol</h4>
                        <p className="text-[11px] font-bold text-white/60 leading-relaxed tracking-wider">
                           Secured under primary Insurance Advisor clearing house. Institutional verification active.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PolicyDetailView;
