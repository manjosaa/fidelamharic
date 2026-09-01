import React, { useState, useEffect, useCallback } from 'react';
import { FidelFamily, Language, VocabItem, AudioState } from './types';
import { FIDEL_DATA } from './data/fidelData';
import { speechService } from './services/speechService';
import { HeaderBar } from './components/HeaderBar';
import { FidelTabs } from './components/FidelTabs';
import { FidelChart } from './components/FidelChart';
import { MissingSequenceQuiz } from './components/MissingSequenceQuiz';
import { WordMatchQuiz } from './components/WordMatchQuiz';
import { WordHuntQuiz, HuntWordItem } from './components/WordHuntQuiz';
import { TracingCanvas } from './components/TracingCanvas';
import { VoiceHelpModal } from './components/VoiceHelpModal';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export default function App() {
  const [currentFidel, setCurrentFidel] = useState<FidelFamily>(FIDEL_DATA[0]);
  const [lang, setLang] = useState<Language>('fr');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isVoiceHelpOpen, setIsVoiceHelpOpen] = useState<boolean>(false);

  // Audio system state
  const [audioState, setAudioState] = useState<AudioState>(speechService.getState());

  useEffect(() => {
    const unsubscribe = speechService.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  // Exercise generated state
  const [missingIdx, setMissingIdx] = useState<number>(0);
  const [matchWords, setMatchWords] = useState<VocabItem[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<VocabItem[]>([]);
  const [huntWords, setHuntWords] = useState<HuntWordItem[]>([]);
  const [circledSet, setCircledSet] = useState<Set<number>>(new Set());

  // Generate randomized worksheet exercises for active letter
  const generateSheet = useCallback((fidel: FidelFamily) => {
    // 1. Missing sequence index (0 to 6)
    const newMissing = Math.floor(Math.random() * 7);
    setMissingIdx(newMissing);

    // 2. Match words (up to 4)
    const matchCount = Math.min(4, fidel.vocab.length);
    const chosenMatch = sample(fidel.vocab, matchCount);
    setMatchWords(chosenMatch);
    setShuffledMeanings(shuffle(chosenMatch));

    // 3. Hunt words (targets + distractors from other families)
    const targetCount = Math.min(5, fidel.vocab.length);
    const targetWords: HuntWordItem[] = sample<VocabItem>(fidel.vocab, targetCount).map((w: VocabItem) => ({
      ...w,
      isTarget: true,
    }));

    const otherBases = FIDEL_DATA.filter((f) => f.base !== fidel.base);
    const distractorPool: VocabItem[] = [];
    otherBases.forEach((b) => distractorPool.push(...b.vocab));
    const distractorWords: HuntWordItem[] = sample<VocabItem>(distractorPool, 5).map((w: VocabItem) => ({
      ...w,
      isTarget: false,
    }));

    setHuntWords(shuffle([...targetWords, ...distractorWords]));
    setCircledSet(new Set());
    setShowKey(false);
  }, []);

  // When active letter changes
  useEffect(() => {
    generateSheet(currentFidel);
  }, [currentFidel, generateSheet]);

  const handleSelectFidel = (fidel: FidelFamily) => {
    setCurrentFidel(fidel);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  const handleToggleKey = () => {
    setShowKey((prev) => !prev);
  };

  const handleNewSheet = () => {
    generateSheet(currentFidel);
  };

  const handleToggleCircle = (index: number) => {
    setCircledSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen py-3 sm:py-6 px-2.5 sm:px-4 md:px-6 max-w-5xl mx-auto">
      {/* Mobile-friendly Header and Toolbar */}
      <HeaderBar
        currentFidel={currentFidel}
        onSelectFidel={handleSelectFidel}
        lang={lang}
        onToggleLang={handleToggleLang}
        showKey={showKey}
        onToggleKey={handleToggleKey}
        onNewSheet={handleNewSheet}
        onOpenVoiceHelp={() => setIsVoiceHelpOpen(true)}
        audioState={audioState}
      />

      {/* 33 Fidel Family Tabs */}
      <FidelTabs
        currentFidel={currentFidel}
        onSelectFidel={handleSelectFidel}
      />

      {/* Main Paper Workbook Sheet */}
      <main
        id="main-worksheet-page"
        className="print-page bg-[#F7F1E4] border border-[#CFC3A6] border-l-4 sm:border-l-[6px] border-l-[#A83A28] rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-7 md:p-9 transition-all relative"
      >
        {/* Worksheet Header */}
        <div className="mb-6 sm:mb-8 border-b border-[#CFC3A6]/60 pb-5">
          <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#5C6478] uppercase mb-1 flex items-center justify-between">
            <span>{isFr ? 'Cahier de Fidel · 33 Familles · Ordres 1 à 7' : 'Fidel Workbook · 33 Families · Orders 1 to 7'}</span>
            <span className="text-[#C4881F] font-serif font-bold text-xs sm:text-sm">
              {currentFidel.name ? currentFidel.name : ''}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#28324A] flex items-center gap-2">
              <button
                onClick={() => speechService.speak(currentFidel.base)}
                className="font-amh text-[#3E6650] hover:text-[#28324A] text-3xl sm:text-4xl md:text-5xl font-bold cursor-pointer transition-transform hover:scale-105 active:scale-95 inline-flex items-center"
                title={isFr ? `Écouter la lettre racine ${currentFidel.base}` : `Listen to root letter ${currentFidel.base}`}
              >
                {currentFidel.base}
              </button>
              <span className="text-[#28324A]">
                — {isFr ? "Fiche d'exercices" : 'Practice Worksheet'}
              </span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#5C6478] mt-1.5 leading-relaxed max-w-2xl">
            {isFr
              ? 'Sept formes, un seul son de base. Touchez pour écouter, puis effectuez les exercices interactifs ci-dessous.'
              : 'Seven vowel variations on a single root consonant. Tap any glyph to hear it, then complete the exercises below.'}
          </p>
        </div>

        {/* Section 1: Fidel Chart */}
        <FidelChart
          fidel={currentFidel}
          lang={lang}
        />

        {/* Section 2: Missing Sequence Quiz */}
        <MissingSequenceQuiz
          fidel={currentFidel}
          missingIdx={missingIdx}
          showKey={showKey}
          lang={lang}
          onRefresh={() => setMissingIdx(Math.floor(Math.random() * 7))}
        />

        {/* Section 3: Word Association Quiz */}
        <WordMatchQuiz
          words={matchWords}
          shuffledMeanings={shuffledMeanings}
          showKey={showKey}
          lang={lang}
          onRefresh={() => {
            const count = Math.min(4, currentFidel.vocab.length);
            const chosen = sample(currentFidel.vocab, count);
            setMatchWords(chosen);
            setShuffledMeanings(shuffle(chosen));
          }}
        />

        {/* Section 4: Word Hunt Quiz */}
        <WordHuntQuiz
          fidel={currentFidel}
          huntWords={huntWords}
          circledSet={circledSet}
          onToggleCircle={handleToggleCircle}
          showKey={showKey}
          lang={lang}
          onRefresh={() => {
            const targetCount = Math.min(5, currentFidel.vocab.length);
            const targets: HuntWordItem[] = sample<VocabItem>(currentFidel.vocab, targetCount).map((w: VocabItem) => ({
              ...w,
              isTarget: true,
            }));
            const otherBases = FIDEL_DATA.filter((f) => f.base !== currentFidel.base);
            const pool: VocabItem[] = [];
            otherBases.forEach((b) => pool.push(...b.vocab));
            const distractors: HuntWordItem[] = sample<VocabItem>(pool, 5).map((w: VocabItem) => ({
              ...w,
              isTarget: false,
            }));
            setHuntWords(shuffle([...targets, ...distractors]));
            setCircledSet(new Set());
          }}
        />

        {/* Section 5: Tracing Canvas & Handwriting Sheet */}
        <TracingCanvas
          fidel={currentFidel}
          lang={lang}
        />
      </main>

      {/* Footer */}
      <footer className="no-print mt-6 mb-8 text-center text-xs text-[#5C6478] space-y-1">
        <p>
          {isFr
            ? 'Format optimisé pour smartphone, tablette et impression A4 · Synthèse vocale amharique multi-niveaux intégrée'
            : 'Optimized for mobile phones, tablets, and A4 printing · Integrated multi-tier Amharic text-to-speech'}
        </p>
        <p className="text-[11px] opacity-75">
          {isFr
            ? 'Lettres amhariques conformes au système Ge’ez traditionnel'
            : 'Traditional Ethiopian Fidel (Ge’ez script) orthography'}
        </p>
      </footer>

      {/* Audio & Pronunciation Help Modal */}
      <VoiceHelpModal
        isOpen={isVoiceHelpOpen}
        onClose={() => setIsVoiceHelpOpen(false)}
        audioState={audioState}
        lang={lang}
      />
    </div>
  );
}
