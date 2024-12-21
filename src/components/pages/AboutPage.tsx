import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Globe, Target, Heart } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

const AboutPage = () => {
  const team = [
    {
      name: 'Sudin Ghimire',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Bibhuti Devkota',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Ram Lal Yadav',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Students', icon: Users },
    { value: '1000+', label: 'Study Materials', icon: BookOpen },
    { value: '95%', label: 'Success Rate', icon: Award },
    { value: '24/7', label: 'Support', icon: Heart },
  ];

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
              About Note Library
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering students across Nepal with comprehensive study materials and
              interactive learning experiences since 2023.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                To make quality education accessible to every student in Nepal through
                innovative digital learning solutions and comprehensive study materials.
              </p>
              <div className="flex items-center gap-4">
                <Target className="text-purple-400" size={24} />
                <span className="text-white">Empowering Future Leaders</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 mb-6">
                To become Nepal's leading digital education platform, fostering a
                community of lifelong learners and academic excellence.
              </p>
              <div className="flex items-center gap-4">
                <Globe className="text-purple-400" size={24} />
                <span className="text-white">Transforming Education</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Join Our Journey
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Be part of our mission to transform education in Nepal. Together, we can
              create a brighter future for students across the nation.
            </p>
            <button className="btn-primary">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;