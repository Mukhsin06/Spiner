import React, { useState, useEffect } from 'react';
import { Riddle } from '../constants';

interface QuestionCardProps {
  riddle: Riddle | null;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ riddle, onCorrect, onIncorrect }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [riddle]);

  if (!riddle) {
    return (
      <div className="w-full max-w-sm mx-auto h-48 border-2 border-slate-800 rounded-xl bg-slate-900/50 flex items-center justify-center">
        <p className="text-slate-500 font-mono tracking-widest animate-pulse">SYSTEM STANDBY...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto border-2 border-cyan-500 rounded-xl bg-[#0b1221] shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-hidden">
      {/* Header Bar */}
      <div className="bg-cyan-900/20 border-b border-cyan-500/30 py-2 text-center">
        <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Question #{riddle.id}
        </h3>
      </div>

      <div className="p-6 text-center">
        <p className="text-white text-lg md:text-xl font-bold mb-6 leading-relaxed">
          "{riddle.q}"
        </p>

        <div className="mb-6 h-8">
          {showAnswer ? (
             <span className="text-pink-400 font-bold animate-fade-in block">{riddle.a}</span>
          ) : (
             <button 
                onClick={() => setShowAnswer(true)}
                className="text-xs text-slate-400 hover:text-cyan-400 underline decoration-dotted transition-colors uppercase tracking-wider"
             >
                Peek Answer
             </button>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCorrect}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold uppercase tracking-wide shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Correct
          </button>
          <button
            onClick={onIncorrect}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded font-bold uppercase tracking-wide shadow-lg border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Wrong
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;