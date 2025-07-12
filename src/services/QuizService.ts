import { Quiz } from '@/model/Quiz';
import { ApiClient } from './ApiClient';


export class QuizService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async getAllQuizzes(): Promise<Quiz[]> {
        try {
            const response = await this.apiClient.get('/quiz/all');
            console.log("data in Service:", JSON.stringify(response));
            return response; 
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            throw new Error('Failed to fetch quizzes');
        }
    }

    async getQuizById(id:string) : Promise<Quiz> {
        try {
            const response = await this.apiClient.get(`/quiz/id/${id}`);
            console.log("data in Service:", JSON.stringify(response));
            return response; 
        }
        catch (error) {
            console.error("Error fetching quiz by ID:", error);
            throw new Error('Failed to fetch quiz by ID');
        }
    }

    async updateQuiz(quiz: Quiz): Promise<Quiz> {
        try {
            const response = await this.apiClient.put(`/quiz/update/${quiz.id}`, quiz);
            console.log("data in Service:", JSON.stringify(response));
            return response; 
        } catch (error) {
            console.error("Error updating quiz:", error);
            throw new Error('Failed to update quiz');
        }
    }


}