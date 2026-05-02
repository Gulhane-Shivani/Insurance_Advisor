import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  BarChart3, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Clock,
  X,
  Plus,
  Mail,
  Filter,
  Check,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const OperationsReports: React.FC = () => {
  const [activeView, setActiveView] = useState<'main' | 'scheduled'>('main');
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [isBuildingReport, setIsBuildingReport] = useState(false);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

  // On-demand Export States
  const [exportTimeframe, setExportTimeframe] = useState({ from: '01 Apr 2024', to: '30 Apr 2024' });
  const [isCompiling, setIsCompiling] = useState(false);

  const reportCategories = [
    { id: 'sales', title: 'Sales Performance', desc: 'Detailed policy acquisition and revenue analytics', icon: BarChart3, color: 'blue', stats: '₹4.2Cr Revenue' },
    { id: 'renewals', title: 'Renewals Pipeline', desc: 'Predictive forecast for upcoming policy maturities', icon: ShieldCheck, color: 'emerald', stats: '88% Retention' },
    { id: 'claims', title: 'Claims Analysis', desc: 'Comprehensive audit of settlement ratios and TAT', icon: AlertCircle, color: 'red', stats: '₹12.4L Payouts' },
    { id: 'agents', title: 'Agent Productivity', desc: 'Performance benchmarking and commission trends', icon: TrendingUp, color: 'indigo', stats: '124 Active Agents' },
  ];

  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: 'Weekly Revenue Audit', frequency: 'Every Monday', recipient: 'finance-ops@company.com', status: 'Active' },
    { id: 2, name: 'Monthly Claims Summary', frequency: '1st of Month', recipient: 'admin@company.com', status: 'Active' },
    { id: 3, name: 'Daily Lead Velocity', frequency: 'Daily, 9 AM', recipient: 'sales-lead@company.com', status: 'Paused' },
  ]);

  const [newScheduleForm, setNewScheduleForm] = useState({
    name: '',
    frequency: 'Daily',
    recipient: '',
  });

  const handleExportPDF = (title: string, customScope?: string) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(99, 102, 241);
      doc.text("ANALYTICAL REPORT", 105, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(30, 41, 59);
      doc.text(title.toUpperCase(), 105, 30, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 35, 190, 35);
      
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 45);
      doc.text(`Report Scope: ${customScope || 'Full Organization (Q2 2024)'}`, 20, 52);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Executive Summary", 20, 65);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const lorem = "This report provides a comprehensive analysis of the operations within the specified period. Data is aggregated across all regional branches and sanitized for executive review. Key performance indicators show positive growth trends in alignment with annual targets.";
      doc.text(doc.splitTextToSize(lorem, 170), 20, 72);
      
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 90, 170, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.text("Metric Description", 25, 96);
      doc.text("Variance (%)", 140, 96);
      doc.text("Status", 170, 96);
      
      doc.setFont("helvetica", "normal");
      doc.text("Operational Efficiency", 25, 108);
      doc.text("+12.4%", 140, 108);
      doc.text("Optimal", 170, 108);
      
      doc.line(20, 112, 190, 112);
      
      doc.save(`${title.replace(/ /g, '_')}_Report.pdf`);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleOnDemandCompile = () => {
    setIsCompiling(true);
    const loadingToast = toast.loading(`Compiling ${selectedFormat} for timeframe ${exportTimeframe.from} - ${exportTimeframe.to}...`);
    
    setTimeout(() => {
      const success = handleExportPDF('On_Demand_Compilation', `${exportTimeframe.from} to ${exportTimeframe.to}`);
      setIsCompiling(false);
      toast.dismiss(loadingToast);
      
      if (success) {
        toast.success(`Report compiled and sent to administrator email!`, {
          icon: '📧',
          duration: 4000
        });
      } else {
        toast.error('Failed to compile report. Please check parameters.');
      }
    }, 2500);
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheduleForm.name || !newScheduleForm.recipient) {
      toast.error('Please fill all required fields');
      return;
    }

    const newReport = {
      id: Date.now(),
      name: newScheduleForm.name,
      frequency: newScheduleForm.frequency === 'Daily' ? 'Daily, 9 AM' : 
                 newScheduleForm.frequency === 'Weekly' ? 'Every Monday' : '1st of Month',
      recipient: newScheduleForm.recipient,
      status: 'Active'
    };

    setScheduledReports([newReport, ...scheduledReports]);
    setIsSchedulingModalOpen(false);
    setNewScheduleForm({ name: '', frequency: 'Daily', recipient: '' });
    toast.success('New report automation scheduled successfully');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
         <div className="relative z-10">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Operational Intelligence</h2>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Cross-Functional Analytics & Data Export</p>
         </div>
         
         <div className="flex items-center gap-2 relative z-10">
            <button 
              onClick={() => setActiveView('main')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'main' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              Real-time Analytics
            </button>
            <button 
              onClick={() => setActiveView('scheduled')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'scheduled' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              Scheduled Automations
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button 
              onClick={() => setIsBuildingReport(true)}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl active:scale-90"
              title="Build Custom Report"
            >
               <Plus className="w-5 h-5" />
            </button>
         </div>
         <FileText className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-40 h-40 text-slate-50 rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-700" />
      </div>

      {activeView === 'main' ? (
        <>
          {/* Quick Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportCategories.map((cat, i) => (
               <div key={cat.id} className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex justify-between items-start mb-4">
                     <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${
                       cat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                       cat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                       cat.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                     }`}>
                        <cat.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.stats}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">{cat.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-5">{cat.desc}</p>
                  <button 
                    onClick={() => { handleExportPDF(cat.title); toast.success(`${cat.title} PDF downloaded`); }}
                    className="w-full py-2.5 bg-slate-50 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" /> Direct Export
                  </button>
               </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
             {/* Dynamic Analysis Chart - Smaller Size */}
             <div className="lg:col-span-6 bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[440px]">
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Growth Intelligence</p>
                         <h3 className="text-xl font-black tracking-tight">Regional Variance</h3>
                      </div>
                      <div className="p-2 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">
                         <Filter className="w-4 h-4 text-indigo-300" />
                      </div>
                   </div>

                   <div className="space-y-6">
                      {[
                        { region: 'West (Mumbai)', growth: '24.2%', val: 82, color: 'indigo' },
                        { region: 'North (Delhi)', growth: '18.5%', val: 64, color: 'blue' },
                        { region: 'South (Bangalore)', growth: '32.8%', val: 91, color: 'emerald' },
                      ].map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                           <div className="flex justify-between items-end mb-2.5">
                              <div>
                                 <h4 className="text-sm font-bold tracking-tight group-hover:text-indigo-400 transition-colors">{item.region}</h4>
                                 <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Convergence: 94%</p>
                              </div>
                              <div className="text-right">
                                 <span className="text-base font-black text-white">{item.growth}</span>
                              </div>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full bg-${item.color}-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                
                <div className="mt-8 flex items-center justify-between relative z-10 pt-5 border-t border-white/5">
                   <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Refresh: Synchronized</p>
                   <button className="flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">
                      Full Audit <ArrowRight className="w-3.5 h-3.5" />
                   </button>
                </div>
                
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px]"></div>
             </div>

             {/* Export Configuration - Logic Implemented */}
             <div className="lg:col-span-6 bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <h3 className="text-base font-black text-slate-800 tracking-tight">On-demand Export</h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Compile custom data compilations</p>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                   </div>
                </div>
                
                <div className="space-y-6 flex-1">
                   <div className="space-y-5">
                      <div className="space-y-2">
                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Compilation Timeframe</label>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                               <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Start Point</p>
                               <input 
                                 type="text" 
                                 value={exportTimeframe.from} 
                                 onChange={(e) => setExportTimeframe({...exportTimeframe, from: e.target.value})}
                                 className="w-full bg-transparent text-[11px] font-black text-slate-800 outline-none" 
                               />
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                               <p className="text-[8px] font-black text-slate-400 uppercase mb-1">End Point</p>
                               <input 
                                 type="text" 
                                 value={exportTimeframe.to} 
                                 onChange={(e) => setExportTimeframe({...exportTimeframe, to: e.target.value})}
                                 className="w-full bg-transparent text-[11px] font-black text-slate-800 outline-none" 
                               />
                            </div>
                         </div>
                      </div>
                      
                      <div className="space-y-2">
                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Export Encoding Format</label>
                         <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                            {['PDF', 'XLSX', 'CSV'].map(fmt => (
                               <button 
                                 key={fmt}
                                 onClick={() => setSelectedFormat(fmt)}
                                 className={`flex-1 py-2.5 text-[10px] font-black rounded-xl transition-all ${selectedFormat === fmt ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                               >
                                  {fmt}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="p-5 bg-indigo-50/50 rounded-[28px] border border-indigo-100/50 flex items-start gap-4 animate-in fade-in duration-500">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                         <Mail className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Automatic Dispatch</p>
                         <p className="text-[10px] text-indigo-700/70 font-medium leading-relaxed mt-1">Compilation will be securely routed to <span className="font-bold text-indigo-900 underline">ops-manager@company.com</span> upon completion.</p>
                      </div>
                   </div>
                </div>

                <button 
                  onClick={handleOnDemandCompile}
                  disabled={isCompiling}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 mt-8 flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                   {isCompiling ? (
                      <Clock className="w-4 h-4 animate-spin" />
                   ) : (
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   )}
                   {isCompiling ? 'Compiling Intelligence...' : 'Compile & Send Report'}
                </button>
             </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-10 duration-500">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                 <Clock className="w-5 h-5 text-indigo-600" /> Active Scheduling Matrix
              </h3>
              <button 
                onClick={() => setIsSchedulingModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                 <Plus className="w-4 h-4" /> New Schedule
              </button>
           </div>
           
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50">
                       <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Report Name</th>
                       <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Cadence</th>
                       <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Recipient</th>
                       <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                       <th className="px-8 py-4 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {scheduledReports.map((report) => (
                       <tr key={report.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-8 py-5">
                             <h4 className="text-[13px] font-black text-slate-800">{report.name}</h4>
                             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">System Automation</p>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2 text-slate-600">
                                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                                <span className="text-[11px] font-black">{report.frequency}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2 text-slate-600">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-[11px] font-bold">{report.recipient}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                report.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'
                             }`}>
                                {report.status}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-center items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Automated reporting systems are operational and stable</p>
           </div>
        </div>
      )}

      {/* Scheduling Modal */}
      {isSchedulingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
              <div className="bg-slate-900 p-8 text-white">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h3 className="text-2xl font-black tracking-tight">Automation Engine</h3>
                       <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1">Schedule recurring operational reports</p>
                    </div>
                    <button onClick={() => setIsSchedulingModalOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5" /></button>
                 </div>
              </div>

              <form onSubmit={handleAddSchedule} className="p-8 space-y-6">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Report Description</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Weekly Sales Summary"
                      value={newScheduleForm.name}
                      onChange={(e) => setNewScheduleForm({...newScheduleForm, name: e.target.value})}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-50" 
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Frequency</label>
                       <select 
                         value={newScheduleForm.frequency}
                         onChange={(e) => setNewScheduleForm({...newScheduleForm, frequency: e.target.value})}
                         className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 outline-none"
                       >
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Encoding</label>
                       <div className="h-[46px] px-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800">PDF</span>
                          <Check className="w-4 h-4 text-emerald-500" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipient Email</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                         type="email" 
                         required
                         placeholder="manager@company.com"
                         value={newScheduleForm.recipient}
                         onChange={(e) => setNewScheduleForm({...newScheduleForm, recipient: e.target.value})}
                         className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-50" 
                       />
                    </div>
                 </div>

                 <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsSchedulingModalOpen(false)}
                      className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                       Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] py-4 bg-indigo-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                    >
                       Confirm Schedule
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Intelligence Builder Modal */}
      {isBuildingReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
              <div className="bg-slate-900 p-8 text-white">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h3 className="text-2xl font-black tracking-tight">Intelligence Builder</h3>
                       <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1">Configure deep-dive operational audit</p>
                    </div>
                    <button onClick={() => setIsBuildingReport(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5" /></button>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-3">
                    {['Performance', 'Auditing', 'Financial'].map(tag => (
                      <div key={tag} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-[9px] font-black uppercase tracking-widest text-white/60">{tag}</div>
                    ))}
                 </div>
              </div>

              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data Source Aggregation</label>
                    <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-50">
                       <option>Full System Multi-Channel Analysis</option>
                       <option>Lead Conversion Pipeline</option>
                       <option>Claims Settlement Efficiency</option>
                       <option>Agent Commission Audit</option>
                    </select>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Regional Scope</label>
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800">All Regions</span>
                          <Filter className="w-4 h-4 text-slate-400" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visualization</label>
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800">Enhanced BI Charts</span>
                          <BarChart3 className="w-4 h-4 text-indigo-400" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 flex gap-3">
                    <button 
                      onClick={() => setIsBuildingReport(false)}
                      className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                       Discard
                    </button>
                    <button 
                      onClick={() => {
                         toast.loading('Synthesizing intelligence data...', { duration: 2000 });
                         setTimeout(() => {
                            handleExportPDF('Custom Intelligence Builder');
                            setIsBuildingReport(false);
                         }, 2000);
                      }}
                      className="flex-[2] py-4 bg-indigo-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                    >
                       Synthesize & Export
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OperationsReports;
