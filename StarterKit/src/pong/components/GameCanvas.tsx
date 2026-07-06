import { useRef } from "react";
import type { Ball, Board, Paddle, ServingState } from "../types";
import { colors } from "../theme/colors";
import { useAnimationFrame } from "../hooks/useAnimationFrame";

interface GameCanvasProps {
  board: Board;
  paddleLeftRef: React.RefObject<Paddle>;
  paddleRightRef: React.RefObject<Paddle>;
  ballRef: React.RefObject<Ball>;
  servingRef: React.RefObject<ServingState>;
  onFrame: (dt: number) => void;
  isActive: boolean;
}

export default function GameCanvas({
  board,
  paddleLeftRef,
  paddleRightRef,
  ballRef,
  servingRef,
  onFrame,
  isActive,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAnimationFrame((dt) => {
    onFrame(dt);
    draw();
  }, isActive);

  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = board.color;
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle = colors.wall;
    ctx.fillRect(0, 0, board.width, board.wallThickness);
    ctx.fillRect(0, board.height - board.wallThickness, board.width, board.wallThickness);

    ctx.strokeStyle = colors.boardGrid;
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 14]);
    ctx.beginPath();
    ctx.moveTo(board.width / 2, board.wallThickness);
    ctx.lineTo(board.width / 2, board.height - board.wallThickness);
    ctx.stroke();
    ctx.setLineDash([]);

    const paddleLeft = paddleLeftRef.current;
    const paddleRight = paddleRightRef.current;
    if (paddleLeft) {
      ctx.fillStyle = colors.paddleP1;
      ctx.fillRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
    }
    if (paddleRight) {
      ctx.fillStyle = colors.paddleP2;
      ctx.fillRect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
    }

    const ball = ballRef.current;
    if (ball) {
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const serving = servingRef.current;
    if (serving && serving.countdown > 0) {
      ctx.fillStyle = colors.text;
      ctx.font = "bold 48px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(Math.ceil(serving.countdown)), board.width / 2, board.height / 2 - 60);
    }
  }

  return <canvas ref={canvasRef} width={board.width} height={board.height} className="pong-canvas" />;
}
