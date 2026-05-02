import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight,
  ShieldAlert,
  Calendar,
  MoreVertical,
  X,
  History,
  Check,
  ListFilter
} from 'lucide-react';
import toast from 'react-hot-toast';

const ApprovalsTasks: React.FC = () => {
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'APP-102', customer: 'Rajesh Malhotra', type: 'High-Value Life Policy', amount: '₹1.5Cr', priority: 'High', date: '2h ago' },
    { id: 'APP-105', customer: 'Anita Singh', type: 'Health Claim Settlement', amount: '₹8.5L', priority: 'Medium', date: '5h ago' },
  ]);

  const [approvalHistory, setApprovalHistory] = useState<any[]>([
    { id: 'APP-098', customer: 'Suresh Raina', type: 'Motor Policy Renewal', amount: '₹45K', status: 'Approved', date: 'Yesterday' },
    { id: 'APP-095', customer: 'Kiran Bedi', type: 'Life Insurance App', amount: '₹2.2L', status: 'Rejected', date: '2 days ago' },
  ]);

  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  const [tasks, setTasks] = useState([
    { title: 'Review Q4 Sales Forecast', status: 'In Progress', due: 'Tomorrow', category: 'Planning' },
    { title: 'Update Agent Commission Matrix', status: 'Pending', due: '28 Apr', category: 'Finance' },
    { title: 'Escalated Claim Verification', status: 'Urgent', due: 'Today', category: 'Claims' },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEscalationVisible, setIsEscalationVisible] = useState(true);
  const [taskForm, setTaskForm] = useState({ title: '', status: 'Pending', due: '', category: 'Planning' });

  const handleApprove = (id: string) => {
    const item = pendingApprovals.find(app => app.id === id);
    if (item) {
      setApprovalHistory([{ ...item, status: 'Approved', date: 'Just now' }, ...approvalHistory]);
      setPendingApprovals(pendingApprovals.filter(app => app.id !== id));
      toast.success(`Approved request ${id} for ${item.customer}`);
    }
  };

  const handleReject = (id: string) => {
    const item = pendingApprovals.find(app => app.id === id);
    if (item) {
      setApprovalHistory([{ ...item, status: 'Rejected', date: 'Just now' }, ...approvalHistory]);
      setPendingApprovals(pendingApprovals.filter(app => app.id !== id));
      toast.error(`Rejected request ${id}`);
    }
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([{ ...taskForm, due: taskForm.due || 'Soon' }, ...tasks]);
    setIsTaskModalOpen(false);
    setTaskForm({ title: '', status: 'Pending', due: '', category: 'Planning' });
    toast.success('New review scheduled.');
  };

  const handleTakeAction = () => {
    setIsEscalationVisible(false);
    toast.success('Action taken on system escalation.');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Approvals Section with Tabs */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[550px]">
           <div className="p-5 border-b border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <h3 className="text-base font-black text-slate-800">Authorization Console</h3>
                    <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Manage and audit manager approvals</p>
                 </div>
                 <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                 </div>
              </div>

              {/* Functional Tabs */}
              <div className="flex p-1 bg-slate-50 rounded-xl">
                 <button 
                   onClick={() => setActiveTab('pending')}
                   className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    <Clock className="w-3.5 h-3.5" />
                    Pending ({pendingApprovals.length})
                 </button>
                 <button 
                   onClick={() => setActiveTab('history')}
                   className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    <History className="w-3.5 h-3.5" />
                    History ({approvalHistory.length})
                 </button>
              </div>
           </div>
           
           <div className="p-5 space-y-3.5 flex-1 overflow-y-auto">
              {activeTab === 'pending' ? (
                <>
                  {pendingApprovals.length > 0 ? (
                    pendingApprovals.map((item, i) => (
                      <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all animate-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex justify-between items-start mb-3">
                           <div>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                item.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                              }`}>
                                {item.priority} Priority
                              </span>
                              <h4 className="text-sm font-bold text-slate-800 mt-2">{item.customer}</h4>
                              <p className="text-[10px] text-slate-500 font-medium">{item.type} • {item.amount}</p>
                           </div>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                        </div>
                        
                        <div className="flex gap-2">
                           <button onClick={() => handleApprove(item.id)} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                           </button>
                           <button onClick={() => handleReject(item.id)} className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5">
                              <XCircle className="w-3.5 h-3.5" /> Reject
                           </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-60">
                       <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mb-4">
                          <Check className="w-8 h-8" />
                       </div>
                       <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Inbox Zero</h4>
                       <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-[0.15em]">Everything is up to date</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {approvalHistory.length > 0 ? (
                    approvalHistory.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all animate-in fade-in slide-in-from-left-4 duration-300 shadow-sm" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex items-center gap-4">
                           <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                             item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                           }`}>
                              {item.status === 'Approved' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                           </div>
                           <div>
                              <h4 className="text-[13px] font-black text-slate-800 tracking-tight">{item.customer}</h4>
                              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.type} • {item.amount}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className={`text-[10px] font-black uppercase tracking-widest ${
                             item.status === 'Approved' ? 'text-emerald-600' : 'text-rose-600'
                           }`}>{item.status}</p>
                           <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase">{item.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-60">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">No history recorded yet</p>
                    </div>
                  )}
                </>
              )}
           </div>
           
           <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                 <ListFilter className="w-3.5 h-3.5" /> Filter Repository
              </button>
           </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                 <h3 className="text-base font-black text-slate-800">Operational Tasks</h3>
                 <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Daily agenda and pending action items</p>
              </div>
              <Calendar className="w-5 h-5 text-indigo-600" />
           </div>

           <div className="p-5 space-y-3">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-200 transition-all group cursor-pointer">
                   <div className="flex items-center gap-3.5">
                      <div className={`w-1.5 h-8 rounded-full ${
                        task.status === 'Urgent' ? 'bg-rose-500' :
                        task.status === 'In Progress' ? 'bg-indigo-500' : 'bg-slate-300'
                      }`} />
                      <div>
                         <h4 className="text-[13px] font-bold text-slate-800 tracking-tight">{task.title}</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{task.category} • Due {task.due}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="text-right">
                         <span className={`text-[9px] font-black uppercase tracking-widest ${
                           task.status === 'Urgent' ? 'text-rose-600' :
                           task.status === 'In Progress' ? 'text-indigo-600' : 'text-slate-400'
                         }`}>
                           {task.status}
                         </span>
                      </div>
                      <button className="p-1.5 text-slate-300 hover:text-slate-600">
                         <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           <div 
             onClick={() => setIsTaskModalOpen(true)}
             className="p-5 bg-indigo-50/50 m-5 rounded-2xl border border-dashed border-indigo-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-indigo-100 transition-all group"
           >
              <Clock className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Schedule New Review</span>
           </div>
        </div>
      </div>

      {/* Escalation Alert */}
      {isEscalationVisible && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                 <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-rose-900 uppercase tracking-widest">System Escalation</p>
                 <p className="text-xs font-medium text-rose-700">3 high-value renewals pending past grace period.</p>
              </div>
           </div>
           <button onClick={handleTakeAction} className="flex items-center gap-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">
              Take Action <ArrowUpRight className="w-3 h-3" />
           </button>
        </div>
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">Schedule Review</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleTaskSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Task Title</label>
                <input 
                  type="text" 
                  required 
                  value={taskForm.title} 
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" 
                  placeholder="Review documentation..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                  <select 
                    value={taskForm.category} 
                    onChange={(e) => setTaskForm({...taskForm, category: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Planning</option>
                    <option>Finance</option>
                    <option>Claims</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</label>
                  <select 
                    value={taskForm.status} 
                    onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Due Date</label>
                <input 
                  type="text" 
                  value={taskForm.due} 
                  onChange={(e) => setTaskForm({...taskForm, due: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" 
                  placeholder="e.g. Tomorrow, 28 Apr"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsTaskModalOpen(false)}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalsTasks;
