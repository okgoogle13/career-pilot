/**
 * ESLint Plugin: Northcote Curio Design System
 * 
 * Enforces design system constraints at the code level.
 */

const enforceRadiusArchetypes = require('./rules/enforce-radius-archetypes');
const noHardcodedBorderRadius = require('./rules/no-hardcoded-border-radius');
const enforceColorPalette = require('./rules/enforce-color-palette');
const noGenericColors = require('./rules/no-generic-colors');
const enforceFontFamilies = require('./rules/enforce-font-families');
const enforceShadowSystem = require('./rules/enforce-shadow-system');
const noXAxisShadows = require('./rules/no-x-axis-shadows');
const enforceEasingCurves = require('./rules/enforce-easing-curves');
const enforceDurationScale = require('./rules/enforce-duration-scale');
const enforceSpacingScale = require('./rules/enforce-spacing-scale');

module.exports = {
    rules: {
        'enforce-radius-archetypes': enforceRadiusArchetypes,
        'no-hardcoded-border-radius': noHardcodedBorderRadius,
        'enforce-color-palette': enforceColorPalette,
        'no-generic-colors': noGenericColors,
        'enforce-font-families': enforceFontFamilies,
        'enforce-shadow-system': enforceShadowSystem,
        'no-x-axis-shadows': noXAxisShadows,
        'enforce-easing-curves': enforceEasingCurves,
        'enforce-duration-scale': enforceDurationScale,
        'enforce-spacing-scale': enforceSpacingScale,
    },
    configs: {
        recommended: {
            plugins: ['northcote-design-system'],
            rules: {
                'northcote-design-system/enforce-radius-archetypes': 'error',
                'northcote-design-system/no-hardcoded-border-radius': 'error',
                'northcote-design-system/enforce-color-palette': 'error',
                'northcote-design-system/no-generic-colors': 'error',
                'northcote-design-system/enforce-font-families': 'error',
                'northcote-design-system/enforce-shadow-system': 'error',
                'northcote-design-system/no-x-axis-shadows': 'error',
                'northcote-design-system/enforce-easing-curves': 'warn',
                'northcote-design-system/enforce-duration-scale': 'warn',
                'northcote-design-system/enforce-spacing-scale': 'warn',
            },
        },
    },
};
