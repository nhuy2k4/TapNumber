export function generateRandomNumbers(total) {
  const numbers = [];

  for (let i = 1; i <= total; i++) {
    const safeEdge = 4.5;
    const x = Math.random() * (100 - safeEdge * 2) + safeEdge;
    const y = Math.random() * (100 - safeEdge * 2) + safeEdge;

    numbers.push({
      id: `${Date.now()}-${i}-${Math.random().toFixed(5)}`,
      value: i,
      x,
      y,
      isCorrect: false,
    });
  }

  return numbers;
}
