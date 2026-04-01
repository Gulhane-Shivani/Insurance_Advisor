import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import InsuranceCard from '../insurance/InsuranceCard';
import { insuranceCategories } from '../../data/insuranceData';
import '../../styles/globals.css';

const Categories: React.FC = () => {
  return (
    <section className="py-16 md:py-24 container">
      <SectionTitle 
        title="Comprehensive Insurance for Every Need"
        subtitle="Explore our wide range of insurance products tailored to protect what matters most to you."
        align="center"
        badge="Our Coverage"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {insuranceCategories.map((category) => (
          <InsuranceCard key={category.id} category={category} />
        ))}
      </div>
      <div className="mt-16 text-center">
        <Link to="/insurance" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto w-fit no-underline">
          Explore All Plans
          <span className="text-xl">→</span>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
