import { ExerciseSubmission } from "@/model/ExerciseSubmission";
import { ApiClient } from "./ApiClient";

export class ExerciseSubmissionService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async getAllSubmissions(): Promise<ExerciseSubmission[]> {
        try {
            const response = await this.apiClient.get('/exosubmission/all');
            console.log("data in Service:", JSON.stringify(response));
            return response; 
        } catch (error) {
            console.error("Error fetching flash card sets:", error);
            throw new Error('Failed to fetch flash card sets');
        }
    }
}
