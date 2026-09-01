import React, { useState, useEffect } from 'react';
import { FidelFamily, Language } from '../types';
import { FIDEL_DATA } from '../data/fidelData';
import { RefreshCw, Volume2, Sparkles } from 'lucide-react';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

interface WordHuntQuizProps {
  fidel: FidelFamily;
  lang: Language;
  showKey: boolean;
}

interface HuntItem {
  word: string;
  isTarget: boolean;
  translit: string;
}

export const WordHuntQuiz: React.FC<WordHuntQuizProps> = ({ fidel, lang, showKey }) => {
  const isFr = lang === 'fr';
  const [gridItems, setGridItems] = useState<HuntItem[]>([]);
  const [circledSet, setCircledSet] = useState<Set<number>>(new Set());

  const initHunt = () => {
    const targetWords = fidel.vocab.slice(0, 5).map((v) => ({
      word: v.word,
      isTarget: true,
      translit: v.translit,
    }));

    const otherPool = FIDEL_DATA.filter((f) => f.base !== fidel.base).flatMap((f) => f.vocab);
    const distractorWords = otherPool
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map((v) => ({
        word: v.word,
        isTarget: false,
        translit: v.translit,
      }));

    const mixed = [...targetWords, ...distractorWords].sort(() => 0.5 - Math.random());
    setGridItems(mixed);
    setCircledSet(new Set());
  };

  useEffect(() => {
    initHunt();
  }, [fidel.base]);

  const toggleCircle = (index: number, word: string) => {
    speechService.speak(word);
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

  const targetCount = gridItems.filter((i) => i.isTarget).length;
  const correctlyFound = gridItems.filter((i, idx) => circledSet.has(idx) && i.isTarget).length;
  const allFound = targetCount > 0 && correctlyFound === targetCount;

  useEffect(() => {
    if (allFound) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (_) {}
    }
  }, [allFound]);

  return (
    <div className="space-y-3 print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-base font-bold text-[#28324A] flex items-center gap-2">
          <span className="text-[#C4881F]">4.</span>
          <span>{isFr ? 'Chasse aux mots' : 'Word & Letter Hunt'}</span>
        </h3>
        <button
          onClick={initHunt}
          className="flex items-center gap-1 text-xs text-[#5C6478] hover:text-[#C4881F] bg-white/80 border border-[#CFC3A6] px-2.5 py-1 rounded-lg transition shadow-2xs no-print"
          title="Nouvelle grille"
        >
          <RefreshCw className="w-3 h-3 text-[#C4881F]" />
          <span>{isFr ? 'Nouvelle grille' : 'New grid'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-[#5C6478]">
        <p>
          {isFr
            ? `Entourez au stylo tous les mots qui contiennent la lettre « ${fidel.base} » :`
            : `Circle all words containing the root '${fidel.base}':`}
        </p>
        <span className={`font-bold px-2 py-0.5 rounded-full no-print ${
          allFound ? 'bg-[#3E6650]/20 text-[#3E6650]' : 'bg-[#EDE3CC] text-[#28324A]'
        }`}>
          {correctlyFound} / {targetCount}
        </span>
      </div>

      {/* Cloud of words */}
      <div className="bg-white/90 border border-[#CFC3A6] rounded-xl p-3 shadow-xs">
        <div className="flex flex-wrap gap-2 justify-center">
          {gridItems.map((item, idx) => {
            const isCircled = circledSet.has(idx);
            const isRevealedTarget = showKey && item.isTarget;

            return (
              <button
                key={item.word + idx}
                onClick={() => toggleCircle(idx, item.word)}
                className={`px-3.5 py-2 rounded-2xl border transition flex items-center gap-2 shadow-2xs ${
                  isCircled && item.isTarget
                    ? 'bg-[#3E6650]/15 border-[#3E6650] text-[#3E6650] ring-2 ring-[#3E6650]/30 font-bold'
                    : isCircled && !item.isTarget
                    ? 'bg-[#A83A28]/10 border-[#A83A28] text-[#A83A28] ring-1 ring-[#A83A28]'
                    : isRevealedTarget
                    ? 'bg-[#3E6650]/10 border-[#3E6650] text-[#3E6650] font-bold'
                    : 'bg-[#EDE3CC]/30 border-[#CFC3A6] text-[#28324A] hover:bg-[#EDE3CC]/60 hover:border-[#C4881F]'
                }`}
              >
                <span className="font-ethiopic text-lg">{item.word}</span>
                <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100 no-print" />
              </button>
            );
          })}
        </div>
      </div>

      {allFound && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E6650] justify-center pt-1">
          <Sparkles className="w-4 h-4 text-[#C4881F]" />
          <span>
            {isFr
              ? 'Félicitations ! Vous avez trouvé tous les mots.'
              : 'Congratulations! You found all matching words.'}
          </span>
        </div>
      )}
    </div>
  );
};
