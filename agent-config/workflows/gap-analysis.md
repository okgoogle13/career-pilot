---
description: Automated Gap Analysis vs. Atomic Specs
---

# Atomic Gap Analysis Workflow

Use this workflow to verify that the implementation matches the Atomic Documentation specs (`DOC-003` and `DOC-004`).

## 1. Run the Verification Script

This script scans the codebase and cross-references it with the JSON specs derived from docs.

```bash
npx ts-node scripts/verify-atomic-compliance.ts
```

## 2. Review the Gap Report

The script generates `docs/v2_atomic/GAP_REPORT.md`.
- **Pass:** All components and flows found.
- **Fail:** Missing components or test coverage.

## 3. Remediation

For every missing item:
1.  **If Component Missing:** Use `/component_builder` to scaffold it.
2.  **If Test Missing:** Use `/api_integration_test_scaffolder`.
