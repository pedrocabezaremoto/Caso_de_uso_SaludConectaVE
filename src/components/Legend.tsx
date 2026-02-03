import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Circle, Info, X } from 'lucide-react';

export default function Legend() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed bottom-24 left-4 z-50 p-3 bg-white/10 backdrop-blur-md 
                         border border-white/20 rounded-full text-white shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Info size={20} />}
            </motion.button>

            {/* Legend Container - Always visible on Desktop, Conditional on Mobile */}
            <AnimatePresence>
                {(isOpen || window.innerWidth >= 768) && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed bottom-36 left-4 md:bottom-28 md:right-8 md:left-auto 
                                  bg-gray-900/80 md:bg-white/10 backdrop-blur-md rounded-xl p-4 
                                  border border-white/20 shadow-2xl max-w-[280px] z-40
                                  ${!isOpen ? 'hidden md:block' : 'block'}`}
                    >
                        <h3 className="text-sm font-bold text-white mb-3 text-center border-b border-white/10 pb-2">
                            Convenciones UML (UNERG)
                        </h3>

                        {/* INCLUDE Section */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span className="font-semibold text-emerald-300 text-xs">
                                    INCLUDE (Obligatorio)
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-1 pl-1">
                                <div className="flex-shrink-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
                                <ArrowRight className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            </div>
                            <p className="text-[10px] text-white/70 ml-6 leading-tight">
                                Siempre ocurre. Caso padre <strong>REQUIERE</strong> al hijo.
                            </p>
                        </div>

                        {/* EXTEND Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Circle className="w-4 h-4 text-interaction-400" />
                                <span className="font-semibold text-interaction-300 text-xs">
                                    EXTEND (Opcional)
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-1 pl-1">
                                <ArrowRight className="w-3 h-3 text-interaction-400 flex-shrink-0" />
                                <div className="flex-shrink-0 w-8 h-0.5 border-t-2 border-dashed border-interaction-400"></div>
                            </div>
                            <p className="text-[10px] text-white/70 ml-6 leading-tight">
                                Opcional/Condicional. No es parte del flujo principal.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
