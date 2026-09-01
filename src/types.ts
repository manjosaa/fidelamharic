export type Language = 'fr' | 'en';

export type AppSection = 'fidel' | 'sentences' | 'grammar' | 'difficult_words' | 'builder';

export type PartOfSpeech = 'noun' | 'adjective' | 'verb' | 'particle' | 'pronoun' | 'adverb';

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

export interface WordToken {
  word: string;
  translit: string;
  pos: PartOfSpeech;
  posLabelAm: string; // e.g. ስም, ቅጽል, ግሥ
  en: string;
  fr: string;
  root?: string;
  explanationEn?: string;
  explanationFr?: string;
}

export interface AmharicSentence {
  id: string;
  amharic: string;
  translit: string;
  en: string;
  fr: string;
  category: 'daily' | 'nature' | 'school' | 'family' | 'action' | 'food';
  categoryLabelAm: string;
  categoryLabelEn: string;
  categoryLabelFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tokens: WordToken[];
  grammarPattern: string; // e.g. "[ቅጽል / Adj] + [ስም / Noun] + [ተውሳከ ግሥ / Adv] + [ግሥ / Verb]"
  grammarTipEn: string;
  grammarTipFr: string;
  keyWordHighlights?: string[];
}

export interface GrammarRule {
  id: string;
  titleAm: string;
  titleEn: string;
  titleFr: string;
  badge: string;
  concept: string;
  formula: string;
  explanationEn: string;
  explanationFr: string;
  examples: {
    amharic: string;
    translit: string;
    en: string;
    fr: string;
    breakdown?: string;
  }[];
  pitfallsEn: string[];
  pitfallsFr: string[];
}

export interface DifficultWordItem {
  id: string;
  amharic: string;
  translit: string;
  en: string;
  fr: string;
  category: 'ejective' | 'gemination' | 'homophone' | 'compound' | 'irregular_verb';
  categoryLabelAm: string;
  categoryLabelEn: string;
  categoryLabelFr: string;
  phoneticTip: string;
  explanationEn: string;
  explanationFr: string;
  comparison?: {
    word1: { amharic: string; translit: string; meaningEn: string; meaningFr: string; note: string };
    word2: { amharic: string; translit: string; meaningEn: string; meaningFr: string; note: string };
  };
  sampleSentence?: {
    amharic: string;
    translit: string;
    en: string;
    fr: string;
  };
}

export interface SentencePuzzle {
  id: string;
  targetSentenceAm: string;
  translit: string;
  en: string;
  fr: string;
  scrambledWords: string[];
  correctOrder: string[];
  hintEn: string;
  hintFr: string;
  posMap: Record<string, PartOfSpeech>;
}
