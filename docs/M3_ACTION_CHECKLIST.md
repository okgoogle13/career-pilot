# M3 Expressive Migration - Action Checklist

**Status:** Phase 6 Complete - Ready for Rollout  
**Date:** 2026-01-08

---

## ✅ Completed Tasks

### Architecture & Foundation
- [x] Created M3 Expressive Validator skill file
- [x] Defined 3-tier token architecture (Reference → System → Component)
- [x] Implemented polygon-based shapes (Pebble, Leaf, Gem, Burst)
- [x] Defined spring physics constants
- [x] Created utility classes

### M3Card Component
- [x] Refactored M3Card to use framer-motion
- [x] Implemented path-based shapes with clip-path
- [x] Applied spring physics (stiffness: 500, damping: 27)
- [x] Integrated parametric typography with Anti-Slop Rule
- [x] Added comprehensive TypeScript types and JSDoc

### Testing Infrastructure
- [x] Created custom Playwright matchers (toHaveExpressiveMorph, toHaveSyncedTypography, toBeUsingM3Physics)
- [x] Wrote 7 integration tests
- [x] Created validation script
- [x] Integrated matchers with Playwright config

### Documentation
- [x] Wrote comprehensive M3 Expressive guide
- [x] Created Morph Previewer component
- [x] Created Axis Visualizer component
- [x] Created Slop Auditor component
- [x] Wrote integration guide for StyleGuide

### Quality Assurance
- [x] Ran validation script (ALL CHECKS PASSED ✅)
- [x] Completed component audit
- [x] Generated refactoring roadmap
- [x] Created migration completion report

---

## 📋 Immediate Next Steps (This Week)

### 1. Team Review & Planning
- [ ] **Schedule team meeting** to review M3 Expressive principles
- [ ] **Demo the interactive StyleGuide components:**
  - Navigate to `/style-guide`
  - Show Morph Previewer, Axis Visualizer, Slop Auditor
- [ ] **Review audit report:** `docs/M3_COMPONENT_AUDIT_REPORT.md`
- [ ] **Choose migration strategy:** Gradual rollout (recommended) vs Big Bang

### 2. Create GitHub Issues
Create individual issues for each component refactoring:

- [ ] **Issue #1:** Refactor M3Button component (HIGH)
  - Remove `rounded-full` classes
  - Implement clip-path with Gem shape
  - Add framer-motion with spring physics
  - Update stories

- [ ] **Issue #2:** Refactor ApplicationCard component (HIGH)
  - Replace `rounded-full` tabs with Pebble shape
  - Add spring-based hover animations
  - Update component tokens

- [ ] **Issue #3:** Refactor IconBadge component (MEDIUM)
  - Use Gem shape for highlights
  - Add morphing behavior
  - Update usage examples

- [ ] **Issue #4:** Refactor MetricCard component (MEDIUM)
  - Replace circular icon containers with Gem shape
  - Add spring physics for icon container
  - Update stories

- [ ] **Issue #5:** Review M3Checkbox component (MEDIUM)
  - Evaluate functional exception for perfect circle
  - Document decision in component JSDoc
  - Consider scaled Gem shape alternative

- [ ] **Issue #6:** Update M3Card.stories.tsx (LOW)
  - Update example code to use M3 Expressive patterns
  - Remove rounded-full from story avatars

### 3. Integrate Interactive Components into StyleGuide

Follow the integration guide in:
```
frontend/src/features/style-guide/INTEGRATION_GUIDE.tsx
```

Steps:
- [ ] Update tabs array to include `'m3-expressive'`
- [ ] Fix tab display to replace hyphens with spaces
- [ ] Insert M3 Expressive section before "SHAPES" section
- [ ] Test navigation: `/style-guide` → "M3 EXPRESSIVE" tab

### 4. Development Environment Setup
- [ ] **Verify framer-motion** is installed (already confirmed ✅)
- [ ] **Check variable fonts** are loading (Plus Jakarta Sans, Roboto Flex)
- [ ] **Run dev server:** `npm run dev`
- [ ] **Test M3Card component** on a sample page

---

## 🚀 Short-Term Actions (Weeks 1-2)

### Week 1: High-Priority Components
- [ ] **Create feature branch:** `feature/m3-button-migration`
- [ ] **Refactor M3Button:**
  - Implement Gem shape for primary actions
  - Add spring physics (stiffness: 500, damping: 27)
  - Update all button variants
  - Run tests: `npm run test`
  - Update Storybook stories
- [ ] **PR Review & Merge**
- [ ] **Create feature branch:** `feature/application-card-migration`
- [ ] **Refactor ApplicationCard:**
  - Replace tab pills with Pebble shape
  - Add morphing on active state
  - Update component tokens
- [ ] **PR Review & Merge**

### Week 2: Medium-Priority Components
- [ ] **Create feature branch:** `feature/badge-components-migration`
- [ ] **Refactor IconBadge & MetricCard:**
  - Use Gem shape for both
  - Add spring physics
  - Update stories
- [ ] **PR Review & Merge**
- [ ] **Run full validation:**
  ```bash
  ./scripts/validate-m3-compliance.sh
  npm run test
  npm run test:e2e
  ```

---

## 🧪 Testing Checklist (After Each Refactoring)

### Component-Level Testing
- [ ] **Visual Test:** Component renders correctly
- [ ] **Interaction Test:** Hover/click animations smooth
- [ ] **Physics Test:** Spring bounce visible and settles ~400ms
- [ ] **Typography Test:** Font axes sync with shape morphs
- [ ] **Layout Test:** No shifts during morphs (Anti-Slop Rule)

### Automated Testing
- [ ] **Unit Tests:** `npm run test`
- [ ] **Integration Tests:** `npm run test:e2e -- e2e/m3-expressive-integration.spec.ts`
- [ ] **Validation Script:** `./scripts/validate-m3-compliance.sh`
- [ ] **Type Checking:** `npm run type-check`

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 📊 Quality Gates

Each component refactoring must pass these gates before merging:

### Gate 1: Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests pass
- [ ] Code reviewed by team member

### Gate 2: M3 Expressive Compliance
- [ ] Uses clip-path polygons (not border-radius)
- [ ] Spring physics with correct constants
- [ ] Component tokens (not hardcoded values)
- [ ] Parametric typography (if applicable)
- [ ] Anti-Slop Rule enforced

### Gate 3: Performance
- [ ] No layout shifts (CLS score < 0.1)
- [ ] Animations smooth (60fps)
- [ ] No excessive re-renders
- [ ] Bundle size acceptable

### Gate 4: Documentation
- [ ] Component JSDoc updated
- [ ] Storybook story updated
- [ ] Props documented with examples
- [ ] Migration notes added

---

## 🔄 CI/CD Integration

### Add to GitHub Actions Workflow
```yaml
name: M3 Expressive Validation

on: [push, pull_request]

jobs:
  m3-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate M3 Compliance
        run: |
          chmod +x ./scripts/validate-m3-compliance.sh
          ./scripts/validate-m3-compliance.sh
      
      - name: Run M3 Integration Tests
        run: |
          cd frontend
          npm install
          npm run test:e2e -- e2e/m3-expressive-integration.spec.ts
```

### Add Pre-commit Hook
```bash
# In .husky/pre-commit
./scripts/validate-m3-compliance.sh || {
  echo "❌ M3 Expressive violations detected!"
  exit 1
}
```

---

## 📈 Success Metrics Tracking

Track these metrics weekly:

### Compliance Metrics
- **M3 Components Migrated:** _X_ / 6
- **Validation Script Pass Rate:** 100% (maintain)
- **Integration Test Pass Rate:** __%

### Performance Metrics
- **Average Animation FPS:** Target: 60fps
- **CLS Score:** Target: < 0.1
- **Settle Time Accuracy:** Target: 350-450ms

### Team Metrics
- **Developer Satisfaction:** Survey after 2 weeks
- **PR Review Time:** Track average time
- **Bug Reports:** M3-related issues

---

## 🎯 Definition of Done (Migration Complete)

The M3 Expressive migration is complete when:

- [ ] **All 6 identified components** migrated (M3Button, ApplicationCard, IconBadge, MetricCard, M3Checkbox, Stories)
- [ ] **Validation script** returns 0 violations across entire codebase
- [ ] **All integration tests** pass
- [ ] **StyleGuide interactive lab** fully functional
- [ ] **Team trained** on M3 Expressive principles
- [ ] **Documentation** complete and accessible
- [ ] **CI/CD pipeline** validates M3 compliance on every PR
- [ ] **Production deployment** successful with no regressions

---

## 🚨 Rollback Plan

If issues arise during rollout:

### Option 1: Feature Flag
```typescript
const useM3Expressive = process.env.REACT_APP_M3_EXPRESSIVE === 'true';

return useM3Expressive ? <M3Card /> : <LegacyCard />;
```

### Option 2: Git Revert
```bash
git revert <commit-hash>
git push
```

### Option 3: Hotfix Branch
```bash
git checkout -b hotfix/revert-m3-button
# Revert specific component changes
git commit -m "Hotfix: Revert M3Button migration"
```

---

## 📞 Support & Resources

### Documentation
- **Design Guide:** `docs/m3-expressive-guide.md`
- **Component Audit:** `docs/M3_COMPONENT_AUDIT_REPORT.md`
- **Migration Complete:** `docs/M3_EXPRESSIVE_MIGRATION_COMPLETE.md`

### Code
- **M3Card (Reference):** `frontend/src/components/ui/M3Card.tsx`
- **Interactive Components:** `frontend/src/features/style-guide/M3ExpressiveComponents.tsx`
- **Custom Matchers:** `frontend/tests/utils/m3-parametric-matchers.ts`

### Tools
- **Validation:** `./scripts/validate-m3-compliance.sh`
- **Integration Tests:** `npm run test:e2e -- e2e/m3-expressive-integration.spec.ts`
- **Dev Server:** `npm run dev` → `/style-guide`

---

## 🎉 Quick Wins

These can be done immediately for visible impact:

1. **Integrate StyleGuide M3 Expressive tab** (15 min)
   - Follow `INTEGRATION_GUIDE.tsx`
   - Demo to team

2. **Add CI/CD validation** (20 min)
   - Add GitHub Actions workflow
   - Test with dummy PR

3. **Use M3Card in one page** (30 min)
   - Replace existing card with M3Card
   - Test parametric morphing
   - Show to stakeholders

---

**Ready to Execute!** 🚀

Start with the **Team Review & Planning** section, then proceed through the checklist systematically.

---

**Last Updated:** 2026-01-08  
**Status:** Phase 6 Complete - Ready for Rollout
