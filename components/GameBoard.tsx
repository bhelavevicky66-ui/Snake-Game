
import React from 'react';
import { Point, GameStatus } from '../types';
import { GRID_SIZE } from '../constants';

interface GameBoardProps {
  snake: Point[];
  food: Point;
  status: GameStatus;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, status }) => {
  return (
    <div 
      className="relative aspect-square w-full max-w-md bg-slate-900 border-2 border-slate-800 rounded-lg overflow-hidden neon-border shadow-2xl"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
        <div key={i} className="border-[0.5px] border-slate-800/10" />
      ))}

      {snake.map((segment, index) => {
        const isHead = index === 0;
        return (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className={`absolute transition-all duration-150 rounded-sm ${
              isHead 
                ? 'bg-cyan-400 z-10 shadow-[0_0_15px_#22d3ee]' 
                : 'bg-cyan-600/80 shadow-[0_0_8px_#0891b2]'
            }`}
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(segment.x * 100) / GRID_SIZE}%`,
              top: `${(segment.y * 100) / GRID_SIZE}%`,
              borderRadius: isHead ? '4px' : '2px',
            }}
          />
        );
      })}

      <div
        className="absolute bg-rose-500 rounded-full animate-pulse-glow z-20"
        style={{
          width: `${100 / GRID_SIZE}%`,
          height: `${100 / GRID_SIZE}%`,
          left: `${(food.x * 100) / GRID_SIZE}%`,
          top: `${(food.y * 100) / GRID_SIZE}%`,
        }}
      />

      {status === GameStatus.PAUSED && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-30">
          <span className="text-4xl font-orbitron font-bold text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">PAUSED</span>
        </div>
      )}

      {status === GameStatus.READY && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-30 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl font-orbitron font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">READY?</span>
            <p className="text-cyan-400 text-[10px] tracking-[0.3em] font-bold uppercase animate-pulse">PRESS START TO DEPLOY</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
