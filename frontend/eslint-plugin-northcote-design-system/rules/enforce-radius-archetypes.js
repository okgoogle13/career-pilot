/**
 * Rule: enforce-radius-archetypes
 * 
 * Enforces use of Northcote archetype radius classes only.
 * Forbidden: rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-full
 * Allowed: rounded-pebble, rounded-stone, rounded-leaf, rounded-seed, rounded-sentry
 */

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce Northcote archetype radius classes',
            category: 'Design System',
            recommended: true,
        },
        messages: {
            forbiddenRadius: 'Use Northcote archetype radius classes (rounded-pebble, rounded-stone, rounded-leaf, rounded-seed, rounded-sentry) instead of "{{className}}". See DOC-001 Section 3.2: Organic Asymmetry.',
        },
        schema: [],
    },

    create(context) {
        const forbiddenClasses = [
            'rounded-none',
            'rounded-sm',
            'rounded-md',
            'rounded-lg',
            'rounded-xl',
            'rounded-2xl',
            'rounded-3xl',
            'rounded-full',
        ];

        const allowedClasses = [
            'rounded-pebble',
            'rounded-stone',
            'rounded-leaf',
            'rounded-seed',
            'rounded-sentry',
        ];

        return {
            JSXAttribute(node) {
                if (node.name.name !== 'className') return;

                const value = node.value;
                if (!value || value.type !== 'Literal') return;

                const classNames = value.value.split(/\s+/);

                classNames.forEach((className) => {
                    if (forbiddenClasses.includes(className)) {
                        context.report({
                            node,
                            messageId: 'forbiddenRadius',
                            data: {
                                className,
                            },
                        });
                    }
                });
            },
        };
    },
};
