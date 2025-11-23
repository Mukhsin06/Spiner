export interface Riddle {
  id: number;
  q: string; // Question
  a: string; // Answer (short)
}

export const RIDDLES: Record<number, Riddle> = {
  1: { id: 1, q: "Once in a minute, twice in a moment — what is it?", a: "Letter M" },
  2: { id: 2, q: "Which month has 28 days?", a: "Every month" },
  3: { id: 3, q: "I have cities but no houses… what am I?", a: "A Map" },
  4: { id: 4, q: "Which English word is always spelled incorrectly?", a: "Incorrectly" },
  5: { id: 5, q: "Which letter has the most water?", a: "C (Sea)" },
  6: { id: 6, q: "Cowboy came on Friday, left on Friday. How?", a: "Horse is 'Friday'" },
  7: { id: 7, q: "You can hold it without touching it.", a: "Your Breath" },
  8: { id: 8, q: "Always hungry, dies with water.", a: "Fire" },
  9: { id: 9, q: "Which food never spoils?", a: "Honey" },
  10: { id: 10, q: "Largest desert (not Sahara)?", a: "Antarctica" }
};

export const TOTAL_SEGMENTS = 10;