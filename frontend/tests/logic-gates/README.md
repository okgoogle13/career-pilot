# Logic-First Testing Suite

**Purpose:** Validate business logic and hard guardrails independent of UI implementation.

---

## Philosophy

Traditional UI tests are brittle and break when implementation details change. **Logic-First Tests** validate the core business rules that must never be accidentally refactored away.

### What We Test

- ✅ **Logic Gates:** Hard thresholds that control user flow (Quality Gate, Voice Alignment)
- ✅ **State Machines:** Transitions between application states
- ✅ **Data Validation:** Input constraints and business rules
- ✅ **Guardrails:** Critical constraints that ensure system integrity

### What We Don't Test

- ❌ UI component rendering
- ❌ CSS styling
- ❌ Animation timing
- ❌ Click handlers (unless they contain business logic)

---

## Test Structure

Each logic gate has its own test file:

```
tests/logic-gates/
├── quality-gate.test.ts       # LOGIC-GATE-001: Phase 3 → Phase 4 threshold
├── parser-preview.test.ts     # LOGIC-GATE-002: Font consistency for ATS
├── voice-alignment.test.ts    # LOGIC-GATE-003: Authentic voice validation
└── README.md                  # This file
```

---

## Logic Gates Reference

### LOGIC-GATE-001: Quality Gate (Phase 3 → Phase 4)

**Rule:** Users cannot navigate to Phase 4 (Studio) until `global_match_score >= 85`

**Rationale:** Prevents users from designing documents before content quality is validated.

**Tests:**
- ✅ Threshold validation (exactly 85, 84.99, etc.)
- ✅ Navigation blocking when score < 85
- ✅ Route guard enforcement
- ✅ Regression protection (threshold cannot be changed)

**Doc References:**
- `DOC-006#state-quality-gate`
- `DOC-008#validation-requirements`

---

### LOGIC-GATE-002: Parser Preview Toggle

**Rule:** Parser Preview MUST use system-standard fonts (Arial, Times, Courier) and disable all custom CSS

**Rationale:** Ensures WYSIWYG accuracy with ATS parsers. Custom fonts would mislead users about parsing results.

**Tests:**
- ✅ Font validation (allowed vs forbidden)
- ✅ CSS stripping when toggled
- ✅ State transitions (Beautiful ↔ Parser)
- ✅ Regression protection (font list cannot be changed)

**Doc References:**
- `DOC-006#state-parser-preview`
- `DOC-008#font-consistency`

---

### LOGIC-GATE-003: Voice Alignment Gate

**Rule:** Users cannot exit Phase 1 until `voice_match > 0.8` AND `ai_probability <= 0.2`

**Rationale:** Ensures content authenticity and prevents AI-generated "slop" from entering the system.

**Tests:**
- ✅ Voice match threshold (> 0.8, not >=)
- ✅ AI detection threshold (<= 0.2)
- ✅ Combined validation (both must pass)
- ✅ Regression protection (thresholds cannot be weakened)

**Doc References:**
- `DOC-006#state-voice-alignment`
- `DOC-007#ai-detection-evasion`

---

## Running Tests

### Run All Logic Gate Tests

```bash
npm run test:logic-gates
```

### Run Specific Gate

```bash
npm run test tests/logic-gates/quality-gate.test.ts
```

### Run with Coverage

```bash
npm run test:coverage -- tests/logic-gates/
```

### Watch Mode (Development)

```bash
npm run test:watch tests/logic-gates/
```

---

## Test Anatomy

Each test file follows this structure:

### 1. Header Comment

```typescript
/**
 * Logic Gate Tests: Quality Gate (Phase 3 → Phase 4)
 * 
 * @trace LOGIC-GATE-001
 * @doc DOC-006#state-quality-gate
 * @doc DOC-008#validation-requirements
 * 
 * Purpose: [Clear explanation of what this gate protects]
 */
```

### 2. Type Definitions

```typescript
interface AuditResult {
  validation: 'success' | 'failure';
  global_score: number;
  threshold_met: boolean;
}
```

### 3. Logic Under Test

```typescript
export const canNavigateToStudio = (auditResult: AuditResult): boolean => {
  return auditResult.validation === 'success' && auditResult.threshold_met;
};
```

### 4. Test Suites

```typescript
describe('Quality Gate Logic (LOGIC-GATE-001)', () => {
  describe('Threshold Validation', () => {
    it('should require exactly 85% or higher to pass', () => {
      expect(meetsQualityThreshold(85)).toBe(true);
      expect(meetsQualityThreshold(84.99)).toBe(false);
    });
  });

  describe('Regression Protection', () => {
    it('CRITICAL: Quality Gate threshold must remain 85', () => {
      expect(QUALITY_GATE_THRESHOLD).toBe(85);
    });
  });
});
```

---

## Regression Protection

Each test file includes a **Regression Protection** suite with tests marked `CRITICAL:`. These tests will fail if someone accidentally:

- Changes a threshold value
- Removes a validation check
- Weakens a constraint

### Example

```typescript
describe('Regression Protection (LOGIC-GATE-001)', () => {
  it('CRITICAL: Quality Gate threshold must remain 85', () => {
    expect(QUALITY_GATE_THRESHOLD).toBe(85);
  });

  it('CRITICAL: canNavigateToStudio must check validation AND threshold', () => {
    // Ensures both checks are present
    const failValidation = { validation: 'failure', threshold_met: true };
    const failThreshold = { validation: 'success', threshold_met: false };

    expect(canNavigateToStudio(failValidation)).toBe(false);
    expect(canNavigateToStudio(failThreshold)).toBe(false);
  });
});
```

---

## Integration with CI/CD

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running logic gate tests..."
npm run test:logic-gates

if [ $? -ne 0 ]; then
  echo "❌ Logic gate tests failed. Commit blocked."
  exit 1
fi
```

### GitHub Actions

```yaml
name: Logic Gate Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run logic gate tests
        run: npm run test:logic-gates
      - name: Check coverage
        run: npm run test:coverage -- tests/logic-gates/ --threshold=90
```

---

## Adding New Logic Gates

### 1. Create Test File

```bash
touch frontend/tests/logic-gates/new-gate.test.ts
```

### 2. Follow Template

```typescript
/**
 * Logic Gate Tests: [Gate Name]
 * 
 * @trace LOGIC-GATE-00X
 * @doc DOC-006#section
 * 
 * Purpose: [What this gate protects]
 */

import { describe, it, expect } from 'vitest';

// Types
interface GateState {
  // Define state structure
}

// Constants
const THRESHOLD = 0.85;

// Logic under test
export const passesGate = (state: GateState): boolean => {
  // Implement logic
};

// Tests
describe('[Gate Name] Logic (LOGIC-GATE-00X)', () => {
  describe('Threshold Validation', () => {
    it('should enforce threshold', () => {
      // Test threshold
    });
  });

  describe('Regression Protection', () => {
    it('CRITICAL: Threshold must remain [value]', () => {
      expect(THRESHOLD).toBe(0.85);
    });
  });
});
```

### 3. Update system-inventory.json

```json
{
  "logic_gates": {
    "new_gate": {
      "name": "New Gate Name",
      "trigger": "condition",
      "effect": "what happens",
      "status": "live",
      "doc_ref": "DOC-006#section"
    }
  }
}
```

### 4. Document in DOC-006

Add state machine definition to `DOC-006#state-machine-definitions`.

---

## Benefits

### 1. Prevents Accidental Regressions

```bash
# Someone tries to weaken the Quality Gate
- const THRESHOLD = 85;
+ const THRESHOLD = 80;

# Test fails:
❌ CRITICAL: Quality Gate threshold must remain 85
   Expected: 85
   Received: 80
```

### 2. Documents Business Rules

Tests serve as executable documentation of critical business logic.

### 3. Enables Confident Refactoring

UI can be completely rewritten without breaking business logic tests.

### 4. Fast Feedback

Logic tests run in milliseconds (no browser, no rendering).

---

## Maintenance

### Quarterly Review

1. Review all `CRITICAL:` tests
2. Verify thresholds still match business requirements
3. Check for new logic gates that need tests
4. Update documentation references

### When to Update

| Event | Action |
|:---|:---|
| New logic gate added | Create new test file |
| Threshold changed (approved) | Update constant + test |
| Gate removed | Archive test file |
| Documentation updated | Update `@doc` references |

---

## FAQ

### Q: Why not test UI components?

**A:** UI tests are brittle and break when implementation changes. Logic tests validate the core rules that must never change.

### Q: Should I test React hooks?

**A:** Only if the hook contains business logic. Pure UI hooks (animations, focus management) don't need logic tests.

### Q: What about integration tests?

**A:** Integration tests are complementary. Logic tests validate rules in isolation; integration tests validate the full flow.

### Q: How do I know what needs a logic test?

**A:** If it's a "Hard Guardrail" mentioned in DOC-006, DOC-007, or DOC-008, it needs a logic test.

---

**End of Logic-First Testing Suite Documentation**
