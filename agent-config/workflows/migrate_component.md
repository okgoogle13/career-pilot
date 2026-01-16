---
description: Migrate a legacy component to Northcote Curio (M3) using custom design skills.
params:
  path: "Path to the component file (e.g., src/components/MyComponent.tsx)"
  mode: "Design mode: 'gallery' or 'laboratory' (default: gallery)"
---

# Component Migration Workflow

This workflow guides the migration of a React component to the **Northcote Curio** design system, ensuring compliance with "Electric Alchemist" aesthetics and "Anti-Slop" standards.

## 1. Context Loading & Skill Activation

First, we load the necessary custom skills and the target component.

1.  **Load Design Skills**:
    - Read `design-skills/m3-expressive-audit.md` to understand the audit principles.
    - Read `design-skills/m3-anti-slop-validator.md` to understand forbidden patterns.
    - Read `design-skills/m3-design-system-generator.md` for context on the generative philosophy.

2.  **Load Target Component**:
    - Read the file content at `{{path}}`.

## 2. Design Audit (Critique Phase)

Performed by the Agent using the `m3-expressive-audit` skill.

1.  **Analyze Current State**:
    - Identify hardcoded HEX values, pixel spacings, and legacy utility classes.
    - Identify semantic mismatches (e.g., using a generic `div` where a `Card` or `Surface` is appropriate).

2.  **Map to Northcote Curio**:
    - specificy which `var(--sys-*)` tokens should replace the hardcoded values.
    - *Note*: If `{{mode}}` is "gallery", prioritize high-fidelity, polished tokens. If "laboratory", prioritize functional, raw data tokens.

## 3. Refactoring (Execution Phase)

Rewrite the component file using `write_to_file` or `replace_file_content`.

**Strict Migration Rules:**
- **Imports**: Use `@mui/material` components (Box, Stack, Typography, Paper).
- **Styling**: ALL styling must be via the `sx` prop or `styled` components.
- **Tokens**: 
    - Color: `var(--sys-color-*)`
    - Spacing: `var(--sys-spacing-*)`
    - Shape: `var(--sys-shape-*)`
    - Typography: `var(--sys-typescale-*)`
- **Anti-Slop**:
    - NO `px` values for padding/margin (use integers `p: 2` or tokens).
    - NO hardcoded hex codes.
    - NO `className` strings (unless absolutely necessary for 3rd party libs).

## 4. Verification (Anti-Slop Check)

Run a final validation using the `m3-anti-slop-validator` principles.

1.  **Self-Correction**:
    - Scan the new code for any violation of the Anti-Slop rules.
    - If violations are found, fix them immediately.

2.  **Final Polish**:
    - Ensure the component exports are correct.
    - Ensure comments explain *why* specific tokens were chosen (optional, for complex mappings).
