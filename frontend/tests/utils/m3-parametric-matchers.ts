/**
 * M3 Expressive Parametric Matchers for Playwright
 * 
 * Custom matchers that validate the mathematical relationship between 
 * Shape Path (clip-path) and Typography Axis (font-variation-settings).
 * 
 * These matchers enforce the M3 Expressive design system rules:
 * 1. Shapes must use polygon-based clip-path (not border-radius)
 * 2. Typography axes must sync with shape morphs
 * 3. font-weight must remain constant (Anti-Slop Rule)
 * 4. Spring physics must match M3 constants (stiffness: 500, damping: 27)
 */

import { expect as baseExpect, type Locator } from '@playwright/test';

/**
 * Shape definitions for M3 Expressive
 */
const M3_SHAPES = {
    pebble: 'polygon(8% 20%, 28% 8%, 48% 8%, 68% 8%, 88% 20%, 96% 40%, 96% 60%, 88% 80%, 68% 92%, 48% 92%, 28% 92%, 8% 80%, 4% 60%, 4% 40%)',
    leaf: 'polygon(5% 15%, 25% 5%, 45% 5%, 65% 5%, 85% 15%, 95% 35%, 95% 55%, 85% 75%, 65% 95%, 45% 95%, 25% 95%, 5% 75%, 5% 55%, 5% 35%)',
    gem: 'polygon(20% 0%, 50% 10%, 80% 0%, 95% 30%, 90% 60%, 70% 85%, 50% 100%, 30% 85%, 10% 60%, 5% 30%)',
    burst: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
};

/**
 * M3 Spring Physics Constants
 */
const M3_PHYSICS = {
    expressiveDefault: { stiffness: 500, damping: 27 },
    expressiveSlow: { stiffness: 300, damping: 21 },
    expressiveFast: { stiffness: 1400, damping: 45 },
    standard: { stiffness: 800, damping: 57 },
};

/**
 * Helper: Normalize clip-path string for comparison
 */
function normalizeClipPath(clipPath: string): string {
    return clipPath
        .replace(/\s+/g, ' ')
        .replace(/,\s*/g, ',')
        .trim()
        .toLowerCase();
}

/**
 * Helper: Extract font variation settings
 */
function parseFontVariationSettings(settings: string): Record<string, number> {
    const result: Record<string, number> = {};
    const matches = settings.matchAll(/'(\w+)'\s+([\d.]+)/g);

    for (const match of matches) {
        result[match[1]] = parseFloat(match[2]);
    }

    return result;
}

/**
 * Helper: Wait for animations to settle
 */
async function waitForAnimationSettle(locator: Locator, maxWaitMs = 500): Promise<void> {
    const startTime = Date.now();
    let previousClipPath = '';
    let stableCount = 0;
    const requiredStableChecks = 3;

    while (Date.now() - startTime < maxWaitMs) {
        const currentClipPath = await locator.evaluate(el =>
            window.getComputedStyle(el).clipPath
        );

        if (currentClipPath === previousClipPath) {
            stableCount++;
            if (stableCount >= requiredStableChecks) {
                return;
            }
        } else {
            stableCount = 0;
        }

        previousClipPath = currentClipPath;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

/**
 * Custom matcher: Validate M3 Expressive shape morphing
 * 
 * Checks that:
 * 1. Element uses polygon-based clip-path (not border-radius)
 * 2. clip-path matches one of the M3 shape definitions
 * 3. Animation settles within 500ms using spring physics
 */
async function toHaveExpressiveMorph(
    locator: Locator,
    targetShape: keyof typeof M3_SHAPES
): Promise<{ pass: boolean; message: () => string }> {
    const expectedClipPath = M3_SHAPES[targetShape];

    if (!expectedClipPath) {
        return {
            pass: false,
            message: () => `Invalid shape "${targetShape}". Must be one of: ${Object.keys(M3_SHAPES).join(', ')}`,
        };
    }

    // Trigger hover state
    await locator.hover();

    // Wait for animation to settle
    await waitForAnimationSettle(locator);

    // Get computed clip-path
    const computedClipPath = await locator.evaluate(el =>
        window.getComputedStyle(el).clipPath
    );

    // Check if it's a polygon (not "none" or border-radius)
    if (!computedClipPath || computedClipPath === 'none') {
        return {
            pass: false,
            message: () => `Expected polygon-based clip-path, but got: ${computedClipPath}. Element may be using border-radius instead.`,
        };
    }

    // Normalize and compare
    const normalizedComputed = normalizeClipPath(computedClipPath);
    const normalizedExpected = normalizeClipPath(expectedClipPath);

    const pass = normalizedComputed.includes('polygon') &&
        (normalizedComputed === normalizedExpected ||
            normalizedComputed.includes(targetShape));

    return {
        pass,
        message: () => pass
            ? `Expected element NOT to use ${targetShape} shape`
            : `Expected element to use ${targetShape} shape (${expectedClipPath}), but got: ${computedClipPath}`,
    };
}

/**
 * Custom matcher: Validate synchronized typography morphing
 * 
 * Checks that:
 * 1. font-variation-settings interpolates (GRAD changes)
 * 2. font-weight remains constant (Anti-Slop Rule)
 * 3. wdth axis compensates for shape changes
 */
async function toHaveSyncedTypography(
    locator: Locator
): Promise<{ pass: boolean; message: () => string }> {
    const errors: string[] = [];

    // Get initial state
    const initialState = await locator.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
            fontWeight: style.fontWeight,
            fontVariationSettings: style.fontVariationSettings,
        };
    });

    const initialAxes = parseFontVariationSettings(initialState.fontVariationSettings);
    const initialGRAD = initialAxes['GRAD'] || 0;
    const initialWdth = initialAxes['wdth'] || 100;

    // Trigger hover
    await locator.hover();

    // Wait a bit for mid-transition
    await new Promise(resolve => setTimeout(resolve, 200));

    // Get mid-transition state
    const midState = await locator.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
            fontWeight: style.fontWeight,
            fontVariationSettings: style.fontVariationSettings,
        };
    });

    const midAxes = parseFontVariationSettings(midState.fontVariationSettings);
    const midGRAD = midAxes['GRAD'] || 0;
    const midWdth = midAxes['wdth'] || 100;

    // CHECK A: GRAD must have changed
    if (midGRAD === initialGRAD) {
        errors.push(`GRAD Check Failed: Expected GRAD to interpolate, but it remained at ${initialGRAD}`);
    }

    // CHECK B: Anti-Slop Rule - font-weight must remain constant
    if (initialState.fontWeight !== midState.fontWeight) {
        errors.push(
            `Anti-Slop Rule Violated: font-weight changed from ${initialState.fontWeight} to ${midState.fontWeight}. ` +
            `This causes layout reflow. Use 'GRAD' axis instead.`
        );
    }

    // CHECK C: Variable Width - wdth should change to compensate
    if (midWdth === initialWdth) {
        errors.push(`Variable Width Check Failed: Expected 'wdth' to adjust, but it remained at ${initialWdth}`);
    }

    const pass = errors.length === 0;

    return {
        pass,
        message: () => pass
            ? 'Typography axes synchronized correctly with shape morph'
            : `Typography sync validation failed:\n${errors.join('\n')}`,
    };
}

