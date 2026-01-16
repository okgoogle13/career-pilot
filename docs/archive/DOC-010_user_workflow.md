# DOC-010: Electric Alchemist User Workflow

**Document ID:** DOC-010-WORKFLOW  
**Version:** 1.0  
**Status:** Unified Workflow Definition  
**Sources:** [DOC-006] Page Flow, [DOC-008] Handover Protocol  
**Context:** Defines the end-to-end user journey, testing hooks, component states, and critical branching logic for the "Electric Alchemist" system.

---

## 1. Narrative Journey (The 11-Page Arc)

This journey follows the "Electric Alchemist" metaphor, transforming chaotic input into a "Golden Record" through a series of chemical (logic) phases.

### Phase 0: Entry & Initiation
**1. Landing Page (`/`)**
the user enters the system, greeted by the "Value Prop Hero". A "Plasma Animation" overlay sets the tone. They click **"Get Started"** to begin.
*   *Transition:* User clicks CTA -> Navigates to `/login`.

**2. Authentication (`/login`)**
The user secures their session via Firebase Auth. Upon success, they initialize their "Professional Persona".
*   *Transition:* Auth Success -> Navigates to Phase 1 (`/career/ingest`).

### Phase 1: The Brain (Ingestion & Reconciliation)
**3. Ingestion Dashboard (`/career/ingest`)**
The user drags raw documents (PDF/DOCX) into the **Multi-File Drag-and-Drop** zone. The system creates a "bio-digital" connection, parsing files in real-time.
*   *Logic:* `state: IDLE` -> `state: PROCESSING` (Genkit Pipeline).
*   *Transition:* Parsing Complete -> Check for Conflicts. If Clean -> `/settings`; if Conflicts -> Reconciliation (Planned).

**4. Reconciliation Workspace (Planned)**
*If conflicts exist (e.g., mismatched dates), the user resolves them in a Side-by-Side Resolver.*
*   *Transition:* All Conflicts Resolved -> `/settings`.

**5. Integration Hub (`/settings`)**
The user connects external ecosystems (LinkedIn, Gmail) via the **OAuth Management Center**.
*   *Transition:* Setup Complete -> Navigates to Phase 2 (`/opportunities`).

### Phase 2: The Sentry (Opportunity Capture)
**6. Extension & Sentry Management (`/opportunities`)**
The user configures the "Niche Scraper" and "Email Watcher".
*   *Transition:* Sentry Active -> System begins populating the Opportunity Feed.

**7. Opportunity Feed (in `/opportunities`)**
The user triages incoming job matches in the **JobQueue**. They select a target role to "Attack".
*   *Transition:* User selects a Job -> Navigates to Phase 3 (`/ksc-generator`).

### Phase 3: The Laboratory (Optimization & Audit)
**8. Ecosystem Sandbox (`/ksc-generator`)**
The user drafts the "Big Four" documents using the **Split-Screen Editor**. The **Evidence Library** provides drag-and-drop star stories.  
*   *Logic:* "Atomic Auto-Save" protects every keystroke.
*   *Transition:* User clicks "Analyze" -> Navigates to `/analysis`.

**9. Global Audit Report (`/analysis`)**
**CRITICAL STEP.** The system runs the "Quality Gate".
*   User views the **S-Global Heatmap** and **Score Gauge**.
*   *Logic:* The system calculates `S_global`.
*   *Transition (Branching):* See strictly defined **Audit Gate** logic in Section 4.

### Phase 4: The Studio (Aesthetic Generation)
**10. Template Gallery (Planned)**
*Unlocked only if S_global >= 85.* The user selects a visual theme.
*   *Transition:* Theme Selected -> `/documents`.

**11. The WYSIWYG Designer (`/documents`)**
The user finalizes the layout. They toggle **"Parser View"** to ensure robot-readability.
*   *Transition:* Export PDF -> Loop to Phase 5.

### Phase 5: Command Center
**12. Application Tracker (`/tracker`)**
The user tracks the lifecycle of the submitted application via the **Kanban Board**.

---

## 2. Playwright Interaction Hooks

Use these stable `data-testid` selectors for E2E testing chains.

