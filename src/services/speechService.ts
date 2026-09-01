import { AudioState } from '../types';

class SpeechService {
  private state: AudioState = {
    isSpeaking: false,
    isPlayingOnline: false,
    hasNativeVoice: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    forceOnline: false,
    activeWord: null,
  };

  private listeners: Set<(state: AudioState) => void> = new Set();
  private audioEl: HTMLAudioElement | null = null;
  private synth: SpeechSynthesis | null = null;
  private amVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.initVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.initVoices();
        }
      }

      window.addEventListener('online', () => this.updateOnlineStatus(true));
      window.addEventListener('offline', () => this.updateOnlineStatus(false));
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const am = voices.find(
      (v) => v.lang.toLowerCase().startsWith('am') || v.lang.toLowerCase().includes('ethiopic')
    );
    this.amVoice = am || null;
    this.state.hasNativeVoice = !!am;
    this.notify();
  }

  private updateOnlineStatus(isOnline: boolean) {
    this.state.isOnline = isOnline;
    this.notify();
  }

  public subscribe(cb: (state: AudioState) => void): () => void {
    this.listeners.add(cb);
    cb(this.state);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ ...this.state }));
  }

  public toggleForceOnline() {
    this.state.forceOnline = !this.state.forceOnline;
    this.notify();
    return this.state.forceOnline;
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        console.error(e);
      }
    }
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
      this.audioEl = null;
    }
    this.state.isSpeaking = false;
    this.state.isPlayingOnline = false;
    this.state.activeWord = null;
    this.notify();
  }

  public speak(text: string) {
    if (!text || text.trim() === '') return;
    const cleanText = text.trim();

    this.stop();

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (_) {}
    }

    this.state.isSpeaking = true;
    this.state.activeWord = cleanText;
    this.notify();

    if (this.state.forceOnline || !this.state.hasNativeVoice) {
      if (this.state.isOnline) {
        this.speakOnline(cleanText);
      } else if (this.synth) {
        this.speakNative(cleanText);
      } else {
        this.stop();
      }
    } else {
      this.speakNative(cleanText);
    }
  }

  private speakNative(text: string) {
    if (!this.synth) {
      this.speakOnline(text);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    
    // Try to find Amharic voice, fallback to any available voice
    if (this.amVoice) {
      utter.voice = this.amVoice;
      utter.lang = this.amVoice.lang;
    } else {
      // Try to find any voice for Amharic or use system default
      const voices = this.synth.getVoices();
      const amharicVoice = voices.find(v => v.lang.toLowerCase().startsWith('am'));
      if (amharicVoice) {
        utter.voice = amharicVoice;
        utter.lang = amharicVoice.lang;
      } else {
        utter.lang = 'am-ET';
      }
    }

    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    utter.onstart = () => {
      this.state.isSpeaking = true;
      this.notify();
    };

    utter.onend = () => {
      this.state.isSpeaking = false;
      this.state.activeWord = null;
      this.notify();
    };

    utter.onerror = (event) => {
      console.warn('Speech synthesis error:', event.error);
      // Fallback to online TTS on error
      this.stop();
      if (this.state.isOnline) {
        this.speakOnline(text);
      }
    };

    try {
      // Cancel any previous speech
      this.synth.cancel();
      // Use small delay to ensure proper initialization on Android
      setTimeout(() => {
        if (this.synth) {
          this.synth.speak(utter);
        }
      }, 50);
    } catch (e) {
      console.error('Failed to speak:', e);
      this.speakOnline(text);
    }
  }

  private speakOnline(text: string) {
    this.state.isPlayingOnline = true;
    this.notify();

    const encoded = encodeURIComponent(text);
    
    // Try Google Translate TTS first (most reliable for Amharic)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=am&client=tw-ob`;

    const audio = new Audio();
    this.audioEl = audio;
    
    // Add error handler for first attempt
    const handleError = () => {
      console.warn('Primary TTS service failed, trying alternative...');
      // Try alternative: use slower backup
      const backupUrl = `https://tts.google.com/api/tts?text=${encoded}&lang=am`;
      audio.src = backupUrl;
      audio.onerror = () => {
        console.error('All TTS services failed');
        this.state.isSpeaking = false;
        this.state.isPlayingOnline = false;
        this.state.activeWord = null;
        this.audioEl = null;
        this.notify();
      };
    };

    audio.onended = () => {
      this.state.isSpeaking = false;
      this.state.isPlayingOnline = false;
      this.state.activeWord = null;
      this.audioEl = null;
      this.notify();
    };

    audio.onerror = handleError;
    audio.src = url;

    audio.play().catch((err) => {
      console.warn('Audio play failed:', err);
      this.state.isSpeaking = false;
      this.state.isPlayingOnline = false;
      this.state.activeWord = null;
      this.audioEl = null;
      this.notify();
    });
  }
}

export const speechService = new SpeechService();
