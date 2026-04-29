/* src/components/agent/UI.tsx */
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-[32px] border border-slate-100 bg-white shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  isLoading?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', icon, type = 'button', size = 'md', isLoading = false }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'bg-transparent border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={isLoading}
      className={`inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${size === 'sm' ? 'px-4 py-2 text-[10px]' : 'px-6 py-3.5 text-xs'} ${className}`}
    >
      {icon} {children}
    </button>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 font-bold">✕</button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};
