/* src/app/agent_dashboard/sections/CommissionStatement.tsx */
import React, { useState, useMemo } from 'react';
import { 
  Wallet, Download, 
  Calendar, ChevronRight, ArrowUpRight, Search, Filter, X, Check
} from 'lucide-react';
import { Card, Button } from '../../../components/agent/UI';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const initialHistory = [
  { id: '1', date: '2026-04-25', policy: 'Rajesh Kumar (Life)', type: 'New Business', amount: '₹12,400', status: 'Processed', month: 'April' },
  { id: '2', date: '2026-04-22', policy: 'Sunil Gupta (Car)', type: 'Renewal', amount: '₹3,200', status: 'Pending', month: 'April' },
  { id: '3', date: '2026-04-18', policy: 'Anjali Sharma (Health)', type: 'New Business', amount: '₹6,800', status: 'Processed', month: 'April' },
  { id: '4', date: '2026-04-10', policy: 'Rahul Verma (Life)', type: 'New Business', amount: '₹15,000', status: 'Processed', month: 'April' },
  { id: '5', date: '2026-04-05', policy: 'Priya Sharma (Car)', type: 'Service Fee', amount: '₹1,500', status: 'Paid', month: 'April' },
  { id: '6', date: '2026-03-28', policy: 'Amit Shah (Life)', type: 'New Business', amount: '₹9,800', status: 'Processed', month: 'March' },
  { id: '7', date: '2026-03-15', policy: 'Karan Mehra (Health)', type: 'Renewal', amount: '₹4,100', status: 'Processed', month: 'March' },
];

const CommissionStatement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('April');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filteredHistory = useMemo(() => {
    return initialHistory.filter(row => {
      const matchesSearch = row.policy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMonth = filterMonth === 'All' || row.month === filterMonth;
      const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
      return matchesSearch && matchesMonth && matchesStatus;
    });
  }, [searchTerm, filterMonth, filterStatus]);

  const handleExport = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(99, 102, 241);
      doc.text("COMMISSION STATEMENT", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated for ${filterMonth} 2026`, 105, 28, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 35, 190, 35);
      
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 45, 170, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text("DATE", 25, 51);
      doc.text("POLICY DETAILS", 55, 51);
      doc.text("TYPE", 110, 51);
      doc.text("COMMISSION", 145, 51);
      doc.text("STATUS", 175, 51);
      
      doc.setFont("helvetica", "normal");
      let currentY = 62;
      filteredHistory.forEach((row) => {
        doc.text(row.date, 25, currentY);
        doc.text(row.policy, 55, currentY);
        doc.text(row.type, 110, currentY);
        doc.text(row.amount, 145, currentY);
        doc.text(row.status, 175, currentY);
        currentY += 10;
        doc.line(20, currentY - 6, 190, currentY - 6);
      });
      
      doc.save(`Commission_Statement_${filterMonth}_2026.pdf`);
      toast.success('Statement exported successfully');
    } catch (err) {
      toast.error('Export failed');
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Wallet Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-900 text-white border-none shadow-xl relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:scale-125 transition-transform duration-500">
             <Wallet size={80} />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                 Wallet Balance
              </p>
              <h2 className="text-3xl font-black tracking-tighter mb-4">₹2,84,050</h2>
            </div>
            <div className="flex gap-2">
               <Button variant="primary" size="sm" className="px-3 py-2 text-[9px] bg-indigo-600 hover:bg-indigo-500 border-none shadow-md" onClick={() => toast.success('Payout request sent for verification')}>Request Payout</Button>
               <Button variant="outline" size="sm" className="px-3 py-2 text-[9px] border-white/20 text-white hover:bg-white/5">Transactions</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-between bg-white">
           <div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Earnings (YTD)</p>
             <h3 className="text-2xl font-black text-slate-800 tracking-tight">₹15,45,050</h3>
           </div>
           <div className="mt-4 flex items-center gap-1.5 text-emerald-600 font-black text-[9px] bg-emerald-50 w-fit px-2.5 py-1 rounded-lg border border-emerald-100">
              <ArrowUpRight size={12} /> +24% from last year
           </div>
        </Card>

        <Card className="p-6 border-none shadow-xl shadow-slate-200/50 flex flex-col justify-between bg-white">
           <div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Upcoming Payouts</p>
             <h3 className="text-2xl font-black text-slate-800 tracking-tight">₹32,400</h3>
           </div>
           <div className="mt-4 flex items-center gap-1.5 text-indigo-600 font-black text-[9px] bg-indigo-50 w-fit px-2.5 py-1 rounded-lg border border-indigo-100">
              <Calendar size={12} /> Next payout on May 05
           </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
         <div className="flex-1 w-full lg:max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by policy or customer..." 
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         
         <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select 
              className="flex-1 lg:flex-none px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-600 uppercase tracking-widest outline-none focus:bg-white transition-all shadow-sm"
              value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}
            >
               <option value="All">All Months</option>
               <option>April</option>
               <option>March</option>
               <option>February</option>
               <option>January</option>
            </select>

            <div className="relative">
               <button 
                 onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                 className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border shadow-sm ${filterStatus !== 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
               >
                  <Filter size={14} /> Status
                  {filterStatus !== 'All' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
               </button>

               {isFilterMenuOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {['All', 'Processed', 'Pending', 'Paid'].map(status => (
                      <button 
                        key={status}
                        onClick={() => { setFilterStatus(status); setIsFilterMenuOpen(false); }}
                        className={`w-full px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${filterStatus === status ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                      >
                        {status}
                        {filterStatus === status && <Check size={12} />}
                      </button>
                    ))}
                 </div>
               )}
            </div>

            <Button variant="outline" size="sm" icon={<Download size={14} />} onClick={handleExport}>Export</Button>
         </div>
      </div>

      {/* History Table */}
      <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHistory.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-800">{row.date}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-800">{row.policy}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${row.type === 'New Business' ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                       {row.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-800">{row.amount}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      row.status === 'Processed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                      row.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-8 py-10 text-center text-slate-400 text-xs font-bold">No records found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CommissionStatement;
