
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
      {/* Grid Lines */}
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
        <div key={i} className="border-[0.5px] border-slate-800/20" />
      ))}

      {/* Snake Rendering */}
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

      {/* Food Rendering */}
      <div
        className="absolute bg-rose-500 rounded-full animate-pulse-glow z-20"
        style={{
          width: `${100 / GRID_SIZE}%`,
          height: `${100 / GRID_SIZE}%`,
          left: `${(food.x * 100) / GRID_SIZE}%`,
          top: `${(food.y * 100) / GRID_SIZE}%`,
          color: '#f43f5e',
        }}
      />

      {/* Overlay for Statuses */}
      {status === GameStatus.PAUSED && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-30">
          <span className="text-4xl font-orbitron font-bold text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">PAUSED</span>
        </div>
      )}

      {status === GameStatus.IDLE && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-30 text-center p-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl font-orbitron font-bold text-white">READY?</span>
            <p className="text-slate-400 text-sm">USE ARROW KEYS OR SWIPE TO START</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
