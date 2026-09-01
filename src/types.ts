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
  name?: string;
  forms: string[]; // 7 forms: [1st, 2nd, 3rd, 4th, 5th, 6th, 7th]
  orders?: string[]; // Order names like Ge'ez, Ka'eb, etc.
  vowels?: string[]; // [ä, u, i, a, e, ə, o]
  vocab: VocabItem[];
  notes?: {
    fr?: string;
    en?: string;
  };
}

export interface AudioState {
  isSpeaking: boolean;
  isPlayingOnline: boolean;
  hasNativeVoice: boolean;
  isOnline: boolean;
  forceOnline: boolean;
  activeWord: string | null;
}
