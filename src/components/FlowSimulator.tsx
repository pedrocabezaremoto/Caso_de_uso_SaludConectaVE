import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { flowPhases } from '../data/useCasesData';

interface FlowSimulatorProps {
    onPhaseChange: (phase: number, useCaseIds: string[], activeActorId?: string) => void;
    onReset: () => void;
}

export default function FlowSimulator({ onPhaseChange, onReset }: FlowSimulatorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Effect to handle the loop when playing
    useEffect(() => {
        if (!isPlaying) return;

        let currentPhaseIndex = 0;
        let mounted = true;

        const runSimulation = async () => {
            while (isPlaying && currentPhaseIndex < flowPhases.length && mounted) {
                const phase = flowPhases[currentPhaseIndex];

                // Notify parent about current phase and active actor
                onPhaseChange(
                    currentPhaseIndex + 1,
                    phase.useCases,
                    phase.activeActorId
                );

                // Simulate duration with progress
                const duration = phase.duration;
                const startTime = Date.now();

                await new Promise<void>(resolve => {
                    const interval = setInterval(() => {
                        if (!mounted || !isPlaying) {
                            clearInterval(interval);
                            resolve();
                            return;
                        }

                        const elapsed = Date.now() - startTime;
                        const p = (elapsed / duration) * 100;

                        // Global progress roughly calculated based on phase index
                        // This is a simplification; for a smoother total progress we'd need total duration
                        // But for now let's just show progress within the current action or just a generic spinner/bar
                        // Let's actually just pulse the button or something, or keep the bar simple
                        setProgress(p);

                        if (elapsed >= duration) {
                            clearInterval(interval);
                            resolve();
                        }
                    }, 50);
                });

                currentPhaseIndex++;
            }

            if (mounted && isPlaying) {
                setIsPlaying(false);
                setProgress(0);
                // Optional: Auto-reset or keep final state? 
                // Usually better to keep final state so user can see result
            }
        };

        runSimulation();

        return () => {
            mounted = false;
        };
    }, [isPlaying, onPhaseChange]);

    const handleReset = () => {
        setIsPlaying(false);
        setProgress(0);
        onReset();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2"
        >
            {/* Play/Pause Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className={`
                    relative overflow-hidden
                    flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-xl
                    transition-all backdrop-blur-md border border-white/20
                    ${isPlaying
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-orange-500 hover:bg-orange-600'
                    }
                `}
            >
                {/* Progress Overlay */}
                {isPlaying && (
                    <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-white/50"
                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    />
                )}

                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span>{isPlaying ? 'Pausar' : 'Simular Flujo Completo'}</span>
            </motion.button>

            {/* Reset Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReset}
                className="
                    p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white 
                    backdrop-blur-md border border-white/20 shadow-xl
                    transition-colors
                "
                title="Reiniciar todo"
            >
                <RotateCcw size={20} />
            </motion.button>
        </motion.div>
    );
}
