import { Quiz } from '../types';

export const featuredQuizzes: Quiz[] = [
  {
    id: 'physics-11',
    title: 'Grade 11 Physics Quiz',
    subject: 'Physics',
    grade: '11',
    duration: 30,
    difficulty: 'Medium',
    totalAttempts: 1234,
    questions: [
      {
        id: 'p1',
        text: 'Which of the following is not a fundamental physical quantity?',
        options: ['Length', 'Time', 'Force', 'Mass'],
        correctAnswer: 2
      },
      {
        id: 'p2',
        text: 'The scalar product of two vectors A and B is zero. What does this mean?',
        options: [
          'A and B are parallel',
          'A and B are perpendicular',
          'A and B are anti-parallel',
          'A and B are equal'
        ],
        correctAnswer: 1
      },
      {
        id: 'p3',
        text: 'What is the acceleration of a body moving with uniform velocity?',
        options: ['0', 'Constant', 'Infinite', 'Varying'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'chemistry-11',
    title: 'Grade 11 Chemistry Quiz',
    subject: 'Chemistry',
    grade: '11',
    duration: 25,
    difficulty: 'Hard',
    totalAttempts: 987,
    questions: [
      {
        id: 'c1',
        text: 'What is the pH of a neutral solution at 25°C?',
        options: ['0', '7', '14', '1'],
        correctAnswer: 1
      },
      {
        id: 'c2',
        text: 'Which of these is not a state of matter?',
        options: ['Solid', 'Liquid', 'Energy', 'Gas'],
        correctAnswer: 2
      },
      {
        id: 'c3',
        text: 'What is the atomic number of Carbon?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'math-11',
    title: 'Grade 11 Mathematics Quiz',
    subject: 'Mathematics',
    grade: '11',
    duration: 35,
    difficulty: 'Easy',
    totalAttempts: 1567,
    questions: [
      {
        id: 'm1',
        text: 'What is the derivative of x²?',
        options: ['x', '2x', '2', 'x³'],
        correctAnswer: 1
      },
      {
        id: 'm2',
        text: 'What is the value of π (pi) to two decimal places?',
        options: ['3.14', '3.15', '3.16', '3.13'],
        correctAnswer: 0
      },
      {
        id: 'm3',
        text: 'What is the integral of 2x?',
        options: ['x²', 'x²+C', '2x²', 'x²+2'],
        correctAnswer: 1
      }
    ]
  }
];

export const getQuizzesByGrade = (grade: string) => {
  return featuredQuizzes.filter(quiz => quiz.grade === grade);
};