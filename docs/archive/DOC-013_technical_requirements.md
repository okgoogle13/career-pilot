# DOC-013: Technical Requirements Document (TRD)

**Document ID:** DOC-013-TRD  
**Version:** 1.0  
**Status:** Unified Technical Requirements  
**Context:** Provides measurable implementation targets for the "Electric Alchemist" system, enabling automated verification via Playwright and Storybook.

---

## 1. Gherkin Acceptance Criteria (Behavioral Specs)

These scenarios define the critical path behaviors that must be validated by Playwright E2E tests.

### A. The Audit Gate (Logic Gate Verification)
**Context:** The system prevents users from accessing the "Studio" (Phase 4) until their application meets the 85% Score Threshold.

```gherkin
Feature: Audit Gate Logic
  As a user in The Laboratory
  I want to know if my application meets the quality standards
  So that I can unlock the design studio

  Scenario: Audit Fails (Score < 85%)
    Given I am on the "/analysis" page
    And the current application S_global score is calculated as 82
    When the gauge animation completes
    Then I should see the "AuditDial" component in the "Terracotta Glow" state
    And the "Unlock Studio" button should have the attribute "disabled"
    And access to "/documents" should be blocked by the router

  Scenario: Audit Passes (Score >= 85%)
    Given I am on the "/analysis" page
    And the current application S_global score is calculated as 87
    When the gauge animation completes
    Then I should see the "AuditDial" component in the "Sage Glow" state
    And the "Unlock Studio" button should be enabled
    And clicking "Unlock Studio" should trigger the "Confetti Burst" animation
    And I should be redirected to "/documents"
```

### B. The Parser View Toggle (Visual Verification)
**Context:** Users must be able to switch between the "Human" (Design) view and the "Bot" (ATS) view to ensure parseability.

```gherkin
Feature: Parser View Toggle
  As a user in The Studio
  I want to see how an ATS robot views my resume
  So that I can ensure all my keywords are readable

  Scenario: Toggle to Bot View
    Given I am on the "/documents" page
    And the preview is currently in "Beautiful View" (M3 Expressive fonts)
    When I click the toggle switch labeled "Bot's Eye View"
    Then the "DocumentPreview" container should apply the class "font-sans" (Arial/System)
    And all background images and "Flora" decorations should be hidden
    And the text color should be strictly "#000000" (Black)
    And the background color should be "#FFFFFF" (White)

  Scenario: Toggle back to Beautiful View
    Given I am in "Bot's Eye View"
    When I click the toggle switch labeled "return to Design"
    Then the "DocumentPreview" container should apply the class "font-leaf" (Roboto Flex)
    And "Flora" assets (e.g., Waratah) should be visible
    And the background color should return to "surface-canvas" (#121212)
```

### C. Batch Ingestion (Data Flow)
**Context:** Users drag multiple files into the "Brain" for parallel processing.

```gherkin
Feature: Batch Ingestion
  As a user on the Landing Page
  I want to upload my Resume and Cover Letter simultaneously
  So that the system can reconcile them

  Scenario: Multi-File Drag and Drop
    Given I am on the "/career/ingest" page
    And the "DropZone" component is in the "Idle" state
    When I drag and drop 2 files ("resume.pdf", "cover_letter.docx") into the zone
    Then the "DropZone" should transition to the "Processing" state (Liquid Animation)
    And I should see 2 items in the "FileQueue" list
    And the "Genkit Pipeline" should be triggered for each file
    And eventually the "Success Toast" should appear with text "2 files ingested"
```

---

## 2. Measurable Non-Functional Requirements (NFRs)

These targets define the "Quality of Service" and must be audited automatically in the CI/CD pipeline.

### A. Performance (Speed & Vitality)
**Tool:** Playwright (Chromium) + Lighthouse CI
**Target Environment:** Production Build (Local Preview)

| Metric | Target | Context | verification Method |
|:---|:---|:---|:---|
| **LCP (Largest Contentful Paint)** | `< 2.5s` | Dashboard / Landing Page | Lighthouse Audit on `/` and `/dashboard` |
| **CLS (Cumulative Layout Shift)** | `< 0.1` | All Pages (especially with Flora) | Lighthouse Audit (verify Flora loading doesn't shift layout) |
| **Input Latency (INP)** | `< 200ms` | "Atomic Sync" typing in Editor | Performance.measure in Playwright during typing simulation |
| **Route Transition** | `< 300ms` | Navigating from Lab -> Studio | React Router transition timing check |

### B. Accessibility (Inclusion)
**Tool:** `axe-playwright`
**Critical Focus:** The "Native Earth" Palette contrast.

| Requirement | Target | Specific Check | Verification Logic |
|:---|:---|:---|:---|
| **Color Contrast** | WCAG 2.2 AA | Wattle Gold (`#F0C419`) on Charcoal (`#121212`) | `await injectAxe(page); await checkA11y(page);` |
| **Focus Indicators** | Visible | All interactive elements | Tab navigation test; assert `outline` or ring is visible. |
| **aria-labels** | Present | "Icon-only" buttons (e.g., Trash, Edit) | Assert `[aria-label]` exists on `.btn-icon`. |
| **Reduced Motion** | Supported | "Plasma" and "Confetti" animations | `page.emulateMedia({ reducedMotion: 'reduce' })` -> animations disabled. |

### C. Compliance (Data Integrity)
**Tool:** `pdf-parse` (Node.js) via Playwright or Unit Test
**Focus:** The PDF/A-3 Metadata Layer (DOC-007).

| Requirement | Target | Verification Method |
|:---|:---|:---|
| **PDF/A-3 Standard** | Valid ISO 19005-3 | Verify PDF header/conformance level in export. |
| **XMP Metadata** | Present | Extract PDF metadata; assert `resume_json` namespace exists. |
| **JSON Consistency** | 100% Match | Compare embedded PDF JSON with Firestore "Golden Record". |
| **Text Layer** | Selectable | Assert text content is extractable (not rasterized). |

---

## 3. Data-Driven Testing Strategy

This section enables the "Write Once, Run Everywhere" strategy by linking data schemas.

### A. The "Golden Record" Mock
A standardized JSON object representing a "Perfect User" (Score 98%) used for positive testing and Storybook Default args.

```json
// src/mocks/golden-record.mock.json
{
  "user": {
    "uid": "test-user-001",
    "persona": "Senior Program Manager"
  },
  "analysis": {
    "global_score": 98.5,
    "metrics": {
      "star_density": 4.2,
      "voice_alignment": 0.95
    },
    "validation": {
      "threshold_met": true,
      "blockers": []
    }
  }
}
```

### B. The "Critical Failure" Mock
A standardized JSON object representing a "New User" (Score 40%) used for negative testing (Audit Gate Locked).

```json
// src/mocks/failure-record.mock.json
{
  "user": {
    "uid": "test-user-002",
    "persona": "Junior Analyst"
  },
  "analysis": {
    "global_score": 42.0,
    "metrics": {
      "star_density": 1.1,
      "voice_alignment": 0.3
    },
    "validation": {
      "threshold_met": false,
      "blockers": ["MISSING_KSC", "LOW_STAR_DENSITY"]
    }
  }
}
```

### C. Implementation in Storybook
Stories will import these mocks directly to drive component states, ensuring the UI faithfully visualizes the backend reality.

```typescript
// AuditDial.stories.tsx
import GoldenRecord from '../mocks/golden-record.mock.json';
import FailureRecord from '../mocks/failure-record.mock.json';

export const SuccessState = { args: { score: GoldenRecord.analysis.global_score } };
export const FailureState = { args: { score: FailureRecord.analysis.global_score } };
```