| Page | Action | Playwright Selector / Hook | Context |
|:---|:---|:---|:---|
| **Landing** | Click CTA | `[data-testid="hero-cta-get-started"]` | Entry point |
| **Ingestion** | Drop File | `[data-testid="file-dropzone"]` | Input: `path/to/resume.pdf` |
| **Ingestion** | Verify Success | `[data-testid="ingest-success-toast"]` | Wait for visible `text=Parsed` |
| **Editor** | Type Response | `[data-testid="ksc-response-editor"]` | Input text trigger Auto-save |
| **Audit** | Check Score | `[data-testid="score-gauge-value"]` | Assert `innerText >= 85` |
| **Audit** | **Unlock Studio** | `[data-testid="gate-unlock-button"]` | **Critical Gate Interaction** |
| **Studio** | Toggle Bot View | `[data-testid="parser-view-toggle"]` | Visual regression check |
| **Studio** | Export PDF | `[data-testid="export-pdf-button"]` | Download trigger |
| **Tracker** | Move Card | `[data-testid="kanban-card-{id}"]` | Drag to "Interview" column |

---

## 3. Storybook Component States

Component states requiring visual documentation in Storybook.

### A. The Score Gauge (AuditDial)
> **Ref:** `UI-COMP-303`, `DOC-008` (3.1)
1.  **State: Plasma Pulse (Loading)**
    *   *Visual:* Animated gradient stroke, indeterminate progress, "Analyzing..." label.
2.  **State: Terracotta Glow (Failure)**
    *   *Context:* `S_global < 85`.
    *   *Visual:* Primary color `Terracotta`, static glow, "Critical Gaps" warning visible.
3.  **State: Sage Glow (Success)**
    *   *Context:* `S_global >= 85`.
    *   *Visual:* Primary color `Sage`, bright pulsing aura, "Gate Open" label.

### B. The Unlock Button (GateInterface)
> **Ref:** `UI-COMP-304`, `DOC-008` (4.2)
1.  **State: Locked**
    *   *Props:* `disabled=true`.
    *   *Visual:* Greyed out, opacity 50%, `cursor: not-allowed`, icon `lock`.
2.  **State: Unlocked (Active)**
    *   *Props:* `disabled=false`.
    *   *Visual:* Gradient background, pulsing shadow, icon `unlock`, interactable.

### C. The Ingestion Zone (DropZone)
> **Ref:** `UI-COMP-101`, `DOC-008` (3.3)
1.  **State: Garden Awaits (Empty)**
    *   *Visual:* Dashed `Sage` border, "Drop Chaos Here" text.
2.  **State: Hover (DragOver)**
    *   *Visual:* Scale 1.05, solid `Sage` border, background tint.
3.  **State: Digestion (Processing)**
    *   *Visual:* Liquid fill animation, progress bar.

### D. The Parser Toggle (BotView)
> **Ref:** `UI-COMP-404`, `DOC-008` (4.3)
1.  **State: Beautiful View (Default)**
    *   *Visual:* Font `Amstelvar/Recursive`, dark mode `#1E1E1E`.
2.  **State: Bot's View**
    *   *Visual:* Font `Arial/System`, white background `#FFFFFF`, black text, no decorations.

---

## 4. Branching Logic: The Audit Gate

This is the system's "Hard Logic Gate" defined in `DOC-008` (4.2).

### Logic Rule
**Condition:** `S_global` (Global Match Score) calculated from Resume + KSC vs Job Description.
**Threshold:** **85%**.

### Outcome A: FAILURE (`S_global < 85`)
*   **System Action:** `lock(Studio)`
*   **UI Behavior:**
    *   **Score Gauge:** Glows **Terracotta**.
    *   **Navigation:** Route `/documents` is **Blocked** (Redirects to `/analysis`).
    *   **Unlock Button:** State is **Locked** (Disabled).
    *   **Feedback:** Toast appears: "Quality Threshold Not Met".
    *   **Content:** "Critical Gaps" panel slides in automatically, listing missing keywords/skills.

### Outcome B: SUCCESS (`S_global >= 85`)
*   **System Action:** `unlock(Studio)`
*   **UI Behavior:**
    *   **Score Gauge:** Glows **Sage**.
    *   **Unlock Button:** State is **Unlocked** (Pulsing).
    *   **Interaction:** Clicking the button triggers **"Confetti Burst"** (Leaf/Gold particle effects).
    *   **Navigation:** User is programmatically routed to `/documents` (or Template Gallery).
    *   **Feedback:** "Gate Unlocked: Golden Record Achievement" notification.
