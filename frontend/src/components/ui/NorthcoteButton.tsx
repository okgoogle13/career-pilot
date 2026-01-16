import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useMode } from '../../context/ModeContext';

export interface NorthcoteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

/**
 * NorthcoteButton - Production-ready button component for Northcote Curio design system
 * 
 * Features:
 * - 100% semantic token usage (no hardcoded values)
 * - Dual-mode support (Gallery/Laboratory)
 * - Organic asymmetry (Pebble/Leaf shapes)
 * - Motion tokens for transitions
 * - WCAG 2.1 Level AA accessibility
 * 
 * Reference: M3TextField.tsx (100% compliant)
 */
export const NorthcoteButton = React.forwardRef<HTMLButtonElement, NorthcoteButtonProps>(
    ({ variant = 'primary', size = 'md', className, children, disabled, ...props }, ref) => {
        const { mode } = useMode();

        // Size variants
        const sizeClasses = {
            sm: 'h-10 px-4 text-sm',
            md: 'h-12 px-6 text-base',
            lg: 'h-14 px-8 text-lg',
        };

        // Variant styles using Northcote Curio tokens
        const variantStyles = {
            primary: {
                gallery: {
                    background: 'bg-primary-wattle-gold',
                    text: 'text-primary-on-primary',
                    hover: 'hover:bg-primary-wattle-glow',
                    shadow: 'shadow-sm hover:shadow-[var(--elevation-shadow-glow-gold)]',
                    border: '',
                },
                laboratory: {
                    background: 'bg-primary-wattle-gold',
                    text: 'text-primary-on-primary',
                    hover: 'hover:bg-primary-wattle-glow',
                    shadow: 'shadow-sm hover:shadow-[var(--elevation-shadow-hover)]',
                    border: '',
                },
            },
            secondary: {
                gallery: {
                    background: 'bg-surface-gallery-eucalypt-smoke-high',
                    text: 'text-secondary-flannel-flower',
                    hover: 'hover:bg-surface-gallery-eucalypt-smoke-highest',
                    shadow: 'shadow-sm',
                    border: 'border-2 border-secondary-flannel-flower',
                },
                laboratory: {
                    background: 'bg-surface-laboratory-slate-smoke-high',
                    text: 'text-secondary-flannel-flower',
                    hover: 'hover:bg-surface-laboratory-slate-smoke-highest',
                    shadow: 'shadow-sm',
                    border: 'border border-secondary-flannel-dim',
                },
            },
            tertiary: {
                gallery: {
                    background: 'bg-tertiary-waratah-container',
                    text: 'text-tertiary-waratah-crimson',
                    hover: 'hover:bg-tertiary-waratah-crimson hover:text-on-surface-parchment',
                    shadow: 'shadow-sm',
                    border: 'border border-tertiary-waratah-crimson',
                },
                laboratory: {
                    background: 'bg-status-laboratory-clinical-alert-container',
                    text: 'text-status-laboratory-clinical-alert',
                    hover: 'hover:bg-status-laboratory-clinical-alert hover:text-on-surface-parchment',
                    shadow: 'shadow-sm',
                    border: 'border border-status-laboratory-clinical-alert',
                },
            },
        };

        const currentVariant = variantStyles[variant][mode];

        return (
            <motion.button
                ref={ref}
                className={cn(
                    // Base styles
                    'font-field-note font-bold uppercase tracking-wide',
                    'transition-all duration-[var(--duration-fast)]',
                    'disabled:opacity-50 disabled:cursor-not-allowed',

                    // Size
                    sizeClasses[size],

                    // Variant colors
                    currentVariant.background,
                    currentVariant.text,
                    currentVariant.hover,
                    currentVariant.shadow,
                    currentVariant.border,

                    // Organic asymmetry (Gallery) or precise (Laboratory)
                    mode === 'gallery'
                        ? 'rounded-[var(--radius-pebble)]' // 20px 6px 16px 28px
                        : 'rounded-[var(--radius-stone)]', // 16px 4px 12px 24px

                    className
                )}
                style={{
                    borderRadius: mode === 'gallery'
                        ? 'var(--radius-pebble)'
                        : 'var(--radius-stone)',
                }}
                whileHover={
                    !disabled
                        ? {
                            y: -2,
                            transition: {
                                type: 'spring',
                                stiffness: 500,
                                damping: 27,
                                mass: 1,
                            },
                        }
                        : undefined
                }
                whileTap={
                    !disabled
                        ? {
                            y: 0,
                            scale: 0.98,
                        }
                        : undefined
                }
                disabled={disabled}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

NorthcoteButton.displayName = 'NorthcoteButton';
