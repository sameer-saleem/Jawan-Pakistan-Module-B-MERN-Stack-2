// src/components/game/GameSummary.jsx
import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Chip, Divider, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function GameSummary({ summary, onRetry, onNext }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [previous, setPrevious] = useState(null);

  console.log("GameSummary received summary:", summary);
  const { won, score, totalScore, avgReactionTime, targetColor = "RED" } = summary;
  console.log("Destructured values - won:", won, "score:", score, "totalScore:", totalScore);

  // Fetch previous best from Firebase
  useEffect(() => {
    const fetchPrev = async () => {
      if (!user) return;
      const docRef = doc(db, "scores", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data().level1) {
        setPrevious(snap.data().level1);
      }
    };
    fetchPrev();
  }, [user]);

  // Current Date & Time — Exactly as in PDF
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }); // 29 Nov 2025
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Dynamic AI Tips — From your PDF
  const aiTips = [
    "Try focusing more on the upper-right area next time.",
    "You tend to miss balloons on the left side — scan the full screen!",
    "Great focus in the center! Now improve your peripheral vision.",
    "Your reaction time is improving — excellent consistency!",
    "Try moving your mouse in smooth waves instead of chasing balloons.",
    "Pro tip: Anticipate where balloons will appear next.",
    "You're getting faster every session — amazing progress!",
    "Stay calm and hover decisively — speed comes with confidence.",
  ];

  const generateAITip = () => {
    if (!won) return "Only hover on the target color! You lost lives on wrong balloons.";

    if (avgReactionTime < 450) return "Lightning-fast reactions! You're in the top 1% of players!";
    if (avgReactionTime > 850) return "Take a deep breath — accuracy first, then speed will come.";

    if (previous && avgReactionTime < previous.avgReactionTime) {
      return `Outstanding improvement! ${Math.round(previous.avgReactionTime - avgReactionTime)}ms faster than last time!`;
    }

    return aiTips[Math.floor(Math.random() * aiTips.length)];
  };

  const improvementText = previous
    ? avgReactionTime < previous.avgReactionTime
      ? `Faster than last time! (-${Math.round(previous.avgReactionTime - avgReactionTime)}ms)`
      : `Slower than last time (+${Math.round(avgReactionTime - previous.avgReactionTime)}ms)`
    : "First time playing — welcome!";

  const lastPlayed = previous
    ? new Date(previous.completedAt?.seconds * 1000 || previous.completedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never played before";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          maxWidth: 800,
          width: "100%",
          p: { xs: 4, md: 8 },
          borderRadius: 6,
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
        }}
      >
        {/* Header with Date & Time — EXACTLY LIKE PDF */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h6" color="text.secondary" fontWeight="bold">
            Date: {dateStr} | Time: {timeStr}
          </Typography>
          <Typography variant="h3" fontWeight="900" color="#2c3e50" mt={1}>
            Pop A Balloon Game — Level {summary.level || 1} Summary
          </Typography>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#ddd" }} />

        {/* Win/Lose + Target Color */}
        <Typography
          variant="h2"
          fontWeight={900}
          textAlign="center"
          color={won ? "#2ecc71" : "#e74c3c"}
          gutterBottom
        >
          {won ? `LEVEL ${summary.level || 1} COMPLETED!` : "GAME OVER"}
        </Typography>

        <Chip
          label={`Target Color: ${targetColor}`}
          color="primary"
          size="large"
          sx={{ fontSize: 22, py: 3, px: 5, mb: 4 }}
        />

        <Alert severity={won ? "success" : "error"} sx={{ mb: 5, py: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            You popped <span style={{ color: "#e74c3c", fontSize: "1.4em" }}>{score}</span> correct {targetColor} balloons!
          </Typography>
        </Alert>

        {/* Stats Grid */}
        <Box sx={{ background: "#f8f9fa", p: 5, borderRadius: 4, mb: 5 }}>
          <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
            Player Performance Summary
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4, mt: 4 }}>
            <Box>
              <Typography variant="h6" color="text.secondary">Correct Balloons Hit</Typography>
              <Typography variant="h3" color="#2ecc71" fontWeight="bold">{score}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary">Total Balloons Popped</Typography>
              <Typography variant="h3" color="#e67e22" fontWeight="bold">{totalScore}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary">Average Reaction Time</Typography>
              <Typography variant="h3" color="#3498db" fontWeight="bold">{avgReactionTime} ms</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary">Compared to Last Session</Typography>
              <Typography variant="h4" fontWeight="bold" color={previous && avgReactionTime < previous.avgReactionTime ? "#2ecc71" : "#e67e22"}>
                {improvementText}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary">Last Played</Typography>
              <Typography variant="h5" fontWeight="bold" color="#9b59b6">
                {lastPlayed}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* AI-Powered Insight — FROM YOUR PDF */}
        <Paper elevation={8} sx={{ background: "linear-gradient(45deg, #667eea, #764ba2)", color: "white", p: 5, borderRadius: 5 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            AI-Powered Performance Insight
          </Typography>
          <Typography variant="h6" fontStyle="italic" sx={{ fontSize: "1.4rem", lineHeight: 1.8 }}>
            "{generateAITip()}"
          </Typography>
        </Paper>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 6, flexWrap: "wrap" }}>
          {!won && (
            <Button variant="contained" size="large" color="primary" onClick={onRetry} sx={{ px: 6, py: 2, fontSize: 20 }}>
              Retry Level
            </Button>
          )}
          {won && !summary.isLastLevel && (
            <Button variant="contained" size="large" color="secondary" onClick={onNext} sx={{ px: 6, py: 2, fontSize: 20 }}>
              Next Level → Level {(summary.level || 1) + 1}
            </Button>
          )}
          {won && summary.isLastLevel && (
            <Button variant="contained" size="large" color="success" onClick={onNext} sx={{ px: 6, py: 2, fontSize: 20 }}>
              🎉 Game Completed! Back to Menu
            </Button>
          )}
          <Button variant="outlined" size="large" onClick={() => navigate("/game")} sx={{ px: 6, py: 2, fontSize: 20 }}>
            Main Menu
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 6, textAlign: "center" }}>
          Weekend Hackathon 2025 — Web & Mobile App Track
        </Typography>
      </Paper>
    </Box>
  );
}