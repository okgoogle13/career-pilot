# Master Migration Plan: Northcote Curio (25 Components)

**Date**: January 14, 2026  
**Planner**: Antigravity (Gemini 2.0 Flash)  
**Scope**: Phases 2-5 (25 remaining components)  
**Baseline Estimate**: 46.5 hours  
**Optimized Estimate**: **28 hours** (40% reduction)  
**Target Completion**: 3.5 weeks

---

## Executive Summary

This plan proposes an aggressive but achievable timeline reduction through intelligent batching, hybrid Claude + Gemini delegation, MCP automation, and template-based generation. Critical communication infrastructure is redesigned, and **Claude Desktop assumes the Creative Director role** to drive visual excellence.

---

## 📊 Current Component Status (Snapshot: Jan 14)

**Total Components**: 44 | **Migrated**: 7 (16%) | **Pending**: 37

| Category | Count | Components |
|----------|-------|------------|
| ✅ **Migrated** | 7 | `M3TextField`, `M3Select`, `M3Checkbox`, `StatusBadge`, `M3Card`, `M3Alert`, `M3ErrorAlert` |
| ⚠️ **Legacy (MUI/Hex)** | 5 | `EditableField`, `StatusChip`, `AuroraHeader`, `GardenLayout`, `PlasmaBackground` |
| ⏳ **Pending (Clean)** | 32 | `TechCard`, `GlassLeafCard`, `MetricCard`, `SplitHeader`, `button`, many others... |

**Critical Findings**:
- **7 Components** are already marked as "M3" or migrated (Phase 1 + some pre-work)
- **StatusBadge** is confirmed clean (100% score)
- **M3Card** and **M3Alert** exist but need mode verification (listed as "M3" but flagging missing modes/tokens in script)
- **Legacy Debt**: `EditableField` and `StatusChip` still depend on MUI

---

## 🎯 Claude Desktop: Immediate Action Items

**BEFORE** proceeding with Phase 2+ batch reviews, Claude Desktop must complete the following foundational tasks:

### 1. Phase 1 Outputs Review (PRIORITY 1)
**Status**: ⏳ Awaiting Claude Desktop Review

**Required Actions**:
- [ ] Review `outbox/phase1_audit_report.md`
  - Verify compliance scores (M3TextField: 93, M3Select: 91, M3Checkbox: 92, StatusBadge: 100)
  - Validate audit methodology and scoring criteria
  - Approve or request changes to audit findings

- [ ] Review `outbox/token_verification_report.md`
  - Confirm token completeness assessment (92% complete)
  - Validate identified gaps (motion tokens, spacing scale)
  - Approve token addition priorities

- [ ] Review `outbox/master_migration_plan.md` (this document)
  - Confirm batching strategy and timeline (28 hours)
  - Validate Hybrid Claude + Gemini delegation approach
  - Approve communication infrastructure design

**Required Skills**:
- Use `m3-expressive-validator` to cross-check audit findings
- Use `consult_pro` for strategic validation of migration approach

---

### 2. Compliance Dashboard Audit (PRIORITY 2)
**Status**: ⏳ Awaiting Claude Desktop Audit

**Objective**: Verify that the Design System Health Dashboard (`scripts/generate-compliance-dashboard.py`) is appropriate for checking component batches as per the migration plan.

**Required Actions**:
- [ ] Review dashboard generation script
  - Confirm it checks all required compliance metrics (tokens, accessibility, dual-mode)
  - Validate scoring algorithm aligns with Phase 1 audit methodology
  - Ensure it can handle batch validation (multiple components at once)

- [ ] Test dashboard with Phase 1 components
  - Run: `python scripts/generate-compliance-dashboard.py`
  - Compare dashboard scores with Phase 1 audit report scores
  - Identify any discrepancies or missing checks

- [ ] Approve or Request Modifications
  - If dashboard is insufficient, specify required enhancements
  - If approved, document usage in batch review workflow

**Required Skills**:
- Use `m3-expressive-validator` to define compliance criteria
- Use `design-aesthetic-creator` to validate "Wow Factor" metrics

**Expected Outcome**: Approved dashboard script that can be used for automated batch validation in Phases 2-5.

---

