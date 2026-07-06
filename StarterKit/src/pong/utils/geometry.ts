export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function randomSign(): 1 | -1 {
  return Math.random() < 0.5 ? 1 : -1;
}

export function randomBallDirection(): { vx: 1 | -1; vy: number } {
  const vx = randomSign();
  const vy = Math.random() * 1.2 - 0.6;
  return { vx, vy };
}
