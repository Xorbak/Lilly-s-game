import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

const rise = keyframes`
  0%   { transform: translateY(0)      translateX(0);    }
  20%  { transform: translateY(-20vh)  translateX(14px); }
  40%  { transform: translateY(-40vh)  translateX(-10px);}
  60%  { transform: translateY(-60vh)  translateX(16px); }
  80%  { transform: translateY(-80vh)  translateX(-8px); }
  100% { transform: translateY(-115vh) translateX(0);    }
`;

const burst = keyframes`
  0%   { transform: scale(1);   opacity: 1; }
  30%  { transform: scale(1.5); opacity: 0.8; }
  100% { transform: scale(0);   opacity: 0; }
`;

const particleFly = keyframes`
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
`;

interface Bubble {
  id: number;
  x: number;
  size: number;
  speed: number;
  hue: number;
  popping: boolean;
}

interface PopEffect {
  id: number;
  x: number;
  y: number;
  hue: number;
}

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

let uid = 0;
let popUid = 0;

const mkBubble = (): Bubble => ({
  id: uid++,
  x: Math.random() * 82 + 5,
  size: Math.random() * 80 + 60,
  speed: Math.random() * 5 + 6,
  hue: Math.random() * 360,
  popping: false,
});

const INTERVAL_MIN = 400;
const INTERVAL_MAX = 2400;
const INTERVAL_STEP = 400;

export const BalloonPop = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [pops, setPops] = useState<PopEffect[]>([]);
  const [score, setScore] = useState(0);
  const [interval, setIntervalMs] = useState(1200);
  const { play } = useSound();
  const navigate = useNavigate();

  const spawn = useCallback((count = 1) => {
    setBubbles(prev => {
      const next = [...prev];
      for (let i = 0; i < count; i++) next.push(mkBubble());
      return next.slice(-30);
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => spawn(), interval);
    return () => clearInterval(t);
  }, [spawn, interval]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); spawn(5); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [spawn]);

  const popBubble = (id: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const bubble = bubbles.find(b => b.id === id);
    if (!bubble) return;

    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popping: true } : b));
    setPops(prev => [...prev, {
      id: popUid++,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      hue: bubble.hue,
    }]);
    play('balloon-pop/pop.mp3');
    setScore(s => s + 1);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        userSelect: 'none',
      }}
    >
      {/* HUD */}
      <Box sx={{ position: 'absolute', top: 16, left: 0, right: 0, textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          🫧 {score}
        </Typography>
      </Box>

      {/* Bubble rate controls */}
      <Box sx={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 2, zIndex: 10 }}>
        <Box
          onClick={() => setIntervalMs(i => Math.min(i + INTERVAL_STEP, INTERVAL_MAX))}
          sx={{
            px: 3, py: 1.5, borderRadius: 6, bgcolor: 'rgba(255,255,255,0.15)', color: '#fff',
            fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', userSelect: 'none',
            border: '2px solid rgba(255,255,255,0.25)',
            '&:active': { bgcolor: 'rgba(255,255,255,0.25)' },
            opacity: interval >= INTERVAL_MAX ? 0.3 : 1,
          }}
        >
          🫧 Less
        </Box>
        <Box
          onClick={() => setIntervalMs(i => Math.max(i - INTERVAL_STEP, INTERVAL_MIN))}
          sx={{
            px: 3, py: 1.5, borderRadius: 6, bgcolor: 'rgba(255,255,255,0.15)', color: '#fff',
            fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', userSelect: 'none',
            border: '2px solid rgba(255,255,255,0.25)',
            '&:active': { bgcolor: 'rgba(255,255,255,0.25)' },
            opacity: interval <= INTERVAL_MIN ? 0.3 : 1,
          }}
        >
          🫧🫧 More
        </Box>
      </Box>

      {/* Home */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', zIndex: 20, boxShadow: 2 }}
        size="large"
      >
        <HomeIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Bubbles */}
      {bubbles.map(b => (
        <Box
          key={b.id}
          onClick={e => !b.popping && popBubble(b.id, e)}
          onAnimationEnd={() => setBubbles(prev => prev.filter(x => x.id !== b.id))}
          sx={{
            position: 'absolute',
            left: `${b.x}%`,
            bottom: `-${b.size}px`,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(
              circle at 35% 28%,
              rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.6)  18%,
              hsla(${b.hue}, 85%, 65%, 0.85) 52%,
              hsla(${b.hue}, 80%, 45%, 0.95) 100%
            )`,
            border: `2px solid hsla(${b.hue}, 70%, 80%, 0.6)`,
            boxShadow: `
              inset 0 0 ${b.size * 0.2}px rgba(255,255,255,0.4),
              0 6px ${b.size * 0.5}px hsla(${b.hue}, 80%, 55%, 0.5),
              0 0 ${b.size * 0.3}px hsla(${b.hue}, 90%, 65%, 0.3)
            `,
            cursor: 'pointer',
            animation: b.popping
              ? `${burst} 0.28s ease-out forwards`
              : `${rise} ${b.speed}s ease-in-out forwards`,
          }}
        />
      ))}

      {/* Pop particle effects */}
      {pops.map(p => (
        <Box
          key={p.id}
          onAnimationEnd={() => setPops(prev => prev.filter(x => x.id !== p.id))}
          sx={{ position: 'absolute', left: p.x, top: p.y, pointerEvents: 'none', zIndex: 30 }}
        >
          {PARTICLE_ANGLES.map(angle => {
            const rad = (angle * Math.PI) / 180;
            const dist = 60 + Math.random() * 40;
            const dx = Math.round(Math.cos(rad) * dist);
            const dy = Math.round(Math.sin(rad) * dist);
            return (
              <Box
                key={angle}
                sx={{
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: `hsla(${p.hue + angle * 0.5}, 90%, 65%, 1)`,
                  transform: 'translate(-50%, -50%)',
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                  animation: `${particleFly} 0.5s ease-out forwards`,
                } as object}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
