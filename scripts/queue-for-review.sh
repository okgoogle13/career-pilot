#!/bin/bash
# Antigravity Migration Completion Script
# Usage: ./scripts/queue-for-review.sh <component-name> <component-path> <compliance-score>

set -e

COMPONENT_NAME=$1
COMPONENT_PATH=$2
COMPLIANCE_SCORE=${3:-"pending"}
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if [ -z "$COMPONENT_NAME" ] || [ -z "$COMPONENT_PATH" ]; then
  echo "Usage: ./scripts/queue-for-review.sh <component-name> <component-path> [compliance-score]"
  echo "Example: ./scripts/queue-for-review.sh M3TextField frontend/src/components/ui/M3TextField.tsx 95"
  exit 1
fi

# Get absolute path
ABSOLUTE_PATH="$(cd "$(dirname "$COMPONENT_PATH")" && pwd)/$(basename "$COMPONENT_PATH")"
STORIES_PATH="${ABSOLUTE_PATH%.tsx}.stories.tsx"
TESTS_PATH="${ABSOLUTE_PATH%.tsx}.test.tsx"

# Update queue.json
echo "📝 Adding $COMPONENT_NAME to review queue..."
jq --arg name "$COMPONENT_NAME" \
   --arg path "$ABSOLUTE_PATH" \
   --arg stories "$STORIES_PATH" \
   --arg tests "$TESTS_PATH" \
   --arg score "$COMPLIANCE_SCORE" \
   --arg timestamp "$TIMESTAMP" \
   '.queue += [{
     "name": $name,
     "componentPath": $path,
     "storiesPath": $stories,
     "testsPath": $tests,
     "complianceScore": $score,
     "status": "awaiting_review",
     "queuedAt": $timestamp,
     "type": "LEGACY"
   }]' .migration/queue.json > .migration/queue.tmp.json && \
   mv .migration/queue.tmp.json .migration/queue.json

# Generate markdown report
REPORT_FILE=".migration/reports/${COMPONENT_NAME}_report.md"
cat > "$REPORT_FILE" << EOF
# Migration Report: $COMPONENT_NAME

**Date**: $TIMESTAMP  
**Status**: ⏳ Awaiting Claude Desktop Review  
**Compliance Score**: $COMPLIANCE_SCORE/100  
**Type**: [LEGACY] Migration

---

## File Paths for Claude Desktop

- **Component**: \`file://$ABSOLUTE_PATH\`
- **Stories**: \`file://$STORIES_PATH\`
- **Tests**: \`file://$TESTS_PATH\`

---

## Claude Desktop Review Checklist

### Design Token Compliance
- [ ] No hardcoded colors (all use Northcote tokens)
- [ ] No hardcoded spacing (all use design system spacing)
- [ ] No hardcoded border-radius (all use organic asymmetry)
- [ ] No hardcoded font families (all use Federation Stack)

### Typography Compliance
- [ ] Uses \`font-field-note\` for body text
- [ ] Uses \`font-annotation\` for labels/metadata
- [ ] Uses \`font-proclamation\` for hero text (if applicable)

### Color Compliance
- [ ] Primary actions use \`primary-wattle-gold\`
- [ ] Error states use \`tertiary-waratah-crimson\`
- [ ] Backgrounds use \`surface-*\` tokens
- [ ] Text uses \`on-surface-*\` tokens

### Shape Compliance
- [ ] Laboratory mode uses \`radius-stone\` or precise asymmetry
- [ ] Gallery mode uses organic asymmetry
- [ ] No perfect circles except for functional elements

### Motion Compliance
- [ ] Uses motion tokens (\`ease-viscous\`, \`duration-standard\`, etc.)
- [ ] Gallery mode uses \`ease-viscous\` (overshoot allowed)
- [ ] Laboratory mode uses \`ease-precise\` (no overshoot)
- [ ] Respects \`prefers-reduced-motion\`

### Accessibility Compliance (WCAG 2.1 Level AA)
- [ ] Focus indicators visible (2px outline, offset 2px)
- [ ] ARIA attributes present
- [ ] Keyboard navigation supported
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Interactive elements ≥ 44x44px touch target

### Mode Support
- [ ] Component supports Gallery mode
- [ ] Component supports Laboratory mode
- [ ] Mode switching works correctly
- [ ] Visual differences clear between modes

---

## Next Steps

1. Claude Desktop reviews component using file paths above
2. Claude Desktop runs: \`./scripts/approve-component.sh $COMPONENT_NAME\`
   OR: \`./scripts/request-changes.sh $COMPONENT_NAME "feedback message"\`
3. Antigravity addresses any feedback and re-queues

---

**Queued by**: Antigravity  
**Awaiting**: Claude Desktop Review
EOF

echo "✅ $COMPONENT_NAME queued for review"
echo "📄 Report: $REPORT_FILE"
echo ""
echo "Next: Claude Desktop should review:"
echo "  - Component: file://$ABSOLUTE_PATH"
echo "  - Report: file://$(pwd)/$REPORT_FILE"
