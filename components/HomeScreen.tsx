import React from 'react';

interface HomeScreenProps {
    highScore: number;
    onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ highScore, onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md animate-in fade-in zoom-in duration-700">
            {/* Decorative Neon Element */}
            <div className="relative mb-12">
                <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative flex flex-col items-center text-center">
                    <h1 className="text-6xl md:text-7xl font-orbitron font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-400 to-rose-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                        SNAKE<br />EVO
                    </h1>
                    <div className="mt-4 flex items-center gap-3 px-4 py-1 bg-slate-900/80 border border-cyan-500/30 rounded-full neon-border">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                        <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold font-orbitron">SYSTEM READY</span>
                    </div>
                </div>
            </div>

            {/* Best Score Badge */}
            <div className="mb-12 flex flex-col items-center gap-1 group">
                <span className="text-slate-500 uppercase text-[10px] tracking-[0.3em] font-bold">LEGACY HIGH SCORE</span>
                <div className="text-4xl font-orbitron font-bold text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] group-hover:scale-110 transition-transform cursor-default">
                    {highScore.toString().padStart(4, '0')}
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={onStart}
                className="group relative w-full overflow-hidden rounded-2xl p-[2px] focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-rose-500 animate-[spin_3s_linear_infinite]" />
                <div className="relative bg-slate-950 rounded-2xl py-5 px-10 transition-colors group-hover:bg-slate-900/50">
                    <span className="text-2xl font-orbitron font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        INITIATE
                    </span>
                </div>
            </button>

            {/* Instructions */}
            <div className="mt-16 grid grid-cols-2 gap-8 text-center opacity-60">
                <div className="flex flex-col gap-2">
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-widest font-orbitron">Keyboard</div>
                    <div className="text-[10px] text-slate-400">ARROWS / WASD</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest font-orbitron">Mobile</div>
                    <div className="text-[10px] text-slate-400">D-PAD CONTROLS</div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
