import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await login(formData);
      // Removed success toast as per user request to avoid "popups"
      if (userData) {
        if (userData.role === 'SUPER_ADMIN') {
          navigate('/super_admin');
        } else if (userData.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (userData.role === 'AGENT') {
          navigate('/agent_dashboard');
        } else if (userData.role === 'CSR') {
          navigate('/csr_dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      let errorMsg = 'Invalid email or password';
      
      const detail = error.response?.data?.detail;
      if (typeof detail === 'string') {
        errorMsg = detail;
      } else if (Array.isArray(detail)) {
        errorMsg = detail.map((err: any) => `${err.loc.join('.')}: ${err.msg}`).join('\n');
      }
      
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 animate-in fade-in duration-700">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Insurance Advisor</h2>
          <p className="text-slate-500 mt-2 font-medium">Access your secure portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">Reset</a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800 active:scale-[0.98]'}`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-black hover:text-blue-700 transition-colors">Join Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
