/* src/components/common/TrustBar.tsx */
import React from 'react';

const TrustBar: React.FC = () => {
  return (
    <div className="py-12 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
      <div className="container overflow-hidden">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Trusted by over 1.5 Million happy customers globally</p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           {/* Replace with real logos or use generic symbols */}
           <div className="flex items-center gap-2 font-black text-2xl text-slate-800">🛡️ <span className="tracking-tighter italic">SAFEGUARD</span></div>
           <div className="flex items-center gap-2 font-black text-2xl text-slate-800">🏛️ <span className="tracking-tighter">FEDERAL</span></div>
           <div className="flex items-center gap-2 font-black text-2xl text-slate-800">⚓ <span className="tracking-tighter">ANCHOR</span></div>
           <div className="flex items-center gap-2 font-black text-2xl text-slate-800">🧩 <span className="tracking-tighter">ALLIANCE</span></div>
           <div className="flex items-center gap-2 font-black text-2xl text-slate-800">⚜️ <span className="tracking-tighter">PRUDENTIAL</span></div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
