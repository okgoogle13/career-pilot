# M3 Expressive Component Audit Report

**Date:** 2026-01-08  
**Phase:** 6 - Full Rollout & QA  
**Status:** Component Audit Complete

---

## Executive Summary

Comprehensive audit of all components in the codebase for M3 Expressive compliance. This report identifies components that need refactoring to align with M3 Expressive design principles.

---

## Validation Results

### ✅ Core M3Card Component
**Status:** **FULLY COMPLIANT**

- ✅ No generic Tailwind rounding classes
- ✅ Uses framer-motion with spring physics
- ✅ Correct physics constants (stiffness: 500, damping: 27)
- ✅ Path-based shapes via clip-path
- ✅ Component tokens architecture
- ✅ Parametric typography with Anti-Slop Rule

---

## Components Requiring Refactoring

### 1. M3Button Component
**File:** `frontend/src/components/ui/M3Button.tsx`  
**Violations Found:** 3 instances of `rounded-full`

**Issues:**
- Line 61: Documentation mentions `rounded-full` token (should reference shape token)
- Line 111: Uses `rounded-full` in className
- Line 299: Additional `rounded-full` usage

**Recommended Fix:**
```tsx
// Current (WRONG):
className="rounded-full font-medium"

// Should be (CORRECT):
<motion.button
  style={{ clipPath: 'var(--md-ref-shape-gem)' }}
  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
>
```

**Priority:** HIGH (Buttons are primary interaction elements)

---

### 2. M3Checkbox Component
**File:** `frontend/src/components/ui/M3Checkbox.tsx`  
**Violations Found:** 3 instances of `rounded-full`

**Issues:**
- Lines 192, 211, 222: Multiple `rounded-full` usages for checkbox indicators

**Recommended Fix:**
For small UI elements like checkboxes, `rounded-full` may be acceptable for functional reasons.
However, for M3 Expressive compliance, consider:
```tsx
// Option 1: Use Gem shape (sharp, highlight)
style={{ clipPath: 'var(--md-ref-shape-gem)', transform: 'scale(0.5)' }}

// Option 2: Keep rounded-full but document exception
// Add comment: "Exception: Functional checkbox requires perfect circle"
```

**Priority:** MEDIUM (Functional element, perfect circle acceptable)

---

### 3. IconBadge Component  
**File:** `frontend/src/components/shared/IconBadge.tsx`  
**Violations Found:** 1 instance of `rounded-full`

**Issues:**
- Line 34: Uses `rounded-full` for icon container

**Recommended Fix:**
```tsx
// Current:
<div className="rounded-full flex items-center justify-center">

// Recommended:
<motion.div
  className="flex items-center justify-center"
  style={{ clipPath: 'var(--md-ref-shape-gem)' }}
  whileHover={{ scale: 1.1 }}
  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
>
```

**Priority:** MEDIUM (Badge is a highlight element - Gem shape appropriate)

---

### 4. MetricCard Component
**File:** `frontend/src/components/shared/MetricCard.tsx`  
**Violations Found:** 1 instance of `rounded-full`

**Issues:**
- Line 53: Icon container uses `rounded-full`

**Recommended Fix:**
```tsx
// Current:
<div className="w-10 h-10 bg-surface-container-high rounded-full">

// Recommended:
<div 
  className="w-10 h-10 bg-surface-container-high"
  style={{ clipPath: 'var(--md-ref-shape-gem)' }}
>
```

**Priority:** MEDIUM

---

### 5. ApplicationCard Component
**File:** `frontend/src/components/shared/ApplicationCard.tsx`  
**Violations Found:** 1 instance of `rounded-full`

**Issues:**
- Line 86: Tab/button uses `rounded-full`

**Recommended Fix:**
```tsx
// For tabs, use Pebble shape:
<motion.button
  style={{ clipPath: 'var(--md-ref-shape-pebble)' }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
>
```

**Priority:** HIGH (Interactive element)

---

### 6. M3Card.stories.tsx
**File:** `frontend/src/components/ui/M3Card.stories.tsx`  
**Violations Found:** 1 instance of `rounded-full`

**Issues:**
- Line 61: Story example uses `rounded-full` for avatar

**Recommended Fix:**
```tsx
// Update story example to use M3 Expressive pattern:
icon={
  <div 
    className="w-10 h-10 bg-primary/20 flex items-center justify-center"
    style={{ clipPath: 'var(--md-ref-shape-gem)' }}
  >
    <User className="text-primary" />
  </div>
}
```

**Priority:** LOW (Documentation/example only)

---

## Summary Statistics

### Total Components Scanned
- **M3 Components:** 5 files
- **Shared Components:** 3 files
- **Stories/Examples:** 1 file

### Violations by Category

| Category | Count | Priority |
|----------|-------|----------|
| Buttons | 3 | HIGH |
| Icons/Badges | 2 | MEDIUM |
| Checkboxes | 3 | MEDIUM |
| Application UI | 1 | HIGH |
| Stories | 1 | LOW |
| **TOTAL** | **10** | - |

### Compliance Status

| Component | Status | Action Required |
|-----------|--------|-----------------|
| M3Card | ✅ COMPLIANT | None |
| M3Button | ❌ NON-COMPLIANT | Refactor required |
| M3Checkbox | ⚠️ PARTIAL | Document exception or refactor |
| IconBadge | ❌ NON-COMPLIANT | Use Gem shape |
| MetricCard | ❌ NON-COMPLIANT | Use Gem shape |
| ApplicationCard | ❌ NON-COMPLIANT | Use Pebble shape |

---

## Recommended Refactoring Priority

### High Priority (User-facing interactions)
1. **M3Button** - Primary CTA component
2. **ApplicationCard** - Tab/navigation component

### Medium Priority (Visual elements)
3. **IconBadge** - Highlight component
4. **MetricCard** - Data display component  
5. **M3Checkbox** - Form element (consider functional exception)

### Low Priority (Documentation)
6. **M3Card.stories.tsx** - Update examples

---

## Migration Strategy

### Approach 1: Big Bang (Recommended for Small Scope)
- Refactor all 6 components in single PR
- Run full test suite
- Deploy together

**Timeline:** 1-2 days  
**Risk:** Medium  
**Benefit:** Clean, consistent codebase

### Approach 2: Gradual (Recommended for Production)
- **Week 1:** M3Button, ApplicationCard (High priority)
- **Week 2:** IconBadge, MetricCard (Medium priority)
- **Week 3:** M3Checkbox, Stories (Low priority)

**Timeline:** 3 weeks  
**Risk:** Low  
**Benefit:** Stable incremental rollout

### Approach 3: Feature Flag
- Implement both old and new versions
- Use `ENABLE_M3_EXPRESSIVE` flag
- Gradual user rollout (A/B testing)

**Timeline:** 2 weeks + monitoring  
**Risk:** Low  
**Benefit:** Easy rollback

---

## Testing Checklist

### Before Refactoring
- [ ] Create feature branch: `feature/m3-expressive-rollout`
- [ ] Backup current component implementations
- [ ] Document current behavior with screenshots

### During Refactoring
- [ ] Update component implementation
- [ ] Add framer-motion dependencies
- [ ] Update Storybook stories
- [ ] Run unit tests
- [ ] Update TypeScript types if needed

### After Refactoring
- [ ] Run `./scripts/validate-m3-compliance.sh`
- [ ] Run Playwright visual regression tests
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile viewports
- [ ] Verify performance (no layout shifts, smooth animations)
- [ ] Update component documentation

---

## Next Steps

1. **Choose Migration Strategy** (Recommend: Approach 2 - Gradual)
2. **Create Refactoring Tasks:**
   - Task 1: Refactor M3Button component
   - Task 2: Refactor ApplicationCard component
   - Task 3: Refactor Badge components (IconBadge, MetricCard)
   - Task 4: Review M3Checkbox (functional exception?)
   - Task 5: Update Stories
3. **Run Integration Tests:**
   ```bash
   cd frontend && npm run test:e2e -- e2e/m3-expressive-integration.spec.ts
   ```
4. **Generate Visual Regression Baseline:**
   ```bash
   npm run test:e2e -- --update-snapshots
   ```
5. **Deploy to Staging** for QA validation

---

## Automation Opportunities

### Pre-commit Hook
Add to `.husky/pre-commit`:
```bash
# Validate M3 Expressive compliance
./scripts/validate-m3-compliance.sh || {
  echo "❌ M3 Expressive violations detected!"
  echo "Run './scripts/validate-m3-compliance.sh' for details"
  exit 1
}
```

### CI/CD Pipeline
Add to GitHub Actions workflow:
```yaml
- name: M3 Expressive Validation
  run: |
    chmod +x ./scripts/validate-m3-compliance.sh
    ./scripts/validate-m3-compliance.sh
    
- name: M3 Integration Tests
  run: |
    cd frontend
    npm run test:e2e -- e2e/m3-expressive-integration.spec.ts
```

---

## Resources

- **Migration Guide:** `docs/m3-expressive-guide.md`
- **Validation Script:** `./scripts/validate-m3-compliance.sh`
- **Custom Matchers:** `frontend/tests/utils/m3-parametric-matchers.ts`
- **Interactive Lab:** `/style-guide` → "M3 EXPRESSIVE" tab
- **Skill File:** `.antigravity/skills/m3-expressive-validator.md`

---

## Conclusion

The M3Card component serves as the **gold standard** for M3 Expressive implementation. All other components should follow its pattern:

1. ✅ Path-based shapes (`clip-path`)
2. ✅ Spring physics (stiffness: 500, damping: 27)
3. ✅ Component tokens (3-tier hierarchy)
4. ✅ Parametric typography (Anti-Slop Rule)
5. ✅ Framer Motion for animations

**Total Effort Estimate:** 2-3 weeks for full migration  
**Recommended Start Date:** Immediate (High-priority components)  
**Target Completion:** End of January 2026

---

**Prepared by:** Antigravity AI  
**Project:** CareerCopilot M3 Expressive Migration  
**Phase 6:** Full Rollout & QA
