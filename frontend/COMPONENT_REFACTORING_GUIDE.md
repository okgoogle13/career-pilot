# NORTHCOTE CURIO COMPONENT REFACTORING GUIDE

## 📋 Overview

This document provides refactored versions of the top 10 non-compliant components, converting them to full Northcote Curio compliance.

---

## COMPONENT 1: Button (CRITICAL - Already Fixed)

**Status:** ✅ **COMPLETED** (See previous remediation)

**Changes Made:**
- Replaced `bg-terracotta` → `bg-wattle-gold`
- Replaced `bg-sage` → `bg-eucalypt-smoke`
- Replaced `shadow-lg` → `shadow-standard`
- Added `ease-viscous-breeze` and `duration-standard`
- Added `hover:animate-bloom-lift`

---

## COMPONENT 2: GlassLeafCard (CRITICAL - Already Fixed)

**Status:** ✅ **COMPLETED** (See previous remediation)

**Changes Made:**
- Replaced `bg-[#1E1E1E]/60` → `bg-specimen-night/60`
- Replaced arbitrary `rounded-tl-[32px]...` → `rounded-leaf`
- Replaced `shadow-xl` → `shadow-elevated`
- Updated easing to Viscous Breeze

---

## COMPONENT 3: M3Button → NorthcoteButton

**Location:** `src/components/ui/M3Button.tsx`

**Status:** 🟡 **NEEDS REFACTOR**

**Issues:**
1. Uses legacy M3 color tokens (`bg-primary`, `bg-secondary`) instead of botanical names
2. Uses `clip-path: var(--md-ref-shape-gem)` which doesn't exist in new config
3. Missing Fraunces axes on hover
4. Shadow classes use M3 naming (`shadow-elevation-1`) instead of Northcote (`shadow-standard`)

**REFACTORED VERSION:**

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost';
export type ButtonColor = 'wattle' | 'waratah' | 'eucalypt';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

/**
 * NorthcoteButton - Northcote Curio Design System Button
 * 
 * Features:
 * - Pebble archetype shape (rounded-pebble)
 * - Botanical color palette (wattle, waratah, eucalypt)
 * - Viscous Breeze physics
 * - Bloom effect on hover
 * - Fraunces axes for expressive typography
 */
export function NorthcoteButton({
  children,
  variant = 'filled',
  color = 'wattle',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  const viscousTransition = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 27,
    mass: 1.0,
  };

  const sizeClasses = {
    sm: 'px-md py-sm text-body-sm',
    md: 'px-lg py-md text-body-md',
    lg: 'px-xl py-lg text-body-lg',
  };

  const variantClasses = {
    filled: {
      wattle: 'bg-wattle-gold text-specimen-night hover:bg-wattle-glow shadow-standard hover:shadow-elevated',
      waratah: 'bg-waratah-crimson text-parchment hover:bg-waratah-glow shadow-standard hover:shadow-elevated',
      eucalypt: 'bg-eucalypt-smoke text-parchment hover:bg-eucalypt-dusk shadow-subtle hover:shadow-standard',
    },
    outlined: {
      wattle: 'border-2 border-wattle-gold text-wattle-gold hover:bg-wattle-gold hover:text-specimen-night',
      waratah: 'border-2 border-waratah-crimson text-waratah-crimson hover:bg-waratah-crimson hover:text-parchment',
      eucalypt: 'border-2 border-eucalypt-smoke text-eucalypt-mist hover:bg-eucalypt-smoke hover:text-parchment',
    },
    text: {
      wattle: 'text-wattle-gold hover:bg-wattle-container',
      waratah: 'text-waratah-crimson hover:bg-waratah-container',
      eucalypt: 'text-eucalypt-mist hover:bg-eucalypt-smoke/10',
    },
    ghost: {
      wattle: 'text-wattle-gold hover:bg-eucalypt-smoke',
      waratah: 'text-waratah-crimson hover:bg-eucalypt-smoke',
      eucalypt: 'text-flannel-flower hover:bg-eucalypt-smoke',
    },
  };

  return (
    <motion.button
      type={type}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-sm',
        'rounded-pebble',
        'font-field-note font-semibold',
        'transition-all duration-standard ease-viscous-breeze',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wattle-gold focus-visible:ring-offset-2',
        
        // Size
        sizeClasses[size],
        
        // Variant + Color
        variantClasses[variant][color],
        
        // States
        disabled || loading
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:translate-y-[-2px] active:scale-[0.98]',
        
        className
      )}
      whileHover={
        disabled || loading
          ? {}
          : {
              scale: 1.02,
              fontVariationSettings: "'WONK' 0.7", // Fraunces axes
            }
      }
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={viscousTransition}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
}
```

**MIGRATION NOTES:**
1. Replace all `<M3Button>` imports with `<NorthcoteButton>`
2. Update color props: `color="primary"` → `color="wattle"`
3. Update variant props: `variant="elevated"` → `variant="filled"`
4. Remove `clip-path` styles (now using `rounded-pebble`)

**TESTING:**
```tsx
// Test all variants
<NorthcoteButton variant="filled" color="wattle">Filled Wattle</NorthcoteButton>
<NorthcoteButton variant="outlined" color="waratah">Outlined Waratah</NorthcoteButton>
<NorthcoteButton variant="text" color="eucalypt">Text Eucalypt</NorthcoteButton>
<NorthcoteButton variant="ghost" color="wattle">Ghost</NorthcoteButton>

