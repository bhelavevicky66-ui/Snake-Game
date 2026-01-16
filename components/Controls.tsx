
import React from 'react';
import { Direction, GameStatus } from '../types';

interface ControlsProps {
  status: GameStatus;
  onDirectionChange: (dir: Direction) => void;
  onTogglePause: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ status, onDirectionChange, onTogglePause, onReset }) => {
  const isPlaying = status === GameStatus.PLAYING;
  const isPaused = status === GameStatus.PAUSED;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Mobile D-Pad */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <ControlButton onClick={() => onDirectionChange(Direction.UP)} icon="↑" />
        <div />
        <ControlButton onClick={() => onDirectionChange(Direction.LEFT)} icon="←" />
        <ControlButton onClick={() => onDirectionChange(Direction.DOWN)} icon="↓" />
        <ControlButton onClick={() => onDirectionChange(Direction.RIGHT)} icon="→" />
      </div>

      {/* Game Action Buttons */}
      <div className="flex gap-4 w-full px-4">
        {(isPlaying || isPaused) && (
          <button 
            onClick={onTogglePause}
            className="flex-1 py-3 rounded-lg font-orbitron font-bold transition-all border border-cyan-500/50 text-cyan-400 bg-slate-900 hover:bg-cyan-500 hover:text-white"
          >
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
        )}
        <button 
          onClick={onReset}
          className="flex-1 py-3 rounded-lg font-orbitron font-bold transition-all border border-rose-500/50 text-rose-400 bg-slate-900 hover:bg-rose-500 hover:text-white"
        >
          {status === GameStatus.IDLE ? 'START' : 'RESTART'}
        </button>
      </div>

      <p className="hidden md:block text-slate-500 text-xs uppercase tracking-widest mt-2">
        Desktop: Use Arrow Keys or WASD to navigate
      </p>
    </div>
  );
};

const ControlButton: React.FC<{ onClick: () => void; icon: string }> = ({ onClick, icon }) => (
  <button 
    onClick={onClick}
    className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl text-white active:scale-90 active:bg-cyan-500 transition-all shadow-lg"
  >
    {icon}
  </button>
);

export default Controls;
