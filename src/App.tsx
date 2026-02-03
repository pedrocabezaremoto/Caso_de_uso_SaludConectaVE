import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import ActorCard from './components/ActorCard';
import UseCaseNode from './components/UseCaseNode';
import Legend from './components/Legend';
import FlowSimulator from './components/FlowSimulator';
import ActorArrow from './components/ActorArrow';
import { actors, useCases, relationships } from './data/useCasesData';

function App() {
    const [selectedActor, setSelectedActor] = useState<string | null>(null);
    const [highlightedUseCases, setHighlightedUseCases] = useState<string[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const handleActorClick = (actorId: string) => {
        if (isSimulating) return; // Prevent clicking during simulation

        if (selectedActor === actorId) {
            setSelectedActor(null);
            setHighlightedUseCases([]);
        } else {
            setSelectedActor(actorId);
            setHighlightedUseCases([]);
        }
    };

    const handleFlowPhaseChange = useCallback((_phase: number, useCaseIds: string[], activeActorId?: string) => {
        setIsSimulating(true);
        // Ensure strictly only the active actor is selected to enforce "Spotlight" mode
        if (activeActorId) {
            setSelectedActor(activeActorId);
        }
        setHighlightedUseCases(useCaseIds);
    }, []);

    const handleFlowReset = useCallback(() => {
        setIsSimulating(false);
        setHighlightedUseCases([]);
        setSelectedActor(null);
    }, []);

    // Filter use cases based on selected actor
    const displayedUseCases = selectedActor
        ? useCases.filter(uc => uc.actorId === selectedActor)
        : highlightedUseCases.length > 0
            ? useCases.filter(uc => highlightedUseCases.includes(uc.id))
            : [];

    // Get relationships for displayed use cases
    const getRelationType = (useCaseId: string) => {
        const rel = relationships.find(r => r.to === useCaseId || r.from === useCaseId);
        return rel?.type || null;
    };

    // Calculate top margin based on selected actor index to align use cases
    const getUseCaseAlignment = () => {
        if (!selectedActor && highlightedUseCases.length === 0) return 'items-center'; // Center help text

        const index = actors.findIndex(a => a.id === selectedActor);
        if (index === -1) return 'items-center';

        // Custom alignment classes based on actor position - Mobile: simple vertical stack, Desktop: custom spacing
        switch (index) {
            case 0: return 'items-start md:pt-4'; // Paciente
            case 1: return 'items-start md:pt-32'; // Centro
            case 2: return 'items-start md:pt-80'; // Médico
            case 3: return 'items-end md:pb-12'; // Sistema (Align to bottom)
            default: return 'items-center';
        }
    };

    return (
        <div className="min-h-screen w-full overflow-hidden relative">
            <AnimatedBackground />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 py-6 px-4 md:px-8"
            >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-4 md:px-8 
                      border border-white/20 shadow-2xl max-w-7xl mx-auto">
                    <h1 className="text-xl md:text-4xl font-bold text-center text-white">
                        DIAGRAMA INTERACTIVO CASOS DE USO - SALUDCONECTA VE
                    </h1>
                    <p className="text-center text-white/80 mt-2 text-xs md:text-sm">
                        Universidad Nacional Experimental de los Llanos Occidentales "Ezequiel Zamora" (UNERG)
                    </p>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="relative z-10 px-4 md:px-8 py-4 md:py-8 mb-24 md:mb-0">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Actors Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="col-span-1 md:col-span-2 flex flex-row md:flex-col gap-4 md:gap-8 overflow-x-auto pb-4 md:pb-0 justify-start md:justify-start items-center md:items-stretch scrollbar-hide px-2"
                        >
                            {actors.map((actor, index) => (
                                <div key={actor.id} className="relative flex-shrink-0">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ActorCard
                                            actor={actor}
                                            isSelected={selectedActor === actor.id}
                                            onClick={() => handleActorClick(actor.id)}
                                        />
                                    </motion.div>

                                    {/* Arrow pointing to use cases - Hidden on mobile for cleaner look */}
                                    <div className="hidden md:block">
                                        <ActorArrow
                                            isActive={selectedActor === actor.id}
                                            color={selectedActor === actor.id ? '#10b981' : 'transparent'}
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Use Cases Grid */}
                        <div className={`col-span-1 md:col-span-10 min-h-[400px] md:min-h-[600px] flex ${getUseCaseAlignment()} transition-all duration-500`}>
                            <AnimatePresence mode="wait">
                                {displayedUseCases.length > 0 ? (
                                    <motion.div
                                        key={selectedActor || 'simulation'}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="w-full flex flex-wrap justify-center gap-4 md:gap-8 content-start md:content-center pb-20 md:pb-0"
                                    >
                                        {displayedUseCases.map((useCase, index) => (
                                            <motion.div
                                                key={useCase.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="w-full sm:w-auto flex justify-center"
                                            >
                                                <UseCaseNode
                                                    useCase={useCase}
                                                    isHighlighted={highlightedUseCases.includes(useCase.id)}
                                                    relationType={getRelationType(useCase.id)}
                                                    hasNext={index < displayedUseCases.length - 1}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="w-full flex items-center justify-center"
                                    >
                                        <div className="text-center">
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                                className="text-6xl mb-4"
                                            >
                                                👆
                                            </motion.div>
                                            <h2 className="text-2xl font-bold text-white mb-2">
                                                Selecciona un Actor
                                            </h2>
                                            <p className="text-white/70">
                                                o presiona "Simular Flujo Completo" para ver la demostración
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <Legend />

            {/* Flow Simulator */}
            <FlowSimulator
                onPhaseChange={handleFlowPhaseChange}
                onReset={handleFlowReset}
            />
        </div>
    );
}

export default App;
