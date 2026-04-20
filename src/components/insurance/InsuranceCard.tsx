import { Link } from 'react-router-dom';
import type { InsuranceCategory } from '../../data/insuranceData';
import '../../styles/globals.css';

interface InsuranceCardProps {
  category: InsuranceCategory;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ category }) => {
  return (
    <div className="premium-card group overflow-hidden hover:border-blue-500/50 transition-all duration-300 p-0 flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="relative h-40 md:h-44 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl border border-white/30 shadow-lg">
          {category.icon}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black mb-3 text-slate-900 leading-tight tracking-tight">{category.title}</h3>
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
        className="mt-auto w-full text-blue-600 font-bold flex items-center justify-between group-hover:text-blue-700 transition-colors no-underline pt-4 border-t border-slate-50"
      >
        {category.ctaText}
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
</div>
  );
};

export default InsuranceCard;
