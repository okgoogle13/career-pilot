# Component Inventory & Migration Roadmap

## Migration Statistics

| Category | Count | Percentage | Status |
|----------|-------|------------|--------|
| **[LEGACY] Migrated** | 4 | 14% | ✅ Complete |
| **[LEGACY] Pending** | 15 | 52% | ⏳ In Progress |
| **[NEW] To Build** | 10 | 34% | 📋 Planned |
| **TOTAL** | **29** | **100%** | - |

---

## ✅ Phase 1: Atoms — COMPLETE (4/4 LEGACY components)

### [LEGACY] Migrated Components

#### 1. M3TextField
- **Path**: `frontend/src/components/ui/M3TextField.tsx`
- **Type**: **[LEGACY]** — Migrated
- **Lines**: 354
- **Status**: ✅ Complete
- **Compliance**: 95/100
- **Mode**: Laboratory (with Gallery support)
- **Features**: Floating label, focus outline, WCAG 2.1 AA, 80% counter warning
- **Stories**: ✅ 13 variants
- **Tests**: ⏳ Pending

#### 2. M3Select
- **Path**: `frontend/src/components/ui/M3Select.tsx`
- **Type**: **[LEGACY]** — Migrated
- **Lines**: 330
- **Status**: ✅ Complete
- **Compliance**: 90/100
- **Mode**: Laboratory (with Gallery support)
- **Features**: Keyboard navigation, floating label, dropdown animation
- **Stories**: ✅ 11 variants
- **Tests**: ⏳ Pending

#### 3. M3Checkbox
- **Path**: `frontend/src/components/ui/M3Checkbox.tsx`
- **Type**: **[LEGACY]** — Migrated
- **Lines**: 253
- **Status**: ✅ Complete
- **Compliance**: 90/100
- **Mode**: Laboratory (with Gallery support)
- **Features**: Indeterminate state, check animation, M3Radio variant
- **Stories**: ⏳ Pending
- **Tests**: ⏳ Pending

#### 4. StatusBadge
- **Path**: `frontend/src/components/ui/StatusBadge/StatusBadge.tsx`
- **Type**: **[LEGACY]** — Migrated
- **Lines**: 97
- **Status**: ✅ Complete
- **Compliance**: 85/100
- **Mode**: Gallery (with Laboratory support)
- **Features**: 5 semantic variants, hover animation, removed MUI dependency
- **Stories**: ⏳ Pending
- **Tests**: ✅ Exists (`StatusBadge.test.tsx`)

---

## 🔄 Phase 2: Structures (Molecules) — Priority: HIGH

### [LEGACY] Components to Migrate

#### 5. TechCard
- **Path**: `frontend/src/components/shared/TechCard.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~200 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 2.5 hours
- **Complexity**: Medium-High (card layout, hover states)
- **Dependencies**: None
- **Priority**: HIGH (used in multiple pages)

#### 6. GlassLeafCard
- **Path**: `frontend/src/components/ui/GlassLeafCard.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~180 (estimated)
- **Target Mode**: Gallery
- **Estimated Time**: 2.5 hours
- **Complexity**: High (glassmorphism effects, backdrop blur)
- **Dependencies**: None
- **Priority**: HIGH (hero component)

#### 7. MetricCard
- **Path**: `frontend/src/components/ui/metric-card.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~150 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 2 hours
- **Complexity**: Medium (data visualization)
- **Dependencies**: chart component
- **Priority**: HIGH (dashboard component)

#### 8. M3Card
- **Path**: `frontend/src/components/ui/M3Card.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~120 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 1.5 hours
- **Complexity**: Medium (base card component)
- **Dependencies**: None
- **Priority**: HIGH (foundational)

---

## 🎨 Phase 3: Hero Moments (Organisms) — Priority: HIGH

### [LEGACY] Components to Migrate

#### 9. SplitHeader
- **Path**: `frontend/src/components/ui/SplitHeader.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~200 (estimated)
- **Target Mode**: Gallery
- **Estimated Time**: 2 hours
- **Complexity**: Medium-High (Banksia Composition, typography duet)
- **Dependencies**: None
- **Priority**: HIGH (landing page hero)

#### 10. AuroraHeader
- **Path**: `frontend/src/components/ui/AuroraHeader.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~250 (estimated)
- **Target Mode**: Gallery
- **Estimated Time**: 2.5 hours
- **Complexity**: High (animated background, complex composition)
- **Dependencies**: None
- **Priority**: MEDIUM (alternative hero)

