import { SummaryPrompt } from "@/model/SummaryPrompt";
import { ApiClient } from "./ApiClient";
import { FlashCardSetPrompt } from "@/model/FlashCardSetPrompt";

export class FileInfoService {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient('http://localhost:8020/api/v1');
    }

    async generateQuiz(formData: any): Promise<any> {

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

    async generateSummary(formData: SummaryPrompt): Promise<any> {
        console.log("Form data in service:", formData);
        const form = new FormData();

        form.append('file', formData.file as File);
        form.append('summaryLength', formData.summaryLength);
        form.append('summaryType', formData.summaryType);
        form.append('language', formData.language);
        form.append('focusArea', formData.focusArea);
        form.append('outputFormat', formData.outputFormat);
        console.log("Form data prepared for summary generation:", form);

        try {
            const response = await this.apiClient.postFile('/summary/generate', form);
            console.log("Summary generated:", response);
            return response.summary;
        } catch (error) {
            console.error("Error generating summary:", error);
            throw new Error('Failed to generate summary');
        }
    }

    async generateFlashCards(formData: FlashCardSetPrompt): Promise<any> {
        const realFormData = new FormData();
        realFormData.append('file', formData.file as File);
        realFormData.append('title', formData.title);
        realFormData.append('description', formData.description);
        realFormData.append('difficulty', formData.difficulty);
        realFormData.append('selectedCardTypes', formData.selectedCardTypes.join(','));

        const response = await this.apiClient.postFile('/flashcards/generate', realFormData);
        if (!response.ok) {
            throw new Error('Failed to generate flashcards');
        }

        return response;
    }



}