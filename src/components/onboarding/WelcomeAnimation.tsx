import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Brain, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeAnimationProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ userName, onComplete }) => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 2 * 1000;
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

    // Auto-proceed after animation
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 space-y-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-purple-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-4xl font-bold text-white"
        >
          Welcome to Note Library, {userName}!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xl text-gray-300"
        >
          Your journey to academic excellence starts here
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex justify-center gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-gray-300">Study Notes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-gray-300">Smart Quizzes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-gray-300">Track Progress</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeAnimation;