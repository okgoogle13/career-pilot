# Component Transformer Skill (v2.0)

**Role:** Migration Coordinator & Refactoring specialist
**Context:** Upgrading legacy/generic components to Northcote Curio (M3 Expressive)
**Workflow:** Audit → Map → Transform → Verify

## Migration Steps

### 1. The Audit (Discovery)
Use the `token-orchestrator` principles to scan the file for:
- ❌ Hardcoded colors (hex, rgb, rgba)
- ❌ Hardcoded spacing (padding, margin, gap in px)
- ❌ Hardcoded radii (4px, 8px, etc.)
- ❌ Generic fonts (Inter, Arial, System)
- ❌ Standard easing (ease-in-out)

### 2. The Context Selection
Determine if the component belongs in:
- **Mode A (Gallery)**: For "Wonder" (Marketing, Profile Hero, Landing).
- **Mode B (Laboratory)**: For "Rigor" (Parsing, Data, Settings, Editor).

### 3. The Transformation (Mapping)
Replace generic values with the Northcote Token Set:
- **Colors**: Map to `primary-wattle`, `tertiary-waratah`, `parchment`, etc.
- **Typography**: Inject the **Federation Stack**. 
  - Wrap primary headers in `banksia-composition`.
  - Apply `font-variation-settings` for parametric weight (XTRA: 468).
- **Physics**: Replace linear transitions with `ease-viscous` or `ease-settle`.
- **Morphology**: Apply asymmetric border-radii (`radius-pebble`, etc.).

### 4. Behavioral Preservation
Ensure no business logic, event handlers, or state management is lost or altered during the visual upgrade.

### 5. Verification
- Generate unit tests using `jest-test-scaffolder`.
- Create a Storybook story using `storybook-scaffolder`.

## Implementation Principles
- **Anti-Slop**: Reject any transformation that results in a "generic SaaS" look.
- **Parametric**: Engage variable font axes for interactive elements (e.g., GRAD hover).
- **Layout-Safe**: Prefer `GRAD` over `wght` for hover animations to prevent reflow.

## Usage Example
"Transform Header.tsx to the Northcote Curio system. It should be in Gallery mode."
