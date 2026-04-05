import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from '@mui/material';
import { GAMES } from './config/games';
import { Home } from './pages/Home';

const SoundAdventureHub = lazy(() =>
  import('./games/SoundAdventure').then(m => ({ default: m.SoundAdventureHub }))
);
const Stage1 = lazy(() =>
  import('./games/SoundAdventure/Stage1').then(m => ({ default: m.Stage1 }))
);
const Stage2 = lazy(() =>
  import('./games/SoundAdventure/Stage2').then(m => ({ default: m.Stage2 }))
);

const theme = createTheme({
  typography: { fontFamily: '"Nunito", "Roboto", sans-serif' },
});

const Loader = () => (
  <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
    <CircularProgress size={80} />
  </Box>
);

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {GAMES.map(game => (
            <Route key={game.id} path={game.path} element={<game.component />} />
          ))}
          <Route path="/sound-adventure" element={<SoundAdventureHub />} />
          <Route path="/sound-adventure/1" element={<Stage1 />} />
          <Route path="/sound-adventure/2" element={<Stage2 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
);
