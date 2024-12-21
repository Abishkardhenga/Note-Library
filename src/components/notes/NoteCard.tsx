import React from 'react';
import { Download, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Note } from '../../types';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onView: (url: string) => void;
  onDownload: (note: Note) => void;
  hideMetadata?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onView, 
  onDownload,
  hideMetadata = false 
}) => {
  const { user } = useAuth();
  const isMobile = window.innerWidth < 768;

  const handleDownload = () => {
    if (!user) {
      toast.error('Please login to download notes');
      return;
    }
    if (!note.url) {
      toast.error('Download URL not available');
      return;
    }
    onDownload(note);
  };

  return (
    <div className="glass-card p-4 md:p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">{note.title}</h3>
      
      {!hideMetadata && note.uploadDate && (
        <div className="text-sm text-gray-400 mb-4">
          <p>Uploaded: {format(new Date(note.uploadDate), 'MMM d, yyyy')}</p>
          {note.downloads !== undefined && (
            <p>Downloads: {note.downloads}</p>
          )}
        </div>
      )}
      
      <div className="mt-auto flex gap-3">
        {!isMobile && note.url && (
          <button
            onClick={() => onView(note.url!)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 
            transition-all duration-200 flex items-center justify-center border border-white/10
            hover:border-purple-500/50"
          >
            <Eye size={16} className="mr-2 text-purple-400" />
            View
          </button>
        )}
        <button 
          onClick={handleDownload}
          className="flex-1 px-4 py-2 rounded-lg bg-purple-500 text-white 
          hover:bg-purple-600 transition-all duration-200 flex items-center 
          justify-center shadow-lg shadow-purple-500/20"
        >
          <Download size={16} className="mr-2" />
          Download
        </button>
      </div>
    </div>
  );
};

export default NoteCard;