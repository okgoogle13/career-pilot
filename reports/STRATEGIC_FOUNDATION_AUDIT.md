# Northcote Curio: Foundation Audit & Strategic Direction

## Executive Summary
The Northcote Curio design system has a **strong philosophical foundation** but is currently in a **transitional architectural state**. The "Victorian Naturalist Field Station" metaphor is well-defined in `tokens.json` metadata, but the component library is split between legacy Material 3 (`M3*`) implementation and a newer, standard component set.

## Current State Assessment

### Architectural Strength
- **Vision is Clear:** The "Gallery vs. Laboratory" mode concept is powerful and unique.
- **Token Structure Exists:** `tokens.json` is present and semantically structured.
- **Scaffolding is Ready:** The project structure support stories, tests, and component isolation.

### Token System Maturity
- **Score:** ~70%
- **Strengths:** Semantic definitions for "Gallery" and "Laboratory" modes are excellent. Botanical references are established.
- **Gaps:** Tailwind configuration seems to mix hardcoded values with token references (as seen in previous audits).
- **Risk:** Potential drift between `tokens.json` and `tailwind.config.js`.

### Component System Health
- **Total Components:** ~37 (in `ui` folder)
- **Status:** **FRACTURED**
  - **Legacy (M3):** `M3Button`, `M3Card`, `M3TextField`. These generally follow M3 Expressive but use legacy tokens.
  - **Standard (Shadcn/Radix):** `button.tsx`, `alert-dialog.tsx`. These are likely standard implementations that need Northcote styling.
  - **Northcote (New):** `GlassLeafCard`, `AuroraHeader`. These represent the target state.
- **Documentation:**
  - Stories exist for some M3 components (`M3Button.stories.tsx`) but are missing for others.
  - Tests are not consistently visible in the `ui` folder (likely in `__tests__` or missing).

## Strategic Priorities (Ordered by Leverage)

1. **Token Perfection (The Source of Truth)**
   - **Why:** We cannot unify the fragmented component landscape without a single, undeniable source of truth for colors, spacing, and radius.
   - **Effort:** Low (1-2 hours)
   - **Enables:** Automated refactoring of *all* components.

2. **Component Unification (The Refactor)**
   - **Why:** Having `M3Button` and `button.tsx` is confusing and unmaintainable. We need `NorthcoteButton` (or just `Button`) that fulfills the Field Station spec.
   - **Effort:** Medium (4-8 hours)
   - **Enables:** Consistent UI and removal of technical debt.

3. **Documentation & Testing (The Guarantee)**
   - **Why:** To prevent regression to generic "slop", we must enforce the aesthetic with visual regression tests.
   - **Effort:** Medium
   - **Enables:** Operational scale.

## Philosophical Alignment Check
- **Field Station Metaphor:** Strong in tokens, weak in legacy components.
- **Botanical Accents:** Defined in JSON (`wattleGold`, `waratahCrimson`) but inconsistent in usage.
- **Dark Mode:** "Specimen Night" concept is strong but needs uniform application.

## Next Steps
1. **Execute Prompt 2 (Token Perfection):** Validate and finalize `tokens.json` and generate a strict `tailwind.config.js`.
2. **Execute Prompt 3 (Compliance Baseline):** Run a full audit against the *perfected* tokens to see exactly how far off the M3 components are.
3. **Execute Prompt 4 (Refinement):** Automatically refactor components to the new standard.
