import { useMemo } from "react";
import type { Player, Score } from "../types";
import { createBoard } from "../engine/factory";
import { useGameEngine } from "../hooks/useGameEngine";
import GameCanvas from "./GameCanvas";
import ScoreBoard from "./ScoreBoard";
import PlayerLabels from "./PlayerLabels";

interface GameScreenProps {
  players: [Player, Player];
  durationSeconds: number;
  onGameEnd: (score: Score) => void;
  active: boolean;
}

export default function GameScreen({ players, durationSeconds, onGameEnd, active }: GameScreenProps) {
  const board = useMemo(() => createBoard(), []);

  const { paddleLeftRef, paddleRightRef, ballRef, servingRef, score, timeLeft, step } = useGameEngine({
    board,
    players,
    durationSeconds,
    onGameEnd,
  });

  return (
    <div className="pong-game-screen">
      <ScoreBoard score={score} timeLeft={timeLeft} />
      <div className="pong-board-wrapper">
        <GameCanvas
          board={board}
          paddleLeftRef={paddleLeftRef}
          paddleRightRef={paddleRightRef}
          ballRef={ballRef}
          servingRef={servingRef}
          onFrame={step}
          isActive={active}
        />
      </div>
      <PlayerLabels players={players} />
    </div>
  );
}
