import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Clock, Eye } from 'lucide-react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { format } from 'date-fns';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import BlogEditor from '../blog/BlogEditor';

interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

const BlogManager = () => {
  const { data: blogs, loading } = useRealtimeData<Blog>('blogs');
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleDelete = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteDoc(doc(db, 'blogs', blogId));
        toast.success('Blog post deleted successfully');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast.error('Failed to delete blog post');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Blog Posts</h2>
        <button
          onClick={() => {
            setEditingBlog(null);
            setShowEditor(true);
          }}
          className="btn-primary"
        >
          <Plus size={20} className="mr-2" />
          Create Post
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading blog posts...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex gap-6">
                <div className="w-48 h-32 rounded-lg overflow-hidden">
                  <img
                    src={blog.coverImage || 'https://via.placeholder.com/400x300'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {blog.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {Math.floor(Math.random() * 1000)} views
                    </span>
                  </div>

                  <div
                    className="text-gray-300 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.substring(0, 200) + '...'
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowEditor(true);
                    }}
                    className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {blogs.length === 0 && (
            <div className="text-center text-gray-400">
              No blog posts found. Create your first post!
            </div>
          )}
        </div>
      )}

      {showEditor && (
        <BlogEditor
          onClose={() => {
            setShowEditor(false);
            setEditingBlog(null);
          }}
        />
      )}
    </div>
  );
};

export default BlogManager;