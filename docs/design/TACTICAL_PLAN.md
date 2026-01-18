# Tactical Execution Plan: Closing the Critical Gaps

This plan outlines the immediate next steps to implementing the critical features identified in DOC-006.

## Phase 1: Planning & Documentation (Week 1)
**Goal:** Establish technical clarity before coding.

- [ ] **Create API Mapping Appendix** in DOC-006
    - Link `IngestionPage` to backend ingestion flow.
    - Link `JobMatchCard` to Sentry logic.
    - Link `ScoreGauge` to `ats_scoring.py`.
- [ ] **Define Firestore Schema** for "Story Vault" & "Job Opportunities".

## Phase 2: The Quality Gate (Sprint 1 - Weeks 2-3)
**Goal:** Implement the hard gate that protects the Studio phase.

- **Feature 3.2: Weighted Scoring Gate**
    - [ ] **Backend:** Verify `ats_scoring.py` returns consistent `S_global` score.
    - [ ] **Frontend:** Update `Analysis.tsx` to display live score from backend.
    - [ ] **Frontend:** Implement "Lock UI" on `/documents` route that redirects to `/analysis` if score < 85%.
    - [ ] **E2E Test:** Verify gate blocks access until score threshold met.

## Phase 3: The Sandbox (Sprint 2 - Weeks 4-5)
**Goal:** Enable simultaneous drafting of Resume/KSC/CL.

- **Feature 3.1: Ecosystem Sandbox**
    - [ ] **Frontend:** Refactor `KSCGenerator.tsx` into `EcosystemSandbox.tsx`.
    - [ ] **Frontend:** Implement Split-Screen Layout (Editor | Evidence).
    - [ ] **Frontend:** Build `EvidenceSidebar` component (drag-and-drop STARs).

## Dependencies
- Backend ATS Scoring must be stable for Sprint 1.
- Ingestion flow must populate "Story Vault" for Sprint 2 evidence.

## Next Steps
- Implement the "API Mapping Appendix" in DOC-006 immediate.
- Begin Sprint 1 coding for Feature 3.2.
