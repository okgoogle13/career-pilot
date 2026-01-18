# Frontend Component Inventory & Migration Status

## 1. New System: Northcote Curio (Target)

These components are fully migrated, use semantic tokens (`specimenNight`, `wattleGold`), and adhere to the Gallery/Laboratory duality.

### Layouts & Shells
- `src/layouts/LaboratoryShell/`
  - `LayoutShell.tsx` (Main Container)
  - `components/GlobalHeader.tsx`
  - `components/NavRail.tsx`
  - `components/SidePanel.tsx`
  - `components/MainCanvas.tsx`
- `src/layouts/GalleryShell/`
  - `GalleryShell.tsx` (Main Container)
  - `components/GalleryDock.tsx`
  - `components/Fireflies.tsx`
  - `views/GalleryLanding.tsx`
  - `views/GalleryAuth.tsx`
  - `views/GalleryOnboarding.tsx`
  - `views/GalleryFeed.tsx`
  - `views/GalleryDashboard.tsx`
  - `views/GalleryKanban.tsx`

### Core Primitives (Source: `src/components/core/`)
- `Leaf.tsx` (Use for Primary Actions)
- `Pebble.tsx` (Use for Cards/Containers)
- `Stone.tsx` (Use for Standard Surfaces)

### UI Components (Source: `src/components/ui/`)
- `NorthcoteButton.tsx` (The specific implementation of Button)
- `StatusBadge` (Recently updated)
- `NativeAnchor.tsx`

### Migrated Features (Feature-Sliced Utils)
- `src/features/applications/ApplicationCard.tsx`
- `src/features/analysis/MetricCard.tsx`
- `src/features/analysis/TechCard.tsx`
- `src/features/analysis/ImpactEnhancements.tsx`
- `src/features/gallery/GlassLeafCard.tsx`
- `src/features/gallery/IconBadge.tsx`

### Shared Components (Source: `src/components/shared/`)
- `SplitHeader.tsx` (Migrated from Legacy)
- `PageHeader.tsx`
- `KeywordTag.tsx`

---

## 3. Legacy / Deprecated (Electric Alchemist)

These components are QUARANTINED in `src/legacy/ui`. **Do not use for new features.**

### Legacy UI (Source: `src/legacy/ui/`)
> *Refactor Strategy: Replace with Primitives or NorthcoteButton*
- `button.tsx` (Generic Shadcn Button)
- `M3Card.tsx` (Generic Cards)
- `alert-dialog.tsx`
- `form.tsx`
- `table.tsx`
- `chart.tsx`
- `collapsible.tsx`
- `M3TextField.tsx`
- `M3Select.tsx`
- `M3Checkbox.tsx`
- `AuroraHeader.tsx`

---

## 4. File Tree Snapshot (Components Only)

```text
src/
├── components/
│   ├── core/               # [KEEP] Structural Primitives
│   │   ├── Leaf.tsx
│   │   ├── Pebble.tsx
│   │   └── Stone.tsx
│   ├── ui/                 # [CLEAN]
│   │   ├── NorthcoteButton.tsx
│   │   ├── StatusBadge/
│   │   └── NativeAnchor.tsx
├── legacy/                 # [QUARANTINE]
│   └── ui/
│       ├── button.tsx
│       ├── M3Card.tsx
│       └── ... (Old Shadcn/M3)
└── layouts/
    ├── LaboratoryShell/    # ✅ NEW
    └── GalleryShell/       # ✅ NEW
```
