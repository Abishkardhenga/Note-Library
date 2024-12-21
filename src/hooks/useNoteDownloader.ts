import { toast } from 'react-hot-toast';
import { Note } from '../types';

export const useNoteDownloader = () => {
  const downloadNote = async (note: Note) => {
    if (!note.url) {
      toast.error('Download URL not available');
      return;
    }

    try {
      const response = await fetch(note.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  return { downloadNote };
};