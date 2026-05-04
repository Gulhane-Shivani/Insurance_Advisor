import React, { useState } from 'react';
import {
  FileText, Clock, CheckCircle2, AlertCircle,
  ArrowUpRight, Users, MessageSquare, ShieldAlert,
  X, Phone, Mail, ChevronRight, Clipboard, CheckCheck,
  AlertTriangle, BookOpen, Layers
} from 'lucide-react';
import { Card } from '../../../components/agent/UI';

interface Task {
  id: number;
  type: string;
  customer: string;
  priority: string;
  due: string;
  phone: string;
  email: string;
  policyNo: string;
  issue: string;
}

interface ResolvedEntry {
  task: Task;
  notes: string;
  resolvedAt: string;
}

interface ActiveCase {
  task: Task;
  step: 'review' | 'contact' | 'resolve';
  notes: string;
  resolved: boolean;
}

const RENEWAL_SCRIPT = [
  "1. Greet the customer and confirm their identity (Name + Policy No).",
  "2. Inform them their policy is due for renewal on [date].",
  "3. Review current coverage and highlight any gaps.",
  "4. Present renewal options: same plan / upgraded plan.",
  "5. Confirm premium amount and payment method.",
  "6. Send renewal confirmation via email and SMS.",
  "7. Update renewal status in the system.",
];

const CLAIM_CHECKLIST = [
  { done: false, text: "Verify claimant identity and policy number" },
  { done: false, text: "Confirm incident date and description" },
  { done: false, text: "Collect supporting documents (photos, reports)" },
  { done: false, text: "Assign claim to appropriate adjuster" },
  { done: false, text: "Set expected resolution timeline" },
  { done: false, text: "Notify claimant of claim ID and next steps" },
];

const SERVICE_CATALOG = [
  { name: "Address Change", turnaround: "24h", dept: "Policy Servicing" },
  { name: "Nominee Update", turnaround: "48h", dept: "Policy Servicing" },
  { name: "Premium Receipt", turnaround: "Instant", dept: "Accounts" },
  { name: "Policy Copy", turnaround: "2h", dept: "Document Services" },
  { name: "Lapse Revival", turnaround: "3 days", dept: "Underwriting" },
  { name: "Surrender Request", turnaround: "7 days", dept: "Operations" },
];

const INITIAL_TASKS: Task[] = [
  { id: 1, type: 'Renewal', customer: 'Rajesh Kumar', priority: 'High', due: '2h', phone: '+91 98765 43210', email: 'rajesh.kumar@email.com', policyNo: 'POL-2024-001', issue: 'Annual renewal due — policy expiring in 2 hours. Customer not yet responded to renewal notice.' },
  { id: 2, type: 'Claim', customer: 'Anjali Sharma', priority: 'Medium', due: '4h', phone: '+91 87654 32109', email: 'anjali.sharma@email.com', policyNo: 'POL-2024-045', issue: 'Motor claim filed after minor collision on 02-May. Documents partially submitted.' },
  { id: 3, type: 'Service', customer: 'Sunil Gupta', priority: 'Low', due: '1d', phone: '+91 76543 21098', email: 'sunil.gupta@email.com', policyNo: 'POL-2023-312', issue: 'Nominee update request pending verification.' },
  { id: 4, type: 'Query', customer: 'Priya Sharma', priority: 'High', due: '1h', phone: '+91 65432 10987', email: 'priya.sharma@email.com', policyNo: 'POL-2024-089', issue: 'Customer querying maturity amount and TDS deduction details.' },
];

