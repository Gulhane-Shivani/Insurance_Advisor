/* src/data/insuranceData.ts */
export interface InsuranceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  ctaText: string;
}

export const insuranceCategories: InsuranceCategory[] = [
  {
    id: 'life',
    title: 'Life Insurance',
    description: 'Protect your loved ones future with a comprehensive life insurance plan.',
    icon: '❤️',
    benefits: ['Financial Security', 'Debt Protection', 'Wealth Preservation'],
    ctaText: 'View Life Plans'
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Cover medical expenses and get access to the best healthcare facilities.',
    icon: '🏥',
    benefits: ['Cashless Hospitalization', 'Pre/Post-hospitalization', 'Accident Coverage'],
    ctaText: 'Check Health Plans'
  },
  {
    id: 'car',
    title: 'Car Insurance',
    description: 'Keep your vehicle protected from accidents, theft, and natural disasters.',
    icon: '🚗',
    benefits: ['Zero Depreciation', 'Roadside Assistance', 'Legal Protection'],
    ctaText: 'Get Car Quote'
  },
  {
    id: 'business',
    title: 'Business Insurance',
    description: 'Secure your business assets and liabilities with tailored insurance solutions.',
    icon: '💼',
    benefits: ['Property Loss', 'Liability Coverage', 'Employee Benefits'],
    ctaText: 'Business Needs'
  }
];
