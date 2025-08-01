import { Summary } from "@/model/Summary";
import { ApiClient } from "./ApiClient";

export class SummaryService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async getAllSummaries(): Promise<Summary[]> {
        try {
            const response = await this.apiClient.get('/summary/all');
            console.log("data in Service:", JSON.stringify(response));
            return response; 
        } catch (error) {
            console.error("Error fetching summaries:", error);
            throw new Error('Failed to fetch summaries');
        }
    }

    async getSummaryById(id: string): Promise<Summary> {
        try {
            const response = await this.apiClient.get(`/summary/id/${id}`);
            return response;
        } catch (error) {
            console.error("Error fetching summary by ID:", error);
            throw new Error('Failed to fetch summary');
        }
    }

}