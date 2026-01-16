
import React from 'react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-md px-4 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-xl neon-border backdrop-blur-sm">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-cyan-400 opacity-70">Current Score</span>
        <span className="text-3xl font-orbitron font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          {score.toString().padStart(4, '0')}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase tracking-widest text-rose-400 opacity-70">Best Ever</span>
        <span className="text-3xl font-orbitron font-bold text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">
          {highScore.toString().padStart(4, '0')}
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;
