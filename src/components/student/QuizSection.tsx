import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Calendar, ArrowRight, Target, Trophy } from 'lucide-react';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { where } from 'firebase/firestore';
import { format } from 'date-fns';
import QuizPlayer from '../quizzes/QuizPlayer';

interface Quiz {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Array<{
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }>;
  totalAttempts: number;
}

const StudentQuizSection = ({ grade }: { grade: string }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const { data: quizzes, loading } = useRealtimeData<Quiz>(
    'quizzes',
    [where('grade', '==', grade)]
  );

  const subjects = Array.from(new Set(quizzes.map((q) => q.subject)));
  const filteredQuizzes = selectedSubject
    ? quizzes.filter((q) => q.subject === selectedSubject)
    : quizzes;

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleQuizComplete = async (score: number) => {
    // Save quiz result to Firebase
    try {
      // Add implementation for saving quiz results
      setSelectedQuiz(null);
      // Show success message
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-8">
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
        {subjects.map((subject) => (
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

      {loading ? (
        <div className="text-center text-gray-400">Loading quizzes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {quiz.title}
                </h3>
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
                  <Trophy size={16} />
                  <span>{quiz.totalAttempts} Attempts</span>
                </div>
              </div>

              <button
                onClick={() => handleStartQuiz(quiz)}
                className="w-full btn-primary group"
              >
                Start Quiz
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}

          {filteredQuizzes.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No quizzes available for {selectedSubject || 'any subject'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentQuizSection;