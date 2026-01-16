
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
      <div className="w-full max-w-sm bg-slate-950 border border-rose-500/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_100px_rgba(244,63,94,0.2)] relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-500/20 blur-[60px] rounded-full pointer-events-none" />

        <h2 className="text-4xl font-orbitron font-black text-rose-500 mb-8 tracking-widest drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] z-10">GAME OVER</h2>

        <div className="flex flex-col gap-3 w-full mb-8 z-10">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-rose-500/30 transition-colors">
            <span className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-bold">YOUR SCORE</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-orbitron font-bold text-white tracking-widest">{score.toString().padStart(2, '0')}</span>
              <div className="w-2 h-2 bg-rose-500/20 rotate-45 border border-rose-500/50" />
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-cyan-500/30 transition-colors">
            <span className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-bold">BEST STREAK</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-orbitron font-bold text-white tracking-widest">{highScore.toString().padStart(2, '0')}</span>
              <div className="w-2 h-2 bg-cyan-500/20 rotate-45 border border-cyan-500/50" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full z-10">
          <button
            onClick={onRestart}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-orbitron font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] tracking-widest uppercase text-sm"
          >
            PLAY AGAIN
          </button>

          <button
            onClick={onHome}
            className="w-full py-4 bg-transparent border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:text-cyan-300 font-orbitron font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] tracking-widest uppercase text-sm"
          >
            GO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
