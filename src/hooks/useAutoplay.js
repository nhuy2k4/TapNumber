import { useEffect } from 'react';

export function useAutoplay(autoplay, gameState, numbers, expectedNumber, handleClick) {
  useEffect(() => {
    if (!autoplay || gameState !== "playing") return;

    const bot = setInterval(() => {
      const target = numbers.find(n => n.value === expectedNumber);
      if (target) {
        handleClick(expectedNumber);
      }
    }, 600);

    return () => clearInterval(bot);
  }, [autoplay, gameState, numbers, expectedNumber, handleClick]);
}
