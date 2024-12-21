import React from 'react';
import { motion } from 'framer-motion';
import NoteCard from './NoteCard';
import { Note } from '../../types';

interface NotesGridProps {
  notes: Note[];
  onView: (url: string) => void;
  onDownload: (note: Note) => void;
  hideMetadata?: boolean;
}

const NotesGrid: React.FC<NotesGridProps> = ({ 
  notes, 
  onView, 
  onDownload,
  hideMetadata = false 
}) => {
  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        No notes found for this subject
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NoteCard
            note={note}
            onView={onView}
            onDownload={onDownload}
            hideMetadata={hideMetadata}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default NotesGrid;