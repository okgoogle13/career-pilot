# Claude Desktop Review Prompt — Integration System & Migration Strategy

**Date**: 2026-01-14  
**Context**: Antigravity has implemented IDE-Claude Desktop integration and completed Phase 1 component migration  
**Your Role**: Review, audit, and strategize for rapid batch migration

---

## 🎯 Your Mission

You are Claude Desktop, reviewing work completed by Antigravity (IDE agent). Your tasks:

1. **Review Integration System** — Validate the automation workflow
2. **Audit Phase 1 Components** — Use custom skills to check compliance
3. **Verify Design Tokens** — Ensure completeness (especially motion tokens)
4. **Propose Master Plan** — Strategy for rapid batch migration of remaining 25 components

---

## 📋 Task 1: Review Integration System

### Read the Implementation
**File**: `file:///Users/okgoogle13/.gemini/antigravity/brain/b2eed20f-fec0-4bc8-b141-ce9ebab15e76/integration_implementation_walkthrough.md`

### Questions to Answer
1. ✅ Does the `.migration/` directory structure make sense?
2. ✅ Are the automation scripts (`queue-for-review.sh`, `approve-component.sh`, `request-changes.sh`) well-designed?
3. ✅ Will the workflow eliminate manual copy-paste effectively?
4. ⚠️ Are there any edge cases or failure modes?
5. 💡 What optimizations would improve the system?

### Test the System
```bash
# Check queue
cat .migration/queue.json | jq '.queue'

# Review queued items
cat .migration/reports/M3TextField_report.md
cat .migration/reports/DesignTokens-CriticalFixes_report.md
```

### Provide Feedback
- **Confirm**: System works as designed
- **Suggest**: Any improvements or optimizations
- **Flag**: Any issues or concerns

---

## 🔍 Task 2: Audit Phase 1 Components (Use Custom Skills)

### Components to Review

#### 1. M3TextField
**File**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/ui/M3TextField.tsx`  
**Stories**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/ui/M3TextField.stories.tsx`  
**Reported Score**: 95/100

**Use Skill**: `component-transformer` or `design-compliance-dashboard`

**Check**:
- [ ] Northcote token usage (no hardcoded colors/spacing)
- [ ] Gallery/Laboratory mode implementation
- [ ] WCAG 2.1 Level AA compliance (focus outline, ARIA labels)
- [ ] Motion token usage (`ease-viscous`, `duration-fast`)
- [ ] Organic asymmetry shapes (`radius-stone`, `rounded-[...]`)
- [ ] Floating label animation
- [ ] 80% character counter warning

#### 2. M3Select
**File**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/ui/M3Select.tsx`  
**Stories**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/ui/M3Select.stories.tsx`  
**Reported Score**: 90/100

**Check**:
- [ ] Keyboard navigation (Arrow Up/Down, Enter, Escape)
- [ ] Dropdown animation using motion tokens
- [ ] ARIA attributes (`aria-expanded`, `aria-required`)
- [ ] Mode switching
- [ ] Floating label

#### 3. M3Checkbox
**File**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/ui/M3Checkbox.tsx`  
**Reported Score**: 90/100

**Check**:
- [ ] Indeterminate state support
- [ ] Check animation (scale + fade)
- [ ] M3Radio variant included
- [ ] Focus outline
- [ ] Mode variants

#### 4. StatusBadge
**File**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/ui/StatusBadge/StatusBadge.tsx`  
**Reported Score**: 85/100

**Check**:
- [ ] MUI dependency removed (critical)
- [ ] 5 semantic variants (success, warning, error, info, neutral)
- [ ] Hover animation
- [ ] Organic asymmetry shapes
- [ ] Mode support

### Output Format
For each component, provide:
```markdown
## Component: M3TextField
**Compliance Score**: XX/100 (verified)
**Issues Found**: 
- Issue 1
- Issue 2
**Recommendations**:
- Recommendation 1
- Recommendation 2
**Approval Status**: ✅ Approved / ⚠️ Needs Changes
```

