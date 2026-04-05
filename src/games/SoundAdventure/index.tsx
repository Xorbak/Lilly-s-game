import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { STAGES } from './data';
import type { Lang } from '../../types';

export const SoundAdventureHub = () => {
  const [lang, setLang] = useState<Lang>('en');
  const navigate = useNavigate();

  return (
    <Layout back sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box textAlign="center" pt={7} pb={1} px={2}>
        <Typography fontWeight={800} sx={{ fontSize: 'clamp(1.5rem,5vw,2.2rem)', color: '#FF6B6B' }}>
          🌟 {lang === 'en' ? 'Sound Adventure' : 'Klank Avontuur'}
        </Typography>
        <Typography color="#999" sx={{ fontSize: 'clamp(0.8rem,2.5vw,0.95rem)', mt: 0.5 }}>
          {lang === 'en' ? 'Learn to read, one sound at a time!' : "Leer lees, een klank op 'n slag!"}
        </Typography>
      </Box>

      {/* Language toggle */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Box
          onClick={() => setLang(l => l === 'en' ? 'af' : 'en')}
          sx={{
            px: 2.5, py: 0.9, borderRadius: 5, bgcolor: '#FF6B6B', color: '#fff',
            fontWeight: 800, cursor: 'pointer', boxShadow: 2,
            fontSize: 'clamp(0.8rem,2.5vw,0.95rem)',
            userSelect: 'none', touchAction: 'manipulation',
            '&:active': { filter: 'brightness(0.9)' },
          }}
        >
          {lang === 'en' ? '🇿🇦 Afrikaans' : '🇬🇧 English'}
        </Box>
      </Box>

      {/* Stage cards — 1 col on xs, 2 cols on sm+ */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
        gap={{ xs: 1.5, sm: 2 }}
        px={{ xs: 2, sm: 3, md: 4 }}
        pb={4}
        sx={{ maxWidth: 720, mx: 'auto', width: '100%' }}
      >
        {STAGES.map(stage => (
          <Box
            key={stage.id}
            onClick={() => stage.available && navigate(`/sound-adventure/${stage.id}`)}
            sx={{
              borderRadius: 5,
              boxShadow: stage.available ? 4 : 1,
              p: { xs: 2, sm: 2.5 },
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              cursor: stage.available ? 'pointer' : 'default',
              background: stage.available
                ? `linear-gradient(135deg, ${stage.color}ee, ${stage.color}99)`
                : 'linear-gradient(135deg, #ddd, #ccc)',
              opacity: stage.available ? 1 : 0.72,
              transition: 'transform 0.1s',
              touchAction: 'manipulation',
              '&:active': stage.available ? { transform: 'scale(0.97)' } : {},
              position: 'relative',
              minHeight: { xs: 80, sm: 120 },
            }}
          >
            {!stage.available && (
              <Box sx={{
                position: 'absolute', top: 10, right: 10,
                bgcolor: 'rgba(0,0,0,0.2)', borderRadius: '50%',
                width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <LockIcon sx={{ fontSize: 14, color: '#fff' }} />
              </Box>
            )}

            {/* Emoji + stage number */}
            <Box display="flex" flexDirection="column" alignItems="center" flexShrink={0}>
              <Typography sx={{ fontSize: 'clamp(1.8rem,5vw,2.4rem)', lineHeight: 1 }}>{stage.emoji}</Typography>
              <Box sx={{
                bgcolor: 'rgba(255,255,255,0.35)', borderRadius: 2,
                px: 0.8, py: 0.1, fontSize: '0.65rem', fontWeight: 800,
                color: stage.available ? '#333' : '#666', mt: 0.4,
              }}>
                {lang === 'en' ? `Stage ${stage.id}` : `Vlak ${stage.id}`}
              </Box>
            </Box>

            {/* Text */}
            <Box flex={1}>
              <Typography fontWeight={800} sx={{ fontSize: 'clamp(0.9rem,2.8vw,1.1rem)', color: stage.available ? '#fff' : '#888', lineHeight: 1.2 }}>
                {lang === 'en' ? stage.title_en : stage.title_af}
              </Typography>
              <Typography sx={{ fontSize: 'clamp(0.7rem,2vw,0.8rem)', color: stage.available ? 'rgba(255,255,255,0.85)' : '#aaa', lineHeight: 1.3, mt: 0.4 }}>
                {lang === 'en' ? stage.desc_en : stage.desc_af}
              </Typography>
              {!stage.available && (
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color: '#aaa', mt: 0.5 }}>
                  {lang === 'en' ? 'Coming Soon' : 'Kom Binnekort'}
                </Typography>
              )}
              {stage.available && (
                <Box sx={{
                  display: 'inline-block', mt: 0.8,
                  bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 2,
                  px: 1.2, py: 0.3, fontWeight: 800, fontSize: '0.78rem', color: '#333',
                }}>
                  {lang === 'en' ? 'Play →' : 'Speel →'}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};
