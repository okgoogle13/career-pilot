/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NORTHCOTE CURIO DESIGN SYSTEM - ESLINT CONFIGURATION
 * Victorian Naturalist Field Station Design System V2.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This ESLint configuration enforces Northcote Curio design system constraints
 * at the code level, preventing anti-patterns and ensuring visual consistency.
 * 
 * Documentation: See DOC-001 (Design System Specification)
 * ═══════════════════════════════════════════════════════════════════════════
 */

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['./eslint-plugin-northcote-design-system'],
    rules: {
        forbiddenClasses: [
            'bg-white',
            'bg-black',
            'text-white',
            'text-black',
            'border-white',
            'border-black',
        ],
        message:
            'Use palette-specific colors (bg-parchment, text-specimen-night) instead of generic white/black. See DOC-001 Section 2.',
    },
        ],

    // ═══════════════════════════════════════════════════════════════════════
    // 3. FONT FAMILY CONSTRAINTS
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-font-families': [
        'error',
        {
            allowedClasses: [
                'font-proclamation',
                'font-bloom',
                'font-field-note',
                'font-annotation',
            ],
            forbiddenClasses: ['font-sans', 'font-serif', 'font-mono'],
            forbiddenFonts: [
                'Inter',
                'Plus Jakarta Sans',
                'Roboto',
                'Arial',
                'Helvetica',
                'system-ui',
            ],
            message:
                'Use Northcote font families (font-proclamation, font-bloom, font-field-note, font-annotation). See DOC-001 Section 4: The Federation Typography Stack.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 4. SHADOW CONSTRAINTS
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-shadow-system': [
        'error',
        {
            allowedClasses: [
                'shadow-none',
                'shadow-subtle',
                'shadow-standard',
                'shadow-elevated',
                'shadow-maximum',
                'shadow-wattle-glow',
                'shadow-wattle-glow-sm',
                'shadow-waratah-glow',
                'shadow-focus-ring',
            ],
            forbiddenClasses: [
                'shadow-sm',
                'shadow-md',
                'shadow-lg',
                'shadow-xl',
                'shadow-2xl',
            ],
            message:
                'Use Northcote shadow system (shadow-subtle, shadow-standard, shadow-elevated). Shadows must have 0 X-axis offset (Ink Pool philosophy). See DOC-001 Section 5.',
        },
    ],

    'northcote-design-system/no-x-axis-shadows': [
        'error',
        {
            message:
                'Shadows must have 0 X-axis offset (Ink Pool philosophy). Use shadow-subtle, shadow-standard, or shadow-elevated. See DOC-001 Section 5.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 5. EASING CURVE CONSTRAINTS
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-easing-curves': [
        'warn',
        {
            allowedClasses: [
                'ease-viscous-breeze',
                'ease-reveal',
                'ease-snap',
                'ease-viscous',
            ],
            allowedCubicBezier: [
                'cubic-bezier(0.34, 1.56, 0.64, 1)', // Viscous Breeze
                'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Reveal
                'cubic-bezier(0.2, 0, 0, 1)', // Snap
            ],
            forbiddenClasses: ['ease-in', 'ease-out', 'ease-linear'],
            message:
                'Use Northcote easing curves (ease-viscous-breeze, ease-reveal, ease-snap). Avoid generic easing. See DOC-001 Section 6: Viscous Breeze Physics.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 6. ANIMATION DURATION CONSTRAINTS
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-duration-scale': [
        'warn',
        {
            allowedClasses: ['duration-fast', 'duration-standard', 'duration-slow'],
            allowedValues: ['150ms', '300ms', '600ms'],
            message:
                'Use Northcote duration scale (duration-fast: 150ms, duration-standard: 300ms, duration-slow: 600ms). See DOC-001 Section 6.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 7. SPACING SCALE CONSTRAINTS
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-spacing-scale': [
        'warn',
        {
            allowedClasses: [
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                'xxl',
                'xxxl',
                // Also allow Tailwind defaults for now (can be tightened later)
            ],
            message:
                'Prefer Northcote spacing scale (xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px, xxl: 32px, xxxl: 48px). See DOC-001 Section 7.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 8. FRAUNCES AXES ORCHESTRATION
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-fraunces-axes': [
        'warn',
        {
            message:
                'When using font-bloom (Fraunces), add interactive axes (font-wonk-*, font-soft-*) on hover/active states. See DOC-001 Section 4.2: The Bloom.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 9. MODE CONSISTENCY (GALLERY VS LABORATORY)
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/enforce-mode-consistency': [
        'warn',
        {
            galleryMode: {
                allowedFonts: [
                    'font-proclamation',
                    'font-bloom',
                    'font-field-note',
                    'font-annotation',
                ],
                allowedColors: ['wattle-gold', 'waratah-crimson'],
            },
            laboratoryMode: {
                allowedFonts: ['font-field-note', 'font-annotation'],
                forbiddenFonts: ['font-bloom'],
                allowedColors: ['flannel-flower', 'eucalypt-smoke'],
            },
            message:
                'Gallery mode: Use Libre Bodoni, Fraunces, Wattle Gold. Laboratory mode: Use Work Sans, JetBrains Mono, Flannel Flower. See DOC-001 Section 8: Dual Modes.',
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // 10. ACCESSIBILITY REQUIREMENTS
    // ═══════════════════════════════════════════════════════════════════════
    'northcote-design-system/require-accessibility-attrs': [
        'warn',
        {
            interactiveElements: ['button', 'a', 'input', 'select', 'textarea'],
            requiredAttrs: ['aria-label', 'aria-labelledby', 'role'],
            message:
                'Interactive elements must have accessibility attributes (aria-label, role, etc.). See WCAG 2.1 AA standards.',
        },
    ],
},

    // ═══════════════════════════════════════════════════════════════════════
    // CUSTOM RULE IMPLEMENTATIONS
    // ═══════════════════════════════════════════════════════════════════════
    overrides: [
        {
            files: ['*.tsx', '*.jsx'],
            rules: {
                // React-specific rules
                'react/prop-types': 'off', // Using TypeScript
            },
        },
    ],

        settings: {
    react: {
        version: 'detect',
        },
},
};
