import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Folder,
  File,
  ShieldCheck,
  User,
  Plus
} from 'lucide-react';

const DocumentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    { id: 'DOC-001', name: 'Aadhar_Card_Rajesh.pdf', type: 'KYC', customer: 'Rajesh Kumar', size: '1.2 MB', date: '2026-05-08', status: 'Verified' },
    { id: 'DOC-002', name: 'Car_Photos_Front.jpg', type: 'Policy Docs', customer: 'Vikram Sahay', size: '2.4 MB', date: '2026-05-07', status: 'Pending' },
    { id: 'DOC-003', name: 'Medical_Report.pdf', type: 'Medical', customer: 'Anjali Sharma', size: '4.1 MB', date: '2026-05-05', status: 'Verified' },
    { id: 'DOC-004', name: 'PAN_Card.pdf', type: 'KYC', customer: 'Suresh Raina', size: '0.8 MB', date: '2026-05-01', status: 'Rejected' },
    { id: 'DOC-005', name: 'Previous_Policy.pdf', type: 'Policy Docs', customer: 'Amit Singh', size: '1.5 MB', date: '2026-04-28', status: 'Verified' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Document Repository</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage customer KYC and policy documents</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'KYC Documents', count: 124, icon: ShieldCheck, color: 'indigo' },
          { label: 'Policy Forms', count: 45, icon: FileText, color: 'blue' },
          { label: 'Medical Reports', count: 28, icon: Activity, color: 'rose' },
          { label: 'Payment Receipts', count: 89, icon: Folder, color: 'emerald' },
        ].map((cat, i) => (
          <div key={i} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className={`w-10 h-10 rounded-xl bg-${cat.color}-50 text-${cat.color}-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <cat.icon size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-800">{cat.label}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{cat.count} Files</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search file name or customer..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2">
              <button className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all">
                 <Filter size={18} />
              </button>
              <button className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all">
                 <Plus size={18} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">File Size</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {documents.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.customer.toLowerCase().includes(searchTerm.toLowerCase())).map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <File size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{doc.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{doc.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <User size={14} className="text-slate-300" />
                       <span className="text-xs font-bold text-slate-600">{doc.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-400">{doc.size}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        doc.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shadow-sm border border-transparent hover:border-indigo-100">
                          <Eye size={16} />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shadow-sm border border-transparent hover:border-indigo-100">
                          <Download size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Used: 4.2 GB / 10 GB</p>
           <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42%' }}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Mock Activity for categories
const Activity = (props: any) => <FileText {...props} />;

export default DocumentsManagement;
