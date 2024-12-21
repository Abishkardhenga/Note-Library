import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';
import { Quiz } from '../../types';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

interface QuizCreatorProps {
  initialData?: Quiz | null;
  onSave: () => void;
  onClose: () => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ initialData, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('11');
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [questions, setQuestions] = useState<Array<{
    id?: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }>>([
    { text: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubject(initialData.subject);
      setGrade(initialData.grade);
      setDuration(initialData.duration);
      setDifficulty(initialData.difficulty);
      setQuestions(initialData.questions);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const quizData = {
        title,
        subject,
        grade,
        duration,
        difficulty,
        questions: questions.map((q, i) => ({ ...q, id: q.id || `q${i}` })),
        totalAttempts: initialData?.totalAttempts || 0,
        createdAt: initialData?.createdAt || new Date().toISOString()
      };

      if (initialData) {
        await updateDoc(doc(db, 'quizzes', initialData.id), quizData);
      } else {
        await addDoc(collection(db, 'quizzes'), quizData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast.error('Failed to save quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {initialData ? 'Edit Quiz' : 'Create New Quiz'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English">English</option>
              <option value="Nepali">Nepali</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="p-6 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Question {qIndex + 1}</h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].text = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  placeholder="Enter question"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />

                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-4">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={question.correctAnswer === oIndex}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[qIndex].correctAnswer = oIndex;
                        setQuestions(newQuestions);
                      }}
                      required
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[qIndex].options[oIndex] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      placeholder={`Option ${oIndex + 1}`}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus size={20} />
            Add Question
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (initialData ? 'Update Quiz' : 'Create Quiz')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default QuizCreator;