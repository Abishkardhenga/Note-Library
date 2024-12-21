import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  BookOpen,
  Users,
  Settings,
  MessageSquare,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';
import MainLayout from '../layout/MainLayout';

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: BookOpen,
      title: 'Study Materials',
      description: 'Access and download issues, content queries',
      link: '/help/materials'
    },
    {
      icon: Users,
      title: 'Account Support',
      description: 'Login issues, profile management, settings',
      link: '/help/account'
    },
    {
      icon: Settings,
      title: 'Technical Support',
      description: 'Platform issues, bug reports, compatibility',
      link: '/help/technical'
    },
    {
      icon: MessageSquare,
      title: 'General Inquiries',
      description: 'General questions, feedback, suggestions',
      link: '/help/general'
    }
  ];

  const popularArticles = [
    {
      title: 'How to download study materials',
      views: '2.5k',
      link: '/help/articles/downloading-materials'
    },
    {
      title: 'Resetting your password',
      views: '1.8k',
      link: '/help/articles/password-reset'
    },
    {
      title: 'Accessing premium content',
      views: '1.5k',
      link: '/help/articles/premium-access'
    },
    {
      title: 'Mobile app troubleshooting',
      views: '1.2k',
      link: '/help/articles/mobile-troubleshooting'
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Search our help center or browse categories below to find the answers you need.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-purple-500/50 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <category.icon className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Popular Articles
              </h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium">{article.title}</h3>
                      <span className="text-gray-400 text-sm">{article.views} views</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Contact Support
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email Support</h3>
                    <p className="text-gray-400">support@notelibrary.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Phone className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Phone Support</h3>
                    <p className="text-gray-400">+977 981234567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <MessageCircle className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Live Chat</h3>
                    <p className="text-gray-400">Available 24/7</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpCenterPage;