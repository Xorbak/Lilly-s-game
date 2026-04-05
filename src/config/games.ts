import { lazy, ComponentType } from 'react';

export interface GameConfig {
  id: string;
  title: string;
  emoji: string;
  color: string;
  path: string;
  component: ReturnType<typeof lazy<ComponentType>>;
}

// ← Edit this array to add/remove games
export const GAMES: GameConfig[] = [
  {
    id: 'balloon-pop',
    title: 'Pop Balloons',
    emoji: '🎈',
    color: '#FF6B6B',
    path: '/balloon-pop',
    component: lazy(() => import('../games/BalloonPop').then(m => ({ default: m.BalloonPop }))),
  },
  {
    id: 'color-tap',
    title: 'Color Tap',
    emoji: '🎨',
    color: '#4ECDC4',
    path: '/color-tap',
    component: lazy(() => import('../games/ColorTap').then(m => ({ default: m.ColorTap }))),
  },
  {
    id: 'animal-sounds',
    title: 'Animal Sounds',
    emoji: '🐾',
    color: '#FFE66D',
    path: '/animal-sounds',
    component: lazy(() => import('../games/AnimalSounds').then(m => ({ default: m.AnimalSounds }))),
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    emoji: '🃏',
    color: '#B39DDB',
    path: '/flashcards',
    component: lazy(() => import('../games/Flashcards').then(m => ({ default: m.Flashcards }))),
  },
];
