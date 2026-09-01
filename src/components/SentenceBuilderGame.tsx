import React, { useState } from 'react';
import { SentencePuzzle, Language, PartOfSpeech } from '../types';
import { SENTENCE_PUZZLES, NOUN_CATALOG, ADJECTIVE_CATALOG, VERB_CATALOG } from '../data/sentenceData';
import { speechService } from '../services/speechService';
import { 
  Puzzle, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Plus, 
  ArrowRight,
  Layers
} from 'lucide-react';

interface SentenceBuilderGameProps {
  lang: Language;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'puzzle' | 'composer'>('puzzle');
  
  // Puzzle State
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(SENTENCE_PUZZLES[0].scrambledWords);
  const [isCheckSuccess, setIsCheckSuccess] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Composer State
  const [chosenAdj, setChosenAdj] = useState(ADJECTIVE_CATALOG[0]);
  const [chosenNoun, setChosenNoun] = useState(NOUN_CATALOG[0]);
  const [chosenVerb, setChosenVerb] = useState(VERB_CATALOG[0]);

  const isFr = lang === 'fr';

  const puzzle = SENTENCE_PUZZLES[currentPuzzleIdx];

  const handleSelectWord = (word: string) => {
    setCurrentOrder((prev) => [...prev, word]);
    setAvailableWords((prev) => {
      const idx = prev.indexOf(word);
      if (idx > -1) {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      return prev;
    });
    setIsCheckSuccess(null);
    speechService.speak(word);
  };

  const handleRemoveWord = (word: string, index: number) => {
    setCurrentOrder((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
    setIsCheckSuccess(null);
  };

  const handleCheckOrder = () => {
    const cleanCurrent = currentOrder.join(' ').replace(/[።.]/g, '').trim();
    const cleanTarget = puzzle.correctOrder.join(' ').replace(/[።.]/g, '').trim();
    const success = cleanCurrent === cleanTarget;
    setIsCheckSuccess(success);
    if (success) {
      speechService.speak(puzzle.targetSentenceAm);
    }
  };

  const handleResetPuzzle = () => {
    setCurrentOrder([]);
    setAvailableWords(puzzle.scrambledWords);
    setIsCheckSuccess(null);
    setShowHint(false);
  };

  const handleNextPuzzle = () => {
    const nextIdx = (currentPuzzleIdx + 1) % SENTENCE_PUZZLES.length;
    setCurrentPuzzleIdx(nextIdx);
    setCurrentOrder([]);
    setAvailableWords(SENTENCE_PUZZLES[nextIdx].scrambledWords);
    setIsCheckSuccess(null);
    setShowHint(false);
  };

  // Synthesized composed sentence
  const composedAmharic = `${chosenAdj.amharic} ${chosenNoun.amharic} ${chosenVerb.amharic}።`;
  const composedTranslit = `${chosenAdj.translit} ${chosenNoun.translit} ${chosenVerb.translit}.`;
  const composedEn = `${chosenAdj.en} ${chosenNoun.en} ${chosenVerb.en}.`;
  const composedFr = `${chosenAdj.fr} ${chosenNoun.fr} ${chosenVerb.fr}.`;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#3E6650]/15 rounded-lg text-[#3E6650]">
              <Puzzle className="w-5 h-5" />
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#28324A]">
              {isFr ? 'Atelier & Jeu de Construction de Phrases' : 'Sentence Builder Challenge'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C6478] mt-1">
            {isFr
              ? 'Pratiquez l’ordre des mots SOV en assemblant des phrases mélangées ou composez vos propres combinaisons d’adjectifs, noms et verbes.'
              : 'Master Amharic SOV sentence order by unscrambling sentence tiles or synthesizing your own custom combinations.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-[#EDE3CC] p-1 rounded-xl border border-[#CFC3A6]">
          <button
            onClick={() => setActiveTab('puzzle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'puzzle'
                ? 'bg-white text-[#28324A] shadow-xs'
                : 'text-[#5C6478] hover:text-[#28324A]'
            }`}
          >
            {isFr ? '1. Casse-tête SOV' : '1. SOV Puzzle'}
          </button>
          <button
            onClick={() => setActiveTab('composer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'composer'
                ? 'bg-white text-[#28324A] shadow-xs'
                : 'text-[#5C6478] hover:text-[#28324A]'
            }`}
          >
            {isFr ? '2. Studio Créatif' : '2. Sentence Studio'}
          </button>
        </div>
      </div>

      {activeTab === 'puzzle' ? (
        /* Puzzle Mode */
        <div className="bg-[#FAF6EC] border-2 border-[#CFC3A6] rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#CFC3A6] pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C4881F]">
                {isFr ? `Défi ${currentPuzzleIdx + 1} sur ${SENTENCE_PUZZLES.length}` : `Challenge ${currentPuzzleIdx + 1} of ${SENTENCE_PUZZLES.length}`}
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#28324A]">
                {isFr ? 'Reconstituez la Phrase Amharique' : 'Unscramble into Valid SOV Order'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#CFC3A6] rounded-xl text-xs font-semibold text-[#5C6478] hover:border-[#C4881F] transition"
              >
                <HelpCircle className="w-4 h-4 text-[#C4881F]" />
                <span>{isFr ? 'Indice' : 'Hint'}</span>
              </button>
              <button
                onClick={handleResetPuzzle}
                className="p-1.5 bg-white border border-[#CFC3A6] rounded-xl text-[#5C6478] hover:border-[#A83A28] transition"
                title={isFr ? 'Réinitialiser' : 'Reset'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Meaning Clue */}
          <div className="bg-white rounded-xl p-4 border border-[#CFC3A6] space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
              {isFr ? 'Traduction cible à former :' : 'Target Translation to construct:'}
            </div>
            <div className="text-base sm:text-lg font-bold text-[#28324A]">
              🎯 {isFr ? puzzle.fr : puzzle.en}
            </div>
            <div className="text-xs italic text-[#5C6478]">
              🗣️ {puzzle.translit}
            </div>
          </div>

          {/* Hint Dropdown */}
          {showHint && (
            <div className="bg-[#C4881F]/10 border border-[#C4881F]/30 rounded-xl p-3 text-xs text-[#28324A] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#C4881F] shrink-0 mt-0.5" />
              <span>{isFr ? puzzle.hintFr : puzzle.hintEn}</span>
            </div>
          )}

          {/* Construction Slot */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">
              {isFr ? 'Votre phrase ordonnée (Touchez pour retirer) :' : 'Your Ordered Sentence (Tap to remove):'}
            </div>
            <div className="min-h-[70px] bg-white rounded-2xl border-2 border-dashed border-[#CFC3A6] p-3 flex flex-wrap items-center gap-2">
              {currentOrder.length === 0 ? (
                <span className="text-xs italic text-[#8A93A6]">
                  {isFr ? 'Touchez les mots ci-dessous dans le bon ordre (Sujet → Objet → Verbe)' : 'Tap the word tiles below in proper Amharic SOV order'}
                </span>
              ) : (
                currentOrder.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveWord(word, idx)}
                    className="px-3 py-1.5 rounded-xl font-ethiopic text-xl font-bold bg-[#3E6650] text-white hover:bg-[#A83A28] transition shadow-xs flex items-center gap-1.5 group"
                  >
                    <span>{word}</span>
                    <span className="text-[10px] opacity-70 group-hover:opacity-100">✕</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Available Word Tiles */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">
              {isFr ? 'Mots à choisir :' : 'Available Word Tiles:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectWord(word)}
                  className="px-4 py-2 rounded-xl font-ethiopic text-2xl font-bold bg-white text-[#28324A] border-2 border-[#CFC3A6] hover:border-[#C4881F] hover:bg-[#FAF6EC] transition shadow-xs"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#CFC3A6]">
            <div>
              {isCheckSuccess === true && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3E6650] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isFr ? 'Bravo ! La phrase respecte parfaitement l’ordre SOV !' : 'Excellent! Grammatically sound SOV syntax!'}</span>
                </div>
              )}
              {isCheckSuccess === false && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A83A28] bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-300">
                  <XCircle className="w-5 h-5" />
                  <span>{isFr ? 'Pas tout à fait. Vérifiez la place de l’adjectif et du verbe !' : 'Not quite. Check adjective and verb positions!'}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCheckOrder}
                disabled={currentOrder.length === 0}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#C4881F] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#a87418] disabled:opacity-50 transition shadow-xs"
              >
                {isFr ? 'Vérifier la phrase' : 'Verify Syntax'}
              </button>
              <button
                onClick={handleNextPuzzle}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#3E6650] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#325240] transition shadow-xs flex items-center gap-1.5"
              >
                <span>{isFr ? 'Suivant' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Composer Mode */
        <div className="bg-[#FAF6EC] border-2 border-[#CFC3A6] rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-[#CFC3A6] pb-3">
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#28324A]">
              {isFr ? 'Studio de Composition de Phrases' : 'Amharic Sentence Composer Studio'}
            </h3>
            <p className="text-xs text-[#5C6478]">
              {isFr
                ? 'Sélectionnez un Adjectif (ቅጽል), un Nom (ስም) et un Verbe (ግሥ) pour générer automatiquement une phrase correcte avec prononciation !'
                : 'Select an Adjective (ቅጽል), a Noun (ስም), and a Verb (ግሥ) to synthesize a valid sentence with audio!'}
            </p>
          </div>

          {/* 3 Component Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Adjective Picker */}
            <div className="bg-white rounded-xl p-4 border border-emerald-300 space-y-2">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
                <span>1. {isFr ? 'Adjectif (ቅጽል)' : 'Adjective (ቅጽል)'}</span>
                <span className="text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md">1er</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {ADJECTIVE_CATALOG.map((adj) => (
                  <button
                    key={adj.amharic}
                    onClick={() => {
                      setChosenAdj(adj);
                      speechService.speak(adj.amharic);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition flex items-center justify-between border ${
                      chosenAdj.amharic === adj.amharic
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold'
                        : 'bg-white text-[#28324A] border-gray-100 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-ethiopic text-base font-bold">{adj.amharic}</span>
                    <span className="text-[11px] text-[#5C6478]">({isFr ? adj.fr : adj.en})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Noun Picker */}
            <div className="bg-white rounded-xl p-4 border border-blue-300 space-y-2">
              <div className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center justify-between">
                <span>2. {isFr ? 'Nom (ስም)' : 'Noun (ስም)'}</span>
                <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded-md">2e</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {NOUN_CATALOG.map((noun) => (
                  <button
                    key={noun.amharic}
                    onClick={() => {
                      setChosenNoun(noun);
                      speechService.speak(noun.amharic);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition flex items-center justify-between border ${
                      chosenNoun.amharic === noun.amharic
                        ? 'bg-blue-50 text-blue-900 border-blue-500 font-bold'
                        : 'bg-white text-[#28324A] border-gray-100 hover:border-blue-300'
                    }`}
                  >
                    <span className="font-ethiopic text-base font-bold">{noun.amharic}</span>
                    <span className="text-[11px] text-[#5C6478]">({isFr ? noun.fr : noun.en})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Verb Picker */}
            <div className="bg-white rounded-xl p-4 border border-amber-300 space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center justify-between">
                <span>3. {isFr ? 'Verbe (ግሥ)' : 'Verb (ግሥ)'}</span>
                <span className="text-[10px] bg-amber-50 px-2 py-0.5 rounded-md">3e (Fin)</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {VERB_CATALOG.map((verb) => (
                  <button
                    key={verb.amharic}
                    onClick={() => {
                      setChosenVerb(verb);
                      speechService.speak(verb.amharic);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition flex items-center justify-between border ${
                      chosenVerb.amharic === verb.amharic
                        ? 'bg-amber-50 text-amber-900 border-amber-500 font-bold'
                        : 'bg-white text-[#28324A] border-gray-100 hover:border-amber-300'
                    }`}
                  >
                    <span className="font-ethiopic text-base font-bold">{verb.amharic}</span>
                    <span className="text-[11px] text-[#5C6478]">({isFr ? verb.fr : verb.en})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Synthesized Live Sentence Card */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#C4881F] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#C4881F] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{isFr ? 'Phrase Générée en direct :' : 'Synthesized Live Sentence:'}</span>
              </div>
              <button
                onClick={() => speechService.speak(composedAmharic)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3E6650] text-white rounded-xl text-xs font-bold hover:bg-[#325240] transition shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isFr ? 'Écouter' : 'Play Audio'}</span>
              </button>
            </div>

            <div className="font-ethiopic text-2xl sm:text-3xl font-bold text-[#28324A] leading-relaxed">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg mr-2">
                {chosenAdj.amharic}
              </span>
              <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg mr-2">
                {chosenNoun.amharic}
              </span>
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg">
                {chosenVerb.amharic}።
              </span>
            </div>

            <div className="text-xs italic text-[#5C6478]">
              🗣️ {composedTranslit}
            </div>

            <div className="text-sm font-semibold text-[#28324A]">
              🎯 {isFr ? composedFr : composedEn}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
