import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Clock, Check, X } from 'lucide-react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { format } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'resolved';
}

const MessageCenter = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const { data: messages, loading } = useRealtimeData<Message>('contactMessages');

  const handleResolve = async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'contactMessages', messageId), {
        status: 'resolved',
      });
      toast.success('Message marked as resolved');
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message');
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Contact Messages</h2>
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
        <div className="text-center text-gray-400">Loading messages...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
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
                      {message.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{message.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    message.status === 'resolved'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {message.status}
                </span>
              </div>

              <p className="text-gray-300 mb-4">{message.message}</p>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>
                    {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>

                {message.status === 'pending' && (
                  <button
                    onClick={() => handleResolve(message.id)}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Check size={16} />
                    Mark as Resolved
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="text-center text-gray-400">
              No {filter === 'all' ? '' : filter} messages found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageCenter;