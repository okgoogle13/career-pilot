# Phase 2 Execution Checklist: Structures (Cards)

**Goal**: Migrate 4 Card components (M3Card, MetricCard, TechCard, GlassLeafCard)
**Timeline**: Week 1
**Strategy**: Hybrid Split (Batch 2A: Antigravity, Batch 2B: Claude Desktop)

---

## 🚀 Pre-Flight
- [ ] **Claude Desktop**: Approves Master Plan
- [ ] **Infrastructure**: Exchange directory verified

## 📦 Batch 2A: Foundation Cards (Antigravity)
*Focus: Template creation and simple variants*

### 1. M3Card (Base Component)
- [ ] Create `frontend/src/components/ui/M3Card.tsx`
- [ ] Implement `organicAsymmetry` shape token logic (Gallery vs Lab)
- [ ] Add `cardHover` motion interaction
- [ ] Support `variant="glass" | "filled" | "outlined"`
- [ ] Verify WCAG contrast via `validate_token_compliance`

### 2. MetricCard (Data Display)
- [ ] Create `frontend/src/components/ui/MetricCard.tsx`
- [ ] Extend `M3Card`
- [ ] Implement `metricDisplay` typography token
- [ ] Add trend indicator (up/down arrow) with semantic colors
- [ ] Verify responsive behavior

### 3. Automated Validation (Batch 2A)
- [ ] Run compliance audit script
- [ ] Generate Storybook stories
- [ ] Report completion to `outbox/batch-2a-report.md`

---

## 💎 Batch 2B: Hero Cards (Claude Desktop)
*Focus: Complex glassmorphism and state management*

### 4. TechCard (High Interaction)
- [ ] Review `outbox/batch-2a-report.md` (Consume M3Card base)
- [ ] Migrate `frontend/src/components/shared/TechCard.tsx`
- [ ] Implement complex hover states (tilt/glare effects)
- [ ] Ensure `displayHero` typography usage if applicable

### 5. GlassLeafCard (Visual Hero)
- [ ] Migrate `frontend/src/components/ui/GlassLeafCard.tsx`
- [ ] Implement heavy glassmorphism (`backdrop-blur-xl`)
- [ ] Add leaf-shape masking utilizing `shape.organicAsymmetry.leaf`
- [ ] Verify performance (layer compositing)

### 6. Final Review (Batch 2B)
- [ ] Visual regression test (Playwright)
- [ ] Code review by user
- [ ] Merge to `develop`

---

## 📝 Exit Criteria
- [ ] All 4 components have `compliance_score > 90`
- [ ] Zero MUI dependencies
- [ ] Storybook stories for all variants
- [ ] Dual-mode (Gallery/Laboratory) verified works
