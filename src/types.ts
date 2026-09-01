export type Language = 'fr' | 'en';

export interface VocabItem {
  form: string;
  word: string;
  translit: string;
  fr: string;
  en: string;
}

export interface FidelFamily {
  base: string;
  name: string;
  forms: [string, string, string, string, string, string, string];
  vocab: VocabItem[];
  notesFr?: string;
  notesEn?: string;
}

export interface AudioState {
  isSpeaking: boolean;
  isPlayingOnline: boolean;
  hasNativeVoice: boolean;
  isOnline: boolean;
  forceOnline: boolean;
  activeWord: string | null;
}
