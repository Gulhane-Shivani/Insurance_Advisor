/* src/components/common/Navbar.tsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { cn } from '../../lib/utils';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Insurance', 
      path: '',
      subLinks: [
        { name: 'Life Insurance', path: '/insurance/life', desc: 'Secure your family\'s financial future', icon: '❤️' },
        { name: 'Health Insurance', path: '/insurance/health', desc: 'Medical coverage for peace of mind', icon: '🏥' },
        { name: 'Car Insurance', path: '/insurance/car', desc: 'Protection for your vehicle on the road', icon: '🚗' },
        { name: 'Business Insurance', path: '/insurance/business', desc: 'Custom solutions for your enterprise', icon: '💼' },
      ]
    },
    { 
      name: 'AI & Tools', 
      path: '',
      subLinks: [
        { name: 'AI Smart Advisor', path: '/#advisor', desc: 'Personalized AI-driven recommendations', icon: '🤖' },
        { name: 'Premium Calculator', path: '/tools/calculator', desc: 'Estimate your insurance costs instantly', icon: '📊' },
        { name: 'Tax Benefits', path: '/tools/tax', desc: 'Check your applicable tax savings', icon: '💰' },
      ]
    },
    { name: 'Compare', path: '/compare' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group no-underline flex-shrink-0">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
            IA
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Insurance<span className="text-blue-600">Advisor</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group/nav">
              <Link 
                to={link.path}
                className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm flex items-center gap-1.5 no-underline py-2 whitespace-nowrap"
              >
                {link.name}
                {link.subLinks && <span className="text-[10px] opacity-40 group-hover/nav:rotate-180 transition-transform duration-300">▼</span>}
              </Link>
              
              {link.subLinks && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                  <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-6 min-w-[320px]">
                    <div className="flex flex-col gap-2">
                      {link.subLinks.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.path}
                          className="flex items-start gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all no-underline group/item"
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-slate-100 group-hover/item:bg-white group-hover/item:shadow-md transition-all">
                            {sub.icon}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm mb-0.5 group-hover/item:text-blue-600 transition-colors">{sub.name}</p>
                            <p className="text-slate-400 text-[11px] font-medium leading-tight">{(sub as any).desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

          {user ? (
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link to="/dashboard" className="text-slate-900 font-bold flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
                  {user.name[0]}
                </div>
                <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-900 w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 bg-white rounded-3xl border border-slate-100 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in-down z-[100] mt-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-slate-700 font-bold text-base px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] bg-slate-100 w-full my-2"></div>
          {user ? (
            <div className="flex flex-col gap-2">
               <Link to="/dashboard" className="text-slate-900 font-bold text-base px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors no-underline" onClick={() => setIsMenuOpen(false)}>My Dashboard</Link>
               <button 
                 onClick={() => { logout(); setIsMenuOpen(false); }}
                 className="text-left px-4 py-2 text-sm font-bold text-red-500 uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all"
               >
                 Logout
               </button>
            </div>
          ) : (
            <button 
              onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
              className="bg-blue-600 text-white px-6 py-3.5 rounded-xl w-full text-center font-black text-sm shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              Log In Now
            </button>
          )}
        </div>
      )}
    </nav>
    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
