import { motion } from 'framer-motion';
import type { UseCase } from '../types';
import { useState } from 'react';
import { CornerDownRight, ArrowDown } from 'lucide-react';

interface UseCaseNodeProps {
    useCase: UseCase;
    isHighlighted?: boolean;
    isParent?: boolean;
    relationType?: 'include' | 'extend' | null;
    hasNext?: boolean;
}

export default function UseCaseNode({ useCase, isHighlighted, relationType, hasNext }: UseCaseNodeProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const getBadgeStyle = () => {
        if (relationType === 'include') {
            return 'bg-emerald-500 text-white';
        }
        if (relationType === 'extend') {
            return 'bg-interaction-500 text-white';
        }
        return 'bg-institutional-500 text-white';
    };

    const getBadgeText = () => {
        if (relationType === 'include') return 'OBLIGATORIO';
        if (relationType === 'extend') return 'OPCIONAL';
        return 'PRINCIPAL';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: isHighlighted ? 1.05 : 1,
            }}
            whileHover={{
                scale: 1.08,
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.3 }}
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Mobile Hierarchy Arrow (The "Ramificación" visual) */}
            {useCase.isChild && (
                <div className="absolute -left-6 top-0 text-white/40 md:hidden z-0">
                    <CornerDownRight size={24} />
                </div>
            )}

            <div
                className={`
          relative
          px-4 py-3
          rounded-xl
          border
          backdrop-blur-md
          transition-all duration-300
          ${isHighlighted
                        ? 'bg-white/20 border-white/60'
                        : 'bg-white/10 border-white/30'
                    }
          ${useCase.isChild ? 'ml-4' : ''}
        `}
            >
                {/* Badge */}
                <div className="absolute -top-2 -right-2">
                    <span className={`
            px-2 py-0.5 rounded-full text-[10px] font-bold
            ${getBadgeStyle()}
            shadow-md
          `}>
                        {getBadgeText()}
                    </span>
                </div>

                {/* Use Case ID */}
                <div className="text-[10px] font-mono text-white/70 mb-0.5">
                    {useCase.id}
                </div>

                {/* Use Case Name */}
                <h3 className="text-sm font-bold text-white mb-1 leading-tight">
                    {useCase.name}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-white/80 leading-snug">
                    {useCase.description}
                </p>

                {/* Tooltip with Requirement */}
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
              absolute z-50 -top-20 left-1/2 transform -translate-x-1/2
              bg-gray-900 text-white
              px-4 py-2 rounded-lg
              text-xs
              whitespace-nowrap
              shadow-2xl
              border border-white/20
            "
                    >
                        <div className="font-semibold mb-1">Requisito del PDF:</div>
                        <div className="text-gray-300">{useCase.requirement}</div>
                        {/* Arrow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                          w-0 h-0 
                          border-l-8 border-l-transparent
                          border-r-8 border-r-transparent
                          border-t-8 border-t-gray-900">
                        </div>
                    </motion.div>
                )}

                {/* Desktop Directional Arrow (Right) - HIDDEN ON MOBILE */}
                {hasNext && (
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-0 hidden md:block text-white/50">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                )}

                {/* Mobile Flow Arrow (Down) - HIDDEN ON DESKTOP */}
                {hasNext && !useCase.isChild && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:hidden text-white/30">
                        <ArrowDown size={16} />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
