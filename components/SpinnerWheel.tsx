import React from 'react';
import { TOTAL_SEGMENTS } from '../constants';

interface SpinnerWheelProps {
  rotation: number;
  remaining: number[];
  currentId: number | null;
}

const SpinnerWheel: React.FC<SpinnerWheelProps> = ({ rotation, remaining, currentId }) => {
  const radius = 150;
  const centerX = 160;
  const centerY = 160;
  const anglePerSegment = 360 / TOTAL_SEGMENTS;

  const segments = [];

  for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    const num = i + 1;
    // Adjust angles so segment starts at 0 degrees (3 o'clock)
    const startAngle = (i * anglePerSegment) * (Math.PI / 180);
    const endAngle = ((i + 1) * anglePerSegment) * (Math.PI / 180);

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const d = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
    
    const isAvailable = remaining.includes(num);
    const isSelected = currentId === num;

    // Visual Styling based on reference image
    const strokeColor = "#06b6d4"; // Cyan
    const fillColor = isSelected ? "rgba(6, 182, 212, 0.3)" : "rgba(15, 23, 42, 0.8)"; // Dark slate or highlighted
    
    // Text positioning
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const textRadius = radius * 0.75;
    const textX = centerX + textRadius * Math.cos(midAngle);
    const textY = centerY + textRadius * Math.sin(midAngle);
    
    // Rotate text to point towards center
    // (i * 36) + 18 (midpoint) + 90 to make text upright relative to center
    const rotateText = (i * anglePerSegment) + (anglePerSegment/2) + 90;

    segments.push(
      <g key={num}>
        <path 
          d={d} 
          fill={fillColor} 
          stroke={strokeColor} 
          strokeWidth="2"
          className="transition-colors duration-300"
        />
        <text 
          x={textX} 
          y={textY} 
          fill={isAvailable ? "white" : "#475569"} 
          fontSize="24"
          fontWeight="bold" 
          textAnchor="middle" 
          alignmentBaseline="middle"
          transform={`rotate(${rotateText}, ${textX}, ${textY})`}
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          className={isSelected ? "text-neon-cyan" : ""}
        >
          {num}
        </text>
      </g>
    );
  }

  return (
    <div className="relative w-[320px] h-[320px] mx-auto mb-8">
      
      {/* Outer Glow Ring */}
      <div className="absolute inset-[-10px] rounded-full border-2 border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]"></div>

      {/* The Rotating Wheel */}
      <svg 
        width="320" 
        height="320" 
        viewBox="0 0 320 320" 
        className="will-change-transform"
        style={{ 
          transform: `rotate(${rotation}deg)`, 
          transition: 'transform 3.5s cubic-bezier(0.2, 0.8, 0.2, 1)' 
        }}
      >
        {/* Background Circle */}
        <circle cx="160" cy="160" r="150" fill="#020617" />
        
        {segments}

        {/* Inner Hub Ring */}
        <circle cx="160" cy="160" r="30" fill="#020617" stroke="#06b6d4" strokeWidth="4" />
        <circle cx="160" cy="160" r="12" fill="#0891b2" opacity="0.5" />
      </svg>

      {/* The Pink Pointer (Top Center) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
        <svg width="40" height="40" viewBox="0 0 40 40">
           <path d="M 20 40 L 5 10 L 35 10 Z" fill="#ec4899" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      
    </div>
  );
};

export default SpinnerWheel;