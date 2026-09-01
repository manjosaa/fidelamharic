import { AudioState } from '../types';

class SpeechService {
  private amVoice: SpeechSynthesisVoice | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private forceOnline: boolean = false;
  private isSpeaking: boolean = false;
  private isPlayingOnline: boolean = false;
  private activeWord: string | null = null;
  private listeners: ((state: AudioState) => void)[] = [];
  private audioUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notify();
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notify();
      });

      if ('speechSynthesis' in window) {
        this.loadVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  public subscribe(fn: (state: AudioState) => void): () => void {
    this.listeners.push(fn);
    fn(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  public getState(): AudioState {
    return {
      isSpeaking: this.isSpeaking,
      isPlayingOnline: this.isPlayingOnline,
      hasNativeVoice: !!this.amVoice,
      isOnline: this.isOnline,
      forceOnline: this.forceOnline,
      activeWord: this.activeWord,
    };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach((fn) => fn(s));
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    this.amVoice =
      voices.find(
        (v) =>
          v.lang &&
          (v.lang.toLowerCase().startsWith('am') ||
            v.name.toLowerCase().includes('amharic') ||
            v.name.toLowerCase().includes('ethiopic'))
      ) || null;
    this.notify();
  }

  public toggleForceOnline(): boolean {
    this.forceOnline = !this.forceOnline;
    this.notify();
    return this.forceOnline;
  }

  public setForceOnline(val: boolean) {
    this.forceOnline = val;
    this.notify();
  }

  // Pre-unlock audio on mobile touch
  public unlockAudio() {
    if (this.audioUnlocked) return;
    try {
      if ('AudioContext' in window || 'webkitAudioContext' in (window as unknown as { webkitAudioContext: typeof AudioContext })) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      }
      this.audioUnlocked = true;
    } catch {
      // ignore
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = '';
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }
    this.isSpeaking = false;
    this.isPlayingOnline = false;
    this.activeWord = null;
    this.notify();
  }

  public async speak(text: string): Promise<void> {
    if (!text || !text.trim()) return;
    this.unlockAudio();
    this.stop();

    const cleanText = text.trim();
    this.isSpeaking = true;
    this.activeWord = cleanText;
    this.notify();

    // Haptic feedback on mobile if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // ignore
      }
    }

    // If forced online or no native voice
    if (this.forceOnline && this.isOnline) {
      this.speakOnline(cleanText);
      return;
    }

    // Try Native Web Speech API first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.amVoice) {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.voice = this.amVoice;
        utterance.lang = this.amVoice.lang || 'am-ET';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          this.isSpeaking = false;
          this.activeWord = null;
          this.notify();
        };

        utterance.onerror = () => {
          this.tryOnlineFallback(cleanText);
        };

        window.speechSynthesis.speak(utterance);
        return;
      } catch {
        this.tryOnlineFallback(cleanText);
        return;
      }
    }

    // Try online fallback
    this.tryOnlineFallback(cleanText);
  }

  private tryOnlineFallback(text: string) {
    if (this.isOnline) {
      this.speakOnline(text);
    } else {
      this.isSpeaking = false;
      this.activeWord = null;
      this.notify();
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 60, 40]);
        } catch {
          // ignore
        }
      }
    }
  }

  private speakOnline(text: string) {
    this.isPlayingOnline = true;
    this.notify();

    const encoded = encodeURIComponent(text);
    const audioUrls = [
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=am&client=tw-ob`,
      `https://code.responsivevoice.org/getvoice.php?t=${encoded}&tl=am`,
    ];

    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= audioUrls.length) {
        this.isSpeaking = false;
        this.isPlayingOnline = false;
        this.activeWord = null;
        this.notify();
        return;
      }

      const url = audioUrls[currentIdx];
      const audio = new Audio(url);
      this.currentAudio = audio;

      audio.onended = () => {
        this.isSpeaking = false;
        this.isPlayingOnline = false;
        this.activeWord = null;
        this.currentAudio = null;
        this.notify();
      };

      audio.onerror = () => {
        this.currentAudio = null;
        currentIdx++;
        playNext();
      };

      audio.play().catch(() => {
        this.currentAudio = null;
        currentIdx++;
        playNext();
      });
    };

    playNext();
  }
}

export const speechService = new SpeechService();
