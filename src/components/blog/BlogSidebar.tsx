import React from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Clock } from 'lucide-react';

const BlogSidebar = () => {
  const categories = [
    { name: 'Study Tips', count: 12 },
    { name: 'Exam Preparation', count: 8 },
    { name: 'Science', count: 15 },
    { name: 'Mathematics', count: 10 },
    { name: 'Language', count: 7 }
  ];

  const recentPosts = [
    { title: 'Effective Study Techniques for Better Results', date: '2024-03-15' },
    { title: 'How to Prepare for Final Exams', date: '2024-03-14' },
    { title: 'Understanding Complex Mathematical Concepts', date: '2024-03-13' }
  ];

  return (
    <div className="space-y-8">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-purple-400" />
                <span>{category.name}</span>
              </div>
              <span className="text-sm bg-white/10 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <h4 className="text-gray-300 group-hover:text-white transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <Clock size={14} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogSidebar;