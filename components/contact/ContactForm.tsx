'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSubmitContactMutation } from '@/redux/features/contact/contactApi';
import { Button } from '@/components/ui/Button';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await submitContact(formData).unwrap();
      toast.success('Message sent successfully!');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div className="p-8 rounded-[32px] bg-[#0D1428] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50" 
              required
            />
          </div>
          <div className="space-y-2">
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50" 
            />
          </div>
        </div>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address" 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50" 
          required
        />
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4} 
          placeholder="Your Message" 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50" 
          required
        />
        <Button type="submit" className="w-full py-6" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};
