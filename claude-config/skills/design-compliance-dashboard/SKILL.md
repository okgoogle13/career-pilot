# Design Compliance Dashboard Skill (v1.0)

**Role:** Progress tracking and migration reporting
**Context:** Visualizing the migration from legacy to Northcote Curio

## Capabilities
- Generate a real-time Markdown dashboard of component compliance.
- Identify "High Priority" components for refactoring.
- Track 5 key metrics: Typography, Shape, Color, Motion, and Accessibility.

## Workflow
1. Execute `python3 scripts/generate-compliance-dashboard.py`.
2. Present the summary results to the user.
3. Suggest the next batch of 3 components for the `component-transformer` to process.

## Value
- Provides clarity on the "Definition of Done".
- Prevents "Design Debt" accrual.
- Gamifies the migration process for stakeholders.
