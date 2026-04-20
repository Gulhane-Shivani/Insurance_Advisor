import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/common/PageLayout';
import HealthInsuCalculator from '../../components/forms/HealthInsuCalculator';
import LifeInsuCalculator from '../../components/forms/LifeInsuCalculator';
import CarInsuCalculator from '../../components/forms/CarInsuCalculator';
import BusinessInsuCalculator from '../../components/forms/BusinessInsuCalculator';

const CalculatorPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  return (
    <PageLayout bg="bg-slate-50">
      <div className="py-20 container">
        <div className="max-w-6xl mx-auto">
          {type === 'health' && <HealthInsuCalculator />}
          {type === 'life' && <LifeInsuCalculator />}
          {type === 'car' && <CarInsuCalculator />}
          {type === 'business' && <BusinessInsuCalculator />}
          
          {!['health', 'life', 'car', 'business'].includes(type || '') && (
            <div className="text-center py-20 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-4">Calculator Not Found</h2>
                <p className="text-slate-500 font-medium">Please select a valid insurance category to calculate your premium.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CalculatorPage;
