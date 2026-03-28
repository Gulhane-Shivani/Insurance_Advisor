/* src/app/blog/page.tsx */
import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SectionTitle from '../../components/common/SectionTitle';
import { blogPosts } from '../../data/blogData';
import { formatDate } from '../../lib/utils';
import '../../styles/globals.css';

const BlogPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-24 bg-slate-50 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -z-10"></div>
        <div className="container relative z-10">
          <SectionTitle 
            title="Insights for a Secure Future"
            subtitle="Latest news, tips, and articles about the insurance industry and financial planning."
            badge="Our Blog"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col hover:-translate-y-2 transition-transform duration-500 group">
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-blue-600 font-bold text-sm">
                    Resources
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                    <p>{formatDate(post.date)}</p>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <p>{post.author}</p>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>
                  <button className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                    Read Article <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BlogPage;
