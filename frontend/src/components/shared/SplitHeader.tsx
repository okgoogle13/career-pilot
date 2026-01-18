import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMode } from '@/hooks/use-mode';

interface SplitHeaderProps {
    trunkText?: string;
    vineText?: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    className?: string;
}

const SplitHeader: React.FC<SplitHeaderProps> = ({
    trunkText,
    vineText,
    title,
    highlight,
    subtitle,
    alignment = 'left',
    className,
}) => {
    const { mode } = useMode();
    const trunk = trunkText ?? title ?? '';
    const vine = vineText ?? highlight ?? '';

    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    return (
        <div className={cn('flex flex-col gap-2', alignmentClasses[alignment], className)}>
            {/* Banksia Composition - Proclamation + Bloom */}
            <div className="relative inline-block">
                {/* Bottom Layer: Proclamation (Libre Bodoni) */}
                <motion.h1
                    className={cn(
                        "font-proclamation font-black uppercase tracking-tighter leading-none",
                        mode === 'gallery' ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl',
                        "text-parchment"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.55, 1.4] }}
                >
                    {trunk}
                </motion.h1>

                {/* Top Layer: Bloom (Fraunces with WONK) */}
                <motion.span
                    className={cn(
                        "font-bloom absolute text-primary-wattle-gold",
                        mode === 'gallery' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'
                    )}
                    style={{
                        fontVariationSettings: mode === 'gallery'
                            ? "'SOFT' 50, 'WONK' 1, 'wght' 600"
                            : "'SOFT' 20, 'WONK' 0, 'wght' 500",
                        transform: mode === 'gallery' ? 'rotate(-2deg)' : 'rotate(0deg)',
                        top: mode === 'gallery' ? '-0.5rem' : '0',
                        left: mode === 'gallery' ? '1rem' : '0.5rem',
                    }}
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: mode === 'gallery' ? -2 : 0
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }}
                >
                    {vine}
                </motion.span>
            </div>

            {/* Subtitle */}
            {subtitle && (
                <motion.p
                    className={cn(
                        "font-field-note text-secondary-flannel-flower max-w-2xl",
                        mode === 'gallery' ? 'text-lg' : 'text-base'
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export { SplitHeader };
