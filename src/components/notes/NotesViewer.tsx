import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getFilteredNotes } from '../../data/notes';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import SubjectSelector from './SubjectSelector';
import NotesGrid from './NotesGrid';
import { Note } from '../../types';
import { toast } from 'react-hot-toast';
import { useNoteDownloader } from '../../hooks/useNoteDownloader';
import { GradeSelector } from './GradeSelector';
import { SearchBar } from './SearchBar';

interface NotesViewerProps {
  adminView?: boolean;
  forcedGrade?: number;
  hideMetadata?: boolean;
}

const NotesViewer: React.FC<NotesViewerProps> = ({ 
  adminView = false, 
  forcedGrade,
  hideMetadata = false 
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(forcedGrade || null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { downloadNote } = useNoteDownloader();

  // Determine if user can access specific grade content
  const canAccessGrade = (grade: number) => {
    if (adminView) return true;
    if (forcedGrade) return grade === forcedGrade;
    return grade === parseInt(user?.grade || '0');
  };

  const handleGradeChange = (grade: number) => {
    if (!canAccessGrade(grade)) {
      toast.error(`You don't have access to Grade ${grade} content`);
      return;
    }
    setSelectedGrade(grade);
    setSelectedSubject(null);
  };

  const handleViewNote = (url: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    window.open(url, '_blank');
  };

  const handleDownload = async (note: Note) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    // Check if user has access to this grade's content
    if (!canAccessGrade(note.grade)) {
      toast.error(`You don't have access to Grade ${note.grade} content`);
      return;
    }
    
    await downloadNote(note);
  };

  const filteredNotes = getFilteredNotes(
    selectedGrade, 
    selectedSubject, 
    searchTerm,
    adminView
  ).filter(note => canAccessGrade(note.grade));

  // If user is not admin and has a grade, skip grade selection
  if (!adminView && user?.grade && !forcedGrade) {
    const userGrade = parseInt(user.grade);
    if (!selectedGrade) {
      setSelectedGrade(userGrade);
    }
  }

  // Show grade selector only for admin or if no grade is forced/selected
  if (!selectedGrade && !forcedGrade && (adminView || !user?.grade)) {
    return <GradeSelector onSelect={handleGradeChange} adminView={adminView} />;
  }

  if (!selectedSubject) {
    return (
      <SubjectSelector
        onBack={() => !forcedGrade && setSelectedGrade(null)}
        onSelect={setSelectedSubject}
        grade={selectedGrade || forcedGrade || parseInt(user?.grade || '11')}
        adminView={adminView}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <button
          onClick={() => setSelectedSubject(null)}
          className="text-purple-500 hover:text-purple-400 flex items-center gap-2"
        >
          <span>←</span> Back to Subjects
        </button>
        <h2 className="text-xl text-white font-semibold">
          Grade {selectedGrade || forcedGrade} Notes
        </h2>
      </div>

      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search notes by title or chapter..."
      />

      <NotesGrid
        notes={filteredNotes}
        onView={handleViewNote}
        onDownload={handleDownload}
        hideMetadata={hideMetadata}
      />

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default NotesViewer;