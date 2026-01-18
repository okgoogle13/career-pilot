import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMode } from '@/hooks/use-mode';

const cardVariants = cva(
    'relative overflow-hidden transition-all duration-300',
    {
        variants: {
            variant: {
                filled: 'border-0',
                outlined: 'border',
                glass: 'backdrop-blur-md border',
            },
            mode: {
                gallery: '',
                laboratory: '',
            },
        },
        compoundVariants: [
            // Gallery Mode - Organic & Warm
            {
                mode: 'gallery',
                variant: 'filled',
                class: 'bg-surface-gallery-eucalypt-smoke text-on-surface-gallery-parchment',
            },
            {
                mode: 'gallery',
                variant: 'outlined',
                class: 'border-outline-gallery-sandstone text-on-surface-gallery-parchment',
            },
            {
                mode: 'gallery',
                variant: 'glass',
                class: 'bg-surface-gallery-glass-medium border-white/10 text-on-surface-gallery-parchment',
            },
            // Laboratory Mode - Precise & Cool
            {
                mode: 'laboratory',
                variant: 'filled',
                class: 'bg-surface-laboratory-deep-ocean text-on-surface-laboratory-parchment',
            },
            {
                mode: 'laboratory',
                variant: 'outlined',
                class: 'border-outline-laboratory-steel text-on-surface-laboratory-parchment',
            },
            {
                mode: 'laboratory',
                variant: 'glass',
                class: 'bg-surface-laboratory-glass-medium border-white/5 text-on-surface-laboratory-parchment',
            },
        ],
        defaultVariants: {
            variant: 'filled',
            mode: 'gallery',
        },
    }
);

export type M3CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>;
export type M3CardElevation = 'none' | 'low' | 'medium' | 'high';
export type M3CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface M3CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    as?: React.ElementType;
    hoverEffect?: boolean;
}

const M3Card = React.forwardRef<HTMLDivElement, M3CardProps>(
    ({ className, variant, as: Component = 'div', hoverEffect = true, ...props }, ref) => {
        const { mode } = useMode();


        const MotionComponent = motion(Component);

        return (
            <MotionComponent
                ref={ref}
                className={cn(cardVariants({ variant, mode }), className)}
                style={{
                    borderRadius: mode === 'gallery' ? 'var(--radius-stone)' : '8px' // var(--radius-seed) check needed
                }}
                whileHover={hoverEffect ? {
                    y: -4,
                    transition: { type: "spring", stiffness: 500, damping: 27, mass: 1 }
                } : undefined}
                {...props}
            />
        );
    }
);
M3Card.displayName = 'M3Card';

export interface M3CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface M3CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface M3CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const M3CardHeader = React.forwardRef<HTMLDivElement, M3CardHeaderProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('mb-4 flex items-start gap-3', className)} {...props} />
    )
);
M3CardHeader.displayName = 'M3CardHeader';

const M3CardContent = React.forwardRef<HTMLDivElement, M3CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex-1 text-sm', className)} {...props} />
    )
);
M3CardContent.displayName = 'M3CardContent';

const M3CardActions = React.forwardRef<HTMLDivElement, M3CardActionsProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('mt-4 flex items-center gap-2', className)} {...props} />
    )
);
M3CardActions.displayName = 'M3CardActions';

export { M3Card, M3CardHeader, M3CardContent, M3CardActions, cardVariants };