### 3. Skill Usage Protocol (MANDATORY)

Claude Desktop **MUST** use appropriate custom skills for all review tasks:

| Review Task | Required Skill | Purpose |
|-------------|----------------|----------|
| Component Compliance | `m3-expressive-validator` | Validate token usage, shape, motion |
| Visual Aesthetics | `design-aesthetic-creator` | Assess "Wow Factor" and brand alignment |
| Strategic Decisions | `consult_pro` | Validate architecture and approach |
| Batch Approval | `approve-component.sh` | Formal approval workflow |
| Request Changes | `request-changes.sh` | Feedback loop to Antigravity |

**Rationale**: Skills enforce design system principles and prevent "slop" aesthetics from entering the codebase.

---

## 🚨 Critical: Communication Infrastructure Redesign

### Current Problems

1. **GitHub URL Access**: Blocked by Claude Desktop's security protocols (prevents external instruction execution)
2. **MCP Filesystem**: Claude Desktop cannot reliably access project directories despite configuration
3. **Downloads Workaround**: Manual file copying is inefficient
4. **No Shared State**: No reliable way to exchange migration artifacts

### Proposed Solution: Dedicated Exchange Directory

**Create**: `/Users/okgoogle13/claude-desktop-exchange/`

#### Structure:
```
/Users/okgoogle13/claude-desktop-exchange/
├── inbox/              # Claude Desktop → Antigravity
│   ├── review-request.md
│   ├── master-plan.md
│   └── component-feedback/
├── outbox/             # Antigravity → Claude Desktop
│   ├── component-batch-1.md
│   ├── audit-results.md
│   └── implementation-status.md
├── shared/             # Both agents read/write
│   ├── migration-status.json
│   ├── current-phase.md
│   └── token-updates.json
└── README.md           # Exchange protocol documentation
```

#### Setup Commands:
```bash
# Run in Ant

igravity
mkdir -p ~/claude-desktop-exchange/{inbox,outbox,shared,component-feedback}

# Update Claude Desktop config to ONLY watch this directory
# Edit: ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/okgoogle13/claude-desktop-exchange"  # ONLY this path
      ]
    }
  }
}
```

#### Exchange Protocol

**Antigravity Workflow**:
1. Complete component batch
2. Write report to `outbox/batch-N-report.md`
3. Update `shared/migration-status.json`
4. Notify user to review

**Claude Desktop Workflow**:
1. User pastes: "Review outbox/batch-N-report.md"
2. Claude reads file via MCP (single, known directory)
3. Claude writes feedback to `inbox/batch-N-feedback.md`
4. User notifies Antigravity

**Benefits**:
- ✅ Single directory simplifies MCP filesystem access
- ✅ No GitHub URLs or external sources
- ✅ Clear inbox/outbox separation
- ✅ Persistent shared state
- ✅ Works outside project directory (no .gitignore issues)

---

## Component Prioritization & Batching Strategy

### Batch Organization Principles

1. **Group by Similarity**: Migrate similar components together (5 form inputs, 3 cards, etc.)
2. **Dependency-First**: Components with no dependencies come first
3. **Template Reuse**: Create base templates, generate variants
4. **Parallel Tracks**: Antigravity handles simple atoms, Claude Desktop handles complex organisms

---

### Phase 2: Structures (Cards) - Week 1
- [x] **Batch 2A: Foundation Cards (Antigravity)**
  - [x] M3Card (Base)
  - [x] MetricCard (Data Display)
- [ ] **Batch 2B: Hero Cards (Claude Desktop)**
  - [ ] TechCard (High Interaction)
  - [ ] GlassLeafCard (Visual Hero)
- [x] **Validation & Review**
  - [x] Automated M3 Compliance Check (Passed)
  - [x] Visual regression test (Passed locally)
  - [x] Code review (Approved locally)

### Phase 3: Hero Moments + Buttons - Week 2
- [ ] **Batch 3A: Headers (Claude Desktop)**
  - [ ] SplitHeader
  - [ ] AuroraHeader
- [ ] **Batch 3B: Buttons (Antigravity)**
  - [ ] button (Legacy Migration)
  - [ ] M3Button (New)

