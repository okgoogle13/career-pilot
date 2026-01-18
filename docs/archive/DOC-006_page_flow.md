# DOC-006: Page-by-Page Component & Token Flow

**Document ID:** DOC-006-PAGE-FLOW  
**Version:** 1.1 (Enhanced 11-Page Architecture)  
**Status:** Implementation Roadmap (Hybrid: Live + Planned)  
**System:** CareerCopilot v5.0  
**Traceability:** Maps [LOGIC-XX] states to [UI-XX] components and [TOKEN-XX] design values.

> [!IMPORTANT]
> This document shows the full **envisioned architecture**. Components are marked as **✅ LIVE** (implemented) or **🔷 PLANNED** (roadmap).

---

## Phase 0: Entry & Onboarding

### 1. Landing Page
**Route:** `/` ([LandingPage.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/landing/LandingPage.tsx)) **✅ LIVE**  
**Primary Goal:** Communicate the "Logic-First" value proposition and the Australian Selection Criteria solution.

#### Core Components
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-001]** | Value Prop Hero | ✅ LIVE | `features/landing/LandingPage.tsx` |
| **[UI-COMP-002]** | Interactive Roadmap | 🔷 PLANNED | N/A |

#### Active Tokens [TOKEN-PAGE-00]
- **CTA Button:** `bg-secondary` (Terracotta) for "Get Started"
- **Background:** `bg-surface-canvas` (`#121212`) with plasma animation overlay
- **Typography:** `.text-hero` (implemented as **Banksia Composition**: Amstelvar Trunk + Recursive Vine with parametric axes)

---

### 2. Authentication & Onboarding
**Route:** `/login`, `/register` ([Login.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/auth/Login.tsx), [Register.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/auth/Register.tsx)) **✅ LIVE**  
**Primary Goal:** Secure entry and initial industry taxonomy setup.

#### Core Components
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-003]** | Firebase Auth Portal | ✅ LIVE | `features/auth/Login.tsx` |
| **[UI-COMP-004]** | Professional Persona Setup | 🔷 PLANNED | N/A |

#### Active Tokens [TOKEN-PAGE-00]
- **Focus Rings:** `border-primary` (2px Eucalyptus Sage) for accessibility
- **Card Container:** `.tech-card` with glassmorphism overlay

---

## Phase 1: The Career Brain (Data Ingestion)

### 3. The Ingestion Dashboard
**Route:** `/career/ingest` ([IngestionPage.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/pages/IngestionPage.tsx)) **✅ LIVE**  
**Primary Goal:** Bulk data entry with zero friction.

#### Core Components [UI-PAGE-01]
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-101]** | Multi-File Drag-and-Drop | ✅ LIVE | `pages/IngestionPage.tsx` |
| **[UI-COMP-102]** | Real-time Parsing Indicator | ✅ LIVE | Implemented via Genkit flows |
| **[UI-COMP-103]** | `SplitHeader` | ✅ LIVE | `components/shared/SplitHeader.tsx` |

#### Active Tokens [TOKEN-PAGE-01]
- **Background:** `bg-surface-canvas` (`#121212`)
- **Container:** `.tech-card` (`#1E1E1E`) with `bg-dot-grid`
- **Typography:** `font-trunk` (Amstelvar Black wdth:125 wght:900), `font-vine` (Recursive CASL:1 CRSV:1) — **Banksia Composition** applied to Drop Zone
- **Feedback:** `text-primary` (Eucalyptus Sage) on successful parsing

---

### 4. The Reconciliation Workspace
**Route:** N/A **🔷 PLANNED**  
**Primary Goal:** Conflict resolution and authentic voice capture.

#### Core Components
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-103]** | Side-by-Side Resolver | 🔷 PLANNED | N/A |
| **[UI-COMP-104]** | Voice Capture Interface | 🔷 PLANNED | N/A |

#### Active Tokens [TOKEN-PAGE-01]
- **Conflict Warning:** `text-secondary` (Terracotta) for unresolved conflicts
- **Approved State:** `text-primary` (Sage)

---

