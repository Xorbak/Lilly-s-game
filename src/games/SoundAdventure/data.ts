export interface PhonemeOption {
  emoji: string;
  word_en: string;
  word_af: string;
}

export interface PhonemeExercise {
  id: string;
  /** Display label shown on screen */
  label: string;
  correct: PhonemeOption;
  distractors: [PhonemeOption, PhonemeOption];
}

export const STAGE1_EXERCISES: PhonemeExercise[] = [
  {
    id: "m", label: "mmm",
    correct:     { emoji: "🌙", word_en: "moon", word_af: "maan" },
    distractors: [{ emoji: "🐶", word_en: "dog",  word_af: "hond" },
                  { emoji: "⭐", word_en: "star", word_af: "ster" }],
  },
  {
    id: "s", label: "sss",
    correct:     { emoji: "☀️", word_en: "sun",  word_af: "son"  },
    distractors: [{ emoji: "🐈", word_en: "cat",  word_af: "kat"  },
                  { emoji: "⚽", word_en: "ball", word_af: "bal"  }],
  },
  {
    id: "k", label: "k",
    correct:     { emoji: "🐈", word_en: "cat",  word_af: "kat"  },
    distractors: [{ emoji: "🐟", word_en: "fish", word_af: "vis"  },
                  { emoji: "🌙", word_en: "moon", word_af: "maan" }],
  },
  {
    id: "b", label: "b",
    correct:     { emoji: "🐻", word_en: "bear", word_af: "beer" },
    distractors: [{ emoji: "☀️", word_en: "sun",  word_af: "son"  },
                  { emoji: "🌳", word_en: "tree", word_af: "boom" }],
  },
  {
    id: "t", label: "t",
    correct:     { emoji: "🐯", word_en: "tiger", word_af: "tier" },
    distractors: [{ emoji: "🐟", word_en: "fish",  word_af: "vis"  },
                  { emoji: "⚽", word_en: "ball",  word_af: "bal"  }],
  },
  {
    id: "l", label: "lll",
    correct:     { emoji: "🦁", word_en: "lion", word_af: "leeu" },
    distractors: [{ emoji: "🐶", word_en: "dog",  word_af: "hond" },
                  { emoji: "⭐", word_en: "star", word_af: "ster" }],
  },
  {
    id: "n", label: "nnn",
    correct:     { emoji: "👃", word_en: "nose", word_af: "neus" },
    distractors: [{ emoji: "🐈", word_en: "cat",  word_af: "kat"  },
                  { emoji: "🌳", word_en: "tree", word_af: "boom" }],
  },
  {
    id: "r", label: "rrr",
    correct:     { emoji: "🌧️", word_en: "rain", word_af: "reën" },
    distractors: [{ emoji: "🦁", word_en: "lion", word_af: "leeu" },
                  { emoji: "⚽", word_en: "ball", word_af: "bal"  }],
  },
];

export interface StageInfo {
  id: number;
  emoji: string;
  title_en: string;
  title_af: string;
  desc_en: string;
  desc_af: string;
  color: string;
  available: boolean;
}

export const STAGES: StageInfo[] = [
  {
    id: 1,
    emoji: '⌨️',
    title_en: 'Key Match',
    title_af: 'Sleutel Passing',
    desc_en: 'Hear the sound — press the matching letter!',
    desc_af: 'Hoor die klank — druk die regte letter!',
    color: '#FFB347',
    available: true,
  },
  {
    id: 2,
    emoji: '🔊',
    title_en: 'Sound Awareness',
    title_af: 'Klankbewustheid',
    desc_en: 'Find the picture that starts with the sound',
    desc_af: 'Vind die prentjie wat met die klank begin',
    color: '#FF6B6B',
    available: true,
  },
  {
    id: 3,
    emoji: '🔤',
    title_en: 'Sound & Letter',
    title_af: 'Klank & Letter',
    desc_en: 'Match sounds to the letters that make them',
    desc_af: 'Koppel klanke aan die letters',
    color: '#FFE66D',
    available: false,
  },
  {
    id: 4,
    emoji: '🔁',
    title_en: 'Sound Families',
    title_af: 'Klankfamilies',
    desc_en: 'One sound, many different spellings',
    desc_af: 'Een klank, baie spellings',
    color: '#9BC53D',
    available: false,
  },
  {
    id: 5,
    emoji: '🧱',
    title_en: 'Word Building',
    title_af: 'Woordbou',
    desc_en: 'Blend sounds together into words',
    desc_af: 'Meng klanke saam tot woorde',
    color: '#7BC67A',
    available: false,
  },
  {
    id: 6,
    emoji: '📖',
    title_en: 'Reading',
    title_af: 'Lees',
    desc_en: 'Read simple sentences and match pictures',
    desc_af: 'Lees eenvoudige sinne',
    color: '#4ECDC4',
    available: false,
  },
  {
    id: 7,
    emoji: '✍️',
    title_en: 'Writing',
    title_af: 'Skryf',
    desc_en: 'Spell words from the sounds you hear',
    desc_af: 'Spel woorde van die klanke wat jy hoor',
    color: '#B8B5FF',
    available: false,
  },
];
