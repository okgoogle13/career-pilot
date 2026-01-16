/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NORTHCOTE CURIO DESIGN SYSTEM - PRETTIER CONFIGURATION
 * Victorian Naturalist Field Station Design System V2.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This Prettier configuration enforces consistent code formatting that aligns
 * with Northcote Curio design principles.
 * 
 * Documentation: See DOC-001 (Design System Specification)
 * ═══════════════════════════════════════════════════════════════════════════
 */

module.exports = {
    // ═══════════════════════════════════════════════════════════════════════
    // BASIC FORMATTING
    // ═══════════════════════════════════════════════════════════════════════
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
    trailingComma: 'es5',
    printWidth: 100,
    endOfLine: 'lf',

    // ═══════════════════════════════════════════════════════════════════════
    // REACT/JSX SPECIFIC
    // ═══════════════════════════════════════════════════════════════════════
    jsxSingleQuote: false,
    jsxBracketSameLine: false,

    // ═══════════════════════════════════════════════════════════════════════
    // TAILWIND CSS CLASS ORDERING
    // ═══════════════════════════════════════════════════════════════════════
    plugins: [
        require('prettier-plugin-tailwindcss'),
        require('@trivago/prettier-plugin-sort-imports'),
    ],

    // Tailwind CSS class ordering (enforces consistent className structure)
    tailwindConfig: './tailwind.config.js',
    tailwindFunctions: ['cn', 'clsx', 'cva'],

    // ═══════════════════════════════════════════════════════════════════════
    // IMPORT ORDERING (DESIGN SYSTEM STRUCTURE)
    // ═══════════════════════════════════════════════════════════════════════
    importOrder: [
        // 1. React and core libraries
        '^react',
        '^next',
        '<THIRD_PARTY_MODULES>',

        // 2. Design system components (Northcote Curio)
        '^@/components/core/(.*)$',
        '^@/components/atomic/(.*)$',
        '^@/components/ui/(.*)$',
        '^@/components/shared/(.*)$',

        // 3. Layouts and features
        '^@/layouts/(.*)$',
        '^@/features/(.*)$',

        // 4. Utilities and helpers
        '^@/lib/(.*)$',
        '^@/utils/(.*)$',
        '^@/hooks/(.*)$',

        // 5. Types and schemas
        '^@/types/(.*)$',
        '^@/schemas/(.*)$',

        // 6. Theme and design tokens
        '^@/theme/(.*)$',

        // 7. Relative imports
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,

    // ═══════════════════════════════════════════════════════════════════════
    // FILE-SPECIFIC OVERRIDES
    // ═══════════════════════════════════════════════════════════════════════
    overrides: [
        {
            files: '*.json',
            options: {
                printWidth: 80,
            },
        },
        {
            files: '*.md',
            options: {
                printWidth: 80,
                proseWrap: 'always',
            },
        },
        {
            files: ['*.tsx', '*.jsx'],
            options: {
                // Enforce component structure formatting
                printWidth: 100,
            },
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // CUSTOM FORMATTING RULES
    // ═══════════════════════════════════════════════════════════════════════
    arrowParens: 'always',
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'css',
    quoteProps: 'as-needed',
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NORTHCOTE CURIO COMPONENT STRUCTURE CONVENTION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Prettier will enforce this structure automatically:
 * 
 * 1. IMPORTS
 *    - React/Next
 *    - Third-party libraries
 *    - Design system components (core → atomic → ui → shared)
 *    - Layouts/Features
 *    - Utils/Hooks
 *    - Types
 *    - Theme
 *    - Relative imports
 * 
 * 2. TYPES/INTERFACES
 *    - Props interfaces
 *    - Component-specific types
 * 
 * 3. COMPONENT DEFINITION
 *    - Main component function
 *    - Sub-components (if any)
 * 
 * 4. STYLES (if using CSS-in-JS)
 *    - Styled components
 *    - CSS modules
 * 
 * 5. EXPORTS
 *    - Named exports
 *    - Default export
 * 
 * Example:
 * 
 * ```tsx
 * // 1. IMPORTS
 * import React from 'react';
 * import { motion } from 'framer-motion';
 * 
 * import { Pebble } from '@/components/core/Pebble';
 * import { cn } from '@/lib/cn';
 * 
 * // 2. TYPES
 * interface ButtonProps {
 *   children: React.ReactNode;
 *   variant?: 'default' | 'destructive';
 * }
 * 
 * // 3. COMPONENT
 * export function Button({ children, variant = 'default' }: ButtonProps) {
 *   return (
 *     <button
 *       className={cn(
 *         'rounded-pebble bg-wattle-gold px-lg py-md font-field-note',
 *         'shadow-standard hover:shadow-elevated',
 *         'transition-all duration-standard ease-viscous-breeze'
 *       )}
 *     >
 *       {children}
 *     </button>
 *   );
 * }
 * 
 * // 4. EXPORTS
 * export default Button;
 * ```
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
