# Current State Report: Frontend Architecture Audit
**Date:** 2026-01-11
**Auditor:** Antigravity (Senior Frontend Systems Engineer)

## 1. Structural Analysis

### Overview
The `frontend/src` directory follows a **Hybrid Feature-Based Architecture**, transitioning towards a domain-driven design structure.

-   **`features/`**: The core domain logic is well-segmented into `auth`, `dashboard`, `landing`, `analysis`, `profile`, etc. This aligns with modern "Feature-Sliced" principles.
-   **`components/`**: Divided into `ui` (base primitives) and `shared` (composite interactives).
-   **`pages/`**: Acts primarily as a route layer but currently holds significant business logic (`IngestionPage.tsx`, `JobQueue.tsx`) that arguably belongs in `features/`.

### Directory Hierarchy Map
```text
src/
├── features/         # Domain modules (Good separation)
│   ├── auth/
│   ├── dashboard/
│   ├── landing/
│   ├── analysis/
│   └── ...
├── components/       # Shared UI Logic
│   ├── ui/           # Base atoms (Button, Card, Input)
│   └── shared/       # Molecules (Headers, Cards with logic)
├── pages/            # Route Views
├── layouts/          # Global App Wrappers
└── api/, hooks/, context/, services/ # Support layers
```

### Risk: Flat Directories
The following directories exceed the recommended "flatness" threshold (>20 files) and lack sub-grouping:
-   `src/components/ui`: **39 files**. (Risk: Hard to browse, mixing complex and simple atoms).
-   `src/components/shared`: **29 files**. (Risk: "Dump drawer" for components that don't fit elsewhere).

## 2. Component Inventory & Management

### Discovery
-   **Master Inventory**: A comprehensive `system-inventory.json` exists in the root, tracking component status (Live/Planned), file paths, and documentation references (`DOC-006`).
-   **Tracking**: The system actively tracks "completion rate" (currently 47%) and "blockers".

### Automation & Tooling
The project contains an extensive suite of audit and management scripts in `scripts/`, including:
-   `audit-component-structure.sh`
-   `audit-frontend-structure.sh`
-   `audit-hardcoded-values.sh`
-   `generate-component-manifest.ts`
-   `validate-m3-compliance.sh`

### Dependencies
-   **Primary UI**: Material UI (`@mui/material`) + Radix UI (`@radix-ui/*`).
-   **Styling**: Tailwind CSS (present in `package.json`), CSS Modules (`*.module.css`), and raw CSS (`index.css`).
-   **Motion**: Framer Motion.

## 3. Naming & Token Consistency

### Naming Conventions
-   **Components**: Strictly **PascalCase** (e.g., `LandingPage.tsx`, `JobMatchCard.tsx`).
-   **Structure**: Consistent `Component.tsx` + `Component.module.css` pairing (e.g., in `features/landing`).

### Token Systems & Leakage
-   **Violation Detected**: Multiple instances of hardcoded `px` values found in:
    -   `src/index.css`
    -   `src/stories/header.css`
    -   `src/stories/button.css`
-   **Risk**: This indicates incomplete migration to the Design Token system (likely defined in `src/theme/tokens.json`).
-   **CSS Modules**: Heavily used, but verification is needed to ensure they consume theme variables (`var(--...)`) rather than raw values.

## 4. Legacy Debt & Anomalies

### Architecture Drift
-   **Pages vs. Features**: `src/pages/IngestionPage.tsx` and `src/pages/JobQueue.tsx` contain heavy logic that mirrors structure found in `src/features/`. These should be refactored into `features/ingestion/` and `features/queue/` (or `features/sentry/`) to maintain the Feature-Based standard.
    -   *Evidence*: `system-inventory.json` explicitly maps `UI-COMP-101` (Drag-and-Drop) to `pages/IngestionPage.tsx`, confirming this structural inconsistency.

### Potential Orphans
-   `src/components/shared` likely contains components that have been superseded by specific feature-based implementations. A usage audit is recommended using `scripts/analyze-component-duplication.sh` (if available or similar).

## Recommendations
1.  **Refactor Pages**: Move `IngestionPage` and `JobQueue` logic into `features/` directory.
2.  **Group Components**: Subdivide `components/ui` into categories (e.g., `forms`, `display`, `feedback`) to reduce flat-structure noise.
3.  **Enforce Tokens**: Run `audit-hardcoded-values.sh` and remediate `px`/hex usage in CSS files.
