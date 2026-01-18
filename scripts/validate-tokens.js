import tokens from '../frontend/src/design-tokens.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';

console.log('🔍 Validating Northcote Curio Design Tokens...');

let errors = 0;

function assert(condition, message) {
    if (!condition) {
        console.error(`❌ ${message}`);
        errors++;
    } else {
        // console.log(`✓ ${message}`);
    }
}

// 1. Check Color Completeness
const requiredFamilies = ['specimen-night', 'wattle-gold', 'waratah-crimson', 'eucalypt-smoke', 'flannel-flower'];
requiredFamilies.forEach(family => {
    const familyData = tokens.color.families[family];
    assert(familyData, `Color family '${family}' exists`);
    if (familyData) {
        ['lightest', 'light', 'base', 'dark', 'darkest'].forEach(shade => {
            assert(familyData[shade], `Color family '${family}' has shade '${shade}'`);
            assert(familyData[shade].startsWith('#'), `Color '${family}.${shade}' is a valid hex`);
        });
    }
});

// 2. Check Spacing Scale
['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].forEach(size => {
    assert(tokens.spacing[size], `Spacing '${size}' exists`);
});

// 3. Check Radius Archetypes
['pebble', 'stone', 'leaf', 'seed', 'sentry'].forEach(archetype => {
    assert(tokens.radius[archetype], `Radius archetype '${archetype}' exists`);
});

// 4. Check Shadows
['subtle', 'standard', 'elevated', 'maximum'].forEach(shadow => {
    assert(tokens.shadow[shadow], `Shadow '${shadow}' exists`);
});

if (errors === 0) {
    console.log('✅ Token validation passed! Structure is compliant with Phase 2 spec.');
} else {
    console.error(`🛑 Found ${errors} validation errors.`);
    process.exit(1);
}
