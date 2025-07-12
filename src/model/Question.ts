export interface Question {
    id: string;
    libelle: string;
    status: boolean;
    explanation: string;
    responses: Response[];
}