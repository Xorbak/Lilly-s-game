import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '../config/games';
import { BigButton } from '../components/BigButton';
import { Layout } from '../components/Layout';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Box textAlign="center" pt={{ xs: 3, sm: 4 }} pb={2} px={{ xs: 1.5, sm: 2 }}>
        <Typography
          fontWeight={800}
          color="#FF6B9D"
          mb={{ xs: 3, sm: 4 }}
          sx={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)' }}
        >
          🌸 Lilly's Games 🌸
        </Typography>

        {/* ── Sound Adventure featured section ── */}
        <Box mb={{ xs: 3, sm: 4 }}>
          <Typography fontWeight={800} fontSize="0.8rem" color="#aaa" letterSpacing={2} textTransform="uppercase" mb={1.5}>
            Learning Journey
          </Typography>
          <Box
            onClick={() => navigate('/sound-adventure')}
            sx={{
              mx: 'auto',
              maxWidth: { xs: '100%', sm: 520 },
              borderRadius: 6,
              background: 'linear-gradient(135deg, #FF6B6B, #FFB347)',
              boxShadow: 5,
              p: { xs: 2, sm: 3 },
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1.5, sm: 2.5 },
              userSelect: 'none',
              touchAction: 'manipulation',
              transition: 'transform 0.12s',
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            <Typography sx={{ fontSize: 'clamp(2.2rem,7vw,3.5rem)', lineHeight: 1, flexShrink: 0 }}>🌟</Typography>
            <Box textAlign="left" flex={1} minWidth={0}>
              <Typography fontWeight={900} sx={{ fontSize: 'clamp(1.1rem,4vw,1.5rem)', color: '#fff', lineHeight: 1.1 }}>
                Sound Adventure
              </Typography>
              <Typography sx={{ fontSize: 'clamp(0.75rem,2.5vw,0.9rem)', color: 'rgba(255,255,255,0.85)', mt: 0.4 }}>
                7 stages · phonics · bilingual
              </Typography>
            </Box>
            <Box sx={{
              ml: 'auto', bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 4,
              px: { xs: 1.5, sm: 2 }, py: 0.8,
              fontWeight: 800, fontSize: 'clamp(0.85rem,2.5vw,1rem)', color: '#fff',
              flexShrink: 0,
            }}>
              Play →
            </Box>
          </Box>
        </Box>

        {/* ── Other games ── */}
        <Typography fontWeight={800} fontSize="0.8rem" color="#aaa" letterSpacing={2} textTransform="uppercase" mb={1.5}>
          Games
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          {GAMES.map(game => (
            <Grid item key={game.id}>
              <BigButton
                label={game.title}
                emoji={game.emoji}
                sx={{ bgcolor: game.color, '&:hover': { bgcolor: game.color, filter: 'brightness(0.92)' } }}
                onClick={() => navigate(game.path)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};
