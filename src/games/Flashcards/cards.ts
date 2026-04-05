import { Lang } from '../../types';

export type { Lang };

export interface FlashCard {
  id: string;
  emoji: string;
  word_en: string;
  word_af: string;
  category: string;
}

export interface Category {
  id: string;
  label_en: string;
  label_af: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all',      label_en: '⭐ All',      label_af: '⭐ Alles',    color: '#B39DDB' },
  { id: 'animals',  label_en: '🐾 Animals',  label_af: '🐾 Diere',    color: '#FFB347' },
  { id: 'fruits',   label_en: '🍎 Fruits',   label_af: '🍎 Vrugte',   color: '#FF8A80' },
  { id: 'vehicles', label_en: '🚗 Vehicles', label_af: '🚗 Voertuie', color: '#64B5F6' },
  { id: 'body',     label_en: '👁️ Body',     label_af: '👁️ Liggaam',  color: '#FFCC80' },
  { id: 'food',     label_en: '🍞 Food',     label_af: '🍞 Kos',      color: '#A5D6A7' },
  { id: 'nature',   label_en: '🌳 Nature',   label_af: '🌳 Natuur',   color: '#80CBC4' },
];

// ← Add/remove cards here
export const CARDS: FlashCard[] = [
  // Animals
  { id: 'dog',         emoji: '🐶', word_en: 'Dog',        word_af: 'Hond',        category: 'animals' },
  { id: 'cat',         emoji: '🐱', word_en: 'Cat',        word_af: 'Kat',         category: 'animals' },
  { id: 'cow',         emoji: '🐮', word_en: 'Cow',        word_af: 'Koei',        category: 'animals' },
  { id: 'horse',       emoji: '🐴', word_en: 'Horse',      word_af: 'Perd',        category: 'animals' },
  { id: 'pig',         emoji: '🐷', word_en: 'Pig',        word_af: 'Vark',        category: 'animals' },
  { id: 'duck',        emoji: '🦆', word_en: 'Duck',       word_af: 'Eend',        category: 'animals' },
  { id: 'fish',        emoji: '🐟', word_en: 'Fish',       word_af: 'Vis',         category: 'animals' },
  { id: 'bird',        emoji: '🐦', word_en: 'Bird',       word_af: 'Voël',        category: 'animals' },
  { id: 'lion',        emoji: '🦁', word_en: 'Lion',       word_af: 'Leeu',        category: 'animals' },
  { id: 'elephant',    emoji: '🐘', word_en: 'Elephant',   word_af: 'Olifant',     category: 'animals' },
  { id: 'rabbit',      emoji: '🐰', word_en: 'Rabbit',     word_af: 'Haas',        category: 'animals' },
  { id: 'frog',        emoji: '🐸', word_en: 'Frog',       word_af: 'Padda',       category: 'animals' },
  // Fruits
  { id: 'apple',       emoji: '🍎', word_en: 'Apple',      word_af: 'Appel',       category: 'fruits' },
  { id: 'banana',      emoji: '🍌', word_en: 'Banana',     word_af: 'Piesang',     category: 'fruits' },
  { id: 'orange',      emoji: '🍊', word_en: 'Orange',     word_af: 'Lemoen',      category: 'fruits' },
  { id: 'grape',       emoji: '🍇', word_en: 'Grape',      word_af: 'Druif',       category: 'fruits' },
  { id: 'strawberry',  emoji: '🍓', word_en: 'Strawberry', word_af: 'Aarbei',      category: 'fruits' },
  { id: 'watermelon',  emoji: '🍉', word_en: 'Watermelon', word_af: 'Waatlemoen',  category: 'fruits' },
  { id: 'pear',        emoji: '🍐', word_en: 'Pear',       word_af: 'Peer',        category: 'fruits' },
  { id: 'cherry',      emoji: '🍒', word_en: 'Cherry',     word_af: 'Kersie',      category: 'fruits' },
  // Vehicles
  { id: 'car',         emoji: '🚗', word_en: 'Car',        word_af: 'Motor',       category: 'vehicles' },
  { id: 'bus',         emoji: '🚌', word_en: 'Bus',        word_af: 'Bus',         category: 'vehicles' },
  { id: 'train',       emoji: '🚂', word_en: 'Train',      word_af: 'Trein',       category: 'vehicles' },
  { id: 'airplane',    emoji: '✈️', word_en: 'Airplane',   word_af: 'Vliegtuig',   category: 'vehicles' },
  { id: 'boat',        emoji: '⛵', word_en: 'Boat',       word_af: 'Boot',        category: 'vehicles' },
  { id: 'bicycle',     emoji: '🚲', word_en: 'Bicycle',    word_af: 'Fiets',       category: 'vehicles' },
  { id: 'truck',       emoji: '🚚', word_en: 'Truck',      word_af: 'Vragmotor',   category: 'vehicles' },
  { id: 'helicopter',  emoji: '🚁', word_en: 'Helicopter', word_af: 'Helikopter',  category: 'vehicles' },
  // Body
  { id: 'eye',         emoji: '👁️', word_en: 'Eye',        word_af: 'Oog',         category: 'body' },
  { id: 'nose',        emoji: '👃', word_en: 'Nose',       word_af: 'Neus',        category: 'body' },
  { id: 'mouth',       emoji: '👄', word_en: 'Mouth',      word_af: 'Mond',        category: 'body' },
  { id: 'ear',         emoji: '👂', word_en: 'Ear',        word_af: 'Oor',         category: 'body' },
  { id: 'hand',        emoji: '✋', word_en: 'Hand',       word_af: 'Hand',        category: 'body' },
  { id: 'foot',        emoji: '🦶', word_en: 'Foot',       word_af: 'Voet',        category: 'body' },
  { id: 'hair',        emoji: '💇', word_en: 'Hair',       word_af: 'Hare',        category: 'body' },
  // Food
  { id: 'bread',       emoji: '🍞', word_en: 'Bread',      word_af: 'Brood',       category: 'food' },
  { id: 'milk',        emoji: '🥛', word_en: 'Milk',       word_af: 'Melk',        category: 'food' },
  { id: 'egg',         emoji: '🥚', word_en: 'Egg',        word_af: 'Eier',        category: 'food' },
  { id: 'cheese',      emoji: '🧀', word_en: 'Cheese',     word_af: 'Kaas',        category: 'food' },
  { id: 'cake',        emoji: '🎂', word_en: 'Cake',       word_af: 'Koek',        category: 'food' },
  { id: 'soup',        emoji: '🍲', word_en: 'Soup',       word_af: 'Sop',         category: 'food' },
  // Nature
  { id: 'sun',         emoji: '☀️', word_en: 'Sun',        word_af: 'Son',         category: 'nature' },
  { id: 'moon',        emoji: '🌙', word_en: 'Moon',       word_af: 'Maan',        category: 'nature' },
  { id: 'star',        emoji: '⭐', word_en: 'Star',       word_af: 'Ster',        category: 'nature' },
  { id: 'flower',      emoji: '🌸', word_en: 'Flower',     word_af: 'Blom',        category: 'nature' },
  { id: 'tree',        emoji: '🌳', word_en: 'Tree',       word_af: 'Boom',        category: 'nature' },
  { id: 'rain',        emoji: '🌧️', word_en: 'Rain',       word_af: 'Reën',        category: 'nature' },
  { id: 'cloud',       emoji: '☁️', word_en: 'Cloud',      word_af: 'Wolk',        category: 'nature' },
  { id: 'mountain',    emoji: '⛰️', word_en: 'Mountain',   word_af: 'Berg',        category: 'nature' },
];

export const getWord = (card: FlashCard, lang: Lang) =>
  lang === 'en' ? card.word_en : card.word_af;
