import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import BlogReader from './BlogReader';

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  excerpt?: string;
  author?: string;
  category?: string;
}

const BlogList = () => {
  const { data: blogs, loading } = useRealtimeData<Blog>('blogs');
  const [selectedBlog, setSelectedBlog] = React.useState<Blog | null>(null);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-12">
        Loading blog posts...
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {blogs.map((blog) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card group cursor-pointer"
            onClick={() => setSelectedBlog(blog)}
          >
            {blog.coverImage && (
              <div className="relative h-48 rounded-t-2xl overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-purple-300 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                </span>
                {blog.category && (
                  <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    {blog.category}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-white mb-3">
                {blog.title}
              </h2>

              <div
                className="text-gray-300 mb-6 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: blog.excerpt || blog.content.substring(0, 200) + '...'
                }}
              />

              <div className="flex items-center justify-between">
                {blog.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      {blog.author.charAt(0)}
                    </div>
                    <span className="text-gray-300">{blog.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {blogs.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No blog posts found
          </div>
        )}
      </div>

      {selectedBlog && (
        <BlogReader 
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </>
  );
};

export default BlogList;