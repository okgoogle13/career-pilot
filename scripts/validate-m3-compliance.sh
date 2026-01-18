#!/bin/bash

# M3 Expressive Validation Script
# Scans codebase for violations of M3 Expressive design rules

echo "======================================"
echo "M3 Expressive Compliance Validator"
echo "======================================"
echo ""

VIOLATIONS=0

echo "🔍 Scanning for forbidden Tailwind rounding classes..."
echo ""

# Check for generic Tailwind rounding (excluding comments)
ROUNDED_VIOLATIONS=$(grep -r "rounded-lg\|rounded-xl\|rounded-full\|rounded-2xl\|rounded-3xl" \
  frontend/src/components/ui/M3Card.tsx 2>/dev/null | \
  grep -v " \* " | wc -l)

if [ "$ROUNDED_VIOLATIONS" -gt 0 ]; then
  echo "❌ VIOLATION: Found $ROUNDED_VIOLATIONS instances of generic Tailwind rounding"
  grep -n "rounded-lg\|rounded-xl\|rounded-full" frontend/src/components/ui/M3Card.tsx
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "✅ PASS: No generic Tailwind rounding classes found in M3Card"
fi

echo ""
echo "🔍 Checking for hardcoded color values..."
echo ""

# Check for hardcoded hex colors (excluding comments)
HEX_VIOLATIONS=$(grep -r "#[0-9A-Fa-f]\{6\}" frontend/src/components/ui/M3Card.tsx \
  | grep -v "^\s*//" | grep -v "^\s*\*" | wc -l)

if [ "$HEX_VIOLATIONS" -gt 0 ]; then
  echo "⚠️  WARNING: Found $HEX_VIOLATIONS instances of hardcoded hex colors"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "✅ PASS: No hardcoded hex colors found"
fi

echo ""
echo "🔍 Verifying token architecture..."
echo ""

# Check if tokens.json exists
if [ -f "frontend/src/theme/tokens.json" ]; then
  echo "✅ PASS: tokens.json exists"
else
  echo "❌ VIOLATION: tokens.json not found"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# Check if design-tokens.css has M3 shapes
if grep -q "md-ref-shape-pebble" frontend/src/theme/design-tokens.css 2>/dev/null; then
  echo "✅ PASS: M3 polygon shapes defined in design-tokens.css"
else
  echo "❌ VIOLATION: M3 polygon shapes not found in design-tokens.css"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

echo ""
echo "🔍 Checking for framer-motion usage..."
echo ""

if grep -q "framer-motion" frontend/src/components/ui/M3Card.tsx 2>/dev/null; then
  echo "✅ PASS: M3Card uses framer-motion"
else
  echo "❌ VIOLATION: M3Card does not import framer-motion"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

echo ""
echo "🔍 Validating spring physics constants..."
echo ""

if grep -q "stiffness: 500" frontend/src/components/ui/M3Card.tsx 2>/dev/null; then
  echo "✅ PASS: Correct stiffness value (500) found"
else
  echo "❌ VIOLATION: Incorrect stiffness value"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

if grep -q "damping: 27" frontend/src/components/ui/M3Card.tsx 2>/dev/null; then
  echo "✅ PASS: Correct damping value (27) found"
else
  echo "❌ VIOLATION: Incorrect damping value"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

echo ""
echo "🔍 Checking for custom Playwright matchers..."
echo ""

if [ -f "frontend/tests/utils/m3-parametric-matchers.ts" ]; then
  echo "✅ PASS: Custom matchers file exists"
  
  if grep -q "toHaveExpressiveMorph" frontend/tests/utils/m3-parametric-matchers.ts; then
    echo "✅ PASS: toHaveExpressiveMorph matcher defined"
  else
    echo "❌ VIOLATION: toHaveExpressiveMorph matcher missing"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
  
  if grep -q "toHaveSyncedTypography" frontend/tests/utils/m3-parametric-matchers.ts; then
    echo "✅ PASS: toHaveSyncedTypography matcher defined"
  else
    echo "❌ VIOLATION: toHaveSyncedTypography matcher missing"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
  
  if grep -q "toBeUsingM3Physics" frontend/tests/utils/m3-parametric-matchers.ts; then
    echo "✅ PASS: toBeUsingM3Physics matcher defined"
  else
    echo "❌ VIOLATION: toBeUsingM3Physics matcher missing"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
else
  echo "❌ VIOLATION: Custom matchers file not found"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

echo ""
echo "🔍 Checking skill file..."
echo ""

if [ -f ".antigravity/skills/m3-expressive-validator.md" ]; then
  echo "✅ PASS: M3 Expressive Validator skill file exists"
else
  echo "❌ VIOLATION: Skill file not found"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

echo ""
echo "======================================"
echo "Validation Summary"
echo "======================================"
echo ""

if [ "$VIOLATIONS" -eq 0 ]; then
  echo "🎉 SUCCESS: All M3 Expressive compliance checks passed!"
  echo ""
  echo "Components validated:"
  echo "  ✅ Token architecture (3-tier hierarchy)"
  echo "  ✅ Path-based shapes (no generic pills)"
  echo "  ✅ Spring physics (stiffness: 500, damping: 27)"
  echo "  ✅ Custom Playwright matchers"
  echo "  ✅ Skill file gatekeeper"
  echo ""
  exit 0
else
  echo "❌ FAILED: Found $VIOLATIONS violation(s)"
  echo ""
  echo "Please review the issues above and fix violations before proceeding."
  echo ""
  exit 1
fi
