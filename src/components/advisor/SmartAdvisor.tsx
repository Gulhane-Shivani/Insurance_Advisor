import React, { useState } from 'react';
import { ArrowRight, Check, Shield, Activity, Car, Briefcase, Star, Zap, User, Users, ChevronRight, ActivitySquare, AlertTriangle } from 'lucide-react';

type Step = 1 | 2 | 3;

interface Profile {
  age: string;
  gender: string;
  city: string;
  income: string;
  family: string[];
}

interface Goals {
  protect: string[];
  priority: string;
}

const SmartAdvisor: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<Profile>({ age: '', gender: '', city: '', income: '500000', family: [] });
  const [goals, setGoals] = useState<Goals>({ protect: [], priority: '' });
  const [isCalculating, setIsCalculating] = useState(false);

  const toggleFamily = (member: string) => {
    setProfile(p => ({
      ...p,
      family: p.family.includes(member) ? p.family.filter(m => m !== member) : [...p.family, member]
    }));
  };

  const toggleProtect = (item: string) => {
    setGoals(g => ({
      ...g,
      protect: g.protect.includes(item) ? g.protect.filter(i => i !== item) : [...g.protect, item]
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setStep(3);
    setTimeout(() => {
      setIsCalculating(false);
    }, 2000);
  };

  // Basic logic engine based on prompt criteria
  const getRecommendations = () => {
    const age = parseInt(profile.age) || 30;
    const income = parseInt(profile.income) || 500000;
    const isFamily = profile.family.includes('Spouse') || profile.family.includes('Kids');
    const isParents = profile.family.includes('Parents');
    
    let lifeCover = income * 15;
    let lifeCoverText = lifeCover >= 10000000 ? `₹${(lifeCover/10000000).toFixed(1)} Cr` : `₹${(lifeCover/100000).toFixed(1)} Lac`;
    
    let riskLabel = age > 50 ? 'High' : (age > 35 ? 'Medium' : 'Low');
    let riskColor = age > 50 ? 'text-red-600 bg-red-50 border-red-200' : (age > 35 ? 'text-orange-600 bg-orange-50 border-orange-200' : 'text-green-600 bg-green-50 border-green-200');

    let advisedPlans = [];

    // Life Insurance Logic
    if (goals.protect.includes('Family Future') || isFamily) {
      advisedPlans.push({
        type: 'Life Insurance',
        icon: <User className="w-5 h-5 text-blue-500" />,
        color: 'blue',
        plan: 'Pure Term Protection',
        coverage: lifeCoverText,
        premium: age < 30 ? '₹500/mo' : '₹1,200/mo',
        match: age < 30 ? '98%' : '92%',
        reason: `Recommended 15x of your annual income (₹${(income/100000).toFixed(1)}L) to secure your family's future.`,
        features: ['100% Payout on Death', 'Tax Benefits under 80C', 'Waiver of Premium'],
        csr: '99.2% Claim Settlement'
      });
    }

    // Health Insurance Logic
    if (goals.protect.includes('Health') || goals.protect.length === 0) {
      advisedPlans.push({
        type: 'Health Insurance',
        icon: <Activity className="w-5 h-5 text-green-500" />,
        color: 'green',
        plan: isFamily ? 'Family Floater Plan' : 'Individual Comprehensive',
        coverage: isFamily ? '₹10 Lac' : '₹5 Lac',
        premium: isFamily ? '₹1,500/mo' : '₹600/mo',
        match: '95%',
        reason: isFamily ? 'A shared safety net covering hospitalization for you, your spouse, and kids.' : 'Essential coverage for medical emergencies with low premiums for young adults.',
        features: ['Cashless at 15k+ Hospitals', 'No Room Rent Capping', 'Free Annual Checkup'],
        csr: '98.5% Claim Settlement'
      });
    }

    if (isParents) {
      advisedPlans.push({
        type: 'Senior Health',
        icon: <ActivitySquare className="w-5 h-5 text-purple-500" />,
        color: 'purple',
        plan: 'Senior Citizen Health Care',
        coverage: '₹5 Lac',
        premium: '₹2,500/mo',
        match: '88%',
        reason: 'Dedicated plan designed for parents with coverage for pre-existing diseases after 1 year.',
        features: ['Ayush Treatment Covered', 'No Pre-medical Screening', 'Day Care Procedures'],
        csr: '96.4% Claim Settlement'
      });
    }

    if (goals.protect.includes('Vehicle')) {
      advisedPlans.push({
        type: 'Car Insurance',
        icon: <Car className="w-5 h-5 text-orange-500" />,
        color: 'orange',
        plan: 'Comprehensive Auto Shield',
        coverage: 'IDV ₹8 Lac',
        premium: '₹12,000/yr',
        match: '90%',
        reason: 'Full protection against accidents, theft, and third-party liabilities for complete peace of mind.',
        features: ['Zero Depreciation Cover', 'Roadside Assistance 24/7', 'Engine Protection'],
        csr: '97.1% Claim Settlement'
      });
    }
    
    if (goals.protect.includes('Business')) {
      advisedPlans.push({
        type: 'Business Insurance',
        icon: <Briefcase className="w-5 h-5 text-slate-500" />,
        color: 'slate',
        plan: 'SME Protection Suite',
        coverage: '₹50 Lac',
        premium: '₹3,000/mo',
        match: '85%',
        reason: 'Covers physical assets, inventory, and public liabilities for your growing enterprise.',
        features: ['Fire & Burglary', 'Public Liability', 'Business Interruption'],
        csr: '95.8% Claim Settlement'
      });
    }

    return { advisedPlans, riskLabel, riskColor, lifeCoverText };
  };

  const { advisedPlans, riskLabel, riskColor, lifeCoverText } = getRecommendations();

  return (
    <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-100 max-w-5xl mx-auto overflow-hidden flex flex-col md:flex-row relative">
      
      {/* Left Sidebar Wizard Progress */}
      <div className="md:w-1/3 bg-slate-900 text-white p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6 md:mb-12">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">SmartAdvisor™</span>
          </div>

          <p className="text-slate-400 font-medium mb-6 md:mb-8 text-sm leading-relaxed hidden md:block">Let our AI engine analyze your profile and find the exact coverage your family needs.</p>

          <div className="flex md:flex-col gap-4 md:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className={`flex items-start gap-4 transition-opacity flex-shrink-0 ${step === 1 ? 'opacity-100' : 'opacity-40 md:opacity-50'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0 ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>1</div>
              <div className="hidden sm:block">
                <h4 className={`font-bold text-[10px] md:text-sm whitespace-nowrap ${step >= 1 ? 'text-white' : 'text-slate-400'}`}>Basic Profile</h4>
                <p className="text-[10px] text-slate-500 mt-1 hidden md:block">Age & Family</p>
              </div>
            </div>
            <div className={`flex items-start gap-4 transition-opacity flex-shrink-0 ${step === 2 ? 'opacity-100' : 'opacity-40 md:opacity-50'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0 ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>2</div>
              <div className="hidden sm:block">
                <h4 className={`font-bold text-[10px] md:text-sm whitespace-nowrap ${step >= 2 ? 'text-white' : 'text-slate-400'}`}>Goals</h4>
                <p className="text-[10px] text-slate-500 mt-1 hidden md:block">What matters most</p>
              </div>
            </div>
            <div className={`flex items-start gap-4 transition-opacity flex-shrink-0 ${step === 3 ? 'opacity-100' : 'opacity-40 md:opacity-50'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0 ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>3</div>
              <div className="hidden sm:block">
                <h4 className={`font-bold text-[10px] md:text-sm whitespace-nowrap ${step >= 3 ? 'text-white' : 'text-slate-400'}`}>Matches</h4>
                <p className="text-[10px] text-slate-500 mt-1 hidden md:block">Your matches</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="md:w-2/3 p-8 md:p-12 relative bg-slate-50 min-h-[500px]">
        
        {/* STEP 1: Basic Profile */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Tell us about yourself</h2>
            <p className="text-sm text-slate-500 font-medium mb-8">We use this to calculate specific risk multipliers and coverage needs.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 focus-within:text-blue-600 transition-colors">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Age</label>
                  <input type="number" placeholder="28" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-1.5 focus-within:text-blue-600 transition-colors">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Annual Income (₹)</label>
                  <input type="number" placeholder="600000" value={profile.income} onChange={e => setProfile({...profile, income: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Who do you want to protect?</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Self', 'Spouse', 'Kids', 'Parents'].map(member => (
                    <button 
                      key={member}
                      onClick={() => toggleFamily(member)}
                      className={`px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${profile.family.includes(member) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                    >
                      {member}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 focus-within:text-blue-600 transition-colors pt-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">City / Pincode</label>
                <input type="text" placeholder="e.g. 411028" value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} className="w-full max-w-xs bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setStep(2)}
                disabled={!profile.age || !profile.income}
                className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Goals */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Configure Your Goals</h2>
            <p className="text-sm text-slate-500 font-medium mb-8">What exactly are you looking to secure right now?</p>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">What do you want to protect?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'Health', icon: <Activity className="w-5 h-5 mb-2" /> },
                    { id: 'Family Future', icon: <Users className="w-5 h-5 mb-2" /> },
                    { id: 'Vehicle', icon: <Car className="w-5 h-5 mb-2" /> },
                    { id: 'Business', icon: <Briefcase className="w-5 h-5 mb-2" /> }
                  ].map(goal => (
                    <button 
                      key={goal.id}
                      onClick={() => toggleProtect(goal.id)}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all active:scale-95 ${goals.protect.includes(goal.id) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                    >
                      <div className={goals.protect.includes(goal.id) ? 'text-blue-600' : 'text-slate-400'}>{goal.icon}</div>
                      <span className="font-bold text-sm">{goal.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">What is your primary priority?</label>
                <select 
                  value={goals.priority}
                  onChange={e => setGoals({...goals, priority: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a priority...</option>
                  <option value="Low Premium">Low Premium (Most Affordable)</option>
                  <option value="High Coverage">Maximum Coverage (Highest Security)</option>
                  <option value="Tax Saving">Tax Saving Benefits</option>
                  <option value="Fast Claim">Fast Claim Settlement Ratio</option>
                </select>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center">
              <button 
                onClick={() => setStep(1)}
                className="text-slate-500 font-bold text-sm hover:text-slate-900 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={handleCalculate}
                disabled={goals.protect.length === 0 || !goals.priority}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Analyze Needs <Zap className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Smart Recommendations */}
        {step === 3 && (
          <div className="animate-fade-in h-full flex flex-col">
            {isCalculating ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Analyzing Profile...</h3>
                <p className="text-sm font-medium text-slate-500 text-center max-w-xs">Our AI is computing optimal coverage limits based on your ₹{parseInt(profile.income).toLocaleString()} income and family setup.</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Your Smart Portfolio</h2>
                    <p className="text-sm font-medium text-slate-500">Customized for a {profile.age} yr old based in {profile.city || 'India'}.</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${riskColor}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">Risk Profile</p>
                      <p className="font-black text-sm leading-none mt-1">{riskLabel} Priority</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-start gap-4 shadow-sm shadow-blue-500/5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-900 text-sm mb-1">Advisor Message</h4>
                    <p className="text-xs font-medium text-blue-800 leading-relaxed">
                      "Based on your {goals.priority.toLowerCase()} goal and family dependents, a <strong className="font-black">{lifeCoverText} term plan</strong> is highly recommended. I've also bundled suitable {advisedPlans.filter(p=>p.type !== 'Life Insurance').map(p=>p.type).join(' and ')} packages to protect your assets."
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {advisedPlans.map((plan, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-${plan.color}-50 flex items-center justify-center shadow-inner`}>
                            {plan.icon}
                          </div>
                          <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest text-${plan.color}-600 bg-${plan.color}-50 px-2 py-0.5 rounded-md inline-block mb-1`}>{plan.type}</span>
                            <h3 className="font-black text-slate-900">{plan.plan}</h3>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between">
                          <p className="text-xl font-black text-slate-900">{plan.premium}</p>
                          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md mt-1">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-black">{plan.match} Match Score</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 mb-4">
                        <p className="text-xs text-slate-700 font-medium mb-3"><strong className="text-slate-900 font-bold">Why this plan?</strong> {plan.reason}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <div className="w-full sm:w-auto">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Coverage</span>
                            <span className="text-sm font-black text-slate-900">{plan.coverage}</span>
                          </div>
                          <div className="w-px bg-slate-200 hidden sm:block"></div>
                          <div className="w-full sm:w-auto">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Trust Metric</span>
                            <span className="text-xs font-bold text-green-600 flex items-center gap-1"><Shield className="w-3 h-3" /> {plan.csr}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <ul className="flex flex-wrap gap-2 flex-1">
                          {plan.features.map((f, i) => (
                            <li key={i} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md flex items-center gap-1">
                              <Check className="w-3 h-3 text-blue-500" /> {f}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full sm:w-auto bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-blue-600 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2">
                          View Actual Plans <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <button onClick={() => { setStep(1); setGoals({protect:[], priority:''}); }} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Restart Advisor</button>
                  <p className="text-[10px] text-slate-400 max-w-xs text-right font-medium">These are AI-calculated baseline recommendations. Actual premiums apply based on final underwriting.</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default SmartAdvisor;
