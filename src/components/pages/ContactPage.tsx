import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../Contact';
import MainLayout from '../layout/MainLayout';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with us. We're here to help and answer any questions you may have.
            </p>
          </motion.div>

          <Contact />
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;