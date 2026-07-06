import type { Ball, Board, Paddle } from "../types";
import { clamp } from "../utils/geometry";

const MAX_BOUNCE_ANGLE = Math.PI / 3; // 60deg

function circleIntersectsPaddle(ball: Ball, paddle: Paddle): boolean {
  const closestX = clamp(ball.x, paddle.x, paddle.x + paddle.width);
  const closestY = clamp(ball.y, paddle.y, paddle.y + paddle.height);
  const dx = ball.x - closestX;
  const dy = ball.y - closestY;
  return dx * dx + dy * dy <= ball.radius * ball.radius;
}

function bounceOffPaddle(ball: Ball, paddle: Paddle, direction: 1 | -1): void {
  const paddleCenterY = paddle.y + paddle.height / 2;
  const relativeIntersect = clamp((ball.y - paddleCenterY) / (paddle.height / 2), -1, 1);
  const angle = relativeIntersect * MAX_BOUNCE_ANGLE;

  ball.vx = direction * ball.speed * Math.cos(angle);
  ball.vy = ball.speed * Math.sin(angle);
  ball.x = direction === 1 ? paddle.x + paddle.width + ball.radius : paddle.x - ball.radius;
}

export function resolvePaddleCollisions(ball: Ball, paddleLeft: Paddle, paddleRight: Paddle): void {
  if (ball.vx < 0 && circleIntersectsPaddle(ball, paddleLeft)) {
    bounceOffPaddle(ball, paddleLeft, 1);
  } else if (ball.vx > 0 && circleIntersectsPaddle(ball, paddleRight)) {
    bounceOffPaddle(ball, paddleRight, -1);
  }
}

export type GoalResult = "p1" | "p2" | null;

export function checkGoal(ball: Ball, board: Board): GoalResult {
  if (ball.x + ball.radius < 0) return "p2";
  if (ball.x - ball.radius > board.width) return "p1";
  return null;
}
