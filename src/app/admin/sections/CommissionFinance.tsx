import React, { useMemo } from 'react';
import { 
  Wallet, 
  HandCoins, 
  TrendingUp, 
  PieChart, 
  Download, 
  ArrowUpRight, 
  CreditCard,
  History,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

const CommissionFinance: React.FC = () => {
  const agentPayouts = [
    { id: 'TXN-4491', name: 'Rahul Verma', amount: '₹1,12,400', status: 'Paid', date: '25 Apr 2024' },
    { id: 'TXN-4492', name: 'Sneha Kapoor', amount: '₹98,500', status: 'Processing', date: 'Pending' },
    { id: 'TXN-4493', name: 'Amit Desai', amount: '₹75,200', status: 'Paid', date: '24 Apr 2024' },
    { id: 'TXN-4494', name: 'Priya Reddy', amount: '₹62,000', status: 'Paid', date: '24 Apr 2024' },
  ];

  // Dynamic Calculation for Net Revenue
  const financialSummary = useMemo(() => {
    const grossPremium = 4.2; // Cr
    const commissionPayable = 18.5; // L
    
    // Convert all to Cr for calculation
    const commissionCr = commissionPayable / 100;
    const netRevenue = grossPremium - commissionCr;
    
    return {
      gross: '₹4.2Cr',
      payable: '₹18.5L',
      net: '₹' + netRevenue.toFixed(2) + 'Cr'
    };
  }, []);

  const handleExport = () => {
    try {
      const headers = ['Transaction ID', 'Agent Name', 'Commission Amount', 'Status', 'Date'];
      const rows = agentPayouts.map(p => [p.id, p.name, p.amount.replace('₹', '').replace(',', ''), p.status, p.date]);
      
      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Commission_Report_${new Date().toLocaleDateString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Financial report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  const handleDownloadReceipt = (payout: typeof agentPayouts[0]) => {
    if (payout.status !== 'Paid') {
      toast.error('Receipt available only for paid commissions');
      return;
    }

    try {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.setTextColor(99, 102, 241);
      doc.text("INSURANCE ADVISOR", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("Official Commission Disbursement Receipt", 105, 28, { align: 'center' });
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 35, 190, 35);
      
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      
      const detailsX = 30;
      let currentY = 50;
      
      const addField = (label: string, value: string) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, detailsX, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(value, detailsX + 50, currentY);
        currentY += 12;
      };

      addField("Transaction ID", payout.id);
      addField("Disbursement Date", payout.date);
      addField("Agent Name", payout.name);
      addField("Payment Status", "COMPLETED");
      
      currentY += 10;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(25, currentY - 8, 160, 25, 3, 3, 'F');
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Total Commission Paid:", 35, currentY + 8);
      doc.setTextColor(16, 185, 129);
      doc.text(payout.amount, 140, currentY + 8);
      
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("This is a system-generated document. No signature required.", 105, 140, { align: 'center' });
      doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 146, { align: 'center' });

      doc.save(`Receipt_${payout.id}.pdf`);
      toast.success(`PDF Receipt downloaded`);
    } catch (error) {
      toast.error('Failed to generate PDF receipt');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Gross Premium Collected</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{financialSummary.gross}</h3>
              <div className="mt-3 flex items-center gap-1.5 text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span className="text-[11px] font-black uppercase">+12.4% vs last month</span>
              </div>
           </div>
           <PieChart className="absolute right-[-15px] bottom-[-15px] w-32 h-32 text-slate-50 rotate-12 opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HandCoins className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Commission Payable</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{financialSummary.payable}</h3>
              <div className="mt-3 flex items-center gap-1.5 text-amber-600">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px] font-black uppercase">Processing Cycle: 30 Apr</span>
              </div>
           </div>
           <TrendingUp className="absolute right-[-15px] bottom-[-15px] w-32 h-32 text-slate-50 -rotate-12 opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
           <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                 <p className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-1">Company Net Revenue</p>
                 <h3 className="text-2xl font-black tracking-tight text-white">{financialSummary.net}</h3>
              </div>
              <CreditCard className="w-6 h-6 text-indigo-400" />
           </div>
           <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
                 <span className="text-slate-500">Monthly Target</span>
                 <span className="text-indigo-300">₹4.5Cr</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-1000" style={{ width: '88%' }}></div>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
           <div>
              <h3 className="text-lg font-black text-slate-800">Commission Payouts</h3>
              <p className="text-xs text-slate-500 font-medium">Recent disbursements to agents and partners</p>
           </div>
           <button 
             onClick={handleExport}
             className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
           >
              <Download className="w-3.5 h-3.5" /> Export Report
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Agent Name</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Commission</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Disbursement</th>
                <th className="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agentPayouts.map((payout, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-[9px] font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {payout.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[11px] font-black text-slate-800">{payout.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[12px] font-black text-slate-800 tracking-tight">{payout.amount}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                       {payout.status === 'Paid' ? (
                         <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       ) : (
                         <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                       )}
                       <span className={`text-[9px] font-black uppercase tracking-widest ${
                         payout.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                       }`}>
                         {payout.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{payout.date}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button 
                      onClick={() => handleDownloadReceipt(payout)}
                      className="flex items-center gap-1 ml-auto text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-all hover:gap-1.5"
                    >
                       PDF Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/50 flex justify-center">
           <button className="text-[10px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest hover:text-slate-800 transition-colors">
             <History className="w-4 h-4" /> Load More Financial History
           </button>
        </div>
      </div>
    </div>
  );
};

export default CommissionFinance;
