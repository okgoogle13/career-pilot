# SKILL: Universal Design Integrity Check
**Version:** 1.0  
**Triggers:** "Audit this file", "Check consistency", "Validate docs", "Integrity check"  
**Supported Formats:** `.md`, `.json`, `.tsx`, `.ts`, `.css`

---

## PURPOSE
This skill prevents **Documentation Drift** — the #1 reason Design Systems fail. It ensures that:
- **Documentation** describes the current system (v5.0), not outdated versions.
- **Code** implements the design spec, not generic patterns.
- **Configuration** matches the canonical token values exactly.

If your code is v5.0 but your docs describe v4.0, AI agents will get confused and generate old code again. This validator is the **enforcement arm** of your design constitution.

---

## 1. THE CORE TRUTH (The Constitution)
*The Agent must reference these values as absolute law when checking ANY file.*

### **Version:** 5.0 (Tech-Organic / Electric Alchemist)

### **Typography (The Eucalypt System)**
- **Display:** `Recursive` (The Vine) — *Hero Moments*
  - **Axes:** `CASL` 1, `CRSV` 1, `slnt` -15 for organic flow
- **Headline:** `Amstelvar` (The Trunk) — *Structural Anchors*
  - **Axes:** `wdth` 125, `wght` 900 for immovable weight
- **Title:** `Fraunces` (The Bloom) — *Editorial Sections*
  - **Axes:** `SOFT` 100, `WONK` 1 for native irregularity
- **Body:** `Roboto Flex` (The Leaf) — *Functional Text*
  - **Axes:** `opsz` 14, `GRAD` 0 (Idle) → 150 (Hover)

### **Color Palette (Native Earth)**
- **Primary:** `#B4D8AE` (Eucalyptus Sage) — *NOT Blue/Purple*
- **Secondary:** `#E09F7D` (Terracotta) — *NOT Orange/Red*
- **Tertiary:** `#F0C419` (Wattle Gold) — *NOT Yellow*
- **Surface:** `#121212` (Deep Charcoal) — *NOT `#000000`*
- **Container:** `#1E1E1E` (Tech Dark) — *NOT `#121212` or Glass/Blur*

### **Shapes (Component Morphology)**
- **Tech Card:** `rounded-3xl` (24px) — Symmetric, *NOT asymmetric leaves*
- **Pebble:** `rounded-pebble` (20px 20px 32px 32px) — *NOT `rounded-lg` or `8px`*
- **Pill:** `rounded-full` — For status/navigation only

### **Assets (Native Flora)**
- `native-group.png` — Dashboard hero, bottom-right
- `native-gum-hanging.png` — Top-right ceiling anchor
- `native-waratah-hanging.png` — Page header anchor
- `native-bottlebrush.png` — Action button accent

### **Forbidden Patterns (Anti-Slop Protocol)**
❌ Glassmorphism / Blur effects on data cards  
❌ Font weights 400-700 for headlines (must be 900 or 200)  
❌ Default Blue/Purple colors  
❌ Generic utility classes (`bg-gray-800`, `rounded-lg`)  
❌ Hardcoded pixel values (`w-[300px]`)  
❌ Old asset names (`image_3.jpg`, `photo.png`)

---

## 2. VALIDATION LOGIC BY FILE TYPE

### 📄 **Mode A: Documentation Validator (`.md`)**
**Goal:** Ensure documentation describes the *current* system, not the *old* one.

#### **Search for "Dead Words" (Failures):**
1. **Outdated Aesthetics:**
   - "Glassmorphism" / "Blur" / "Translucent" / "Frosted Glass"
   - "Gradient Text" (We use Split Headers now)
   - "Asymmetric Cards" (We use Symmetric Tech Cards)
   - "Floating" elements without containers

2. **Outdated Typography:**
   - "Plus Jakarta Sans" / "Caveat" (Old Stack)
   - "Static Roboto" / "Inter" (Slop)
   - Missing mention of "Variable Axes" or "Recursive/Amstelvar"

3. **Outdated Colors:**
   - "Purple" / "Blue" as primary colors
   - Hex codes: `#6200EE`, `#3700B3`, `#03DAC6` (Material 2)
   - Generic color names without token references

4. **Outdated Assets:**
   - Generic filenames: `image_3.jpg`, `photo.png`, `hero.svg`
   - Missing `native-*` prefix

#### **Check for "Live Links":**
- Does the doc reference correct component names? (`TechCard`, not `GlassCard`)
- Does it reference correct utility classes? (`.tech-card`, not `.glass-leaf`)
- Does it reference correct asset paths? (`src/assets/images/native-group.png`)

---

### 🎨 **Mode B: Token/Config Validator (`.json`, `.css`)**
**Goal:** Ensure configuration files match the design system source of truth.

#### **Hex Code Audit:**
1. **Exact Match Validation:**
   - `#B4D8AE` (Sage) — Flag `#B4D8AF`, `#B5D8AE`, etc.
   - `#E09F7D` (Terracotta) — Flag `#E09F7C`, `#E19F7D`, etc.
   - `#F0C419` (Wattle) — Flag `#F0C418`, `#F1C419`, etc.
   - `#121212` (Surface) — Flag `#000000`, `#111111`, etc.
   - `#1E1E1E` (Container) — Flag `#1F1F1F`, `#1D1D1D`, etc.

2. **Rogue Color Detection:**
   - Scan for hex codes NOT in the approved palette
   - Flag any `#` followed by 6 hex digits that don't match tokens

#### **Structure Audit:**
- Ensure Tailwind config extends the token schema 1:1
- Verify CSS custom properties match token naming conventions
- Check for orphaned or unused token definitions

---

### ⚛️ **Mode C: Code Validator (`.tsx`, `.ts`)**
**Goal:** Ensure implementation matches the spec (Anti-Slop).

#### **Hardcoded Value Check:**
- ❌ FAIL: `w-[300px]`, `h-[400px]` (Magic numbers)
- ✅ PASS: `w-72`, `max-w-md`, `h-96` (Semantic utilities)
- ❌ FAIL: `rounded-[12px]`
- ✅ PASS: `rounded-3xl`, `rounded-pebble`

#### **Import Check:**
- ❌ FAIL: Importing from `lucide-react` directly in Page files
- ✅ PASS: Using `IconBadge` or `MetricCard` components
- ❌ FAIL: Using `<img>` tags directly
- ✅ PASS: Using `NativeAnchor` or inside `TechCard`

#### **Component Usage Check:**
- ❌ FAIL: Custom card divs with inline styles
- ✅ PASS: `<TechCard>` component usage
- ❌ FAIL: Generic `<h1>` tags
- ✅ PASS: `<SplitHeader>` component usage

#### **Typography Check:**
- ❌ FAIL: `font-semibold`, `font-medium` on headers
- ✅ PASS: `font-black` (900) or `font-thin` (200)
- ❌ FAIL: Missing `font-gum` or `font-vine` classes
- ✅ PASS: Proper font family token usage

#### **Color Check:**
- ❌ FAIL: `bg-blue-500`, `text-purple-600`
- ✅ PASS: `bg-sage`, `text-terracotta`, `bg-wattle`
- ❌ FAIL: Inline hex colors in className
- ✅ PASS: Token-based color utilities

---

## 3. VALIDATION REPORT FORMAT

When performing an integrity check, output a structured report:

```markdown
# 🔍 Integrity Check: [Filename]
**Status:** [✅ PASS / ⚠️ WARNING / ❌ FAIL]
**File Type:** [Documentation / Configuration / Code]
**Checked Against:** Electric Alchemist v5.0 (Tech-Organic)

---

## ❌ Violations (Outdated/Wrong Info)

### Critical (Breaking Changes)
1. **Line 14:** Mentions "Glassmorphism". Current system uses "Solid Tech Cards".
   - **Impact:** AI will generate blurred backgrounds instead of solid `#1E1E1E`.
   - **Fix:** Replace with "Solid dark containers with dot-grid texture".

2. **Line 20:** References `image_3.jpg`. Current asset is `native-group.png`.
   - **Impact:** Broken image references in generated code.
   - **Fix:** Update to `src/assets/images/native-group.png`.

### Warnings (Style Drift)
3. **Line 45:** Defines primary color as `#6200EE`. Current primary is `#B4D8AE`.
   - **Impact:** Purple theme instead of Sage/Terracotta palette.
   - **Fix:** Update color token to `#B4D8AE` (Eucalyptus Sage).

4. **Line 67:** Uses `font-semibold` for header. Current standard is `font-black` (900).
   - **Impact:** Weak typographic hierarchy.
   - **Fix:** Replace with `font-black` or `font-gum-black`.

---

## ✅ Correct Implementations
- Line 8: Correctly uses `TechCard` component
- Line 23: Proper `rounded-3xl` border radius
- Line 34: Correct `bg-terracotta` token usage
- Line 56: Proper `NativeAnchor` asset integration

---

## 📊 Summary
- **Total Lines Checked:** 120
- **Violations Found:** 4 (2 Critical, 2 Warnings)
- **Compliance Score:** 96.7%

---

## 🔧 Recommended Actions
1. **Immediate:** Fix critical violations (Lines 14, 20)
2. **High Priority:** Update color tokens (Line 45)
3. **Medium Priority:** Refactor typography (Line 67)
4. **Optional:** Run full codebase audit to find similar patterns
```

---

## 4. AUTOMATIC FIX MODE

If the user adds **"Fix it"** or **"Auto-fix"** to the prompt:

1. **Create a backup** of the original file (`.bak` extension)
2. **Apply corrections** using the validation report
3. **Re-run validation** to confirm fixes
4. **Report changes** made

**Example:**
```markdown
# 🔧 Auto-Fix Applied: design-system.md

## Changes Made:
1. Line 14: "Glassmorphism" → "Solid Tech Cards"
2. Line 20: `image_3.jpg` → `native-group.png`
3. Line 45: `#6200EE` → `#B4D8AE`
4. Line 67: `font-semibold` → `font-black`

## Verification:
✅ Re-validated: PASS (100% compliance)
✅ Backup created: design-system.md.bak
```

---

## 5. USAGE EXAMPLES

### **Example 1: Validate Documentation**
**User:** "Validate `docs/design-system.md`"

**AI Response:**
```
❌ FAIL. Found 3 violations:
- Line 4: References "Roboto Flex". Updated system uses "Plus Jakarta Sans".
- Line 10: References "rounded-leaf" for cards. Updated system uses "rounded-3xl".
- Line 28: Missing asset prefix. Should be "native-group.png", not "group.png".
```

---

### **Example 2: Validate Component Code**
**User:** "Validate `src/components/Dashboard.tsx`"

**AI Response:**
```
✅ PASS. Component correctly uses:
- `<TechCard>` for containers
- `<SplitHeader>` for typography
- `bg-terracotta` token for buttons
- `native-group.png` asset reference
```

---

### **Example 3: Validate with Auto-Fix**
**User:** "Validate `src/pages/Analysis.tsx` and fix it"

**AI Response:**
```
⚠️ WARNING. Found 2 style drift issues:
- Line 12: Uses `rounded-lg` instead of `rounded-3xl`
- Line 34: Uses `font-semibold` instead of `font-black`

🔧 Auto-fixing...
✅ Fixed. Changes applied:
- Line 12: `rounded-lg` → `rounded-3xl`
- Line 34: `font-semibold` → `font-black`

Re-validated: ✅ PASS
```

---

## 6. INTEGRATION WITH OTHER SKILLS

This skill works in tandem with:
- **`m3-anti-slop-validator.md`** — For component-level validation
- **`m3-expressive-typography-enhancer.md`** — For typography-specific checks
- **`m3-expressive-shape-validator.md`** — For shape/geometry validation

**Workflow:**
1. Use **Universal Design Integrity** for file-level audits
2. Use **M3 Anti-Slop** for component refactoring
3. Use **Typography Enhancer** for font weight/contrast fixes

---

## 7. CONTINUOUS VALIDATION

### **Pre-Commit Hook (Recommended)**
Run this validator before every commit to catch drift early:

```bash
# .git/hooks/pre-commit
antigravity validate --all-docs
antigravity validate --all-components
```

### **CI/CD Integration**
Add to your GitHub Actions workflow:

```yaml
- name: Design System Integrity Check
  run: antigravity validate --strict --fail-on-warning
```

---

## 8. SKILL ACTIVATION PROTOCOL

When the user provides a file and asks to **"Validate"**, **"Check"**, or **"Audit"** it:

### **Step 1: Detect File Type**
- If `.md` → Run **Documentation Validator**
- If `.tsx` / `.ts` → Run **Code Validator**
- If `.json` / `.css` → Run **Token/Config Validator**

### **Step 2: Compare Against Truth**
- Load the canonical values from Section 1 (The Constitution)
- Scan the file for violations using the appropriate mode logic

### **Step 3: Generate Report**
- Use the structured format from Section 3
- Include line numbers, violation descriptions, and fixes

### **Step 4: Offer Auto-Fix (Optional)**
- If user says "Fix it", apply corrections automatically
- Create backup and re-validate

---

## 9. ADVANCED FEATURES

### **Batch Validation**
**User:** "Validate all markdown files in `docs/`"

**AI:** Runs validator on all `.md` files, generates summary report:
```
📊 Batch Validation Report: docs/

✅ PASS (3 files):
- design-system.md
- components.md
- workflows.md

❌ FAIL (2 files):
- old-guidelines.md (5 violations)
- legacy-tokens.md (8 violations)

⚠️ WARNING (1 file):
- README.md (2 style drift issues)
```

### **Diff Mode**
**User:** "Compare `design-system.md` against v4.0"

**AI:** Shows what changed between versions, highlights breaking changes.

### **Compliance Score**
Track design system adherence over time:
```
📈 Compliance Trend:
- v4.0 → v5.0: 78% → 96%
- Files fixed: 12
- Violations remaining: 3
```

---

## 10. EMERGENCY OVERRIDE

If a violation is **intentional** (e.g., documenting legacy behavior), add a comment:

```markdown
<!-- INTEGRITY_OVERRIDE: Documenting v4.0 for migration guide -->
This section describes the old Glassmorphism approach...
```

The validator will skip flagged sections.

---

## FINAL NOTES

This skill is the **guardian** of your design system. It prevents:
- 🚫 Documentation describing old versions
- 🚫 Code implementing deprecated patterns
- 🚫 Configs drifting from the source of truth

**Remember:** If your docs lie, your AI will too. Keep them honest.
