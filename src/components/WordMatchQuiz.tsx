import React, { useState, useEffect } from 'react';
import { Volume2, Check, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabItem, Language } from '../types';
import { speechService } from '../services/speechService';

interface WordMatchQuizProps {
  words: VocabItem[];
  shuffledMeanings: VocabItem[];
  showKey: boolean;
  lang: Language;
  onRefresh: () => void;
}

export const WordMatchQuiz: React.FC<WordMatchQuizProps> = ({
  words,
  shuffledMeanings,
  showKey,
  lang,
  onRefresh,
}) => {
  const isFr = lang === 'fr';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  // User pairings: map from word index (0, 1, 2, 3) -> letter index in shuffled (0, 1, 2, 3)
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [userMatches, setUserMatches] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setUserMatches({});
    setSelectedWordIdx(null);
    setIsSubmitted(false);
  }, [words, shuffledMeanings]);

  useEffect(() => {
    if (showKey) {
      // Build perfect map
      const autoMap: Record<number, number> = {};
      words.forEach((w, i) => {
        const rightIdx = shuffledMeanings.findIndex((m) => m.word === w.word);
        if (rightIdx !== -1) autoMap[i] = rightIdx;
      });
      setUserMatches(autoMap);
      setIsSubmitted(true);
    }
  }, [showKey, words, shuffledMeanings]);

  if (words.length < 2) {
    return (
      <section id="section-word-match" className="mb-8">
        <div className="border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
            <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">3.</span>
            <span>{isFr ? 'Association de mots' : 'Word Matching'}</span>
          </h2>
        </div>
        <div className="p-4 bg-white/70 border border-dashed border-[#CFC3A6] rounded-xl text-xs sm:text-sm text-[#5C6478]">
          {isFr
            ? 'Cette lettre a peu de mots isolés dans l’amharique courant — entraînez-vous plutôt avec le tableau et le traçage.'
            : 'This root has few standalone words in common modern Amharic — focus on the chart and tracing exercises.'}
        </div>
      </section>
    );
  }

  const handleWordClick = (wordIdx: number) => {
    speechService.speak(words[wordIdx].word);
    setSelectedWordIdx(wordIdx);
  };

  const handleMeaningClick = (meaningIdx: number) => {
    if (selectedWordIdx !== null) {
      setUserMatches((prev) => ({
        ...prev,
        [selectedWordIdx]: meaningIdx,
      }));
      // Auto advance to next unmatched word
      const nextUnmatched = words.findIndex(
        (_, idx) => idx !== selectedWordIdx && userMatches[idx] === undefined
      );
      setSelectedWordIdx(nextUnmatched !== -1 ? nextUnmatched : null);
    }
  };

  const handleClearMatch = (wordIdx: number) => {
    setUserMatches((prev) => {
      const next = { ...prev };
      delete next[wordIdx];
      return next;
    });
  };

  const checkMatches = () => {
    setIsSubmitted(true);
    let allCorrect = true;
    words.forEach((w, i) => {
      const matchedIdx = userMatches[i];
      if (matchedIdx === undefined || shuffledMeanings[matchedIdx].word !== w.word) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#3E6650', '#C4881F', '#A83A28', '#EAD9AF'],
        });
      } catch {
        // ignore
      }
    }
  };

  // Correct key mapping for display
  const keyMappings = words.map((w, i) => {
    const rightIdx = shuffledMeanings.findIndex((m) => m.word === w.word);
    return `${i + 1} → ${letters[rightIdx] || '?'}`;
  });

  return (
    <section id="section-word-match" className="mb-8">
      <div className="flex items-center justify-between border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
        <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
          <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">3.</span>
          <span>{isFr ? 'Association de mots' : 'Word & Meaning Matching'}</span>
        </h2>
        <button
          onClick={onRefresh}
          className="text-xs text-[#5C6478] hover:text-[#28324A] flex items-center gap-1 px-2 py-1 bg-white/60 hover:bg-[#EAD9AF] rounded-md border border-[#CFC3A6] transition-colors"
          title={isFr ? 'Mélanger les mots' : 'Reshuffle words'}
        >
          <RefreshCw className="w-3 h-3 text-[#C4881F]" />
          <span>{isFr ? 'Mélanger' : 'Shuffle'}</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-[#5C6478] mb-3">
        {isFr
          ? 'Touchez un mot amharique à gauche, puis touchez sa signification à droite pour les associer :'
          : 'Tap an Amharic word on the left, then tap its definition on the right to pair them:'}
      </p>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
        {/* Left Column: Amharic Words */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C6478] px-1">
            {isFr ? 'Mots amhariques' : 'Amharic Words'}
          </div>
          {words.map((w, i) => {
            const isSelected = selectedWordIdx === i;
            const pairedIdx = userMatches[i];
            const pairedLetter = pairedIdx !== undefined ? letters[pairedIdx] : null;
            const isCorrect =
              isSubmitted && pairedIdx !== undefined && shuffledMeanings[pairedIdx].word === w.word;
            const isWrong =
              isSubmitted && pairedIdx !== undefined && shuffledMeanings[pairedIdx].word !== w.word;

            return (
              <div
                key={w.word}
                onClick={() => handleWordClick(i)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#C4881F] bg-[#EAD9AF]/60 ring-2 ring-[#C4881F]/40 shadow-xs'
                    : isCorrect
                    ? 'border-[#3E6650] bg-[#EAF2EC]'
                    : isWrong
                    ? 'border-[#A83A28] bg-[#F9EAE8]'
                    : pairedLetter
                    ? 'border-[#CFC3A6] bg-white'
                    : 'border-[#CFC3A6]/80 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-serif font-bold text-[#C4881F] text-sm w-4">
                    {i + 1}.
                  </span>
                  <span className="font-amh text-lg sm:text-xl font-bold text-[#28324A]">
                    {w.word}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(w.word);
                    }}
                    className="p-1 text-[#C4881F] hover:text-[#28324A]"
                    title="Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Paired badge or Arrow */}
                <div className="flex items-center gap-1.5">
                  {pairedLetter ? (
                    <div className="flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#28324A] text-white text-xs font-bold flex items-center justify-center">
                        {pairedLetter}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearMatch(i);
                        }}
                        className="text-xs text-[#5C6478] hover:text-[#A83A28] px-1"
                        title={isFr ? 'Effacer le choix' : 'Clear'}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-[#5C6478] flex items-center gap-0.5 opacity-60">
                      {isSelected ? (
                        <span className="text-[#C4881F] font-semibold text-[11px] animate-pulse">
                          {isFr ? 'Choisir →' : 'Pick →'}
                        </span>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Meanings */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C6478] px-1">
            {isFr ? 'Significations' : 'Meanings'}
          </div>
          {shuffledMeanings.map((m, i) => {
            const letter = letters[i];
            // Check if this meaning is selected by any left word
            const pairedLeftIdx = Object.keys(userMatches).find(
              (k) => userMatches[Number(k)] === i
            );

            return (
              <div
                key={m.word}
                onClick={() => handleMeaningClick(i)}
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  pairedLeftIdx !== undefined
                    ? 'border-[#3E6650]/60 bg-[#EAF2EC]/60'
                    : 'border-[#CFC3A6]/80 bg-white/70 hover:bg-white'
                }`}
              >
                <span className="w-6 h-6 rounded-full border border-[#28324A] bg-white text-[#28324A] text-xs font-bold flex items-center justify-center shrink-0">
                  {letter}
                </span>
                <span className="text-xs sm:text-sm text-[#28324A] font-medium flex-1">
                  {isFr ? m.fr : m.en}
                </span>
                {pairedLeftIdx !== undefined && (
                  <span className="text-[11px] font-serif text-[#3E6650] font-semibold">
                    (Mot #{Number(pairedLeftIdx) + 1})
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Match Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          id="check-match-btn"
          onClick={checkMatches}
          disabled={Object.keys(userMatches).length === 0}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#28324A] disabled:opacity-40 text-[#F7F1E4] rounded-lg text-sm font-semibold hover:bg-[#1d2435] active:scale-95 transition-all shadow-xs"
        >
          <Check className="w-4 h-4" />
          <span>{isFr ? 'Vérifier les associations' : 'Check pairs'}</span>
        </button>

        {isSubmitted && (
          <div className="text-xs sm:text-sm text-[#5C6478] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C4881F]" />
            <span>
              {isFr
                ? `Associations vérifiées.`
                : `Pairings verified.`}
            </span>
          </div>
        )}
      </div>

      {/* Answer Key Display */}
      {showKey && (
        <div className="mt-3 p-3 bg-white border border-[#CFC3A6] rounded-lg text-xs sm:text-sm font-medium text-[#3E6650] animate-in fade-in">
          <span className="font-bold">{isFr ? 'Corrigé :' : 'Answer Key:'}</span>{' '}
          {keyMappings.join(' · ')}
        </div>
      )}
    </section>
  );
};
