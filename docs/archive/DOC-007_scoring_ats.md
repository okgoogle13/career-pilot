# DOC-007: Scoring & ATS Compliance Specifications

**Document ID:** DOC-007-SCORING-ATS-SPEC
**Version:** 1.0
**Status:** Approved for Implementation
**Traceability:** Implements [SPEC-01] (Scoring) and [ARCH-10] (ATS Standards)

## 1. The Scoring Engine ($S_{global}$) [SPEC-01]

The system uses a weighted, multi-document evaluation model to reflect the priorities of the 2026 Australian NFP/Government sectors.

### 1.1 Weighting Distribution
The system validates the "Application Archetype" based on the Job Description Requirements and applies a dynamic weighting schema.

#### 1.1.1 Standard Profiles
| Archetype | Description | KSC Weight | Resume Weight | Cover Letter Weight |
|:---|:---|:---:|:---:|:---:|
| **Type A: Government/NFP** | Full compliance required. | **60%** | 30% | 10% |
| **Type B: Hybrid/Corporate** | Cover letter required, no visible KSC. | **0%** | 70% | 30% |
| **Type C: Rapid Apply** | Resume only. | **0%** | **100%** | 0% |

*System Inference:* If the Job Description extractor (`extract_job_requirements`) does not detect explicit "Selection Criteria" or "Statement of Claims", the Scoring Engine defaults to **Type B**.

### 1.2 The "Audit Gate" Logic
*   **Threshold:** 85% minimum required for Phase 4 (Studio) access.
*   **Lock State:** If $S_{global} < 85\%$, the UI remains in "Laboratory" mode.
*   **Deterministic Output:** Scoring must be reproducible and non-generative to avoid "hallucinated" ratings.

### 1.3 STAR-Density Calculation ($D_{star}$)
*   **S (Situation):** Contextual markers (dates, locations, orgs).
*   **T (Task):** Responsibility identifiers.
*   **A (Action):** High-impact action verbs.
*   **R (Result):** Quantitative evidence (%, $, #). Weighting: **1.5x multiplier**.

**Formula:**
$$D_{star} = \frac{S + T + A + (R \times 1.5)}{4.5}$$

### 1.4 Hard vs. Soft Skills Taxonomy
The scoring engine distinguishes between technical capabilities and behavioral competencies.

**1.4.1 Hard Skills (Baseline)**
*   **Definition:** Binary technical requirements (e.g., "NDIS framework", "Salesforce", "Drivers License").
*   **Verification:** Must be anchored to a specific role in the Work Experience history.
*   **Scoring:** Pass/Fail check. Missing hard skills trigger a significant penalty.

**1.4.2 Soft Skills (Earned)**
*   **Definition:** Behavioral traits (e.g., "Leadership", "Communication", "Stakeholder Management").
*   **Verification:** Presence in the "Skills" list is **ignored** unless validated by Semantic Analysis ($S_{semantic} > 70$).
*   **Logic:** "Leadership" is only counted if the AI detects a STAR story demonstrating it.
*   **Penalty:** Listing soft skills without evidence flags the profile as "Generic/Fuzzy".

## 2. 2026 ATS Compliance Standards [SPEC-02]

To bypass increasingly sophisticated 2026 parsers, the Studio must adhere to strict technical rendering rules.

### 2.1 The PDF/A-3 "Intelligent" Export
*   **Format:** ISO 19005-3 (PDF/A-3).
*   **XMP Metadata:** A machine-readable subset of the "Golden Record" JSON must be embedded in the PDF metadata layer.
*   **Outcome:** Allows 2026-era ATS bots to ingest the JSON directly, ensuring 100% data accuracy.

### 2.2 Structural Rendering Rules
*   **Linear Reading Order:** Documents must be rendered from a semantic HTML tree (DOM) to ensure correct reading sequence for screen readers and parsers.
*   **Forbidden Elements:** No text boxes, nested tables, or complex headers/footers that disrupt the parser's line-by-line ingestion.
*   **Standard Unicode:** Only web-safe, standard Unicode fonts (Noto Sans preferred) to prevent character encoding errors.

### 2.3 AI Detection Evasion (Linguistic De-fuzzing)
*   **Frequency Analysis:** The "Linguist Agent" flags and replaces common AI-generated transition words (e.g., "In summary," "Notably," "Spearheaded").
*   **Perplexity Check:** Ensuring the writing matches the user's Authentic Voice Profile to prevent the "Generic AI" linguistic fingerprint.
*   **Authentic Voice Threshold:** A match of > 0.8 is required for final verification.

## 3. Success Metrics for Compliance
*   **Parser Score:** 100% field extraction on 2026 ATS benchmarks.
*   **Latency:** Scoring audit results returned in < 3 seconds.
*   **Accessibility:** WCAG 2.2 AA compliant.
