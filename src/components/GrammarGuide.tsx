import React, { useState } from 'react';
import { GrammarRule, Language } from '../types';
import { GRAMMAR_RULES } from '../data/sentenceData';
import { speechService } from '../services/speechService';
import { 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Lightbulb, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface GrammarGuideProps {
  lang: Language;
}

export const GrammarGuide: React.FC<GrammarGuideProps> = ({ lang }) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(GRAMMAR_RULES[0].id);
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<{ [ruleId: string]: number | null }>({});

  const isFr = lang === 'fr';

  const selectedRule = GRAMMAR_RULES.find((r) => r.id === selectedRuleId) || GRAMMAR_RULES[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#3E6650]/15 rounded-lg text-[#3E6650]">
              <Lightbulb className="w-5 h-5" />
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#28324A]">
              {isFr ? 'Guide & Règles de Grammaire Amharique' : 'Amharic Grammar Rules & Tips'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C6478] mt-1">
            {isFr
              ? 'Découvrez les règles d’or de l’amharique : ordre SOV, accord des adjectifs, articles définis suffixes et conjugaison des verbes.'
              : 'Master the core rules of Amharic grammar: SOV word order, adjective-noun placement, definite article suffixes, accusative -n, and verb inflection.'}
          </p>
        </div>
      </div>

      {/* Rules Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GRAMMAR_RULES.map((rule, idx) => {
          const isSelected = rule.id === selectedRule.id;
          return (
            <button
              key={rule.id}
              onClick={() => setSelectedRuleId(rule.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#3E6650] text-white border-[#3E6650] shadow-xs'
                  : 'bg-white text-[#28324A] border-[#CFC3A6] hover:border-[#3E6650]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                isSelected ? 'bg-white/20 text-white' : 'bg-[#EDE3CC] text-[#5C6478]'
              }`}>
                {idx + 1}
              </span>
              <span>{isFr ? rule.titleFr : rule.titleEn}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Rule Card */}
      <div className="bg-[#FAF6EC] border-2 border-[#CFC3A6] rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
        {/* Rule Title Header */}
        <div className="border-b border-[#CFC3A6] pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C4881F]/15 text-[#C4881F] border border-[#C4881F]/30">
              {selectedRule.badge}
            </span>
          </div>
          <h3 className="font-ethiopic text-2xl sm:text-3xl font-bold text-[#28324A]">
            {selectedRule.titleAm}
          </h3>
          <p className="font-cinzel text-sm sm:text-base font-semibold text-[#3E6650] mt-0.5">
            {isFr ? selectedRule.titleFr : selectedRule.titleEn}
          </p>
        </div>

        {/* Formula / Golden Pattern Box */}
        <div className="bg-white rounded-xl p-4 border-2 border-[#C4881F]/50 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C4881F] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{isFr ? 'Formule Syntaxique' : 'Grammar Formula'}</span>
          </div>
          <div className="font-mono text-sm sm:text-base font-extrabold text-[#28324A] bg-[#FAF6EC] p-3 rounded-lg border border-[#CFC3A6]">
            {selectedRule.formula}
          </div>
          <p className="text-xs sm:text-sm text-[#5C6478] leading-relaxed pt-1">
            {isFr ? selectedRule.explanationFr : selectedRule.explanationEn}
          </p>
        </div>

        {/* Live Audio Examples */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">
            {isFr ? 'Exemples Pratiques avec Prononciation' : 'Practical Examples with Audio'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedRule.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-[#CFC3A6] hover:border-[#3E6650] transition space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-ethiopic text-xl font-bold text-[#28324A]">
                    {ex.amharic}
                  </div>
                  <button
                    onClick={() => speechService.speak(ex.amharic.split('→')[0])}
                    className="p-1.5 rounded-lg bg-[#3E6650]/10 hover:bg-[#3E6650] hover:text-white text-[#3E6650] transition"
                    title={isFr ? 'Écouter' : 'Play audio'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs italic text-[#5C6478]">
                  🗣️ {ex.translit}
                </div>

                <div className="text-xs font-medium text-[#28324A]">
                  🎯 {isFr ? ex.fr : ex.en}
                </div>

                {ex.breakdown && (
                  <div className="text-[11px] font-mono text-[#3E6650] bg-[#3E6650]/5 p-2 rounded-md border border-[#3E6650]/20">
                    {ex.breakdown}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pitfalls & Common Mistakes */}
        <div className="bg-[#A83A28]/5 border border-[#A83A28]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#A83A28]">
            <AlertTriangle className="w-4 h-4" />
            <span>{isFr ? 'Erreurs Fréquentes & Pièges à Éviter' : 'Common Pitfalls & Pro Tips'}</span>
          </div>
          <ul className="space-y-1 text-xs text-[#28324A]">
            {(isFr ? selectedRule.pitfallsFr : selectedRule.pitfallsEn).map((pitfall, pIdx) => (
              <li key={pIdx} className="leading-relaxed flex items-start gap-1.5">
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