### 5. The Integration Hub
**Route:** `/settings` ([Settings.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/settings/Settings.tsx)) **⚠️ PARTIAL**  
**Primary Goal:** Third-party ecosystem connectivity.

#### Core Components
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-105]** | OAuth Management Center | 🔷 PLANNED | N/A |
| **[UI-COMP-106]** | Task Manager Bridge | 🔷 PLANNED | N/A |

#### Active Tokens [TOKEN-PAGE-01]
- **Integration Cards:** `.tech-card` with `border-white/5`
- **Spacing:** `TOKEN-GUTTER` (32px between sections)

---

## Phase 2: The Sentry (Opportunity Capture)

### 6. Extension & Sentry Management
**Route:** `/opportunities` ([Opportunities.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/opportunities/Opportunities.tsx)) **✅ LIVE**  
**Primary Goal:** Configure automated and manual job harvesting.

#### Core Components [UI-PAGE-02]
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-201]** | `JobMatchCard` | ✅ LIVE | `features/opportunities/JobMatchCard.tsx` |
| **[UI-COMP-202]** | Email Inbox Watcher Config | 🔷 PLANNED | N/A |
| **[UI-COMP-203]** | `StatusPill` | ✅ LIVE | `components/shared/StatusPill` (concept) |

#### Active Tokens [TOKEN-PAGE-02]
- **Header:** **Banksia Composition** (Amstelvar + Recursive)
- **Urgency:** `text-secondary` (Terracotta) for < 48h deadlines
- **Match Score:** `font-data` (JetBrains Mono) for percentage displays
- **Action Button:** `.btn-pebble` + `bg-secondary`
- **Grid:** `gap-6` (24px standard)

---

## Phase 3: The Laboratory (Optimization & Audit)

### 7. The Ecosystem Sandbox
**Route:** `/ksc-generator` ([KSCGenerator.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/ksc-generator/KSCGenerator.tsx)) **⚠️ PARTIAL**  
**Primary Goal:** Simultaneous drafting of the "Big Four" documents.

#### Core Components
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-301]** | Split-Screen Markdown Editor | 🔷 PLANNED | N/A |
| **[UI-COMP-302]** | Evidence Library Sidebar | 🔷 PLANNED | N/A |

#### Active Tokens [TOKEN-PAGE-03]
- **Focus Rings:** `border-primary` (2px) for active editing blocks
- **Container:** `.tech-card`

---

### 8. The Global Audit Report
**Route:** `/analysis` ([Analysis.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/analysis/Analysis.tsx)) **✅ LIVE**  
**Primary Goal:** Mathematical verification and the hard "Quality Gate."

#### Core Components [UI-PAGE-03]
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-303]** | S-Global Heatmap / `BreakdownGrid` | ✅ LIVE | `features/analysis/Analysis.tsx` |
| **[UI-COMP-304]** | Quality Gate Interface | 🔷 PLANNED | N/A |
| **[UI-COMP-305]** | `AssetLibrary` | ✅ LIVE | `features/analysis/AssetLibrary.tsx` |

#### Active Tokens [TOKEN-PAGE-03]
- **Score Display:** `font-trunk` (Amstelvar Black wght:900 wdth:120)
- **Warning:** `text-secondary` (Terracotta)
- **Success:** `text-primary` (Eucalyptus Sage) for ≥ 85%
- **Container:** `.tech-card`

---

## Phase 4: The Studio (Aesthetic Generation)

### 9. The Template Gallery
**Route:** N/A **🔷 PLANNED**  
**Primary Goal:** Selection of modular, ATS-compliant designs.

#### Core Components
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-401]** | Modular Theme Selector | 🔷 PLANNED | N/A |
| **[UI-COMP-402]** | Layout Preview | 🔷 PLANNED | N/A |

#### Active Tokens [TOKEN-PAGE-04]
- **Transitions:** User-selected accent colors from token library
- **Border Radius:** `TOKEN-RADIUS` (12px)

---

### 10. The WYSIWYG Designer
**Route:** `/documents` ([Documents.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/documents/Documents.tsx)), `/profile` ([ProfileView.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/profile/ProfileView.tsx)) **✅ LIVE**  
**Primary Goal:** Final brand customization and bot-readability check.

