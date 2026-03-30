/* src/components/insurance/InsuranceDetails.tsx */
import React from 'react';
import { Check, X, Shield, Clock } from 'lucide-react';
import TrustBar from '../common/TrustBar';
import ReviewsSection from './ReviewsSection';
import ComparisonSuite from '../compare/ComparisonSuite';

interface InsuranceDetailsProps {
  type: 'life' | 'health' | 'car' | 'business';
}

const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ type }) => {
  const details = {
    life: {
      title: 'Protect Your Legacy',
      oneLiner: 'Comprehensive life protection for you and your family.',
      points: ['Direct financial support for family', 'Tax-free death benefits (T&C)', 'Legacy for future generations', 'Debt & loan clearance protection'],
      covered: ['Natural Death', 'Accidental Death', 'Critical Illness (optional)', 'Accidental Disability'],
      notCovered: ['Suicide in first 12 months', 'Participation in risky sports', 'War or invasion related', 'Pre-existing medical conditions (undisclosed)'],
      stats: { cover: '$1M+', payout: '99.2%', clients: '250k+' },
      claimSteps: [
        { title: 'Report Loss', desc: 'Call our 24/7 dedicated bereavement line.' },
        { title: 'Upload Docs', desc: 'Securely upload certificates via mobile app.' },
        { title: 'Verification', desc: 'Instant verification by our digital claims engine.' },
        { title: 'Payout', desc: 'Funds cleared to nominee within 48 hours.' }
      ]
    },
    health: {
      title: 'Prioritize Your Wellness',
      oneLiner: 'Quality medical care without financial stress.',
      points: ['Cashless treatment at 15k+ hospitals', 'No-claim bonus up to 100%', 'Global specialist assistance', 'Digital health consultation'],
      covered: ['In-patient Hospitalization', 'Pre & Post hospital expenses', 'Daycare Procedures (100% covered)', 'Ayurvedic & Alternative care'],
      notCovered: ['Cosmetic or Plastic Surgery', 'Pregnancy (if within waiting period)', 'Alcohol or Drug related injuries', 'Optional dental treatments'],
      stats: { cover: 'Unlimited', claim: '2 hours', saved: '45%' },
      claimSteps: [
        { title: 'ID Verification', desc: 'Show your e-card at any network hospital.' },
        { title: 'Pre-Auth', desc: 'Hospital sends request; we approve in 2 hours.' },
        { title: 'Medical Review', desc: 'Our doctors coordinate care with the hospital.' },
        { title: 'Discharge', desc: 'Pay nothing; we settle direct with the facility.' }
      ]
    },
    car: {
      title: 'Drive with Confidence',
      oneLiner: 'Smart protection for your vehicle and peace of mind.',
      points: ['Instant cashless claim processing', 'Original spare parts guarantee', 'Zero depreciation coverage', 'Return to invoice benefit'],
      covered: ['Accidental Damage', 'Theft & Partial Burglary', 'Natural Disasters (Flood/Fire)', 'Third-Party Liability'],
      notCovered: ['Driving without a valid license', 'Mechanical or Electrical breakdown', 'Wear and Tear (Standard)', 'Drunken driving related damage'],
      stats: { quote: '2 mins', garages: '4k+', reviews: '4.8/5' },
      claimSteps: [
        { title: 'Spot Survey', desc: 'Record a video of the damage on our app.' },
        { title: 'Choice Garage', desc: 'Pickจาก 4,000+ garages for cashless repair.' },
        { title: 'Repair Tracking', desc: 'Get live updates on your repair status.' },
        { title: 'Quality Check', desc: 'Repair quality certified by independent surveyors.' }
      ]
    },
    business: {
      title: 'Shield Your Enterprise',
      oneLiner: 'Mitigate operational risks and secure your assets.',
      points: ['Tailored liability coverage', 'Business interruption loss recovery', 'Cyber security protection', 'Employee wellness & accident'],
      covered: ['Property Damage (Fire/Theft)', 'Public & Legal Liability', 'Machine Breakdown', 'Money in Transit / Fidelity'],
      notCovered: ['Gross negligence by management', 'Normal wear and tear of machinery', 'Consequential losses (non-insured)', 'War and Terrorism (optional)'],
      stats: { assets: '$10B+', companies: '10k+', expert: '300+' },
      claimSteps: [
        { title: 'Notify Advisor', desc: 'Get a dedicated claims manager for your case.' },
        { title: 'On-site Survey', desc: 'Technical expert visits within 6 hours.' },
        { title: 'Interim Payout', desc: 'Receive immediate funds for business continuity.' },
        { title: 'Full Settlement', desc: 'Final audit and full loss recovery.' }
      ]
    }
  };

  const currentDetails = details[type];

  return (
    <div className="bg-white">
      {/* Hero-like Title Section */}
      <div className="container pt-16 pb-10">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-100">Plan Highlights</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">{currentDetails.title}</h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mb-10">{currentDetails.oneLiner}</p>
          
          <div className="flex flex-wrap gap-12 pt-10 border-t border-slate-100">
            {Object.entries(currentDetails.stats).map(([label, val]) => (
              <div key={label}>
                <p className="text-4xl md:text-5xl font-black text-blue-600 mb-2">{val}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TrustBar />

      {/* Main Feature / Coverage Section */}
      <div className="py-20 container bg-slate-50/50 rounded-[48px] my-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 leading-tight">Comprehensive <br />Coverage Breakdown</h2>
            <div className="space-y-4 mb-16">
              {currentDetails.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:translate-x-2 transition-transform">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                     <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg text-slate-800 font-bold">{pt}</p>
                    <p className="text-sm text-slate-500 font-medium mt-1">Detailed terms and conditions will apply to this benefit.</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="pt-10 border-t border-slate-200">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8">Why Thousands Trust Us</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0"><Shield className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm uppercase mb-1">Maximum Trust</h4>
                    <p className="text-xs text-slate-500 font-medium">Licensed and regulated by top global authorities.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0"><Clock className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm uppercase mb-1">Instant Quotes</h4>
                    <p className="text-xs text-slate-500 font-medium">Get price in 2 mins, purchase in 5 mins.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Covered vs Not Covered */}
            <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                 <Shield className="w-8 h-8 text-green-500" />
                 What is Covered?
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {currentDetails.covered.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                 <X className="w-8 h-8 text-red-500" />
                 What is Not Covered?
              </h3>
              <div className="grid grid-cols-1 gap-4 opacity-80">
                {currentDetails.notCovered.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                    <X className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">* PLEASE READ POLICy DOCUMENT FOR FULL LIST OF EXCLUSIONS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 container">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Simplified Claim Settlement</h2>
           <p className="text-slate-500 font-medium text-lg">Stress-free process when you need it the most.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {currentDetails.claimSteps.map((step, i) => (
             <div key={i} className="relative group">
               <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-2xl font-black text-blue-600 shadow-xl shadow-slate-200/50 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                 {i + 1}
               </div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
               <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
               {i < 3 && (
                 <div className="hidden lg:block absolute top-8 left-[80px] w-full h-[1px] bg-slate-100 -z-10 bg-gradient-to-r from-slate-200 to-transparent"></div>
               )}
             </div>
           ))}
        </div>
      </div>

      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Available {type.charAt(0).toUpperCase() + type.slice(1)} Insurance Plans</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Compare our top-rated {type} insurance packages and choose the coverage that perfectly aligns with your needs.</p>
          </div>
          <ComparisonSuite defaultCategory={type} hideCategoryFilter={true} />
        </div>
      </section>

      <ReviewsSection category={type} />
    </div>
  );
};

export default InsuranceDetails;

