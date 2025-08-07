export interface ExercisePrompt {
    id: string;
    file: File | null;
    subject: string;
    solutionType: string;
    userAdds: string;
}