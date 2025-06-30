import { ApiClient } from "./ApiClient";

export class FileInfoService {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1/');
    }

    async generateQuiz (formData : any): Promise<any> {
        const response = await this.apiClient.post('/quiz/generate', formData);
        if (!response.ok) {
            throw new Error('Failed to generate quiz');
        }
    }
    


}