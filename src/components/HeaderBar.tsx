import React, { useState } from 'react';
import { FidelFamily, Language, AudioState } from '../types';
import { FIDEL_DATA } from '../data/fidelData';
import { speechService } from '../services/speechService';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  Volume2, 
  Languages, 
  HelpCircle, 
  Grid3X3,
  X
} from 'lucide-react';

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
  const [showGridModal, setShowGridModal] = useState(false);
  const isFr = lang === 'fr';

  return (
    <div className="flex flex-col gap-2 mb-3">
      {/* Main Top Control Bar */}
      <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl p-3 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Fidel Letter Selector and Language Toggle */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => setShowGridModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#CFC3A6] rounded-xl hover:border-[#C4881F] transition shadow-xs text-left"
            title={isFr ? "Changer de lettre (33 familles)" : "Change root letter (33 families)"}
          >
            <Grid3X3 className="w-4 h-4 text-[#C4881F]" />
            <span className="font-ethiopic text-2xl font-bold text-[#3E6650] leading-none">
              {currentFidel.base}
            </span>
            <span className="text-xs font-semibold text-[#5C6478]">
              {currentFidel.name}
            </span>
          </button>

          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CFC3A6] rounded-xl hover:border-[#C4881F] transition text-xs font-semibold text-[#28324A] shadow-xs"
          >
            <Languages className="w-4 h-4 text-[#C4881F]" />
            <span className={isFr ? "font-bold text-[#28324A]" : "text-[#8A93A6]"}>FR</span>
            <span className="text-[#CFC3A6]">/</span>
            <span className={!isFr ? "font-bold text-[#28324A]" : "text-[#8A93A6]"}>EN</span>
          </button>
        </div>

        {/* Right: Actions (Voice Help, Answers Key, New Sheet) */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* Audio Engine Help Button */}
          <button
            onClick={onOpenVoiceHelp}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CFC3A6] rounded-xl hover:border-[#C4881F] transition text-xs font-medium text-[#28324A] shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-[#C4881F]" />
            <span className="hidden sm:inline">
              {audioState.hasNativeVoice 
                ? (isFr ? 'Voix native' : 'Native Voice')
                : (isFr ? 'Voix en ligne' : 'Online Voice')}
            </span>
            <HelpCircle className="w-3.5 h-3.5 text-[#5C6478]" />
          </button>

          {/* Toggle Answer Key */}
          <button
            onClick={onToggleKey}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition shadow-xs border ${
              showKey 
                ? 'bg-[#3E6650] text-white border-[#3E6650]' 
                : 'bg-white text-[#28324A] border-[#CFC3A6] hover:border-[#3E6650]'
            }`}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showKey ? (isFr ? 'Masquer corrigé' : 'Hide answers') : (isFr ? 'Corrigé' : 'Answers')}</span>
          </button>

          {/* Randomize / New Sheet */}
          <button
            onClick={onNewSheet}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C4881F] text-white hover:bg-[#a87418] rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFr ? 'Nouvelle fiche' : 'New sheet'}</span>
          </button>
        </div>
      </div>

      {/* Audio Status & Speaking Pill */}
      <div className="flex items-center justify-between text-xs px-2 text-[#5C6478]">
        <div className="flex items-center gap-1.5">
          <span>🔊</span>
          <span>
            {isFr 
              ? "Touchez n’importe quelle lettre ou mot pour écouter la prononciation." 
              : "Tap any glyph or word to hear pronunciation."}
          </span>
        </div>

        {audioState.isSpeaking && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3E6650] bg-[#3E6650]/10 px-2 py-0.5 rounded-full animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#3E6650]"></span>
            <span>{audioState.activeWord}</span>
          </div>
        )}
      </div>

      {/* 33 Families Grid Modal */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl max-w-xl w-full p-5 shadow-xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFC3A6] mb-4">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#28324A]">
                  {isFr ? "33 Familles de Fidel" : "33 Fidel Families"}
                </h3>
                <p className="text-xs text-[#C4881F]">
                  {isFr ? "Touchez pour sélectionner et écouter" : "Tap to select and listen"}
                </p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="p-1 rounded-lg hover:bg-[#EDE3CC] text-[#5C6478] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 overflow-y-auto pr-1">
              {FIDEL_DATA.map((item) => {
                const isSelected = item.base === currentFidel.base;
                return (
                  <button
                    key={item.base}
                    onClick={() => {
                      speechService.speak(item.base);
                      onSelectFidel(item);
                      setShowGridModal(false);
                    }}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition p-1 ${
                      isSelected
                        ? 'bg-[#3E6650] text-white border-[#3E6650] shadow-sm'
                        : 'bg-white text-[#28324A] border-[#CFC3A6] hover:border-[#C4881F] hover:bg-[#EDE3CC]/40'
                    }`}
                  >
                    <span className="font-ethiopic text-2xl font-bold">{item.base}</span>
                    <span className={`text-[10px] truncate max-w-full font-medium ${isSelected ? 'text-white/80' : 'text-[#8A93A6]'}`}>
                      {item.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
