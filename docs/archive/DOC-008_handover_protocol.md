# DOC-008: Design-to-Code Handover Protocol

**Document ID:** DOC-008-HANDOVER  
**Version:** 1.0  
**Status:** Protocol Definition  
**Context:** Automation of the bridge between Design (Figma/Wireframes) and Code (React/Tailwind).

---

## 1. The Smart Handover Application Strategy

To maximize efficiency and eliminate the "translation gap" between wireframes and the 2026 tech stack, CareerCopilot adopts a **Design-to-Code System** that treats UI as data. 

### Core Pillars

#### 1. The Design Tokens Manifest (JSON)
*   **Concept:** A single source of truth for branding, not a "style guide pdf".
*   **Implementation:** `tailwind.config.ts` acts as the living manifest.
    *   **Colors:** `brand-primary` (Sage), `brand-secondary` (Terracotta), `brand-surface` (Readability), `status-success` (Green), `status-warning` (Orange).
    *   **Spacing:** `TOKEN-GUTTER` (32px) for section separation.
    *   **Shape:** `TOKEN-RADIUS` (12px) for "Pebble" aesthetics and `TOKEN-TAP-TARGET` (44px) for accessibility.
*   **Benefit:** Changing "Studio" branding from Sage to Teal is a 1-line change that propagates instantly to all 11 pages.

#### 2. Component Logic Specification (The "State" Document)
*   **Concept:** Defining *behavior* via Finite State Machines (FSM).
*   **Implementation:** Explicit Logic Gates from `DOC-002`.
    *   **The Audit Gate:** 
        ```javascript
        if (GoldenRecord.active_application.scores.global >= 85) { 
            unlock(Studio) 
        } else {
            lock(Studio);
            show_deficiencies(analysis.gaps);
        }
        ```
    *   **Authentic Voice Gate:** `Voice Match > 0.8` required to exit Phase 1.
*   **Neuro-Inclusive Interactions:**
    *   **Atomic Syncing:** Background save on every keystroke (`[LOGIC-04]`).
    *   **Global Undo:** `Cmd+Z` wired to all agentic rewrites.

#### 3. Annotated Wireflows
*   **Concept:** Mapping Data Schema to UI Elements (Golden Record binding).
*   **Format:** "This text area maps to `application.ksc_responses[id].text`."
*   **Benefit:** Zero ambiguity on data binding.

#### 4. The Component Library
*   **Concept:** Clean separation of Atoms, Molecules, and Organisms.
*   **Implementation:** Figma Dev Mode + React Components (`features/*`).

---

## 2. Page Architecture Consolidation

Cross-referencing the User's "11 Core Pages" with the current `DOC-006` Architecture and Codebase.

| ID | User Definition | Codebase Mapping | Route | Status |
|:---|:---|:---|:---|:---|
| **01** | **The Brain** (Drop Zone) | `IngestionPage.tsx` | `/career/ingest` | ✅ **LIVE** |
| **02** | **Integration Hub** (OAuth) | `Settings.tsx` | `/settings` | ⚠️ **PARTIAL** |
| **03** | **Extension Hub** (Scraper) | `Opportunities.tsx` | `/opportunities` | ✅ **LIVE** |
| **04** | **Opportunity Feed** (Triage) | `JobQueue.tsx` / `JobMatchCard` | `/opportunities` | ⚠️ **PARTIAL** |
| **05** | **The Lab (Editor)** | `KSCGenerator.tsx` | `/ksc-generator` | ⚠️ **PARTIAL** |
| **06** | **The Lab (Audit)** (Heatmap) | `Analysis.tsx` | `/analysis` | ✅ **LIVE** |
| **07** | **The Studio** (Templates) | *Global Theme State* | N/A | 🔷 **PLANNED** |
| **08** | **The Designer** (WYSIWYG) | `Documents.tsx` / `ProfileView` | `/documents` | ✅ **LIVE** |
| **09** | **Command Center** (Kanban) | `ApplicationTracker.tsx` | `/tracker` | ✅ **LIVE** |
| **10** | **Settings** (Taxonomy) | `Settings.tsx` | `/settings` | ⚠️ **PARTIAL** |
| **11** | **Landing Page** | `LandingPage.tsx` | `/` | ✅ **LIVE** |

---

## 3. Annotated Wireframe Summaries (Applied Best Practice)

The following templates apply the "Smart Handover" detailed specification to our most critical pages.

### 3.1 Page 06: The Lab (Audit & Quality Gate)

#### 1. Design Intent & Context
*   **Traceability:** Implements Phase 3 (Laboratory) of `DOC-001`.
*   **User Goal:** Validate that the "Golden Record" meets the 85% Score Threshold to unlock the Studio.
*   **Design System:** Uses `TOKEN-PAGE-03` (Analysis Theme).
*   **Core IDs:** `UI-COMP-303` (Heatmap), `UI-COMP-304` (Gate Interface).

