import React, { useState } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Heading from "@/components/common/Heading";
import { Input } from "@/components/common/Input";
import Button from "@/components/common/Button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Heading 
          title="Contact Us" 
          subtitle="Get in Touch" 
          className="text-center mb-8"
        />
        
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  Saudi Arabia
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  <a href="tel:+996501122333" className="hover:text-primary">
                    +996 501122333
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✉️</span>
                  contact@artify.com
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <Button
                text="Send Message"
                bgColor="bg-primary"
                textColor="text-white"
                className="w-full"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage; 