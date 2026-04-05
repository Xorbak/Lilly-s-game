import { useCallback, useRef, useState } from 'react';
import type { Lang } from '../types';

const API_KEY  = import.meta.env.VITE_ELEVENLABS_API_KEY  as string | undefined;
const VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID as string | undefined;

// Cache object URLs so each phrase is only fetched once per session
const audioCache = new Map<string, string>();

const fetchElevenLabs = async (text: string): Promise<string> => {
  if (audioCache.has(text)) return audioCache.get(text)!;

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.75, similarity_boost: 0.85, style: 0.2, use_speaker_boost: true },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`ElevenLabs ${res.status}: ${body}`);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  audioCache.set(text, url);
  return url;
};

export const useTTS = () => {
  const currentRef = useRef<HTMLAudioElement | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(async (text: string, _lang: Lang) => {
    if (!API_KEY || !VOICE_ID) {
      console.error('ElevenLabs API key or voice ID not configured.');
      return;
    }

    // Stop whatever is currently playing
    currentRef.current?.pause();
    currentRef.current = null;

    setSpeaking(true);
    try {
      const url = await fetchElevenLabs(text);
      const audio = new Audio(url);
      currentRef.current = audio;
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
      await audio.play();
    } catch (err) {
      console.error('ElevenLabs TTS failed:', err);
      setSpeaking(false);
    }
  }, []);

  return { speak, speaking };
};
