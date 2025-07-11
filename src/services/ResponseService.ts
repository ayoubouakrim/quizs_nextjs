import { ApiClient } from "./ApiClient";

export class ResponseService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async getResponsesByQuestionId(questionId: string): Promise<any[]> {
        try {
            const response = await this.apiClient.get(`/response/question/id/${questionId}`);
            console.log("data in Service:", JSON.stringify(response));
            return response;
        } catch (error) {
            console.error("Error fetching responses by question ID:", error);
            throw new Error('Failed to fetch responses by question ID');
        }
    }
}