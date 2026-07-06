export type Player = {
  id: 1 | 2;
  name: string;
};

export type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  radius: number;
  color: string;
};

export type Paddle = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
};

export type Board = {
  width: number;
  height: number;
  color: string;
  wallThickness: number;
};

export type Score = {
  p1: number;
  p2: number;
};

export type Game = {
  board: Board;
  players: [Player, Player];
  score: Score;
  timeLeft: number;
};

export type Screen = "start" | "play" | "end";

export type ServingState = {
  servingPlayer: 1 | 2;
  countdown: number;
} | null;
