/* src/app/auth/RegisterPage.tsx */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    password: '',
    confirm_password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      const { confirm_password, ...registerData } = formData;
      await register(registerData);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Registration failed. Try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2 font-medium">Join Insurance Advisor today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Account Type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
              disabled={loading}
            >
              <option value="user">Standard User</option>
              <option value="agent">Insurance Agent</option>
              <option value="csr">Customer Support (CSR)</option>
              <option value="admin">Administrator</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-blue-400/20 transition-all flex items-center justify-center gap-2 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
