import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, ChevronRight, Upload, Activity, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Claims: React.FC = () => {
  const [showFileForm, setShowFileForm] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [claims, setClaims] = useState([
    {
      id: 'CLM-90210',
      policy: 'Auto Safe Car Insurance',
      type: 'Accidental Damage',
      date: 'Mar 15, 2024',
      status: 'In Review',
      amount: '₹45,000',
      stage: 2, 
      insurer: 'Tata AIG'
    },
    {
      id: 'CLM-88432',
      policy: 'Optima Secure Health',
      type: 'Hospitalization',
      date: 'Jan 10, 2024',
      status: 'Settled',
      amount: '₹1,20,000',
      stage: 4,
      insurer: 'HDFC Ergo'
    }
  ]);

  const handleFileClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const policyFull = formData.get('policy') as string;
    
    toast.loading('Submitting claim request...', { duration: 2000 });
    
    setTimeout(() => {
      const newClaim = {
        id: 'CLM-' + Math.floor(10000 + Math.random() * 90000),
        policy: policyFull.split(' (')[0],
        type: 'General Claim',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'In Review',
        amount: '₹0 (TBD)',
        stage: 1,
        insurer: policyFull.includes('HDFC') ? 'HDFC Ergo' : 'LIC India'
      };

      setClaims(prev => [newClaim, ...prev]);
      toast.success('Claim filed successfully! Reference ID: ' + newClaim.id);
      setShowFileForm(false);
    }, 2000);
  };

  const handleUploadDocs = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e: any) => {
      const files = e.target.files;
      if (files.length > 0) {
        toast.success(`${files.length} documents uploaded for verification`);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-orange-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Claim Assistance</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Claims Center</h1>
           <p className="text-slate-500 font-medium mt-1 text-sm">Track active claims or file a new reimbursement request.</p>
        </div>
        <button 
          onClick={() => setShowFileForm(true)}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 group"
        >
           <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
           File New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Claims Column */}
        <div className="lg:col-span-8 space-y-6">
           {claims.filter(c => c.status !== 'Settled').map(claim => (
             <div key={claim.id} className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden group hover:border-blue-200 transition-all">
                <div className="p-8">
                   <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                            {claim.type === 'Hospitalization' ? '🏥' : claim.type.includes('Car') ? '🚗' : '📄'}
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-0.5">
                               <h3 className="text-lg font-black text-slate-900 leading-tight">{claim.type}</h3>
                               <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-blue-100">Active</span>
                            </div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{claim.insurer} • {claim.id}</p>
                         </div>
                      </div>
                      <div className="text-left md:text-right">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Settlement</p>
                         <p className="text-2xl font-black text-slate-900">{claim.amount}</p>
                      </div>
                   </div>

                   {/* Progress Tracker */}
                   <div className="relative mb-6 pt-1">
                      <div className="flex justify-between relative z-10">
                         {['Submitted', 'Verified', 'Approved', 'Settled'].map((step, i) => {
                           const isActive = i + 1 <= claim.stage;
                           const isCurrent = i + 1 === claim.stage;
                           return (
                             <div key={step} className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 ${
                                  isActive ? 'bg-blue-600 border-blue-100 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'
                                } ${isCurrent ? 'ring-4 ring-blue-50 animate-pulse' : ''}`}>
                                   {i + 1 < claim.stage ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-black">{i + 1}</span>}
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>
                                   {step}
                                </span>
                             </div>
                           );
                         })}
                      </div>
                      <div className="absolute top-[18px] left-0 w-full h-[4px] bg-slate-50 -z-0 rounded-full"></div>
                      <div className="absolute top-[18px] left-0 h-[4px] bg-blue-600 -z-0 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" style={{ width: `${((claim.stage - 1) / 3) * 100}%` }}></div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-slate-50 mt-8">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <Activity className="w-4 h-4 text-emerald-600" />
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-slate-900 leading-tight">Verification Stage</p>
                            <p className="text-[10px] font-medium text-slate-400">Reviewing discharge summary.</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setSelectedClaim(claim)}
                        className="w-full sm:w-auto px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                         Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
             </div>
           ))}

           {/* History List */}
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-7 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-lg font-black text-slate-900">Claim History</h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Case ID</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                          <th className="px-7 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Settlement</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {claims.map((claim) => (
                         <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedClaim(claim)}>
                            <td className="px-7 py-5 text-[11px] font-bold text-slate-500">#{claim.id}</td>
                            <td className="px-7 py-5">
                               <p className="text-[12px] font-bold text-slate-900">{claim.policy}</p>
                               <p className="text-[9px] font-medium text-slate-400">{claim.type}</p>
                            </td>
                            <td className="px-7 py-5 text-center">
                               <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                                 claim.status === 'Settled' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                               }`}>
                                  {claim.status}
                               </span>
                            </td>
                            <td className="px-7 py-5 text-right">
                               <p className="text-[12px] font-black text-slate-900">{claim.amount}</p>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Support Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-orange-50 rounded-[32px] border border-orange-100 p-7">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-5">
                 <Upload className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight">Claim Support</h3>
              <p className="text-slate-600 text-[11px] font-medium leading-relaxed mb-6">
                 Our dedicated support team is available 24/7 to help you with verification.
              </p>
              <a 
                href="tel:18002005555"
                className="w-full py-3.5 bg-white text-orange-600 rounded-xl border border-orange-200 font-black text-[10px] uppercase tracking-widest hover:bg-orange-100 transition-all flex items-center justify-center"
              >
                 Call Claim Expert
              </a>
           </div>

           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-7">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Claim Checklist</h3>
              <div className="space-y-3.5">
                 {[
                   'Policy Document (PDF)',
                   'Identification Proof',
                   'Original Hospital Bills',
                   'Discharge Summary'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-700">
                      <div className="w-4 h-4 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                         <CheckCircle2 className="w-2.5 h-2.5" />
                      </div>
                      {item}
                   </div>
                 ))}
              </div>
              <button 
                onClick={handleUploadDocs}
                className="w-full mt-8 py-4 bg-slate-50 text-slate-400 rounded-xl font-black text-[9px] uppercase tracking-widest border border-dashed border-slate-200"
              >
                 Upload Documents
              </button>
           </div>
        </div>
      </div>

      {showFileForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
              <div className="p-10">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-slate-900">File New Claim</h2>
                    <button onClick={() => setShowFileForm(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                       <Plus className="w-6 h-6 text-slate-400 rotate-45" />
                    </button>
                 </div>
                 <form className="space-y-8" onSubmit={handleFileClaim}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Policy</label>
                        <select name="policy" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-blue-50">
                          <option>Optima Secure Health (POL-12345)</option>
                          <option>Auto Safe Car Insurance (POL-67890)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Date</label>
                        <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nature of Claim</label>
                      <textarea 
                        rows={3}
                        placeholder="Describe the incident..."
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50"
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setShowFileForm(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Discard</button>
                      <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all">Submit Claim</button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Claims;
