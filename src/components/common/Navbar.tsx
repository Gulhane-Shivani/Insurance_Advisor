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
    { name: 'Home', path: '/' },
    { 
      name: 'Insurance', 
      path: '/insurance',
      subLinks: [
        { name: 'Life Insurance', path: '/insurance/life' },
        { name: 'Health Insurance', path: '/insurance/health' },
        { name: 'Car Insurance', path: '/insurance/car' },
        { name: 'Business Insurance', path: '/insurance/business' },
      ]
    },
    { name: 'Quote', path: '/quote' },
    { name: 'Insurance Plan', path: '/compare' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group no-underline">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
            IA
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Insurance<span className="text-blue-600">Advisor</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group/nav">
              <Link 
                to={link.path}
                className="text-slate-600 hover:text-blue-600 font-bold transition-colors text-xs uppercase tracking-widest flex items-center gap-1 no-underline py-2"
              >
                {link.name}
                {link.subLinks && <span className="text-[10px] opacity-50 group-hover/nav:rotate-180 transition-transform duration-300">▼</span>}
              </Link>
              
              {link.subLinks && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 min-w-[220px]">
                    <div className="flex flex-col gap-1">
                      {link.subLinks.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.path}
                          className="px-4 py-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold text-sm transition-all no-underline whitespace-nowrap"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-slate-900 font-black flex items-center gap-2 hover:text-blue-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  {user.name[0]}
                </div>
                {user.name.split(' ')[0]}
              </Link>
              <button 
                onClick={logout}
                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-95"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-8 flex flex-col gap-6 shadow-2xl animate-fade-in-down">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-slate-600 font-black text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] bg-slate-100 w-full mb-2"></div>
          {user ? (
            <div className="flex flex-col gap-6">
               <Link to="/dashboard" className="text-2xl font-black text-slate-900" onClick={() => setIsMenuOpen(false)}>My Dashboard</Link>
               <button 
                 onClick={() => { logout(); setIsMenuOpen(false); }}
                 className="text-left text-xl font-black text-red-500 uppercase tracking-widest"
               >
                 Logout
               </button>
            </div>
          ) : (
            <button 
              onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
              className="bg-blue-600 text-white px-6 py-5 rounded-2xl w-full text-center font-black text-xl shadow-xl shadow-blue-500/30"
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