---

## 🎨 Task 3: Verify Design Token Completeness

### Files to Audit
1. **`file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/theme/tokens.json`**
2. **`file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/theme/design-tokens.css`**
3. **`file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/theme/motion-tokens.json`**
4. **`file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/theme/motion-presets.ts`**

### Critical Checks

#### ✅ Recently Added (Verify)
- [ ] `typography.scale.displayHero` — 72px, Libre Bodoni, for landing proclamations
- [ ] `typography.metricDisplay` — 100 weight, Fraunces, for large numerals
- [ ] `color.etching.lineStrong` — Laboratory border color

#### ✅ Motion Tokens (Verify Complete)
- [ ] Spring physics parameters (stiffness, damping, mass)
- [ ] Easing curves (`ease-viscous`, `ease-precise`, `ease-settle`, `ease-snap`)
- [ ] Duration scale (`duration-micro`, `duration-fast`, `duration-standard`, `duration-moderate`, `duration-slow`)
- [ ] Interaction patterns (hover, focus, active, disabled)
- [ ] Mode-specific overrides (Gallery vs Laboratory)
- [ ] Reduced motion support

#### ❓ Gaps to Identify
- [ ] Missing typography scales?
- [ ] Missing color tokens?
- [ ] Missing shape tokens?
- [ ] Missing motion patterns?
- [ ] Inconsistent naming?

### Output Format
```markdown
## Design Token Audit

### ✅ Complete
- Token category: Details

### ⚠️ Gaps Found
- Missing token: Reason needed

### 💡 Recommendations
- Suggestion 1
- Suggestion 2
```

---

## 🚀 Task 4: Propose Master Plan for Rapid Batch Migration

### Context
**Remaining Components**: 25 (15 [LEGACY], 10 [NEW])  
**Estimated Time**: 49.5 hours (current plan)  
**Goal**: Optimize for speed without sacrificing quality

### Component Inventory
**File**: `file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/COMPONENT_INVENTORY.md`

### Your Strategy Should Address

#### 1. Prioritization
- Which components should be migrated first?
- Can we parallelize any work?
- Which components can be deferred?

#### 2. Batching Strategy
- Group components by similarity (e.g., all form inputs together)
- Identify reusable patterns
- Create component templates

#### 3. Automation Opportunities
- Can we generate boilerplate code?
- Can we batch-apply common patterns?
- Can we use AI to accelerate migration?

#### 4. Quality Gates
- How to ensure consistency across batches?
- Testing strategy for rapid migration
- Compliance verification process

#### 5. Timeline Optimization
- Current estimate: 49.5 hours
- Target estimate: ? hours
- How to achieve 30-50% time reduction?

#### 6. **Complex Component Batching** 🎯
**Critical Consideration**: More complex components should be batched together and completed by Claude Desktop (not Antigravity).

**Complex Components to Identify**:
- Components with intricate state management
- Components requiring advanced animations
- Components with complex accessibility requirements
- Components with multiple interaction patterns

**Rationale**:
- Claude Desktop has deeper reasoning capabilities for complex logic
- Can handle multi-file refactoring more effectively
- Better at identifying edge cases and accessibility issues
- More efficient for components requiring extensive documentation

**Your Task**:
- Identify which components are "complex" (e.g., chart, table, form, alert-dialog)
- Group them into a "Claude Desktop Batch"
- Estimate time savings vs. Antigravity handling them
- Propose workflow: Antigravity handles simple atoms, Claude Desktop handles complex molecules/organisms

#### 7. **Token Utilization Efficiency** 💰
**Critical Consideration**: Maximize efficiency to minimize token usage across both agents.

**Context**: Antigravity uses **Gemini 2.0 Flash** with generous token limits (200K input context), allowing for more comprehensive context and fewer fragmented operations. Claude Desktop should factor this into the plan—Antigravity can handle larger batches and more context-heavy operations efficiently.