---

## 📦 Phase 4: Legacy UI Components — Priority: MEDIUM-HIGH

### [LEGACY] Components to Migrate

#### 11. button
- **Path**: `frontend/src/components/ui/button.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~180 (estimated)
- **Target Mode**: Both (Gallery + Laboratory)
- **Estimated Time**: 2 hours
- **Priority**: HIGH (foundational, used everywhere)
- **Note**: Has Figma Code Connect variant (`button.figma.tsx`)

#### 12. M3Alert
- **Path**: `frontend/src/components/ui/M3Alert.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~150 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 1.5 hours
- **Priority**: MEDIUM
- **Assessment**: Check if used, consider consolidating with StatusBadge

#### 13. alert-dialog
- **Path**: `frontend/src/components/ui/alert-dialog.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~200 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 2 hours
- **Priority**: MEDIUM

#### 14. form
- **Path**: `frontend/src/components/ui/form.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~180 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 2 hours
- **Priority**: MEDIUM

#### 15. collapsible
- **Path**: `frontend/src/components/ui/collapsible.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~120 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 1.5 hours
- **Priority**: MEDIUM

#### 16. table
- **Path**: `frontend/src/components/ui/table.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~300 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 3 hours
- **Priority**: LOW (complex, defer if not critical)

#### 17. chart
- **Path**: `frontend/src/components/ui/chart.tsx`
- **Type**: **[LEGACY]** — Pending Migration
- **Lines**: ~250 (estimated)
- **Target Mode**: Laboratory
- **Estimated Time**: 3 hours
- **Priority**: LOW (data visualization library)

#### 18. icon-badge
- **Path**: `frontend/src/components/ui/icon-badge.tsx`
- **Type**: **[LEGACY]** — Assessment Needed
- **Lines**: ~80 (estimated)
- **Assessment**: Check if redundant with StatusBadge
- **Priority**: LOW

#### 19. NativeAnchor
- **Path**: `frontend/src/components/ui/NativeAnchor.tsx`
- **Type**: **[LEGACY]** — Assessment Needed
- **Lines**: ~60 (estimated)
- **Assessment**: Check if still used
- **Priority**: LOW

---

## 🆕 Phase 5: New Components to Build — Priority: VARIES

### [NEW] Components to Build from Scratch

#### 20. M3Button
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Both (Gallery + Laboratory)
- **Estimated Time**: 2 hours
- **Priority**: HIGH
- **Rationale**: Replace legacy `button.tsx` with Northcote-native implementation
- **Features**: Gallery/Laboratory modes, organic asymmetry, motion tokens

#### 21. M3Dialog
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 2.5 hours
- **Priority**: HIGH
- **Rationale**: Modern dialog/modal with Northcote tokens
- **Features**: Backdrop blur, organic shapes, keyboard navigation

#### 22. M3Tooltip
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Both
- **Estimated Time**: 1.5 hours
- **Priority**: MEDIUM
- **Features**: Positioning, animation, accessibility

#### 23. M3Tabs
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 2 hours
- **Priority**: MEDIUM
- **Features**: Keyboard navigation, active indicator animation

#### 24. M3Slider
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 2 hours
- **Priority**: MEDIUM
- **Features**: Range selection, accessibility, organic thumb shape

#### 25. M3Switch
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Both
- **Estimated Time**: 1.5 hours
- **Priority**: MEDIUM
- **Features**: Toggle animation, Gallery/Laboratory variants

#### 26. M3Breadcrumbs
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 1 hour
- **Priority**: LOW
- **Features**: Navigation, truncation, responsive

#### 27. M3Pagination
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 1.5 hours
- **Priority**: LOW
- **Features**: Page navigation, accessibility

#### 28. M3Progress
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 1.5 hours
- **Priority**: LOW
- **Features**: Linear/circular variants, indeterminate state

#### 29. M3Skeleton
- **Type**: **[NEW]** — Build from Scratch
- **Target Mode**: Laboratory
- **Estimated Time**: 1 hour
- **Priority**: LOW
- **Features**: Loading placeholders, organic shapes

