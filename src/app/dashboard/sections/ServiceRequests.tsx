import React from 'react';
import { ClipboardList, Plus, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

const ServiceRequests: React.FC = () => {
  const requests = [
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
  ];

  const types = [
    { name: 'Nominee Change', icon: '👤', description: 'Update or add a nominee to your policy.' },
    { name: 'Address Change', icon: '🏠', description: 'Update your permanent or communication address.' },
    { name: 'Mobile/Email Update', icon: '📱', description: 'Change your contact details for notifications.' },
    { name: 'Duplicate ID Card', icon: '🆔', description: 'Request a physical copy of your insurance card.' },
    { name: 'Bank Details Update', icon: '🏦', description: 'Change account for premium auto-debit.' },
    { name: 'Policy Correction', icon: '✍️', description: 'Correct errors in name, DOB or other details.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Service Requests</h1>
          <p className="text-slate-500 font-medium text-sm">Need to make changes? Raise a service request quickly.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
           <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
           1 Request in Progress
        </div>
      </div>

      {/* Request Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {types.map((type, i) => (
           <button key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all text-left group">
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
                   <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
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
