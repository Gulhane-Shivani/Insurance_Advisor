/* src/app/agent_dashboard/sections/CustomerPolicies.tsx */
import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, AlertCircle, Download, ChevronDown, 
  User, Mail, Phone, ExternalLink, Calendar, Plus, Filter, Search, X, Check
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

interface CustomerPoliciesProps {
  onViewProfile?: (customer: any) => void;
}

const initialPolicies = [
  { 
    id: '1', 
    customer: 'Rajesh Kumar', 
    type: 'Term Life Insurance', 
    premium: '₹45,000/yr', 
    renewal: '2026-05-15', 
    status: 'Active', 
    insurer: 'HDFC Life', 
    sumAssured: '₹2.5 Crore',
    policyNo: 'HL-77889922',
    phone: '+91 98000 11111',
    email: 'rajesh.k@email.com'
  },
  { 
    id: '2', 
    customer: 'Sunil Gupta', 
    type: 'Car - Comprehensive', 
    premium: '₹18,500/yr', 
    renewal: '2026-05-20', 
    status: 'Renewal Due', 
    insurer: 'ICICI Lombard',
    sumAssured: '₹15 Lakh (IDV)',
    policyNo: 'IL-99003344',
    phone: '+91 98000 22222',
    email: 'sunil.g@email.com'
  },
  { 
    id: '3', 
    customer: 'Anjali Sharma', 
    type: 'Family Floater Health', 
    premium: '₹22,000/yr', 
    renewal: '2026-06-10', 
    status: 'Active', 
    insurer: 'Star Health',
    sumAssured: '₹10 Lakh',
    policyNo: 'SH-44556677',
    phone: '+91 98000 33333',
    email: 'anjali.s@email.com'
  },
];

const CustomerPolicies: React.FC<CustomerPoliciesProps> = ({ onViewProfile }) => {
  const [policies, setPolicies] = useState(initialPolicies);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    customer: '', type: 'Term Life Insurance', premium: '', insurer: '', sumAssured: '', phone: '', email: ''
  });

  const filteredPolicies = useMemo(() => {
    return policies.filter(p => {
      const matchesSearch = p.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.policyNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [policies, searchTerm, filterStatus]);

  const handleDownload = (policy: any) => {
    try {
      const doc = new jsPDF();
      
      // Branding
      doc.setFontSize(22);
      doc.setTextColor(99, 102, 241);
      doc.text("INSURANCE ADVISOR", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("Official Policy Schedule & Certificate", 105, 28, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 35, 190, 35);
      
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      
      let currentY = 50;
      const addField = (label: string, value: string) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, 30, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(value, 80, currentY);
        currentY += 12;
      };

      addField("Policy Number", policy.policyNo);
      addField("Policy Holder", policy.customer);
      addField("Policy Type", policy.type);
      addField("Insurer Name", policy.insurer);
      addField("Sum Assured", policy.sumAssured);
      addField("Premium Amount", policy.premium);
      addField("Renewal Date", policy.renewal);
      addField("Status", policy.status.toUpperCase());
      
      currentY += 10;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(25, currentY - 8, 160, 25, 3, 3, 'F');
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Digital Verification Code:", 35, currentY + 8);
      doc.setTextColor(99, 102, 241);
      doc.text(`IA-${policy.policyNo.split('-')[1]}`, 140, currentY + 8);
      
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("This document is a system-generated policy schedule. Valid across all regulatory authorities.", 105, 160, { align: 'center' });
      doc.text(`Authenticated by Agent Pro on ${new Date().toLocaleString()}`, 105, 166, { align: 'center' });

      doc.save(`Policy_${policy.policyNo}.pdf`);
      toast.success(`PDF for ${policy.policyNo} downloaded`);
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const handleIssuePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const policy = {
      ...newPolicy,
      id: Date.now().toString(),
      policyNo: `NEW-${Math.floor(10000000 + Math.random() * 90000000)}`,
      renewal: '2027-05-01',
      status: 'Active'
    } as any;
    setPolicies([policy, ...policies]);
    setIsIssueModalOpen(false);
    toast.success('Policy issued successfully');
    setNewPolicy({ customer: '', type: 'Term Life Insurance', premium: '', insurer: '', sumAssured: '', phone: '', email: '' });
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
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => setIsIssueModalOpen(true)}>Issue Policy</Button>
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
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-[20px] text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50/5 focus:border-indigo-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
           <Button variant="outline" icon={<Filter size={18} />} onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
             Filters {filterStatus !== 'All' && <span className="ml-1 w-2 h-2 bg-indigo-500 rounded-full"></span>}
           </Button>
           
           {isFilterMenuOpen && (
             <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Status Filter</p>
                {['All', 'Active', 'Renewal Due'].map(status => (
                  <button 
                    key={status}
                    onClick={() => { setFilterStatus(status); setIsFilterMenuOpen(false); }}
                    className={`w-full px-4 py-2.5 text-xs font-bold text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${filterStatus === status ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600'}`}
                  >
                    {status}
                    {filterStatus === status && <Check size={14} />}
                  </button>
                ))}
             </div>
           )}
        </div>
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
                   <Button variant="primary" size="sm" icon={<Download size={14} />} onClick={() => handleDownload(item)}>Download PDF</Button>
                   <Button variant="outline" size="sm" icon={<ExternalLink size={14} />} onClick={() => onViewProfile && onViewProfile(item)}>View Profile</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Issue Policy Modal */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Issue New Policy</h3>
              <button onClick={() => setIsIssueModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm"><X size={20} /></button>
            </div>
            <form onSubmit={handleIssuePolicy} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Customer Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.customer} onChange={e => setNewPolicy({...newPolicy, customer: e.target.value})} placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone</label>
                    <input required type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.phone} onChange={e => setNewPolicy({...newPolicy, phone: e.target.value})} placeholder="+91..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email</label>
                    <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.email} onChange={e => setNewPolicy({...newPolicy, email: e.target.value})} placeholder="john@email.com" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Policy Type</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.type} onChange={e => setNewPolicy({...newPolicy, type: e.target.value})}>
                      <option>Term Life Insurance</option>
                      <option>Family Floater Health</option>
                      <option>Car - Comprehensive</option>
                      <option>Business Liability</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Insurer</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.insurer} onChange={e => setNewPolicy({...newPolicy, insurer: e.target.value})} placeholder="e.g. HDFC Life" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Premium</label>
                       <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.premium} onChange={e => setNewPolicy({...newPolicy, premium: e.target.value})} placeholder="e.g. ₹25,000/yr" />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sum Assured</label>
                       <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-indigo-500 outline-none" value={newPolicy.sumAssured} onChange={e => setNewPolicy({...newPolicy, sumAssured: e.target.value})} placeholder="e.g. ₹1 Crore" />
                     </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsIssueModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200">Issue Policy Document</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPolicies;
