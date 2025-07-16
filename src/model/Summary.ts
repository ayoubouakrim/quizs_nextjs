export interface Summary {
  id: number | string;
  libelle: string;
  focusArea: string;
  summaryType: 'general' | 'academic' | 'business' | 'technical';
  summaryLength: 'brief' | 'medium' | 'detailed';
  language: string;
  readTime: number;
  createdAt: string;
  isBookmarked: boolean;
  wordCount: number;
}