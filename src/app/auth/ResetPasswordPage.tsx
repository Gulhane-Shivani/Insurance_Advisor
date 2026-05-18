import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft, CheckCircle, KeyRound, Lock, EyeOff, Eye } from 'lucide-react';

type Step = 'email' | 'reset' | 'success';

const ResetPasswordPage: React.FC = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  
  // Reset fields
  const [verificationCode, setVerificationCode] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('reset');
      toast.success('Verification code sent to your email.');
    }, 1500);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      toast.success('Password changed successfully.');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 animate-in fade-in duration-700">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        {step === 'email' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6 relative">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <Mail size={22} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reset Password</h2>
              <p className="text-slate-500 mt-2 font-medium text-[13px] leading-relaxed px-2">
                Enter your registered email address to receive a verification code.
              </p>
            </div>

            <form onSubmit={handleSendCode} className="space-y-4 relative">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-sm font-bold pl-10"
                    disabled={loading}
                    required
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : 'Send Verification Code'}
              </button>
            </form>
          </div>
        )}

        {step === 'reset' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
             <div className="text-center mb-5 relative">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-blue-100 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <KeyRound size={22} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Change Password</h2>
              <p className="text-slate-500 mt-1.5 font-medium text-[12px] leading-relaxed px-2">
                Code sent to <span className="font-bold text-slate-800">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 relative">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[13px] font-bold tracking-widest text-center"
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Old Password</label>
                <div className="relative group">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[13px] font-bold pl-10 pr-10"
                    disabled={loading}
                    required
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative group">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[13px] font-bold pl-10 pr-10"
                    disabled={loading}
                    required
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[13px] font-bold pl-10 pr-10"
                    disabled={loading}
                    required
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-slate-900 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 mt-4 hover:bg-slate-800 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Changing...
                  </>
                ) : 'Change Password'}
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4 animate-in zoom-in duration-500 relative">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-100">
              <CheckCircle size={32} strokeWidth={2} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">Password Updated</h2>
            <p className="text-slate-500 font-medium text-[13px] leading-relaxed mb-6 px-2">
              Your password has been successfully changed.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              Go to Login
            </button>
          </div>
        )}

        {step !== 'success' && (
          <div className="mt-5 pt-4 border-t border-slate-50 text-center relative">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center gap-2 text-xs font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
