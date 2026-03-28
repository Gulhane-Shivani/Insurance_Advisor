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
  }
];
