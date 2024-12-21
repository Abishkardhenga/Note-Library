import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface GradeSelectorProps {
  onSelect: (grade: number) => void;
  adminView?: boolean;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelect, adminView }) => {
  const { user } = useAuth();
  const userGrade = parseInt(user?.grade || '0');

  // Determine which grades to show
  const availableGrades = adminView ? [11, 12] : [userGrade];

  return (
    <div className="space-y-8">
      <h2 className="text-xl text-white font-semibold mb-6">Select Grade</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableGrades.map((grade) => (
          <motion.button
            key={grade}
            onClick={() => onSelect(grade)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 sm:p-8 glass-card hover:border-purple-500 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <BookOpen className="text-purple-400" size={24} />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">Grade {grade}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};