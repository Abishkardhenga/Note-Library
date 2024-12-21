import React from 'react';
import { motion } from 'framer-motion';
import BlogList from '../blog/BlogList';

const StudentBlog = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Educational Blog</h2>
        <p className="text-gray-300">
          Stay updated with the latest educational content and study tips
        </p>
      </motion.div>

      <BlogList />
    </div>
  );
};

export default StudentBlog;