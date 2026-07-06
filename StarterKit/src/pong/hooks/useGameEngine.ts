import { useCallback, useRef, useState } from "react";
import type { Ball, Board, Paddle, Player, Score, ServingState } from "../types";
import { createBall, createPaddle, SERVE_DELAY, BALL_SPEED } from "../engine/factory";
import { stepBall } from "../engine/physics";
import { resolvePaddleCollisions, checkGoal } from "../engine/collision";
import { updatePaddle } from "../engine/input";
import { randomSign } from "../utils/geometry";
import { useKeyboard } from "./useKeyboard";
import { useCountdown } from "./useCountdown";

export interface UseGameEngineOptions {
  board: Board;
  players: [Player, Player];
  durationSeconds: number;
  onGameEnd: (score: Score) => void;
}

const MAX_SERVE_ANGLE = 0.5; // радианы, небольшой случайный наклон при подаче

function servePosition(paddle: Paddle, servingPlayer: 1 | 2): { x: number; y: number } {
  return {
    x: servingPlayer === 1 ? paddle.x + paddle.width + 12 : paddle.x - 12,
    y: paddle.y + paddle.height / 2,
  };
}

export function useGameEngine({ board, players, durationSeconds, onGameEnd }: UseGameEngineOptions) {
  const keysRef = useKeyboard();

  const paddleLeftRef = useRef<Paddle>(createPaddle(board, "left"));
  const paddleRightRef = useRef<Paddle>(createPaddle(board, "right"));
  const ballRef = useRef<Ball>(createBall(board));
  const scoreRef = useRef<Score>({ p1: 0, p2: 0 });
  const [score, setScore] = useState<Score>({ p1: 0, p2: 0 });

  const initialServer = useRef<1 | 2>(randomSign() === 1 ? 1 : 2);
  const servingRef = useRef<ServingState>({ servingPlayer: initialServer.current, countdown: SERVE_DELAY });

  const resetBallToServe = useCallback((servingPlayer: 1 | 2) => {
    const paddle = servingPlayer === 1 ? paddleLeftRef.current : paddleRightRef.current;
    const pos = servePosition(paddle, servingPlayer);
    ballRef.current = {
      ...ballRef.current,
      x: pos.x,
      y: pos.y,
      vx: 0,
      vy: 0,
    };
    servingRef.current = { servingPlayer, countdown: SERVE_DELAY };
  }, [board]);

  const handleTimeExpire = useCallback(() => {
    onGameEnd(scoreRef.current);
  }, [onGameEnd]);

  const { timeLeft, tick: tickCountdown } = useCountdown(durationSeconds, handleTimeExpire);

  const step = useCallback(
    (dt: number) => {
      updatePaddle(paddleLeftRef.current, keysRef.current, board, dt, "KeyW", "KeyS");
      updatePaddle(paddleRightRef.current, keysRef.current, board, dt, "ArrowUp", "ArrowDown");

      const serving = servingRef.current;
      if (serving) {
        serving.countdown -= dt;
        if (serving.countdown <= 0) {
          const direction = serving.servingPlayer === 1 ? 1 : -1;
          const angle = (Math.random() * 2 - 1) * MAX_SERVE_ANGLE;
          ballRef.current.vx = direction * BALL_SPEED * Math.cos(angle);
          ballRef.current.vy = BALL_SPEED * Math.sin(angle);
          servingRef.current = null;
        }
      } else {
        stepBall(ballRef.current, board, dt);
        resolvePaddleCollisions(ballRef.current, paddleLeftRef.current, paddleRightRef.current);

        const goal = checkGoal(ballRef.current, board);
        if (goal) {
          const next =
            goal === "p1"
              ? { ...scoreRef.current, p1: scoreRef.current.p1 + 1 }
              : { ...scoreRef.current, p2: scoreRef.current.p2 + 1 };
          scoreRef.current = next;
          setScore(next);
          resetBallToServe(goal === "p1" ? 2 : 1);
        }
      }

      tickCountdown(dt);
    },
    [board, keysRef, resetBallToServe, tickCountdown],
  );

  return {
    paddleLeftRef,
    paddleRightRef,
    ballRef,
    servingRef,
    score,
    timeLeft,
    step,
  };
}
