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
    if (this.amVoice) {
      utter.voice = this.amVoice;
      utter.lang = this.amVoice.lang;
    } else {
      utter.lang = 'am-ET';
    }

    utter.rate = 0.85;
    utter.pitch = 1.0;

    utter.onend = () => {
      this.state.isSpeaking = false;
      this.state.activeWord = null;
      this.notify();
    };

    utter.onerror = () => {
      if (this.state.isOnline) {
        this.speakOnline(text);
      } else {
        this.stop();
      }
    };

    try {
      this.synth.speak(utter);
    } catch (e) {
      console.error(e);
      this.speakOnline(text);
    }
  }

  private speakOnline(text: string) {
    this.state.isPlayingOnline = true;
    this.notify();

    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=am&client=tw-ob`;

    const audio = new Audio(url);
    this.audioEl = audio;

    audio.onended = () => {
      this.state.isSpeaking = false;
      this.state.isPlayingOnline = false;
      this.state.activeWord = null;
      this.audioEl = null;
      this.notify();
    };

    audio.onerror = () => {
      this.state.isSpeaking = false;
      this.state.isPlayingOnline = false;
      this.state.activeWord = null;
      this.audioEl = null;
      this.notify();
    };

    audio.play().catch(() => {
      this.state.isSpeaking = false;
      this.state.isPlayingOnline = false;
      this.state.activeWord = null;
      this.audioEl = null;
      this.notify();
    });
  }
}

export const speechService = new SpeechService();
