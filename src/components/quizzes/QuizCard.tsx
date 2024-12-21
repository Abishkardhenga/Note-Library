import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Users, Trophy, Lock } from 'lucide-react';
import { Quiz } from '../../types';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

interface QuizCardProps {
  quiz: Quiz;
  onStart: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart }) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleQuizStart = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      onStart();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card group hover:shadow-xl transition-all duration-300"
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">{quiz.title}</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <Brain size={18} className="text-purple-400" />
              <span>{quiz.questions.length} Questions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock size={18} className="text-purple-400" />
              <span>{quiz.duration} mins</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Users size={18} className="text-purple-400" />
              <span>{quiz.totalAttempts} Taken</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Trophy size={18} className="text-purple-400" />
              <span>85% Avg</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm ${
              quiz.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              quiz.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {quiz.difficulty}
            </span>
            <button
              onClick={handleQuizStart}
              className={`flex items-center gap-2 ${
                user ? 'btn-primary' : 'btn-secondary'
              } !py-2 !px-4`}
            >
              {!user && <Lock size={16} />}
              {user ? 'Start Quiz' : 'Login to Start'}
            </button>
          </div>
        </div>
      </motion.div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default QuizCard;