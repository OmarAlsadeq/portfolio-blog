import TestimonialCard from '@/components/TestimonialCard';

const TestimonialsPage = () => {
  const testimonials = [
    { name: 'Client 1', feedback: 'Great work!', imageUrl: '/path-to-image1.jpg' },
    { name: 'Client 2', feedback: 'Very professional!', imageUrl: '/path-to-image2.jpg' },
  ];

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            feedback={testimonial.feedback}
            imageUrl={testimonial.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsPage;
