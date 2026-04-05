import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useTTS } from "../../hooks/useTTS";
import { useSound } from "../../hooks/useSound";
import { STAGE1_EXERCISES } from "./data";
import type { Lang } from "../../types";
import type { PhonemeExercise, PhonemeOption } from "./data";

const phoneticFile = (id: string) => `phonetic/sound_${id.toLowerCase()}.mp3`;

const shake = keyframes`
  0%,100% { transform: translateX(0); }
  20%      { transform: translateX(-12px); }
  40%      { transform: translateX(12px); }
  60%      { transform: translateX(-7px); }
  80%      { transform: translateX(7px); }
`;

const pop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const confettiFall = keyframes`
  0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
`;

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
  Array.from({ length: 24 }, () => ({
    id: cid++,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.5,
    dur: 1.4 + Math.random() * 0.8,
  }));

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const buildOptions = (ex: PhonemeExercise): PhonemeOption[] =>
  shuffle([ex.correct, ...ex.distractors]);

const CARD_COLORS = ["#FFF0F0", "#F0F8FF", "#F0FFF4"];
const CARD_BORDERS = ["#FFAAA5", "#A5C8FF", "#A5E5B5"];

export const Stage2 = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>("en");
  const [exercises] = useState(() => shuffle(STAGE1_EXERCISES));
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState<PhonemeOption[]>(() =>
    buildOptions(exercises[0]),
  );
  const [selected, setSelected] = useState<PhonemeOption | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const lockRef = useRef(false);

  const { speak } = useTTS();
  const { play } = useSound();
  const ex = exercises[idx];

  const playPhoneme = useCallback(() => {
    play(phoneticFile(ex.id));
  }, [play, ex.id]);

  useEffect(() => {
    const t = setTimeout(playPhoneme, 400);
    return () => clearTimeout(t);
  }, [idx, playPhoneme]);

  const tap = (option: PhonemeOption) => {
    if (lockRef.current || selected) return;
    lockRef.current = true;
    setSelected(option);
    const word = lang === "en" ? option.word_en : option.word_af;
    speak(word, lang);
    const isCorrect = option === ex.correct;
    setTimeout(() => {
      if (isCorrect) {
        play("general/correct.mp3");
        setScore((s) => s + 1);
        const pieces = spawnConfetti();
        setConfetti((prev) => [...prev, ...pieces]);
        setTimeout(
          () =>
            setConfetti((prev) =>
              prev.filter((c) => !pieces.find((p) => p.id === c.id)),
            ),
          3200,
        );
        setTimeout(() => {
          setSelected(null);
          lockRef.current = false;
          if (idx + 1 >= exercises.length) {
            setDone(true);
          } else {
            const next = idx + 1;
            setIdx(next);
            setOptions(buildOptions(exercises[next]));
          }
        }, 1200);
      } else {
        play("general/incorrect.mp3");
        setTimeout(() => {
          setSelected(null);
          lockRef.current = false;
        }, 1000);
      }
    }, 350);
  };

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
        <Typography fontSize="6rem" lineHeight={1}>
          🎉
        </Typography>
        <Typography fontWeight={900} fontSize="2.5rem" color="#FF6B6B" mt={1}>
          {lang === "en" ? "Amazing!" : "Fantasties!"}
        </Typography>
        <Typography fontWeight={800} fontSize="1.4rem" color="#555" mt={1}>
          {score} / {exercises.length} {lang === "en" ? "correct" : "korrek"}
        </Typography>
        <Box
          onClick={() => navigate("/sound-adventure")}
          sx={{
            mt: 5,
            px: 5,
            py: 2.5,
            bgcolor: "#FF6B6B",
            color: "#fff",
            borderRadius: 6,
            fontWeight: 800,
            fontSize: "1.3rem",
            cursor: "pointer",
            boxShadow: 4,
            "&:active": { filter: "brightness(0.9)" },
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
      }}
    >
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        pt={7}
        pb={1}
      >
        <Typography fontWeight={800} fontSize="1.1rem" color="#555">
          ⭐ {score} / {exercises.length}
        </Typography>
        <Box display="flex" gap={0.7} alignItems="center">
          {exercises.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: i === idx ? 14 : 10,
                height: i === idx ? 14 : 10,
                borderRadius: "50%",
                bgcolor: i < idx ? "#FF6B6B" : i === idx ? "#FFB347" : "#ddd",
                transition: "all 0.3s",
              }}
            />
          ))}
        </Box>
        <Box
          onClick={() => setLang((l) => (l === "en" ? "af" : "en"))}
          sx={{
            px: 2,
            py: 0.7,
            borderRadius: 5,
            bgcolor: "#FF6B6B",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: "0.9rem",
            userSelect: "none",
            "&:active": { filter: "brightness(0.9)" },
          }}
        >
          {lang === "en" ? "🇿🇦 AF" : "🇬🇧 EN"}
        </Box>
      </Box>
      <Typography
        textAlign="center"
        fontWeight={700}
        fontSize="1.15rem"
        color="#666"
        px={2}
        mt={1}
      >
        {lang === "en" ? "Which one starts with..." : "Watter een begin met..."}
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Typography
          fontWeight={900}
          sx={{
            fontSize: "clamp(2.5rem,10vw,3.8rem)",
            color: "#FF6B6B",
            textShadow: "0 4px 16px rgba(255,107,107,0.3)",
            letterSpacing: 3,
            lineHeight: 1,
          }}
        >
          {ex.label}
        </Typography>
        <IconButton
          onClick={playPhoneme}
          sx={{
            mt: 1,
            bgcolor: "#FF6B6B",
            color: "#fff",
            boxShadow: 3,
            width: { xs: 52, sm: 58 },
            height: { xs: 52, sm: 58 },
            touchAction: "manipulation",
            "&:active": { filter: "brightness(0.85)" },
          }}
        >
          <VolumeUpIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={{ xs: 1.5, sm: 2 }}
        px={{ xs: 1.5, sm: 2 }}
        pb={2}
        sx={{ maxWidth: 560, mx: "auto", width: "100%" }}
      >
        {options.map((option, i) => {
          const word = lang === "en" ? option.word_en : option.word_af;
          const isSelected = selected === option;
          const isCorrect = option === ex.correct;
          const isWrong = isSelected && !isCorrect;
          const isRight = isSelected && isCorrect;
          return (
            <Box
              key={option.emoji}
              onClick={() => tap(option)}
              sx={{
                borderRadius: 6,
                px: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 2 },
                display: "flex",
                alignItems: "center",
                gap: { xs: 2, sm: 3 },
                cursor: "pointer",
                boxShadow: isRight ? 6 : isWrong ? 2 : 4,
                bgcolor: isRight
                  ? "#C8F7C5"
                  : isWrong
                    ? "#FFE0E0"
                    : CARD_COLORS[i % CARD_COLORS.length],
                border: `3px solid ${isRight ? "#5DBF55" : isWrong ? "#FF6B6B" : CARD_BORDERS[i % CARD_BORDERS.length]}`,
                animation: isWrong
                  ? `${shake} 0.55s ease`
                  : isRight
                    ? `${pop} 0.4s ease`
                    : "none",
                transition: "background-color 0.2s, border-color 0.2s",
                userSelect: "none",
                touchAction: "manipulation",
                minHeight: { xs: 90, sm: 110 },
                "&:active": { transform: "scale(0.97)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "clamp(3rem,10vw,5rem)",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {option.emoji}
              </Typography>
              <Typography
                fontWeight={900}
                sx={{
                  fontSize: "clamp(1.3rem,5vw,2rem)",
                  color: isRight ? "#2E7D32" : isWrong ? "#C62828" : "#333",
                }}
              >
                {word}
              </Typography>
              {isRight && (
                <Typography
                  sx={{ fontSize: "clamp(1.3rem,5vw,2rem)", ml: "auto" }}
                >
                  ✅
                </Typography>
              )}
              {isWrong && (
                <Typography
                  sx={{ fontSize: "clamp(1.3rem,5vw,2rem)", ml: "auto" }}
                >
                  ❌
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
      <Box display="flex" justifyContent="center" pb={3} mt="auto">
        <Box
          onClick={() => navigate("/sound-adventure")}
          display="flex"
          alignItems="center"
          gap={0.5}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: 5,
            bgcolor: "#f0f0f0",
            cursor: "pointer",
            fontWeight: 700,
            color: "#999",
            fontSize: "0.95rem",
            "&:active": { filter: "brightness(0.92)" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          {lang === "en" ? "Stages" : "Vlakke"}
        </Box>
      </Box>
    </Layout>
  );
};
