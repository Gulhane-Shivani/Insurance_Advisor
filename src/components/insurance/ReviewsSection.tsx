/* src/components/insurance/ReviewsSection.tsx */
import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  category: string;
}

const reviews: Review[] = [
  { id: 1, name: 'Michael Chen', role: 'Software Engineer', avatar: 'MC', category: 'life', rating: 5, content: 'The life insurance plan gave my family and me tremendous peace of mind. The process was almost entirely digital and transparent.' },
  { id: 2, name: 'Sarah Johnson', role: 'Mother of Two', avatar: 'SJ', category: 'health', rating: 5, content: 'The health coverage saved us from huge medical bills during my surgery. Cashless approval was handled in less than 2 hours.' },
  { id: 3, name: 'Chris Evans', role: 'Logistics Manager', avatar: 'CE', category: 'car', rating: 4, content: 'Claimed insurance after a minor accident. The spot video survey was super convenient and the garage was top-notch.' },
  { id: 4, name: 'David Miller', role: 'Startup Founder', avatar: 'DM', category: 'business', rating: 5, content: 'Protecting our office and liability through this platform was the best decision for our startup. Great expert consultation.' },
  { id: 5, name: 'Elena Rodriguez', role: 'Architect', avatar: 'ER', category: 'life', rating: 5, content: 'Finally an insurance that speaks human language. No hidden jargon in the life policy. Highly satisfied.' },
  { id: 6, name: 'Ananya Gupta', role: 'Retailer', avatar: 'AG', category: 'health', rating: 5, content: 'Global health coverage works seamlessly! Had an emergency in Germany and it was perfectly covered.' }
];

interface ReviewsSectionProps {
  category?: 'life' | 'health' | 'car' | 'business';
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ category }) => {
  const filteredReviews = category 
    ? reviews.filter(r => r.category === category) 
    : reviews;

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest border border-blue-100">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-6 tracking-tight">Voices of Our <span className="text-blue-600 underline decoration-blue-500/20 underline-offset-8">Clients</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 relative group hover:bg-slate-900 hover:text-white transition-all duration-500">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                ))}
              </div>

              <p className="text-lg font-medium leading-relaxed mb-8 italic">"{review.content}"</p>

              <div className="flex items-center gap-4 pt-8 border-t border-slate-200 group-hover:border-white/10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-sm">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-white transition-colors">{review.name}</h4>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 font-bold uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
