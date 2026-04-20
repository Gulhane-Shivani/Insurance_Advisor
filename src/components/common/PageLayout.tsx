/* src/components/common/PageLayout.tsx */
import React from 'react';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  bg?: string;
  className?: string;
  noPadding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  bg = 'bg-slate-50', 
  className = '',
  noPadding = false
}) => {
  const hasPadding = className.includes('pt-') || className.includes('p-') || className.includes('py-');
  
  return (
    <main className={`min-h-screen flex flex-col ${bg}`}>
      <Navbar />
      <div className={`flex-grow ${(!hasPadding && !noPadding) ? 'pt-24 pb-20' : ''} ${className}`}>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default PageLayout;
