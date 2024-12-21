import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import OTPVerification from './OTPVerification';

interface GradeSelectorProps {
  userId: string;
  email: string;
  onComplete: () => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ userId, email, onComplete }) => {
  const [showOTPVerification, setShowOTPVerification] = useState(true);

  const handleGradeSelect = async (grade: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        grade,
        setupComplete: true,
        emailVerified: false
      });
      toast.success('Grade selected successfully');
      onComplete();
    } catch (error) {
      console.error('Error updating grade:', error);
      toast.error('Failed to select grade');
    }
  };

  const handleVerificationComplete = (verified: boolean) => {
    if (verified) {
      setShowOTPVerification(false);
    }
  };

  if (showOTPVerification) {
    return (
      <OTPVerification
        email={email}
        onVerify={handleVerificationComplete}
        onClose={() => setShowOTPVerification(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Select Your Grade</h1>
          <p className="text-gray-300">
            Choose your grade to get personalized study materials and quizzes
          </p>
        </motion.div>

        <div className="space-y-4">
          {['11', '12'].map((grade) => (
            <motion.button
              key={grade}
              onClick={() => handleGradeSelect(grade)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass-card p-6 flex items-center justify-between group hover:border-purple-500 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <BookOpen className="text-purple-400" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white">Grade {grade}</h3>
                  <p className="text-gray-400">Access grade {grade} materials</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeSelector;