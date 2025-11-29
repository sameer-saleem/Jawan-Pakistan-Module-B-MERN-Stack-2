import { Box, Paper, Typography, Button, Grid, Card, CardContent, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlayArrow, Star, Timer } from "@mui/icons-material";

export default function GameLayout() {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      title: "Level 1: Basic Popping",
      description: "Pop 10 balloons of the target color. Simple and fast-paced!",
      difficulty: "Easy",
      target: "10 balloons",
      time: "~2-3 minutes",
      color: "#2ecc71"
    },
    {
      id: 2,
      title: "Level 2: Moving Targets",
      description: "Balloons move in patterns! Pop 10 of the target color while they bounce around.",
      difficulty: "Medium",
      target: "10 balloons",
      time: "~3-4 minutes",
      color: "#f39c12"
    },
    {
      id: 3,
      title: "Level 3: Color Chaos",
      description: "Colors change rapidly! Pop 10 balloons while staying focused on the target color.",
      difficulty: "Hard",
      target: "10 balloons",
      time: "~4-5 minutes",
      color: "#e74c3c"
    },
    {
      id: 4,
      title: "Level 4: Speed Challenge",
      description: "Faster spawning balloons! Pop 10 of the target color with increased speed.",
      difficulty: "Expert",
      target: "10 balloons",
      time: "~5-6 minutes",
      color: "#9b59b6"
    },
    {
      id: 5,
      title: "Level 5: Rapid Fire",
      description: "Even faster spawning! Pop 10 balloons with rapid color changes.",
      difficulty: "Expert",
      target: "10 balloons",
      time: "~5-6 minutes",
      color: "#3498db"
    },
    {
      id: 6,
      title: "Level 6: Lightning Speed",
      description: "Lightning-fast spawning! Pop 10 balloons in this intense challenge.",
      difficulty: "Expert",
      target: "10 balloons",
      time: "~6-7 minutes",
      color: "#e67e22"
    },
    {
      id: 7,
      title: "Level 7: Insane Speed",
      description: "Insanely fast spawning! Pop 10 balloons with extreme color changes.",
      difficulty: "Expert",
      target: "10 balloons",
      time: "~6-7 minutes",
      color: "#95a5a6"
    },
    {
      id: 8,
      title: "Level 8: Chaos Mode",
      description: "Complete chaos! Pop 10 balloons in this ultimate speed challenge.",
      difficulty: "Expert",
      target: "10 balloons",
      time: "~7-8 minutes",
      color: "#f1c40f"
    },
    {
      id: 9,
      title: "Level 9: Extreme Chaos",
      description: "Extreme difficulty! Pop 10 balloons with near-instantaneous changes.",
      difficulty: "Master",
      target: "10 balloons",
      time: "~7-8 minutes",
      color: "#2ecc71"
    },
    {
      id: 10,
      title: "Level 10: Ultimate Challenge",
      description: "The final test! Pop 10 balloons in the ultimate challenge.",
      difficulty: "Master",
      target: "10 balloons",
      time: "~8-9 minutes",
      color: "#e74c3c"
    }
  ];

  const startGame = () => {
    navigate("/game/level1");
  };

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
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
   
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            fontWeight="900"
            color="white"
            sx={{ textShadow: "4px 4px 10px rgba(0,0,0,0.5)", mb: 2 }}
          >
            🎈 Pop A Balloon Game
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{ opacity: 0.9, maxWidth: 600, mx: "auto" }}
          >
            Test your reflexes and focus! Pop balloons of the target color as fast as you can.
            Each level gets more challenging with movement and color changes.
          </Typography>
        </Box>


        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={startGame}
            sx={{
              px: 8,
              py: 3,
              fontSize: 24,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
              boxShadow: "0 8px 25px rgba(255,107,107,0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #FF5252, #45B7AA)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(255,107,107,0.6)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <PlayArrow sx={{ mr: 2, fontSize: 32 }} />
            Start Game
          </Button>
        </Box>

  
        <Grid container spacing={4}>
          {levels.map((level) => (
            <Grid item xs={12} sm={6} md={6} key={level.id}>
              <Card
                sx={{
                  height: "100%",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color={level.color}
                      sx={{ mr: 2 }}
                    >
                      Level {level.id}
                    </Typography>
                    <Chip
                      label={level.difficulty}
                      color={
                        level.difficulty === "Easy" ? "success" :
                        level.difficulty === "Medium" ? "warning" :
                        level.difficulty === "Hard" ? "error" :
                        level.difficulty === "Expert" ? "secondary" :
                        level.difficulty === "Master" ? "primary" : "default"
                      }
                      size="small"
                    />
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {level.title}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {level.description}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Star sx={{ mr: 1, color: "#f39c12" }} />
                      <Typography variant="body2" fontWeight="bold">
                        Target: {level.target}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Timer sx={{ mr: 1, color: "#3498db" }} />
                      <Typography variant="body2" fontWeight="bold">
                        Estimated Time: {level.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

 
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.7 }}>
            Weekend Hackathon 2025 — Web & Mobile App Track
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
