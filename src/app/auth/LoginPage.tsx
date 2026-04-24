/* src/app/auth/LoginPage.tsx */
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
      toast.success('Logged in successfully!');
      if (userData && userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Invalid email or password';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Log in to your insurance account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-slate-400/20 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800'}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
