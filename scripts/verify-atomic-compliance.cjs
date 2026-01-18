
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/v2_atomic');
const SRC_DIR = path.join(__dirname, '../frontend/src');

// Define expected components based on DOC-004
const REQUIRED_COMPONENTS = [
    { name: 'AuditDial', path: 'features/analysis/components/AuditDial.tsx' },
    { name: 'DropZone', path: 'features/ingestion/components/DropZone.tsx' },
    { name: 'JobCard', path: 'features/dashboard/components/JobCard.tsx' },
    { name: 'EvidenceCard', path: 'features/editor/components/EvidenceCard.tsx' },
    { name: 'SplitHeader', path: 'components/ui/SplitHeader.tsx' },
];

function checkFileExists(filePath) {
    return fs.existsSync(path.join(SRC_DIR, filePath));
}

function verifyComponents() {
    console.log('🔍 Verifying Components (DOC-004)...');
    let missing = 0;
    let missingList = [];

    REQUIRED_COMPONENTS.forEach(comp => {
        if (checkFileExists(comp.path)) {
            console.log(`✅ ${comp.name} found.`);
        } else {
            console.log(`❌ ${comp.name} MISSING at ${comp.path}`);
            missingList.push(comp.name);
            missing++;
        }
    });

    return { count: missing, list: missingList };
}

function verifyDocs() {
    console.log('\n🔍 Verifying Documentation Integrity...');
    const requiredDocs = ['DOC-000_Master_Context.md', 'DOC-001_Design_System.md', 'DOC-002_Architecture_Schema.md', 'DOC-003_User_Flows.md', 'DOC-004_Component_Catalog.md'];
    let missing = 0;
    let missingList = [];
    requiredDocs.forEach(doc => {
        if (fs.existsSync(path.join(DOCS_DIR, doc))) {
            console.log(`✅ ${doc} found.`);
        } else {
            console.log(`❌ ${doc} MISSING.`);
            missingList.push(doc);
            missing++;
        }
    });
    return { count: missing, list: missingList };
}

function run() {
    console.log('⚡ Starting Atomic Compliance Check...\n');
    const compResult = verifyComponents();
    const docResult = verifyDocs();

    // Write GAP REPORT
    const reportPath = path.join(DOCS_DIR, 'GAP_REPORT.md');
    const reportContent = `# GAP Analysis Report
**Date:** ${new Date().toISOString()}

## Missing Components (${compResult.count})
${compResult.list.map(c => `- [ ] ${c}`).join('\n') || 'None'}

## Missing Documentation (${docResult.count})
${docResult.list.map(d => `- [ ] ${d}`).join('\n') || 'None'}

## Status
${(compResult.count + docResult.count) === 0 ? '✅ **FULLY COMPLIANT**' : '⚠️ **GAPS DETECTED**'}
`;

    fs.writeFileSync(reportPath, reportContent);
    console.log(`\n📄 Report generated at: ${reportPath}`);

    console.log('\n----------------------------------------');
    if (compResult.count + docResult.count === 0) {
        console.log('🎉 SUCCESS: Codebase complies with Atomic Docs.');
        process.exit(0);
    } else {
        console.log(`⚠️ FAILURE: Found ${compResult.count} missing components and ${docResult.count} missing docs.`);
        process.exit(1);
    }
}

run();
