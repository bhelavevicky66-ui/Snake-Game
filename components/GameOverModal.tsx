
import React from 'react';

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  onHome: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, highScore, onRestart, onHome }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="w-full max-w-sm bg-slate-900 border-2 border-rose-500/50 rounded-2xl p-8 flex flex-col items-center text-center neon-border shadow-[0_0_50px_rgba(244,63,94,0.3)]">
        <h2 className="text-4xl font-orbitron font-black text-rose-500 mb-2 drop-shadow-[0_0_10px_#f43f5e]">GAME OVER</h2>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent my-6" />
        
        <div className="flex flex-col gap-4 w-full mb-8">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <span className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">Your Score</span>
            <span className="text-2xl font-orbitron font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{score}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <span className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">Best Streak</span>
            <span className="text-2xl font-orbitron font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{highScore}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onRestart}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-orbitron font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] transform hover:scale-[1.02] active:scale-95"
          >
            PLAY AGAIN
          </button>
          
          <button
            onClick={onHome}
            className="w-full py-3 bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 font-orbitron font-bold rounded-xl transition-all shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transform hover:scale-[1.02] active:scale-95"
          >
            GO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
