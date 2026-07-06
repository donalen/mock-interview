import type { Board, Paddle } from "../types";
import { clamp } from "../utils/geometry";

export function updatePaddle(
  paddle: Paddle,
  keys: Set<string>,
  board: Board,
  dt: number,
  upKey: string,
  downKey: string,
): void {
  let direction = 0;
  if (keys.has(upKey)) direction -= 1;
  if (keys.has(downKey)) direction += 1;

  paddle.y = clamp(
    paddle.y + direction * paddle.speed * dt,
    board.wallThickness,
    board.height - board.wallThickness - paddle.height,
  );
}
