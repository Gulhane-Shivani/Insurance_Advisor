/* src/components/common/SectionTitle.tsx */
import React from 'react';
import '../../styles/globals.css';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badge?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'left', 
  badge 
}) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-4 border border-blue-100">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