**Strategies to Consider**:
1. **Template-Based Generation**
   - Create reusable component templates
   - Reduce repetitive prompting
   - Example: "All form inputs follow this pattern..."

2. **Batch Operations**
   - Process similar components in single context
   - Example: Migrate all 5 form inputs together
   - Share common patterns across batch

3. **Reference Documentation**
   - Create concise "migration checklists"
   - Use as reference instead of re-explaining
   - Example: "Follow Phase 1 pattern for all atoms"

4. **Incremental Context**
   - Don't re-read entire files unnecessarily
   - Use targeted edits (multi_replace_file_content)
   - Only view relevant sections

5. **AI-Generated Boilerplate**
   - Use AI to generate repetitive code (stories, tests)
   - Human review for quality
   - Example: "Generate Storybook stories for all Phase 2 components"

6. **Parallel Processing**
   - Antigravity handles simple components
   - Claude Desktop handles complex components
   - Minimize context switching

**Your Task**:
- Estimate token usage for current approach
- Propose optimized approach with token savings
- Identify highest-impact efficiency gains
- Suggest specific techniques for each component batch

#### 8. **MCP Server Integration & Automation** 🔌
**Critical Consideration**: Claude Desktop has access to MCP servers (Playwright, GitHub, Docker) that can dramatically improve efficiency and enable powerful automations.

**Available MCP Servers**:
1. **GitHub MCP** — Repository operations, PR creation, file management
2. **Docker MCP** — Container operations, service management
3. **Playwright** — Browser automation, visual testing
4. **Storybook** — Component documentation (via browser)

**Automation Strategies to Propose**:

1. **Automated Visual Testing**
   - Use Playwright MCP to capture component screenshots
   - Compare before/after migration visually
   - Generate visual regression reports
   - Example: "After migrating M3Card, capture screenshots in both Gallery and Laboratory modes"

2. **Storybook Integration**
   - Use browser automation to verify Storybook builds
   - Auto-generate story files using templates
   - Validate component variants render correctly
   - Example: "Generate stories for all Phase 2 components, then verify via Playwright"

3. **GitHub Automation**
   - Create PRs automatically for component batches
   - Use GitHub MCP to push migration branches
   - Auto-generate PR descriptions with compliance scores
   - Example: "Create PR for Phase 2 Structure components with auto-generated checklist"

4. **Docker Development Environment**
   - Use Docker MCP to run tests in isolated containers
   - Verify builds without polluting local environment
   - Run parallel test suites
   - Example: "Run Vitest in Docker container for each component batch"

5. **End-to-End Migration Pipeline**
   ```
   1. Claude Desktop: Migrate component batch (5 components)
   2. GitHub MCP: Create feature branch, push changes
   3. Docker MCP: Run tests in container
   4. Playwright MCP: Capture visual screenshots
   5. GitHub MCP: Create PR with results
   6. Antigravity: Review and approve
   ```

6. **Token Efficiency via Automation**
   - **Before**: Manually describe test results, manually verify Storybook
   - **After**: Use MCP to run tests, capture results, include in context
   - **Savings**: 30-40% token reduction by automating verification

**Your Task**:
- Identify which components benefit most from automated testing
- Propose specific MCP automation workflows for each phase
- Estimate token savings from automation vs. manual verification
- Suggest integration points between Antigravity and Claude Desktop via MCP
- Design a "one-command migration" workflow using MCP servers

**Example Workflow**:
```bash
# Claude Desktop executes:
1. Migrate M3Card, TechCard, MetricCard (batch)
2. mcp_github_create_branch("feature/phase2-cards")
3. mcp_github_push_files([...card files...])
4. mcp_docker_run_command("npm run test:cards")
5. mcp_browser (Storybook): Capture screenshots
6. mcp_github_create_pull_request("Phase 2: Card Components", body_with_results)
7. Update .migration/queue.json
```

