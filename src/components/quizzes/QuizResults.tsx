import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, ArrowLeft, Trophy, Star, Share2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question } from '../../types';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  userAnswers: number[];
  questions: Question[];
  onClose: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  userAnswers,
  questions,
  onClose,
}) => {
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  useEffect(() => {
    if (score >= 70) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const colors = ['#8B5CF6', '#EC4899', '#3B82F6'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [score]);

  const getScoreMessage = () => {
    if (score >= 90) return "Outstanding! You're a master!";
    if (score >= 80) return "Excellent work! Keep it up!";
    if (score >= 70) return "Good job! You're getting there!";
    if (score >= 60) return "Not bad, but there's room for improvement.";
    return "Keep practicing, you'll get better!";
  };

  const getScoreColor = () => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-6 max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-32 h-32 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 relative"
        >
          <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}%</span>
          {score >= 70 && (
            <Trophy className="absolute -top-4 -right-4 text-yellow-400" size={32} />
          )}
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {getScoreMessage()}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300"
        >
          You got {correctAnswers} out of {totalQuestions} questions correct
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mt-6"
        >
          <button className="btn-secondary flex items-center gap-2">
            <Share2 size={20} />
            Share Result
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={20} />
            Download Certificate
          </button>
        </motion.div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correctAnswer;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-6 rounded-lg ${
                isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white font-medium">
                  Question {index + 1}
                </h3>
                {isCorrect ? (
                  <Check className="text-green-400" size={20} />
                ) : (
                  <X className="text-red-400" size={20} />
                )}
              </div>

              <p className="text-gray-300 mb-4">{question.text}</p>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      optionIndex === question.correctAnswer
                        ? 'bg-green-500/20 text-green-400'
                        : optionIndex === userAnswers[index] && !isCorrect
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <span>{option}</span>
                    {optionIndex === question.correctAnswer ? (
                      <Check size={20} className="text-green-400" />
                    ) : optionIndex === userAnswers[index] && !isCorrect ? (
                      <AlertTriangle size={20} className="text-red-400" />
                    ) : null}
                  </div>
                ))}
              </div>

              {!isCorrect && (
                <div className="mt-4 p-4 bg-purple-500/10 rounded-lg">
                  <p className="text-purple-400 text-sm">
                    <strong>Correct Answer:</strong>{' '}
                    {question.options[question.correctAnswer]}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="btn-primary flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Quizzes
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResults;