import { ApiClient } from "./ApiClient";

export class FlashCardService {
    private apiClient: ApiClient;
    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    public async getFlashCardsBySetId(setId: string): Promise<any> {
        try {
            const response = await this.apiClient.get(`/flashcard/flashcards/id/${setId}`);
            return response;
        } catch (error) {
            console.error("Error fetching flashcards by set ID:", error);
            throw new Error('Failed to fetch flashcards');
        }
    }
}