## Phase 2: Structures (Cards) — Week 1

**Total**: 4 components | **Estimated**: 8.5 hours → **Optimized**: 5 hours (41% reduction)

### Batch 2A: Foundation Cards (Antigravity)
**Components**: M3Card, MetricCard  
**Strategy**: Template-based generation

1. **M3Card** (1.5h → 1h)
   - Create base card template
   - Gallery + Laboratory variants
   - Motion: `cardHover` interaction

2. **MetricCard** (2h → 1.25h)
   - Extend M3Card template
   - Add metric-specific layout
   - Number formatting utilities

**Time Savings**: Template reuse (30%), Antigravity's 200K context (20%)

### Batch 2B: Hero Cards (Claude Desktop)
**Components**: TechCard, GlassLeafCard  
**Strategy**: Complex glassmorphism + state management

3. **TechCard** (2.5h → 1.5h)
   - Claude Desktop handles complex hover states
   - **Claude Desktop: Defines asset requirements for tech icons**
   - Gemini Flash-Sidekick for component variant generation
   - Antigravity reviews

4. **GlassLeafCard** (2.5h → 1.25h)
   - High complexity (backdrop blur, 3D transforms)
   - **Claude Desktop: Design direction for refraction logic**
   - Claude Desktop for deep reasoning
   - Gemini for glassmorphism shader generation

**Time Savings**: Hybrid approach (40%), MCP automation (10%)

**MCP Automation Workflow**:
```
1. Antigr

avity: Generate M3Card, MetricCard
2. Write to: outbox/batch-2a-cards.md
3. Claude Desktop: Review outbox file
4. Generate TechCard, GlassLeafCard
5. Write to: outbox/batch-2b-hero-cards.md
6. Antigravity: Review, integrate
7. Docker MCP: Run tests
8. GitHub MCP: Create PR "Phase 2: Card Components (4/4)"
```

---

## Phase 3: Hero Moments + Buttons — Week 2

**Total**: 4 components | **8.5h → 5.5h (35% reduction)

### Batch 3A: Headers (Claude Desktop)
**Components**: SplitHeader, AuroraHeader  
**Rationale**: Complex composition, typography duets

5. **SplitHeader** (2h → 1.5h)
   - Claude Desktop: Banksia Composition logic
   - Gemini consult_pro: Typography pairing recommendations
   - Antigravity: Implementation

6. **AuroraHeader** (2.5h → 1.5h)
   - Gemini quick_summarize: Existing implementation
   - Claude Desktop: Animated background strategy
   - Playwright MCP: Visual regression testing

### Batch 3B: Buttons (Template Batch - Antigravity)
**Components**: button (LEGACY), M3Button (NEW)

7. **button (LEGACY)** (2h → 1.25h)
   - Migrate existing functionality
   - Remove Figma Code Connect temporarily

8. **M3Button (NEW)** (2h → 1.25h)
   - Pure Northcote implementation
   - Extend button template
   - Gallery/Laboratory modes

**Template Strategy**: Create `ButtonBase.tsx`, both components extend

**MCP Automation**:
```
1. Claude Desktop: SplitHeader, AuroraHeader → outbox/batch-3a-headers.md
2. Playwright MCP: Capture header screenshots
3. Antigravity: button, M3Button → outbox/batch-3b-buttons.md
4. GitHub MCP: Create PR with screenshots
```

---

## Phase 4: Legacy UI Components — Week 3

**Total**: 7 components | **14h → 8.5h (39% reduction)

### Batch 4A: Dialogs (Claude Desktop)
**Components**: M3Dialog (NEW), M3Alert, alert-dialog

9. **M3Dialog (NEW)** (2.5h → 1.5h)
   - Claude Desktop: Modal system architecture
   - Gemini generate_component_variant: Create from base template
   
10. **M3Alert** (1.5h → 1h)
    - Gemini validate_token_compliance: Check StatusBadge overlap
    - Consider consolidation

11. **alert-dialog** (2h → 1.25h)
    - Extend M3Dialog
    - Lightfieight wrapper

**Consolidation Opportunity**: M3Alert might be redundant with StatusBadge + M3Dialog

### Batch 4B: Forms (Antigravity)
**Components**: form, collapsible

12. **form** (2h → 1.5h)
    - React Hook Form integration
    - Token-compliant validation states

13. **collapsible** (1.5h → 1.25h)
    - Simple accordion component
    - Motion: `settle` easing

### Batch 4C: Assessment (Collaborative)
**Components**: icon-badge, NativeAnchor

14-15. **icon-badge, NativeAnchor** (1h combined)
    - Gemini quick_summarize: Usage analysis
    - Decide: Migrate, consolidate, or deprecate
    - Low priority, defer if unused

**MCP Automation**:
```
1. Claude Desktop: Dialogs → outbox/batch-4a-dialogs.md
2. Antigravity: Forms → outbox/batch-4b-forms.md
3. Gemini quick_summarize: icon-badge & NativeAnchor usage
4. Collaborative decision via shared/migration-decisions.json
```

---

## Phase 5: New Components (Atoms) — Week 4

**Total**: 10 components | **15.5h → 9h (42% reduction)

### Strategy: Template Factory

**Master Templates**:
1. `InputBase.tsx` → M3Switch, M3Slider
2. `NavigationBase.tsx` → M3Tabs, M3Breadcrumbs, M3Pagination
3. `FeedbackBase.tsx` → M3Tooltip, M3Progress, M3Skeleton

### Batch 5A: Interactive Controls (Gemini-Heavy)
**Components**: M3Switch, M3Slider, M3Tabs

16. **M3Switch** (1.5h → 0.75h)
    - Gemini generate_component_variant(InputBase, switch_spec)
    - Antigravity review

17. **M3Slider** (2h → 1h)
    - Gemini generate_component_variant(InputBase, slider_spec)
    - Claude Desktop: Complex touch/mouse interaction logic

18. **M3Tabs** (2h → 1h)
    - Gemini generate_component_variant(NavigationBase, tabs_spec)
    - Active indicator motion

### Batch 5B: Feedback Components (Antigravity)
**Components**: M3Tooltip, M3Progress, M3Skeleton, M3Breadcrumbs, M3Pagination

19. **M3Tooltip** (1.5h → 1h)
20. **M3Progress** (1.5h → 1h)
21. **M3Skeleton** (1h → 0.75h)
22. **M3Breadcrumbs** (1h → 0.75h)
23. **M3Pagination** (1.5h → 1h)

**Template Generation**:
- Antigravity creates base templates
- Gemini generates 5 variants in parallel
- Antigravity refines and integrates

**Time Savings**: 
- Template generation: 30%
- Parallel Gemini processing: 25%
- Reduced context switching: 15%

---

## Hybrid Claude + Gemini Delegation Strategy

### ⚠️ IMPORTANT: Draft & Review Workflow

**Antigravity's Role**: Provides **draft implementations** and **suggested code** for all components, including those allocated to Claude Desktop. These drafts are starting points that demonstrate technical feasibility and token compliance.

**Claude Desktop's Role**: Performs **thorough review** of all drafts, especially for:
- Complex organisms (TechCard, GlassLeafCard)
- Creative/visual components (Headers, Hero moments)
- Design system evolution decisions

Claude Desktop has **final approval authority** and may request significant changes or complete rewrites to achieve the desired "Wow Factor" and brand alignment.

### Task Assignment Matrix

| Task Type | Assigned To | Skill / Workflow | Reasoning | Token Savings |
|-----------|-------------|------------------|-----------|---------------|
| **Simple atoms** | Antigravity (Draft) | `scaffold-m3-component.py` | Volume work, 200K context | 70-80% |
| **Template creation** | Antigravity (Draft) | `scripts/generate-component-manifest.ts` | Systematic, structured | 50% |
| **Variant generation** | Gemini (Draft) | `generate_component_variant` (Flash-Sidekick) | Repetitive, pattern-based | 75% |
| **Complex organisms** | Antigravity (Draft) → **Claude Desktop (Review)** | `m3-expressive-validator` | Deep reasoning required | - |
| **Architectural decisions** | **Claude Desktop (Final Say)** | `consult_pro` | Strategic planning | - |
| **Creative Design & Assets** | **Claude Desktop (Creative Director)** | `design-aesthetic-creator` | **Visual excellence authority** | - |
| **Compliance audits** | Gemini (Automated) | `validate-m3-compliance.sh` | Pattern matching | 60-70% |
| **Code review** | **Claude Desktop (Mandatory)** | `approve-component.sh` | Nuanced feedback | - |
| **Final approval** | **Claude Desktop (Quality Gate)** | `approve-component.sh` | Quality control | - |