// Test states
<NorthcoteButton disabled>Disabled</NorthcoteButton>
<NorthcoteButton loading>Loading</NorthcoteButton>
```

---

## COMPONENT 4: M3Card → StoneCard

**Location:** `src/components/ui/M3Card.tsx`

**Status:** 🟡 **NEEDS REFACTOR**

**Issues:**
1. Uses `clip-path: var(--md-ref-shape-pebble)` which doesn't exist
2. Uses legacy spacing tokens (`p-space-md`)
3. Missing touch feedback (`active:scale-[0.98]`)

**REFACTORED VERSION:**

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export type CardArchetype = 'pebble' | 'stone' | 'leaf' | 'seed';

export interface StoneCardProps {
  children: React.ReactNode;
  archetype?: CardArchetype;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * StoneCard - Northcote Curio Card Component
 * 
 * Features:
 * - Archetype-based shapes (pebble, stone, leaf, seed)
 * - Bloom effect on hover
 * - Touch feedback on press
 * - Viscous Breeze physics
 */
export function StoneCard({
  children,
  archetype = 'stone',
  hoverable = false,
  padding = 'lg',
  className,
  onClick,
}: StoneCardProps) {
  const viscousTransition = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 27,
    mass: 1.0,
  };

  const archetypeClasses = {
    pebble: 'rounded-pebble',
    stone: 'rounded-stone',
    leaf: 'rounded-leaf',
    seed: 'rounded-seed',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-sm',
    md: 'p-md',
    lg: 'p-lg',
    xl: 'p-xl',
  };

  return (
    <motion.div
      className={cn(
        // Base styles
        'bg-eucalypt-smoke',
        'border border-parchment/5',
        'shadow-standard',
        
        // Archetype
        archetypeClasses[archetype],
        
        // Padding
        paddingClasses[padding],
        
        // Interactive
        onClick ? 'cursor-pointer' : '',
        hoverable ? 'hover:shadow-elevated hover:translate-y-[-2px]' : '',
        
        // Transitions
        'transition-all duration-standard ease-viscous-breeze',
        
        className
      )}
      whileHover={hoverable ? { scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={viscousTransition}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e as any) : undefined}
    >
      {children}
    </motion.div>
  );
}
```

---

## COMPONENT 5: M3TextField → LensInput

**Location:** `src/components/ui/M3TextField.tsx`

**Status:** 🟡 **NEEDS REFACTOR**

**Issues:**
1. Uses `rounded-tech` which doesn't exist in new config
2. Uses legacy color tokens
3. Missing Bloom effect on focus

**REFACTORED VERSION:**

```tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface LensInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * LensInput - Northcote Curio Text Input
 * 
 * Named "Lens" for the Field Station metaphor (examining specimens).
 * 
 * Features:
 * - Leaf archetype shape
 * - Bloom effect on focus
 * - Field-note typography
 */
export const LensInput = forwardRef<HTMLInputElement, LensInputProps>(({
  label,
  helperText,
  error = false,
  errorMessage,
  startIcon,
  endIcon,
  fullWidth = false,
  className,
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const showError = error && errorMessage;
  const displayHelperText = showError ? errorMessage : helperText;

  return (
    <div className={cn('flex flex-col', fullWidth ? 'w-full' : 'w-auto')}>
      {/* Label */}
      {label && (
        <label className={cn(
          'mb-sm font-field-note font-semibold text-label-lg',
          error ? 'text-waratah-crimson' : 'text-parchment'
        )}>
          {label}
          {required && <span className="text-waratah-crimson ml-xs">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className={cn(
        // Base styles
        'flex items-center gap-sm',
        'rounded-leaf',
        'border-2',
        'px-md py-sm',
        'bg-eucalypt-smoke',
        
        // States
        error
          ? 'border-waratah-crimson'
          : isFocused
            ? 'border-wattle-gold ring-2 ring-wattle-gold/20 shadow-wattle-glow-sm'
            : 'border-eucalypt-mist hover:border-eucalypt-dusk',
        
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        
        // Transitions (Bloom effect)
        'transition-all duration-standard ease-viscous-breeze',
        isFocused ? 'translate-y-[-2px]' : '',
      )}>
        {/* Start Icon */}
        {startIcon && (
          <div className={cn(
            'flex-shrink-0',
            error ? 'text-waratah-crimson' : 'text-flannel-flower'
          )}>
            {startIcon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          className={cn(
            'w-full bg-transparent',
            'font-field-note text-body-md',
            'text-parchment placeholder:text-flannel-flower',
            'focus:outline-none',
            'disabled:cursor-not-allowed',
            className
          )}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={error}
          aria-describedby={displayHelperText ? `${props.id}-helper` : undefined}
          {...props}
        />

        {/* End Icon */}
        {endIcon && (
          <div className={cn(
            'flex-shrink-0',
            error ? 'text-waratah-crimson' : 'text-flannel-flower'
          )}>
            {endIcon}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {displayHelperText && (
        <p
          id={`${props.id}-helper`}
          className={cn(
            'mt-xs px-sm font-field-note text-label-sm',
            error ? 'text-waratah-crimson' : 'text-flannel-flower'
          )}
        >
          {displayHelperText}
        </p>
      )}
    </div>
  );
});

LensInput.displayName = 'LensInput';
```

