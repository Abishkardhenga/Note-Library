import React, { useState, useEffect } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { uploadFile } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

interface NoteUploaderProps {
  onUpload: (fileUrl: string, metadata: { title: string; subject: string; grade: string; description: string }) => void;
  initialData?: any;
}

const SUBJECTS = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Nepali',
  'English',
  'ComputerScience'
];

const ALLOWED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx'
};

const NoteUploader: React.FC<NoteUploaderProps> = ({ onUpload, initialData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('11');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSubject(initialData.subject || '');
      setGrade(initialData.grade || '11');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const validateFile = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
      throw new Error('Only PDF, Word, and PowerPoint documents are allowed');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');
    
    if (selectedFile) {
      try {
        validateFile(selectedFile);
        setFile(selectedFile);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    try {
      if (!file && !initialData) {
        throw new Error('Please select a file');
      }

      let fileUrl = initialData?.fileUrl;

      if (file) {
        // Create a FormData object
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', `${grade}/${subject.toLowerCase()}`);
        formData.append('contentType', file.type);

        const uploadedFile = await uploadFile(file, `${grade}/${subject.toLowerCase()}`);
        fileUrl = uploadedFile.publicUrl;
      }

      await onUpload(fileUrl, { title, subject, grade, description });
      
      // Reset form
      setFile(null);
      setTitle('');
      setSubject('');
      setDescription('');
      toast.success('Note uploaded successfully');
      
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload file');
      toast.error(err.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Upload Study Material</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter note title"
            required
            disabled={isUploading}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={isUploading}
          >
            <option value="">Select Subject</option>
            {SUBJECTS.map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Grade</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={isUploading}
          >
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Enter note description"
            required
            disabled={isUploading}
          />
        </div>

        <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={Object.values(ALLOWED_FILE_TYPES).join(',')}
            required={!initialData}
            disabled={isUploading}
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-purple-400" />
            <p className="mt-2 text-gray-300">
              {file ? file.name : initialData ? 'Upload new file (optional)' : 'Drop your file here, or click to select'}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              PDF, Word, or PowerPoint documents up to 10MB
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full btn-primary"
        >
          {isUploading ? 'Uploading...' : (initialData ? 'Update Note' : 'Upload Note')}
        </button>
      </form>
    </div>
  );
};

export default NoteUploader;