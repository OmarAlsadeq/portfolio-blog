
import React from 'react';

// Define the type for the props
interface TestimonialCardProps {
  name: string;
  feedback: string;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, feedback, imageUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full mb-4" />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600">{feedback}</p>
    </div>
  );
};

export default TestimonialCard;
