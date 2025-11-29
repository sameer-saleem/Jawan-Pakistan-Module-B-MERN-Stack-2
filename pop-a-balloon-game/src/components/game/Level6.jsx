import { useState, useEffect, useRef } from "react";
import { Box, Typography, Alert } from "@mui/material";
import Balloon from "./Balloon";

const COLORS = [
  { name: "RED", hex: "#e74c3c" },
  { name: "BLUE", hex: "#3498db" },
  { name: "YELLOW", hex: "#f1c40f" },
  { name: "GREEN", hex: "#2ecc71" },
  { name: "GREY", hex: "#95a5a6" },
  { name: "PURPLE", hex: "#9b59b6" },
];

export default function Level6({ onLevelComplete }) {
  const [targetColor, setTargetColor] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [balloons, setBalloons] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const nextId = useRef(0);
  const reactionTimes = useRef([]);
  const scoreRef = useRef(0);
  const totalPoppedRef = useRef(0);

  useEffect(() => {
    setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

  useEffect(() => {
    if (!targetColor || gameOver) return;

    const spawn = () => {
      const balloon = {
        id: nextId.current++,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        left: Math.random() * 70 + 15 + "%",
        movementType: Math.floor(Math.random() * 4), 
        colorChangeSpeed: 500, 
      };
      setBalloons(prev => [...prev, balloon]);
    };

    spawn();
    const interval = setInterval(spawn, 700); 
    return () => clearInterval(interval);
  }, [targetColor, gameOver]);

  const handleHover = (id, reactionTime, colorObj) => {
    if (gameOver) return;

    setBalloons(prev => prev.filter(b => b.id !== id));

    const isCorrect = colorObj.hex === targetColor.hex;
    totalPoppedRef.current += 1;

    if (isCorrect) {
      const validReactionTime = Number(reactionTime) || 0;
      reactionTimes.current.push(validReactionTime);
      scoreRef.current += 1;
      setScore(scoreRef.current);
      if (scoreRef.current >= 10) {
        endGame(true);
      }
    } else {
      setLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) {
          endGame(false);
        }
        return newLives;
      });
    }
  };

  const endGame = (won) => {
    setGameOver(true);

    const avg = reactionTimes.current.length > 0
      ? Math.round(reactionTimes.current.reduce((a, b) => a + b) / reactionTimes.current.length)
      : 0;

    const finalTargetColorName = targetColor?.name || "UNKNOWN";

    setTimeout(() => {
      onLevelComplete({
        won,
        score: scoreRef.current,
        totalScore: totalPoppedRef.current,
        wrongPops: totalPoppedRef.current - scoreRef.current,
        avgReactionTime: avg,
        targetColor: finalTargetColorName,
        livesLeft: lives,
        level: 6,
      });
    }, 1200);
  };

  if (!targetColor) return <Box>Loading...</Box>;

  return (
    <Box sx={{ position: "relative", height: "80vh", overflow: "hidden", background: "#87CEEB" }}>
 
      <Alert severity="info" sx={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", zIndex: 100, fontSize: 18, fontWeight: "bold" }}>
        LEVEL 6:POP THE BALLOONS BY CLICKING OVER THEM
      </Alert>

 
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontWeight: "bold",
          textShadow: "4px 4px 10px black",
          zIndex: 100,
        }}
      >
        POP <span style={{ color: targetColor.hex, fontSize: "1.4em" }}>{targetColor.name}</span> BALLOONS!
      </Typography>

   
      <Box sx={{ position: "absolute", top: 150, left: 20, background: "rgba(255,255,255,0.95)", p: 3, borderRadius: 3, zIndex: 100 }}>
        <Typography fontSize={24} fontWeight="bold">Level 6</Typography>
        <Typography fontSize={24} fontWeight="bold">Score: {score}/10</Typography>
        <Typography fontSize={24} fontWeight="bold">Lives: {"❤️".repeat(lives)}</Typography>
      </Box>


      {balloons.map(b => (
        <Balloon
          key={b.id}
          color={b.color.hex}
          left={b.left}
          isCorrect={b.color.hex === targetColor.hex}
          onHover={(rt) => handleHover(b.id, rt, b.color)}
          movementType={b.movementType}
          level={6}
          colorChangeSpeed={b.colorChangeSpeed}
        />
      ))}

      {gameOver && (
        <Box sx={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <Typography variant="h2" color="white" fontWeight="bold">
            {lives > 0 ? "LEVEL 6 COMPLETE!" : "GAME OVER"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
