import React, { useState, useEffect } from 'react';
import { FidelFamily, Language } from '../types';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

interface MissingSequenceQuizProps {
  fidel: FidelFamily;
  lang: Language;
  missingIndex: number;
  onRefresh: () => void;
  showKey: boolean;
}

export const MissingSequenceQuiz: React.FC<MissingSequenceQuizProps> = ({
  fidel,
  lang,
  missingIndex,
  onRefresh,
  showKey,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [verdict, setVerdict] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const isFr = lang === 'fr';
  const correctLetter = fidel.forms[missingIndex];

  // Scrambled quick options for quick mobile tap
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setInputVal('');
    setVerdict('idle');
    const shuffled = [...fidel.forms].sort(() => 0.5 - Math.random());
    setOptions(shuffled);
  }, [fidel.base, missingIndex]);

  useEffect(() => {
    if (showKey) {
      setInputVal(correctLetter);
      setVerdict('correct');
    }
  }, [showKey, correctLetter]);

  const handleCheck = () => {
    if (inputVal.trim() === correctLetter) {
      setVerdict('correct');
      speechService.speak(correctLetter);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (_) {}
    } else {
      setVerdict('wrong');
    }
  };

  const handleSelectOption = (letter: string) => {
    setInputVal(letter);
    setVerdict('idle');
    speechService.speak(letter);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-base font-bold text-[#28324A] flex items-center gap-2">
          <span className="text-[#C4881F]">2.</span>
          <span>{isFr ? 'Séquence manquante' : 'Missing Sequence Form'}</span>
        </h3>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 text-xs text-[#5C6478] hover:text-[#C4881F] bg-white/80 border border-[#CFC3A6] px-2.5 py-1 rounded-lg transition shadow-2xs"
          title="Nouvelle case manquante"
        >
          <RefreshCw className="w-3 h-3 text-[#C4881F]" />
          <span>{isFr ? 'Aléatoire' : 'Randomize'}</span>
        </button>
      </div>

      <p className="text-xs text-[#5C6478] leading-relaxed">
        {isFr
          ? 'Trouvez et inscrivez la forme manquante de la série dans la case dorée :'
          : 'Find the missing form in the sequence and fill in the blank:'}
      </p>

      {/* 7-Box Sequence Card */}
      <div className="bg-white/90 border border-[#CFC3A6] rounded-xl p-3 shadow-xs">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
          {fidel.forms.map((form, index) => {
            const isMissing = index === missingIndex;
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                {isMissing ? (
                  <div
                    className={`w-full aspect-square max-w-[48px] rounded-xl border-2 flex items-center justify-center font-ethiopic text-2xl font-bold transition shadow-xs ${
                      verdict === 'correct'
                        ? 'border-[#3E6650] bg-[#3E6650]/10 text-[#3E6650]'
                        : verdict === 'wrong'
                        ? 'border-[#A83A28] bg-[#A83A28]/10 text-[#A83A28]'
                        : 'border-[#C4881F] bg-[#C4881F]/10 text-[#28324A] animate-pulse'
                    }`}
                  >
                    {inputVal || '?'}
                  </div>
                ) : (
                  <button
                    onClick={() => speechService.speak(form)}
                    className="w-full aspect-square max-w-[48px] rounded-xl border border-[#CFC3A6] bg-[#EDE3CC]/30 flex items-center justify-center font-ethiopic text-xl sm:text-2xl font-bold text-[#28324A] hover:border-[#C4881F] transition"
                  >
                    {form}
                  </button>
                )}
                <span className="text-[10px] font-cinzel font-bold text-[#8A93A6]">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Choices on phone/tablet */}
      <div className="bg-[#EDE3CC]/40 border border-[#CFC3A6]/70 rounded-xl p-2.5 space-y-2">
        <div className="text-[11px] font-semibold text-[#5C6478]">
          {isFr ? 'Choix rapide (sur mobile) :' : 'Quick choices (on phone):'}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelectOption(opt)}
              className={`font-ethiopic text-xl font-bold px-3 py-1 rounded-lg border transition shadow-2xs ${
                inputVal === opt
                  ? 'bg-[#3E6650] text-white border-[#3E6650]'
                  : 'bg-white text-[#28324A] border-[#CFC3A6] hover:border-[#C4881F]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Actions & Verification */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCheck}
          disabled={!inputVal}
          className="px-4 py-2 bg-[#28324A] text-white disabled:opacity-40 hover:bg-[#1f273a] text-xs font-semibold rounded-xl transition shadow-xs"
        >
          {isFr ? 'Vérifier la réponse' : 'Check answer'}
        </button>

        {verdict === 'correct' && (
          <div className="flex items-center gap-1 text-xs font-bold text-[#3E6650]">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isFr ? `Bravo ! C'est bien "${correctLetter}".` : `Correct! It is "${correctLetter}".`}</span>
          </div>
        )}

        {verdict === 'wrong' && (
          <div className="flex items-center gap-1 text-xs font-semibold text-[#A83A28]">
            <AlertCircle className="w-4 h-4" />
            <span>{isFr ? `Pas tout à fait — ordre ${missingIndex + 1}.` : `Not quite — check order ${missingIndex + 1}.`}</span>
          </div>
        )}
      </div>
    </div>
  );
};
