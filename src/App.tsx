import React, { useState, useEffect } from 'react';
import { FidelFamily, Language, AudioState } from './types';
import { FIDEL_DATA } from './data/fidelData';
import { speechService } from './services/speechService';
import { HeaderBar } from './components/HeaderBar';
import { FidelTabs } from './components/FidelTabs';
import { FidelChart } from './components/FidelChart';
import { MissingSequenceQuiz } from './components/MissingSequenceQuiz';
import { WordMatchQuiz } from './components/WordMatchQuiz';
import { WordHuntQuiz } from './components/WordHuntQuiz';
import { TracingCanvas } from './components/TracingCanvas';
import { VoiceHelpModal } from './components/VoiceHelpModal';

export default function App() {
  const [currentFidel, setCurrentFidel] = useState<FidelFamily>(FIDEL_DATA[0]);
  const [lang, setLang] = useState<Language>('fr');
  const [showKey, setShowKey] = useState(false);
  const [isVoiceHelpOpen, setIsVoiceHelpOpen] = useState(false);
  const [missingIndex, setMissingIndex] = useState(0);
  const [audioState, setAudioState] = useState<AudioState>({
    isSpeaking: false,
    isPlayingOnline: false,
    hasNativeVoice: false,
    isOnline: true,
    forceOnline: false,
    activeWord: null,
  });

  const [sheetKey, setSheetKey] = useState(0);

  useEffect(() => {
    const unsub = speechService.subscribe(setAudioState);
    return () => unsub();
  }, []);

  const randomizeSheet = () => {
    setMissingIndex(Math.floor(Math.random() * 7));
    setSheetKey((prev) => prev + 1);
    setShowKey(false);
  };

  const handleSelectFidel = (fidel: FidelFamily) => {
    setCurrentFidel(fidel);
    setMissingIndex(Math.floor(Math.random() * 7));
    setSheetKey((prev) => prev + 1);
    setShowKey(false);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen bg-[#EDE3CC] text-[#28324A] py-4 px-2 sm:px-4 md:px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Top App Header & Controls */}
        <HeaderBar
          currentFidel={currentFidel}
          onSelectFidel={handleSelectFidel}
          lang={lang}
          onToggleLang={() => setLang((prev) => (prev === 'fr' ? 'en' : 'fr'))}
          showKey={showKey}
          onToggleKey={() => setShowKey((prev) => !prev)}
          onNewSheet={randomizeSheet}
          onOpenVoiceHelp={() => setIsVoiceHelpOpen(true)}
          audioState={audioState}
        />

        {/* 33 Fidel Horizontal Tabs Bar */}
        <FidelTabs currentFidel={currentFidel} onSelectFidel={handleSelectFidel} />

        {/* The Worksheet Paper Card */}
        <div className="paper-sheet paper-card border-2 border-[#CFC3A6] rounded-2xl p-4 sm:p-7 relative overflow-hidden space-y-7 shadow-md">
          {/* Classic Red Margin Line on the left */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-9 w-[1.5px] bg-[#A83A28]/20 pointer-events-none" />

          {/* Worksheet Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#CFC3A6] pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-[#28324A]">
                  የፊደል መልመጃ
                </h1>
                <span className="font-ethiopic text-2xl font-bold text-[#3E6650] bg-[#3E6650]/10 px-2.5 py-0.5 rounded-lg border border-[#3E6650]/30">
                  {currentFidel.base}
                </span>
              </div>
              <p className="text-xs text-[#5C6478] font-cinzel mt-0.5">
                {isFr
                  ? `Fiche de travail · Famille « ${currentFidel.name} »`
                  : `Worksheet · Family '${currentFidel.name}'`}
              </p>
            </div>

            {/* Student metadata lines */}
            <div className="text-xs text-[#8A93A6] space-y-1 font-serif">
              <div>{isFr ? 'Nom : ____________________' : 'Name: ____________________'}</div>
              <div>{isFr ? 'Date : ____________________' : 'Date: ____________________'}</div>
            </div>
          </div>

          {/* 1. Fidel Chart & Orders Section */}
          <section key={`chart-${sheetKey}`}>
            <FidelChart fidel={currentFidel} lang={lang} />
          </section>

          <hr className="border-t border-[#CFC3A6]/70" />

          {/* 2. Missing Sequence Form Quiz */}
          <section key={`seq-${sheetKey}`}>
            <MissingSequenceQuiz
              fidel={currentFidel}
              lang={lang}
              missingIndex={missingIndex}
              onRefresh={() => setMissingIndex(Math.floor(Math.random() * 7))}
              showKey={showKey}
            />
          </section>

          <hr className="border-t border-[#CFC3A6]/70" />

          {/* 3. Word Matching Quiz */}
          <section key={`match-${sheetKey}`}>
            <WordMatchQuiz fidel={currentFidel} lang={lang} showKey={showKey} />
          </section>

          <hr className="border-t border-[#CFC3A6]/70" />

          {/* 4. Word Hunt Section */}
          <section key={`hunt-${sheetKey}`}>
            <WordHuntQuiz fidel={currentFidel} lang={lang} showKey={showKey} />
          </section>

          <hr className="border-t border-[#CFC3A6]/70" />

          {/* 5. Tracing & Calligraphy Canvas */}
          <section key={`trace-${sheetKey}`}>
            <TracingCanvas fidel={currentFidel} lang={lang} />
          </section>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#5C6478] py-4 font-serif">
          {isFr
            ? 'የፊደል መልመጃ · Cahier d’apprentissage de l’alphabet amharique'
            : 'የፊደል መልመጃ · Amharic Fidel Learning Workbook'}
        </div>
      </div>

      {/* Voice Help Dialog Modal */}
      {isVoiceHelpOpen && (
        <VoiceHelpModal
          audioState={audioState}
          lang={lang}
          onClose={() => setIsVoiceHelpOpen(false)}
        />
      )}
    </div>
  );
}