---

## 🔷 Core Shape Components (Figma Code Connect) — Priority: LOW

### [LEGACY] Figma Integration Components

#### 30-35. Shape Components
- **Stone**, **Pebble**, **Leaf** (`.tsx` and `.figma.tsx` variants)
- **Type**: **[LEGACY]** — Figma Code Connect
- **Status**: ⏳ Pending (low priority)
- **Purpose**: Design tooling, not user-facing
- **Estimated Time**: 1 hour each (6 hours total)
- **Priority**: LOW

---

## Priority Matrix

| Type | Priority | Components | Estimated Time |
|------|----------|-----------|----------------|
| **[LEGACY]** | **HIGH** | button, TechCard, GlassLeafCard, MetricCard, M3Card, SplitHeader | 12.5 hours |
| **[LEGACY]** | **MEDIUM** | AuroraHeader, M3Alert, alert-dialog, form, collapsible | 10.5 hours |
| **[LEGACY]** | **LOW** | chart, table, icon-badge, NativeAnchor | 7 hours |
| **[NEW]** | **HIGH** | M3Button, M3Dialog | 4.5 hours |
| **[NEW]** | **MEDIUM** | M3Tooltip, M3Tabs, M3Slider, M3Switch | 7 hours |
| **[NEW]** | **LOW** | M3Breadcrumbs, M3Pagination, M3Progress, M3Skeleton | 5 hours |
| **TOTAL** | - | **35 components** | **46.5 hours** |

---

## Recommended Migration Order

### Week 1: Complete Phase 2 (Structures) — [LEGACY]
1. M3Card (1.5h) — Foundation
2. TechCard (2.5h) — High usage
3. MetricCard (2h) — Dashboard
4. GlassLeafCard (2.5h) — Hero component

**Total**: 8.5 hours | **Type**: [LEGACY]

### Week 2: Complete Phase 3 (Hero Moments) + Critical Components
5. SplitHeader (2h) — Landing page | [LEGACY]
6. button (2h) — Foundational | [LEGACY]
7. M3Button (2h) — Replacement | [NEW]
8. M3Dialog (2.5h) — Modal system | [NEW]

**Total**: 8.5 hours | **Type**: Mixed

### Week 3: Remaining Legacy + New Atoms
9. AuroraHeader (2.5h) | [LEGACY]
10. M3Alert (1.5h) | [LEGACY]
11. alert-dialog (2h) | [LEGACY]
12. M3Tooltip (1.5h) | [NEW]
13. M3Switch (1.5h) | [NEW]

**Total**: 9 hours | **Type**: Mixed

### Week 4: Complex Components + Remaining New
14. form (2h) | [LEGACY]
15. collapsible (1.5h) | [LEGACY]
16. M3Tabs (2h) | [NEW]
17. M3Slider (2h) | [NEW]
18. Assessment of icon-badge, NativeAnchor (1h) | [LEGACY]

**Total**: 8.5 hours | **Type**: Mixed

---

## Testing Coverage Requirements

### Phase 1 (Atoms) — Missing Tests
- [ ] M3TextField.test.tsx | [LEGACY]
- [ ] M3Select.test.tsx | [LEGACY]
- [ ] M3Checkbox.test.tsx | [LEGACY]
- [ ] StatusBadge.test.tsx (exists, needs update) | [LEGACY]

### All Future Components
- [ ] Unit tests for all [LEGACY] migrated components
- [ ] Unit tests for all [NEW] components
- [ ] Integration tests for complex interactions
- [ ] Visual regression tests (Chromatic)
- [ ] Accessibility tests (jest-axe)

**Target Coverage**: 80% minimum

---

## Success Metrics

- ✅ All components categorized as [NEW] or [LEGACY]
- ⏳ 100% Storybook coverage
- ⏳ 80%+ test coverage
- ⏳ 90%+ average compliance score
- ⏳ Zero MUI dependencies
- ⏳ All components support Gallery/Laboratory modes

---

## Legend

- **[LEGACY]**: Existing component requiring migration to Northcote Curio
- **[NEW]**: Component to be built from scratch with Northcote tokens
- ✅: Complete
- ⏳: In Progress
- 📋: Planned
