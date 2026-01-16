# 🚀 ZERO-SLOP DEPLOYMENT WORKFLOW V2.0

**Standard:** M3 Expressive v3.5 (Parametric Engine)  
**Strictness:** HIGH (Zero-Slop Enforced)  
**Target:** Production / Staging

This document is the **authoritative truth** for deploying CareerCopilot. It replaces all legacy workflows and specific scripts with a direct, verified, and gated process.

---

## 🛑 FAIL-FAST GATEKEEPER

**Do NOT proceed** if any of the following are true:
1.  **M3 Violations:** `script/validate-m3-compliance.sh` fails (Exit Code > 0).
2.  **Type Slop:** `npm run type-check` reveals *new* `any` types (Legacy: 23 known allowed instances).
3.  **Security Drift:** Firebase Rules contain `allow ... if true`.
4.  **System Score:** Integrity Score is < 90% (Production) or < 80% (Staging).

---

## 1. ⚙️ PRE-FLIGHT VERIFICATION SEQEUENCE

All commands must be run from the project root.

### A. Architectural & Style Validation
Run the immutable design audit.
```bash
./scripts/validate-m3-compliance.sh
```
**Success Criteria:**
- Output: `🎉 SUCCESS: All M3 Expressive compliance checks passed!`
- 0 violations for `rounded-*` (Gem/Pebble/Leaf required).
- 0 violations for `font-weight: 600` on hover (Parametric Axes required).

### B. Deep Type Inspection
Verify structural integrity of the frontend application.
```bash
cd frontend && npm run type-check
```
**Success Criteria:**
- Exit Code: 0 (No red output).
- No errors related to `M3ExpressiveComponents` or API interfaces.

### C. Test Suite Execution
Execute the critical path tests.
```bash
cd frontend && npm test
npm run test:e2e
```
*Note: If `test:e2e` is flaky due to environment, `@M3Parametric` tagged tests are the minimum viable requirement.*

---

## 2. 📊 SYSTEM INTEGRITY SCORE CALCULATION

Before deployment, calculate your score.

**Formula:**
`Score = (UI_Compliant% * 0.4) + (Type_Safe% * 0.25) + (Sec_Score% * 0.25) + (Pass_Rate% * 0.1)`

**Reference Values (Current Baseline):**
- **UI Compliance:** 85% (1 non-critical exception doc blocked by design system)
- **Type Safety:** 95% (23 legacy test mocks allowed)
- **Security:** 100% (Hardened Rules)
- **Test Pass Rate:** 100%

**Current Score:** `(0.85*0.4) + (0.95*0.25) + (1.0*0.25) + (1.0*0.10)` = **92.75%**

**Gating Rules:**
- **> 90%**: ✅ **PROCEED TO PRODUCTION**
- **80-89%**: ⚠️ **STAGING ONLY**
- **< 80%**: 🛑 **HALT**

---

## 3. 🚀 DEPLOYMENT EXECUTION

### A. Frontend (Firebase Hosting)
Deploys the React SPA to the global CDN edge.

```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### B. Backend (Cloud Run)
Deploys the FastAPI service with Genkit Orchestration.

```bash
# Ensure strict concurrency and memory settings for Genkit stability
gcloud run deploy careercopilot-api \
  --source backend/ \
  --region us-central1 \
  --memory 1Gi \
  --concurrency 80 \
  --allow-unauthenticated
```

### C. Security Layer (Firebase Rules)
Deploys the hardened Firestore and Storage rules.

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
```

---

## 4. 🛡️ POST-DEPLOYMENT VERIFICATION

### Vital Health Checks
1.  **Frontend URL:** Load `https://careercopilot-468811.web.app`
    *   *Check:* M3 Loading Micro-interaction appears?
    *   *Check:* Typography renders with `Grade` axis variation (not width shift).
2.  **API Health:**
    *   `curl https://careercopilot-api-[HASH]-uc.a.run.app/health` -> `{"status": "ok"}`
3.  **Genkit Discovery:**
    *   Verify AI Orchestrator is receiving prompts via Firebase Console logs.

---

## 5. 🚨 ROLLBACK PROTOCOL

If the Integrity Score drops post-deployment or users report critical "Slop" (visual bugs):

1.  **Frontend Rollback:** `firebase hosting:channel:deploy production_fallback` (if versioned) OR redeploy previous commit.
2.  **Backend Rollback:** In Cloud Console -> Cloud Run -> Revisions -> Select previous green revision -> "Manage Traffic" -> Send 100%.

---

**Audit & Maintainer:** Zero-Slop System  
**Last Updated:** 2026-01-08
