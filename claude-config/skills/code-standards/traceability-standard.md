# Traceability Standard: Linking Code to Design Documentation

**Skill ID:** SKILL-TRACE-001  
**Version:** 1.0  
**Purpose:** Enforce systematic linking between React components and design documentation for instant gap analysis and safer refactoring.

---

## The @trace Annotation System

Every React component, page, and feature MUST include a JSDoc comment block at the top of the file with traceability metadata.

### Required Format

```typescript
/**
 * @trace UI-COMP-XXX
 * @doc DOC-006#section-name
 * @phase Phase N: Phase Name
 * @status live | partial | planned
 */
```

### Field Definitions

| Field | Required | Description | Example |
|:---|:---|:---|:---|
| `@trace` | ✅ Yes | Component ID from DOC-006 or system-inventory.json | `UI-COMP-303` |
| `@doc` | ✅ Yes | Documentation reference (file + section anchor) | `DOC-006#global-audit-report` |
| `@phase` | ⚠️ Recommended | Which phase of the 5-phase architecture | `Phase 3: The Laboratory` |
| `@status` | ⚠️ Recommended | Implementation status | `live`, `partial`, `planned` |
| `@blocker` | Optional | If status is partial/planned, what's blocking completion | `Needs API integration` |
| `@feature` | Optional | Feature ID if component implements a specific feature | `3.2` (Weighted Scoring Gate) |

---

## Examples

### Example 1: Fully Implemented Component

```typescript
/**
 * Multi-File Drag-and-Drop Ingestion Interface
 * 
 * @trace UI-COMP-101
 * @doc DOC-006#ingestion-dashboard
 * @phase Phase 1: The Career Brain
 * @status live
 * @feature 1.1
 */
export const IngestionPage: React.FC = () => {
  // Component implementation
};
```

### Example 2: Partially Implemented Component

```typescript
/**
 * Quality Gate Interface with Score Gauge
 * 
 * @trace UI-COMP-304
 * @doc DOC-006#global-audit-report
 * @phase Phase 3: The Laboratory
 * @status partial
 * @blocker Confetti celebration animation not implemented
 * @feature 3.2
 */
export const QualityGate: React.FC<QualityGateProps> = ({ score }) => {
  // Partial implementation
};
```

### Example 3: Shared Component (No Specific Trace ID)

```typescript
/**
 * Reusable Tech Card Component
 * 
 * @trace SHARED-COMP-001
 * @doc design-system.md#shape-tech
 * @phase All Phases
 * @status live
 */
export const TechCard: React.FC<TechCardProps> = ({ children }) => {
  // Shared component
};
```

---

## Grep Commands for Gap Analysis

### Find All Components by Status

```bash
# Find all LIVE components
grep -r "@status live" frontend/src --include="*.tsx" --include="*.ts"

# Find all PARTIAL components (need work)
grep -r "@status partial" frontend/src --include="*.tsx" --include="*.ts"

# Find all PLANNED components (stubs)
grep -r "@status planned" frontend/src --include="*.tsx" --include="*.ts"
```

### Find Components by Phase

```bash
# Find all Phase 3 components
grep -r "@phase Phase 3" frontend/src --include="*.tsx" --include="*.ts"
```

### Find Components by Trace ID

```bash
# Find implementation of UI-COMP-303
grep -r "@trace UI-COMP-303" frontend/src --include="*.tsx" --include="*.ts"
```

### Find Blocked Components

```bash
# Find all components with blockers
grep -r "@blocker" frontend/src --include="*.tsx" --include="*.ts"
```

---

## Automation Scripts

### Script 1: Validate Traceability Coverage

```bash
#!/bin/bash
# scripts/validate-traceability.sh

echo "Checking for components without @trace annotations..."

# Find all React components
find frontend/src -name "*.tsx" -type f | while read file; do
  if ! grep -q "@trace" "$file"; then
    echo "⚠️  Missing @trace: $file"
  fi
done
```

### Script 2: Sync with system-inventory.json

```bash
#!/bin/bash
# scripts/sync-inventory.sh

echo "Syncing component status to system-inventory.json..."

# Extract all @trace + @status pairs
grep -rh "@trace\|@status" frontend/src --include="*.tsx" | \
  awk '/trace/ {id=$2} /status/ {print id, $2}' | \
  # TODO: Update system-inventory.json with current status
```

---

## ESLint Rule (Optional)

Add to `.eslintrc.js`:

```javascript
module.exports = {
  rules: {
    'require-jsdoc': ['warn', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: false,
        FunctionExpression: false
      }
    }],
    // Custom rule to enforce @trace
    'jsdoc/require-jsdoc': ['warn', {
      contexts: [
        'ExportNamedDeclaration > FunctionDeclaration',
        'ExportDefaultDeclaration > FunctionDeclaration'
      ]
    }]
  }
};
```

---

## Benefits

### 1. Instant Gap Analysis
```bash
# See what's implemented vs. documented
grep -r "@trace UI-COMP-" frontend/src | wc -l  # Actual components
jq '.components | length' system-inventory.json  # Documented components
```

### 2. Safer Refactoring
Before refactoring a component, check its trace ID to understand:
- What phase it belongs to
- What documentation defines its behavior
- What features depend on it

### 3. Automated Project Management
AI can scan `@status` annotations and auto-update `system-inventory.json` to show real-time progress.

### 4. Code Review Efficiency
Reviewers can instantly see:
- Is this component documented?
- Does it match the design spec?
- What phase does it belong to?

---

## Enforcement Strategy

### Phase 1: Soft Enforcement (Current)
- Add `@trace` to new components
- Gradually backfill existing components
- No build failures

### Phase 2: Hard Enforcement (Future)
- ESLint rule fails on missing `@trace`
- Pre-commit hook validates traceability
- CI fails if coverage < 90%

---

## Maintenance

### When to Update

| Event | Action |
|:---|:---|
| New component created | Add `@trace` with `@status planned` |
| Component completed | Update `@status` to `live` |
| Component partially working | Update `@status` to `partial`, add `@blocker` |
| Component refactored | Verify `@trace` ID still matches DOC-006 |
| Documentation updated | Update `@doc` reference |

### Quarterly Audit

Run this command to find stale annotations:

```bash
# Find components marked "planned" for > 3 months
git log --all --format=%aD --name-only --diff-filter=A -- "*.tsx" | \
  grep -B1 "@status planned" | \
  # Filter by date > 3 months ago
```

---

## Integration with system-inventory.json

The `@trace` annotations should match the `id` field in `system-inventory.json`:

```json
{
  "components": {
    "UI-COMP-303": {
      "id": "UI-COMP-303",
      "name": "S-Global Heatmap",
      "status": "live",
      "file": "frontend/src/features/analysis/Analysis.tsx"
    }
  }
}
```

When scanning the codebase:
1. Extract `@trace` ID from file
2. Look up in `system-inventory.json`
3. Verify `status` matches
4. Flag discrepancies

---

**End of Traceability Standard**
