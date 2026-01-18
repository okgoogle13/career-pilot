
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const {
    config,
    validateComponentStructure,
    validateBloomEffects,
    validateModeSeparation,
    validateTouchFeedback,
    validateAccessibility,
    validateStorybookCoverage,
    validateTestCoverage
} = require('../northcote-lint.config.cjs');

const REPORT_PATH = path.join(__dirname, '../reports/DESIGN_SYSTEM_HEALTH.md');
const REPORTS_DIR = path.dirname(REPORT_PATH);

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function generateReport() {
    console.log('🩺 Generating Design System Health Dashboard...\n');

    const componentFiles = glob.sync(`${config.componentsDir}/**/*.{tsx,jsx}`, {
        ignore: ['**/*.stories.*', '**/*.test.*', '**/*.spec.*', '**/index.ts'],
    });

    const results = componentFiles.map(filePath => {
        const content = fs.readFileSync(filePath, 'utf-8');
        const violations = [];

        // Running checks using the imported validators
        violations.push(...validateComponentStructure(filePath, content));
        violations.push(...validateBloomEffects(filePath, content));
        violations.push(...validateModeSeparation(filePath, content));
        violations.push(...validateTouchFeedback(filePath, content));
        violations.push(...validateAccessibility(filePath, content));
        violations.push(...validateStorybookCoverage(filePath));
        violations.push(...validateTestCoverage(filePath));

        // Token usage heuristic
        const northcoteTokenCount = (content.match(/font-(proclamation|bloom|field-note|annotation)|text-(display|headline|title|body|label)|bg-(specimen|wattle|waratah|eucalypt|flannel)|rounded-(pebble|stone|leaf|seed)|shadow-(subtle|standard|elevated|maximum)/g) || []).length;

        return {
            file: filePath,
            name: path.basename(filePath),
            violations,
            tokenUsage: northcoteTokenCount,
            hasStory: !violations.some(v => v.rule === 'storybook-coverage'),
            hasTest: !violations.some(v => v.rule === 'test-coverage'),
            isCompliant: violations.length === 0
        };
    });

    // Metrics
    const totalComponents = results.length;
    const compliantComponents = results.filter(r => r.isCompliant).length;
    const complianceRate = Math.round((compliantComponents / totalComponents) * 100);
    const totalStories = results.filter(r => r.hasStory).length;
    const storyCoverage = Math.round((totalStories / totalComponents) * 100);
    const totalTests = results.filter(r => r.hasTest).length;
    const testCoverage = Math.round((totalTests / totalComponents) * 100);

    // Grade Calculation
    let grade = 'C';
    if (complianceRate >= 90 && testCoverage >= 90) grade = 'A - Platinum 💎';
    else if (complianceRate >= 80) grade = 'B - Gold 🏆';
    else if (complianceRate >= 70) grade = 'C - Silver 🥈';
    else grade = 'D - Bronze 🥉';

    // Report Content
    let md = `# Design System Health Dashboard 🩺\n\n`;
    md += `**Last Updated:** ${new Date().toLocaleString()}\n`;
    md += `**System Version:** Northcote Curio V2.0\n\n`;

    md += `## 🚀 Executive Summary\n\n`;
    md += `| Metric | Value | Status |\n`;
    md += `| :--- | :--- | :--- |\n`;
    md += `| **Overall Grade** | **${grade}** | |\n`;
    md += `| **System Compliance** | **${complianceRate}%** | ${getStatusIcon(complianceRate)} |\n`;
    md += `| **Storybook Coverage** | **${storyCoverage}%** | ${getStatusIcon(storyCoverage)} |\n`;
    md += `| **Test Coverage** | **${testCoverage}%** | ${getStatusIcon(testCoverage)} |\n`;
    md += `| **Total Components** | ${totalComponents} | |\n\n`;

    md += `## 🧩 Component Matrix\n\n`;
    md += `| Component | Status | Tokens | Story | Test | Issues |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: | :--- |\n`;

    results.sort((a, b) => b.tokenUsage - a.tokenUsage).forEach(r => {
        const status = r.isCompliant ? '✅' : '⚠️';
        const story = r.hasStory ? '📘' : '❌';
        const test = r.hasTest ? '🧪' : '❌';
        const issueCount = r.violations.length > 0 ? r.violations.length : '-';

        // Make path relative for brevity
        const relPath = path.relative('src', r.file);

        md += `| \`${r.name}\` | ${status} | ${r.tokenUsage} | ${story} | ${test} | ${issueCount} |\n`;
    });

    md += `\n## 🚨 Violation Hotspots\n\n`;
    const violationCounts = {};
    results.forEach(r => {
        r.violations.forEach(v => {
            violationCounts[v.rule] = (violationCounts[v.rule] || 0) + 1;
        });
    });

    if (Object.keys(violationCounts).length > 0) {
        md += `| Violation Type | Count | Impact |\n`;
        md += `| :--- | :---: | :--- |\n`;
        Object.entries(violationCounts)
            .sort(([, a], [, b]) => b - a)
            .forEach(([rule, count]) => {
                md += `| \`${rule}\` | ${count} | ${getImpactDescription(rule)} |\n`;
            });
    } else {
        md += `No violations found. Exemplary work! 🌟\n`;
    }

    fs.writeFileSync(REPORT_PATH, md);
    console.log(`✅ Health Dashboard generated at: ${REPORT_PATH}`);
}

function getStatusIcon(percentage) {
    if (percentage >= 90) return '🟢';
    if (percentage >= 70) return '🟡';
    return '🔴';
}

function getImpactDescription(rule) {
    const map = {
        'component-structure': 'Maintainability',
        'bloom-effects': 'User Experience (Physics)',
        'mode-consistency': 'Thematic Integrity',
        'touch-feedback': 'Tactile Response',
        'accessibility': 'Inclusivity (Critical)',
        'storybook-coverage': 'Visual QA',
        'test-coverage': 'Reliability'
    };
    return map[rule] || 'General';
}

generateReport();
