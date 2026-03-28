import { Link } from 'react-router-dom';
import type { InsuranceCategory } from '../../data/insuranceData';
import '../../styles/globals.css';

interface InsuranceCardProps {
  category: InsuranceCategory;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ category }) => {
  return (
    <div className="premium-card group hover:border-blue-500/50 transition-all duration-300">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {category.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight">{category.title}</h3>
      <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed text-sm lg:text-base">
        {category.description}
      </p>
      <ul className="mb-8 flex flex-col gap-3">
        {category.benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
            {benefit}
          </li>
        ))}
      </ul>
      <Link 
        to={`/insurance/${category.id}`} 
        className="w-full text-blue-600 font-bold flex items-center justify-between group-hover:text-blue-700 transition-colors no-underline"
      >
        {category.ctaText}
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  );
};

export default InsuranceCard;
