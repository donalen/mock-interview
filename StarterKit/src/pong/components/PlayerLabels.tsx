import type { Player } from "../types";

interface PlayerLabelsProps {
  players: [Player, Player];
}

export default function PlayerLabels({ players }: PlayerLabelsProps) {
  const [player1, player2] = players;
  return (
    <div className="pong-player-labels">
      <span className="pong-player-labels__name pong-player-labels__name--left">{player1.name}</span>
      <span className="pong-player-labels__name pong-player-labels__name--right">{player2.name}</span>
    </div>
  );
}
