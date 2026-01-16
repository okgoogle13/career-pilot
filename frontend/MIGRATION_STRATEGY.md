# Frontend Migration Strategy & Target Architecture

## 1. Executive Summary
The current codebase is in a transitional state between a legacy rapid-prototype structure and the structured "Northcote Curio" design system. The goal of this migration is to consolidate truth, enforce the Gallery/Laboratory duality, and isolate legacy code.

## 2. Key Architectural Decisions

### A. The "Design System" Directory
We will establish `src/design-system/` as the single source of truth.
- **Why**: Currently, components are scattered across `components/core`, `components/ui`, and `components/shared`.
- **Action**: Move correct "Northcote" components here.

### B. Feature-Sliced Design (FSD) Adoption
We will lean heavily into the existing `src/features/` pattern.
- **Why**: "Shared" components often become junk drawers. Business logic components (like `TechCard` or `MetricCard`) belong to the domains that own them (e.g., `features/analysis`).

### C. The "Legacy" Quarantine
We will rename (conceptually or physically) the current mixed folders to identify they are deprecated.
- **Action**: `src/components/ui` (Shadcn/UI generic) should be treated as legacy. Do not import from it for new Northcote work.

## 3. Reference Architecture (Target Tree)

Use this tree for strategic planning. It highlights where things *should* go.

```text
frontend/src/
├── app/                        # App-wide routing & providers (renamed from src base)
│   ├── App.tsx
│   ├── main.tsx
│   └── context/                # Global contexts (ModeContext, AuthContext)
├── design-system/              # [NEW] The Northcote Library
│   ├── tokens/
│   │   ├── tokens.json         # Master Source (was src/theme/tokens.json)
│   │   └── design-tokens.css   # Generated Variables
│   ├── primitives/             # The "Atoms" of Northcote
│   │   ├── Leaf.tsx
│   │   ├── Pebble.tsx
│   │   ├── Stone.tsx
│   │   └── IconBadge.tsx
│   └── components/             # The "Molecules"
│       ├── NorthcoteButton.tsx
│       ├── M3Card.tsx
│       └── AuroraHeader.tsx
├── features/                   # Business Domains
│   ├── analysis/               # (Laboratory Mode)
│   │   ├── components/
│   │   │   ├── TechCard.tsx
│   │   │   └── MetricCard.tsx
│   │   └── Analysis.tsx
│   ├── gallery/                # (Gallery Mode)
│   │   ├── components/
│   │   │   └── Fireflies.tsx
│   │   └── Landing.tsx
│   └── ...
├── layouts/                    # Application Shells
│   ├── GalleryShell/           # The Victorian Foyer
│   │   ├── components/
│   │   │   ├── GalleryDock.tsx
│   │   │   └── Fireflies.tsx
│   │   └── views/              # [NEW] Scaffolded Logic
│   │       ├── GalleryLanding.tsx
│   │       ├── GalleryAuth.tsx
│   │       ├── GalleryOnboarding.tsx
│   │       ├── GalleryFeed.tsx
│   │       ├── GalleryDashboard.tsx
│   │       └── GalleryKanban.tsx
│   └── LaboratoryShell/        # The Workbench
├── legacy/                     # [QUARANTINE] Old Components
│   └── ui/                     # Old Shadcn/Generic components
└── lib/                        # Utilities
    └── utils.ts
```

## 4. Immediate Migration Steps

1.  **Consolidate Tokens**: Deprecate `src/design-tokens.json` in favor of `src/theme/tokens.json`. Ensure build scripts point to the `theme` version.
2.  **Move Primitives**: Move `components/core/*` to `design-system/primitives/`.
3.  **Move Business UI**: Move `TechCard`, `MetricCard`, `ApplicationCard` from `components/shared/` to their respective `features/` directories (or `features/shared` if truly cross-cutting).
4.  **Isolate Shells**: Ensure `layouts/GalleryShell` and `layouts/LaboratoryShell` are the only layout entry points.

## 5. Token Strategy
- **Master**: `src/theme/tokens.json` (The detailed Style Dictionary source).
- **CSS Output**: `src/theme/design-tokens.css` (What the app imports).
- **Consuming**: Components should strictly use `var(--token-name)` or Tailwind classes mapped to these variables.

## 6. Component Consolidation Workflow (Legacy vs. Northcote)

This workflow addresses the consolidation of components using old "Electric Alchemist" tokens (often generic Tailwind colors like `zinc`, `indigo`, `blue`) with the new Northcote Curio system.

### Phase A: Audit & Identification
1.  **Identify Legacy**: Search for specific non-semantic color classes:
    -   `bg-zinc-*`, `bg-slate-*` (excluding Northcote's semantic `slate-smoke`)
    -   `text-indigo-*`, `text-blue-*` (Old primary colors)
    -   `shadow-lg`, `rounded-md` (Generic shapes)
2.  **Tag Components**: Add a standard JSDoc deprecation notice to identifying files:
    ```typescript
    /**
     * @deprecated LEGACY_THEME
     * Use design-system/primitives/Stone.tsx or Feature-Specific replacement.
     */
    ```

### Phase B: The "Northcote" Test
For each legacy component, ask:
1.  **Is there a Figma Export?**
    -   *Yes*: **Replace**. Create new component in `design-system/` or `features/` based *strictly* on the export. Delete the old one.
    -   *No*: **Refactor**. Map old tokens to new semantic tokens (see Mapping Table).

### Phase C: Token Mapping (Electric Alchemist -> Northcote)

| Legacy Concept | Old Token Example | Target Northcote Token | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Dark Bg** | `bg-zinc-900`, `bg-black` | `specimenNight` | `bg-surface-specimen-night-base` |
| **Card Bg** | `bg-zinc-800` | `glassSurface` | `bg-surface-glass-gallery-base` |
| **Primary** | `text-indigo-500` | `wattleGold` | `text-primary-wattle-gold` |
| **Border** | `border-zinc-700` | `etchingLine` | `border-primary-etching-line` |
| **Radius** | `rounded-lg`, `rounded-xl` | `radius-stone` | `rounded-[var(--radius-stone)]` |
| **Shadow** | `shadow-xl` | `shadow-rest` | `shadow-rest` |

### Phase D: Execution Order
1.  **Primitives First**: Ensure `Button`, `Card`, `Badge` in `design-system/primitives` are pristine.
2.  **Shell Second**: `layouts/` (Done).
3.  **Features Third**: Systematically refactor `features/` one by one (e.g., `analysis/`).

