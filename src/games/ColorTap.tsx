import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Layout } from "../components/Layout";
import { useSound } from "../hooks/useSound";

const COLORS = [
  { name: "Red", hex: "#FF6B6B" },
  { name: "Blue", hex: "#4A90D9" },
  { name: "Green", hex: "#7BC67A" },
  { name: "Yellow", hex: "#FFE66D" },
  { name: "Purple", hex: "#B8B5FF" },
  { name: "Orange", hex: "#FFB347" },
];

const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const ColorTap = () => {
  const [target, setTarget] = useState(pick);
  const [feedback, setFeedback] = useState<"✅" | "❌" | null>(null);
  const { play } = useSound();

  const tap = (color: (typeof COLORS)[number]) => {
    if (feedback) return;
    if (color.name === target.name) {
      play("general/correct.mp3");
      setFeedback("✅");
      setTimeout(() => {
        setTarget(pick());
        setFeedback(null);
      }, 700);
    } else {
      play("general/incorrect.mp3");
      setFeedback("❌");
      setTimeout(() => setFeedback(null), 500);
    }
  };

  return (
    <Layout back>
      <Box textAlign="center" pt={2}>
        <Typography variant="h4" fontWeight={800} color="#555" mb={1}>
          Tap the colour
        </Typography>
        <Typography
          fontWeight={800}
          mb={1}
          sx={{ fontSize: 'clamp(2rem,8vw,3.75rem)', color: target.hex, textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}
        >
          {target.name}
        </Typography>
        <Typography variant="h3" mb={2} sx={{ minHeight: 56 }}>
          {feedback ?? " "}
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }} justifyContent="center">
          {COLORS.map((c) => (
            <Grid item key={c.name}>
              <Box
                onClick={() => tap(c)}
                sx={{
                  width:  { xs: 'min(26vw, 120px)', sm: 120, md: 140 },
                  height: { xs: 'min(26vw, 120px)', sm: 120, md: 140 },
                  borderRadius: 4,
                  bgcolor: c.hex,
                  cursor: "pointer",
                  boxShadow: 3,
                  touchAction: 'manipulation',
                  transition: "transform 0.08s",
                  "&:active": { transform: "scale(0.92)" },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};
