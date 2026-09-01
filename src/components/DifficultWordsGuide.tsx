import React, { useState } from 'react';
import { DifficultWordItem, Language } from '../types';
import { DIFFICULT_WORDS } from '../data/sentenceData';
import { speechService } from '../services/speechService';
import { 
  Volume2, 
  HelpCircle, 
  Sparkles, 
  Ear, 
  Mic2, 
  BookOpen, 
  Layers,
  ArrowRight,
  Flame
} from 'lucide-react';

interface DifficultWordsGuideProps {
  lang: Language;
}

export const DifficultWordsGuide: React.FC<DifficultWordsGuideProps> = ({ lang }) => {
  const [selectedWordId, setSelectedWordId] = useState<string>(DIFFICULT_WORDS[0].id);

  const isFr = lang === 'fr';

  const selectedItem = DIFFICULT_WORDS.find((w) => w.id === selectedWordId) || DIFFICULT_WORDS[0];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#A83A28]/15 rounded-lg text-[#A83A28]">
              <Flame className="w-5 h-5" />
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#28324A]">
              {isFr ? 'Mots Difficiles & Secrets de Prononciation' : 'Difficult Words & Pronunciation Keys'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C6478] mt-1">
            {isFr
              ? 'Démystifiez les 5 consonnes éjectives explosives (ጠ, ጨ, ቀ, ጰ, ጸ), le redoublement consonantique (Təbəq) et les homophones.'
              : 'Demystify the 5 explosive ejective consonants (ጠ, ጨ, ቀ, ጰ, ጸ), consonant gemination (Təbəq), and subtle homophones with audio comparisons.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DIFFICULT_WORDS.map((item) => {
          const isSelected = item.id === selectedItem.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedWordId(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                isSelected
                  ? 'bg-[#A83A28] text-white border-[#A83A28] shadow-xs'
                  : 'bg-white text-[#28324A] border-[#CFC3A6] hover:border-[#A83A28]'
              }`}
            >
              {isFr ? item.categoryLabelFr : item.categoryLabelEn}
            </button>
          );
        })}
      </div>

      {/* Main Focus Detail Card */}
      <div className="bg-[#FAF6EC] border-2 border-[#CFC3A6] rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
        {/* Header */}
        <div className="border-b border-[#CFC3A6] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#A83A28]/15 text-[#A83A28] border border-[#A83A28]/30">
              {isFr ? selectedItem.categoryLabelFr : selectedItem.categoryLabelEn}
            </span>
            <h3 className="font-ethiopic text-2xl sm:text-3xl font-bold text-[#28324A] mt-1">
              {selectedItem.amharic}
            </h3>
            <p className="font-cinzel text-sm sm:text-base font-semibold text-[#5C6478]">
              {isFr ? selectedItem.fr : selectedItem.en}
            </p>
          </div>

          <button
            onClick={() => speechService.speak(selectedItem.sampleSentence?.amharic || selectedItem.amharic)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#3E6650] text-white rounded-xl text-xs font-bold hover:bg-[#325240] transition shadow-xs self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isFr ? 'Écouter l’exemple' : 'Play Audio Demo'}</span>
          </button>
        </div>

        {/* Phonetic Master Tip Box */}
        <div className="bg-white rounded-xl p-4 border-2 border-[#C4881F]/40 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C4881F] uppercase tracking-wider">
            <Ear className="w-4 h-4" />
            <span>{isFr ? 'Secret de Prononciation & Articulation' : 'Phonetic Articulation Secret'}</span>
          </div>
          <div className="text-sm font-semibold text-[#28324A] bg-[#FAF6EC] p-3 rounded-lg border border-[#CFC3A6]/80 flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>{selectedItem.phoneticTip}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5C6478] leading-relaxed pt-1">
            {isFr ? selectedItem.explanationFr : selectedItem.explanationEn}
          </p>
        </div>

        {/* Comparison / Minimal Pair Studio */}
        {selectedItem.comparison && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">
              {isFr ? 'Comparaison Côte à Côte (Écoutez la différence)' : 'Side-by-Side Audio Comparison (Listen closely)'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Word 1 */}
              <div className="bg-white rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 transition space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                    {isFr ? 'Option A' : 'Word 1'}
                  </span>
                  <button
                    onClick={() => speechService.speak(selectedItem.comparison!.word1.amharic)}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-ethiopic text-3xl font-bold text-[#28324A]">
                  {selectedItem.comparison.word1.amharic}
                </div>
                <div className="text-xs italic text-[#5C6478]">
                  🗣️ {selectedItem.comparison.word1.translit}
                </div>
                <div className="text-xs font-bold text-[#28324A]">
                  🎯 {isFr ? selectedItem.comparison.word1.meaningFr : selectedItem.comparison.word1.meaningEn}
                </div>
                <div className="text-[11px] text-[#5C6478] bg-blue-50/50 p-2 rounded-md">
                  {selectedItem.comparison.word1.note}
                </div>
              </div>

              {/* Word 2 */}
              <div className="bg-white rounded-xl p-4 border-2 border-amber-200 hover:border-amber-400 transition space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
                    {isFr ? 'Option B' : 'Word 2'}
                  </span>
                  <button
                    onClick={() => speechService.speak(selectedItem.comparison!.word2.amharic)}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-ethiopic text-3xl font-bold text-[#28324A]">
                  {selectedItem.comparison.word2.amharic}
                </div>
                <div className="text-xs italic text-[#5C6478]">
                  🗣️ {selectedItem.comparison.word2.translit}
                </div>
                <div className="text-xs font-bold text-[#28324A]">
                  🎯 {isFr ? selectedItem.comparison.word2.meaningFr : selectedItem.comparison.word2.meaningEn}
                </div>
                <div className="text-[11px] text-[#5C6478] bg-amber-50/50 p-2 rounded-md">
                  {selectedItem.comparison.word2.note}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Context Sentence */}
        {selectedItem.sampleSentence && (
          <div className="bg-white rounded-xl p-4 border border-[#CFC3A6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5C6478] uppercase tracking-wider">
                {isFr ? 'Phrase d’Exemple en Contexte' : 'Contextual Example Sentence'}
              </span>
              <button
                onClick={() => speechService.speak(selectedItem.sampleSentence!.amharic)}
                className="p-1.5 rounded-lg bg-[#3E6650]/10 hover:bg-[#3E6650] hover:text-white text-[#3E6650] transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="font-ethiopic text-xl font-bold text-[#28324A]">
              {selectedItem.sampleSentence.amharic}
            </div>
            <div className="text-xs italic text-[#5C6478]">
              {selectedItem.sampleSentence.translit}
            </div>
            <div className="text-xs font-medium text-[#28324A]">
              {isFr ? selectedItem.sampleSentence.fr : selectedItem.sampleSentence.en}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
