
import React, { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import Controls from './components/Controls';
import GameOverModal from './components/GameOverModal';
import { useGameLoop } from './hooks/useGameLoop';
import { Direction, GameStatus } from './types';

const App: React.FC = () => {
  const { state, resetGame, goToHome, togglePause, changeDirection } = useGameLoop();

  // Handle Keyboard Inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling with arrows
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection(Direction.RIGHT);
          break;
        case ' ':
          if (state.status === GameStatus.IDLE || state.status === GameStatus.GAME_OVER) {
            resetGame();
          } else {
            togglePause();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, state.status, resetGame, togglePause]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start p-4 md:p-8 gap-6 md:gap-10 select-none">
      {/* Header section */}
      <div className="flex flex-col items-center text-center gap-2 mt-4 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-orbitron font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-rose-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          SNAKE EVOLUTION
        </h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_5px_#22d3ee]" />
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">NEON MODE ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Scoring */}
      <ScoreBoard score={state.score} highScore={state.highScore} />

      {/* Main Game Area */}
      <div className="relative w-full max-w-md">
        <GameBoard 
          snake={state.snake} 
          food={state.food} 
          status={state.status} 
        />
      </div>

      {/* Control Interface */}
      <Controls 
        status={state.status}
        onDirectionChange={changeDirection}
        onTogglePause={togglePause}
        onReset={resetGame}
      />

      {/* Game Over Screen */}
      {state.status === GameStatus.GAME_OVER && (
        <GameOverModal 
          score={state.score} 
          highScore={state.highScore} 
          onRestart={resetGame}
          onHome={goToHome}
        />
      )}

      {/* Footer / Info */}
      <div className="mt-auto text-slate-500 text-[10px] uppercase tracking-widest text-center max-w-xs leading-relaxed opacity-50">
        Master the grid. Speed increases as you grow. 
        Don't bite your tail. 
      </div>
    </div>
  );
};

export default App;