#### Core Components [UI-PAGE-04]
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-403]** | `DocumentCard` | ✅ LIVE | `features/documents/DocumentCard.tsx` |
| **[UI-COMP-404]** | `ProfileView` | ✅ LIVE | `features/profile/ProfileView.tsx` |
| **[UI-COMP-405]** | `NativeAnchor` | ✅ LIVE | `components/shared/NativeAnchor` |

#### Active Tokens [TOKEN-PAGE-04]
- **Headers:** `.text-vine` (Recursive, Cursive Axis)
- **Interactive:** `.btn-pebble` (20px/32px asymmetric)
- **Decoration:** `native-waratah-hanging.png` top-right anchor

---

## Phase 5: The Command Center (Monitoring)

### 11. Application Tracker Dashboard
**Route:** `/tracker` ([ApplicationTracker.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/applications/ApplicationTracker.tsx)), `/dashboard` ([Dashboard.tsx](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/features/dashboard/Dashboard.tsx)) **✅ LIVE**  
**Primary Goal:** Tracking the lifecycle of all active and inbound opportunities.

#### Core Components [UI-PAGE-05]
| Mapping | Component | Status | File Location |
|:---|:---|:---|:---|
| **[UI-COMP-501]** | Kanban Lifecycle Board / `KanbanBoard` | ✅ LIVE | `features/applications/KanbanBoard.tsx` |
| **[UI-COMP-502]** | Inbound Opportunity Feed | ⚠️ PARTIAL | Integrated in `/opportunities` |
| **[UI-COMP-503]** | `Dashboard` Metrics | ✅ LIVE | `features/dashboard/Dashboard.tsx` |

#### Active Tokens [TOKEN-PAGE-05]
- **Columns:** `bg-muted` (`#1E1E1E` with opacity)
- **Status Colors:**
  - Interview: `text-primary` (Sage)
  - Rejected: `text-white/50` (Muted)
- **Typography:** `font-vine` (Recursive CASL:1 CRSV:1) for empty states with rotation
- **Touch Targets:** `TOKEN-TAP-TARGET` (44px minimum)

---

## Feature Implementation Matrix

> [!NOTE]
> This matrix tracks **14 core features** across technical layers. Use this for sprint planning and engineering resource allocation.

### Phase 1: The Brain (Data Ingestion)

| ID | Feature Name | Tech Layer | Page Mapping | Backend | Frontend | Status | Blocker/Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **1.1** | Batch Ingestion | Both | Page 3: Ingestion Dashboard | ✅ LIVE | ✅ LIVE | ✅ **COMPLETE** | Genkit flows + drag-drop UI |
| **1.2** | AI Data Reconciliation | Backend | Page 4: Reconciliation Workspace | ❌ MISSING | 🔷 PLANNED | 🔷 **ROADMAP** | Requires conflict detection logic |
| **1.3** | Authentic Voice Capture | Backend | Page 4: Reconciliation Workspace | ❌ MISSING | 🔷 PLANNED | 🔷 **ROADMAP** | Stylometry analysis module needed |
| **1.4** | Integration Hub | Both | Page 5: Integration Hub | ❌ MISSING | ⚠️ PARTIAL | ⚠️ **BLOCKED** | OAuth connectors not implemented |

### Phase 2: The Sentry (Opportunity Capture)

| ID | Feature Name | Tech Layer | Page Mapping | Backend | Frontend | Status | Blocker/Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **2.1** | Niche Scraper Extension | Frontend | Page 6: Extension & Sentry Mgmt | N/A | ❌ MISSING | 🔷 **ROADMAP** | Browser extension not in repo |
| **2.2** | Email Opp. Harvester | Backend | Page 11: Command Center | ❌ MISSING | 🔷 PLANNED | 🔷 **ROADMAP** | Nylas/Gmail integration needed |
| **2.3** | Deadline Sentinel | Backend | External (Calendar/Tasks) | ❌ MISSING | N/A | 🔷 **ROADMAP** | Task manager bridge required |

### Phase 3: The Laboratory (Optimization & Audit)

| ID | Feature Name | Tech Layer | Page Mapping | Backend | Frontend | Status | Blocker/Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **3.1** | Ecosystem Sandbox | Both | Page 7: Ecosystem Sandbox | ⚠️ PARTIAL | ⚠️ PARTIAL | ⚠️ **IN PROGRESS** | KSC exists, needs split-screen + Evidence Library |
| **3.2** | Weighted Scoring Gate | Backend | Page 8: Global Audit Report | ✅ LIVE | ✅ LIVE | ✅ **COMPLETE** | Gated UI implemented on Page 10 |
| **3.3** | STAR-Method Auditor | Backend | Page 7: Ecosystem Sandbox | ⚠️ PARTIAL | ⚠️ PARTIAL | ⚠️ **IN PROGRESS** | Basic validation exists, needs S/T/A/R scoring |
| **3.4** | Contextual Multiplier | Backend | Page 8: Global Audit Report | ❌ MISSING | 🔷 PLANNED | 🔷 **ROADMAP** | Industry weighting not implemented |
| **3.5** | Industry Taxonomy Mapping | Backend | Page 7: Ecosystem Sandbox | ❌ MISSING | 🔷 PLANNED | 🔷 **ROADMAP** | Requires taxonomy database |

### Phase 4: The Studio (Aesthetic Generation)

| ID | Feature Name | Tech Layer | Page Mapping | Backend | Frontend | Status | Blocker/Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **4.1** | Modular Template Gallery | Frontend | Page 9: Template Gallery | N/A | ❌ MISSING | 🔷 **ROADMAP** | Theme carousel not built |
| **4.2** | "Parser View" Toggle | Frontend | Page 10: WYSIWYG Designer | N/A | ❌ MISSING | 🔷 **ROADMAP** | ATS text layer visualization |
| **4.3** | Text-Layered PDF Export | Backend | Page 10: WYSIWYG Designer | ⚠️ PARTIAL | ✅ LIVE | ⚠️ **PARTIAL** | Basic PDF gen exists, needs PDF/A-3 compliance |

### Phase 5: Command Center (Monitoring)

| ID | Feature Name | Tech Layer | Page Mapping | Backend | Frontend | Status | Blocker/Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **5.1** | Lifecycle Kanban Board | Both | Page 11: Command Center | ✅ LIVE | ✅ LIVE | ✅ **COMPLETE** | Firestore + drag-drop UI |
| **5.2** | One-Click Outreach | Both | Page 11: Command Center | ❌ MISSING | ❌ MISSING | 🔷 **ROADMAP** | Email template system needed |

---

### Feature Status Summary

| Status | Count | Percentage |
|:---|:---:|:---:|
| ✅ **COMPLETE** | 2 / 14 | 14% |
| ⚠️ **PARTIAL / IN PROGRESS** | 5 / 14 | 36% |
| 🔷 **ROADMAP** | 7 / 14 | 50% |

### Critical Path Dependencies

> [!WARNING]
> **Logic-First Guardrail**: Feature 3.2 (Weighted Scoring Gate) is a **hard blocker** for Page 10 (WYSIWYG Designer). The system must not render the visual editor until the backend validates `S_global >= 85%`.

**Recommended Build Order:**
1. **Feature 3.2** → Complete backend gate + frontend lock UI
2. **Feature 3.1** → Unlock split-screen editing workflow
3. **Feature 1.4** → Enable automated opportunity harvesting
4. **Feature 4.1** → Unlock Studio phase aesthetic generation

---

## Summary Traceability Table

