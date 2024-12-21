import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { format } from 'date-fns';
import { where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

interface ScheduledQuiz {
  id: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  startTime: string;
  endTime: string;
  status: string;
}

const ScheduledQuizzes = () => {
  const { user } = useAuth();
  const { data: scheduledQuizzes, loading } = useRealtimeData<ScheduledQuiz>(
    'scheduledQuizzes',
    [where('userId', '==', user.id)]
  );

  if (loading) {
    return <div className="text-center text-gray-400">Loading scheduled quizzes...</div>;
  }

  if (scheduledQuizzes.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No scheduled quizzes found. Schedule a quiz to get started!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-6">Your Scheduled Quizzes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scheduledQuizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-4">{quiz.quizTitle}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={16} />
                <span>{format(new Date(quiz.startTime), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={16} />
                <span>
                  {format(new Date(quiz.startTime), 'h:mm a')} - {format(new Date(quiz.endTime), 'h:mm a')}
                </span>
              </div>
            </div>

            <button className="w-full btn-primary group">
              Start Quiz
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledQuizzes;