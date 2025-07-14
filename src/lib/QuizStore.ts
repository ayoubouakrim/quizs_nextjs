
import { create } from 'zustand';
import { Question } from '@/model/Question';

interface QuizState {
  questions: Question[];
  userAnswers: Record<number, number>;
  setQuiz: (q: Question[], a: Record<number, number>) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  userAnswers: {},
  setQuiz: (questions, userAnswers) => set({ questions, userAnswers }),
}));
