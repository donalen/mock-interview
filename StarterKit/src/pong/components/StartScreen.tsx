import { useState } from "react";
import type { FormEvent } from "react";

export interface StartFormValues {
  durationMinutes: number;
  player1Name: string;
  player2Name: string;
}

interface StartScreenProps {
  onStart: (values: StartFormValues) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [durationMinutes, setDurationMinutes] = useState(3);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onStart({
      durationMinutes,
      player1Name: player1Name.trim() || "Игрок 1",
      player2Name: player2Name.trim() || "Игрок 2",
    });
  }

  return (
    <div className="pong-start-screen">
      <form className="pong-start-form" onSubmit={handleSubmit}>
        <h1>Пинг-понг</h1>

        <label className="pong-field">
          Время игры (мин)
          <input
            type="number"
            min={1}
            max={30}
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(Number(event.target.value))}
            required
          />
        </label>

        <label className="pong-field">
          Игрок 1 (W / S)
          <input
            type="text"
            placeholder="Игрок 1"
            value={player1Name}
            onChange={(event) => setPlayer1Name(event.target.value)}
            maxLength={20}
          />
        </label>

        <label className="pong-field">
          Игрок 2 (стрелки ↑ / ↓)
          <input
            type="text"
            placeholder="Игрок 2"
            value={player2Name}
            onChange={(event) => setPlayer2Name(event.target.value)}
            maxLength={20}
          />
        </label>

        <button type="submit" className="pong-button">
          Старт
        </button>
      </form>
    </div>
  );
}
