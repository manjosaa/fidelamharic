import React, { useState } from 'react';
import { AmharicSentence, Language, PartOfSpeech } from '../types';
import { AMHARIC_SENTENCES } from '../data/sentenceData';
import { speechService } from '../services/speechService';
import { 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Filter, 
  ChevronRight, 
  Info, 
  Search,
  Tag,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface SentenceExplorerProps {
  lang: Language;
}

export const SentenceExplorer: React.FC<SentenceExplorerProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(AMHARIC_SENTENCES[0].id);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);

  const isFr = lang === 'fr';

  const getPosBadgeColor = (pos: PartOfSpeech) => {
    switch (pos) {
      case 'noun':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200';
      case 'adjective':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200';
      case 'verb':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200';
      case 'particle':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-200';
      case 'adverb':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPosLabel = (pos: PartOfSpeech) => {
    switch (pos) {
      case 'noun':
        return isFr ? 'Nom (ስም)' : 'Noun (ስም)';
      case 'adjective':
        return isFr ? 'Adjectif (ቅጽል)' : 'Adjective (ቅጽል)';
      case 'verb':
        return isFr ? 'Verbe (ግሥ)' : 'Verb (ግሥ)';
      case 'particle':
        return isFr ? 'Préposition / Particule' : 'Preposition / Particle';
      case 'adverb':
        return isFr ? 'Adverbe (ተውሳክ)' : 'Adverb';
      default:
        return pos;
    }
  };

  const filteredSentences = AMHARIC_SENTENCES.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;
    const matchesSearch = 
      searchQuery.trim() === '' ||
      s.amharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.translit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const activeSentence = AMHARIC_SENTENCES.find((s) => s.id === activeSentenceId) || AMHARIC_SENTENCES[0];

  const categories = [
    { id: 'all', labelEn: 'All Categories', labelFr: 'Toutes catégories', labelAm: 'ሁሉንም' },
    { id: 'daily', labelEn: 'Daily Life', labelFr: 'Vie quotidienne', labelAm: 'የዕለት ተዕለት' },
    { id: 'school', labelEn: 'School & Study', labelFr: 'École & Étude', labelAm: 'ትምህርት' },
    { id: 'action', labelEn: 'Motion & Animals', labelFr: 'Mouvement & Animaux', labelAm: 'እንቅስቃሴ' },
    { id: 'nature', labelEn: 'Nature & Light', labelFr: 'Nature & Lumière', labelAm: 'ተፈጥሮ' },
    { id: 'food', labelEn: 'Food & Coffee', labelFr: 'Cuisine & Café', labelAm: 'ምግብ' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#C4881F]/15 rounded-lg text-[#C4881F]">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#28324A]">
              {isFr ? 'Phrases en Amharique & Grammaire' : 'Amharic Sentences & Grammar Lab'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C6478] mt-1">
            {isFr
              ? 'Explorez des phrases complètes combinant noms (ስም), adjectifs (ቅጽል) et verbes (ግሥ) avec écoute audio et analyse mot à mot.'
              : 'Explore full sentences combining Nouns (ስም), Adjectives (ቅጽል), and Verbs (ግሥ) with interactive audio and morphological breakdowns.'}
          </p>
        </div>

        {/* Color Legend */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-semibold bg-white/70 px-3 py-2 rounded-xl border border-[#CFC3A6]/60">
          <span className="text-[#5C6478] mr-1">{isFr ? 'Légende :' : 'Legend:'}</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-300">
            {isFr ? 'Nom (ስም)' : 'Noun (ስም)'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
            {isFr ? 'Adjectif (ቅጽል)' : 'Adjective (ቅጽል)'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
            {isFr ? 'Verbe (ግሥ)' : 'Verb (ግሥ)'}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A93A6] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isFr ? 'Rechercher un mot, une phrase, une traduction...' : 'Search sentence, word, translation...'}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#CFC3A6] rounded-xl text-[#28324A] placeholder-[#8A93A6] focus:outline-none focus:border-[#C4881F]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat.id
                  ? 'bg-[#3E6650] text-white border-[#3E6650] shadow-xs'
                  : 'bg-white text-[#5C6478] border-[#CFC3A6] hover:border-[#3E6650]'
              }`}
            >
              {isFr ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sentences List & Detailed Anatomy Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Sentences List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider px-1 flex items-center justify-between">
            <span>{isFr ? `Phrases disponibles (${filteredSentences.length})` : `Sentences (${filteredSentences.length})`}</span>
            <span>{isFr ? 'Touchez pour inspecter' : 'Tap to inspect'}</span>
          </div>

          {filteredSentences.length === 0 ? (
            <div className="bg-white/60 border border-dashed border-[#CFC3A6] rounded-2xl p-8 text-center text-[#8A93A6] text-sm">
              {isFr ? 'Aucune phrase trouvée pour cette recherche.' : 'No sentences match your filter.'}
            </div>
          ) : (
            filteredSentences.map((sentence) => {
              const isSelected = activeSentence.id === sentence.id;
              return (
                <div
                  key={sentence.id}
                  onClick={() => {
                    setActiveSentenceId(sentence.id);
                    setSelectedTokenIndex(null);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#FAF6EC] border-[#C4881F] shadow-sm ring-2 ring-[#C4881F]/20'
                      : 'bg-white border-[#CFC3A6] hover:border-[#C4881F]/70 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EDE3CC] text-[#5C6478]">
                        {isFr ? sentence.categoryLabelFr : sentence.categoryLabelEn}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sentence.difficulty === 'beginner' 
                          ? 'bg-emerald-50 text-emerald-700'
                          : sentence.difficulty === 'intermediate'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {sentence.difficulty}
                      </span>
                    </div>

                    {/* Sentence Audio Trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(sentence.amharic);
                      }}
                      className="p-1.5 rounded-lg bg-[#3E6650]/10 hover:bg-[#3E6650] hover:text-white text-[#3E6650] transition"
                      title={isFr ? 'Écouter la phrase' : 'Listen to sentence'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Amharic Sentence Text */}
                  <div className="mt-2 text-lg sm:text-xl font-bold font-ethiopic text-[#28324A] leading-relaxed flex flex-wrap gap-1.5 items-baseline">
                    {sentence.tokens.map((token, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded-md transition border ${getPosBadgeColor(token.pos)}`}
                      >
                        {token.word}
                      </span>
                    ))}
                  </div>

                  {/* Transliteration & Translation */}
                  <div className="mt-2 text-xs italic text-[#5C6478]">
                    {sentence.translit}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-medium text-[#28324A]">
                    {isFr ? sentence.fr : sentence.en}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Deep Morphological Breakdown & Grammar Rule Box */}
        <div className="lg:col-span-6 sticky top-4 space-y-4">
          <div className="bg-[#FAF6EC] border-2 border-[#C4881F] rounded-2xl p-5 shadow-sm space-y-5">
            {/* Header of Active Sentence */}
            <div className="flex items-center justify-between border-b border-[#CFC3A6] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C4881F]" />
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#28324A]">
                  {isFr ? 'Analyse Grammaticale de la Phrase' : 'Sentence Anatomy & Grammar'}
                </h3>
              </div>
              <button
                onClick={() => speechService.speak(activeSentence.amharic)}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#3E6650] text-white rounded-xl text-xs font-semibold hover:bg-[#325240] transition shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isFr ? 'Écouter tout' : 'Play Audio'}</span>
              </button>
            </div>

            {/* Large Amharic Display with interactive token inspection */}
            <div className="bg-white rounded-xl p-4 border border-[#CFC3A6] space-y-2">
              <div className="text-xl sm:text-2xl font-ethiopic font-bold text-[#28324A] leading-relaxed flex flex-wrap gap-2">
                {activeSentence.tokens.map((tok, idx) => {
                  const isTokenActive = selectedTokenIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedTokenIndex(isTokenActive ? null : idx);
                        speechService.speak(tok.word);
                      }}
                      className={`px-2 py-1 rounded-lg border text-left transition transform ${
                        getPosBadgeColor(tok.pos)
                      } ${
                        isTokenActive
                          ? 'scale-105 ring-2 ring-[#C4881F] shadow-sm font-extrabold'
                          : 'hover:opacity-90'
                      }`}
                    >
                      <span>{tok.word}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs italic text-[#5C6478] pt-1">
                🗣️ {activeSentence.translit}
              </div>
              <div className="text-sm font-semibold text-[#28324A]">
                🎯 {isFr ? activeSentence.fr : activeSentence.en}
              </div>
            </div>

            {/* Pattern Formula */}
            <div className="bg-[#EDE3CC]/60 rounded-xl p-3 border border-[#CFC3A6] text-xs space-y-1">
              <div className="font-bold text-[#5C6478] uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C4881F]" />
                <span>{isFr ? 'Structure syntaxique :' : 'Sentence Syntax Pattern:'}</span>
              </div>
              <div className="font-mono text-xs font-bold text-[#28324A] bg-white/80 p-2 rounded-lg border border-[#CFC3A6]/60">
                {activeSentence.grammarPattern}
              </div>
            </div>

            {/* Word by Word Breakdown List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider flex items-center justify-between">
                <span>{isFr ? 'Décomposition mot par mot' : 'Word-by-Word Breakdown'}</span>
                <span className="text-[10px] text-[#C4881F]">
                  {isFr ? 'Touchez un mot pour écouter' : 'Tap to hear word'}
                </span>
              </div>

              <div className="space-y-2">
                {activeSentence.tokens.map((tok, idx) => {
                  const isTokenSelected = selectedTokenIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedTokenIndex(isTokenSelected ? null : idx);
                        speechService.speak(tok.word);
                      }}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex flex-col gap-1 ${
                        isTokenSelected
                          ? 'bg-white border-[#C4881F] shadow-xs'
                          : 'bg-white/80 border-[#CFC3A6] hover:border-[#3E6650]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-ethiopic text-lg font-bold text-[#28324A]">
                            {tok.word}
                          </span>
                          <span className="text-xs font-serif italic text-[#5C6478]">
                            ({tok.translit})
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPosBadgeColor(tok.pos)}`}>
                            {getPosLabel(tok.pos)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speechService.speak(tok.word);
                          }}
                          className="p-1 rounded-md text-[#3E6650] hover:bg-[#3E6650]/10 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-[#28324A] font-medium">
                        ➡️ {isFr ? tok.fr : tok.en}
                      </div>

                      {(tok.explanationEn || tok.root) && (
                        <div className="text-[11px] text-[#5C6478] bg-[#FAF6EC] p-1.5 rounded-lg border border-[#CFC3A6]/40 mt-1">
                          {tok.root && (
                            <span className="font-bold text-[#3E6650] mr-1">
                              {isFr ? `Racine: ${tok.root} · ` : `Root: ${tok.root} · `}
                            </span>
                          )}
                          <span>{isFr ? tok.explanationFr : tok.explanationEn}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grammar Tip Box */}
            <div className="bg-[#3E6650]/10 border border-[#3E6650]/30 rounded-xl p-3.5 text-xs text-[#28324A] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#3E6650]">
                <Info className="w-4 h-4" />
                <span>{isFr ? 'Astuce Grammaticale Clé' : 'Key Grammar Insight'}</span>
              </div>
              <p className="leading-relaxed">
                {isFr ? activeSentence.grammarTipFr : activeSentence.grammarTipEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
