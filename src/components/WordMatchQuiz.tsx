import React, { useState, useEffect } from 'react';
import { FidelFamily, Language, VocabItem } from '../types';
import { RefreshCw, Volume2, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

interface WordMatchQuizProps {
  fidel: FidelFamily;
  lang: Language;
  showKey: boolean;
}

export const WordMatchQuiz: React.FC<WordMatchQuizProps> = ({ fidel, lang, showKey }) => {
  const isFr = lang === 'fr';
  const [selectedWords, setSelectedWords] = useState<VocabItem[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<VocabItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const letters = ['A', 'B', 'C', 'D'];

  const initQuiz = () => {
    const vocabPool = [...fidel.vocab];
    const chosen = vocabPool.sort(() => 0.5 - Math.random()).slice(0, Math.min(4, vocabPool.length));
    setSelectedWords(chosen);
    setShuffledMeanings([...chosen].sort(() => 0.5 - Math.random()));
    setMatches({});
    setSelectedLeft(null);
    setIsSubmitted(false);
  };

  useEffect(() => {
    initQuiz();
  }, [fidel.base]);

  useEffect(() => {
    if (showKey) {
      const autoMatches: Record<number, number> = {};
      selectedWords.forEach((item, leftIdx) => {
        const rightIdx = shuffledMeanings.findIndex((m) => m.word === item.word);
        if (rightIdx !== -1) autoMatches[leftIdx] = rightIdx;
      });
      setMatches(autoMatches);
      setIsSubmitted(true);
    }
  }, [showKey, selectedWords, shuffledMeanings]);

  const handleSelectLeft = (leftIdx: number) => {
    speechService.speak(selectedWords[leftIdx].word);
    setSelectedLeft(leftIdx);
  };

  const handleSelectRight = (rightIdx: number) => {
    if (selectedLeft === null) return;
    setMatches((prev) => ({
      ...prev,
      [selectedLeft]: rightIdx,
    }));
    // Auto advance to next unmatched left item
    const nextUnmatched = selectedWords.findIndex(
      (_, idx) => idx !== selectedLeft && matches[idx] === undefined
    );
    setSelectedLeft(nextUnmatched !== -1 ? nextUnmatched : null);
  };

  const handleClearMatch = (leftIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMatches((prev) => {
      const copy = { ...prev };
      delete copy[leftIdx];
      return copy;
    });
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    let allCorrect = true;
    selectedWords.forEach((word, leftIdx) => {
      const rightIdx = matches[leftIdx];
      if (rightIdx === undefined || shuffledMeanings[rightIdx]?.word !== word.word) {
        allCorrect = false;
      }
    });

    if (allCorrect && Object.keys(matches).length === selectedWords.length) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (_) {}
    }
  };

  if (selectedWords.length < 2) {
    return (
      <div className="space-y-2">
        <h3 className="font-cinzel text-base font-bold text-[#28324A] flex items-center gap-2">
          <span className="text-[#C4881F]">3.</span>
          <span>{isFr ? 'Association de mots' : 'Word & Meaning Matching'}</span>
        </h3>
        <p className="text-xs text-[#8A93A6]">
          {isFr
            ? 'Cette lettre a peu de mots isolés dans l’amharique courant — entraînez-vous avec le tableau et le traçage.'
            : 'This root has few standalone words in common modern Amharic — focus on the chart and tracing exercises.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-base font-bold text-[#28324A] flex items-center gap-2">
          <span className="text-[#C4881F]">3.</span>
          <span>{isFr ? 'Association de mots' : 'Word & Meaning Matching'}</span>
        </h3>
        <button
          onClick={initQuiz}
          className="flex items-center gap-1 text-xs text-[#5C6478] hover:text-[#C4881F] bg-white/80 border border-[#CFC3A6] px-2.5 py-1 rounded-lg transition shadow-2xs no-print"
          title="Mélanger"
        >
          <RefreshCw className="w-3 h-3 text-[#C4881F]" />
          <span>{isFr ? 'Mélanger' : 'Shuffle'}</span>
        </button>
      </div>

      <p className="text-xs text-[#5C6478] leading-relaxed">
        {isFr
          ? 'Associez chaque mot amharique (1-4) à sa signification correspondante (A-D) :'
          : 'Match each Amharic word (1-4) with its correct definition on the right (A-D):'}
      </p>

      {/* Grid of Words & Meanings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left Column: Amharic Words */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold tracking-wider text-[#5C6478] uppercase">
            {isFr ? '1. Mots amhariques' : '1. Amharic words'}
          </div>
          <div className="space-y-1.5">
            {selectedWords.map((item, leftIdx) => {
              const isSelected = selectedLeft === leftIdx;
              const pairedRightIdx = matches[leftIdx];
              const pairedLetter = pairedRightIdx !== undefined ? letters[pairedRightIdx] : null;
              const isCorrect =
                isSubmitted &&
                pairedRightIdx !== undefined &&
                shuffledMeanings[pairedRightIdx]?.word === item.word;
              const isWrong =
                isSubmitted &&
                pairedRightIdx !== undefined &&
                shuffledMeanings[pairedRightIdx]?.word !== item.word;

              return (
                <div
                  key={item.word}
                  onClick={() => handleSelectLeft(leftIdx)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition shadow-2xs ${
                    isSelected
                      ? 'border-[#C4881F] bg-[#C4881F]/10 ring-1 ring-[#C4881F]'
                      : isCorrect
                      ? 'border-[#3E6650] bg-[#3E6650]/10'
                      : isWrong
                      ? 'border-[#A83A28] bg-[#A83A28]/10'
                      : pairedLetter
                      ? 'border-[#CFC3A6] bg-white'
                      : 'border-[#CFC3A6] bg-white/70 hover:bg-white hover:border-[#C4881F]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xs font-bold text-[#C4881F]">{leftIdx + 1}.</span>
                    <span className="font-ethiopic text-lg font-bold text-[#28324A]">{item.word}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(item.word);
                      }}
                      className="p-1 text-[#C4881F] hover:text-[#28324A] transition no-print"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Print blank or digital match indicator */}
                  <div className="hidden print:flex items-center gap-1 font-mono font-bold text-xs text-[#5C6478]">
                    <span>[ ___ ]</span>
                  </div>

                  <div className="print:hidden flex items-center">
                    {pairedLetter ? (
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            isCorrect ? 'bg-[#3E6650]' : isWrong ? 'bg-[#A83A28]' : 'bg-[#28324A]'
                          }`}
                        >
                          {pairedLetter}
                        </span>
                        <button
                          onClick={(e) => handleClearMatch(leftIdx, e)}
                          className="text-[#8A93A6] hover:text-[#A83A28] p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : isSelected ? (
                      <span className="text-[11px] font-bold text-[#C4881F]">Choisir →</span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#CFC3A6]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Definitions */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold tracking-wider text-[#5C6478] uppercase">
            {isFr ? '2. Significations' : '2. Definitions'}
          </div>
          <div className="space-y-1.5">
            {shuffledMeanings.map((item, rightIdx) => {
              const letter = letters[rightIdx];
              const pairedLeftIdx = Object.entries(matches).find(
                ([_, rIdx]) => rIdx === rightIdx
              )?.[0];

              return (
                <div
                  key={item.word + rightIdx}
                  onClick={() => handleSelectRight(rightIdx)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition shadow-2xs ${
                    pairedLeftIdx !== undefined
                      ? 'border-[#3E6650]/60 bg-[#3E6650]/5'
                      : 'border-[#CFC3A6] bg-white/70 hover:bg-white hover:border-[#C4881F]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border border-[#28324A] flex items-center justify-center text-xs font-bold text-[#28324A]">
                      {letter}
                    </span>
                    <span className="text-xs font-medium text-[#28324A]">
                      {isFr ? item.fr : item.en}
                    </span>
                  </div>

                  {pairedLeftIdx !== undefined && (
                    <span className="text-[11px] font-bold text-[#3E6650] no-print">
                      (#{Number(pairedLeftIdx) + 1})
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="flex items-center gap-3 no-print">
        <button
          onClick={handleCheck}
          disabled={Object.keys(matches).length === 0}
          className="px-4 py-2 bg-[#28324A] text-white disabled:opacity-40 hover:bg-[#1f273a] text-xs font-semibold rounded-xl transition shadow-xs"
        >
          {isFr ? 'Vérifier les associations' : 'Check pairs'}
        </button>

        {isSubmitted && (
          <span className="text-xs font-bold text-[#3E6650] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            {isFr ? 'Associations vérifiées.' : 'Pairings verified.'}
          </span>
        )}
      </div>

      {showKey && (
        <div className="bg-white border border-[#CFC3A6] p-2.5 rounded-xl text-xs font-semibold text-[#3E6650]">
          <span>{isFr ? 'Corrigé :' : 'Answer Key:'} </span>
          {selectedWords.map((w, idx) => {
            const rIdx = shuffledMeanings.findIndex((m) => m.word === w.word);
            return (
              <span key={w.word} className="mr-3">
                {idx + 1} → {letters[rIdx]}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
