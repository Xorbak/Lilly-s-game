import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { keyframes } from '@emotion/react';
import { Layout } from '../../components/Layout';
import { useTTS } from '../../hooks/useTTS';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useSound } from '../../hooks/useSound';
import { CARDS, CATEGORIES, getWord } from './cards';
import type { Lang } from '../../types';

const confettiFall = keyframes`
  0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.2); }
`;

interface Confetti { id: number; x: number; color: string; delay: number; dur: number; }

const CONFETTI_COLORS = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#FF8B94', '#B8B5FF', '#FFB347'];
let confId = 0;

const spawnConfetti = (): Confetti[] =>
  Array.from({ length: 28 }, () => ({
    id: confId++,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.6,
    dur: 1.4 + Math.random() * 0.8,
  }));

const isMatch = (transcript: string, word: string) => {
  const t = transcript.toLowerCase().trim();
  const w = word.toLowerCase().trim();
  return t.includes(w) || w.includes(t);
};

export const Flashcards = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [category, setCategory] = useState('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showPictureFirst, setShowPictureFirst] = useState(true);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const { speak, speaking } = useTTS();
  const { listen, stop, listening, isSupported } = useSpeechRecognition();
  const { play } = useSound();

  const filtered = category === 'all' ? CARDS : CARDS.filter(c => c.category === category);
  const card = filtered[index % filtered.length];
  const word = getWord(card, lang);
  const catColor = CATEGORIES.find(c => c.id === category)?.color ?? '#B39DDB';

  // Reset flip when card or mode changes — no auto-speak
  useEffect(() => {
    setFlipped(false);
    setFeedback(null);
  }, [card.id, showPictureFirst]);

  const flipCard = () => {
    play('flashcards/flip.mp3');
    setFlipped(f => !f);
  };

  const goNext = () => {
    setFeedback(null);
    setIndex(i => (i + 1) % filtered.length);
  };

  const goPrev = () => {
    setFeedback(null);
    setIndex(i => (i - 1 + filtered.length) % filtered.length);
  };

  const changeCategory = (id: string) => {
    setCategory(id);
    setIndex(0);
    setFeedback(null);
  };

  const handleMic = () => {
    if (listening) { stop(); return; }
    listen(lang, transcript => {
      const correct = isMatch(transcript, word);
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
      setFeedback(correct ? 'correct' : 'wrong');
      if (correct) {
        play('general/correct.mp3');
        const pieces = spawnConfetti();
        setConfetti(prev => [...prev, ...pieces]);
        setTimeout(() => setConfetti(prev => prev.filter(c => !pieces.find(p => p.id === c.id))), 3500);
        setTimeout(goNext, 1400);
      } else {
        play('general/incorrect.mp3');
        setTimeout(() => setFeedback(null), 1500);
      }
    });
  };

  // Front/back content determined by mode
  const frontContent = showPictureFirst
    ? { type: 'emoji', hint_en: 'Tap to see the word', hint_af: 'Tik om die woord te sien' }
    : { type: 'word',  hint_en: 'Tap to see the picture', hint_af: 'Tik om die prent te sien' };
  const backContent = showPictureFirst ? 'word' : 'emoji';

  return (
    <Layout back sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Confetti */}
      {confetti.map(c => (
        <Box key={c.id} sx={{
          position: 'fixed', top: 0, left: `${c.x}%`,
          width: 10, height: 10, borderRadius: '50%', bgcolor: c.color,
          zIndex: 200, pointerEvents: 'none',
          animation: `${confettiFall} ${c.dur}s ease-in ${c.delay}s forwards`,
        }} />
      ))}

      {/* Top bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={1} pt={7} pb={1}>
        <Typography fontWeight={800} fontSize="1.1rem" color="#555">
          ⭐ {score.correct} / {score.total}
        </Typography>

        {/* Picture/Word first toggle */}
        <Box
          onClick={() => setShowPictureFirst(v => !v)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.8,
            px: 2, py: 0.8, borderRadius: 5, bgcolor: '#f0f0f0', fontWeight: 800,
            cursor: 'pointer', userSelect: 'none', boxShadow: 1, fontSize: '0.85rem',
            '&:active': { filter: 'brightness(0.92)' },
          }}
        >
          {showPictureFirst
            ? <><ImageIcon sx={{ fontSize: 18 }} /> {lang === 'en' ? 'Picture first' : 'Prent eerste'}</>
            : <><TextFieldsIcon sx={{ fontSize: 18 }} /> {lang === 'en' ? 'Word first' : 'Woord eerste'}</>
          }
        </Box>

        {/* Language toggle */}
        <Box
          onClick={() => setLang(l => l === 'en' ? 'af' : 'en')}
          sx={{
            px: 2, py: 0.8, borderRadius: 5, bgcolor: catColor, fontWeight: 800,
            cursor: 'pointer', userSelect: 'none', boxShadow: 2, fontSize: '0.9rem',
            '&:active': { filter: 'brightness(0.9)' },
          }}
        >
          {lang === 'en' ? '🇿🇦 AF' : '🇬🇧 EN'}
        </Box>
      </Box>

      {/* Category chips */}
      <Box display="flex" gap={1} px={1} pb={1}
        sx={{ overflowX: 'auto', flexShrink: 0, '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {CATEGORIES.map(cat => (
          <Chip
            key={cat.id}
            label={lang === 'en' ? cat.label_en : cat.label_af}
            onClick={() => changeCategory(cat.id)}
            sx={{
              flexShrink: 0, fontWeight: 800, fontSize: '0.85rem',
              bgcolor: category === cat.id ? cat.color : 'rgba(0,0,0,0.07)',
              color: category === cat.id ? '#fff' : '#555',
              boxShadow: category === cat.id ? 2 : 0,
            }}
          />
        ))}
      </Box>

      {/* Card */}
      <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center" py={1}>
        <Box sx={{ perspective: '1200px', width: { xs: 270, sm: 320 }, height: { xs: 320, sm: 380 } }}>
          <Box
            onClick={flipCard}
            sx={{
              width: '100%', height: '100%', position: 'relative',
              transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d',
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              cursor: 'pointer',
            }}
          >
            {/* Front */}
            <Box sx={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              borderRadius: 6, boxShadow: 6,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(145deg, #fff 55%, ${catColor}44)`,
              border: `4px solid ${catColor}`,
            }}>
              {frontContent.type === 'emoji' ? (
                <Typography sx={{ fontSize: '7rem', lineHeight: 1 }}>{card.emoji}</Typography>
              ) : (
                <Typography fontWeight={800} sx={{ fontSize: '3rem', color: catColor, textAlign: 'center', px: 2 }}>
                  {word}
                </Typography>
              )}
              <Typography sx={{ fontSize: '0.78rem', color: '#bbb', mt: 2.5, fontWeight: 600 }}>
                {lang === 'en' ? frontContent.hint_en : frontContent.hint_af}
              </Typography>
            </Box>

            {/* Back */}
            <Box sx={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: 6, boxShadow: 6,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(145deg, ${catColor}, ${catColor}bb)`,
            }}>
              {backContent === 'word' ? (
                <>
                  <Typography sx={{ fontSize: '5rem', lineHeight: 1, mb: 2 }}>{card.emoji}</Typography>
                  <Typography fontWeight={800} sx={{ fontSize: '3rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                    {word}
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: '7rem', lineHeight: 1 }}>{card.emoji}</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Feedback */}
      <Box textAlign="center" sx={{ minHeight: 52 }}>
        {feedback === 'correct' && (
          <Typography variant="h4" fontWeight={800}>
            ⭐ {lang === 'en' ? 'Well done!' : 'Goed gedaan!'}
          </Typography>
        )}
        {feedback === 'wrong' && (
          <Typography variant="h5" fontWeight={800} color="#FF6B6B">
            🔄 {lang === 'en' ? 'Try again!' : 'Probeer weer!'}
          </Typography>
        )}
      </Box>

      {/* Controls */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={2} pb={2}>
        <IconButton onClick={goPrev} sx={{ bgcolor: '#eee', boxShadow: 2 }} size="large">
          <ArrowBackIcon sx={{ fontSize: 32 }} />
        </IconButton>

        <IconButton
          onClick={() => speak(word, lang)}
          sx={{
            bgcolor: catColor, color: '#fff', boxShadow: 3, width: 64, height: 64,
            animation: speaking ? `${pulse} 0.7s ease-in-out infinite` : 'none',
          }}
        >
          <VolumeUpIcon sx={{ fontSize: 36 }} />
        </IconButton>

        {isSupported && (
          <IconButton
            onClick={handleMic}
            sx={{
              bgcolor: listening ? '#FF6B6B' : '#4ECDC4',
              color: '#fff', boxShadow: 3, width: 64, height: 64,
              animation: listening ? `${pulse} 0.9s ease-in-out infinite` : 'none',
            }}
          >
            <MicIcon sx={{ fontSize: 36 }} />
          </IconButton>
        )}

        <IconButton onClick={goNext} sx={{ bgcolor: '#eee', boxShadow: 2 }} size="large">
          <ArrowForwardIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      {/* Counter */}
      <Typography textAlign="center" color="#bbb" pb={1.5} fontSize="0.85rem">
        {(index % filtered.length) + 1} / {filtered.length}
      </Typography>
    </Layout>
  );
};