#### 2. Layout Architecture
*   **Global Layout:** 2-Column Dashboard. Left: `ScoreGauge` (Hero). Right: `BreakdownGrid` (Details).
*   **Navigation:** Locked "Next Step" stepper until Gate Pass.
*   **Component Hierarchy:**
    1.  `AuditDial` [UI-COMP-303] (The Gatekeeper)
    2.  `ScoreBreakdown` (The Evidence)
    3.  `ImprovementHints` (The Coach)

#### 3. Data-UI Mapping (The "Golden Thread")
| UI Element Name | Type | JSON Schema Mapping (Key) | Logic/Validation |
|:---|:---|:---|:---|
| Global Score | Gauge (0-100) | `analysis.global_score` | `status-success` if >= 85. |
| STAR Rating | Bar Chart | `analysis.metrics.star_density` | Target: > 3.5 float value. |
| Missing Skills | Badge List | `analysis.gaps.missing_keywords` | `status-warning` pills. Click to "Auto-Fix". |
| Soft Skill | Text Block | `analysis.competencies[i].evidence` | Must show snippet from Resume. |

#### 4. Interaction & State Machine (The "Logic Layer")
*   **State: Analyzing (Loading)**
    *   *Visual:* Plasma pulse animation on the Gauge.
    *   *Interaction:* All inputs disabled.
*   **State: Failure (<85%)**
    *   *Visual:* Gauge glows **Terracotta (`brand-secondary`)**. "Unlock Studio" button is **Disabled**.
    *   *Action:* Showing "Critical Gaps" list prominently.
*   **State: Success (>=85%)**
    *   *Visual:* Gauge glows **Sage (`brand-primary`)**. "Unlock Studio" button becomes **Active** (Pulsing).
    *   *Effect:* Confetti/Leaf particle burst. Route enabled: `/documents`.

#### 5. Specialized AI Considerations
*   **Transparency:** Hovering over the Score reveals the *exact formula* used (Trust signal).
*   **Voice Alignment:** "Linguistic Fingerprint" check running in background; warns if AI probability > 20%.

---

### 3.2 Page 05: The Lab (Editor / Split-Screen)

#### 1. Design Intent & Context
*   **Traceability:** Implements Phase 3 (Laboratory).
*   **Core IDs:** `UI-COMP-301` (Markdown Editor), `UI-COMP-302` (Evidence Library).
*   **User Goal:** Draft high-quality KSC responses using the "Evidence Library".
*   **Device Target:** Desktop (Split View essential).

#### 2. Layout Architecture
*   **Global Layout:** 50/50 Split Pane. Left: Editor. Right: Context/Evidence.
*   **Component Hierarchy:**
    1.  `MarkdownEditor` [UI-COMP-301] (Rich Text)
    2.  `EvidenceSidebar` [UI-COMP-302] (Draggable "Cards")
    3.  `CopilotChat` (Floating assistant)

#### 3. Data-UI Mapping
| UI Element Name | Type | JSON Schema Mapping | Logic/Validation |
|:---|:---|:---|:---|
| Question Header | H3 Label | `opportunity.ksc[id].question` | Sticky header. |
| Response Area | Rich Input | `application.ksc_responses[id].text` | Min 200 words. Word count indicator. |
| Evidence Card | Draggable | `user.history.experiences[i].star_story` | Drag-to-insert functionality. |

#### 4. Interaction & State Machine
*   **Active State:** Typing triggers "Atomic Auto-Save" (debounced 500ms).
*   **Focus State:** Dim the Sidebar when typing (Zen Mode). `brand-primary` focus rings.
*   **Undo:** `Cmd+Z` implemented globally for AI rewrites.

---

### 3.3 Page 01: The Brain (Ingestion)

#### 1. Design Intent & Context
*   **Traceability:** Implements Phase 1 (Ingestion) of `DOC-001`.
*   **Core IDs:** `UI-COMP-101` (Multi-File Drag-and-Drop).
*   **User Goal:** "Drop everything I have and let the AI sort it out."
*   **Design System:** Zero Friction. `TOKEN-PAGE-01`.

#### 2. Layout Architecture
*   **Global Layout:** Single centered Hero Card (`TechCard`).
*   **Component Hierarchy:**
    1.  `DropZone` [UI-COMP-101] (Massive target)
    2.  `FileQueue` [UI-COMP-102] (List of processing items)

#### 3. Data-UI Mapping
| UI Element Name | Type | JSON Schema Mapping | Logic/Validation |
|:---|:---|:---|:---|
| Upload Area | Input (File) | `ingest.pending_files` | Accept: PDF, DOCX, TXT. Max 50MB. |
| Parse Status | Spinner/Icon | `ingest.status` | Enum: `uploading`, `parsing`, `reconciling`, `done`. |
| Skill Extracted | Toast/Pill | `user.skills.detected` | `status-success` pop-up animation. |

#### 4. Interaction & State Machine
*   **State: Idle:** "Drop your Chaos here." (Inviting).
*   **State: Hover (DragOver):** Card expands (scale 1.05), border glows `brand-primary`.
*   **State: Processing:** Progress bar with "Biological" liquid fill animation.

