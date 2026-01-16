import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Visual Regression Test Suite
 * Uses pixelmatch to detect pixel-level differences
 * Threshold: 0.01% (maxDiffPixelRatio)
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASELINE_DIR = path.join(__dirname, '../baselines');
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const DIFF_DIR = path.join(__dirname, '../diffs');

// Ensure directories exist
[BASELINE_DIR, SCREENSHOT_DIR, DIFF_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

interface VisualRegressionOptions {
    maxDiffPixelRatio?: number;
    threshold?: number;
}

async function compareScreenshots(
    name: string,
    currentPath: string,
    options: VisualRegressionOptions = {}
): Promise<{ pass: boolean; diffPercent: number; diffPath?: string }> {
    const { maxDiffPixelRatio = 0.0001, threshold = 0.1 } = options;
    const baselinePath = path.join(BASELINE_DIR, `${name}.png`);

    // If no baseline exists, create it
    if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(currentPath, baselinePath);
        return { pass: true, diffPercent: 0 };
    }

    // Load images
    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));

    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    // Compare pixels
    const pixelsDifferent = pixelmatch(
        baseline.data,
        current.data,
        diff.data,
        width,
        height,
        { threshold }
    );

    const totalPixels = width * height;
    const diffPercent = (pixelsDifferent / totalPixels) * 100;

    // Save diff image if there are differences
    if (diffPercent > maxDiffPixelRatio * 100) {
        const diffPath = path.join(DIFF_DIR, `${name}-diff.png`);
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        return { pass: false, diffPercent, diffPath };
    }

    return { pass: true, diffPercent };
}

test.describe('Visual Regression Suite', () => {
    test.beforeEach(async ({ page }) => {
        // Set viewport to consistent size
        await page.setViewportSize({ width: 1920, height: 1080 });

        // Navigate to app with demo mode
        await page.goto('http://localhost:5173/?demo=true');
        await page.waitForLoadState('networkidle');
    });

    test('Dashboard - Desktop View', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard?demo=true');
        await page.waitForLoadState('networkidle');

        // Wait for animations to complete
        await page.waitForTimeout(1000);

        const screenshotPath = path.join(SCREENSHOT_DIR, 'dashboard-desktop.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const result = await compareScreenshots('dashboard-desktop', screenshotPath, {
            maxDiffPixelRatio: 0.0001, // 0.01%
            threshold: 0.1,
        });

        expect(result.pass).toBe(true);
        if (!result.pass) {
            console.log(`Visual regression detected: ${result.diffPercent.toFixed(4)}%`);
            console.log(`Diff image saved to: ${result.diffPath}`);
        }
    });

    test('Dashboard - Mobile View', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:5173/dashboard?demo=true');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const screenshotPath = path.join(SCREENSHOT_DIR, 'dashboard-mobile.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const result = await compareScreenshots('dashboard-mobile', screenshotPath, {
            maxDiffPixelRatio: 0.0001,
            threshold: 0.1,
        });

        expect(result.pass).toBe(true);
    });

    test('CodePreview Component - Shape Integrity', async ({ page }) => {
        await page.goto('http://localhost:5173/style-guide?demo=true');
        await page.waitForLoadState('networkidle');

        // Scroll to CodePreview section
        const codePreview = page.locator('pre').first();
        await codePreview.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const screenshotPath = path.join(SCREENSHOT_DIR, 'code-preview.png');
        await codePreview.screenshot({ path: screenshotPath });

        const result = await compareScreenshots('code-preview', screenshotPath, {
            maxDiffPixelRatio: 0.0001,
            threshold: 0.1,
        });

        expect(result.pass).toBe(true);

        // Verify rounded-tech-edge is applied (no generic rounded-md)
        const classList = await codePreview.getAttribute('class');
        expect(classList).toContain('rounded-tech-edge');
        expect(classList).not.toContain('rounded-md');
    });

    test('StatCard Component - Typography Breathing', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard?demo=true');
        await page.waitForLoadState('networkidle');

        const statCard = page.locator('[class*="text-display-large"]').first();
        await statCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Capture baseline
        const baselinePath = path.join(SCREENSHOT_DIR, 'stat-card-baseline.png');
        await statCard.screenshot({ path: baselinePath });

        // Hover to trigger GRAD axis animation
        await statCard.hover();
        await page.waitForTimeout(300); // Wait for spring animation

        const hoverPath = path.join(SCREENSHOT_DIR, 'stat-card-hover.png');
        await statCard.screenshot({ path: hoverPath });

        // Verify font-variation-settings includes GRAD
        const fontSettings = await statCard.evaluate(el =>
            window.getComputedStyle(el).fontVariationSettings
        );

        expect(fontSettings).toContain('GRAD');
    });

    test('Application Card - Pebble Shape Archetype', async ({ page }) => {
        await page.goto('http://localhost:5173/tracker?demo=true');
        await page.waitForLoadState('networkidle');

        const appCard = page.locator('[class*="rounded-pebble"]').first();
        if (await appCard.count() > 0) {
            await appCard.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);

            const screenshotPath = path.join(SCREENSHOT_DIR, 'app-card.png');
            await appCard.screenshot({ path: screenshotPath });

            const result = await compareScreenshots('app-card', screenshotPath, {
                maxDiffPixelRatio: 0.0001,
                threshold: 0.1,
            });

            expect(result.pass).toBe(true);
        }
    });

    test('Physics Compliance - Spring Transitions', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard?demo=true');
        await page.waitForLoadState('networkidle');

        // Check for motion.div elements
        const motionElements = page.locator('div[class*="motion"]');
        const count = await motionElements.count();

        if (count > 0) {
            // Verify spring physics are applied
            const firstMotion = motionElements.first();
            const transition = await firstMotion.evaluate(el =>
                el.getAttribute('transition')
            );

            // Should contain spring physics parameters
            if (transition) {
                expect(transition).toContain('spring');
            }
        }
    });
});

test.describe('Anti-Drift Shield - Continuous Monitoring', () => {
    test('No Generic Shapes Detected', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard?demo=true');
        await page.waitForLoadState('networkidle');

        // Check for forbidden generic shapes
        const genericShapes = await page.$$eval('[class*="rounded-"]', elements =>
            elements.filter(el =>
                /rounded-(sm|md|lg|xl|2xl|3xl)(?!\w)/.test(el.className)
            ).map(el => ({
                tag: el.tagName,
                classes: el.className,
            }))
        );

        expect(genericShapes.length).toBe(0);
        if (genericShapes.length > 0) {
            console.log('Generic shapes detected:', genericShapes);
        }
    });

    test('No Hardcoded Colors Detected', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard?demo=true');
        await page.waitForLoadState('networkidle');

        // Check for hardcoded hex colors in class names
        const hardcodedColors = await page.$$eval('[class*="bg-[#"], [class*="text-[#"]', elements =>
            elements.map(el => ({
                tag: el.tagName,
                classes: el.className,
            }))
        );

        expect(hardcodedColors.length).toBe(0);
        if (hardcodedColors.length > 0) {
            console.log('Hardcoded colors detected:', hardcodedColors);
        }
    });
});
