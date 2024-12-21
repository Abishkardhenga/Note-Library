import { Question } from '../types';

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a unique set of questions for each attempt
export const generateQuizQuestions = (
  questions: Question[],
  numQuestions: number = questions.length
): Question[] => {
  // First shuffle the questions
  const shuffledQuestions = shuffleArray(questions);
  
  // Take only the required number of questions
  const selectedQuestions = shuffledQuestions.slice(0, numQuestions);
  
  // For each question, also shuffle the options while keeping track of correct answer
  return selectedQuestions.map(question => {
    const options = [...question.options];
    const correctOption = options[question.correctAnswer];
    const shuffledOptions = shuffleArray(options);
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

// Calculate the score based on user answers
export const calculateScore = (
  userAnswers: number[],
  questions: Question[]
): number => {
  let correct = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 100);
};