#### 9. **Hybrid Claude + Gemini Strategy** 🤝
**Critical Consideration**: You have access to Flash-Sidekick MCP, which provides Gemini 2.0 Flash capabilities. Use this strategically to maximize token efficiency and leverage the strengths of both models.

**Available Flash-Sidekick Tools**:
1. **`consult_pro`** — Deep reasoning/coding (Gemini 2.0 Flash Thinking)
2. **`quick_summarize`** — Fast text summarization
3. **`validate_token_compliance`** — Component token audit
4. **`suggest_token_improvements`** — Token optimization suggestions
5. **`generate_component_variant`** — Component generation from base
6. **`analyze_figma_component`** — Design analysis

**When to Use Claude vs. Gemini**:

| Task Type | Use Claude | Use Gemini (Flash-Sidekick) | Reason |
|-----------|------------|----------------------------|---------|
| Strategic planning | ✅ | ❌ | Claude excels at high-level reasoning |
| Code review | ✅ | ❌ | Claude better at nuanced feedback |
| Large file summarization | ❌ | ✅ | Gemini: 200K context, faster, cheaper |
| Token compliance audit | ❌ | ✅ | Gemini: Pattern matching, bulk analysis |
| Repetitive component generation | ❌ | ✅ | Gemini: Fast generation from templates |
| Deep architectural reasoning | ✅ | ✅ (consult_pro) | Both capable, use Gemini to save tokens |
| Final approval decisions | ✅ | ❌ | Claude maintains quality control |

**Token Efficiency Strategies**:

1. **Offload Summarization** (80-90% savings)
   ```
   Instead of: Reading entire 1000-line component in Claude context
   Use: mcp_flash-sidekick_quick_summarize(component_content)
   Result: Gemini returns 100-word summary
   ```

2. **Delegate Compliance Audits** (60-70% savings)
   ```
   Instead of: Claude analyzing each component for token compliance
   Use: mcp_flash-sidekick_validate_token_compliance(component_code)
   Result: Gemini returns compliance report with violations
   ```

3. **Batch Component Generation** (70-80% savings per variant)
   ```
   Instead of: Claude generating 5 similar form components
   Use: mcp_flash-sidekick_generate_component_variant(base_component, variant_spec)
   Result: Gemini generates variants, Claude reviews final output
   ```

4. **Deep Reasoning Offload** (50-60% savings)
   ```
   Instead of: Claude doing complex architectural analysis
   Use: mcp_flash-sidekick_consult_pro(query, context)
   Result: Gemini 2.0 Flash Thinking handles heavy computation
   ```

**Recommended Hybrid Workflow**:

```markdown
# Phase 2 Component Migration (Example: 5 Form Components)

## Step 1: Batch Analysis (Gemini)
- Use validate_token_compliance on all 5 components
- Use quick_summarize on each component's current state
- Token cost: ~500 tokens (vs. 2500 with Claude)

## Step 2: Strategic Planning (Claude)
- Review Gemini's compliance reports
- Make architectural decisions
- Define migration strategy
- Token cost: ~800 tokens

## Step 3: Component Generation (Gemini)
- Use generate_component_variant for similar components
- Use consult_pro for complex logic
- Token cost: ~1000 tokens (vs. 5000 with Claude)

## Step 4: Quality Review (Claude)
- Review Gemini's generated components
- Make final refinements
- Approve for production
- Token cost: ~700 tokens

Total: ~3000 tokens (vs. 10,000+ tokens Claude-only)
Savings: 70% token reduction
```

**When You're at 70-80% Token Limit**:

1. **Identify Heavy Tasks**:
   - Large file analysis → `quick_summarize`
   - Token compliance → `validate_token_compliance`
   - Repetitive generation → `generate_component_variant`
   - Complex reasoning → `consult_pro`

