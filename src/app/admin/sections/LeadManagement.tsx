import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  TrendingUp,
  Clock,
  X,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState([
    { name: 'Rohan Mehta', product: 'Term Life', source: 'Web Inquiry', status: 'Hot', agent: 'Sneha K.', date: '10m ago' },
    { name: 'Vikram Singh', product: 'Comprehensive Car', source: 'Referral', status: 'Warm', agent: 'Amit D.', date: '1h ago' },
    { name: 'Anjali Gupta', product: 'Family Health', source: 'Social Media', status: 'Cold', agent: 'Unassigned', date: '3h ago' },
    { name: 'Karan Malhotra', product: 'Business Liability', source: 'Web Inquiry', status: 'Hot', agent: 'Rahul V.', date: '5h ago' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    product: 'Term Life',
    source: 'Web Inquiry',
    status: 'Warm',
    agent: 'Unassigned'
  });

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.agent.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  const handleExportData = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(99, 102, 241);
      doc.text("LEAD PIPELINE EXPORT", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 28, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 35, 190, 35);
      
      // Table Header
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 45, 170, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text("LEAD NAME", 25, 51);
      doc.text("PRODUCT", 70, 51);
      doc.text("SOURCE", 110, 51);
      doc.text("STATUS", 145, 51);
      doc.text("AGENT", 170, 51);
      
      // Table Rows
      doc.setFont("helvetica", "normal");
      let currentY = 62;
      filteredLeads.forEach((lead) => {
        doc.text(lead.name, 25, currentY);
        doc.text(lead.product, 70, currentY);
        doc.text(lead.source, 110, currentY);
        doc.text(lead.status, 145, currentY);
        doc.text(lead.agent, 170, currentY);
        currentY += 10;
        doc.setDrawColor(241, 245, 249);
        doc.line(20, currentY - 6, 190, currentY - 6);
      });
      
      doc.save(`Lead_Pipeline_${new Date().getTime()}.pdf`);
      toast.success('Lead data exported as PDF');
    } catch (err) {
      toast.error('Failed to export lead data');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      ...formData,
      date: 'Just now'
    };
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
    setFormData({ name: '', product: 'Term Life', source: 'Web Inquiry', status: 'Warm', agent: 'Unassigned' });
    toast.success('Lead added to pipeline');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'New Leads', val: '24', trend: '+12%', color: 'blue' },
          { label: 'Active Pipeline', val: '142', trend: '+5%', color: 'indigo' },
          { label: 'Avg. Conv. Time', val: '4.2 Days', trend: '-8%', color: 'emerald' },
          { label: 'Lost Leads', val: '12', trend: '-2%', color: 'rose' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <TrendingUp className={`w-3 h-3 text-${s.color}-500`} />
             </div>
             <h3 className="text-xl font-black text-slate-800">{s.val}</h3>
             <p className="text-[9px] font-bold text-emerald-600 mt-1">{s.trend} vs last week</p>
          </div>
        ))}
      </div>

      {/* Lead Management Table */}
      <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
           <div>
              <h3 className="text-base font-black text-slate-800">Lead Pipeline</h3>
              <p className="text-[11px] text-slate-500 font-medium">Distribute and track leads across the sales team</p>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search leads..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium w-48 outline-none focus:border-indigo-500 transition-all"
                 />
              </div>
              <button 
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                title="Export Leads"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-md shadow-indigo-100 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Lead
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Lead Name</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Interested Product</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Assigned Agent</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-600">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-[12px] font-bold text-slate-800">{lead.name}</p>
                          <p className="text-[9px] text-slate-400 font-medium">{lead.source}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-bold text-slate-600">{lead.product}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                      lead.status === 'Hot' ? 'bg-rose-50 text-rose-600' :
                      lead.status === 'Warm' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${lead.agent === 'Unassigned' ? 'bg-slate-300' : 'bg-emerald-500'}`} />
                       <span className="text-[11px] font-bold text-slate-700">{lead.agent}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                       <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"><Phone className="w-3.5 h-3.5" /></button>
                       <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"><Mail className="w-3.5 h-3.5" /></button>
                       <button className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors"><MoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-5 py-10 text-center text-slate-400 text-[11px] font-bold">No leads found matching "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
           <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-800 transition-colors">
             <Clock className="w-3.5 h-3.5" /> View Full Pipeline History
           </button>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">Add New Lead</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lead Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" 
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Product</label>
                  <select 
                    name="product" 
                    value={formData.product} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Term Life</option>
                    <option>Comprehensive Car</option>
                    <option>Family Health</option>
                    <option>Business Liability</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Source</label>
                  <select 
                    name="source" 
                    value={formData.source} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Web Inquiry</option>
                    <option>Referral</option>
                    <option>Social Media</option>
                    <option>Cold Call</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Hot</option>
                    <option>Warm</option>
                    <option>Cold</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assign To</label>
                  <select 
                    name="agent" 
                    value={formData.agent} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Unassigned</option>
                    <option>Sneha K.</option>
                    <option>Amit D.</option>
                    <option>Rahul V.</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