const CSROverview: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [resolvedHistory, setResolvedHistory] = useState<ResolvedEntry[]>([]);
  const [activeCase, setActiveCase] = useState<ActiveCase | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [checklist, setChecklist] = useState(CLAIM_CHECKLIST.map(i => ({ ...i })));
  const [copied, setCopied] = useState(false);

  const resolvedTodayBase = 12;

  const stats = [
    { label: 'Pending Renewals', value: String(tasks.filter(t => t.type === 'Renewal').length).padStart(2, '0'), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Claims', value: String(tasks.filter(t => t.type === 'Claim').length).padStart(2, '0'), icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Open Tickets', value: String(tasks.length).padStart(2, '0'), icon: AlertCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Resolved Today', value: String(resolvedTodayBase + resolvedHistory.length).padStart(2, '0'), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const tools = [
    { label: 'Renewal Script', icon: FileText, key: 'Renewal Script' },
    { label: 'Claim Checklist', icon: CheckCircle2, key: 'Claim Checklist' },
    { label: 'Service Catalog', icon: Users, key: 'Service Catalog' },
  ];

  const handleStartCase = (task: Task) => {
    setActiveCase({ task, step: 'review', notes: '', resolved: false });
    setTimeout(() => {
      document.getElementById('case-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCloseCase = () => setActiveCase(null);

  const handleResolve = () => {
    if (!activeCase) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setResolvedHistory(prev => [{ task: activeCase.task, notes: activeCase.notes, resolvedAt: timeStr }, ...prev]);
    setTasks(prev => prev.filter(t => t.id !== activeCase.task.id));
    setActiveCase(null);
  };

  const handleToggleTool = (key: string) => {
    setActiveTool(prev => (prev === key ? null : key));
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(RENEWAL_SCRIPT.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleChecklist = (idx: number) => {
    setChecklist(prev => prev.map((item, i) => i === idx ? { ...item, done: !item.done } : item));
  };

  const priorityDot = (priority: string) =>
    priority === 'High' ? 'bg-red-500' : priority === 'Medium' ? 'bg-amber-500' : 'bg-slate-400';

  const typeBadge = (type: string) =>
    type === 'Renewal' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
    type === 'Claim' ? 'bg-red-50 text-red-600 border border-red-100' :
    'bg-indigo-50 text-indigo-600 border border-indigo-100';

  const STEPS = ['review', 'contact', 'resolve'] as const;
  const STEP_LABELS = { review: 'Review', contact: 'Contact', resolve: 'Resolve' };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-xl shadow-slate-200/40 hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={18} className="text-slate-300" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h4>
          </Card>
        ))}
      </div>

      {/* Queue + Quick Response */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Queue Table */}
        <div className="lg:col-span-8">
          <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Clock size={16} className="text-violet-600" /> Today's Service Queue
              </h3>
              <span className="px-3 py-1 bg-violet-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{tasks.length} Active</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/30">
                    <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                    <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Time Left</th>
                    <th className="px-6 py-4 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tasks.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400 font-semibold">🎉 All cases resolved for today!</td></tr>
                  )}
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className={`transition-colors ${activeCase?.task.id === task.id ? 'bg-violet-50' : 'hover:bg-slate-50/50'}`}
                    >
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${typeBadge(task.type)}`}>{task.type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{task.customer}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${priorityDot(task.priority)}`} />
                          <span className="text-[10px] font-black uppercase text-slate-500">{task.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-black text-slate-800">{task.due}</td>
                      <td className="px-6 py-4 text-right">
                        {activeCase?.task.id === task.id ? (
                          <button
                            onClick={handleCloseCase}
                            className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors"
                          >Close</button>
                        ) : (
                          <button
                            onClick={() => handleStartCase(task)}
                            className="text-[9px] font-black text-violet-600 uppercase tracking-widest hover:text-violet-800 transition-colors"
                          >Start Case</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Response Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Card className="p-6 border-none shadow-xl shadow-slate-200/40 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><MessageSquare size={80} /></div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6">Quick Response</h4>
            <div className="space-y-3">
              {tools.map((tool, i) => (
                <button
                  key={i}
                  onClick={() => handleToggleTool(tool.key)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    activeTool === tool.key
                      ? 'bg-violet-600/30 border-violet-500/50'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tool.icon size={16} className={activeTool === tool.key ? 'text-violet-300' : 'text-violet-400'} />
                    <span className="text-xs font-bold">{tool.label}</span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-200 opacity-60 ${activeTool === tool.key ? 'rotate-90' : ''}`}
                  />
                </button>
              ))}
            </div>
          </Card>

          {/* Inline Tool Content */}
          {activeTool === 'Renewal Script' && (
            <Card className="p-5 border-none shadow-xl shadow-slate-200/40 bg-white animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-violet-600" />
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Renewal Script</span>
                </div>
                <button onClick={handleCopyScript} className="flex items-center gap-1 text-[10px] font-bold text-violet-600 hover:text-violet-800 transition-colors">
                  {copied ? <><CheckCheck size={12} /> Copied</> : <><Clipboard size={12} /> Copy</>}
                </button>
              </div>
              <ol className="space-y-2">
                {RENEWAL_SCRIPT.map((line, i) => (
                  <li key={i} className="text-[11px] text-slate-600 leading-relaxed border-l-2 border-violet-200 pl-3 py-0.5">{line}</li>
                ))}
              </ol>
            </Card>
          )}

          {activeTool === 'Claim Checklist' && (
            <Card className="p-5 border-none shadow-xl shadow-slate-200/40 bg-white animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={15} className="text-red-500" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Claim Checklist</span>
              </div>
              <div className="space-y-2">
                {checklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleChecklist(i)}
                      className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                        item.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-violet-400'
                      }`}
                    >
                      {item.done && <CheckCheck size={10} className="text-white" />}
                    </div>
                    <span className={`text-[11px] leading-relaxed transition-all ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{checklist.filter(i => i.done).length} / {checklist.length} completed</span>
                <button
                  onClick={() => setChecklist(CLAIM_CHECKLIST.map(i => ({ ...i })))}
                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
                >Reset</button>
              </div>
            </Card>
          )}

          {activeTool === 'Service Catalog' && (
            <Card className="p-5 border-none shadow-xl shadow-slate-200/40 bg-white animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={15} className="text-indigo-500" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Service Catalog</span>
              </div>
              <div className="space-y-2">
                {SERVICE_CATALOG.map((svc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-700">{svc.name}</p>
                      <p className="text-[10px] text-slate-400">{svc.dept}</p>
                    </div>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{svc.turnaround}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Active Case Panel */}
      {activeCase && (
        <div id="case-panel">
          <Card className="p-0 border-none shadow-2xl shadow-violet-100/60 overflow-hidden bg-white animate-fade-in">
            {/* Case Header */}
            <div className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/20 border border-white/20`}>
                    {activeCase.task.type}
                  </span>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    activeCase.task.priority === 'High' ? 'bg-red-400/30 border border-red-300/40 text-red-100' :
                    activeCase.task.priority === 'Medium' ? 'bg-amber-400/30 border border-amber-300/40 text-amber-100' :
                    'bg-white/10 border border-white/10 text-white/70'
                  }`}>{activeCase.task.priority} Priority</span>
                </div>
                <h3 className="text-lg font-black">{activeCase.task.customer}</h3>
                <p className="text-xs text-white/70 mt-0.5">Policy: {activeCase.task.policyNo} · Due in: {activeCase.task.due}</p>
              </div>
              <button onClick={handleCloseCase} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Step Navigation */}
            <div className="flex border-b border-slate-100">
              {STEPS.map((step, idx) => (
                <button
                  key={step}
                  onClick={() => setActiveCase(prev => prev ? { ...prev, step } : null)}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    activeCase.step === step
                      ? 'text-violet-600 border-b-2 border-violet-600'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-black ${
                    activeCase.step === step ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>{idx + 1}</span>
                  {STEP_LABELS[step]}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="p-6">
              {/* Step 1: Review */}
              {activeCase.step === 'review' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Issue Summary</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{activeCase.task.issue}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Policy Number</p>
                      <p className="text-sm font-bold text-slate-800">{activeCase.task.policyNo}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SLA Remaining</p>
                      <p className="text-sm font-bold text-red-600">{activeCase.task.due}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCase(prev => prev ? { ...prev, step: 'contact' } : null)}
                    className="w-full py-3 bg-violet-600 text-white text-xs font-black rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Contact <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 2: Contact */}
              {activeCase.step === 'contact' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={`tel:${activeCase.task.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-emerald-500 text-white"><Phone size={16} /></div>
                      <div>
                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Call Customer</p>
                        <p className="text-sm font-bold text-slate-800">{activeCase.task.phone}</p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${activeCase.task.email}`}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-indigo-500 text-white"><Mail size={16} /></div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Send Email</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{activeCase.task.email}</p>
                      </div>
                    </a>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Case Notes</label>
                    <textarea
                      rows={4}
                      value={activeCase.notes}
                      onChange={(e) => setActiveCase(prev => prev ? { ...prev, notes: e.target.value } : null)}
                      placeholder="Enter notes from the customer interaction..."
                      className="w-full p-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setActiveCase(prev => prev ? { ...prev, step: 'resolve' } : null)}
                    className="w-full py-3 bg-violet-600 text-white text-xs font-black rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Resolve <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 3: Resolve */}
              {activeCase.step === 'resolve' && (
                <div className="space-y-5">
                  {activeCase.resolved ? null : (
                    <>
                      {activeCase.notes && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recorded Notes</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{activeCase.notes}</p>
                        </div>
                      )}
                      <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100">
                        <p className="text-[10px] font-black text-violet-700 uppercase tracking-widest mb-1">Resolution Action</p>
                        <p className="text-sm text-slate-600">
                          Confirm you have completed the necessary actions for this {activeCase.task.type.toLowerCase()} case and close it out.
                        </p>
                      </div>
                      <button
                        onClick={handleResolve}
                        className="w-full py-3 bg-emerald-600 text-white text-xs font-black rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={14} /> Mark as Resolved
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Resolved History */}
      {resolvedHistory.length > 0 && (
        <Card className="p-0 border-none shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-emerald-50/50">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" /> Resolved History
            </h3>
            <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{resolvedHistory.length} Resolved</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy No.</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Notes</th>
                  <th className="px-6 py-4 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Resolved At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {resolvedHistory.map((entry, i) => (
                  <tr key={i} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${typeBadge(entry.task.type)}`}>{entry.task.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{entry.task.customer}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{entry.task.policyNo}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">{entry.notes || <span className="italic text-slate-300">No notes</span>}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">{entry.resolvedAt}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CSROverview;
