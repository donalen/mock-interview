import type { Ball, Board, Game, Paddle, Player } from "../types";
import { colors } from "../theme/colors";

export const BOARD_WIDTH = 900;
export const BOARD_HEIGHT = 540;
export const WALL_THICKNESS = 10;

export const PADDLE_WIDTH = 14;
export const PADDLE_HEIGHT = 100;
export const PADDLE_MARGIN = 24;
export const PADDLE_SPEED = 420;

export const BALL_RADIUS = 9;
export const BALL_SPEED = 360;

export const SERVE_DELAY = 3;

export function createBoard(): Board {
  return {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    color: colors.board,
    wallThickness: WALL_THICKNESS,
  };
}

export function createPaddle(board: Board, side: "left" | "right"): Paddle {
  return {
    x: side === "left" ? PADDLE_MARGIN : board.width - PADDLE_MARGIN - PADDLE_WIDTH,
    y: board.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED,
  };
}

export function createBall(board: Board): Ball {
  return {
    x: board.width / 2,
    y: board.height / 2,
    vx: 0,
    vy: 0,
    speed: BALL_SPEED,
    radius: BALL_RADIUS,
    color: colors.ball,
  };
}

export function createInitialGame(board: Board, players: [Player, Player], durationSeconds: number): Game {
  return {
    board,
    players,
    score: { p1: 0, p2: 0 },
    timeLeft: durationSeconds,
  };
}