---

## COMPONENT 6: StatusBadge → SpecimenTag

**Location:** `src/components/ui/StatusBadge/StatusBadge.tsx`

**REFACTORED VERSION:**

```tsx
import React from 'react';
import { cn } from '@/lib/cn';

export type SpecimenStatus = 'success' | 'warning' | 'info' | 'error';

export interface SpecimenTagProps {
  status: SpecimenStatus;
  label: string;
  className?: string;
}

/**
 * SpecimenTag - Northcote Curio Status Badge
 * 
 * Named "Specimen Tag" for the Field Station metaphor.
 * Uses Seed archetype (small, compact).
 */
export function SpecimenTag({ status, label, className }: SpecimenTagProps) {
  const statusClasses = {
    success: 'bg-semantic-success/15 text-semantic-success border-semantic-success/30',
    warning: 'bg-semantic-warning/15 text-semantic-warning border-semantic-warning/30',
    info: 'bg-semantic-info/15 text-semantic-info border-semantic-info/30',
    error: 'bg-waratah-crimson/15 text-waratah-crimson border-waratah-crimson/30',
  };

  return (
    <span className={cn(
      // Base styles
      'inline-flex items-center',
      'rounded-seed',
      'border',
      'px-sm py-xs',
      'font-annotation font-semibold text-label-sm uppercase tracking-wider',
      
      // Status
      statusClasses[status],
      
      className
    )}>
      {label}
    </span>
  );
}
```

---

## SUMMARY TABLE

| Component | Status | Effort | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Button | ✅ Complete | - | P0 | Already refactored |
| GlassLeafCard | ✅ Complete | - | P0 | Already refactored |
| M3Button → NorthcoteButton | 🟡 Pending | Medium | P1 | Refactor provided above |
| M3Card → StoneCard | 🟡 Pending | Medium | P1 | Refactor provided above |
| M3TextField → LensInput | 🟡 Pending | Medium | P1 | Refactor provided above |
| StatusBadge → SpecimenTag | 🟡 Pending | Low | P2 | Refactor provided above |
| M3Select | 🟡 Pending | Medium | P2 | Uses `rounded-tech` |
| M3Checkbox | 🟡 Pending | Low | P2 | Uses `rounded-full` (acceptable for circles) |
| M3Alert | 🟡 Pending | Low | P3 | Uses `rounded-pebble` (good!) |
| ApplicationCard | 🟡 Pending | Medium | P3 | Check for hardcoded values |

---

## NEXT STEPS

1. **Implement Refactored Components** (P1):
   - Create new files for `NorthcoteButton`, `StoneCard`, `LensInput`, `SpecimenTag`
   - Add Storybook stories for each
   - Add tests for each

2. **Migration Strategy**:
   - Keep `M3*` components temporarily for backward compatibility
   - Add deprecation warnings
   - Update all pages to use new components
   - Remove `M3*` components after migration complete

3. **Documentation**:
   - Update component documentation
   - Create migration guide for developers
   - Add examples to Storybook

4. **Testing**:
   - Visual regression tests
   - Accessibility tests
   - Interactive state tests

---

## TESTING CHECKLIST

For each refactored component:

- [ ] All variants render correctly
- [ ] Hover states work (Bloom effect)
- [ ] Focus states work (keyboard navigation)
- [ ] Disabled states work
- [ ] Accessibility attributes present
- [ ] Responsive on mobile
- [ ] Works in Gallery mode
- [ ] Works in Laboratory mode
- [ ] Storybook story exists
- [ ] Unit tests pass
- [ ] Visual regression tests pass
