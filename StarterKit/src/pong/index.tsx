import { useState } from "react";
import type { Player, Score, Screen } from "./types";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import WinnerModal from "./components/WinnerModal";
import type { StartFormValues } from "./components/StartScreen";
import "./styles/pong.css";

export default function PongApp() {
  const [screen, setScreen] = useState<Screen>("start");
  const [players, setPlayers] = useState<[Player, Player]>([
    { id: 1, name: "Игрок 1" },
    { id: 2, name: "Игрок 2" },
  ]);
  const [durationSeconds, setDurationSeconds] = useState(180);
  const [finalScore, setFinalScore] = useState<Score>({ p1: 0, p2: 0 });

  function handleStart(values: StartFormValues) {
    setPlayers([
      { id: 1, name: values.player1Name },
      { id: 2, name: values.player2Name },
    ]);
    setDurationSeconds(values.durationMinutes * 60);
    setScreen("play");
  }

  function handleGameEnd(score: Score) {
    setFinalScore(score);
    setScreen("end");
  }

  function handleRestart() {
    setScreen("start");
  }

  return (
    <div className="pong-app">
      {screen === "start" && <StartScreen onStart={handleStart} />}

      {(screen === "play" || screen === "end") && (
        <GameScreen
          players={players}
          durationSeconds={durationSeconds}
          onGameEnd={handleGameEnd}
          active={screen === "play"}
        />
      )}

      {screen === "end" && <WinnerModal players={players} score={finalScore} onRestart={handleRestart} />}
    </div>
  );
}
