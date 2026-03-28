/* src/app/blog/page.tsx */
import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import SectionTitle from '../../components/common/SectionTitle';
import '../../styles/globals.css';

const BlogPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10">
          <SectionTitle 
            title="Insurance Insights & Guides"
            subtitle="Learn how to protect your family, save on premiums, and choose the right coverage with our expert articles."
            badge="Our Blog"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            {[
              { title: "5 Tips to Lower Your Car Premium", date: "Mar 12, 2024", category: "Auto", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800" },
              { title: "Understanding Term Life vs Whole Life", date: "Mar 08, 2024", category: "Life", img: "https://images.unsplash.com/photo-1454165833772-d996d4ad51a0?auto=format&fit=crop&q=80&w=800" },
              { title: "Why Health Insurance is Now Mandatory", date: "Mar 01, 2024", category: "Health", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800" },
            ].map((post, index) => (
              <div key={index} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="h-64 overflow-hidden relative">
                   <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-lg">
                      {post.category}
                   </div>
                </div>
                <div className="p-10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{post.date}</p>
                  <h4 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h4>
                  <button className="text-slate-900 font-black text-sm flex items-center gap-2 group/btn">
                    Read Article 
                    <span className="group-hover/btn:translate-x-2 transition-transform text-xl text-blue-600">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPage;
