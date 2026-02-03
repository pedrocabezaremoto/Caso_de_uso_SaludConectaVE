import { motion } from 'framer-motion';

interface ConnectionLineProps {
    type: 'include' | 'extend';
    isAnimating?: boolean;
}

export default function ConnectionLine({ type, isAnimating }: ConnectionLineProps) {
    const isInclude = type === 'include';

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
                {/* Gradient for INCLUDE lines */}
                <linearGradient id="includeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
                </linearGradient>

                {/* Arrow marker for INCLUDE */}
                <marker
                    id="arrowInclude"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                </marker>

                {/* Arrow marker for EXTEND */}
                <marker
                    id="arrowExtend"
                    markerWidth="10"
                    markerHeight="10"
                    refX="1"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M9,0 L9,6 L0,3 z" fill="#fb923c" />
                </marker>
            </defs>

            <motion.line
                x1="20%"
                y1="50%"
                x2="80%"
                y2="50%"
                stroke={isInclude ? 'url(#includeGradient)' : '#fb923c'}
                strokeWidth="3"
                strokeDasharray={isInclude ? '0' : '10 5'}
                markerEnd={isInclude ? 'url(#arrowInclude)' : undefined}
                markerStart={!isInclude ? 'url(#arrowExtend)' : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: isAnimating ? 1 : 0,
                    opacity: isAnimating ? 1 : 0,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Animated particles for INCLUDE */}
            {isInclude && isAnimating && (
                <>
                    <motion.circle
                        r="4"
                        fill="#10b981"
                        initial={{ cx: '20%', cy: '50%' }}
                        animate={{ cx: '80%', cy: '50%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.circle
                        r="4"
                        fill="#34d399"
                        initial={{ cx: '20%', cy: '50%' }}
                        animate={{ cx: '80%', cy: '50%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                    />
                </>
            )}

            {/* Marching ants animation for EXTEND */}
            {!isInclude && isAnimating && (
                <motion.line
                    x1="20%"
                    y1="50%"
                    x2="80%"
                    y2="50%"
                    stroke="#fb923c"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
            )}
        </svg>
    );
}
