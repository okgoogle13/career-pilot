/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NORTHCOTE CURIO DESIGN SYSTEM - CUSTOM LINTER
 * Victorian Naturalist Field Station Design System V2.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This custom linter performs advanced design system validation beyond ESLint.
 * It checks component structure, Storybook coverage, test coverage, and
 * interactive state implementation.
 * 
 * Usage: npm run lint:northcote
 * 
 * Documentation: See DOC-001 (Design System Specification)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════
const config = {
    componentsDir: './src/components',
    storiesDir: './src/stories',
    testsPattern: '**/*.test.{ts,tsx,js,jsx}',

    // Enable/disable specific checks
    checks: {
        componentStructure: true,
        bloomEffects: true,
        modeSeparation: true,
        touchFeedback: true,
        accessibility: true,
        storybookCoverage: true,
        testCoverage: true,
    },

    // Severity levels
    severity: {
        componentStructure: 'error',
        bloomEffects: 'warn',
        modeSeparation: 'warn',
        touchFeedback: 'warn',
        accessibility: 'error',
        storybookCoverage: 'warn',
        testCoverage: 'warn',
    },
};

// ═══════════════════════════════════════════════════════════════════════
// VALIDATION RULES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Rule 1: Verify component file structure
 * 
 * Expected structure:
 * 1. Imports (React → Libraries → Components → Utils → Types → Theme)
 * 2. Types/Interfaces
 * 3. Component definition
 * 4. Exports
 */
function validateComponentStructure(filePath, content) {
    const violations = [];

    // Check for proper import ordering
    const importRegex = /^import\s+.*from\s+['"](.+)['"]/gm;
    const imports = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }

    // Verify React is imported first
    if (imports.length > 0 && !imports[0].includes('react')) {
        violations.push({
            rule: 'component-structure',
            severity: config.severity.componentStructure,
            message: 'React import should be first',
            file: filePath,
            fix: 'Move React import to the top of the file',
        });
    }

    // Check for default export
    if (!content.includes('export default')) {
        violations.push({
            rule: 'component-structure',
            severity: config.severity.componentStructure,
            message: 'Component missing default export',
            file: filePath,
            fix: 'Add default export at the end of the file',
        });
    }

    return violations;
}

/**
 * Rule 2: Check for Bloom effect implementation on interactive components
 * 
 * Interactive components (buttons, cards with onClick) should have:
 * - hover:shadow-* (shadow change)
 * - hover:translate-y-* or hover:scale-* (lift effect)
 * - transition-all duration-standard ease-viscous-breeze
 */
function validateBloomEffects(filePath, content) {
    const violations = [];

    // Check if component is interactive
    const isInteractive = content.includes('onClick') ||
        content.includes('onHover') ||
        content.includes('<button') ||
        content.includes('cursor-pointer');

    if (!isInteractive) return violations;

    // Check for Bloom effect patterns
    const hasHoverShadow = /hover:shadow-(standard|elevated|maximum)/.test(content);
    const hasHoverTransform = /hover:(translate-y-|scale-)/.test(content);
    const hasViscousEasing = /ease-viscous-breeze/.test(content);

    if (!hasHoverShadow || !hasHoverTransform) {
        violations.push({
            rule: 'bloom-effects',
            severity: config.severity.bloomEffects,
            message: 'Interactive component missing Bloom effect (hover shadow + transform)',
            file: filePath,
            fix: 'Add hover:shadow-elevated hover:translate-y-[-2px] transition-all duration-standard ease-viscous-breeze',
            documentation: 'See DOC-001 Section 6: Viscous Breeze Physics',
        });
    }

    if (!hasViscousEasing && (hasHoverShadow || hasHoverTransform)) {
        violations.push({
            rule: 'bloom-effects',
            severity: config.severity.bloomEffects,
            message: 'Interactive component has transitions but missing viscous-breeze easing',
            file: filePath,
            fix: 'Add ease-viscous-breeze to transition classes',
            documentation: 'See DOC-001 Section 6: Viscous Breeze Physics',
        });
    }

    return violations;
}

/**
 * Rule 3: Validate Gallery vs Laboratory mode separation
 * 
 * Components should be clearly marked for Gallery or Laboratory mode.
 * Laboratory mode cannot use Fraunces (font-bloom).
 */
function validateModeSeparation(filePath, content) {
    const violations = [];

    const isLaboratoryMode = content.includes('mode-laboratory') ||
        filePath.includes('/laboratory/');

    if (isLaboratoryMode && content.includes('font-bloom')) {
        violations.push({
            rule: 'mode-consistency',
            severity: config.severity.modeSeparation,
            message: 'Laboratory mode component cannot use font-bloom (Fraunces)',
            file: filePath,
            fix: 'Replace font-bloom with font-field-note or font-annotation',
            documentation: 'See DOC-001 Section 8: Dual Modes',
        });
    }

    return violations;
}

/**
 * Rule 4: Warn if Stone card is missing touch feedback
 * 
 * Stone archetype cards should have active:scale-[0.98] for press feedback.
 */
function validateTouchFeedback(filePath, content) {
    const violations = [];

    const isStoneCard = content.includes('rounded-stone') ||
        content.includes('Stone') ||
        filePath.includes('Stone');

    const isInteractive = content.includes('onClick') || content.includes('cursor-pointer');

    if (isStoneCard && isInteractive && !content.includes('active:scale-')) {
        violations.push({
            rule: 'touch-feedback',
            severity: config.severity.touchFeedback,
            message: 'Stone card missing touch feedback (active:scale-[0.98])',
            file: filePath,
            fix: 'Add active:scale-[0.98] to className',
            documentation: 'See DOC-001 Section 3.2: Stone Archetype',
        });
    }

    return violations;
}

/**
 * Rule 5: Check accessibility attributes
 * 
 * Interactive elements must have aria-* or role attributes.
 */
function validateAccessibility(filePath, content) {
    const violations = [];

    const interactiveElements = [
        /<button(?![^>]*aria-label)(?![^>]*role)/g,
        /<a(?![^>]*aria-label)(?![^>]*role)/g,
        /<input(?![^>]*aria-label)(?![^>]*aria-labelledby)/g,
    ];

    interactiveElements.forEach((regex, index) => {
        const matches = content.match(regex);
        if (matches && matches.length > 0) {
            const elementType = ['button', 'link', 'input'][index];
            violations.push({
                rule: 'accessibility',
                severity: config.severity.accessibility,
                message: `${elementType} element missing accessibility attributes (aria-label, role)`,
                file: filePath,
                fix: `Add aria-label or role to ${elementType} element`,
                documentation: 'See WCAG 2.1 AA standards',
            });
        }
    });

    return violations;
}

/**
 * Rule 6: Verify Storybook stories exist
 */
function validateStorybookCoverage(componentPath) {
    const violations = [];

    const componentName = path.basename(componentPath, path.extname(componentPath));
    const storyPath = componentPath.replace(/\.tsx?$/, '.stories.tsx');

    if (!fs.existsSync(storyPath)) {
        violations.push({
            rule: 'storybook-coverage',
            severity: config.severity.storybookCoverage,
            message: `Component missing Storybook story`,
            file: componentPath,
            fix: `Create ${componentName}.stories.tsx`,
            documentation: 'See Storybook documentation',
        });
    }

    return violations;
}

/**
 * Rule 7: Check test coverage
 */
function validateTestCoverage(componentPath) {
    const violations = [];

    const componentName = path.basename(componentPath, path.extname(componentPath));
    const testPath = componentPath.replace(/\.tsx?$/, '.test.tsx');
    const altTestPath = componentPath.replace(/\.tsx?$/, '.test.ts');

    if (!fs.existsSync(testPath) && !fs.existsSync(altTestPath)) {
        violations.push({
            rule: 'test-coverage',
            severity: config.severity.testCoverage,
            message: `Component missing test file`,
            file: componentPath,
            fix: `Create ${componentName}.test.tsx`,
            documentation: 'See Testing documentation',
        });
    }

    return violations;
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN LINTER EXECUTION
// ═══════════════════════════════════════════════════════════════════════

function runNorthcoteLinter() {
    console.log('🔍 Running Northcote Curio Design System Linter...\n');

    const allViolations = [];

    // Find all component files
    const componentFiles = glob.sync(`${config.componentsDir}/**/*.{tsx,jsx}`, {
        ignore: ['**/*.stories.*', '**/*.test.*', '**/*.spec.*'],
    });

    console.log(`📁 Found ${componentFiles.length} component files\n`);

    componentFiles.forEach((filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Run all validation rules
        if (config.checks.componentStructure) {
            allViolations.push(...validateComponentStructure(filePath, content));
        }

        if (config.checks.bloomEffects) {
            allViolations.push(...validateBloomEffects(filePath, content));
        }

        if (config.checks.modeSeparation) {
            allViolations.push(...validateModeSeparation(filePath, content));
        }

        if (config.checks.touchFeedback) {
            allViolations.push(...validateTouchFeedback(filePath, content));
        }

        if (config.checks.accessibility) {
            allViolations.push(...validateAccessibility(filePath, content));
        }

        if (config.checks.storybookCoverage) {
            allViolations.push(...validateStorybookCoverage(filePath));
        }

        if (config.checks.testCoverage) {
            allViolations.push(...validateTestCoverage(filePath));
        }
    });

    // ═══════════════════════════════════════════════════════════════════════
    // REPORT GENERATION
    // ═══════════════════════════════════════════════════════════════════════

    const errors = allViolations.filter((v) => v.severity === 'error');
    const warnings = allViolations.filter((v) => v.severity === 'warn');

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('NORTHCOTE CURIO DESIGN SYSTEM LINT REPORT');
    console.log('═══════════════════════════════════════════════════════════════\n');

    console.log(`📊 Summary:`);
    console.log(`   Total Components: ${componentFiles.length}`);
    console.log(`   Errors: ${errors.length}`);
    console.log(`   Warnings: ${warnings.length}\n`);

    if (errors.length > 0) {
        console.log('❌ ERRORS:\n');
        errors.forEach((violation, index) => {
            console.log(`${index + 1}. [${violation.rule}] ${violation.message}`);
            console.log(`   File: ${violation.file}`);
            console.log(`   Fix: ${violation.fix}`);
            if (violation.documentation) {
                console.log(`   Docs: ${violation.documentation}`);
            }
            console.log('');
        });
    }

    if (warnings.length > 0) {
        console.log('⚠️  WARNINGS:\n');
        warnings.forEach((violation, index) => {
            console.log(`${index + 1}. [${violation.rule}] ${violation.message}`);
            console.log(`   File: ${violation.file}`);
            console.log(`   Fix: ${violation.fix}`);
            if (violation.documentation) {
                console.log(`   Docs: ${violation.documentation}`);
            }
            console.log('');
        });
    }

    if (allViolations.length === 0) {
        console.log('✅ All components pass Northcote Curio design system checks!\n');
    }

    console.log('═══════════════════════════════════════════════════════════════\n');

    // Exit with error code if there are errors
    if (errors.length > 0) {
        process.exit(1);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════

module.exports = {
    config,
    runNorthcoteLinter,
    validateComponentStructure,
    validateBloomEffects,
    validateModeSeparation,
    validateTouchFeedback,
    validateAccessibility,
    validateStorybookCoverage,
    validateTestCoverage,
};

// Run if called directly
if (require.main === module) {
    runNorthcoteLinter();
}
