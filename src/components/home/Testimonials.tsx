/* src/components/home/Testimonials.tsx */
import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { testimonials } from '../../data/testimonials';
import '../../styles/globals.css';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <SectionTitle 
          title="What Our Clients Say"
          subtitle="Join thousands of satisfied customers who have found the perfect insurance plan with us."
          align="center"
          badge="Testimonials"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {testimonials.map((test) => (
            <div key={test.id} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="text-4xl text-blue-500/30 font-serif mb-4 sm:mb-6 leading-none">"</div>
              <p className="text-lg sm:text-xl text-slate-700 font-medium mb-8 sm:mb-10 leading-relaxed relative z-10 italic">
                {test.comment}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-auto relative z-10 gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${test.id}`} 
                      alt={test.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none mb-1">{test.name}</h4>
                    <p className="text-sm text-slate-500">{test.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-500 text-lg">
                  {'★'.repeat(Math.floor(test.rating))}
                  {test.rating % 1 !== 0 && '½'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
