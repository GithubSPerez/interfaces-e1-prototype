'use client';

import React from 'react';

const SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  O: [[1, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]]
};

const COLORS = [
  'var(--color-download)',
  'var(--color-cart)',
  'var(--color-bglitest)',
  'var(--color-font-disabled)'
];

interface TetrisPieceProps {
  shape: number[][];
  color: string;
  style: React.CSSProperties;
  delay: string;
  duration: string;
}

function TetrisPiece({ shape, color, style, delay, duration }: TetrisPieceProps) {
  return (
    <div
      className="absolute"
      style={{
        ...style,
        animation: `tetris-float ${duration} ease-in-out infinite alternate`,
        animationDelay: delay,
        opacity: 0.08,
      }}
    >
      <div className="flex flex-col gap-1">
        {shape.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1">
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className="w-10 h-10 md:w-14 md:h-14 rounded-[4px]"
                style={{ backgroundColor: cell ? color : 'transparent' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TetrisBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes tetris-float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(40px) rotate(10deg); }
          100% { transform: translateY(-20px) rotate(-10deg); }
        }
      `}</style>

      {/* Left */}
      <TetrisPiece shape={SHAPES.L} color={COLORS[0]} style={{ top: '10%', left: '2%' }} delay="0s" duration="15s" />
      <TetrisPiece shape={SHAPES.I} color={COLORS[1]} style={{ top: '45%', left: '-2%' }} delay="2s" duration="18s" />
      <TetrisPiece shape={SHAPES.O} color={COLORS[2]} style={{ top: '75%', left: '3%' }} delay="5s" duration="20s" />
      <TetrisPiece shape={SHAPES.T} color={COLORS[3]} style={{ top: '30%', left: '6%' }} delay="1s" duration="16s" />

      {/* Right */}
      <TetrisPiece shape={SHAPES.Z} color={COLORS[1]} style={{ top: '15%', right: '3%' }} delay="1s" duration="17s" />
      <TetrisPiece shape={SHAPES.S} color={COLORS[0]} style={{ top: '55%', right: '1%' }} delay="4s" duration="14s" />
      <TetrisPiece shape={SHAPES.J} color={COLORS[3]} style={{ top: '80%', right: '4%' }} delay="3s" duration="19s" />
      <TetrisPiece shape={SHAPES.T} color={COLORS[2]} style={{ top: '35%', right: '8%' }} delay="6s" duration="22s" />
    </div>
  );
}
