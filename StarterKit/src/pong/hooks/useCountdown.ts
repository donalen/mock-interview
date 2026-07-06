import { useCallback, useRef, useState } from "react";

export function useCountdown(durationSeconds: number, onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const remainingRef = useRef(durationSeconds);
  const accumulatorRef = useRef(0);
  const expiredRef = useRef(false);

  const tick = useCallback(
    (dt: number) => {
      if (expiredRef.current) return;

      accumulatorRef.current += dt;
      while (accumulatorRef.current >= 1 && remainingRef.current > 0) {
        accumulatorRef.current -= 1;
        remainingRef.current -= 1;
      }
      setTimeLeft(remainingRef.current);

      if (remainingRef.current <= 0) {
        expiredRef.current = true;
        onExpire();
      }
    },
    [onExpire],
  );

  return { timeLeft, tick };
}
