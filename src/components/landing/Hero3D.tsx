import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Trophy,
  ArrowRight,
  Star,
  Users,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

const Hero = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      setShowAuthModal(true);
    }
  };

  const handleGetApp = () => {
    window.open('https://play.google.com/store/apps/details?id=com.notes.notelibrary', '_blank');
  };

  const stats = [
    { value: '10K+', label: 'Active Students', icon: Users },
    { value: '95%', label: 'Success Rate', icon: Trophy },
    { value: '500+', label: 'Practice Tests', icon: Brain },
    { value: '1000+', label: 'Study Notes', icon: BookOpen },
  ];

  return (
    <div className="relative min-h-screen pt-16 lg:pt-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 py-12 lg:py-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white">
                <span className="block mb-2">Master Your Studies with</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Note Library
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Join thousands of students achieving academic excellence with
                personalized study paths, interactive quizzes, and comprehensive
                study materials.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={handleGetStarted}
                  className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Start Learning Now
                  <ArrowRight className="ml-2" />
                </button>
                
                <motion.button
                  onClick={handleGetApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group"
                >
                  <span className="text-white">Get App</span>
                  <Download className="text-white group-hover:translate-y-0.5 transition-transform" size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card p-4 text-center transform hover:scale-105 transition-transform"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-[22px] blur-lg"></div>
              
              {/* App Screenshot */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-2 rounded-2xl shadow-2xl">
                <img
                src='https://zduohwulyilqfngqumyt.supabase.co/storage/v1/object/public/admin-upload/photo_2024-12-14_13-31-56.jpg'
                  alt="Note Library Android App"
                  className="rounded-xl w-full shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-6 text-gray-400 pb-12"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="text-yellow-400"
                size={20}
                fill="currentColor"
              />
            ))}
            <span className="ml-2">4.9/5 from 10,000+ reviews</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>Trusted by 500+ schools</span>
          <span className="hidden sm:inline">•</span>
          <span>95% success rate</span>
        </motion.div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default Hero;