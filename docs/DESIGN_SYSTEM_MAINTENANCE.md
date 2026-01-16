# Design System Maintenance Notes

**Last Updated:** 2026-01-08T16:53:37+11:00

## When to Update This Document

### Token Changes
- **Trigger**: Modifying `frontend/src/theme/design-tokens.css`
- **Action**: Update the Constitutional Token Values (Section 1.1-1.3)
- **Also Update**: `design-system/tokens.json`, `tailwind.config.ts`

### New Shape Archetypes
- **Trigger**: Introducing new border-radius patterns
- **Action**: Add to Shape DNA table (Section 1.1)
- **Requirements**: Must follow asymmetric organic philosophy, document all 4 corner values

### Motion System Updates
- **Trigger**: Changing Framer Motion spring configs or adding new motion patterns
- **Action**: Update Physics Table 2.1 (Section 2.1) and React patterns (Section 2.2)
- **Validation**: Ensure Damping Formula still applies

### Agent Protocol Additions
- **Trigger**: Discovering new anti-patterns or establishing new best practices
- **Action**: Add to Agent Behavior Protocol (Section 4)
- **Format**: Follow existing ✅/❌ forbidden/allowed structure

## Automated Maintenance Checklist

When making design system changes:

- [ ] Update `Last Updated` timestamp in docs/design-system.md
- [ ] Sync tokens.json with design-tokens.css
- [ ] Run M3 Audit on StyleGuide.tsx to verify compliance
- [ ] Update this maintenance log
- [ ] If physics changed: Validate Playwright test wait times (400ms still sufficient?)
- [ ] If shapes changed: Update Living Style Guide component examples

## Version History

### v2.0.0 (2026-01-08)
- **Major**: Consolidated 4 design docs into unified System Context
- **Changes**: 
  - Updated tokens.json from Electric Indigo → Sage/Coral/Lavender
  - Archived legacy design docs to docs/archive/design-legacy/
  - Added comprehensive Physics Engine formulas
  - Established 18 Agent Behavior Rules

### v1.0.0 (Previous)
- Initial Electric Alchemist framework
- M3 Expressive adoption
- Living Style Guide creation
