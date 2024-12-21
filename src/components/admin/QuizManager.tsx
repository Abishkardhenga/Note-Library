import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Brain, Clock, Target, Users, Calendar } from 'lucide-react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { Quiz } from '../../types';
import QuizCreator from '../quizzes/QuizCreator';
import QuizScheduler from './QuizScheduler';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

const QuizManager = () => {
  const { data: quizzes, loading } = useRealtimeData<Quiz>('quizzes');
  const [showCreator, setShowCreator] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleDelete = async (quizId: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteDoc(doc(db, 'quizzes', quizId));
        toast.success('Quiz deleted successfully');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        toast.error('Failed to delete quiz');
      }
    }
  };

  const handleSchedule = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowScheduler(true);
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowCreator(true);
  };

  const handleSave = () => {
    setShowCreator(false);
    setSelectedQuiz(null);
    toast.success(selectedQuiz ? 'Quiz updated successfully' : 'Quiz created successfully');
  };

  const subjects = Array.from(new Set(quizzes.map(quiz => quiz.subject)));
  const filteredQuizzes = selectedSubject
    ? quizzes.filter(quiz => quiz.subject === selectedSubject)
    : quizzes;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              !selectedSubject
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Subjects
          </button>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedSubject === subject
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setSelectedQuiz(null);
            setShowCreator(true);
          }}
          className="btn-primary"
        >
          <Plus size={20} className="mr-2" />
          Create Quiz
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading quizzes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    quiz.difficulty === 'Easy'
                      ? 'bg-green-500/20 text-green-400'
                      : quiz.difficulty === 'Medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {quiz.difficulty}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <Brain size={16} />
                  <span>{quiz.questions.length} Questions</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={16} />
                  <span>{quiz.duration} Minutes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Target size={16} />
                  <span>{quiz.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={16} />
                  <span>{quiz.totalAttempts} Attempts</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleSchedule(quiz)}
                  className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Calendar size={20} />
                </button>
                <button
                  onClick={() => handleEdit(quiz)}
                  className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showCreator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <QuizCreator
              initialData={selectedQuiz}
              onSave={handleSave}
              onClose={() => {
                setShowCreator(false);
                setSelectedQuiz(null);
              }}
            />
          </div>
        </div>
      )}

      {showScheduler && selectedQuiz && (
        <QuizScheduler
          quiz={selectedQuiz}
          onClose={() => {
            setShowScheduler(false);
            setSelectedQuiz(null);
          }}
        />
      )}
    </div>
  );
};

export default QuizManager;