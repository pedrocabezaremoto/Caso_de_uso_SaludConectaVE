import { motion } from 'framer-motion';
import { User, Building2, Stethoscope, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Actor } from '../types';

interface ActorCardProps {
    actor: Actor;
    isSelected: boolean;
    onClick: () => void;
}

const iconMap: Record<string, LucideIcon> = {
    User,
    Building2,
    Stethoscope,
    Database,
};

export default function ActorCard({ actor, isSelected, onClick }: ActorCardProps) {
    const Icon = iconMap[actor.icon];

    const colorClasses = {
        emerald: {
            bg: 'bg-emerald-500',
            border: 'border-emerald-400',
            glow: 'shadow-emerald-500/50',
            text: 'text-emerald-100',
        },
        institutional: {
            bg: 'bg-institutional-500',
            border: 'border-institutional-400',
            glow: 'shadow-institutional-500/50',
            text: 'text-institutional-100',
        },
    };

    const colors = colorClasses[actor.color as keyof typeof colorClasses];

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                opacity: isSelected ? 1 : 0.7,
                scale: isSelected ? 1.1 : 1,
            }}
            className="relative cursor-pointer"
            onClick={onClick}
        >
            <motion.div
                animate={{
                    boxShadow: isSelected
                        ? '0 0 30px rgba(16, 185, 129, 0.6)'
                        : '0 0 15px rgba(16, 185, 129, 0.3)',
                }}
                className={`
          w-16 h-16 md:w-20 md:h-20 rounded-full
          ${colors.bg}
          border-4 ${colors.border}
          flex flex-col items-center justify-center
          backdrop-blur-sm
          transition-all duration-300
          ${isSelected ? 'ring-4 ring-white/30' : ''}
        `}
            >
                <Icon className={`w-7 h-7 md:w-8 md:h-8 ${colors.text}`} />
            </motion.div>

            <motion.p
                className="text-center mt-2 text-sm font-semibold text-white drop-shadow-lg"
                animate={{
                    scale: isSelected ? 1.1 : 1,
                }}
            >
                {actor.name}
            </motion.p>

            {isSelected && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                     bg-white/10 backdrop-blur-md px-3 py-1 rounded-full
                     text-xs text-white whitespace-nowrap"
                >
                    {actor.description}
                </motion.div>
            )}
        </motion.div>
    );
}
