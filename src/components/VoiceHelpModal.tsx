import React from 'react';
import { X, Volume2, Globe, Smartphone, CheckCircle, Wifi, AlertTriangle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { AudioState, Language } from '../types';

interface VoiceHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioState: AudioState;
  lang: Language;
}

export const VoiceHelpModal: React.FC<VoiceHelpModalProps> = ({
  isOpen,
  onClose,
  audioState,
  lang,
}) => {
  if (!isOpen) return null;

  const isFr = lang === 'fr';

  const testAudio = () => {
    speechService.speak('ሰላም');
  };

  return (
    <div
      id="voice-help-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        id="voice-help-modal-content"
        className="w-full max-w-lg bg-[#F7F1E4] border border-[#CFC3A6] rounded-xl shadow-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#CFC3A6]/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-[#C4881F]" />
            <h3 className="font-serif font-bold text-lg text-[#28324A]">
              {isFr ? 'Guide de prononciation audio' : 'Audio & Pronunciation Guide'}
            </h3>
          </div>
          <button
            id="close-voice-help-btn"
            onClick={onClose}
            className="p-1 text-[#5C6478] hover:text-[#28324A] hover:bg-[#EAD9AF]/50 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status card */}
        <div className="p-3.5 bg-white/80 border border-[#CFC3A6] rounded-lg mb-4 text-sm">
          <div className="font-semibold text-[#28324A] mb-1 flex items-center gap-2">
            {audioState.hasNativeVoice ? (
              <CheckCircle className="w-4 h-4 text-[#3E6650]" />
            ) : audioState.isOnline ? (
              <Wifi className="w-4 h-4 text-[#C4881F]" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#A83A28]" />
            )}
            {isFr ? 'Statut du moteur vocal :' : 'Voice Engine Status:'}
          </div>
          <div className="text-[#5C6478] text-xs leading-relaxed">
            {audioState.hasNativeVoice ? (
              <span className="text-[#3E6650] font-medium">
                {isFr
                  ? '✅ Voix amharique native détectée sur votre appareil (fonctionne même hors ligne).'
                  : '✅ Native Amharic voice detected on your device (works offline).'}
              </span>
            ) : audioState.isOnline ? (
              <span className="text-[#28324A]">
                {isFr
                  ? '🌐 Voix en ligne active via synthèse vocale connectée (Google TTS).'
                  : '🌐 Online speech synthesis active (Google TTS).'}
              </span>
            ) : (
              <span className="text-[#A83A28] font-medium">
                {isFr
                  ? '⚠️ Appareil hors ligne sans voix amharique installée. Connectez-vous au Wi-Fi/données pour entendre les sons.'
                  : '⚠️ Device is offline with no local Amharic voice. Connect to Wi-Fi/data to hear pronunciations.'}
              </span>
            )}
          </div>
        </div>

        {/* Test voice button */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <button
            id="test-voice-btn"
            onClick={testAudio}
            className="flex items-center gap-2 px-4 py-2 bg-[#3E6650] text-[#F7F1E4] rounded-lg text-sm font-semibold hover:bg-[#325240] active:scale-95 transition-all shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            {isFr ? 'Tester la voix ("Selam" / ሰላም)' : 'Test Voice ("Selam" / ሰላም)'}
          </button>
          <button
            id="toggle-online-btn"
            onClick={() => speechService.toggleForceOnline()}
            className="flex items-center gap-2 px-3 py-2 border border-[#CFC3A6] bg-white text-[#28324A] rounded-lg text-xs font-medium hover:bg-[#EDE3CC] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#C4881F]" />
            {audioState.forceOnline
              ? isFr
                ? 'Mode en ligne forcé (Actif)'
                : 'Online Mode Forced (On)'
              : isFr
              ? 'Basculer vers voix en ligne'
              : 'Switch to online voice'}
          </button>
        </div>

        {/* Step by step installation */}
        <div className="space-y-4 text-xs text-[#28324A]">
          <div className="p-3 bg-white/60 border border-[#CFC3A6]/80 rounded-lg">
            <h4 className="font-bold flex items-center gap-1.5 text-[#28324A] mb-1.5 text-sm">
              <Smartphone className="w-4 h-4 text-[#3E6650]" />
              {isFr ? 'Android (Voix hors-ligne gratuite)' : 'Android (Free Offline Voice)'}
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-[#5C6478] leading-relaxed">
              <li>
                {isFr
                  ? 'Ouvrez les Paramètres de votre téléphone.'
                  : 'Open your phone Settings.'}
              </li>
              <li>
                {isFr
                  ? 'Allez dans Accessibilité → Synthèse vocale (ou Système → Langues et saisie → Sortie synthèse vocale).'
                  : 'Go to Accessibility → Text-to-speech output (or System → Languages & input → Text-to-speech).'}
              </li>
              <li>
                {isFr
                  ? 'Sélectionnez "Moteur de synthèse vocale Google", touchez l’icône ⚙️ Paramètres.'
                  : 'Select "Speech Recognition and Synthesis from Google", tap the ⚙️ Settings gear.'}
              </li>
              <li>
                {isFr
                  ? 'Choisissez "Installer les données vocales" et téléchargez "Amharique (Éthiopie)".'
                  : 'Choose "Install voice data" and download "Amharic (Ethiopia)".'}
              </li>
            </ol>
          </div>

          <div className="p-3 bg-white/60 border border-[#CFC3A6]/80 rounded-lg">
            <h4 className="font-bold flex items-center gap-1.5 text-[#28324A] mb-1.5 text-sm">
              <Smartphone className="w-4 h-4 text-[#C4881F]" />
              {isFr ? 'iPhone / iPad (iOS)' : 'iPhone / iPad (iOS)'}
            </h4>
            <p className="text-[#5C6478] leading-relaxed">
              {isFr
                ? 'Sur iOS, l’application utilise la voix en ligne haute qualité dès qu’une connexion Internet est disponible. Assurez-vous que le mode silencieux est désactivé.'
                : 'On iOS, high-quality online audio fallback is automatically used when connected to the internet. Make sure silent/mute switch is turned off.'}
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#CFC3A6]/60 flex justify-end">
          <button
            id="close-modal-footer-btn"
            onClick={onClose}
            className="px-4 py-2 bg-[#28324A] text-[#F7F1E4] rounded-lg text-sm font-semibold hover:bg-[#1f273b] transition-colors"
          >
            {isFr ? 'Compris !' : 'Got it!'}
          </button>
        </div>
      </div>
    </div>
  );
};
