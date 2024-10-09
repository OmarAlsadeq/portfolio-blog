'use client';

import { useState } from 'react';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send the message.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transform hover:scale-105 transition duration-300"
        >
          Send
        </button>
      </form>

      {status && (
        <p className={`mt-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {status === 'success' ? 'Message sent successfully!' : 'Failed to send the message.'}
        </p>
      )}

      {/* Social Media Links */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Follow me on:</h2>
        <div className="flex space-x-6">
          <Link href="https://twitter.com/yourusername" className="text-blue-500 hover:text-blue-700">
            Twitter
          </Link>
          <Link href="https://linkedin.com/in/yourusername" className="text-blue-500 hover:text-blue-700">
            LinkedIn
          </Link>
          <Link href="https://github.com/yourusername" className="text-blue-500 hover:text-blue-700">
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
