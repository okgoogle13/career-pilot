# NORTHCOTE CURIO DESIGN SYSTEM LINTING

## 📦 Installation

### 1. Install Dependencies

```bash
npm install --save-dev \
  eslint \
  prettier \
  prettier-plugin-tailwindcss \
  @trivago/prettier-plugin-sort-imports \
  glob
```

### 2. Install ESLint Plugins (Custom)

The custom Northcote ESLint plugin rules are defined in `.eslintrc.northcote.js`. To enable them, you'll need to create a custom ESLint plugin:

```bash
mkdir -p eslint-plugin-northcote-design-system
cd eslint-plugin-northcote-design-system
npm init -y
```

Create `index.js` in that directory with the rule implementations (see below).

### 3. Add Scripts to package.json

Add these scripts to your `frontend/package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:northcote": "node northcote-lint.config.js",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "design-system:audit": "npm run lint:northcote && npm run format:check"
  }
}
```

## 🚀 Usage

### Run All Linting Checks

```bash
npm run design-system:audit
```

### Run Individual Checks

```bash
# ESLint (design system constraints)
npm run lint

# Custom Northcote linter (component structure, Storybook, tests)
npm run lint:northcote

# Prettier (code formatting)
npm run format:check
```

### Auto-Fix Issues

```bash
# Fix ESLint issues
npm run lint:fix

# Fix Prettier formatting
npm run format
```

## 📋 What Gets Checked

### ESLint Rules (.eslintrc.northcote.js)

1. **Border Radius**: Only `rounded-pebble`, `rounded-stone`, `rounded-leaf`, `rounded-seed`, `rounded-sentry`
2. **Colors**: Only Northcote palette colors (no `#000000`, `#FFFFFF`, `bg-white`, `bg-black`)
3. **Fonts**: Only `font-proclamation`, `font-bloom`, `font-field-note`, `font-annotation`
4. **Shadows**: Only `shadow-subtle`, `shadow-standard`, `shadow-elevated`, `shadow-maximum`
5. **Easing**: Only `ease-viscous-breeze`, `ease-reveal`, `ease-snap`
6. **Duration**: Only `duration-fast` (150ms), `duration-standard` (300ms), `duration-slow` (600ms)
7. **Spacing**: Prefer `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`
8. **Fraunces Axes**: Interactive components with `font-bloom` should have `font-wonk-*` on hover
9. **Mode Consistency**: Laboratory mode cannot use `font-bloom`
10. **Accessibility**: Interactive elements must have `aria-*` or `role` attributes

### Custom Linter (northcote-lint.config.js)

1. **Component Structure**: Proper import ordering, default export
2. **Bloom Effects**: Interactive components have hover shadow + transform
3. **Mode Separation**: Gallery vs Laboratory mode compliance
4. **Touch Feedback**: Stone cards have `active:scale-[0.98]`
5. **Accessibility**: All interactive elements have proper attributes
6. **Storybook Coverage**: Every component has a `.stories.tsx` file
7. **Test Coverage**: Every component has a `.test.tsx` file

### Prettier (.prettierrc.northcote.js)

1. **Tailwind Class Ordering**: Automatic sorting of className attributes
2. **Import Ordering**: React → Libraries → Components → Utils → Types → Theme
3. **Consistent Formatting**: Semi-colons, single quotes, 2-space tabs

## 🔧 Configuration

### Enable/Disable Specific Checks

Edit `northcote-lint.config.js`:

```javascript
const config = {
  checks: {
    componentStructure: true,
    bloomEffects: true,
    modeSeparation: true,
    touchFeedback: true,
    accessibility: true,
    storybookCoverage: false, // Disable this check
    testCoverage: false,      // Disable this check
  },
};
```

### Adjust Severity Levels

```javascript
const config = {
  severity: {
    componentStructure: 'error',  // Blocks build
    bloomEffects: 'warn',         // Shows warning only
    accessibility: 'error',       // Blocks build
  },
};
```

## 📖 Understanding Violations

### Example: Border Radius Violation

**Error:**
```
❌ Use Northcote archetype radius classes (rounded-pebble, rounded-stone, rounded-leaf, rounded-seed, rounded-sentry).
   File: src/components/ui/Card.tsx
   Fix: Replace rounded-lg with rounded-stone
   Docs: See DOC-001 Section 3.2: Organic Asymmetry
```

**Before:**
```tsx
<div className="rounded-lg bg-surface p-4">
```

**After:**
```tsx
<div className="rounded-stone bg-eucalypt-smoke p-lg">
```

### Example: Bloom Effect Missing

**Warning:**
```
⚠️  Interactive component missing Bloom effect (hover shadow + transform)
   File: src/components/ui/Button.tsx
   Fix: Add hover:shadow-elevated hover:translate-y-[-2px] transition-all duration-standard ease-viscous-breeze
   Docs: See DOC-001 Section 6: Viscous Breeze Physics
```

**Before:**
```tsx
<button className="bg-wattle-gold text-specimen-night rounded-pebble px-lg py-md">
  Click me
</button>
```

**After:**
```tsx
<button className="
  bg-wattle-gold text-specimen-night rounded-pebble px-lg py-md
  shadow-standard hover:shadow-elevated
  hover:translate-y-[-2px]
  transition-all duration-standard ease-viscous-breeze
">
  Click me
</button>
```

## 🎯 CI/CD Integration

Add to your `.github/workflows/ci.yml`:

```yaml
- name: Run Design System Audit
  run: |
    cd frontend
    npm run design-system:audit
```

This will block PRs that violate design system constraints.

## 📚 Documentation References

- **DOC-001**: Design System Specification
- **DOC-002**: Component Architecture
- **DOC-006**: Voice and Microcopy
- **WCAG 2.1 AA**: Accessibility Standards

## ❓ FAQ

### Q: Can I disable a rule for a specific line?

Yes, use ESLint disable comments:

```tsx
// eslint-disable-next-line northcote-design-system/enforce-radius-archetypes
<div className="rounded-full">
```

### Q: What if I need a custom color for a specific use case?

Add it to `tailwind.config.js` under the appropriate botanical family (wattle, waratah, eucalypt, flannel). Don't use hardcoded hex values.

### Q: How do I add a new archetype radius?

1. Add it to `tailwind.config.js` under `borderRadius`
2. Add it to the `allowedClasses` array in `.eslintrc.northcote.js`
3. Document it in DOC-001

## 🚨 Troubleshooting

### "Module not found: eslint-plugin-northcote-design-system"

You need to create the custom ESLint plugin. See Installation step 2.

### "Prettier plugin not found"

Run:
```bash
npm install --save-dev prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
```

### "Too many violations, can't fix them all"

Start with errors first, then tackle warnings. Use:
```bash
npm run lint:fix
npm run format
```

This will auto-fix many issues.
