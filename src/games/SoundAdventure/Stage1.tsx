import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useSound } from "../../hooks/useSound";
import { useTTS } from "../../hooks/useTTS";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import type { Lang } from "../../types";

const phoneticFile = (letter: string) =>
  `phonetic/sound_${letter.toLowerCase()}.mp3`;

// ─── Letter data ─────────────────────────────────────────────────────────────

interface LetterData {
  letter: string;
  sound: string;
  emoji: string;
  word_en: string;
  word_af: string;
  color: string;
}

const LETTERS: LetterData[] = [
  {
    letter: "A",
    sound: "aaa",
    emoji: "🍎",
    word_en: "apple",
    word_af: "appel",
    color: "#FF6B6B",
  },
  {
    letter: "B",
    sound: "b. b. b.",
    emoji: "🐻",
    word_en: "bear",
    word_af: "beer",
    color: "#FF8E53",
  },
  {
    letter: "C",
    sound: "k. k. k.",
    emoji: "🐱",
    word_en: "cat",
    word_af: "kat",
    color: "#FFB347",
  },
  {
    letter: "D",
    sound: "d. d. d.",
    emoji: "🐶",
    word_en: "dog",
    word_af: "hond",
    color: "#FFD700",
  },
  {
    letter: "E",
    sound: "eee",
    emoji: "🥚",
    word_en: "egg",
    word_af: "eier",
    color: "#9BC53D",
  },
  {
    letter: "F",
    sound: "fff. fff. fff.",
    emoji: "🐟",
    word_en: "fish",
    word_af: "vis",
    color: "#7BC67A",
  },
  {
    letter: "G",
    sound: "g. g. g.",
    emoji: "🍇",
    word_en: "grapes",
    word_af: "druiwe",
    color: "#4ECDC4",
  },
  {
    letter: "H",
    sound: "hhh. hhh. hhh.",
    emoji: "🏠",
    word_en: "house",
    word_af: "huis",
    color: "#45B7D1",
  },
  {
    letter: "I",
    sound: "iii",
    emoji: "🐛",
    word_en: "insect",
    word_af: "insek",
    color: "#4A90D9",
  },
  {
    letter: "J",
    sound: "j. j. j.",
    emoji: "🎷",
    word_en: "jazz",
    word_af: "jazz",
    color: "#7B68EE",
  },
  {
    letter: "K",
    sound: "k. k. k.",
    emoji: "🪁",
    word_en: "kite",
    word_af: "vlieër",
    color: "#9B59B6",
  },
  {
    letter: "L",
    sound: "lll. lll. lll.",
    emoji: "🦁",
    word_en: "lion",
    word_af: "leeu",
    color: "#B8B5FF",
  },
  {
    letter: "M",
    sound: "mmm. mmm. mmm.",
    emoji: "🌙",
    word_en: "moon",
    word_af: "maan",
    color: "#FF8B94",
  },
  {
    letter: "N",
    sound: "nnn. nnn. nnn.",
    emoji: "👃",
    word_en: "nose",
    word_af: "neus",
    color: "#FF6B9D",
  },
  {
    letter: "O",
    sound: "ooo",
    emoji: "🐙",
    word_en: "octopus",
    word_af: "seekat",
    color: "#FF9FF3",
  },
  {
    letter: "P",
    sound: "p. p. p.",
    emoji: "🐷",
    word_en: "pig",
    word_af: "vark",
    color: "#FF6B6B",
  },
  {
    letter: "Q",
    sound: "kw. kw. kw.",
    emoji: "👑",
    word_en: "queen",
    word_af: "koningin",
    color: "#FFB347",
  },
  {
    letter: "R",
    sound: "rrr. rrr. rrr.",
    emoji: "🌈",
    word_en: "rainbow",
    word_af: "reënboog",
    color: "#FFE66D",
  },
  {
    letter: "S",
    sound: "sss. sss. sss.",
    emoji: "☀️",
    word_en: "sun",
    word_af: "son",
    color: "#7BC67A",
  },
  {
    letter: "T",
    sound: "t. t. t.",
    emoji: "🐯",
    word_en: "tiger",
    word_af: "tier",
    color: "#4ECDC4",
  },
  {
    letter: "U",
    sound: "uuu",
    emoji: "☂️",
    word_en: "umbrella",
    word_af: "sambreel",
    color: "#4A90D9",
  },
  {
    letter: "V",
    sound: "vvv. vvv. vvv.",
    emoji: "🚐",
    word_en: "van",
    word_af: "van",
    color: "#B8B5FF",
  },
  {
    letter: "W",
    sound: "wuh. wuh. wuh.",
    emoji: "🐺",
    word_en: "wolf",
    word_af: "wolf",
    color: "#FF8B94",
  },
  {
    letter: "X",
    sound: "ks. ks. ks.",
    emoji: "🎸",
    word_en: "xylophone",
    word_af: "xilofoon",
    color: "#FF6B6B",
  },
  {
    letter: "Y",
    sound: "yuh. yuh. yuh.",
    emoji: "🪀",
    word_en: "yo-yo",
    word_af: "jo-jo",
    color: "#FFB347",
  },
  {
    letter: "Z",
    sound: "zzz. zzz. zzz.",
    emoji: "🦓",
    word_en: "zebra",
    word_af: "sebra",
    color: "#7BC67A",
  },
];

