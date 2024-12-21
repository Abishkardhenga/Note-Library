import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, RefreshCw } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface GradeSelectionProps {
  onSelect: (grade: string) => Promise<void>;
}

const GradeSelection: React.FC<GradeSelectionProps> = ({ onSelect }) => {
  const [isLoading, setIsLoading] = React.useState<string | null>(null);
  const [showReloadMessage, setShowReloadMessage] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelect = async (grade: string) => {
    try {
      setIsLoading(grade);
      
      if (!user?.id) {
        toast.error('User not found');
        return;
      }

      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        grade,
        setupComplete: true
      });

      await onSelect(grade);
      toast.success(`Grade ${grade} selected successfully`);
      setShowReloadMessage(true);
      
      // Add a delay before navigation to ensure Firebase update completes
      setTimeout(() => {
        // First update local storage to persist the grade selection
        localStorage.setItem('userGrade', grade);
        localStorage.setItem('setupComplete', 'true');
        
        // Then navigate and reload
        navigate('/student');
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error selecting grade:', error);
      toast.error('Failed to select grade. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Choose Your Grade</h1>
          <p className="text-gray-300">
            Select your grade to get personalized study materials and quizzes
          </p>
        </motion.div>

        <div className="space-y-4">
          {['11', '12'].map((grade) => (
            <motion.button
              key={grade}
              onClick={() => !isLoading && handleSelect(grade)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full glass-card p-6 flex items-center justify-between group hover:border-purple-500 transition-all duration-300 ${
                isLoading === grade ? 'opacity-75 cursor-wait' : ''
              }`}
              disabled={!!isLoading}
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
              <ArrowRight className="text-gray-400 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all duration-300" />
            </motion.button>
          ))}
        </div>

        {showReloadMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 glass-card text-center"
          >
            <div className="flex items-center justify-center gap-3 text-purple-400 mb-2">
              <RefreshCw className="animate-spin" size={20} />
              <span className="font-semibold">Please wait...</span>
            </div>
            <p className="text-gray-300">
              Setting up your personalized dashboard
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GradeSelection;