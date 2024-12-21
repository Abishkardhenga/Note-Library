import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import { getFilteredNotes } from '../../data/notes';
import { subjects } from '../../data/subjects';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import MainLayout from '../layout/MainLayout';

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  if (!selectedGrade) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">Study Notes</h1>
              <p className="text-xl text-gray-300">Access comprehensive study materials for your grade</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[11, 12].map((grade) => (
                <motion.button
                  key={grade}
                  onClick={() => handleGradeSelect(grade)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-8 glass-card hover:border-purple-500 transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-4">
                    <BookOpen size={32} className="text-purple-500" />
                    <span className="text-2xl font-bold text-white">Grade {grade}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!selectedSubject) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 py-20 relative">
            <div className="flex items-center gap-4 mb-12">
              <button
                onClick={() => setSelectedGrade(null)}
                className="text-purple-500 hover:text-purple-400 flex items-center gap-2"
              >
                <span>←</span> Back to Grades
              </button>
              <h2 className="text-2xl text-white font-semibold">
                Grade {selectedGrade} Subjects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <motion.button
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 glass-card hover:border-purple-500 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="text-xl font-semibold text-white">{subject.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const filteredNotes = getFilteredNotes(selectedGrade, selectedSubject, searchTerm);
  const currentSubject = subjects.find(s => s.id === selectedSubject);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedSubject(null)}
              className="text-purple-500 hover:text-purple-400 flex items-center gap-2"
            >
              <span>←</span> Back to Subjects
            </button>
            <h2 className="text-2xl text-white font-semibold">
              Grade {selectedGrade} - {currentSubject?.name} Notes
            </h2>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes by title or chapter..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">{note.title}</h3>
                <p className="text-gray-300">Chapter: {note.chapter}</p>
                <div className="flex gap-3">
                  <a 
                    href={note.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200 text-center"
                  >
                    View Notes
                  </a>
                </div>
              </motion.div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="col-span-full text-center text-gray-400">
                No notes found for this subject
              </div>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </MainLayout>
  );
};

export default NotesPage;