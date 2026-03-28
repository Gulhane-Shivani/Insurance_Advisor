/* src/data/carriers.ts */

export interface InsurancePlan {
  id: string;
  carrierId: string;
  carrierName: string;
  carrierLogo: string;
  planName: string;
  type: 'life' | 'health' | 'car' | 'business';
  monthlyPrice: number;
  coverageAmount: string;
  benefits: string[];
  rating: number;
  features: {
    cashless?: boolean;
    maternity?: boolean;
    roadside?: boolean;
    zeroDep?: boolean;
  };
}

export interface Carrier {
  id: string;
  name: string;
  logo: string;
  rating: number;
}

export const carriers: Carrier[] = [
  { id: 'star-health', name: 'Star Health', logo: 'https://logo.clearbit.com/starhealth.in', rating: 4.5 },
  { id: 'hdfc-ergo', name: 'HDFC Ergo', logo: 'https://logo.clearbit.com/hdfcergo.com', rating: 4.8 },
  { id: 'icici-lombard', name: 'ICICI Lombard', logo: 'https://logo.clearbit.com/icicilombard.com', rating: 4.7 },
  { id: 'tata-aig', name: 'Tata AIG', logo: 'https://logo.clearbit.com/tataaig.com', rating: 4.6 },
];

export const insurancePlans: InsurancePlan[] = [
  {
    id: 'plan-1',
    carrierId: 'star-health',
    carrierName: 'Star Health',
    carrierLogo: 'https://logo.clearbit.com/starhealth.in',
    planName: 'Family Health Optima',
    type: 'health',
    monthlyPrice: 1200,
    coverageAmount: '₹5,00,000',
    benefits: ['Cashless Treatment', 'No Room Rent Cap', 'Air Ambulance'],
    rating: 4.5,
    features: { cashless: true, maternity: true }
  },
  {
    id: 'plan-2',
    carrierId: 'hdfc-ergo',
    carrierName: 'HDFC Ergo',
    carrierLogo: 'https://logo.clearbit.com/hdfcergo.com',
    planName: 'Optima Secure',
    type: 'health',
    monthlyPrice: 1550,
    coverageAmount: '₹10,00,000',
    benefits: ['2x Coverage', 'Global Coverage', 'OPD Benefit'],
    rating: 4.9,
    features: { cashless: true, maternity: true }
  },
  {
    id: 'plan-3',
    carrierId: 'icici-lombard',
    carrierName: 'ICICI Lombard',
    carrierLogo: 'https://logo.clearbit.com/icicilombard.com',
    planName: 'Motor Insurance Plus',
    type: 'car',
    monthlyPrice: 850,
    coverageAmount: 'IDV ₹8,50,000',
    benefits: ['Zero Dep', 'Personal Accident', 'Key Replacement'],
    rating: 4.6,
    features: { roadside: true, zeroDep: true }
  },
  {
    id: 'plan-4',
    carrierId: 'tata-aig',
    carrierName: 'Tata AIG',
    carrierLogo: 'https://logo.clearbit.com/tataaig.com',
    planName: 'Auto Safe',
    type: 'car',
    monthlyPrice: 790,
    coverageAmount: 'IDV ₹7,90,000',
    benefits: ['Engine Secure', 'Invoice Cover', 'Emergency Med-Evac'],
    rating: 4.4,
    features: { roadside: true, zeroDep: true }
  },
  {
    id: 'plan-5',
    carrierId: 'hdfc-ergo',
    carrierName: 'HDFC Ergo',
    carrierLogo: 'https://logo.clearbit.com/hdfcergo.com',
    planName: 'Life Click 2 Protect',
    type: 'life',
    monthlyPrice: 2200,
    coverageAmount: '₹1,00,00,000',
    benefits: ['Critical Illness', 'Terminal Illness Cover', 'Accident Rider'],
    rating: 4.8,
    features: { }
  }
];
