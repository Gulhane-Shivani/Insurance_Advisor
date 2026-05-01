import React, { useState } from 'react';
import { ClipboardList, Plus, CheckCircle2, Clock, MessageSquare, ArrowLeft, Info, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ServiceRequests: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [requests, setRequests] = useState([
    {
      id: 'SR-1002',
      type: 'Nominee Change',
      policy: 'Jeevan Anand Life',
      date: 'Apr 20, 2024',
      status: 'Open',
      lastUpdate: '1 day ago'
    },
    {
      id: 'SR-0985',
      type: 'Address Update',
      policy: 'Global Health Secure',
      date: 'Mar 12, 2024',
      status: 'Completed',
      lastUpdate: 'Mar 15, 2024'
    }
  ]);

  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const policy = formData.get('policy') as string;
    
    toast.loading('Raising service request...', { duration: 1500 });
    
    setTimeout(() => {
      const newRequest = {
        id: `SR-${Math.floor(1000 + Math.random() * 9000)}`,
        type: activeForm || 'General',
        policy: policy.split(' (')[0], // Extract just the name
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Open',
        lastUpdate: 'Just now'
      };

      setRequests(prev => [newRequest, ...prev]);
      toast.success(`${activeForm} request raised successfully`);
      setActiveForm(null);
    }, 1500);
  };

  const types = [
    { name: 'Nominee Change', icon: '👤', description: 'Update or add a nominee to your policy.' },
    { name: 'Address Change', icon: '🏠', description: 'Update your permanent or communication address.' },
    { name: 'Mobile/Email Update', icon: '📱', description: 'Change your contact details for notifications.' },
    { name: 'Duplicate ID Card', icon: '🆔', description: 'Request a physical copy of your insurance card.' },
    { name: 'Bank Details Update', icon: '🏦', description: 'Change account for premium auto-debit.' },
    { name: 'Policy Correction', icon: '✍️', description: 'Correct errors in name, DOB or other details.' },
  ];

  if (activeForm) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveForm(null)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">New Request</span>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">{activeForm}</h1>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 max-w-2xl">
           <form className="space-y-6" onSubmit={handleNewRequest}>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Policy</label>
                 <select name="policy" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-blue-50">
                    <option>HDFC Ergo Health (POL-12345)</option>
                    <option>LIC Life (POL-44556)</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Details / Remarks</label>
                 <textarea 
                   name="remarks"
                   rows={4}
                   placeholder={`Provide details for ${activeForm}...`}
                   className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50"
                   required
                 />
              </div>

              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-start gap-4">
                 <Info className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Supporting documents may be required. Our customer service executive will reach out to you within 24 business hours if any additional information is needed.
                 </p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-50">
                <button type="button" onClick={() => setActiveForm(null)} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Submit Request
                </button>
              </div>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Service Requests</h1>
          <p className="text-slate-500 font-medium text-sm">Need to make changes? Raise a service request quickly.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
           <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
           {requests.filter(r => r.status === 'Open').length} Request in Progress
        </div>
      </div>

      {/* Request Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {types.map((type, i) => (
           <button 
             key={i} 
             onClick={() => setActiveForm(type.name)}
             className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all text-left group"
           >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                 {type.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                {type.name}
                <Plus className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{type.description}</p>
           </button>
         ))}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
             <ClipboardList className="w-5 h-5 text-blue-600" />
             My Service Requests
           </h3>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request Type</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Activity</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {requests.map((request) => (
                   <tr key={request.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => toast.success(`Viewing updates for ${request.id}`)}>
                      <td className="px-8 py-5 text-xs font-bold text-slate-400">{request.id}</td>
                      <td className="px-8 py-5 text-xs font-bold text-slate-800">{request.type}</td>
                      <td className="px-8 py-5 text-xs font-medium text-slate-500">{request.policy}</td>
                      <td className="px-8 py-5 text-xs font-medium text-slate-500">{request.date}</td>
                      <td className="px-8 py-5">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                           request.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                         }`}>
                           {request.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                           {request.status}
                         </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <button className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                           <MessageSquare className="w-3.5 h-3.5" />
                           {request.lastUpdate}
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequests;