2. **Delegate to Gemini**:
   - Gemini processes heavy workload
   - Returns concise results to Claude
   - Claude reviews with minimal token usage

3. **Claude Maintains Control**:
   - Final approval decisions
   - Quality assurance
   - Strategic direction

**Your Task**:
- Identify which migration tasks are best suited for Gemini delegation
- Propose specific Flash-Sidekick workflows for each phase
- Estimate token savings from hybrid approach vs. Claude-only
- Design handoff points between Claude and Gemini
- Suggest when to escalate from Gemini back to Claude

**Example: M3TextField Migration**
```
1. Gemini: validate_token_compliance(M3TextField.tsx)
   → Returns: "3 violations: hardcoded colors, missing motion tokens"
   
2. Gemini: quick_summarize(M3TextField.tsx)
   → Returns: "Material 3 text input with floating label, 200 lines"
   
3. Claude: Review reports, decide migration strategy
   
4. Gemini: generate_component_variant(base_template, M3TextField_spec)
   → Returns: New component with token compliance
   
5. Claude: Review, refine, approve
   
Token usage: 650 tokens (vs. 2900 Claude-only)
Savings: 77%
```

### Output Format
```markdown
# Master Plan: Rapid Batch Component Migration

## Executive Summary
- **Goal**: Migrate 25 components in X hours (Y% faster)
- **Strategy**: [High-level approach]
- **Key Innovation**: [What makes this fast]

## Phase Breakdown

### Week 1: [Phase Name] (X hours)
**Components**: [List]
**Rationale**: [Why these first]
**Deliverables**: [What gets done]

### Week 2: [Phase Name] (X hours)
...

## Automation Strategy
1. **Template Generation**: [Details]
2. **Batch Operations**: [Details]
3. **AI Assistance**: [Details]

## Quality Assurance
- **Per-Component**: [Checks]
- **Per-Batch**: [Checks]
- **Final Audit**: [Checks]

## Risk Mitigation
- **Risk 1**: [Mitigation]
- **Risk 2**: [Mitigation]

## Success Metrics
- [ ] All 25 components migrated
- [ ] 90%+ average compliance score
- [ ] 100% Storybook coverage
- [ ] 80%+ test coverage
- [ ] Completed in X hours (Y% under estimate)
```

---

## 📝 Deliverables

Please provide:

1. **Integration System Review** (1-2 paragraphs)
   - Confirmation it works
   - Suggested optimizations

2. **Phase 1 Component Audit** (1 page)
   - Compliance scores verified
   - Issues found
   - Approval/rejection decisions

3. **Design Token Audit** (1 page)
   - Completeness check
   - Gaps identified
   - Recommendations

4. **Master Migration Plan** (2-3 pages)
   - Detailed strategy
   - Timeline optimization
   - Automation approach

---

## 🛠️ Tools at Your Disposal

### Custom Skills
- `component-transformer` — Analyze and transform components
- `design-compliance-dashboard` — Generate compliance reports
- `component-builder` — Scaffold new components

### Automation Scripts
```bash
# Approve components
./scripts/approve-component.sh M3TextField

# Request changes
./scripts/request-changes.sh M3Select "Add keyboard navigation docs"

# Check queue
cat .migration/queue.json | jq '.queue'
```

### Reference Files
- Component Inventory: `file:///.../COMPONENT_INVENTORY.md`
- Motion Guidelines: `file:///.../docs/MOTION_GUIDELINES.md`
- Testing Guide: `file:///.../docs/TESTING_GUIDE.md`

---

## 🎯 Success Criteria

- ✅ Integration system validated
- ✅ Phase 1 components audited and approved
- ✅ Design tokens verified complete
- ✅ Master plan reduces timeline by 30-50%
- ✅ Quality gates maintain 90%+ compliance

---

**Ready to begin?** Start with Task 1 (Integration System Review) and work through sequentially.
