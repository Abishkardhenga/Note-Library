import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface BlogReaderProps {
  blog: {
    title: string;
    content: string;
    createdAt: string;
    author?: string;
  };
  onClose: () => void;
}

const BlogReader: React.FC<BlogReaderProps> = ({ blog, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content - Scrollable Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-12"
            >
              {/* Blog Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  {blog.author && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          {blog.author.charAt(0)}
                        </div>
                        <span>{blog.author}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </header>

              {/* Blog Content */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Blog Footer */}
              <footer className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button className="btn-secondary">
                      Previous Post
                    </button>
                    <button className="btn-secondary">
                      Next Post
                    </button>
                  </div>
                  <button className="btn-primary">
                    Share Article
                  </button>
                </div>
              </footer>
            </motion.article>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogReader;