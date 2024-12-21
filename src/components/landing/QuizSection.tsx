import React from 'react';
import { motion } from 'framer-motion';
import QuizList from '../quizzes/QuizList';
import { featuredQuizzes } from '../../data/featuredQuizzes';

const QuizSection = () => {
  return (
    <section id="quizzes" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Quizzes</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Challenge yourself with our interactive quizzes and track your progress
          </p>
        </motion.div>

        <QuizList quizzes={featuredQuizzes} />
      </div>
    </section>
  );
};

export default QuizSection;