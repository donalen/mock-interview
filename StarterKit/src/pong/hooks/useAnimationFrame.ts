import { useEffect, useRef } from "react";

const MAX_DELTA_SECONDS = 0.05;

export function useAnimationFrame(callback: (deltaSeconds: number) => void, isActive: boolean): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!isActive) return;

    let frameId: number;
    let lastTime: number | null = null;

    const loop = (time: number) => {
      if (lastTime !== null) {
        const dt = Math.min((time - lastTime) / 1000, MAX_DELTA_SECONDS);
        callbackRef.current(dt);
      }
      lastTime = time;
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isActive]);
}
