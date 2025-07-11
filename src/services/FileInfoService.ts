import { ApiClient } from "./ApiClient";

export class FileInfoService {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async generateQuiz (formData : any): Promise<any> {

        const realFormData = new FormData()
        realFormData.append('file', formData.file);
        realFormData.append('subjectArea', formData.subjectArea);
        realFormData.append('academicLevel', formData.academicLevel);
        realFormData.append('numQuestions', formData.numQuestions.toString());
        realFormData.append('difficulty', formData.difficulty);
        realFormData.append('description', formData.description);

        const response = await this.apiClient.postFile('/quiz/generate', realFormData);
        if (!response.ok) {
            throw new Error('Failed to generate quiz');
        }

        return response;
    }
    


}