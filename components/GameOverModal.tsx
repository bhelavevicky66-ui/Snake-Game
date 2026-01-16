
import React from 'react';

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="w-full max-w-sm bg-slate-900 border-2 border-rose-500/50 rounded-2xl p-8 flex flex-col items-center text-center neon-border shadow-[0_0_30px_rgba(244,63,94,0.3)]">
        <h2 className="text-4xl font-orbitron font-black text-rose-500 mb-2 drop-shadow-[0_0_10px_#f43f5e]">GAME OVER</h2>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent my-6" />
        
        <div className="flex flex-col gap-4 w-full mb-8">
          <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 rounded-lg">
            <span className="text-slate-400 uppercase text-xs">Score</span>
            <span className="text-2xl font-orbitron font-bold text-white">{score}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 rounded-lg">
            <span className="text-slate-400 uppercase text-xs">Best</span>
            <span className="text-2xl font-orbitron font-bold text-white">{highScore}</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-orbitron font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] transform hover:scale-105 active:scale-95"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