---

## 4. Developer Handover Specifications (Phase 3 → Phase 4)

> **To minimize rework during the design-to-code handover, all wireframes MUST include these "Data-Ready" instructions.**

### 4.1 Serialization Requirements

**The "Audit" button MUST trigger a POST request containing the current state of all text areas:**

```typescript
// POST /api/analysis/audit
interface AuditRequest {
  application_id: string;
  opportunity_id: string;
  ksc_responses: Array<{
    id: string;              // e.g., "ksc-001"
    question: string;        // The Selection Criteria question text
    text: string;            // User's response
    word_count: number;      // Calculated client-side
    last_modified: string;   // ISO timestamp
  }>;
  resume_data: {
    golden_record_id: string;
    skills: string[];
    experiences: Experience[];
  };
  cover_letter_text?: string;
}
```

**Response Contract:**
```typescript
interface AuditResponse {
  validation: 'success' | 'failure';
  global_score: number;           // 0-100
  threshold_met: boolean;         // score >= 85
  metrics: {
    star_density: number;         // D_star formula result
    keyword_match: number;        // % of required keywords matched
    voice_alignment: number;      // Authentic Voice Profile match
  };
  gaps: Array<{
    keyword: string;
    severity: 'critical' | 'warning';
    auto_fix_available: boolean;
  }>;
}
```

### 4.2 Validation Requirements

**Hard Rule:** The frontend MUST prevent navigation to Phase 4 (The Studio) until the API returns `validation: 'success'`.

```typescript
// Route Guard Implementation
const canNavigateToStudio = (auditResult: AuditResponse): boolean => {
  return auditResult.validation === 'success' && auditResult.threshold_met;
};

// UI Behavior
if (!canNavigateToStudio(auditResult)) {
  disableButton('nav-to-studio');
  showPanel('critical-gaps');
}
```

**UI Enforcement:**
- "Unlock the Studio" button: `disabled` attribute + `cursor: not-allowed` until validation success
- Route `/documents` protected by middleware: `if (score < 85) redirect('/analysis')`
- Toast on blocked navigation: "Complete the Quality Gate to continue" (Terracotta)

### 4.3 Font Consistency (Parser Preview)

**Hard Rule:** The `font-family` used in the Parser Preview ("Bot's View") MUST be a system-standard font to guarantee WYSIWYG accuracy with ATS parsers.

| View Mode | Allowed Fonts | Forbidden |
|:---|:---|:---|
| **Beautiful View** (Default) | Amstelvar, Recursive, Fraunces, Roboto Flex | — |
| **Bot's View** (Parser Preview) | `Arial, Helvetica, sans-serif` | All Eucalypt Stack fonts |

**Rationale:** ATS systems use system fonts for text extraction. Showing custom fonts in the Parser Preview would mislead users about how their document will be parsed.

**Implementation:**
```css
.parser-preview-mode {
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 12pt;
  line-height: 1.5;
  color: #000000;
  background: #FFFFFF;
  /* No shadows, gradients, or decorations */
}
```

### 4.4 State Machine Data Bindings

| UI Element | Data Binding | Trigger | State Change |
|:---|:---|:---|:---|
| Global Score Gauge | `analysis.global_score` | `onAuditComplete` | Update arc fill + number |
| Quality Gate Button | `analysis.validation` | `onValidationChange` | Enable/disable + visual |
| STAR Rating | `analysis.metrics.star_density` | `onAuditComplete` | Update bar chart |
| Missing Keywords | `analysis.gaps` | `onAuditComplete` | Render badge list |
| Editor Textarea | `application.ksc_responses[id].text` | `onInput` (debounced 500ms) | Auto-save triggered |
| Parser Toggle | `ui.parser_view_enabled` | `onClick` | Style swap (Beautiful ↔ Bot) |
| Auto-Save Status | `ui.save_status` | `onSaveComplete` | Show/hide indicator |

---

## 5. Appendix: Component ID Reference

All component IDs used in handover documentation:

| ID | Component | Page | Status |
|:---|:---|:---|:---|
| `UI-COMP-101` | Multi-File Drag-and-Drop | The Brain | ✅ LIVE |
| `UI-COMP-102` | Real-time Parsing Indicator | The Brain | ✅ LIVE |
| `UI-COMP-301` | Split-Screen Markdown Editor | The Lab (Editor) | 🔷 PLANNED |
| `UI-COMP-302` | Evidence Library Sidebar | The Lab (Editor) | 🔷 PLANNED |
| `UI-COMP-303` | S-Global Heatmap | The Lab (Audit) | ✅ LIVE |
| `UI-COMP-304` | Quality Gate Interface | The Lab (Audit) | 🔷 PLANNED |
| `UI-COMP-403` | Brand Customizer | The Studio | 🔷 PLANNED |å
| `UI-COMP-404` | Parser View Toggle | The Studio | 🔷 PLANNED |
| `UI-COMP-501` | Kanban Lifecycle Board | Command Center | ✅ LIVE |

---

**End of Document 8**
