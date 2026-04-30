import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ArrowUpRight,
  ShieldAlert,
  Calendar,
  MoreVertical,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const ApprovalsTasks: React.FC = () => {
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'APP-102', customer: 'Rajesh Malhotra', type: 'High-Value Life Policy', amount: '₹1.5Cr', priority: 'High', date: '2h ago' },
    { id: 'APP-105', customer: 'Anita Singh', type: 'Health Claim Settlement', amount: '₹8.5L', priority: 'Medium', date: '5h ago' },
  ]);

  const [tasks, setTasks] = useState([
    { title: 'Review Q4 Sales Forecast', status: 'In Progress', due: 'Tomorrow', category: 'Planning' },
    { title: 'Update Agent Commission Matrix', status: 'Pending', due: '28 Apr', category: 'Finance' },
    { title: 'Escalated Claim Verification', status: 'Urgent', due: 'Today', category: 'Claims' },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEscalationVisible, setIsEscalationVisible] = useState(true);
  const [taskForm, setTaskForm] = useState({ title: '', status: 'Pending', due: '', category: 'Planning' });

  const handleApprove = (id: string) => {
    setPendingApprovals(pendingApprovals.filter(app => app.id !== id));
    toast.success('Approval granted successfully.');
  };

  const handleReject = (id: string) => {
    setPendingApprovals(pendingApprovals.filter(app => app.id !== id));
    toast.error('Approval rejected.');
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
        {/* Approvals Section */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                 <h3 className="text-base font-black text-slate-800">Pending Approvals</h3>
                 <p className="text-[11px] text-slate-500 font-medium">Critical items requiring manager authorization</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                 <ShieldAlert className="w-4 h-4" />
              </div>
           </div>
           
           <div className="p-5 space-y-3.5">
              {pendingApprovals.map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
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
                      <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
                         <FileText className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-indigo-600">View History</button>
           </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                 <h3 className="text-base font-black text-slate-800">Operational Tasks</h3>
                 <p className="text-[11px] text-slate-500 font-medium">Daily agenda and pending action items</p>
              </div>
              <Calendar className="w-5 h-5 text-indigo-600" />
           </div>

           <div className="p-5 space-y-3">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                   <div className="flex items-center gap-3.5">
                      <div className={`w-1.5 h-8 rounded-full ${
                        task.status === 'Urgent' ? 'bg-rose-500' :
                        task.status === 'In Progress' ? 'bg-indigo-500' : 'bg-slate-300'
                      }`} />
                      <div>
                         <h4 className="text-[13px] font-bold text-slate-800">{task.title}</h4>
                         <p className="text-[10px] text-slate-400 font-medium">{task.category} • Due {task.due}</p>
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
             className="p-5 bg-indigo-50/50 m-5 rounded-2xl border border-dashed border-indigo-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-indigo-100 transition-all"
           >
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Schedule New Review</span>
           </div>
        </div>
      </div>

      {/* Escalation Alert */}
      {isEscalationVisible && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between">
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
