/**
 * Rule: enforce-shadow-system
 * 
 * Enforces use of Northcote shadow system.
 * Forbidden: shadow-sm, shadow-md, shadow-lg, shadow-xl
 * Allowed: shadow-subtle, shadow-standard, shadow-elevated, shadow-maximum
 */

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce Northcote shadow system',
            category: 'Design System',
            recommended: true,
        },
        messages: {
            forbiddenShadow: 'Use Northcote shadow system (shadow-subtle, shadow-standard, shadow-elevated, shadow-maximum) instead of "{{className}}". See DOC-001 Section 5: Ink Pools.',
        },
        fixable: 'code',
        schema: [],
    },

    create(context) {
        const forbiddenClasses = [
            'shadow-sm',
            'shadow-md',
            'shadow-lg',
            'shadow-xl',
            'shadow-2xl',
        ];

        const replacements = {
            'shadow-sm': 'shadow-subtle',
            'shadow-md': 'shadow-standard',
            'shadow-lg': 'shadow-standard',
            'shadow-xl': 'shadow-elevated',
            'shadow-2xl': 'shadow-maximum',
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
                        messageId: 'forbiddenShadow',
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
