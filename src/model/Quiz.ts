export interface Quiz {
    id: string;
    libelle: string;
    subjectArea: string;
    academicLevel: string;
    numQuestions: number;
    difficulty: string;
    description: string;
    createdAt: string;
    nbRepCorrect: number;
    score: number;
}