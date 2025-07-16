import { ApiClient } from "./ApiClient";

export class ParagrapheService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }


    async getParagraphsBySummaryId(summaryId: string): Promise<any[]> {
        try {
            const response = await this.apiClient.get(`/paragraphe/summary/id/${summaryId}`);
            console.log("Paragraphs data:", JSON.stringify(response));
            return response; 
        } catch (error) {
            console.error("Error fetching paragraphs by summary ID:", error);
            throw new Error('Failed to fetch paragraphs');
        }
    }
}