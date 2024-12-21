import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, X } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface QuizSchedulerProps {
  quiz: {
    id: string;
    title: string;
    subject: string;
    grade: string;
  };
  onClose: () => void;
}

const QuizScheduler: React.FC<QuizSchedulerProps> = ({ quiz, onClose }) => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      if (startDateTime >= endDateTime) {
        toast.error('End time must be after start time');
        return;
      }

      await addDoc(collection(db, 'scheduledQuizzes'), {
        quizId: quiz.id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        grade: quiz.grade,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        userId: user.id,
        userName: user.fullName,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      });

      toast.success('Quiz scheduled successfully');
      onClose();
    } catch (error) {
      console.error('Error scheduling quiz:', error);
      toast.error('Failed to schedule quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Schedule Quiz</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    required
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Quiz'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizScheduler;