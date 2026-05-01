/* src/app/agent_dashboard/sections/TasksCalendar.tsx */
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  Clock, Plus, Check, Calendar as CalendarIcon, 
  Users, Phone, AlertCircle, Trash2, Edit2, 
  ChevronRight, ArrowRight, X
} from 'lucide-react';
import { Card, Button, Modal } from '../../../components/agent/UI';
import toast from 'react-hot-toast';

const initialTasks = [
  { id: '1', title: 'Renewal Call: Rajesh Kumar', time: '10:30 AM', category: 'Renewal', priority: 'High', completed: false, description: 'Policy HL-77889922 is expiring in 15 days.' },
  { id: '2', title: 'Home Visit: Sunil Gupta', time: '02:00 PM', category: 'Meeting', priority: 'High', completed: false, description: 'Discussing high-value car collection insurance.' },
  { id: '3', title: 'Email Quote to Priya Sharma', time: '04:30 PM', category: 'Service', priority: 'Medium', completed: true, description: 'Follow up on the Car Insurance quote sent yesterday.' },
  { id: '4', title: 'KYC Document Collection: Rajesh K.', time: '11:15 AM', category: 'Admin', priority: 'Low', completed: false, description: 'Collect Aadhar and PAN copies.' },
];

const TasksCalendar: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');
  
  // Edit State
  const [editingTask, setEditingTask] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', category: 'Meeting', priority: 'High', description: '', time: '10:00 AM'
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    toast.success('Task status updated');
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success('Task removed from schedule');
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      category: task.category,
      priority: task.priority,
      description: task.description,
      time: task.time
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...formData } : t));
      toast.success('Task updated successfully');
    } else {
      const newTask = {
        ...formData,
        id: Date.now().toString(),
        completed: false
      };
      setTasks([newTask, ...tasks]);
      toast.success('New event scheduled');
    }
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({ title: '', category: 'Meeting', priority: 'High', description: '', time: '10:00 AM' });
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const getCategoryIcon = (c: string) => {
    switch (c) {
      case 'Renewal': return <AlertCircle size={14} />;
      case 'Meeting': return <Users size={14} />;
      case 'Service': return <Phone size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10 animate-fade-in">
      {/* Calendar Side */}
      <div className="xl:col-span-5 space-y-6">
        <Card className="p-8 border-none shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8 px-2">
             <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm shadow-indigo-200/50">
                   <CalendarIcon size={20} />
                </div>
                Schedule
             </h3>
             <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>Add Event</Button>
          </div>
          <div className="custom-calendar-wrapper">
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate} 
              className="w-full border-none"
              tileClassName={({ date, view }) => 
                view === 'month' && date.getDate() === 29 ? 'has-events' : null
              }
            />
          </div>
        </Card>

        {/* Reminders Snapshot */}
        <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl">
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">Upcoming Reminders</h4>
           <div className="space-y-6">
              {[
                { title: 'WhatsApp Blast', time: 'Tomorrow, 10 AM', detail: 'New policy features to all leads' },
                { title: 'Quarterly Review', time: 'May 15th', detail: 'Meeting with Regional Manager' },
              ].map((rem, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                   <div className="w-0.5 bg-indigo-500 group-hover:w-1 transition-all"></div>
                   <div>
                      <p className="text-sm font-black tracking-tight">{rem.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{rem.time}</p>
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>

      {/* Tasks Side */}
      <div className="xl:col-span-7 space-y-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
              {['Today', 'Upcoming', 'Completed'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                >
                  {tab}
                </button>
              ))}
           </div>
           <Button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} icon={<Plus size={18} />} className="shadow-lg shadow-indigo-600/10">Quick Task</Button>
        </div>

        <div className="space-y-4">
          {tasks.filter(t => activeTab === 'Completed' ? t.completed : !t.completed).map((task) => (
            <Card key={task.id} className={`group border-none shadow-lg shadow-slate-200/50 transition-all duration-300 ${task.completed ? 'opacity-70 grayscale' : 'hover:translate-x-2'}`}>
               <div className="p-6">
                  <div className="flex items-start gap-5">
                     <button 
                       onClick={() => toggleTask(task.id)}
                       className={`mt-1 flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-transparent hover:border-indigo-400 group-hover:bg-slate-50'}`}
                     >
                        <Check size={18} strokeWidth={3} />
                     </button>
                     
                     <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                           <div className="flex flex-wrap items-center gap-2">
                              <h4 className={`text-base font-black tracking-tight ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                 {task.title}
                              </h4>
                              <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getPriorityColor(task.priority)}`}>
                                 {task.priority}
                              </span>
                           </div>
                           <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">
                              <Clock size={12} /> {task.time}
                           </div>
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-2xl">
                           {task.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                           <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                                 {getCategoryIcon(task.category)} {task.category}
                              </div>
                              {task.category === 'Meeting' && (
                                <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-1">
                                   View Location <ChevronRight size={12} />
                                </button>
                              )}
                           </div>
                           <div className="flex items-center gap-2">
                              <button onClick={() => handleEdit(task)} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(task.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>
          ))}
          
          <div className="py-6 flex justify-center">
             <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-all group uppercase tracking-[0.2em]">
                View All Schedule <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </div>

      {/* Scheduler Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-[32px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">{editingTask ? 'Edit Schedule Item' : 'Add New Event'}</h3>
               <button onClick={() => { setIsModalOpen(false); setEditingTask(null); }} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm"><X size={20} /></button>
             </div>
             <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title / Agenda</label>
                   <input 
                     required
                     className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     placeholder="e.g. Policy Review with Client" 
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value})}
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                         <option>Renewal</option>
                         <option>Meeting</option>
                         <option>Service</option>
                         <option>Admin</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all"
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      >
                         <option>High</option>
                         <option>Medium</option>
                         <option>Low</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</label>
                   <input 
                     type="text"
                     className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     placeholder="e.g. 10:30 AM" 
                     value={formData.time}
                     onChange={(e) => setFormData({...formData, time: e.target.value})}
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes / Description</label>
                   <input 
                     className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all" 
                     placeholder="Add more context..." 
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                   />
                </div>

                <div className="pt-4 flex gap-3">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                   <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                      {editingTask ? 'Update Event' : 'Schedule Event'}
                   </button>
                </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default TasksCalendar;
