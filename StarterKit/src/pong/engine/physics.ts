import type { Ball, Board } from "../types";

export function stepBall(ball: Ball, board: Board, dt: number): void {
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;

  const top = board.wallThickness + ball.radius;
  const bottom = board.height - board.wallThickness - ball.radius;

  if (ball.y < top) {
    ball.y = top;
    ball.vy = Math.abs(ball.vy);
  } else if (ball.y > bottom) {
    ball.y = bottom;
    ball.vy = -Math.abs(ball.vy);
  }
}
