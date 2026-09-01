import React from 'react';
import { AudioState, Language } from '../types';
import { Volume2, CheckCircle2, Wifi, WifiOff, X, HelpCircle, ExternalLink } from 'lucide-react';
import { speechService } from '../services/speechService';

interface VoiceHelpModalProps {
  audioState: AudioState;
  lang: Language;
  onClose: () => void;
}

export const VoiceHelpModal: React.FC<VoiceHelpModalProps> = ({ audioState, lang, onClose }) => {
  const isFr = lang === 'fr';

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F1E4] border border-[#CFC3A6] rounded-2xl max-w-md w-full p-5 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#CFC3A6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C4881F]/15 flex items-center justify-center text-[#C4881F]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-[#28324A]">
                {isFr ? 'Prononciation Amharique' : 'Amharic Pronunciation Guide'}
              </h3>
              <p className="text-[11px] text-[#5C6478]">
                {isFr ? 'Diagnostic & configuration audio' : 'Audio engine status & tips'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#EDE3CC] text-[#5C6478] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engine Status Diagnostic Card */}
        <div className="bg-white/90 border border-[#CFC3A6] rounded-xl p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#5C6478]">
              {isFr ? 'Synthèse vocale système (TTS) :' : 'System TTS engine (am-ET):'}
            </span>
            <span className="flex items-center gap-1 font-bold">
              <span
                className={`w-2 h-2 rounded-full ${
                  audioState.hasNativeVoice ? 'bg-[#3E6650]' : 'bg-[#C4881F]'
                }`}
              />
              <span className={audioState.hasNativeVoice ? 'text-[#3E6650]' : 'text-[#C4881F]'}>
                {audioState.hasNativeVoice
                  ? isFr
                    ? 'Voix amharique installée'
                    : 'Installed'
                  : isFr
                  ? 'Non détectée'
                  : 'Not detected'}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#5C6478]">
              {isFr ? 'Voix en ligne (Google TTS) :' : 'Online voice (Google TTS):'}
            </span>
            <span className="flex items-center gap-1 font-bold">
              {audioState.isOnline ? (
                <Wifi className="w-3.5 h-3.5 text-[#3E6650]" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-[#A83A28]" />
              )}
              <span className={audioState.isOnline ? 'text-[#3E6650]' : 'text-[#A83A28]'}>
                {audioState.isOnline
                  ? isFr
                    ? 'Prêt (connecté)'
                    : 'Online (Ready)'
                  : isFr
                  ? 'Hors-ligne'
                  : 'Offline'}
              </span>
            </span>
          </div>
        </div>

        {/* Explanations & Advice */}
        <div className="text-xs text-[#5C6478] space-y-2 leading-relaxed">
          <p>
            {isFr
              ? '• L’application prononce automatiquement chaque lettre et mot lorsque vous touchez un élément.'
              : '• The app speaks every glyph and vocabulary word when tapped.'}
          </p>
          <p>
            {isFr
              ? '• En ligne, le flux audio clair de Google Translate est utilisé comme secours instantané.'
              : '• Online high-fidelity Google TTS is streamed automatically as fallback.'}
          </p>
          <p>
            {isFr
              ? '• Pour installer une voix amharique sur Android : Paramètres > Système / Accessibilité > Synthèse vocale > Installer les données vocales amhariques.'
              : '• To install native Amharic voices on Android: Settings > System > Accessibility > Text-to-Speech > Install voice data.'}
          </p>
        </div>

        {/* Test Speech Button */}
        <button
          onClick={() => speechService.speak('ሰላም')}
          className="w-full py-2.5 bg-[#3E6650] text-white hover:bg-[#345543] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isFr ? 'Tester la voix (« ሰላም » - Selam)' : 'Test voice ("ሰላም" - Selam)'}</span>
        </button>
      </div>
    </div>
  );
};
