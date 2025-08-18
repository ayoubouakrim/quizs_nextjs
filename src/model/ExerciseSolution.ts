import { QuestionSolution } from "./QuestionSolution";

export interface ExerciseSolution {
    id: string;
    title: string;
    description: string;
    questions: QuestionSolution[];
}