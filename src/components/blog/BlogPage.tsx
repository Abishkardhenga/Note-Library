import React from 'react';
import { motion } from 'framer-motion';
import BlogList from './BlogList';
import BlogSidebar from './BlogSidebar';
import MainLayout from '../layout/MainLayout';

const BlogPage = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest educational insights and study tips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogList />
            </div>
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogPage;