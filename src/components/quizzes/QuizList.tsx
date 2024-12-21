import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuizCard from './QuizCard';
import QuizPlayer from './QuizPlayer';
import { Quiz } from '../../types';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  const { user } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setSelectedQuiz(quiz);
    }
  };

  const handleQuizComplete = async (score: number) => {
    // Save quiz result to Firebase
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    return (
      <QuizPlayer
        quiz={selectedQuiz}
        onComplete={handleQuizComplete}
        onClose={() => setSelectedQuiz(null)}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onStart={() => handleStartQuiz(quiz)}
          />
        ))}
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default QuizList;