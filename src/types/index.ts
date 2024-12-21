export interface User {
  id: string;
  fullName: string;
  email: string;
  grade: string;
  phone: string;
  role: 'admin' | 'student';
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  setupComplete?: boolean;
  emailVerified?: boolean;
  attempts: Record<string, number>;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  totalAttempts: number;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  grade: number;
  chapter: string;
  url?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
}