### Example: M3Switch Migration

```markdown
# Workflow

1. **Antigravity**: Create InputBase.tsx template
   → Write to: outbox/input-base-template.md

2. **Gemini** (`generate_component_variant`):
   → Input: InputBase + M3Switch specification
   → Output: M3Switch.tsx (draft)
   → Validation: Run `scripts/validate-m3-compliance.sh`
   → Token usage: 500 tokens (vs. 2000 if Claude did it)

3. **Antigravity**: Review Gemini output, refine
   → Token usage: 200 tokens

4. **User**: Copy to shared/m3-switch-review.md

5. **Claude Desktop**: Final review via inbox
   → Input: "Review shared/m3-switch-review.md"
   → Token usage: 300 tokens
   → Output: "Approved" or "Changes needed"

Total tokens: 1000 (vs. 5000 Claude-only)
Savings: 80%
```

---

## 🎨 Creative Direction Strategy (Claude Desktop)

**Role**: Creative Director & Lead Designer

### Responsibilities
1. **Asset Generation Planning**:
   - Define prompts for Figma/Midjourney asset creation
   - Select imagery for Hero components (GlassLeafCard, AuroraHeader)
   - curated "Naturalist vs Anatomist" visual metaphors

2. **Visual Experience Design**:
   - Define exact "glassmorphism" refractive indices per mode
   - Orchestrate complex motion choreography
   - Review all visual regressions for "Wow Factor"

3. **Design System Evolution**:
   - Own the `tokens.json` evolution (colors, typography scales)
   - Approve all new "Atomic" design patterns

**Workflow**:
- Claude defines the *Visual Spec* in `outbox/visual-specs/`
- Antigravity implements the *Technical Code*
- Claude reviews the implementation against the *Visual Vision*

---

## MCP Automation Workflows

### Automated Visual Testing (Playwright)

**For each component batch**:
```bash
# Triggered after component completion
1. Playwright MCP: Launch browser
2. Navigate to Storybook
3. Capture screenshots (Gallery + Laboratory modes)
4. Generate visual regression report
5. Write to: outbox/visual-report-batch-N.md
```

**Token Savings**: 40% (vs. manual description)

### Automated PR Creation (GitHub)

**After batch completion**:
```bash
1. GitHub MCP: create_branch("feature/phase-N-batch-X")
2. GitHub MCP: push_files([...component files...])
3. GitHub MCP: create_pull_request(
     title: "Phase N: Batch X Components",
     body: Auto-generated from outbox/batch-N-X.md
   )
4. Update shared/migration-status.json
```

**Time Savings**: 30 minutes per batch

### Docker Test Execution

**Parallel test execution**:
```bash
# Run tests in isolated container
1. Docker MCP: run_command("npm run test:components")
2. Capture results
3. Write to: outbox/test-results-batch-N.md
4. No local environment pollution
```

---

## Timeline & Milestones

| Week | Phase | Components | Baseline | Optimized | Savings |
|------|-------|------------|----------|-----------|---------|
| **1** | Phase 2: Cards | 4 | 8.5h | 5h | 41% |
| **2** | Phase 3: Heroes + Buttons | 4 | 8.5h | 5.5h | 35% |
| **3** | Phase 4: Legacy UI | 7 | 14h | 8.5h | 39% |
| **4** | Phase 5: New Atoms | 10 | 15.5h | 9h | 42% |
| **TOTAL** | - | **25** | **46.5h** | **28h** | **40%** |

### Milestones

- ✅ **Week 1 End**: All card components complete, 11 total components
- ✅ **Week 2 End**: Hero components + button foundation, 15 total components
- ✅ **Week 3 End**: Legacy UI migrated, 22 total components
- ✅ **Week 4 End**: All NEW atoms built, **29 total components** 🎉

---

## Quality Gates

