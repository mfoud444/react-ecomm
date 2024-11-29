import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Heading from "@/components/common/Heading";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Heading 
          title="About Us" 
          subtitle="Our Story & Mission" 
          className="text-center mb-8"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="prose dark:prose-invert prose-lg">
            <p className="mb-6">
              Welcome to Artify, your premier destination for unique and inspiring artwork. 
              We believe in connecting talented artists with art enthusiasts, creating a 
              vibrant community where creativity thrives.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="mb-6">
              To provide a platform where artists can showcase their work and art lovers 
              can discover unique pieces that speak to their souls. We're committed to 
              making art accessible while supporting the creative community.
            </p>

            <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Curated collection of original artwork</li>
              <li>Interactive workshops with skilled artists</li>
              <li>Secure platform for art transactions</li>
              <li>Community events and exhibitions</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 