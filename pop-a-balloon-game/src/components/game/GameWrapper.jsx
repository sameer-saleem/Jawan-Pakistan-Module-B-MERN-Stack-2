import { useState } from "react";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import Level7 from "./Level7";
import Level8 from "./Level8";
import Level9 from "./Level9";
import Level10 from "./Level10";
import GameSummary from "./GameSummary";
import { useNavigate } from "react-router-dom";

export default function GameWrapper() {
  const [summaryData, setSummaryData] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const navigate = useNavigate();

  const handleLevelComplete = (data) => {
    console.log("handleLevelComplete received:", data);


    const levelTips = {
      1: [
        "Try focusing more on the upper-right area next time.",
        "Great focus in the center! Keep it up.",
        "You tend to miss balloons on the left side.",
        "Your reaction time is improving — excellent!",
      ],
      2: [
        "Watch the balloon movement patterns carefully!",
        "Anticipate the direction changes.",
        "Stay focused on the target color despite the movement.",
        "Great job adapting to the new patterns!",
      ],
      3: [
        "Colors change fast - trust your instincts!",
        "Watch for the target color even as it changes.",
        "The complex movements make it tricky - stay sharp!",
        "Master level! You're doing amazing!",
      ]
    };

    const tips = levelTips[data.level || currentLevel] || levelTips[1];
    const aiTip = data.won
      ? tips[Math.floor(Math.random() * tips.length)]
      : `Level ${currentLevel} challenge: Only pop ${data.targetColor} balloons!`;

    const summary = {
      won: data.won,
      score: data.score,
      totalScore: data.totalScore,
      avgReactionTime: data.avgReactionTime || 0,
      previousReaction: data.previousReaction || null,
      aiSuggestion: aiTip,
      targetColor: data.targetColor,
      level: data.level || currentLevel,
      isLastLevel: (data.level || currentLevel) >= 10,
    };
    console.log("Setting summaryData:", summary);
    setSummaryData(summary);
  };

  const handleRetry = () => {
    setSummaryData(null);

    setCurrentLevel(1);
  };

  const handleNext = () => {
    if (currentLevel < 10) {
      setCurrentLevel(currentLevel + 1);
      setSummaryData(null);
    } else {

      navigate("/game");
    }
  };

  const renderCurrentLevel = () => {
    switch (currentLevel) {
      case 1:
        return <Level1 onLevelComplete={handleLevelComplete} />;
      case 2:
        return <Level2 onLevelComplete={handleLevelComplete} />;
      case 3:
        return <Level3 onLevelComplete={handleLevelComplete} />;
      case 4:
        return <Level4 onLevelComplete={handleLevelComplete} />;
      case 5:
        return <Level5 onLevelComplete={handleLevelComplete} />;
      case 6:
        return <Level6 onLevelComplete={handleLevelComplete} />;
      case 7:
        return <Level7 onLevelComplete={handleLevelComplete} />;
      case 8:
        return <Level8 onLevelComplete={handleLevelComplete} />;
      case 9:
        return <Level9 onLevelComplete={handleLevelComplete} />;
      case 10:
        return <Level10 onLevelComplete={handleLevelComplete} />;
      default:
        return <Level1 onLevelComplete={handleLevelComplete} />;
    }
  };

  if (summaryData) {
    return (
      <GameSummary
        summary={summaryData}
        onRetry={handleRetry}
        onNext={handleNext}
      />
    );
  }

  return renderCurrentLevel();
}