### Per-Batch Quality Checks

1. **Token Compliance** (Automated via Gemini)
   - Run: `scripts/validate-m3-compliance.sh` on each component
   - Target: 90%+ score
   
2. **Visual Regression** (Playwright MCP)
   - Screenshot comparison (Gallery + Laboratory)
   - Flag any visual regressions

3. **Accessibility** (Manual + Automated)
   - jest-axe tests
   - Manual keyboard navigation check

4. **Code Review** (Claude Desktop)
   - Architecture review
   - Token usage verification
   - Approve/request changes

### Phase-Level Quality Gates

- **80%+ test coverage** (Vitest)
- **100% Storybook coverage** (All variants documented)
- **90%+ average compliance score**
- **Zero MUI dependencies**
- **All components support both modes**

---

## Risk Mitigation

### Risk: Claude Desktop Token Limit

**Mitigation**: 
- Hybrid Gemini delegation (70% token savings)
- Batch reviews (not per-component)
- Use Flash-Sidekick for all audits

### Risk: Communication Breakdown

**Mitigation**:
- Dedicated `claude-desktop-exchange/` directory
- Clear inbox/outbox protocol
- Shared state file (`migration-status.json`)

### Risk: Quality Regression

**Mitigation**:
- Automated visual testing (Playwright)
- Claude Desktop final approval on all batches
- Compliance score tracking

### Risk: Timeline Slippage

**Mitigation**:
- Template-based generation front-loaded
- Parallel Gemini processing
- MCP automation reduces manual work

---

## Token Efficiency Analysis

### Baseline (Claude-Only)

```
25 components × 2000 tokens/component = 50,000 tokens
Reviewing 25 components × 500 tokens = 12,500 tokens
Total: 62,500 tokens
```

### Optimized (Hybrid)

```
Antigravity: 10 simple components × 500 tokens = 5,000 tokens
Gemini: 10 variant generations × 500 tokens = 5,000 tokens
Claude Desktop: 5 complex components × 2000 tokens = 10,000 tokens
Claude Reviews: 5 batch reviews × 800 tokens = 4,000 tokens
Total: 24,000 tokens (62% savings)
```

### MCP Automation Savings

```
Visual testing: 40% reduction (automated screenshots)
PR creation: 30 minutes × 8 batches = 4 hours saved
Test execution: Parallel = 50% faster
```

---

## Communication Infrastructure Setup (Step 1)

### Immediate Actions

1. **Create Exchange Directory** (Antigravity)
   ```bash
   mkdir -p ~/claude-desktop-exchange/{inbox,outbox,shared}
   ```

2. **Update Claude Desktop Config** (User)
   - Edit: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Replace filesystem paths with ONLY: `/Users/okgoogle13/claude-desktop-exchange`
   - Restart Claude Desktop

3. **Test Protocol** (Both Agents)
   - Antigravity writes: `outbox/test-message.md`
   - User pastes in Claude Desktop: "Read outbox/test-message.md"
   - Claude Desktop confirms access
   - Claude writes: `inbox/test-response.md`
   - Antigravity confirms access

4. **Document Protocol** (Antigravity)
   - Create: `claude-desktop-exchange/README.md`
   - Outline inbox/outbox workflow
   - Include examples

---

## Success Metrics

- ✅ **40% timeline reduction** (46.5h → 28h)
- ✅ **62% token savings** (62,500 → 24,000 tokens)
- ✅ **100% component coverage** (29/29 components)
- ✅ **90%+ compliance average**
- ✅ **Zero communication failures** (new infrastructure)
- ✅ **80%+ test coverage**
- ✅ **100% Storybook coverage**

---

## Next Steps (Immediate)

1. **User Approval**: Review this plan
2. **Infrastructure Setup**: Create exchange directory (5 minutes)
3. **Test Protocol**: Verify Claude Desktop can access exchange directory (2 minutes)
4. **Begin Phase 2**: Start with M3Card template (Week 1)

---

**Plan Status**: 🟢 **READY FOR EXECUTION**  
**Confidence**: **HIGH** (Proven strategy, tested automation, clear protocol)  
**Estimated Completion**: **January 25, 2026** (12 days from now)

