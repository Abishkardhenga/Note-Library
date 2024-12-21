import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, User, Clock, Check, X } from 'lucide-react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { format } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  message: string;
  date: string;
  status: 'pending' | 'resolved';
}

const FeedbackCenter = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const { data: feedbacks, loading } = useRealtimeData<Feedback>('feedback');

  const handleResolve = async (feedbackId: string) => {
    try {
      await updateDoc(doc(db, 'feedback', feedbackId), {
        status: 'resolved',
      });
      toast.success('Feedback marked as resolved');
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast.error('Failed to update feedback');
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    return feedback.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Student Feedback</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === status
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading feedback...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredFeedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <User className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feedback.userName}
                    </h3>
                    <p className="text-gray-400 text-sm">Student</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    feedback.status === 'resolved'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {feedback.status}
                </span>
              </div>

              <p className="text-gray-300 mb-4">{feedback.message}</p>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>
                    {format(new Date(feedback.date), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>

                {feedback.status === 'pending' && (
                  <button
                    onClick={() => handleResolve(feedback.id)}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Check size={16} />
                    Mark as Resolved
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {filteredFeedbacks.length === 0 && (
            <div className="text-center text-gray-400">
              No {filter === 'all' ? '' : filter} feedback found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackCenter;