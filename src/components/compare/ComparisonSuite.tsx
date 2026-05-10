/* src/components/compare/ComparisonSuite.tsx */
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Star, 
  X, 
  Search, 
  Zap, 
  ClipboardList, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  CreditCard,
  Lock
} from 'lucide-react';
import { insurancePlans, carriers } from '../../data/carriers';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import '../../styles/globals.css';

interface ComparisonSuiteProps {
  defaultCategory?: 'all' | 'life' | 'health' | 'car' | 'business';
  hideCategoryFilter?: boolean;
}

const ComparisonSuite: React.FC<ComparisonSuiteProps> = ({ 
  defaultCategory = 'all', 
  hideCategoryFilter = false 
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [filterType, setFilterType] = useState<'all' | 'life' | 'health' | 'car' | 'business'>(defaultCategory);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('all');
  const [viewingPlan, setViewingPlan] = useState<typeof insurancePlans[0] | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'details' | 'terms' | 'payment'>('details');
  const [selectedComparePlans, setSelectedComparePlans] = useState<typeof insurancePlans[0][]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const allPlans = useMemo(() => {
    const savedPlansRaw = localStorage.getItem('custom_insurance_plans');
    if (!savedPlansRaw) return insurancePlans;

    try {
      const savedPlans = JSON.parse(savedPlansRaw);
      // Map PolicyPlan back to InsurancePlan format
      const mappedPlans = savedPlans.map((p: any) => ({
        id: p.id,
        carrierId: p.provider.toLowerCase().replace(/ /g, '-'),
        carrierName: p.provider,
        carrierLogo: p.logo || `https://www.google.com/s2/favicons?domain=${
          p.provider === 'Star Health' ? 'starhealth.in' :
          p.provider === 'HDFC Ergo' ? 'hdfcergo.com' :
          p.provider === 'ICICI Lombard' ? 'icicilombard.com' :
          p.provider === 'Tata AIG' ? 'tataaig.com' :
          p.provider.toLowerCase().replace(/ /g, '') + '.com'
        }&sz=128`,
        planName: p.name,
        type: p.category.toLowerCase().split(' ')[0] as any, // 'health', 'life', 'car', 'business'
        monthlyPrice: p.monthlyPrice,
        coverageAmount: p.coverage,
        benefits: p.topBenefits,
        rating: p.rating,
        features: {}
      }));
      return mappedPlans;
    } catch (e) {
      return insurancePlans;
    }
  }, []);

  const filteredPlans = useMemo(() => {
    return allPlans.filter((plan: any) => {
      const typeMatch = filterType === 'all' || plan.type === filterType;
      const priceMatch = plan.monthlyPrice <= maxPrice;
      const carrierMatch = selectedCarrier === 'all' || plan.carrierId === selectedCarrier;
      return typeMatch && priceMatch && carrierMatch;
    });
  }, [filterType, maxPrice, selectedCarrier, allPlans]);

  const handleCloseModal = () => {
    setViewingPlan(null);
    setPurchaseStep('details');
    setAcceptedTerms(false);
  };

  const handleProceedToBuy = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue with the purchase');
      navigate('/login');
      return;
    }
    setPurchaseStep('terms');
  };

  const handleFinalPurchase = () => {
    if (!acceptedTerms) {
      toast.error('Please accept the Terms & Conditions');
      return;
    }
    
    toast.loading('Processing policy issuance...', { duration: 2000 });
    
    setTimeout(() => {
      toast.success('Policy purchased successfully!');
      // Redirection logic: Dashboard with 'my_policies' active
      navigate('/dashboard', { state: { activeSection: 'policies', newPolicy: viewingPlan } });
      handleCloseModal();
    }, 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement;
      target.style.display = 'none';
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Filters Hub */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6">
          {!hideCategoryFilter && (
            <div className="flex flex-col gap-3 min-w-[200px]">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Insurance Category</label>
              <select 
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">All Categories</option>
                <option value="life">Life Insurance</option>
                <option value="health">Health Insurance</option>
                <option value="car">Car Insurance</option>
                <option value="business">Business Insurance</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-3 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Provider</label>
            <select 
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
            >
              <option value="all">All Carriers</option>
              {Array.from(new Set(allPlans.map((p: any) => p.carrierName))).sort().map((name) => (
                <option key={name} value={name.toLowerCase().replace(/ /g, '-')}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 flex-1 min-w-[240px]">
            <div className="flex justify-between items-center">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Max Monthly Budget</label>
               <span className="font-bold text-blue-600">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="100" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all p-4 flex flex-col gap-3 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/40 transition-colors"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center p-1.5 border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={plan.carrierLogo} 
                      alt={plan.carrierName} 
                      className="w-full h-full object-contain" 
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-base font-black text-slate-900 line-clamp-1">{plan.planName}</h3>
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-500">{plan.carrierName}</span>
                       <span className="px-1.5 py-0.5 rounded-md bg-yellow-50 text-yellow-600 text-[8px] font-bold uppercase tracking-tighter flex items-center gap-0.5">
                         <Star className="w-2 h-2 fill-yellow-600" /> {plan.rating}
                       </span>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-lg font-black text-blue-600">₹{plan.monthlyPrice}</p>
                     <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">per month</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-50">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                    <p className="text-xs font-black text-slate-900">{plan.coverageAmount}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Top Benefits</p>
                    <ul className="flex flex-col gap-0.5">
                      {plan.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="text-[9px] font-semibold text-slate-600 flex items-center gap-1">
                          <Check className="w-2 h-2 text-green-500" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mt-1 pt-3 border-t border-slate-50">
                  <label className="flex items-center gap-1.5 cursor-pointer group/checkbox flex-1">
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${selectedComparePlans.find(p => p.id === plan.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white group-hover/checkbox:border-blue-400'}`}>
                      {selectedComparePlans.find(p => p.id === plan.id) && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider transition-colors ${selectedComparePlans.find(p => p.id === plan.id) ? 'text-blue-600' : 'text-slate-400 group-hover/checkbox:text-slate-600'}`}>Compare</span>
                    <input 
                      type="checkbox"
                      className="hidden"
                      checked={!!selectedComparePlans.find(p => p.id === plan.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                           if (selectedComparePlans.length < 3) setSelectedComparePlans([...selectedComparePlans, plan]);
                           else toast.error("Max 3 plans for comparison");
                        } else {
                           setSelectedComparePlans(selectedComparePlans.filter(p => p.id !== plan.id));
                        }
                      }}
                    />
                  </label>
                  <button 
                    onClick={() => setViewingPlan(plan)}
                    className="flex-1 flex items-center justify-center gap-1 bg-slate-900 text-white py-1.5 rounded-lg font-bold text-[9px] uppercase hover:bg-blue-600 transition-colors shadow-md active:scale-95 whitespace-nowrap"
                  >
                    View Plan <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center px-10 border-2 border-dashed border-slate-200 rounded-[40px]">
               <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6"><Search className="w-8 h-8 text-slate-300" /></div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">No plans found!</h3>
               <p className="text-slate-500 max-w-sm">Adjust your filters or price range to find better matches.</p>
            </div>
          )}
        </div>
      </div>

      {/* Compare Action Bar */}
      {selectedComparePlans.length > 0 && (
        <div className="fixed bottom-6 left-2 right-2 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto bg-slate-900 text-white pl-4 pr-2 py-2 rounded-2xl sm:rounded-full shadow-2xl flex items-center justify-between sm:justify-start gap-4 z-40 border border-white/10 animate-fade-in">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {selectedComparePlans.map((p, i) => (
                  <div key={p.id} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center overflow-hidden" style={{zIndex: 10 - i}}>
                    <img src={p.carrierLogo} className="w-full h-full object-contain p-1" onError={handleImageError} />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold leading-tight">{selectedComparePlans.length} Plans Selected</p>
           </div>
           <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              <button onClick={() => toast('Comparison table coming soon')} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg">Compare Now</button>
              <button onClick={() => setSelectedComparePlans([])} className="text-slate-400 hover:text-white transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"><X className="w-4 h-4" /></button>
           </div>
        </div>
      )}

      {/* Buying Modal Flow */}
      {viewingPlan && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors z-20"><X className="w-5 h-5" /></button>

            {purchaseStep === 'details' && (
              <div className="p-8 md:p-10 pt-16">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shadow-sm">
                      <img src={viewingPlan.carrierLogo} className="max-h-full max-w-full object-contain" onError={handleImageError} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">{viewingPlan.planName}</h2>
                      <p className="text-slate-500 font-bold">{viewingPlan.carrierName}</p>
                    </div>
                  </div>
                  <div className="text-right"><p className="text-3xl font-black text-blue-600">₹{viewingPlan.monthlyPrice}</p></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2"><ClipboardList className="w-4 h-4 text-blue-600" /> Plan Benefits</h4>
                    <ul className="space-y-3">
                      {viewingPlan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3"><Check className="w-3.5 h-3.5 text-green-500 mt-0.5" /><span className="text-sm font-semibold text-slate-600">{benefit}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><Zap className="w-4 h-4 text-orange-500" /> Checkout Progress</h4>
                    <div className="space-y-4">
                      {[
                        { step: 1, label: 'Review & Confirm', active: true },
                        { step: 2, label: 'Terms & Conditions', active: false },
                        { step: 3, label: 'Instant Payment', active: false },
                      ].map((s) => (
                        <div key={s.step} className={`flex items-center gap-3 p-3 rounded-xl border ${s.active ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${s.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>{s.step}</span>
                          <span className={`text-xs font-bold ${s.active ? 'text-blue-600' : 'text-slate-500'}`}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleProceedToBuy} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">Proceed to Buy Now <ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            )}

            {purchaseStep === 'terms' && (
              <div className="p-8 md:p-10 pt-16">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><FileText className="w-6 h-6" /></div>
                   <div>
                      <h2 className="text-xl font-black text-slate-900">Terms & Conditions</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Policy Agreement • {viewingPlan.planName}</p>
                   </div>
                </div>
                <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-200 max-h-[300px] overflow-auto text-sm text-slate-600 space-y-4 font-medium leading-relaxed mb-8">
                   <p className="font-bold text-slate-900">1. Coverage Details</p>
                   <p>By proceeding, you agree that the coverage of ₹{viewingPlan.coverageAmount} is subject to the underwriting guidelines of {viewingPlan.carrierName}. Any pre-existing conditions not disclosed may void the policy.</p>
                   <p className="font-bold text-slate-900">2. Premium Payments</p>
                   <p>Monthly premium of ₹{viewingPlan.monthlyPrice} will be auto-debited on the 1st of every month. Grace period for payment is 15 days.</p>
                   <p className="font-bold text-slate-900">3. Cancellation & Refund</p>
                   <p>Free-look period of 15 days is applicable from the date of policy issuance. Full refund will be provided if cancelled within this period.</p>
                   <p className="font-bold text-slate-900">4. Claim Process</p>
                   <p>Claims must be registered within 48 hours of the event through our online portal or 24/7 helpline.</p>
                </div>
                <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setAcceptedTerms(!acceptedTerms)}>
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${acceptedTerms ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                      {acceptedTerms && <Check className="w-4 h-4" />}
                   </div>
                   <p className="text-xs font-bold text-slate-600">I have read and agree to the Policy Terms & Conditions and Carrier Guidelines.</p>
                </div>
                <div className="flex gap-4">
                   <button onClick={() => setPurchaseStep('details')} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500">Back</button>
                   <button onClick={() => setPurchaseStep('payment')} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Accept & Continue</button>
                </div>
              </div>
            )}

            {purchaseStep === 'payment' && (
              <div className="p-8 md:p-10 pt-16">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><CreditCard className="w-6 h-6" /></div>
                    <div>
                       <h2 className="text-xl font-black text-slate-900">Finalize Purchase</h2>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Checkout</p>
                    </div>
                 </div>
                 <div className="space-y-4 mb-10">
                    <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center"><Lock className="w-5 h-5 text-slate-400" /></div>
                          <div><p className="text-xs font-black text-slate-900">Total Premium</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Cycle</p></div>
                       </div>
                       <p className="text-xl font-black text-blue-600">₹{viewingPlan.monthlyPrice}</p>
                    </div>
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex items-start gap-3">
                       <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                       <p className="text-[10px] font-bold text-emerald-700 leading-relaxed uppercase tracking-wide">Secure payment processing is active. Your data is encrypted with bank-grade security protocols.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => setPurchaseStep('terms')} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500">Back</button>
                    <button onClick={handleFinalPurchase} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Confirm & Buy Plan</button>
                 </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ComparisonSuite;
