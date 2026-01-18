# M3 Anti-Slop Validator

**Purpose:** Detect and prevent generic "AI slop" aesthetics (Inter, Roboto, purple gradients, flat layouts, predictable patterns).

**Input:** Component file path + design tokens + aesthetic preferences
**Output:** Validation report with aesthetic quality score and remediation recommendations

---

## Overview

This skill enforces M3 Expressive aesthetic standards by:

1. **Detecting Generic Fonts** - Flag static Inter, Roboto, Arial (allow **Roboto Flex** ONLY if parametric axes are active)
2. **Identifying Clichéd Colors** - Detect purple gradients on white, timid palettes, boring color schemes
3. **Spotting Flat Layouts** - Find solid backgrounds, lack of depth, no layering
4. **Flagging Predictable Patterns** - Generic component arrangements, cookie-cutter designs, centered SaaS headers
5. **Scoring Aesthetic Quality** - Overall creativity, "hero moment" impact, and distinctiveness rating (0-100)
6. **Enforcing Playful Irregularity** - Reward asymmetry, overlapping elements, and parametric typography

---

## Anti-Slop Detection Rules

### 1. Generic Fonts (Forbidden List)

**Forbidden Fonts (Without Distinctive Pairing):**

- ❌ **Inter** (static/default) - *Use Roboto Flex or Recursive*
- ❌ **Plus Jakarta Sans** (deprecated) - *Use the Eucalypt Stack*
- ❌ **Roboto** (static/corporate) - *Exception: Roboto Flex is allowed IF variable axes are used*
- ❌ **Open Sans** (generic, dated)
- ❌ **Arial** (legacy, no personality)
- ❌ **Helvetica** (bland, overused)
- ❌ **Lato** (clichéd)
- ❌ **System fonts** (-apple-system, BlinkMacSystemFont, etc.)
- ❌ **Segoe UI** (Windows default)

**Detection Logic:**

```typescript
interface FontViolation {
  fontFamily: string;
  severity: "critical" | "warning";
  location: string;
  suggestion: string;
}

function detectGenericFonts(code: string): FontViolation[] {
  const violations: FontViolation[] = [];

  const forbiddenFonts = [
    { name: "Inter", severity: "critical" as const, alternative: "Roboto Flex Variable" },
    { name: "Plus Jakarta Sans", severity: "critical" as const, alternative: "Amstelvar / Recursive" },
    { name: "Roboto", severity: "critical" as const, alternative: "Roboto Flex (with axes)" },
    { name: "Open Sans", severity: "critical" as const, alternative: "Fraunces" },
    { name: "Arial", severity: "critical" as const, alternative: "Amstelvar" },
    { name: "Helvetica", severity: "critical" as const, alternative: "Amstelvar" },
    { name: "Lato", severity: "warning" as const, alternative: "Roboto Flex" },
    { name: "-apple-system", severity: "critical" as const, alternative: "Roboto Flex Variable" },
    { name: "BlinkMacSystemFont", severity: "critical" as const, alternative: "Roboto Flex Variable" },
    { name: "system-ui", severity: "critical" as const, alternative: "Roboto Flex Variable" },
    { name: "Segoe UI", severity: "critical" as const, alternative: "Poppins" },
  ];

  forbiddenFonts.forEach(({ name, severity, alternative }) => {
    const regex = new RegExp(`fontFamily:\\s*['"]([^'"]*${name}[^'"]*)['"]`, "gi");
    const matches = code.matchAll(regex);

    for (const match of matches) {
      // Allow Roboto Flex if it is explicitly named, otherwise flag Roboto
      if (name === "Roboto" && code.includes("Roboto Flex")) continue;

      // Check if there's a distinctive display font elsewhere
      const hasDistinctiveDisplay = hasDistinctiveDisplayFont(code);

      if (!hasDistinctiveDisplay || match[1].toLowerCase() === name.toLowerCase()) {
        violations.push({
          fontFamily: match[1],
          severity,
          location: `Line ${getLineNumber(code, match.index)}`,
          suggestion: `Replace '${name}' with '${alternative}' for a more distinctive, expressive aesthetic.`,
        });
      }
    }
  });

  return violations;
}

function hasDistinctiveDisplayFont(code: string): boolean {
  const distinctiveFonts = ["Amstelvar", "Recursive", "Fraunces", "Roboto Flex", "JetBrains Mono"];

  return distinctiveFonts.some((font) => code.toLowerCase().includes(font.toLowerCase()));
}
```

---

### 2. Clichéd Colors (Purple Gradient Syndrome)

**Forbidden Color Patterns:**

- ❌ **Purple gradient on white** (#7C4DFF → #9C27B0 on #FFFFFF)
- ❌ **Generic blue** (#2196F3, #1976D2 - Material Blue)
- ❌ **Timid palettes** (all colors < 20% saturation)
- ❌ **Evenly distributed colors** (no dominant color, 5+ colors with equal weight)

**Detection Logic:**

```typescript
interface ColorViolation {
  pattern: string;
  severity: "critical" | "warning";
  colors: string[];
  suggestion: string;
}

function detectClichedColors(tokens: DesignTokens): ColorViolation[] {
  const violations: ColorViolation[] = [];

  // Check for purple gradient on white
  if (isPurpleGradient(tokens.color.primary, tokens.color.secondary) && isWhiteish(tokens.color.surface)) {
    violations.push({
      pattern: "Purple gradient on white",
      severity: "critical",
      colors: [tokens.color.primary, tokens.color.secondary, tokens.color.surface],
      suggestion: "Use Native Earth palette (Sage #B4D8AE, Terracotta #E09F7D, Wattle #F0C419). Avoid clichéd purple gradients.",
    });
  }

  // Check for generic Material Blue
  if (isGenericBlue(tokens.color.primary)) {
    violations.push({
      pattern: "Generic Material Blue",
      severity: "warning",
      colors: [tokens.color.primary],
      suggestion: "Use distinctive Native Earth colors like Sage (#B4D8AE) or Terracotta (#E09F7D).",
    });
  }

  // Check for timid saturation
  const averageSaturation = calculateAverageSaturation(tokens.color);
  if (averageSaturation < 20) {
    violations.push({
      pattern: "Timid, desaturated palette",
      severity: "warning",
      colors: Object.values(tokens.color),
      suggestion: "Increase color saturation for M3 Expressive. Use vibrant, emotionally impactful colors (40-80% saturation).",
    });
  }

  // Check for evenly distributed colors (no dominant color)
  if (hasEvenlyDistributedColors(tokens.color)) {
    violations.push({
      pattern: "No dominant color (evenly distributed)",
      severity: "warning",
      colors: Object.values(tokens.color),
      suggestion: "Commit to a cohesive aesthetic with dominant colors and sharp accents (not evenly distributed).",
    });
  }

  return violations;
}

function isPurpleGradient(color1: string, color2: string): boolean {
  const purple1 = parseColor(color1);
  const purple2 = parseColor(color2);

  // Check if both colors are in purple hue range (270-330 degrees)
  return purple1.hue >= 270 && purple1.hue <= 330 && purple2.hue >= 270 && purple2.hue <= 330;
}

function isGenericBlue(color: string): boolean {
  const genericBlues = ["#2196F3", "#1976D2", "#1E88E5", "#42A5F5"];
  return genericBlues.some((blue) => color.toUpperCase() === blue.toUpperCase());
}

function calculateAverageSaturation(colorPalette: Record<string, string>): number {
  const saturations = Object.values(colorPalette).map((color) => {
    const hsl = parseColorToHSL(color);
    return hsl.saturation;
  });

  return saturations.reduce((sum, s) => sum + s, 0) / saturations.length;
}
```

---

### 3. Flat Layouts (No Depth)

**Forbidden Layout Patterns:**

- ❌ **Solid background colors** (no gradients, no patterns)
- ❌ **No elevation** (all elements at same z-level)
- ❌ **No layering** (single-layer components)
- ❌ **Uniform spacing** (all gaps identical, no rhythm)

**Detection Logic:**

```typescript
interface LayoutViolation {
  pattern: string;
  severity: "critical" | "warning";
  location: string;
  suggestion: string;
}

function detectFlatLayouts(code: string, tokens: DesignTokens): LayoutViolation[] {
  const violations: LayoutViolation[] = [];

  // Check for solid backgrounds (no gradients)
  if (hasSolidBackgrounds(code) && !hasLayeredBackgrounds(code)) {
    violations.push({
      pattern: "Solid background (no gradients or patterns)",
      severity: "critical",
      location: "Background styling",
      suggestion: "Use layered gradients, geometric patterns, or atmospheric effects for depth. See m3-atmospheric-backgrounds skill.",
    });
  }

  // Check for lack of elevation
  if (!usesElevationTokens(code, tokens)) {
    violations.push({
      pattern: "No elevation tokens (flat surfaces)",
      severity: "warning",
      location: "Component styling",
      suggestion: "Apply elevation tokens (var(--sys-elevation-level2)) for depth and visual hierarchy.",
    });
  }

  // Check for uniform spacing (no rhythm)
  if (hasUniformSpacing(code)) {
    violations.push({
      pattern: "Uniform spacing (no visual rhythm)",
      severity: "warning",
      location: "Spacing/layout",
      suggestion: "Use varied spacing scales for rhythm (e.g., 8px, 16px, 24px, 40px - not all 16px).",
    });
  }

  return violations;
}

function hasSolidBackgrounds(code: string): boolean {
  const solidBgRegex = /background(-color)?:\s*['"]?(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|var\(--[^)]+\))['"]?/g;
  const gradientRegex = /background(-image)?:\s*['"]?(linear-gradient|radial-gradient)/g;

  const solidMatches = code.match(solidBgRegex) || [];
  const gradientMatches = code.match(gradientRegex) || [];

  return solidMatches.length > 0 && gradientMatches.length === 0;
}

function hasLayeredBackgrounds(code: string): boolean {
  // Check for comma-separated background layers
  const layeredBgRegex = /background:\s*[^;{]+,\s*[^;{]+/g;
  return layeredBgRegex.test(code);
}

function usesElevationTokens(code: string, tokens: DesignTokens): boolean {
  const elevationTokenRegex = /var\(--sys-elevation-level[0-5]\)/g;
  return elevationTokenRegex.test(code);
}

function hasUniformSpacing(code: string): boolean {
  // Extract all spacing values
  const spacingRegex = /(padding|margin|gap):\s*['"]?(\d+)(px)?['"]?/g;
  const spacingValues = new Set<number>();

  let match;
  while ((match = spacingRegex.exec(code)) !== null) {
    spacingValues.add(parseInt(match[2], 10));
  }

  // If only 1-2 unique spacing values, it's too uniform
  return spacingValues.size <= 2;
}
```

---

### 4. Predictable Patterns (Cookie-Cutter Designs)

**Forbidden Design Patterns:**

- ❌ **Same font family for display and body** (Roboto/Roboto)
- ❌ **Timid weight contrasts** (400 vs 500 - ratio < 1.5x)
- ❌ **Timid size contrasts** (24px vs 16px - ratio < 2x)
- ❌ **No hover states** (static components, no micro-interactions)
- ❌ **Generic button styles** (flat, no depth, no spring motion)

**Detection Logic:**

```typescript
interface PatternViolation {
  pattern: string;
  severity: "critical" | "warning";
  suggestion: string;
}

function detectPredictablePatterns(code: string, tokens: DesignTokens): PatternViolation[] {
  const violations: PatternViolation[] = [];

  // Check for "SaaS Slop" (Centered H1 + Subtext)
  if (detectSaalSlopStructure(code)) {
    violations.push({
      pattern: "SaaS Slop Layout (Centered H1 + Subtext)",
      severity: "critical",
      suggestion: "Avoid generic centered hero sections. Use asymmetric layouts, split headers, or overlap for editorial impact.",
    });
  }

  // Check for "Grid Rigidity" (No negative margins or breaking out)
  if (isGridRigid(code)) {
    violations.push({
      pattern: "Grid Rigidity (No irregularity)",
      severity: "warning",
      suggestion: "Inject playfulness! Use negative margins, rotation (transform: rotate), or absolute positioning to break the grid.",
    });
  }

  // Check for monotone font pairing
  if (hasMonotoneFontPairing(tokens.typography)) {
    violations.push({
      pattern: "Monotone font pairing (same family for display/body)",
      severity: "critical",
      suggestion: "Use high-contrast font pairing (display + monospace, serif + geometric sans). See m3-expressive-typography-enhancer skill.",
    });
  }

  // Check for timid weight contrasts
  const weightContrast = calculateWeightContrast(tokens.typography);
  if (weightContrast < 1.5) {
    violations.push({
      pattern: `Timid weight contrast (${weightContrast.toFixed(2)}x)`,
      severity: "critical",
      suggestion: "Use extreme weight contrasts (100 vs 900 = 9x, not 400 vs 500 = 1.25x). Editorial design needs DRAMA.",
    });
  }

  // Check for timid size contrasts
  const sizeContrast = calculateSizeContrast(tokens.typography);
  if (sizeContrast < 2) {
    violations.push({
      pattern: `Timid size contrast (${sizeContrast.toFixed(2)}x)`,
      severity: "warning",
      suggestion: "Use extreme size contrasts (Display > 57px). Create 'Hero Moments' where type is the image.",
    });
  }

  // Check for lack of hover states
  if (!hasHoverStates(code)) {
    violations.push({
      pattern: "No hover states (static components)",
      severity: "warning",
      suggestion: 'Add spring-physics hover effects (translateY, scale, shadow) for "alive" interactions.',
    });
  }

  // Check for "Typographic Timidity" (Lack of Parametric Axes)
  if (!hasParametricAxes(code) && code.includes("Roboto Flex")) {
    violations.push({
       pattern: "Typographic Timidity (Roboto Flex without Axes)",
       severity: "critical",
       suggestion: "Unleash Roboto Flex! Use 'font-variation-settings' with 'wdth', 'slnt', 'GRAD', 'XTRA', 'YOPQ'. Don't just set weight.",
    });
  }

  return violations;
}

function hasParametricAxes(code: string): boolean {
  // Look for font-variation-settings and interesting axes
  const variationSettings = /font-variation-settings:\s*['"][^'"]*['"]/i.test(code);
  const interestingAxes = /'wdth'|'slnt'|'GRAD'|'XTRA'|'YOPQ'|'YTLC'|'YTAS'|'YTDE'/i.test(code);
  
  return variationSettings && interestingAxes;
}

function detectSaalSlopStructure(code: string): boolean {
  // Look for text-align: center on container wrapping H1/H2
  const centeredContainer = /text-align:\s*center/i.test(code) || /className="[^"]*text-center/i.test(code);
  const hasHeading = /<h[12]/i.test(code);
  const hasParagraph = /<p/i.test(code);
  
  return centeredContainer && hasHeading && hasParagraph;
}

function isGridRigid(code: string): boolean {
  // Returns TRUE if no "irregular" properties are found
  const irregularProps = [
    /rotate\(/,
    /skew\(/,
    /margin-\w+:\s*-\d/, // negative margin
    /-[a-z]+-\d+/, // tailwind negative spacing like -mt-10
    /absolute/,
    /z-index/
  ];

  return !irregularProps.some(regex => regex.test(code));
}

function hasMonotoneFontPairing(typography: TypographyTokens): boolean {
  const displayFamily = typography.display?.fontFamily || "";
  const bodyFamily = typography.body?.fontFamily || "";

  // Extract font name (ignore 'Variable' suffix)
  const displayName = displayFamily
    .split(",")[0]
    .replace(/['"\s]/g, "")
    .replace("Variable", "");
  const bodyName = bodyFamily
    .split(",")[0]
    .replace(/['"\s]/g, "")
    .replace("Variable", "");

  return displayName === bodyName;
}

function calculateWeightContrast(typography: TypographyTokens): number {
  const displayWeight = typography.display?.fontWeight || 400;
  const bodyWeight = typography.body?.fontWeight || 400;

  const max = Math.max(Number(displayWeight), Number(bodyWeight));
  const min = Math.min(Number(displayWeight), Number(bodyWeight));

  return max / min;
}

function calculateSizeContrast(typography: TypographyTokens): number {
  const displaySize = parseFloat(typography.display?.fontSize || "24px");
  const bodySize = parseFloat(typography.body?.fontSize || "16px");

  const max = Math.max(displaySize, bodySize);
  const min = Math.min(displaySize, bodySize);

  return max / min;
}

function hasHoverStates(code: string): boolean {
  const hoverRegex = /:hover\s*{|&:hover\s*{/g;
  return hoverRegex.test(code);
}
```

---

## Aesthetic Quality Score

**Scoring Algorithm (0-100):**

```typescript
interface AestheticScore {
  total: number; // 0-100
  breakdown: {
    typography: number; // 0-25
    color: number; // 0-25
    layout: number; // 0-25
    interaction: number; // 0-25
  };
  grade: "A" | "B" | "C" | "D" | "F";
  recommendation: string;
}

function calculateAestheticQuality(code: string, tokens: DesignTokens): AestheticScore {
  const typographyScore = scoreTypography(code, tokens);
  const colorScore = scoreColor(tokens);
  const layoutScore = scoreLayout(code, tokens);
  const interactionScore = scoreInteraction(code);

  const total = typographyScore + colorScore + layoutScore + interactionScore;

  const grade = total >= 90 ? "A" : total >= 80 ? "B" : total >= 70 ? "C" : total >= 60 ? "D" : "F";

  const recommendation = getRecommendation(total, {
    typography: typographyScore,
    color: colorScore,
    layout: layoutScore,
    interaction: interactionScore,
  });

  return {
    total,
    breakdown: {
      typography: typographyScore,
      color: colorScore,
      layout: layoutScore,
      interaction: interactionScore,
    },
    grade,
    recommendation,
  };
}

function scoreTypography(code: string, tokens: DesignTokens): number {
  let score = 25;

  // Deduct for generic fonts
  if (hasGenericFont(code, tokens)) score -= 10;

  // Deduct for monotone pairing
  if (hasMonotoneFontPairing(tokens.typography)) score -= 5;

  // Deduct for timid weight contrast
  const weightContrast = calculateWeightContrast(tokens.typography);
  if (weightContrast < 3) score -= 5;

  // Deduct for timid size contrast
  const sizeContrast = calculateSizeContrast(tokens.typography);
  if (sizeContrast < 3) score -= 5;

  return Math.max(0, score);
}

function scoreColor(tokens: DesignTokens): number {
  let score = 25;

  // Deduct for purple gradient syndrome
  if (isPurpleGradient(tokens.color.primary, tokens.color.secondary)) score -= 10;

  // Deduct for generic blues
  if (isGenericBlue(tokens.color.primary)) score -= 5;

  // Deduct for timid saturation
  const avgSaturation = calculateAverageSaturation(tokens.color);
  if (avgSaturation < 20) score -= 5;

  // Deduct for evenly distributed colors
  if (hasEvenlyDistributedColors(tokens.color)) score -= 5;

  return Math.max(0, score);
}

function scoreLayout(code: string, tokens: DesignTokens): number {
  let score = 25;

  // Deduct for flat backgrounds
  if (hasSolidBackgrounds(code) && !hasLayeredBackgrounds(code)) score -= 10;

  // Deduct for no elevation
  if (!usesElevationTokens(code, tokens)) score -= 5;

  // Deduct for uniform spacing
  if (hasUniformSpacing(code)) score -= 5;

  // Deduct for lack of depth effects
  if (!hasDepthEffects(code)) score -= 5;

  return Math.max(0, score);
}

function scoreInteraction(code: string): number {
  let score = 25;

  // Deduct for no hover states
  if (!hasHoverStates(code)) score -= 10;

  // Deduct for no spring physics
  if (!usesSpringPhysics(code)) score -= 5;

  // Deduct for no transitions
  if (!hasTransitions(code)) score -= 5;

  // Deduct for no animations
  if (!hasAnimations(code)) score -= 5;

  return Math.max(0, score);
}

function getRecommendation(total: number, breakdown: Record<string, number>): string {
  if (total >= 90) {
    return "Excellent! This design demonstrates strong M3 Expressive principles with distinctive aesthetics.";
  } else if (total >= 80) {
    return "Good aesthetic quality. Minor improvements possible in lower-scoring areas.";
  } else if (total >= 70) {
    return "Acceptable design. Focus on improving typography and color for more impact.";
  } else if (total >= 60) {
    return "Below M3 Expressive standards. Review anti-slop violations and apply remediation.";
  } else {
    return "CRITICAL: Generic AI slop detected. Complete redesign recommended using M3 Expressive skills.";
  }
}
```

---

## Validation Report Format

```json
{
  "aestheticQuality": {
    "total": 72,
    "breakdown": {
      "typography": 18,
      "color": 20,
      "layout": 15,
      "interaction": 19
    },
    "grade": "C",
    "recommendation": "Acceptable design. Focus on improving typography and color for more impact."
  },
  "violations": [
    {
      "category": "typography",
      "pattern": "Generic font detected",
      "severity": "critical",
      "details": {
        "fontFamily": "Inter, sans-serif",
        "location": "Line 42",
        "suggestion": "Replace 'Inter' with 'Roboto Flex Variable' or 'Recursive' for a more distinctive aesthetic."
      }
    },
    {
      "category": "color",
      "pattern": "Purple gradient on white",
      "severity": "critical",
      "details": {
        "colors": ["#7C4DFF", "#9C27B0", "#FFFFFF"],
        "suggestion": "Use Native Earth palette (Sage, Terracotta, Wattle)."
      }
    },
    {
      "category": "layout",
      "pattern": "Solid background (no gradients)",
      "severity": "critical",
      "details": {
        "location": "Background styling",
        "suggestion": "Use layered gradients or atmospheric effects (m3-atmospheric-backgrounds skill)."
      }
    }
  ],
  "remediationSteps": ["1. Replace Inter with Roboto Flex or Recursive (m3-expressive-typography-enhancer)", "2. Use Native Earth palette: Sage (#B4D8AE) + Terracotta (#E09F7D) + Wattle (#F0C419)", "3. Add layered background gradients (m3-atmospheric-backgrounds)", "4. Apply elevation tokens for depth (var(--sys-elevation-level2))", "5. Add spring-physics hover effects (m3-spring-motion-choreography)"]
}
```

---

## Usage

**Standalone Skill:**

```bash
# Validate aesthetic quality and detect AI slop
m3-anti-slop-validator \
  --file frontend/src/components/ui/Card/Card.tsx \
  --tokens design-system/tokens-expressive.json \
  --report validation-report.json
```

**Within Design Systems Architect:**

```javascript
// Run after all M3 migrations to validate final output
const validation = await runSkill("m3-anti-slop-validator", {
  code: finalCode,
  tokens: tokensExpressive,
});

if (validation.aestheticQuality.total < 80) {
  console.warn("⚠️ Low aesthetic quality score. Review violations.");
}
```

---

## Validation Checklist

- [ ] No forbidden fonts (Inter, Roboto, Arial) without distinctive pairing
- [ ] No purple gradients on white backgrounds
- [ ] Color saturation ≥ 30% (vibrant, not timid)
- [ ] Dominant color palette (not evenly distributed)
- [ ] Layered backgrounds (gradients, patterns, not flat solids)
- [ ] Elevation tokens used for depth
- [ ] Varied spacing rhythm (not uniform)
- [ ] Weight contrast ≥ 3x (100 vs 900, not 400 vs 500)
- [ ] Size contrast ≥ 3x (57px vs 12px, not 24px vs 16px)
- [ ] Hover states with spring physics
- [ ] Animations use spring easing (not linear/ease-in-out)
- [ ] Aesthetic quality score ≥ 80

---

**Created:** 2025-01-18
**Version:** 1.0.0
**Status:** Production Ready
**Purpose:** Prevent generic AI-generated aesthetics and enforce M3 Expressive standards
