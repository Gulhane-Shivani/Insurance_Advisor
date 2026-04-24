import React, { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

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
    
    try {
      // Map frontend fields to backend schema
      const payload = {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        insurance_type: formData.insuranceType,
        vehicle_make: formData.vehicleMake || 'N/A',
        vehicle_model: formData.vehicleModel || 'N/A',
        manufacturing_year: formData.vehicleYear || 'N/A',
        registration_number: formData.registrationNumber || 'N/A',
        message: formData.message,
      };

      await api.post('/insurance/apply', payload);
      
      setIsSuccess(true);
      toast.success('Quote request submitted successfully!');
      
      // Reset form
      setFormData({
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

    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to submit quote request';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
    
    // Find comparison section and scroll to it
    const comparisonSection = document.getElementById('comparison-suite-section');
    if (comparisonSection) {
      setTimeout(() => {
        comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