| Page | State (Logic) | Logic Gate | React Route | Key Components | Status |
|:---|:---|:---|:---|:---|:---|
| **Landing** | `UNAUTHENTICATED` | None | `/` | `LandingPage` | ✅ LIVE |
| **Auth** | `AUTHENTICATING` | `on auth_complete` | `/login` | `Login` | ✅ LIVE |
| **Brain** | `IDLE` → `INGESTING` | `on file_upload` | `/career/ingest` | `IngestionPage` | ✅ LIVE |
| **Reconcile** | `CONFLICTED` | `on manual_review` | N/A | - | 🔷 PLANNED |
| **Integration** | `CONNECTING` | `on oauth_grant` | `/settings` | `Settings` | ⚠️ PARTIAL |
| **Sentry** | `MONITORING` | `on extension_install` | `/opportunities` | `JobMatchCard` | ✅ LIVE |
| **Sandbox** | `DRAFTING` | `if job_selected` | `/ksc-generator` | `KSCGenerator` | ⚠️ PARTIAL |
| **Audit** | `VALIDATING` | `if S_global >= 85%` | `/analysis` | `ScoreGauge` | ✅ LIVE |
| **Gallery** | `SELECTING` | `on theme_choice` | N/A | - | 🔷 PLANNED |
| **Studio** | `DESIGNING` | `if content_locked` | `/documents` | `DocumentCard` | ✅ LIVE |
| **Tracker** | `ARCHIVED` | `on submit` | `/tracker` | `ApplicationTracker` | ✅ LIVE |

---

## State Machine Definitions (Detailed)

> **These definitions enable Figma prototype automation and developer handover.** Each state includes triggers, effects, and visual behaviors.

### State: Content Locked (Quality Gate)

**Context:** Controls access from Phase 3 (Laboratory) to Phase 4 (Studio)

| Property | Value |
|:---|:---|
| **Trigger** | `if application.audit.global_match_score >= 85` |
| **Scope** | Global — affects navigation, editor, and CTA buttons |

**Effects:**
```javascript
if (score >= 85) {
  // Unlock State
  enable(editor.input);
  enable(button.nav_to_phase_4);
  update(icon.status, 'check_circle', { color: 'Sage' });
  trigger(particle_burst, { type: 'confetti', colors: ['#B4D8AE', '#F0C419'] });
} else {
  // Locked State
  disable(editor.input);
  disable(button.nav_to_phase_4);
  update(icon.status, 'lock_outline', { color: 'white', opacity: 0.4 });
  show(panel.critical_gaps);
}
```

**Visual Behavior:**
| UI Element | Locked (< 85%) | Unlocked (≥ 85%) |
|:---|:---|:---|
| Studio CTA | Dashed border, grey, disabled | Animated gradient, Sage glow, enabled |
| Editor Input | Opacity 60%, non-editable | Full opacity, editable |
| Status Icon | `lock_outline` white 40% | `check_circle` Sage |

---

### State: Selection Criteria Hover (Cross-Reference)

**Context:** Links job requirements to response evidence in split-screen editor

| Property | Value |
|:---|:---|
| **Trigger** | `onHover(opportunity.ksc[id])` |
| **Scope** | Split-screen editor — left pane (requirements) ↔ right pane (responses) |

**Effects:**
```javascript
onHover(opportunity.ksc[id]) {
  // Highlight corresponding response text
  highlight(application.ksc_responses[id].text, {
    style: 'underline',
    color: 'var(--brand-primary)', // Sage #B4D8AE
    animation: 'pulse'
  });
  
  // Apply Authentic Voice comparison styling
  applyVoiceComparisonHighlight(ksc[id], voice_profile);
  
  // Show evidence tooltip
  show(tooltip, {
    text: 'Evidence found in response',
    color: 'Sage',
    position: 'above'
  });
}
```

**Visual Behavior:**
| Hover Target | Highlight Style | Badge |
|:---|:---|:---|
| KSC Requirement | 2px Sage underline | "Matched" (Gem, Sage) |
| Missing Keyword | Terracotta background pulse | "Gap" (Gem, Terracotta) |
| Verified Soft Skill | Sage border glow | "Verified ✓" (Gem, Sage) |

---

### State: Parser Preview Toggle (Bot's View)

**Context:** Shows user exactly what ATS parsers will extract

| Property | Value |
|:---|:---|
| **Trigger** | `onClick(toggle.parser_view)` |
| **Scope** | Document preview pane in Studio/WYSIWYG Designer |