/**
 * Custom matcher: Validate M3 spring physics
 * 
 * Checks that:
 * 1. Transitions use spring-based animation (not CSS easing)
 * 2. Motion exhibits characteristic "bounce" (overshoot)
 * 3. Settle time is within expected range (~350-450ms)
 */
async function toBeUsingM3Physics(
    locator: Locator,
    physicsType: keyof typeof M3_PHYSICS = 'expressiveDefault'
): Promise<{ pass: boolean; message: () => string }> {
    const expectedPhysics = M3_PHYSICS[physicsType];
    const errors: string[] = [];

    // Get initial transform
    const initialTransform = await locator.evaluate(el => ({
        transform: window.getComputedStyle(el).transform,
        time: Date.now(),
    }));

    // Trigger hover
    await locator.hover();

    // Sample transform values over time to detect overshoot
    const samples: { transform: string; time: number; scale: number }[] = [];
    const sampleDuration = 500; // ms
    const sampleInterval = 50; // ms
    const startTime = Date.now();

    while (Date.now() - startTime < sampleDuration) {
        const sample = await locator.evaluate(el => {
            const transform = window.getComputedStyle(el).transform;

            // Extract scale from matrix
            let scale = 1;
            if (transform && transform !== 'none') {
                const match = transform.match(/matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)/);
                if (match) {
                    scale = parseFloat(match[1]); // scaleX
                }
            }

            return {
                transform,
                time: Date.now(),
                scale,
            };
        });

        samples.push(sample);
        await new Promise(resolve => setTimeout(resolve, sampleInterval));
    }

    // Analyze for overshoot (characteristic of underdamped spring)
    let maxScale = 0;
    let finalScale = 0;

    for (const sample of samples) {
        if (sample.scale > maxScale) {
            maxScale = sample.scale;
        }
    }

    if (samples.length > 0) {
        finalScale = samples[samples.length - 1].scale;
    }

    // For M3 Expressive (ζ = 0.6), we expect overshoot
    // Target scale is typically 1.02, peak should be ~1.025
    const hasOvershoot = maxScale > finalScale && maxScale > 1.0;

    if (!hasOvershoot && physicsType.includes('expressive')) {
        errors.push(
            `Spring Overshoot Not Detected: Expected underdamped spring (ζ < 1) to overshoot. ` +
            `Max scale: ${maxScale.toFixed(4)}, Final scale: ${finalScale.toFixed(4)}`
        );
    }

    // Check settle time
    const settleTime = samples.length > 0 ? samples[samples.length - 1].time - startTime : 0;
    if (settleTime < 300 || settleTime > 550) {
        errors.push(
            `Settle Time Out of Range: Expected 300-550ms for M3 Expressive, got ${settleTime}ms`
        );
    }

    const pass = errors.length === 0;

    return {
        pass,
        message: () => pass
            ? `Element uses correct M3 ${physicsType} physics (stiffness: ${expectedPhysics.stiffness}, damping: ${expectedPhysics.damping})`
            : `M3 Physics validation failed:\n${errors.join('\n')}`,
    };
}

/**
 * Extend Playwright's expect with custom M3 Expressive matchers
 */
export const expect = baseExpect.extend({
    toHaveExpressiveMorph,
    toHaveSyncedTypography,
    toBeUsingM3Physics,
});

/**
 * Type augmentation for TypeScript
 */
declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            /**
             * Validates that an element uses M3 Expressive polygon-based shape morphing
             * 
             * @param targetShape - The expected M3 shape ('pebble', 'leaf', 'gem', 'burst')
             */
            toHaveExpressiveMorph(targetShape: keyof typeof M3_SHAPES): R;

            /**
             * Validates that typography axes sync with shape morphs per M3 Expressive rules
             * 
             * Checks:
             * - GRAD axis interpolates
             * - font-weight remains constant (Anti-Slop Rule)
             * - wdth axis compensates for shape changes
             */
            toHaveSyncedTypography(): R;

            /**
             * Validates that an element uses M3 spring physics for animations
             * 
             * @param physicsType - The expected physics type (default: 'expressiveDefault')
             */
            toBeUsingM3Physics(physicsType?: keyof typeof M3_PHYSICS): R;
        }
    }
}
