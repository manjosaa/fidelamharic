import React from 'react';
import { RotateCcw, Volume2, Target, CheckCircle2 } from 'lucide-react';
import { FidelFamily, VocabItem, Language } from '../types';
import { speechService } from '../services/speechService';

export interface HuntWordItem extends VocabItem {
  isTarget: boolean;
}

interface WordHuntQuizProps {
  fidel: FidelFamily;
  huntWords: HuntWordItem[];
  circledSet: Set<number>;
  onToggleCircle: (index: number) => void;
  showKey: boolean;
  lang: Language;
  onRefresh: () => void;
}

export const WordHuntQuiz: React.FC<WordHuntQuizProps> = ({
  fidel,
  huntWords,
  circledSet,
  onToggleCircle,
  showKey,
  lang,
  onRefresh,
}) => {
  const isFr = lang === 'fr';

  if (fidel.vocab.length === 0) {
    return (
      <section id="section-word-hunt" className="mb-8">
        <div className="border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
            <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">4.</span>
            <span>{isFr ? 'Chasse aux lettres' : 'Letter Hunt'}</span>
          </h2>
        </div>
        <div className="p-4 bg-white/70 border border-dashed border-[#CFC3A6] rounded-xl text-xs sm:text-sm text-[#5C6478]">
          {isFr
            ? 'Cette lettre est rare dans les mots courants modernes — pratiquez plutôt sa forme avec le tableau et le traçage.'
            : 'This letter is rare in modern common vocabulary — practice its shapes in the chart and tracing exercise above.'}
        </div>
      </section>
    );
  }

  const handleChipClick = (word: string, index: number) => {
    onToggleCircle(index);
    speechService.speak(word);
  };

  const totalTargets = huntWords.filter((w) => w.isTarget).length;
  const foundTargets = Array.from(circledSet).filter((idx: number) => Boolean(huntWords[idx]?.isTarget)).length;

  return (
    <section id="section-word-hunt" className="mb-8">
      <div className="flex items-center justify-between border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
        <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
          <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">4.</span>
          <span>{isFr ? 'Chasse aux lettres' : 'Letter & Root Hunt'}</span>
        </h2>
        <button
          onClick={onRefresh}
          className="text-xs text-[#5C6478] hover:text-[#28324A] flex items-center gap-1 px-2 py-1 bg-white/60 hover:bg-[#EAD9AF] rounded-md border border-[#CFC3A6] transition-colors"
          title={isFr ? 'Mélanger les mots' : 'Shuffle words'}
        >
          <RotateCcw className="w-3 h-3 text-[#C4881F]" />
          <span>{isFr ? 'Mélanger' : 'Shuffle'}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p className="text-xs sm:text-sm text-[#5C6478]">
          {isFr ? (
            <>
              Touchez chaque mot qui contient une forme de la lettre{' '}
              <strong className="font-amh text-[#3E6650] text-base">{fidel.base}</strong> ({' '}
              {fidel.forms.join(' ')} ) :
            </>
          ) : (
            <>
              Tap each word containing any form of the letter{' '}
              <strong className="font-amh text-[#3E6650] text-base">{fidel.base}</strong> ({' '}
              {fidel.forms.join(' ')} ) :
            </>
          )}
        </p>

        <div className="text-xs font-semibold text-[#3E6650] bg-[#EAF2EC] px-2.5 py-1 rounded-full border border-[#3E6650]/30 flex items-center gap-1">
          <Target className="w-3.5 h-3.5 text-[#C4881F]" />
          <span>
            {isFr
              ? `${foundTargets} / ${totalTargets} trouvés`
              : `${foundTargets} / ${totalTargets} found`}
          </span>
        </div>
      </div>

      {/* Grid of Hunt words */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3 p-3.5 bg-white/60 border border-[#CFC3A6] rounded-xl mb-3">
        {huntWords.map((item, index) => {
          const isCircled = circledSet.has(index);
          const isTarget = item.isTarget;

          let cardStyle = 'bg-white border-[#CFC3A6] text-[#28324A] hover:border-[#C4881F]';

          if (showKey) {
            if (isTarget) {
              cardStyle = 'bg-[#EAF2EC] border-[#3E6650] text-[#3E6650] font-bold ring-2 ring-[#3E6650]/30';
            } else {
              cardStyle = 'bg-gray-100/60 border-gray-200 text-[#5C6478] opacity-50';
            }
          } else if (isCircled) {
            cardStyle = 'bg-[#F9EAE8] border-[#A83A28] text-[#A83A28] font-bold ring-2 ring-[#A83A28]/40 shadow-xs';
          }

          return (
            <button
              key={`${item.word}-${index}`}
              id={`hunt-word-${index}`}
              onClick={() => handleChipClick(item.word, index)}
              className={`h-14 sm:h-16 px-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${cardStyle}`}
            >
              <span className="font-amh text-lg sm:text-xl font-bold leading-tight">
                {item.word}
              </span>
              <span className="text-[10px] text-[#5C6478] truncate max-w-full px-1">
                {isFr ? item.fr : item.en}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-[#5C6478] flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-[#C4881F]" />
          {isFr
            ? 'Touchez pour entourer et écouter.'
            : 'Tap to circle and hear pronunciation.'}
        </span>
        {foundTargets === totalTargets && totalTargets > 0 && (
          <span className="text-[#3E6650] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            {isFr ? 'Tous les mots trouvés !' : 'All targets found!'}
          </span>
        )}
      </div>
    </section>
  );
};
