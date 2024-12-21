import { Note } from '../types';
import { mathNotes11, mathNotes12 } from './notes/mathematics';
import { physicsNotes11, physicsNotes12 } from './notes/physics';
import { chemistryNotes11, chemistryNotes12 } from './notes/chemistry';
import { biologyNotes11, biologyNotes12 } from './notes/biology';
import { computerScienceNotes11, computerScienceNotes12 } from './notes/computer-science';
import { englishNotes11, englishNotes12 } from './notes/english';
import { nepaliNotes11, nepaliNotes12 } from './notes/nepali';
import { socialStudiesNotes11, socialStudiesNotes12 } from './notes/social';

// Combine all notes
export const notes: Note[] = [
  ...mathNotes11,
  ...mathNotes12,
  ...physicsNotes11,
  ...physicsNotes12,
  ...chemistryNotes11,
  ...chemistryNotes12,
  ...biologyNotes11,
  ...biologyNotes12,
  ...computerScienceNotes11,
  ...computerScienceNotes12,
  ...englishNotes11,
  ...englishNotes12,
  ...nepaliNotes11,
  ...nepaliNotes12,
  ...socialStudiesNotes11,
  ...socialStudiesNotes12
];

// Utility function to filter notes
export const getFilteredNotes = (
  grade: number | null, 
  subject: string | null, 
  searchTerm: string = '',
  showAllGrades: boolean = false
) => {
  return notes.filter(note => {
    const matchesGrade = showAllGrades ? true : grade ? note.grade === grade : true;
    const matchesSubject = subject ? note.subject === subject : true;
    const matchesSearch = searchTerm ? 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.chapter.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesGrade && matchesSubject && matchesSearch;
  });
};