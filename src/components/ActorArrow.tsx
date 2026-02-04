import { motion } from 'framer-motion';

interface ActorArrowProps {
    isActive: boolean;
    color: string;
}

export default function ActorArrow({ isActive, color }: ActorArrowProps) {
    if (!isActive) return null;

    return (
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-20 overflow-visible w-12 h-8">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 50 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                <defs>
                    <marker
                        id={`arrowhead-${color}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill={color} />
                    </marker>
                </defs>

                <motion.path
                    d="M 0 16 H 50"
                    stroke={color}
                    strokeWidth="3"
                    markerEnd={`url(#arrowhead-${color})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </svg>
        </div>
    );
}
