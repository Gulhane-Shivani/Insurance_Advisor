/* src/components/auth/AuthModal.tsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globals.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-scale-up border border-slate-100">
        <div className="p-10">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">✕</button>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium font-inter text-sm">
              Sign in to manage your policies and get personalized insurance quotes.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => handleNavigate('/login')}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg shadow-slate-400/20"
            >
              Sign In to Account
            </button>
            <button 
              onClick={() => handleNavigate('/register')}
              className="w-full bg-white text-slate-900 border-2 border-slate-200 py-4 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Create New Account
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-slate-100 flex-1"></div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Why Join Us?</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>
            
            <ul className="space-y-3">
              {[
                { icon: '🛡️', text: 'Manage 10+ insurance policies' },
                { icon: '🤖', text: 'AI-powered claim assistant' },
                { icon: '💰', text: 'Exclusive renewal discounts' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 text-center">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
             By continuing, you agree to our <br/>
             <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span> & <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
