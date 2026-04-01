/* src/components/home/Testimonials.tsx */
import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { testimonials } from '../../data/testimonials';
import '../../styles/globals.css';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollTo, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden relative border-y border-slate-50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/20 blur-[120px] rounded-full translate-x-1/2 -z-10"></div>
      
      <div className="container relative">
        <div className="text-center mb-16 relative z-10">
          <SectionTitle 
            title="What Our Clients Say"
            subtitle="Trusted by over 1M+ families and businesses worldwide. Experience 5-star insurance today."
            badge="Client Stories"
            align="center"
          />
        </div>

        <div className="relative group/slider px-4 md:px-12">
          {/* Left Arrow */}
          <button 
            disabled={!canScrollLeft}
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90 ${
              canScrollLeft ? 'bg-white border border-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white opacity-0 group-hover/slider:opacity-100' : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-0'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button 
            disabled={!canScrollRight}
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90 ${
              canScrollRight ? 'bg-white border border-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white opacity-0 group-hover/slider:opacity-100' : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-0'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10"
          >
            {testimonials.map((test) => (
              <div 
                key={test.id} 
                className="w-[260px] md:w-[320px] shrink-0 snap-center p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-blue-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white shadow-lg">
                    <img src={`https://i.pravatar.cc/120?u=${test.id}`} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-slate-900 leading-none mb-1">{test.name}</h4>
                    <span className="text-[8px] font-bold text-blue-500 uppercase tracking-[0.1em]">{test.role}</span>
                  </div>
                </div>

                <div className="flex text-yellow-400 gap-0.5 mb-5 scale-90 origin-left">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(test.rating) ? 'fill-current' : 'text-slate-200'}`} />
                   ))}
                </div>

                <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic mb-8 min-h-[50px] line-clamp-3">
                  "{test.comment}"
                </p>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                     <span className="text-[8px] font-bold text-green-600 uppercase tracking-widest">Verified</span>
                   </div>
                   <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 opacity-30">
                     <Star className="w-2.5 h-2.5 fill-current" />
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fade effect edges */}
          <div className="hidden lg:block absolute inset-y-0 -left-6 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity"></div>
          <div className="hidden lg:block absolute inset-y-0 -right-6 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
