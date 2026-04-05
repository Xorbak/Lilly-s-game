import { useState, useRef, useCallback } from 'react';
import { Lang } from '../types';

interface SREvent extends Event {
  results: { [i: number]: { [j: number]: { transcript: string } }; length: number };
}
interface SRInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  abort(): void;
  onresult: ((e: SREvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition?: new () => SRInstance;
    webkitSpeechRecognition?: new () => SRInstance;
  }
}

export const useSpeechRecognition = () => {
  const [listening, setListening] = useState(false);
  const ref = useRef<SRInstance | null>(null);
  const SR = typeof window !== 'undefined'
    ? (window.SpeechRecognition ?? window.webkitSpeechRecognition)
    : undefined;
  const isSupported = !!SR;

  const listen = useCallback((lang: Lang, onResult: (t: string) => void) => {
    if (!SR) return;
    const rec = new SR();
    ref.current = rec;
    rec.lang = lang === 'en' ? 'en-US' : 'af-ZA';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: SREvent) => onResult(e.results[0][0].transcript);
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    setListening(true);
  }, [SR]);

  const stop = useCallback(() => {
    ref.current?.abort();
    setListening(false);
  }, []);

  return { listen, stop, listening, isSupported };
};
