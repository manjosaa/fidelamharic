import React, { useState } from 'react';
import {
  Volume2,
  Printer,
  Sparkles,
  Eye,
  EyeOff,
  HelpCircle,
  Grid,
  ChevronDown,
  Languages,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { FidelFamily, Language, AudioState } from '../types';
import { FIDEL_DATA } from '../data/fidelData';

interface HeaderBarProps {
  currentFidel: FidelFamily;
  onSelectFidel: (fidel: FidelFamily) => void;
  lang: Language;
  onToggleLang: () => void;
  showKey: boolean;
  onToggleKey: () => void;
  onNewSheet: () => void;
  onOpenVoiceHelp: () => void;
  audioState: AudioState;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentFidel,
  onSelectFidel,
  lang,
  onToggleLang,
  showKey,
  onToggleKey,
  onNewSheet,
  onOpenVoiceHelp,
  audioState,
}) => {
  const isFr = lang === 'fr';
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header id="main-header" className="no-print mb-4 space-y-3">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#F7F1E4] border border-[#CFC3A6] rounded-xl p-2.5 sm:p-3 shadow-xs">
        {/* Left: Mobile quick letter selector & Language */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick letter selector dropdown button for phone */}
          <div className="relative">
            <button
              id="mobile-letter-picker-btn"
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CFC3A6] rounded-lg text-sm font-semibold text-[#28324A] hover:border-[#C4881F] active:bg-[#EDE3CC] transition-all"
              title={isFr ? 'Choisir une lettre parmi les 33' : 'Pick a letter from the 33'}
            >
              <Grid className="w-4 h-4 text-[#C4881F]" />
              <span className="font-amh text-base font-bold text-[#3E6650] leading-none">
                {currentFidel.base}
              </span>
              <span className="text-xs text-[#5C6478] hidden xs:inline">
                {currentFidel.name ? `(${currentFidel.name})` : ''}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#5C6478] transition-transform ${isPickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Grid */}
            {isPickerOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsPickerOpen(false)}
                />
                <div
                  id="letter-picker-menu"
                  className="absolute left-0 top-full mt-2 z-50 w-72 sm:w-80 max-h-80 overflow-y-auto bg-white border border-[#CFC3A6] rounded-xl shadow-xl p-2 grid grid-cols-6 gap-1.5 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="col-span-6 px-2 py-1 text-xs font-semibold text-[#5C6478] border-b border-[#CFC3A6]/40 flex justify-between items-center mb-1">
                    <span>{isFr ? '33 familles de Fidel' : '33 Fidel Families'}</span>
                    <span className="text-[10px] text-[#C4881F]">{isFr ? 'Touchez pour ouvrir' : 'Tap to open'}</span>
                  </div>
                  {FIDEL_DATA.map((item) => {
                    const isSelected = item.base === currentFidel.base;
                    return (
                      <button
                        key={item.base}
                        onClick={() => {
                          onSelectFidel(item);
                          setIsPickerOpen(false);
                        }}
                        className={`h-10 rounded-lg flex flex-col items-center justify-center font-amh text-lg transition-all ${
                          isSelected
                            ? 'bg-[#3E6650] text-white font-bold shadow-xs'
                            : 'bg-[#F7F1E4]/60 hover:bg-[#EAD9AF] text-[#28324A]'
                        }`}
                        title={item.name}
                      >
                        <span>{item.base}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Language Toggle */}
          <button
            id="lang-toggle-btn"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#CFC3A6] rounded-lg text-xs font-medium text-[#28324A] hover:bg-[#EDE3CC] transition-colors"
            title={isFr ? 'Basculer en anglais' : 'Switch to French'}
          >
            <Languages className="w-3.5 h-3.5 text-[#C4881F]" />
            <span className={lang === 'fr' ? 'font-bold text-[#28324A]' : 'text-[#5C6478]'}>FR</span>
            <span className="text-[#CFC3A6]">/</span>
            <span className={lang === 'en' ? 'font-bold text-[#28324A]' : 'text-[#5C6478]'}>EN</span>
          </button>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Audio helper pill */}
          <button
            id="voice-help-btn"
            onClick={onOpenVoiceHelp}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 border border-[#CFC3A6] bg-white rounded-lg text-xs text-[#5C6478] hover:text-[#28324A] hover:bg-[#EDE3CC] transition-colors"
            title={isFr ? 'Aide et réglages audio' : 'Audio voice help & settings'}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#C4881F]" />
            <span className="hidden sm:inline">
              {audioState.hasNativeVoice
                ? isFr ? 'Voix native' : 'Native voice'
                : audioState.isOnline
                ? isFr ? 'Voix en ligne' : 'Online voice'
                : isFr ? 'Sans voix' : 'Offline voice'}
            </span>
            <HelpCircle className="w-3 h-3 text-[#5C6478]" />
          </button>

          {/* Answer Key Toggle Button */}
          <button
            id="key-toggle-btn"
            onClick={onToggleKey}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all ${
              showKey
                ? 'bg-[#3E6650] border-[#3E6650] text-[#F7F1E4] shadow-xs'
                : 'border-[#28324A] text-[#28324A] bg-transparent hover:bg-[#EDE3CC]'
            }`}
          >
            {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showKey
                ? isFr ? 'Masquer corrigé' : 'Hide answers'
                : isFr ? 'Corrigé' : 'Answers'}
            </span>
          </button>

          {/* New Sheet / Randomize exercises */}
          <button
            id="new-sheet-btn"
            onClick={onNewSheet}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#C4881F] text-white border border-[#C4881F] rounded-lg text-xs font-semibold hover:bg-[#af7818] active:scale-95 transition-all shadow-xs"
            title={isFr ? 'Générer de nouveaux exercices aléatoires' : 'Generate new random exercises'}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFr ? 'Nouvelle fiche' : 'New sheet'}</span>
          </button>

          {/* Print Button */}
          <button
            id="print-sheet-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#28324A] text-[#F7F1E4] rounded-lg text-xs font-semibold hover:bg-[#1d2435] active:scale-95 transition-all shadow-xs"
            title={isFr ? 'Imprimer cette fiche au format A4' : 'Print this worksheet (A4/Letter)'}
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFr ? 'Imprimer' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Voice Status hint & active speaking bar */}
      <div className="flex items-center justify-between px-1 text-xs text-[#5C6478]">
        <div className="flex items-center gap-1.5">
          <span className="inline-block animate-pulse text-[#C4881F]">🔊</span>
          <span>
            {isFr
              ? 'Touchez n’importe quelle lettre ou mot pour écouter sa prononciation.'
              : 'Tap any letter or word to hear its authentic pronunciation.'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {audioState.isSpeaking && (
            <span className="px-2 py-0.5 bg-[#3E6650]/15 text-[#3E6650] text-[11px] font-semibold rounded-full flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E6650]"></span>
              {audioState.activeWord}
            </span>
          )}
          <span className="text-[11px] hidden md:inline opacity-70">
            {audioState.isOnline ? (
              <span className="inline-flex items-center gap-1">
                <Wifi className="w-3 h-3 text-[#3E6650]" /> {isFr ? 'Connecté' : 'Online'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#A83A28]">
                <WifiOff className="w-3 h-3" /> {isFr ? 'Hors-ligne' : 'Offline'}
              </span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};
