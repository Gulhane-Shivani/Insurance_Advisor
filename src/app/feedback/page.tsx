import React, { useState } from 'react';
import PageLayout from '../../components/common/PageLayout';
import { Star, Send, CheckCircle2 } from 'lucide-react';

const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout bg="bg-white">
        <div className="container py-32 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Thank You for Your Feedback!</h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto mb-10">
            Your input helps us improve Insurance Advisor for everyone. We truly appreciate you taking the time to share your experience.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            Back to Home
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout bg="bg-slate-50">
      <div className="container py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white">
            <div className="text-center mb-10">
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">We're Listening</span>
              <h1 className="text-4xl font-black text-slate-900 mb-4">Share Your Experience</h1>
              <p className="text-slate-500 font-medium text-base">How are we doing? Your feedback helps us shape the future of insurance comparison.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating */}
              <div className="space-y-4">
                <label className="block text-sm font-black text-slate-900 uppercase tracking-widest text-center">Your Rating</label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-all duration-200 focus:outline-none"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star 
                        className={`w-10 h-10 ${
                          star <= (hover || rating) 
                          ? 'fill-amber-400 text-amber-400 scale-110' 
                          : 'fill-transparent text-slate-200'
                        } transition-all`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-900 uppercase tracking-widest">Your Comments</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="What did you like? What can we improve?"
                ></textarea>
              </div>

              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 hover:bg-slate-900 hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3 animate-gradient pointer-events-auto"
              >
                Submit Feedback <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FeedbackPage;
