import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

interface StudentFeedbackProps {
  userId: string;
  userName: string;
}

const StudentFeedback: React.FC<StudentFeedbackProps> = ({ userId, userName }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        userId,
        userName,
        message,
        date: new Date().toISOString(),
        status: 'pending'
      });

      setMessage('');
      toast.success('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="text-purple-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Send Feedback</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={6}
              placeholder="Share your thoughts, suggestions, or report any issues..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary"
          >
            <Send size={20} className="mr-2" />
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default StudentFeedback;