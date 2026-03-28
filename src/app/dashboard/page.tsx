import PageLayout from '../../components/common/PageLayout';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return (
    <PageLayout>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <SectionTitle 
            title={`Welcome back, ${user.name.split(' ')[0]}!`}
            subtitle="Manage your active policies and track your recent quote requests."
            badge="User Dashboard"
          />
          <div className="flex gap-4 mb-12">
             <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-100 transition-colors">Edit Profile</button>
             <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Find New Plan</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Policies */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Active Policies
            </h3>
            {[
              { id: 'pol-1', type: 'Health', name: 'Optima Secure', carrier: 'HDFC Ergo', status: 'Active', renewal: 'Oct 2024', premium: '₹1,550' },
              { id: 'pol-2', type: 'Car', name: 'Auto Safe', carrier: 'Tata AIG', status: 'Expiring Soon', renewal: 'May 2024', premium: '₹790' },
            ].map((policy) => (
              <div key={policy.id} className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl hover:border-blue-100 transition-all">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {policy.type === 'Health' ? '🏥' : '🚗'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight text-lg">{policy.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{policy.carrier}</p>
                    </div>
                 </div>
                 <div className="hidden md:block text-right">
                    <p className="text-lg font-black text-slate-900">{policy.premium}<span className="text-xs text-slate-400 font-normal">/mo</span></p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next: {policy.renewal}</p>
                 </div>
                 <div className="flex flex-col items-end gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      policy.status === 'Active' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>{policy.status}</span>
                    <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Download PDF</button>
                 </div>
              </div>
            ))}
          </div>

          {/* Recent Quotes */}
          <div className="flex flex-col gap-6">
             <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-400 rounded-full"></span>
              Recent Quotes
            </h3>
            <div className="bg-white p-10 rounded-[36px] border border-slate-100 shadow-sm flex flex-col gap-8 h-fit">
               {[
                 { id: 'q-1', name: 'Life Insurance', date: '2 days ago', amount: '₹10Cr Cover' },
                 { id: 'q-2', name: 'Business Shield', date: '1 week ago', amount: 'Liability' },
               ].map((quote) => (
                 <div key={quote.id} className="flex justify-between items-center group cursor-pointer">
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{quote.name}</h4>
                      <p className="text-xs text-slate-400">{quote.date}</p>
                    </div>
                    <span className="text-sm font-black text-slate-900 group-hover:scale-110 transition-transform">{quote.amount}</span>
                 </div>
               ))}
               <button className="w-full py-5 border-2 border-dashed border-blue-100 rounded-3xl text-blue-600 font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-colors mt-4">
                  + New Quote Request
               </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
