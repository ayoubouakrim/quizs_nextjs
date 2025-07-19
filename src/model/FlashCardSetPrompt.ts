export interface FlashCardSetPrompt {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    totalCards: number;
    selectedCardTypes: string[];
    file: File | null;

}