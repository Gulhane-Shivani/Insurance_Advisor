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
      stats: { cover: '$1M+', payout: '99.2%', clients: '250k+' },
      claimSteps: [
        { title: 'Intimation', desc: 'Notify us immediately upon the event of a death.' },
        { title: 'Documentation', desc: 'Submit death certificate and original policy documents.' },
        { title: 'Verification', desc: 'Our team verifies the claim within 48 hours.' },
        { title: 'Settlement', desc: 'Payout is credited to the nominee\'s account.' }
      ]
    },
    health: {
      title: 'Global Health Coverage',
      points: ['Network of 15,000+ hospital partners', '24/7 specialist access', 'Chronic illness management programs', 'International treatment options'],
      stats: { cover: 'Unlimited', claim: '2 hours', saved: '45%' },
      claimSteps: [
        { title: 'Admission', desc: 'Present your health card at the network hospital desk.' },
        { title: 'Pre-Auth', desc: 'Hospital sends pre-authorization request for approval.' },
        { title: 'Approval', desc: 'Get cashless approval within 2 hours of request.' },
        { title: 'Discharge', desc: 'Focus on recovery while we settle bills directly.' }
      ]
    },
    car: {
      title: 'Advanced Vehicle Guard',
      points: ['Instant digital policy issuance', 'Cashless repairs at 4,000+ garages', 'Round-the-clock roadside assistance', 'Engine and gearbox protection'],
      stats: { quote: '2 mins', garages: '4k+', reviews: '4.8/5' },
      claimSteps: [
        { title: 'Spot Photo', desc: 'Take clear photos of the vehicle damage on the spot.' },
        { title: 'Towing', desc: 'Call 24/7 assistance if the vehicle is not drivable.' },
        { title: 'Repair', desc: 'Choose a cashless garage for instant settlement.' },
        { title: 'Survey', desc: 'Surveyor approves claim via digital assessment.' }
      ]
    },
    business: {
      title: 'Enterprise Risk Shield',
      points: ['Comprehensive liability protection', 'Asset and machinery coverage', 'Employee health & accident benefits', 'Business interruption support'],
      stats: { assets: '$10B+', companies: '10k+', expert: '300+' },
      claimSteps: [
        { title: 'Assess', desc: 'Evaluate the damage to property or business assets.' },
        { title: 'Report', desc: 'File a formal report with your dedicated advisor.' },
        { title: 'Evidence', desc: 'Provide invoices, logs, and evidence of loss.' },
        { title: 'Recovery', desc: 'Receive payout to start business restoration.' }
      ]
    }
  };

  const currentDetails = details[type];

  return (
    <div className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-6 border border-blue-100 font-sans">Plan Highlights</span>
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 leading-[1.1] tracking-tight">{currentDetails.title}</h2>
          <ul className="flex flex-col gap-6 mb-12">
            {currentDetails.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] shrink-0 mt-1 shadow-lg shadow-blue-500/20 font-bold">✔</span>
                <p className="text-xl text-slate-700 font-medium leading-relaxed">{pt}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-200">
            {Object.entries(currentDetails.stats).map(([label, val]) => (
              <div key={label}>
                <p className="text-3xl md:text-4xl font-black text-blue-600 mb-2">{val}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-[450px] bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100 relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 group-hover:bg-blue-100 transition-colors"></div>
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <span className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/30">📜</span>
             Claim Process
          </h3>
          <div className="flex flex-col gap-8">
            {currentDetails.claimSteps.map((step, i) => (
              <div key={i} className="flex gap-6 relative group/step">
                {i < currentDetails.claimSteps.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-32px] w-[2px] bg-slate-100 group-hover/step:bg-blue-200 transition-colors"></div>
                )}
                <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-xs font-black text-slate-500 shrink-0 z-10 group-hover/step:bg-blue-600 group-hover/step:border-blue-600 group-hover/step:text-white transition-all duration-300">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 leading-none mb-2 uppercase text-xs tracking-widest">{step.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-12 w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group-hover:-translate-y-1">
            File a Claim Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
