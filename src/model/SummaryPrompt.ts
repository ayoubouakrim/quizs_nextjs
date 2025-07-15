export interface SummaryPrompt {
    id: string;
    file: File | null;
    summaryLength: string;
    summaryType: string ;
    language: string;
    focusArea: string;
    outputFormat: string;
}