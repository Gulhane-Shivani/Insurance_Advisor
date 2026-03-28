import PageLayout from '../../components/common/PageLayout';
import InsuranceDetails from '../../components/insurance/InsuranceDetails';
import QuoteForm from '../../components/forms/QuoteForm';
import SectionTitle from '../../components/common/SectionTitle';

const LifeInsurancePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-16">        
        <InsuranceDetails type="life" />
        <div className="py-24 container flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-slate-900 leading-tight text-center tracking-tight">Get Your Life Insurance <br /><span className="text-blue-600 underline decoration-blue-500/30 underline-offset-8">Quote In 2 Minutes</span></h2>
          <div className="w-full max-w-2xl bg-white p-8 rounded-[48px] shadow-2xl shadow-slate-200/50">
            <QuoteForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LifeInsurancePage;