**Effects:**
```javascript
onClick(toggle.parser_view) {
  if (toggle.state === 'OFF') {
    // Switch to Bot's View
    remove(css.all);  // Strip all styling
    apply(font, 'Arial, sans-serif');  // System standard for ATS
    display(raw_text_layer);  // Plain text only
    set(background, '#FFFFFF');  // White (standard doc)
    show(banner, "Bot's View: This is what the ATS reads");
    toggle.state = 'ON';
  } else {
    // Switch to Beautiful View
    restore(css.all);
    apply(font, 'Roboto Flex Variable');  // The Leaf (M3 Expressive)
    set(background, '#1E1E1E');  // Tech Dark
    hide(banner);
    toggle.state = 'OFF';
  }
}
```

**Visual Behavior:**
| Toggle State | Font | Background | Styling |
|:---|:---|:---|:---|
| **OFF** (Beautiful View) | Roboto Flex (font-leaf) | `#1E1E1E` | Full M3 Expressive Typography |
| **ON** (Bot's View) | Arial, system-ui | `#FFFFFF` | None (plain text) |

---

### State: Auto-Save (Atomic Syncing)

**Context:** Background persistence to prevent data loss

| Property | Value |
|:---|:---|
| **Trigger** | `onKeyUp(editor.textarea)` (debounced 500ms) |
| **Scope** | All text input fields in drafting context |

**Effects:**
```javascript
onKeyUp(editor.textarea, debounce(500)) {
  setSaveStatus('saving');
  
  await POST('/api/drafts/save', {
    application_id: currentApplication.id,
    field_id: activeField.id,
    content: activeField.value,
    timestamp: Date.now()
  });
  
  setSaveStatus('saved');
  setTimeout(() => setSaveStatus('idle'), 2000);
}
```

**Visual Behavior:**
| Status | Indicator | Duration |
|:---|:---|:---|
| `idle` | Hidden | — |
| `saving` | "Saving..." (white 50%) + spinner | Until API response |
| `saved` | "✓ Saved" (Sage) + checkmark | Fade out after 2s |
| `error` | "⚠ Save failed" (Terracotta) + retry | Persist until resolved |

---

### State: Global Undo (AI Rewrite Rollback)

**Context:** Safety net for AI-assisted editing

| Property | Value |
|:---|:---|
| **Trigger** | `Cmd+Z` (Mac) or `Ctrl+Z` (Windows) |
| **Scope** | All text areas + AI-generated suggestions + auto-complete insertions |

**Effects:**
```javascript
onKeyboardShortcut('Cmd+Z') {
  if (undoStack.length > 0) {
    const previousState = undoStack.pop();
    redoStack.push(currentState);
    currentState = previousState;
    
    render(currentState);
    showToast('Reverted to previous version', { color: 'Wattle' });
  }
}
```

**Visual Behavior:**
- Toast notification: "Reverted to previous version" (Wattle Gold)
- Undo stack depth: Unlimited (session-based)
- Redo available: `Cmd+Shift+Z`

---

## Legend
- **✅ LIVE**: Component is implemented in the codebase
- **⚠️ PARTIAL**: Component exists but with limited functionality
- **🔷 PLANNED**: Component is in the roadmap, not yet implemented

---

## Appendix A: API & Data Mapping

This section links UI features to their backend counterparts.

| Feature ID | Feature Name | Frontend Component | Backend Endpoint / Flow | Data Model (Firestore) |
|:---|:---|:---|:---|:---|
| **1.1** | Batch Ingestion | `IngestionPage` | `/api/ingest/upload` -> `resume_intelligence_pipeline.py` | `users/{uid}/documents` |
| **2.1** | Job Matching | `JobMatchCard` | `/api/jobs/match` -> `advanced_job_matching.py` | `users/{uid}/opportunities` |
| **3.2** | Scoring Gate | `ScoreGauge` | `/api/analysis/score` -> `ats_scoring.py` | `users/{uid}/analysis_reports` |
| **5.1** | Tracker | `ApplicationTracker` | `/api/applications` | `users/{uid}/applications` |

---
**End of Document 6**
