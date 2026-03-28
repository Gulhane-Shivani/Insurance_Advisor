/* src/components/insurance/InsuranceDetails.tsx */
import React from 'react';
import '../../styles/globals.css';

interface InsuranceDetailsProps {
  type: 'life' | 'health' | 'car' | 'business';
}

const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ type }) => {
  const details = {
    life: {
      title: 'Life Insurance Solutions',
      points: ['Secure your family\'s financial future', 'Tax benefits under relevant sections', 'Flexibility in premium payments', 'Wealth creation with death benefit'],
      stats: { cover: '$1M+', payout: '99.2%', clients: '250k+' }
    },
    health: {
      title: 'Global Health Coverage',
      points: ['Network of 15,000+ hospital partners', '24/7 specialist access', 'Chronic illness management programs', 'International treatment options'],
      stats: { cover: 'Unlimited', claim: '2 hours', saved: '45%' }
    },
    car: {
      title: 'Advanced Vehicle Guard',
      points: ['Instant digital policy issuance', 'Cashless repairs at 4,000+ garages', 'Round-the-clock roadside assistance', 'Engine and gearbox protection'],
      stats: { quote: '2 mins', garages: '4k+', reviews: '4.8/5' }
    },
    business: {
      title: 'Enterprise Risk Shield',
      points: ['Comprehensive liability protection', 'Asset and machinery coverage', 'Employee health & accident benefits', 'Business interruption support'],
      stats: { assets: '$10B+', companies: '10k+', expert: '300+' }
    }
  };

  const currentDetails = details[type];

  return (
    <div className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/40 blur-3xl rounded-full group-hover:bg-blue-200/50 transition-colors"></div>
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl skew-x-1 group-hover:skew-x-0 transition-all duration-700">
            <img 
              src={`https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=1200&type=${type}`} 
              alt={currentDetails.title} 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>

        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-6 border border-blue-100">Plan Highlights</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 leading-[1.1]">{currentDetails.title}</h2>
          <ul className="flex flex-col gap-5 mb-12">
            {currentDetails.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] shrink-0 mt-1">✔</span>
                <p className="text-lg text-slate-700 leading-snug">{pt}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200">
            {Object.entries(currentDetails.stats).map(([label, val]) => (
              <div key={label}>
                <p className="text-2xl md:text-3xl font-black text-blue-600 mb-1">{val}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
