import type { Score } from "../types";
import { formatTime } from "../utils/format";

interface ScoreBoardProps {
  score: Score;
  timeLeft: number;
}

export default function ScoreBoard({ score, timeLeft }: ScoreBoardProps) {
  return (
    <div className="pong-scoreboard">
      <span className="pong-scoreboard__time">{formatTime(timeLeft)}</span>
      <span className="pong-scoreboard__score">
        {score.p1} : {score.p2}
      </span>
    </div>
  );
}
