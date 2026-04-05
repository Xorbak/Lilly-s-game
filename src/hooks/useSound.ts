import { useCallback } from 'react';

export const useSound = () => {
  const play = useCallback((file: string) => {
    const audio = new Audio(`/sounds/${file}`);
    audio.play().catch((err) => {
      console.warn(`[useSound] Failed to play /sounds/${file}:`, err);
    });
  }, []);

  return { play };
};
