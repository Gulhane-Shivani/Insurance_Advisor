/* src/components/common/SectionTitle.tsx */
import React from 'react';
import '../../styles/globals.css';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badge?: string;
  variant?: 'default' | 'light';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'left', 
  badge,
  variant = 'default'
}) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}`}>
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full font-semibold text-sm mb-4 border ${
          isLight ? 'bg-white/10 text-white border-white/20' : 'bg-blue-50 text-blue-600 border-blue-100'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-2xl md:text-4xl font-bold mb-6 leading-[1.15] ${
        isLight ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${
          isLight ? 'text-white/70' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
