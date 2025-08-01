import { FlashCardSet } from "@/model/FlashCardSet";
import { ApiClient } from "./ApiClient";

export class FlashCardSetService {
    private apiClient : ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async getAllFlashCardSets(): Promise<FlashCardSet[]> {
        try {
            const response = await this.apiClient.get('/flashcards/all');
            console.log("data in Service:", JSON.stringify(response));
            return response; 
        } catch (error) {
            console.error("Error fetching flash card sets:", error);
            throw new Error('Failed to fetch flash card sets');
        }
    }

    async getFlashCardSetById(id: string): Promise<any> {
        try {
            const response = await this.apiClient.get(`/flashcards/id/${id}`);
            return response;
        } catch (error) {
            console.error("Error fetching flash card set by ID:", error);
            throw new Error('Failed to fetch flash card set');
        }
    }

}