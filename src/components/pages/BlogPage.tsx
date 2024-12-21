import React from 'react';
import { motion } from 'framer-motion';
import BlogList from '../blog/BlogList';
import MainLayout from '../layout/MainLayout';

const BlogPage = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest educational insights and study tips
            </p>
          </div>

          <BlogList />
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogPage;