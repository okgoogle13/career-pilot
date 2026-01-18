/**
 * Rule: no-generic-colors
 * 
 * Prevents use of generic color classes like bg-white, bg-black, text-white, text-black.
 * Use palette-specific colors instead (bg-parchment, text-specimen-night).
 */

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Prevent generic color classes',
            category: 'Design System',
            recommended: true,
        },
        messages: {
            genericColor: 'Use palette-specific colors (bg-parchment, text-specimen-night) instead of "{{className}}". See DOC-001 Section 2: Moonlight on Velvet Palette.',
        },
        fixable: 'code',
        schema: [],
    },

    create(context) {
        const forbiddenClasses = [
            'bg-white',
            'bg-black',
            'text-white',
            'text-black',
            'border-white',
            'border-black',
        ];

        const replacements = {
            'bg-white': 'bg-parchment',
            'bg-black': 'bg-specimen-night',
            'text-white': 'text-parchment',
            'text-black': 'text-specimen-night',
            'border-white': 'border-parchment',
            'border-black': 'border-specimen-night',
        };

        return {
            JSXAttribute(node) {
                if (node.name.name !== 'className') return;

                const value = node.value;
                if (!value || value.type !== 'Literal') return;

                const classNames = value.value.split(/\s+/);
                let hasViolation = false;
                const fixedClassNames = classNames.map((className) => {
                    if (forbiddenClasses.includes(className)) {
                        hasViolation = true;
                        return replacements[className] || className;
                    }
                    return className;
                });

                if (hasViolation) {
                    context.report({
                        node,
                        messageId: 'genericColor',
                        data: {
                            className: classNames.find((c) => forbiddenClasses.includes(c)),
                        },
                        fix(fixer) {
                            return fixer.replaceText(value, `"${fixedClassNames.join(' ')}"`);
                        },
                    });
                }
            },
        };
    },
};
