/* src/hooks/useQuoteForm.ts */
import { useState } from 'react';

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  insuranceType: 'life' | 'health' | 'car' | 'business';
  message: string;
  // Dynamic fields
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  registrationNumber?: string;
  age?: string;
  medicalConditions?: string;
}

export const useQuoteForm = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    insuranceType: 'life',
    message: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    registrationNumber: '',
    age: '',
    medicalConditions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Form Submitted:', formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Find comparison section and scroll to it
    const comparisonSection = document.getElementById('comparison-suite-section');
    if (comparisonSection) {
      setTimeout(() => {
        comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight the comparison section temporarily to draw attention
        comparisonSection.classList.add('ring-4', 'ring-blue-500', 'ring-offset-4', 'transition-all', 'duration-1000');
        setTimeout(() => {
           comparisonSection.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-4');
        }, 3000);
      }, 100);
    }
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
  };
};
