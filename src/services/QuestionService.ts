import { ApiClient } from './ApiClient';

export class QuestionService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async getQuestionsByQuizId(quizId: string): Promise<any[]> {
        try {
            const response = await this.apiClient.get(`/question/quiz/id/${quizId}`);
            console.log("data in Service:", JSON.stringify(response));
            return response;
        } catch (error) {
            console.error("Error fetching questions by quiz ID:", error);
            throw new Error('Failed to fetch questions by quiz ID');
        }
    }
}