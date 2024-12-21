import React from 'react';
import { motion } from 'framer-motion';
import { subjects } from '../../data/subjects';

interface SubjectSelectorProps {
  onBack: () => void;
  onSelect: (subject: string) => void;
  grade: number;
  adminView?: boolean;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  onBack, 
  onSelect, 
  grade,
  adminView = false 
}) => {
  // Filter subjects based on grade and admin status
  const availableSubjects = subjects.filter(subject => {
    // Admin can see all subjects
    if (adminView) return true;
    
    // For students, show only subjects with available notes
    return true; // You can implement more specific filtering if needed
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          onClick={onBack}
          className="text-purple-500 hover:text-purple-400 flex items-center gap-2"
        >
          <span>←</span> Back to Grades
        </button>
        <h2 className="text-xl text-white font-semibold">
          Grade {grade} Subjects
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableSubjects.map((subject) => (
          <motion.button
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 glass-card hover:border-purple-500 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{subject.icon}</span>
              <span className="text-lg font-semibold text-white">{subject.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;