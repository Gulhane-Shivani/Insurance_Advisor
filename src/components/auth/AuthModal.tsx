/* src/components/auth/AuthModal.tsx */
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/globals.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && name) setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      login(phone, name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-scale-up">
        <div className="p-10">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">✕</button>
          
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {step === 'info' ? 'Welcome Back' : 'Verify Identity'}
            </h2>
            <p className="text-slate-500 font-medium">
              {step === 'info' 
                ? 'Sign in to manage your policies and get personalized quotes.' 
                : `We've sent a 4-digit code to ${phone}`}
            </p>
          </div>

          {step === 'info' ? (
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX" 
                  className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95 mt-4"
              >
                Send OTP →
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Enter OTP</label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="0000" 
                  className="px-6 py-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none text-center text-4xl font-black tracking-[1rem]"
                  required
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 mt-4"
              >
                Verify & Login
              </button>
              <button 
                type="button" 
                onClick={() => setStep('info')}
                className="text-slate-500 font-bold hover:text-slate-900 transition-colors"
              >
                ← Back to info
              </button>
            </form>
          )}
        </div>
        <div className="bg-slate-50 p-6 text-center">
           <p className="text-xs font-medium text-slate-400">By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
