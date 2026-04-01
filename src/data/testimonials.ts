/* src/data/testimonials.ts */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Peterson',
    role: 'Small Business Owner',
    comment: 'The insurance plans here are incredibly fair and the claim process was seamless.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Michael Chen',
    role: 'Homeowner',
    comment: 'Expert advice helped me choose the right life insurance plan for my growing family.',
    rating: 4.8
  },
  {
    id: 'test-3',
    name: 'Emily Watson',
    role: 'Software Engineer',
    comment: 'Comparing multiple carriers in one place saved me hours of research. Highly recommended!',
    rating: 4.9
  },
  {
    id: 'test-4',
    name: 'Robert Garcia',
    role: 'Retail Manager',
    comment: 'Transparent pricing and excellent customer support. They covered all my queries patiently.',
    rating: 5
  },
  {
    id: 'test-5',
    name: 'Dr. Anita Joshi',
    role: 'Medical Professional',
    comment: 'Found specialized professional liability coverage that perfectly fit my practice needs.',
    rating: 4.7
  },
  {
    id: 'test-6',
    name: 'James Wilson',
    role: 'Startup Founder',
    comment: 'The digital advisor tool is life-changing. It identified gaps in my current business cover.',
    rating: 5
  },
  {
    id: 'test-7',
    name: 'Robert Fox',
    role: 'Freelance Designer',
    comment: 'Simple, fast, and reliable. I bought my gap insurance in under 5 minutes.',
    rating: 4.8
  },
  {
    id: 'test-8',
    name: 'Lisa Chang',
    role: 'HR Manager',
    comment: 'Superior corporate rates and extremely easy management for my remote team.',
    rating: 4.9
  },
  {
    id: 'test-9',
    name: 'David Kim',
    role: 'Construction Foreman',
    comment: 'Finally found an advisor who understands high-risk industry coverage.',
    rating: 5
  },
  {
    id: 'test-10',
    name: 'Sarah Miller',
    role: 'University Professor',
    comment: 'A seamless digital experience that removes all the usual stress from finding a plan.',
    rating: 4.7
  }
];
