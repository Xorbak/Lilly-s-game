import { useCallback } from 'react';

export const useSound = () => {
  const play = useCallback((file: string) => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/${file}`);
    audio.play().catch((err) => {
      console.warn(`[useSound] Failed to play /sounds/${file}:`, err);
    });
  }, []);

  return { play };
};
