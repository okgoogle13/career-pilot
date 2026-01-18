/**
 * M3 Expressive Integration Test
 * 
 * End-to-end validation that M3 Expressive "DNA" is consistent across the user journey.
 * Tests parametric relationship between shape morphing and typography axis adjustments.
 * 
 * Test Coverage:
 * - Shape: Verify non-generic M3 polygon paths (not rounded-full)
 * - Sync: Simultaneous shape + typography morphing validation  
 * - Haptics: Spring physics validation (stiffness: 500, damping: 27)
 * - Typography: Variable font loading (no system fallbacks)
 */

import { test } from '@playwright/test';
import { expect } from '../utils/m3-parametric-matchers';

test.describe('M3 Expressive Integration', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to a page with M3 Card components
        await page.goto('/');

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');
    });

    test('M3Card behaves like organic, responsive physical object', async ({ page }) => {
        // Step 1: Load Dashboard/Homepage
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        // Step 2: Identify primary M3 Card
        // Adjust the selector based on your actual implementation
        const cards = page.locator('[data-testid*="card"], .m3-expressive-surface, [class*="M3Card"]');
        const card = cards.first();

        // Wait for card to be visible
        await card.waitFor({ state: 'visible', timeout: 5000 });

        // Assertion 1: Shape - verify M3 Pebble path, not generic pill
        const clipPath = await card.evaluate(el =>
            window.getComputedStyle(el).clipPath
        );

        // Should use polygon, not border-radius
        expect(clipPath).toMatch(/polygon/);

        // Should NOT have generic Tailwind rounding classes
        const className = await card.getAttribute('class') || '';
        expect(className).not.toMatch(/rounded-full|rounded-lg|rounded-xl/);

        // Assertion 2: Sync - simultaneous morph validation
        await expect(card).toHaveExpressiveMorph('pebble');

        // Move mouse away to reset
        await page.mouse.move(0, 0);
        await page.waitForTimeout(500);

        // Assertion 3: Haptics - spring physics validation
        await expect(card).toBeUsingM3Physics('expressiveDefault');

        // Assertion 4: Typography - verify variable font loaded
        const heading = card.locator('h1, h2, h3, h4, h5, h6').first();

        if (await heading.count() > 0) {
            const fontFamily = await heading.evaluate(el =>
                window.getComputedStyle(el).fontFamily
            );

            // Should use Plus Jakarta Sans or Roboto Flex
            expect(fontFamily).toMatch(/Plus Jakarta Sans|Roboto Flex/i);

            // Should NOT use system fallbacks
            expect(fontFamily).not.toMatch(/Arial|Helvetica|system-ui/);
        }
    });

    test('Typography morphs sync with shape transitions', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const cards = page.locator('[data-testid*="card"], .m3-expressive-surface');
        const card = cards.first();

        await card.waitFor({ state: 'visible' });

        const heading = card.locator('h1, h2, h3').first();

        if (await heading.count() === 0) {
            test.skip();
            return;
        }

        // Get initial GRAD value
        const initialGRAD = await heading.evaluate(el => {
            const settings = window.getComputedStyle(el).fontVariationSettings;
            const match = settings.match(/'GRAD'\s+([\d.-]+)/);
            return match ? parseFloat(match[1]) : 0;
        });

        // Get initial font-weight
        const initialWeight = await heading.evaluate(el =>
            window.getComputedStyle(el).fontWeight
        );

        // Hover the card (not the heading directly)
        await card.hover();
        await page.waitForTimeout(200); // Mid-transition

        // Get mid-transition GRAD value
        const midGRAD = await heading.evaluate(el => {
            const settings = window.getComputedStyle(el).fontVariationSettings;
            const match = settings.match(/'GRAD'\s+([\d.-]+)/);
            return match ? parseFloat(match[1]) : 0;
        });

        // GRAD should change during morph
        expect(midGRAD).not.toBe(initialGRAD);

        // Verify font-weight remained constant (Anti-Slop Rule)
        const midWeight = await heading.evaluate(el =>
            window.getComputedStyle(el).fontWeight
        );

        expect(midWeight).toBe(initialWeight);
    });

    test('Multiple cards exhibit consistent M3 Expressive behavior', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const cards = page.locator('[data-testid*="card"], .m3-expressive-surface');
        const cardCount = await cards.count();

        if (cardCount === 0) {
            test.skip();
            return;
        }

        // Test up to 3 cards
        const cardsToTest = Math.min(cardCount, 3);

        for (let i = 0; i < cardsToTest; i++) {
            const card = cards.nth(i);

            // Each card should use polygon-based clip-path
            const clipPath = await card.evaluate(el =>
                window.getComputedStyle(el).clipPath
            );

            // Should be polygon or none (none is acceptable if not yet hovered)
            if (clipPath !== 'none') {
                expect(clipPath).toMatch(/polygon/);
            }

            // No Tailwind generic rounding
            const className = await card.getAttribute('class') || '';
            expect(className).not.toMatch(/rounded-full|rounded-lg|rounded-xl/);
        }
    });

    test('Shape morphing settles within M3 timing constraints', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const card = page.locator('[data-testid*="card"], .m3-expressive-surface').first();
        await card.waitFor({ state: 'visible' });

        // Record start time
        const startTime = Date.now();

        // Trigger hover
        await card.hover();

        // Wait for clip-path to stabilize
        let previousClipPath = '';
        let stableCount = 0;
        const maxWait = 600; // ms

        while (Date.now() - startTime < maxWait) {
            const currentClipPath = await card.evaluate(el =>
                window.getComputedStyle(el).clipPath
            );

            if (currentClipPath === previousClipPath) {
                stableCount++;
                if (stableCount >= 3) {
                    break;
                }
            } else {
                stableCount = 0;
            }

            previousClipPath = currentClipPath;
            await page.waitForTimeout(50);
        }

        const settleTime = Date.now() - startTime;

        // M3 Expressive Default should settle in 350-450ms
        expect(settleTime).toBeGreaterThanOrEqual(300);
        expect(settleTime).toBeLessThanOrEqual(550);
    });

    test('No layout shifts during typography morph (Anti-Slop Rule)', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const card = page.locator('[data-testid*="card"], .m3-expressive-surface').first();
        await card.waitFor({ state: 'visible' });

        const heading = card.locator('h1, h2, h3').first();

        if (await heading.count() === 0) {
            test.skip();
            return;
        }

        // Get initial bounding box
        const initialBox = await heading.boundingBox();

        if (!initialBox) {
            test.skip();
            return;
        }

        // Hover to trigger morph
        await card.hover();
        await page.waitForTimeout(300);

        // Get final bounding box
        const finalBox = await heading.boundingBox();

        if (!finalBox) {
            test.fail();
            return;
        }

        // Height and width should remain stable (allowing for minor sub-pixel differences)
        const heightDiff = Math.abs(finalBox.height - initialBox.height);
        const widthDiff = Math.abs(finalBox.width - initialBox.width);

        // Allow up to 2px difference for sub-pixel rendering
        expect(heightDiff).toBeLessThanOrEqual(2);
        expect(widthDiff).toBeLessThanOrEqual(2);
    });

    test('Variable font axes respond to shape state changes', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        const card = page.locator('[data-testid*="card"], .m3-expressive-surface').first();
        await card.waitFor({ state: 'visible' });

        const heading = card.locator('h1, h2, h3').first();

        if (await heading.count() === 0) {
            test.skip();
            return;
        }

        // Get rest state variable font settings
        const restAxes = await heading.evaluate(el => {
            const settings = window.getComputedStyle(el).fontVariationSettings;
            const axes: Record<string, number> = {};

            const matches = settings.matchAll(/'(\w+)'\s+([\d.-]+)/g);
            for (const match of matches) {
                axes[match[1]] = parseFloat(match[2]);
            }

            return axes;
        });

        // Hover to morph
        await card.hover();
        await page.waitForTimeout(250);

        // Get morph state variable font settings
        const morphAxes = await heading.evaluate(el => {
            const settings = window.getComputedStyle(el).fontVariationSettings;
            const axes: Record<string, number> = {};

            const matches = settings.matchAll(/'(\w+)'\s+([\d.-]+)/g);
            for (const match of matches) {
                axes[match[1]] = parseFloat(match[2]);
            }

            return axes;
        });

        // At least one axis should have changed (GRAD or wdth)
        const gradChanged = (restAxes['GRAD'] || 0) !== (morphAxes['GRAD'] || 0);
        const wdthChanged = (restAxes['wdth'] || 100) !== (morphAxes['wdth'] || 100);

        expect(gradChanged || wdthChanged).toBeTruthy();

        // wght (weight) should remain constant (Anti-Slop Rule)
        if (restAxes['wght'] && morphAxes['wght']) {
            expect(restAxes['wght']).toBe(morphAxes['wght']);
        }
    });
});
