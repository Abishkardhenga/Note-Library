import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import QuizResults from './QuizResults';
import { useAuth } from '../../context/AuthContext';
import { generateQuizQuestions, calculateScore } from '../../utils/quizUtils';
import { Question } from '../../types';

interface Quiz {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
  difficulty: string;
}

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onComplete, onClose }) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Generate randomized questions when the quiz starts
    const questions = generateQuizQuestions(quiz.questions);
    setRandomizedQuestions(questions);
    setSelectedAnswers(new Array(questions.length).fill(-1));
  }, [quiz.questions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const finalScore = calculateScore(selectedAnswers, randomizedQuestions);
    setScore(finalScore);
    
    try {
      const quizRef = doc(db, 'quizzes', quiz.id);
      const userRef = doc(db, 'users', user.id);
      
      await Promise.all([
        updateDoc(quizRef, {
          totalAttempts: increment(1)
        }),
        updateDoc(userRef, {
          completedQuizzes: arrayUnion(quiz.id),
          [`quizScores.${quiz.id}`]: finalScore,
          [`attempts.${quiz.id}`]: increment(1)
        })
      ]);

      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) {
    return (
      <QuizResults
        score={score}
        totalQuestions={randomizedQuestions.length}
        userAnswers={selectedAnswers}
        questions={randomizedQuestions}
        onClose={onClose}
      />
    );
  }

  if (!randomizedQuestions.length) {
    return <div className="text-center text-gray-400">Loading quiz...</div>;
  }

  const question = randomizedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / randomizedQuestions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-6 relative max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">{quiz.title}</h2>
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-purple-400" />
          <span className="text-white font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full mb-8">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg text-white mb-4">
          Question {currentQuestion + 1} of {randomizedQuestions.length}
        </h3>
        <p className="text-gray-300 text-lg mb-6">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50"
        >
          <ArrowLeft size={20} />
          Previous
        </button>

        {currentQuestion === randomizedQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(randomizedQuestions.length - 1, prev + 1))}
            className="btn-primary"
          >
            Next
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizPlayer;