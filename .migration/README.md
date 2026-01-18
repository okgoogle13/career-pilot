# Migration Automation System — Quick Start Guide

## Overview

Zero copy-paste workflow between Antigravity (IDE) and Claude Desktop using shared `.migration/` directory.

---

## System Architecture

```
.migration/
├── queue.json          # Components awaiting review (Antigravity → Claude Desktop)
├── completed.json      # Approved components (Claude Desktop)
├── feedback.json       # Review feedback (Claude Desktop → Antigravity)
└── reports/            # Auto-generated review reports
    ├── M3TextField_report.md
    ├── M3Select_report.md
    └── ...
```

---

## Workflow

### 1. Antigravity: Complete Migration

After migrating a component, run:

```bash
./scripts/queue-for-review.sh <component-name> <component-path> <compliance-score>
```

**Example**:
```bash
./scripts/queue-for-review.sh M3TextField frontend/src/components/ui/M3TextField.tsx 95
```

**What it does**:
- ✅ Adds component to `.migration/queue.json`
- ✅ Generates review report in `.migration/reports/`
- ✅ Includes clickable file paths for Claude Desktop
- ✅ Auto-generates compliance checklist

**Output**:
```
✅ M3TextField queued for review
📄 Report: .migration/reports/M3TextField_report.md

Next: Claude Desktop should review:
  - Component: file:///Users/.../M3TextField.tsx
  - Report: file:///Users/.../M3TextField_report.md
```

---

### 2. Claude Desktop: Review Component

**Option A: Read Queue**
```bash
cat .migration/queue.json | jq '.queue'
```

**Option B: Open Report**
```
file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/.migration/reports/M3TextField_report.md
```

**Review checklist** (auto-generated in report):
- [ ] Northcote token usage
- [ ] Gallery/Laboratory modes
- [ ] WCAG 2.1 Level AA compliance
- [ ] Motion tokens
- [ ] Organic asymmetry shapes

---

### 3. Claude Desktop: Approve or Request Changes

#### Option A: Approve Component
```bash
./scripts/approve-component.sh M3TextField
```

**What it does**:
- ✅ Moves component to `.migration/completed.json`
- ✅ Removes from queue
- ✅ Shows updated stats

**Output**:
```
✅ M3TextField approved and moved to completed
📊 Queue: 3 components remaining
✅ Completed: 1 components total
```

#### Option B: Request Changes
```bash
./scripts/request-changes.sh M3TextField "Add missing ARIA labels for error states"
```

**What it does**:
- ✅ Adds feedback to `.migration/feedback.json`
- ✅ Removes from queue
- ✅ Notifies Antigravity

**Output**:
```
📝 Feedback added for M3TextField
📊 Queue: 3 components remaining
📝 Feedback: 1 components need changes

Antigravity should check: file:///.../feedback.json
```

---

### 4. Antigravity: Check Feedback

```bash
cat .migration/feedback.json | jq '.feedback'
```

**Example output**:
```json
{
  "component": "M3TextField",
  "componentPath": "/Users/.../M3TextField.tsx",
  "feedback": "Add missing ARIA labels for error states",
  "requestedAt": "2026-01-14T02:08:12Z",
  "status": "needs_changes"
}
```

**Address feedback**, then re-queue:
```bash
./scripts/queue-for-review.sh M3TextField frontend/src/components/ui/M3TextField.tsx 98
```

---

## Real-World Example

### Scenario: Migrating Phase 1 Components

#### Step 1: Antigravity queues all Phase 1 components
```bash
./scripts/queue-for-review.sh M3TextField frontend/src/components/ui/M3TextField.tsx 95
./scripts/queue-for-review.sh M3Select frontend/src/components/ui/M3Select.tsx 90
./scripts/queue-for-review.sh M3Checkbox frontend/src/components/ui/M3Checkbox.tsx 90
./scripts/queue-for-review.sh StatusBadge frontend/src/components/ui/StatusBadge/StatusBadge.tsx 85
```

#### Step 2: Claude Desktop reviews queue
```bash
cat .migration/queue.json | jq '.queue[] | {name, complianceScore, componentPath}'
```

**Output**:
```json
{
  "name": "M3TextField",
  "complianceScore": "95",
  "componentPath": "file:///Users/.../M3TextField.tsx"
}
{
  "name": "M3Select",
  "complianceScore": "90",
  "componentPath": "file:///Users/.../M3Select.tsx"
}
...
```

#### Step 3: Claude Desktop reviews and approves
```bash
./scripts/approve-component.sh M3TextField
./scripts/approve-component.sh M3Select
./scripts/request-changes.sh M3Checkbox "Add indeterminate state animation"
./scripts/approve-component.sh StatusBadge
```

#### Step 4: Antigravity checks feedback
```bash
cat .migration/feedback.json | jq '.feedback[] | {component, feedback}'
```

**Output**:
```json
{
  "component": "M3Checkbox",
  "feedback": "Add indeterminate state animation"
}
```

#### Step 5: Antigravity addresses feedback and re-queues
```bash
# Fix M3Checkbox
./scripts/queue-for-review.sh M3Checkbox frontend/src/components/ui/M3Checkbox.tsx 95
```

#### Step 6: Claude Desktop approves
```bash
./scripts/approve-component.sh M3Checkbox
```

**Final status**:
```bash
cat .migration/completed.json | jq '.completed | length'
# Output: 4
```

---

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Status Updates** | Manual copy-paste | Auto-generated JSON |
| **File Navigation** | Manual path lookup | Clickable file:// links |
| **Review Handoff** | Manual notification | Check queue.json |
| **Feedback Loop** | Manual tracking | feedback.json |
| **Progress Tracking** | Separate documents | Single source of truth |

---

## File Paths Reference

### For Claude Desktop

**Queue** (components awaiting review):
```
file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/.migration/queue.json
```

**Feedback** (changes requested):
```
file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/.migration/feedback.json
```

**Completed** (approved components):
```
file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/.migration/completed.json
```

**Reports** (auto-generated):
```
file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/.migration/reports/
```

---

## Tips

### For Antigravity
- Always run `queue-for-review.sh` after completing a migration
- Check `feedback.json` before starting new work
- Include compliance score for tracking

### For Claude Desktop
- Review components in priority order (check queue.json)
- Use clickable file paths in reports for quick navigation
- Be specific in feedback messages
- Approve quickly to unblock Antigravity

---

## Troubleshooting

### Script not found
```bash
chmod +x scripts/*.sh
```

### jq not installed
```bash
brew install jq  # macOS
```

### Queue not updating
```bash
cat .migration/queue.json  # Check syntax
jq '.' .migration/queue.json  # Validate JSON
```

---

## Next Steps

1. ✅ System is ready to use
2. ⏳ Queue Phase 1 components for review
3. ⏳ Claude Desktop reviews and approves
4. ⏳ Continue with Phase 2 migration

**Zero copy-paste required!** 🎉
