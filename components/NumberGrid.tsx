import React from 'react';
import { TOTAL_SEGMENTS } from '../constants';

interface NumberGridProps {
  remaining: number[];
  currentId: number | null;
}

const NumberGrid: React.FC<NumberGridProps> = ({ remaining, currentId }) => {
  const numbers = Array.from({ length: TOTAL_SEGMENTS }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
      {numbers.map((num) => {
        const isAvailable = remaining.includes(num);
        const isCurrent = currentId === num;

        let classes = "w-8 h-8 flex items-center justify-center rounded text-sm font-bold border transition-all ";
        
        if (isCurrent) {
            // Selected Highlight
            classes += "bg-pink-500 border-pink-400 text-white shadow-[0_0_10px_#ec4899] scale-110";
        } else if (isAvailable) {
            // Available
            classes += "bg-slate-800 border-cyan-900 text-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.2)]";
        } else {
            // Done / Used
            classes += "bg-slate-900 border-slate-800 text-slate-700 decoration-slate-500 line-through";
        }

        return (
          <div key={num} className={classes} style={{ fontFamily: 'Orbitron' }}>
            {num}
          </div>
        );
      })}
    </div>
  );
};

export default NumberGrid;