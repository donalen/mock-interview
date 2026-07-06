import type { Player, Score } from "../types";

interface WinnerModalProps {
  players: [Player, Player];
  score: Score;
  onRestart: () => void;
}

export default function WinnerModal({ players, score, onRestart }: WinnerModalProps) {
  const [player1, player2] = players;

  let title: string;
  if (score.p1 === score.p2) {
    title = "Ничья!";
  } else {
    const winner = score.p1 > score.p2 ? player1 : player2;
    title = `Победил ${winner.name}!`;
  }

  return (
    <div className="pong-modal-overlay">
      <div className="pong-modal">
        <h2>{title}</h2>
        <p className="pong-modal__score">
          {player1.name} {score.p1} : {score.p2} {player2.name}
        </p>
        <button type="button" className="pong-button" onClick={onRestart}>
          Играть снова
        </button>
      </div>
    </div>
  );
}
