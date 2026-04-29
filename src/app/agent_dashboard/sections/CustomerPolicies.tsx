/* src/app/agent_dashboard/sections/CustomerPolicies.tsx */
import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, FileText, Download, ChevronDown, ChevronUp, 
  User, Mail, Phone, MapPin, ExternalLink, Calendar, Plus, Filter, Search
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const initialPolicies = [
  { 
    id: '1', 
    customer: 'Amitabh Bachchan', 
    type: 'Term Life Insurance', 
    premium: '₹45,000/yr', 
    renewal: '2026-05-15', 
    status: 'Active', 
    insurer: 'HDFC Life', 
    sumAssured: '₹2.5 Crore',
    policyNo: 'HL-77889922',
    phone: '+91 98000 11111',
    email: 'amitabh@bollywood.com'
  },
  { 
    id: '2', 
    customer: 'Sachin Tendulkar', 
    type: 'Car - Comprehensive', 
    premium: '₹18,500/yr', 
    renewal: '2026-05-20', 
    status: 'Renewal Due', 
    insurer: 'ICICI Lombard',
    sumAssured: '₹15 Lakh (IDV)',
    policyNo: 'IL-99003344',
    phone: '+91 98000 22222',
    email: 'sachin@cricket.com'
  },
  { 
    id: '3', 
    customer: 'Deepika Padukone', 
    type: 'Family Floater Health', 
    premium: '₹22,000/yr', 
    renewal: '2026-06-10', 
    status: 'Active', 
    insurer: 'Star Health',
    sumAssured: '₹10 Lakh',
    policyNo: 'SH-44556677',
    phone: '+91 98000 33333',
    email: 'deepika@film.com'
  },
];

const CustomerPolicies: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPolicies = initialPolicies.filter(p => 
    p.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.policyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (policyNo: string) => {
    toast.loading('Generating Policy Document...', { duration: 1500 });
    setTimeout(() => {
      toast.success(`Policy ${policyNo} downloaded successfully!`);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-emerald-50 border-emerald-100 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Books</p>
                <h4 className="text-2xl font-black text-emerald-900">142</h4>
              </div>
           </div>
        </Card>
        <Card className="p-6 bg-amber-50 border-amber-100 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <AlertCircle className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Renewals (30d)</p>
                <h4 className="text-2xl font-black text-amber-900">18</h4>
              </div>
           </div>
        </Card>
        <Card className="p-6 bg-slate-900 text-white border-none shadow-xl col-span-1 md:col-span-2">
           <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Assets Under Management</p>
                <h4 className="text-3xl font-black">₹4.2 Crore</h4>
              </div>
              <Button variant="primary" size="sm" icon={<Plus size={16} />}>Issue Policy</Button>
           </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by customer name or policy number..." 
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-[20px] text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" icon={<Filter size={18} />}>Filters</Button>
      </div>

      {/* Policies List */}
      <div className="space-y-4">
        {filteredPolicies.map((item) => (
          <Card key={item.id} className="overflow-hidden border-none shadow-xl shadow-slate-200/40">
            <div 
              className={`p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all duration-300 ${expandedId === item.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm relative group-hover:scale-105 transition-transform">
                   <User size={28} className="text-slate-300" />
                   <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${item.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      {item.status === 'Active' ? <ShieldCheck size={10} className="text-white" /> : <AlertCircle size={10} className="text-white" />}
                   </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-800 text-lg tracking-tight">{item.customer}</h4>
                    <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-black text-slate-500 rounded uppercase tracking-tighter">{item.policyNo}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs font-bold text-indigo-600 flex items-center gap-1"><ShieldCheck size={12} /> {item.type}</p>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1"><Calendar size={12} /> Renewal: {item.renewal}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200">
                <div className="text-left lg:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Premium</p>
                  <p className="text-sm font-black text-slate-800">{item.premium}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{item.status}</span>
                  <div className={`p-2 rounded-xl transition-transform ${expandedId === item.id ? 'rotate-180 bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            </div>

            {expandedId === item.id && (
              <div className="px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-4 duration-500 bg-slate-50 border-t border-slate-100">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Policy Summary</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">Insurer:</span>
                      <span className="text-xs font-black text-slate-800">{item.insurer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">Sum Assured:</span>
                      <span className="text-xs font-black text-indigo-600">{item.sumAssured}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">Frequency:</span>
                      <span className="text-xs font-black text-slate-800">Yearly</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Contact Info</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                       <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 border border-slate-200"><Phone size={14} /></div>
                       {item.phone}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                       <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 border border-slate-200"><Mail size={14} /></div>
                       {item.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-3">
                   <Button variant="primary" size="sm" icon={<Download size={14} />} onClick={() => handleDownload(item.policyNo)}>Download Policy PDF</Button>
                   <Button variant="outline" size="sm" icon={<ExternalLink size={14} />}>View 360° Profile</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerPolicies;
