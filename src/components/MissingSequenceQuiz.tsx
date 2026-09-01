import React, { useState, useEffect } from 'react';
import { Check, RotateCcw, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FidelFamily, Language } from '../types';
import { speechService } from '../services/speechService';

interface MissingSequenceQuizProps {
  fidel: FidelFamily;
  missingIdx: number;
  showKey: boolean;
  lang: Language;
  onRefresh: () => void;
}

export const MissingSequenceQuiz: React.FC<MissingSequenceQuizProps> = ({
  fidel,
  missingIdx,
  showKey,
  lang,
  onRefresh,
}) => {
  const isFr = lang === 'fr';
  const correctLetter = fidel.forms[missingIdx];

  const [inputVal, setInputVal] = useState<string>('');
  const [verdict, setVerdict] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    setInputVal('');
    setVerdict('idle');
  }, [fidel.base, missingIdx]);

  useEffect(() => {
    if (showKey) {
      setInputVal(correctLetter);
      setVerdict('correct');
    }
  }, [showKey, correctLetter]);

  const handleCheck = () => {
    if (!inputVal.trim()) return;
    if (inputVal.trim() === correctLetter) {
      setVerdict('correct');
      speechService.speak(correctLetter);
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
    } else {
      setVerdict('wrong');
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(80);
        } catch {
          // ignore
        }
      }
    }
  };

  const handleChipSelect = (letter: string) => {
    setInputVal(letter);
    setVerdict('idle');
    speechService.speak(letter);
  };

  // Generate options for easy mobile tap
  const optionCandidates = React.useMemo(() => {
    const list = [...fidel.forms];
    return list.sort(() => Math.random() - 0.5);
  }, [fidel.base, missingIdx]);

  return (
    <section id="section-sequence-quiz" className="mb-8">
      <div className="flex items-center justify-between border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
        <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
          <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">2.</span>
          <span>{isFr ? 'Séquence manquante' : 'Missing Sequence Form'}</span>
        </h2>
        <button
          onClick={onRefresh}
          className="text-xs text-[#5C6478] hover:text-[#28324A] flex items-center gap-1 px-2 py-1 bg-white/60 hover:bg-[#EAD9AF] rounded-md border border-[#CFC3A6] transition-colors"
          title={isFr ? 'Autre lettre manquante' : 'New random blank'}
        >
          <RotateCcw className="w-3 h-3 text-[#C4881F]" />
          <span>{isFr ? 'Aléatoire' : 'Randomize'}</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-[#5C6478] mb-4">
        {isFr
          ? 'Trouvez et inscrivez la forme manquante de la série dans la case dorée (touchez les suggestions ci-dessous ou tapez la lettre) :'
          : 'Find the missing form in the sequence and fill in the blank (tap one of the quick suggestions or type):'}
      </p>

      {/* 7 forms sequence line */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 bg-white/60 border border-[#CFC3A6] rounded-xl mb-4">
        {fidel.forms.map((form, idx) => {
          if (idx === missingIdx) {
            return (
              <div key={idx} className="flex flex-col items-center">
                <input
                  id="seq-quiz-input"
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setVerdict('idle');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheck();
                  }}
                  placeholder="?"
                  maxLength={2}
                  className={`w-12 h-12 sm:w-14 sm:h-14 text-center font-amh text-xl sm:text-2xl font-bold rounded-xl border-2 outline-none transition-all shadow-inner ${
                    verdict === 'correct'
                      ? 'border-[#3E6650] bg-[#EAF2EC] text-[#3E6650]'
                      : verdict === 'wrong'
                      ? 'border-[#A83A28] bg-[#F9EAE8] text-[#A83A28]'
                      : 'border-dashed border-[#C4881F] bg-[#EAD9AF]/60 text-[#28324A] focus:ring-2 focus:ring-[#C4881F]'
                  }`}
                  aria-label={isFr ? 'Forme manquante' : 'Missing form'}
                />
                <span className="text-[10px] font-serif text-[#C4881F] mt-1">
                  Ordre {idx + 1}
                </span>
              </div>
            );
          }

          return (
            <div key={idx} className="flex flex-col items-center">
              <button
                onClick={() => speechService.speak(form)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-[#CFC3A6] flex items-center justify-center font-amh text-xl sm:text-2xl font-bold text-[#28324A] hover:border-[#C4881F] hover:bg-[#F7F1E4] active:scale-95 transition-all shadow-xs"
                title={isFr ? `Écouter ${form}` : `Listen to ${form}`}
              >
                {form}
              </button>
              <span className="text-[10px] font-serif text-[#5C6478] mt-1">
                {idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Mobile Suggestion Chips (Essential for phone users without Amharic keyboard) */}
      <div className="mb-4 bg-[#EDE3CC]/60 p-3 rounded-lg border border-[#CFC3A6]/60">
        <div className="text-xs font-semibold text-[#5C6478] mb-2 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#C4881F]" />
          <span>{isFr ? 'Choix rapide (sur téléphone) :' : 'Quick Choice (on phone):'}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {optionCandidates.map((letter) => (
            <button
              key={letter}
              onClick={() => handleChipSelect(letter)}
              className={`min-w-[42px] h-10 px-3 rounded-lg font-amh text-lg font-bold border transition-all flex items-center justify-center shadow-xs ${
                inputVal === letter
                  ? 'bg-[#3E6650] text-white border-[#3E6650] scale-105'
                  : 'bg-white text-[#28324A] border-[#CFC3A6] hover:bg-[#F7F1E4] active:bg-[#EAD9AF]'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Check & Verdict Row */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          id="check-seq-btn"
          onClick={handleCheck}
          disabled={!inputVal.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#28324A] disabled:opacity-40 text-[#F7F1E4] rounded-lg text-sm font-semibold hover:bg-[#1d2435] active:scale-95 transition-all shadow-xs"
        >
          <Check className="w-4 h-4" />
          <span>{isFr ? 'Vérifier la réponse' : 'Check answer'}</span>
        </button>

        {/* Verdict messages */}
        {verdict === 'correct' && (
          <div className="flex items-center gap-2 text-sm font-bold text-[#3E6650] animate-in fade-in">
            <Sparkles className="w-4 h-4 text-[#C4881F]" />
            <span>
              {isFr
                ? `Excellent ! C'est bien "${correctLetter}".`
                : `Correct! It is "${correctLetter}".`}
            </span>
          </div>
        )}

        {verdict === 'wrong' && (
          <div className="flex items-center gap-2 text-sm font-semibold text-[#A83A28] animate-in fade-in">
            <span>
              {isFr
                ? `Pas tout à fait — cherchez la forme d'ordre ${missingIdx + 1}.`
                : `Not quite — look for the order ${missingIdx + 1} form.`}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