// ─── Animations ──────────────────────────────────────────────────────────────

const bounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  40%       { transform: translateY(-12px) scale(1.05); }
  70%       { transform: translateY(-5px) scale(1.02); }
`;
const shake = keyframes`
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-10px); }
  40%     { transform: translateX(10px); }
  60%     { transform: translateX(-6px); }
  80%     { transform: translateX(6px); }
`;
const confettiFall = keyframes`
  0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#FF6B6B",
  "#FFE66D",
  "#4ECDC4",
  "#FF8B94",
  "#B8B5FF",
  "#FFB347",
];
interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  dur: number;
}
let cid = 0;
const spawnConfetti = (): Confetti[] =>
  Array.from({ length: 28 }, () => ({
    id: cid++,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.5,
    dur: 1.4 + Math.random() * 0.8,
  }));

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

type Mode = "alpha" | "random" | "explore";
type Difficulty = "easy" | "challenge";
type Feedback = "correct" | "wrong" | null;

// ─── Component ───────────────────────────────────────────────────────────────

export const Stage1 = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<Mode>("alpha");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [order, setOrder] = useState<number[]>(() => LETTERS.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [micReady, setMicReady] = useState(false);
  const [bouncing, setBouncing] = useState(true);
  const lockRef = useRef(false);

  const { play } = useSound();
  const { speak } = useTTS();
  const { listen, stop, listening, isSupported } = useSpeechRecognition();
  const current = LETTERS[order[pos]];

  useEffect(() => {
    setPos(0);
    setFeedback(null);
    setDone(false);
    setScore({ correct: 0, total: 0 });
    lockRef.current = false;
    setMicReady(false);
    setOrder(
      mode === "random"
        ? shuffle(LETTERS.map((_, i) => i))
        : LETTERS.map((_, i) => i),
    );
  }, [mode]);

  // Play pre-recorded phonetic file for the current letter
  const playSound = useCallback(() => {
    play(phoneticFile(current.letter));
  }, [play, current.letter]);

  useEffect(() => {
    setBouncing(true);
    const t1 = setTimeout(playSound, 350);
    const t2 = setTimeout(() => setBouncing(false), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pos, playSound]);

  const advance = () => {
    setFeedback(null);
    setMicReady(false);
    lockRef.current = false;
    if (pos + 1 >= order.length) setDone(true);
    else setPos((p) => p + 1);
  };

  const handleCorrect = () => {
    play("general/correct.mp3");
    setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
    setFeedback("correct");
    const pieces = spawnConfetti();
    setConfetti((prev) => [...prev, ...pieces]);
    setTimeout(
      () =>
        setConfetti((prev) =>
          prev.filter((c) => !pieces.find((p) => p.id === c.id)),
        ),
      3200,
    );
    setTimeout(advance, 1200);
  };

  const handleWrong = () => {
    play("general/incorrect.mp3");
    setScore((s) => ({ ...s, total: s.total + 1 }));
    setFeedback("wrong");
    setTimeout(() => playSound(), 400);
    setTimeout(() => {
      setFeedback(null);
      lockRef.current = false;
    }, 1100);
  };

  const pressLetter = useCallback(
    (key: string) => {
      const upper = key.toUpperCase();
      if (mode === "explore") {
        const idx = LETTERS.findIndex((l) => l.letter === upper);
        if (idx !== -1) setPos(idx);
        return;
      }
      if (lockRef.current || feedback) return;
      if (upper === current.letter) {
        if (difficulty === "easy") {
          lockRef.current = true;
          handleCorrect();
        } else setMicReady(true);
      } else if (upper.length === 1 && upper >= "A" && upper <= "Z") {
        lockRef.current = true;
        handleWrong();
      }
    },
    [current.letter, difficulty, feedback, mode],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => pressLetter(e.key);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pressLetter]);

  const handleMic = () => {
    if (listening) {
      stop();
      return;
    }
    listen(lang, (transcript) => {
      stop();
      setMicReady(false);
      lockRef.current = true;
      const t = transcript.toLowerCase().trim();
      const word = lang === "en" ? current.word_en : current.word_af;
      if (
        t.startsWith(current.letter.toLowerCase()) ||
        t.includes(word.toLowerCase())
      )
        handleCorrect();
      else handleWrong();
    });
  };

  const word = lang === "en" ? current.word_en : current.word_af;

  if (done) {
    return (
      <Layout
        back
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography sx={{ fontSize: "clamp(4rem,15vw,6rem)", lineHeight: 1 }}>
          🎉
        </Typography>
        <Typography
          fontWeight={900}
          sx={{ fontSize: "clamp(1.6rem,5vw,2.5rem)", color: "#FFB347", mt: 1 }}
        >
          {lang === "en" ? "All done!" : "Klaar!"}
        </Typography>
        <Typography
          fontWeight={800}
          sx={{ fontSize: "clamp(1rem,3.5vw,1.4rem)", color: "#555", mt: 1 }}
        >
          {score.correct} / {score.total} {lang === "en" ? "correct" : "korrek"}
        </Typography>
        <Box
          onClick={() => navigate("/sound-adventure")}
          sx={{
            mt: 5,
            px: { xs: 4, sm: 5 },
            py: { xs: 2, sm: 2.5 },
            bgcolor: "#FFB347",
            color: "#fff",
            borderRadius: 6,
            fontWeight: 800,
            fontSize: "clamp(1rem,3.5vw,1.3rem)",
            cursor: "pointer",
            boxShadow: 4,
            "&:active": { filter: "brightness(0.9)" },
            touchAction: "manipulation",
          }}
        >
          {lang === "en" ? "← Stages" : "← Vlakke"}
        </Box>
      </Layout>
    );
  }

  return (
    <Layout
      back
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
        bgcolor: "#FFF9F0",
      }}
    >
      {/* Confetti */}
      {confetti.map((c) => (
        <Box
          key={c.id}
          sx={{
            position: "fixed",
            top: 0,
            left: `${c.x}%`,
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: c.color,
            zIndex: 200,
            pointerEvents: "none",
            animation: `${confettiFall} ${c.dur}s ease-in ${c.delay}s forwards`,
          }}
        />
      ))}

      {/* ── Top bar ── */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{ xs: 1.5, sm: 2 }}
        pt={7}
        pb={0.5}
        gap={1}
        flexWrap="wrap"
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          size="small"
          onChange={(_, v) => v && setMode(v)}
          sx={{ bgcolor: "#fff", borderRadius: 3, boxShadow: 1 }}
        >
          <ToggleButton
            value="alpha"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              px: 1.5,
            }}
          >
            A→Z
          </ToggleButton>
          <ToggleButton
            value="random"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              px: 1.5,
            }}
          >
            🔀
          </ToggleButton>
          <ToggleButton
            value="explore"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              px: 1.5,
            }}
          >
            🔍
          </ToggleButton>
        </ToggleButtonGroup>

        {mode !== "explore" && (
          <Typography
            fontWeight={800}
            fontSize={{ xs: "0.95rem", sm: "1rem" }}
            color="#555"
          >
            ⭐ {score.correct}/{order.length}
          </Typography>
        )}

        {mode !== "explore" && (
          <ToggleButtonGroup
            value={difficulty}
            exclusive
            size="small"
            onChange={(_, v) => v && setDifficulty(v)}
            sx={{ bgcolor: "#fff", borderRadius: 3, boxShadow: 1 }}
          >
            <ToggleButton
              value="easy"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                px: 1.5,
              }}
            >
              {lang === "en" ? "Easy" : "Maklik"}
            </ToggleButton>
            <ToggleButton
              value="challenge"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                px: 1.5,
              }}
            >
              🎤
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      {/* ── Progress bar ── */}
      {mode !== "explore" && (
        <Box
          mx={{ xs: 1.5, sm: 2 }}
          mb={1}
          mt={0.5}
          height={6}
          borderRadius={3}
          bgcolor="#eee"
        >
          <Box
            height="100%"
            borderRadius={3}
            bgcolor={current.color}
            sx={{
              width: `${(pos / order.length) * 100}%`,
              transition: "width 0.5s ease",
            }}
          />
        </Box>
      )}

      {/* ── Letter card + example word ── */}
      <Box display="flex" flexDirection="column" alignItems="center" px={2}>
        {/* Letter tile */}
        <Box
          sx={{
            width: { xs: "min(42vw, 150px)", sm: 180, md: 210 },
            height: { xs: "min(42vw, 150px)", sm: 180, md: 210 },
            borderRadius: { xs: 5, sm: 8 },
            bgcolor: current.color,
            boxShadow: `0 8px 32px ${current.color}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: bouncing
              ? `${bounce} 0.9s ease`
              : feedback === "wrong"
                ? `${shake} 0.5s ease`
                : "none",
            border:
              feedback === "correct"
                ? "4px solid #5DBF55"
                : feedback === "wrong"
                  ? "4px solid #FF6B6B"
                  : "4px solid transparent",
            transition: "border-color 0.2s",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "clamp(3.5rem, 12vw, 6.5rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              textShadow: "0 3px 10px rgba(0,0,0,0.15)",
            }}
          >
            {current.letter}
          </Typography>
        </Box>

        {/* Example word card — tap to hear the word */}
        <Box
          onClick={() => speak(word, lang)}
          sx={{
            mt: { xs: 1.5, sm: 2 },
            bgcolor: "#fff",
            borderRadius: 5,
            px: { xs: 3, sm: 4 },
            py: { xs: 1.5, sm: 2 },
            boxShadow: 3,
            border: `3px solid ${current.color}55`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: { xs: 160, sm: 200 },
            cursor: "pointer",
            touchAction: "manipulation",
            userSelect: "none",
            transition: "transform 0.1s, box-shadow 0.1s",
            "&:active": { transform: "scale(0.95)", boxShadow: 1 },
          }}
        >
          <Typography
            sx={{ fontSize: "clamp(3rem, 10vw, 5rem)", lineHeight: 1 }}
          >
            {current.emoji}
          </Typography>
          <Typography
            fontWeight={900}
            sx={{
              fontSize: "clamp(1.3rem, 4.5vw, 2rem)",
              color: "#333",
              mt: 0.5,
              letterSpacing: 1,
            }}
          >
            {word}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: current.color, fontWeight: 700, mt: 0.5, opacity: 0.8 }}>
            🔊 tap to hear
          </Typography>
        </Box>

        {/* Controls row: replay + lang */}
        <Box display="flex" gap={2} mt={{ xs: 1.5, sm: 2 }} alignItems="center">
          <IconButton
            onClick={playSound}
            sx={{
              bgcolor: current.color,
              color: "#fff",
              boxShadow: 3,
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              touchAction: "manipulation",
              "&:active": { filter: "brightness(0.85)" },
            }}
          >
            <VolumeUpIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
          </IconButton>
          <Box
            onClick={() => setLang((l) => (l === "en" ? "af" : "en"))}
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 5,
              bgcolor: current.color,
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              userSelect: "none",
              touchAction: "manipulation",
              "&:active": { filter: "brightness(0.9)" },
            }}
          >
            {lang === "en" ? "🇿🇦 AF" : "🇬🇧 EN"}
          </Box>
        </Box>
      </Box>

      {/* ── Instruction ── */}
      <Typography
        textAlign="center"
        fontWeight={700}
        sx={{
          fontSize: { xs: "0.85rem", sm: "1rem" },
          color: "#888",
          mt: 1,
          mb: 0.5,
          px: 2,
        }}
      >
        {mode === "explore"
          ? lang === "en"
            ? "Tap any letter to explore!"
            : "Tik enige letter om te verken!"
          : micReady
            ? lang === "en"
              ? "🎤 Now say the sound!"
              : "🎤 Sê nou die klank!"
            : lang === "en"
              ? "Tap or press the matching letter!"
              : "Tik of druk die regte letter!"}
      </Typography>

      {/* Challenge mic */}
      {difficulty === "challenge" && micReady && isSupported && (
        <Box display="flex" justifyContent="center" mb={1}>
          <IconButton
            onClick={handleMic}
            sx={{
              bgcolor: listening ? "#FF6B6B" : "#4ECDC4",
              color: "#fff",
              width: { xs: 64, sm: 72 },
              height: { xs: 64, sm: 72 },
              boxShadow: 4,
              touchAction: "manipulation",
              animation: listening
                ? `${bounce} 1s ease-in-out infinite`
                : "none",
            }}
          >
            <MicIcon sx={{ fontSize: { xs: 34, sm: 38 } }} />
          </IconButton>
        </Box>
      )}

      {/* ── Alphabet grid — flex-wrap, fluid tile size ── */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={{ xs: 0.6, sm: 1 }}
        px={{ xs: 1, sm: 2 }}
        pb={2}
        mt="auto"
        sx={{ maxWidth: 680, mx: "auto", width: "100%" }}
      >
        {LETTERS.map((ld) => {
          const isTarget = ld.letter === current.letter;
          const isWrong = mode !== "explore" && feedback === "wrong" && isTarget;
          const isRight = mode !== "explore" && feedback === "correct" && isTarget;
          return (
            <Box
              key={ld.letter}
              onClick={() => pressLetter(ld.letter)}
              sx={{
                // Fluid size: fills available width so all 26 fit without overflow
                width: "clamp(36px, 10.5vw, 56px)",
                height: "clamp(36px, 10.5vw, 56px)",
                borderRadius: { xs: 2, sm: 3 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "clamp(0.85rem, 2.8vw, 1.3rem)",
                cursor: "pointer",
                touchAction: "manipulation",
                userSelect: "none",
                bgcolor: isRight
                  ? "#C8F7C5"
                  : isWrong
                    ? "#FFE0E0"
                    : isTarget
                      ? ld.color
                      : "#fff",
                color: isTarget && !isRight && !isWrong ? "#fff" : "#444",
                boxShadow: isTarget ? 4 : 1,
                border: `2px solid ${isRight ? "#5DBF55" : isWrong ? "#FF6B6B" : isTarget ? ld.color : "#eee"}`,
                transform: isTarget ? "scale(1.14)" : "scale(1)",
                transition: "all 0.2s",
                "&:active": { transform: "scale(0.92)" },
              }}
            >
              {ld.letter}
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};
