import lifeImg from '../assets/life_insurance.png';
import healthImg from '../assets/health_insurance.png';
import carImg from '../assets/car_insurance.png';
import businessImg from '../assets/business_insurance.png';

export interface InsuranceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  benefits: string[];
  ctaText: string;
}

export const insuranceCategories: InsuranceCategory[] = [
  {
    id: 'life',
    title: 'Life Insurance',
    description: 'Protect your loved ones future with a comprehensive life insurance plan.',
    icon: '❤️',
    image: lifeImg,
    benefits: ['Financial Security', 'Debt Protection', 'Wealth Preservation'],
    ctaText: 'View Life Plans'
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Cover medical expenses and get access to the best healthcare facilities.',
    icon: '🏥',
    image: healthImg,
    benefits: ['Cashless Hospitalization', 'Pre/Post-hospitalization', 'Accident Coverage'],
    ctaText: 'Check Health Plans'
  },
  {
    id: 'car',
    title: 'Car Insurance',
    description: 'Keep your vehicle protected from accidents, theft, and natural disasters.',
    icon: '🚗',
    image: carImg,
    benefits: ['Zero Depreciation', 'Roadside Assistance', 'Legal Protection'],
    ctaText: 'Get Car Quote'
  },
  {
    id: 'business',
    title: 'Business Insurance',
    description: 'Secure your business assets and liabilities with tailored insurance solutions.',
    icon: '💼',
    image: businessImg,
    benefits: ['Property Loss', 'Liability Coverage', 'Employee Benefits'],
    ctaText: 'Business Needs'
  }
];
