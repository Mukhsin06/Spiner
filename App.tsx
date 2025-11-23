import React, { useState, useCallback } from 'react';
import { RIDDLES, TOTAL_SEGMENTS } from './constants';
import SpinnerWheel from './components/SpinnerWheel';
import QuestionCard from './components/QuestionCard';
import NumberGrid from './components/NumberGrid';

const App: React.FC = () => {
  const [remaining, setRemaining] = useState<number[]>(
    Array.from({ length: TOTAL_SEGMENTS }, (_, i) => i + 1)
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const spin = useCallback(() => {
    if (isSpinning || remaining.length === 0) return;

    setIsSpinning(true);
    setShowQuestion(false);
    setCurrentId(null);

    // 1. Pick a random number from the remaining list
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const targetNumber = remaining[randomIndex];

    // 2. Calculate the rotation required to land this number at the top
    // In our SVG: 0 deg is 3 o'clock. 
    // Segment N is centered at: (N-1)*36 + 18 degrees.
    // Top position is 270 degrees.
    // Target Angle needed at top = 270.
    // Current Position of Target Center = (targetNumber - 1) * 36 + 18.
    // Rotation Delta = 270 - Current Position.
    // We add 5 full spins (1800 deg) for effect.
    
    const segmentAngle = 360 / TOTAL_SEGMENTS; // 36
    const currentSegmentAngle = (targetNumber - 1) * segmentAngle + (segmentAngle / 2); // Center of segment in standard 0-360
    
    // We want the wheel to end up such that 'currentSegmentAngle' is at 270 deg.
    // NewRotation = OldRotation + Spins + Correction
    // Let's just calculate absolute target degrees relative to 0.
    
    // To move angle A to 270: subtract A, add 270.
    // But we are rotating the coordinate system (the wheel).
    // If number is at 18deg (Seg 1), we rotate -18 to get to 0, then +270 to get to top?
    // Rotate by: 270 - 18 = 252 deg.
    
    let targetRotation = 270 - currentSegmentAngle;
    
    // Ensure we always spin forward significantly
    const minSpins = 5 * 360; // 5 full turns
    
    // Adjust current rotation to be the baseline
    // We want to add to current rotation, not set absolute (to avoid rewinding)
    const currentMod = rotation % 360;
    let diff = targetRotation - currentMod;
    
    // Make sure diff is positive and large enough for the spin
    while (diff < 0) diff += 360;
    
    const newRotation = rotation + minSpins + diff;

    setRotation(newRotation);

    // 3. Wait for animation
    setTimeout(() => {
      setCurrentId(targetNumber);
      setShowQuestion(true);
      setIsSpinning(false);
    }, 3500); // Matches CSS transition time
  }, [isSpinning, remaining, rotation]);

  const handleCorrect = () => {
    if (currentId === null) return;
    const newRemaining = remaining.filter((id) => id !== currentId);
    setRemaining(newRemaining);
    setShowQuestion(false);
    setCurrentId(null);
    if (newRemaining.length === 0) {
      setGameOver(true);
    }
  };

  const handleIncorrect = () => {
    setShowQuestion(false);
    setCurrentId(null);
  };

  const resetGame = () => {
    setRemaining(Array.from({ length: TOTAL_SEGMENTS }, (_, i) => i + 1));
    setGameOver(false);
    setCurrentId(null);
    setShowQuestion(false);
    setRotation(0);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center py-6">
        
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-40"></div>
      
      {/* Main Content */}
      <div className="z-10 w-full max-w-md px-4 flex flex-col items-center">
        
        {/* Title */}
        <header className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black italic text-neon-cyan tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            NEON SPINNER
          </h1>
          <p className="text-[#0e7490] font-bold tracking-[0.4em] text-xs mt-1 uppercase">
            Knowledge Roulette
          </p>
        </header>

        {/* Wheel Section */}
        <div className="relative mb-6">
           <SpinnerWheel 
             rotation={rotation} 
             remaining={remaining} 
             currentId={currentId} 
           />
           
           {/* Center Spin Button (Overlaying the hub) */}
           {!showQuestion && !gameOver && (
             <button
               onClick={spin}
               disabled={isSpinning}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold border-4 border-slate-900 shadow-[0_0_20px_#06b6d4] z-30 transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center"
               style={{ fontFamily: 'Orbitron' }}
             >
               {isSpinning ? '' : 'SPIN'}
             </button>
           )}
        </div>

        {/* Question Section */}
        <div className={`w-full transition-all duration-500 transform ${showQuestion ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none absolute bottom-0'}`}>
          <QuestionCard 
            riddle={currentId ? RIDDLES[currentId] : null}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        </div>
        
        {/* Game Over */}
        {gameOver && (
          <div className="text-center bg-slate-800/90 p-6 rounded-xl border border-yellow-500 shadow-lg animate-bounce">
            <h2 className="text-2xl text-yellow-400 font-bold mb-4">GAME COMPLETE</h2>
            <button onClick={resetGame} className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400">
              RESTART
            </button>
          </div>
        )}

        {/* Bottom Status Grid */}
        <div className="mt-8">
            <NumberGrid remaining={remaining} currentId={currentId} />
        </div>

      </div>
    </div>
  );
};

export default App;