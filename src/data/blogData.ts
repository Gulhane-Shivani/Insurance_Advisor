/* src/data/blogData.ts */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Top 5 Tips for Choosing Your First Life Insurance',
    excerpt: 'Planning for the future can be daunting. Here are 5 tips to help you navigate the process.',
    date: '2023-10-15',
    author: 'Jane Doe',
    image: 'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'post-2',
    title: 'Why You Need a Robust Health Insurance Plan',
    excerpt: 'Healthcare costs are rising. A good insurance policy is your best financial safety net.',
    date: '2023-09-02',
    author: 'John Smith',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400'
  }
];
