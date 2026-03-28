/* src/components/forms/QuoteForm.tsx */
import React from 'react';
import { useQuoteForm } from '../../hooks/useQuoteForm';
import '../../styles/globals.css';

const QuoteForm: React.FC = () => {
  const { formData, isSubmitting, isSuccess, handleChange, handleSubmit } = useQuoteForm();

  return (
    <form className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-xl relative overflow-hidden group" onSubmit={handleSubmit}>
      {isSuccess && (
        <div className="absolute inset-0 bg-blue-600/95 flex items-center justify-center text-center p-6 z-20 animate-fade-in text-white">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl mb-2 animate-bounce">
              ✔️
            </div>
            <h3 className="text-xl font-bold">Quote Request Sent!</h3>
            <p className="text-sm text-blue-100 mb-4">Our advisor will contact you within 15 minutes.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors text-sm">
              Awesome!
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-black mb-6 text-slate-900 leading-tight">Compare <span className="text-blue-600">Free Quotes</span> Now</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith" 
            className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-sm"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Work Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com" 
            className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-sm"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Insurance Type</label>
          <select 
            name="insuranceType"
            value={formData.insuranceType}
            onChange={handleChange}
            className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
          >
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="car">Car Insurance</option>
            <option value="business">Business Insurance</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000" 
            className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-sm"
            required
          />
        </div>
      </div>

      {/* Dynamic Fields for Car Insurance */}
      {formData.insuranceType === 'car' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 animate-fade-in">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Vehicle Make</label>
            <input 
              type="text" 
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              placeholder="e.g. Toyota" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Vehicle Model</label>
            <input 
              type="text" 
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="e.g. Camry" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Manufacturing Year</label>
            <input 
              type="number" 
              name="vehicleYear"
              value={formData.vehicleYear}
              onChange={handleChange}
              placeholder="e.g. 2022" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Registration Number</label>
            <input 
              type="text" 
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="ABC-1234" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
        </div>
      )}

      {/* Dynamic Fields for Health Insurance */}
      {formData.insuranceType === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 animate-fade-in">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Primary Insured Age</label>
            <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Years" 
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5 border-l-0">
             <label className="text-xs font-semibold text-slate-600">Medical Conditions</label>
              <select 
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-700 text-sm"
              >
                <option value="none">None</option>
                <option value="diabetes">Diabetes</option>
                <option value="hypertension">Hypertension</option>
                <option value="heart">Heart disease</option>
                <option value="other">Other</option>
              </select>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-xs font-semibold text-slate-600">Your Message (Optional)</label>
        <textarea 
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="I'm interested in..." 
          className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 resize-none text-sm"
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Generating Quotes...
          </>
        ) : (
          <>
            Get My Personalized Quote
            <span className="text-xl">→</span>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-[10px] text-slate-500 font-medium">
        🔒 Your data is encrypted and secure with us.
      </p>
    </form>
  );
};

export default QuoteForm;
