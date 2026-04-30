import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  BarChart3, 
  PieChart, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const OperationsReports: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const reportTypes = [
    { title: 'Sales Performance', desc: 'Monthly policy sales and revenue analysis', icon: BarChart3, color: 'blue' },
    { title: 'Renewals Pipeline', desc: 'Forecast of upcoming policy renewals', icon: ShieldCheck, color: 'emerald' },
    { title: 'Claims Summary', desc: 'Overview of settlement ratios and pending claims', icon: AlertCircle, color: 'red' },
    { title: 'Agent Productivity', desc: 'Detailed metrics on agent performance', icon: TrendingUp, color: 'indigo' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Report Hero */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl font-black text-slate-800 mb-3 text-pretty">Advanced Analytical Reporting</h2>
          <p className="text-slate-500 font-medium mb-6 text-base">Generate comprehensive operational reports with deep-dive analytics and multiple export formats.</p>
          
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => toast.success('Opening custom report builder...')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-1.5">
              Generate Custom Report <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => toast.success('Loading scheduled reports...')} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
              Scheduled Reports
            </button>
          </div>
        </div>
        
        <FileText className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-48 h-48 text-slate-50 rotate-12" />
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all group cursor-pointer shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
              report.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              report.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
              report.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <report.icon className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1.5">{report.title}</h4>
            <p className="text-xs text-slate-500 font-medium mb-5">{report.desc}</p>
            <button onClick={() => toast.success(`${report.title} PDF export initiated.`)} className="w-full py-2.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> PDF Export
            </button>
          </div>
        ))}
      </div>

      {/* Advanced Analysis Block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-[28px] p-8 text-white shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-xl font-black mb-5">Regional Growth Metrics</h3>
              <div className="space-y-6">
                {[
                  { region: 'West (Mumbai/Pune)', growth: '24%', val: 85 },
                  { region: 'North (Delhi/NCR)', growth: '18%', val: 68 },
                  { region: 'South (Bangalore/Chennai)', growth: '32%', val: 92 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-base font-bold">{item.region}</p>
                          <p className="text-[10px] text-indigo-400 font-medium mt-0.5 uppercase tracking-wider">Growth Index: High</p>
                       </div>
                       <div className="text-right">
                          <span className="text-xl font-black text-indigo-400">+{item.growth}</span>
                       </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           <PieChart className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/5" />
        </div>

        <div className="bg-white rounded-[28px] border border-slate-200 p-8 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800">Custom Export</h3>
              <Calendar className="w-5 h-5 text-slate-400" />
           </div>
           
           <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Start Date</label>
                    <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-indigo-500" />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">End Date</label>
                    <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-indigo-500" />
                 </div>
              </div>
              
              <div className="space-y-1.5">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Format</label>
                 <div className="flex gap-3">
                    {['XLSX', 'PDF', 'CSV'].map(fmt => (
                      <button 
                        key={fmt} 
                        onClick={() => setSelectedFormat(fmt)}
                        className={`flex-1 py-2.5 border rounded-lg text-[10px] font-black transition-all ${
                          selectedFormat === fmt 
                            ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
                            : 'border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                 </div>
              </div>

              <button onClick={() => toast.success(`Report generated in ${selectedFormat} and emailed.`)} className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-2">
                 Generate & Email Report
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsReports;
