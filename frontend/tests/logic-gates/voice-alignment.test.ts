/**
 * Logic Gate Tests: Voice Alignment Gate
 * 
 * @trace LOGIC-GATE-003
 * @doc DOC-006#state-voice-alignment
 * @doc DOC-008#component-logic
 * @doc DOC-007#ai-detection-evasion
 * 
 * Purpose: Validate that the Authentic Voice Profile matching logic correctly
 * prevents users from exiting Phase 1 until their voice match score exceeds 0.8.
 * This ensures content authenticity and prevents AI-generated "slop."
 */

import { describe, it, expect } from 'vitest';

// Types
interface VoiceProfile {
    user_id: string;
    linguistic_fingerprint: {
        avg_sentence_length: number;
        vocabulary_diversity: number;
        transition_words: string[];
        perplexity_score: number;
    };
    match_threshold: number;
}

interface VoiceAnalysisResult {
    match_score: number;
    ai_probability: number;
    passes_gate: boolean;
    warnings: string[];
}

// Constants
const VOICE_MATCH_THRESHOLD = 0.8;
const AI_PROBABILITY_MAX = 0.2;

// Logic under test

/**
 * Checks if voice match score meets the threshold
 * @trace LOGIC-GATE-003
 */
export const meetsVoiceThreshold = (matchScore: number): boolean => {
    return matchScore > VOICE_MATCH_THRESHOLD;
};

/**
 * Checks if AI probability is within acceptable range
 * @trace LOGIC-GATE-003
 */
export const isAuthenticVoice = (aiProbability: number): boolean => {
    return aiProbability <= AI_PROBABILITY_MAX;
};

/**
 * Validates voice analysis result
 * @trace LOGIC-GATE-003
 */
export const validateVoiceAlignment = (
    matchScore: number,
    aiProbability: number
): VoiceAnalysisResult => {
    const warnings: string[] = [];

    if (matchScore <= VOICE_MATCH_THRESHOLD) {
        warnings.push(`Voice match ${matchScore.toFixed(2)} is below threshold ${VOICE_MATCH_THRESHOLD}`);
    }

    if (aiProbability > AI_PROBABILITY_MAX) {
        warnings.push(`AI probability ${aiProbability.toFixed(2)} exceeds maximum ${AI_PROBABILITY_MAX}`);
    }

    const passes_gate = meetsVoiceThreshold(matchScore) && isAuthenticVoice(aiProbability);

    return {
        match_score: matchScore,
        ai_probability: aiProbability,
        passes_gate,
        warnings
    };
};

/**
 * Determines if user can exit Phase 1 based on voice alignment
 * @trace LOGIC-GATE-003
 */
export const canExitPhaseOne = (voiceResult: VoiceAnalysisResult): boolean => {
    return voiceResult.passes_gate;
};

// Tests
describe('Voice Alignment Gate Logic (LOGIC-GATE-003)', () => {
    describe('Threshold Validation', () => {
        it('should require voice match > 0.8 to pass', () => {
            expect(meetsVoiceThreshold(0.81)).toBe(true);
            expect(meetsVoiceThreshold(0.8)).toBe(false);
            expect(meetsVoiceThreshold(0.79)).toBe(false);
        });

        it('should pass for high voice match scores', () => {
            expect(meetsVoiceThreshold(0.85)).toBe(true);
            expect(meetsVoiceThreshold(0.9)).toBe(true);
            expect(meetsVoiceThreshold(1.0)).toBe(true);
        });

        it('should fail for low voice match scores', () => {
            expect(meetsVoiceThreshold(0.0)).toBe(false);
            expect(meetsVoiceThreshold(0.5)).toBe(false);
            expect(meetsVoiceThreshold(0.8)).toBe(false);
        });
    });

    describe('AI Detection Validation', () => {
        it('should require AI probability <= 0.2 to pass', () => {
            expect(isAuthenticVoice(0.2)).toBe(true);
            expect(isAuthenticVoice(0.19)).toBe(true);
            expect(isAuthenticVoice(0.21)).toBe(false);
        });

        it('should pass for low AI probability', () => {
            expect(isAuthenticVoice(0.0)).toBe(true);
            expect(isAuthenticVoice(0.1)).toBe(true);
            expect(isAuthenticVoice(0.15)).toBe(true);
        });

        it('should fail for high AI probability', () => {
            expect(isAuthenticVoice(0.3)).toBe(false);
            expect(isAuthenticVoice(0.5)).toBe(false);
            expect(isAuthenticVoice(1.0)).toBe(false);
        });
    });

    describe('Combined Validation', () => {
        it('should pass when BOTH voice match and AI check pass', () => {
            const result = validateVoiceAlignment(0.85, 0.15);

            expect(result.passes_gate).toBe(true);
            expect(result.warnings).toHaveLength(0);
        });

        it('should fail when voice match is low', () => {
            const result = validateVoiceAlignment(0.75, 0.15);

            expect(result.passes_gate).toBe(false);
            expect(result.warnings).toContain(
                expect.stringContaining('Voice match 0.75 is below threshold')
            );
        });

        it('should fail when AI probability is high', () => {
            const result = validateVoiceAlignment(0.85, 0.25);

            expect(result.passes_gate).toBe(false);
            expect(result.warnings).toContain(
                expect.stringContaining('AI probability 0.25 exceeds maximum')
            );
        });

        it('should fail when BOTH checks fail', () => {
            const result = validateVoiceAlignment(0.75, 0.3);

            expect(result.passes_gate).toBe(false);
            expect(result.warnings).toHaveLength(2);
        });
    });

    describe('Phase 1 Exit Gate', () => {
        it('should allow exit when voice alignment passes', () => {
            const result = validateVoiceAlignment(0.85, 0.15);
            expect(canExitPhaseOne(result)).toBe(true);
        });

        it('should block exit when voice alignment fails', () => {
            const result = validateVoiceAlignment(0.75, 0.15);
            expect(canExitPhaseOne(result)).toBe(false);
        });

        it('should block exit when AI detection fails', () => {
            const result = validateVoiceAlignment(0.85, 0.3);
            expect(canExitPhaseOne(result)).toBe(false);
        });
    });

    describe('Boundary Conditions', () => {
        it('should handle edge case: exactly 0.8 voice match', () => {
            const result = validateVoiceAlignment(0.8, 0.1);
            expect(result.passes_gate).toBe(false);
        });

        it('should handle edge case: exactly 0.2 AI probability', () => {
            const result = validateVoiceAlignment(0.85, 0.2);
            expect(result.passes_gate).toBe(true);
        });

        it('should handle edge case: 0.801 voice match (just above)', () => {
            const result = validateVoiceAlignment(0.801, 0.1);
            expect(result.passes_gate).toBe(true);
        });

        it('should handle edge case: 0.799 voice match (just below)', () => {
            const result = validateVoiceAlignment(0.799, 0.1);
            expect(result.passes_gate).toBe(false);
        });

        it('should handle edge case: perfect scores', () => {
            const result = validateVoiceAlignment(1.0, 0.0);
            expect(result.passes_gate).toBe(true);
            expect(result.warnings).toHaveLength(0);
        });

        it('should handle edge case: worst scores', () => {
            const result = validateVoiceAlignment(0.0, 1.0);
            expect(result.passes_gate).toBe(false);
            expect(result.warnings).toHaveLength(2);
        });
    });

    describe('Warning Messages', () => {
        it('should provide clear warning for low voice match', () => {
            const result = validateVoiceAlignment(0.7, 0.1);

            expect(result.warnings).toContain(
                'Voice match 0.70 is below threshold 0.8'
            );
        });

        it('should provide clear warning for high AI probability', () => {
            const result = validateVoiceAlignment(0.9, 0.3);

            expect(result.warnings).toContain(
                'AI probability 0.30 exceeds maximum 0.2'
            );
        });

        it('should provide both warnings when both checks fail', () => {
            const result = validateVoiceAlignment(0.6, 0.4);

            expect(result.warnings).toHaveLength(2);
            expect(result.warnings[0]).toContain('Voice match');
            expect(result.warnings[1]).toContain('AI probability');
        });

        it('should have no warnings when all checks pass', () => {
            const result = validateVoiceAlignment(0.9, 0.1);
            expect(result.warnings).toHaveLength(0);
        });
    });
});

/**
 * Integration Tests: Voice Profile Matching
 */
describe('Voice Profile Integration (LOGIC-GATE-003)', () => {
    describe('Linguistic Fingerprint Analysis', () => {
        it('should detect AI-generated content with high perplexity', () => {
            // AI-generated content typically has low perplexity (too predictable)
            const aiContent = {
                perplexity_score: 15.2, // Low = AI-like
                avg_sentence_length: 22.5,
                vocabulary_diversity: 0.45
            };

            // Simulate AI detection
            const aiProbability = aiContent.perplexity_score < 20 ? 0.8 : 0.1;

            expect(isAuthenticVoice(aiProbability)).toBe(false);
        });

        it('should accept human content with natural perplexity', () => {
            // Human content has higher perplexity (more varied)
            const humanContent = {
                perplexity_score: 45.8, // High = human-like
                avg_sentence_length: 18.3,
                vocabulary_diversity: 0.72
            };

            // Simulate AI detection
            const aiProbability = humanContent.perplexity_score < 20 ? 0.8 : 0.05;

            expect(isAuthenticVoice(aiProbability)).toBe(true);
        });
    });

    describe('Transition Word Detection', () => {
        it('should flag common AI transition words', () => {
            const aiTransitionWords = [
                'In summary',
                'Notably',
                'Spearheaded',
                'Leveraged',
                'Synergized'
            ];

            // Simulate detection of AI-common words
            const hasAiWords = aiTransitionWords.length > 3;
            const aiProbability = hasAiWords ? 0.7 : 0.1;

            expect(isAuthenticVoice(aiProbability)).toBe(false);
        });

        it('should accept natural transition words', () => {
            const naturalWords = [
                'I worked on',
                'We decided to',
                'The team built',
                'My role was'
            ];

            // Simulate detection
            const hasAiWords = false;
            const aiProbability = hasAiWords ? 0.7 : 0.05;

            expect(isAuthenticVoice(aiProbability)).toBe(true);
        });
    });
});

/**
 * Regression Tests: Voice Alignment Guardrails
 */
describe('Regression Protection (LOGIC-GATE-003)', () => {
    it('CRITICAL: Voice match threshold must remain > 0.8', () => {
        expect(VOICE_MATCH_THRESHOLD).toBe(0.8);
    });

    it('CRITICAL: AI probability max must remain <= 0.2', () => {
        expect(AI_PROBABILITY_MAX).toBe(0.2);
    });

    it('CRITICAL: Voice threshold must use > not >=', () => {
        // This ensures 0.8 exactly does NOT pass
        expect(meetsVoiceThreshold(0.8)).toBe(false);
        expect(meetsVoiceThreshold(0.8000001)).toBe(true);
    });

    it('CRITICAL: AI check must use <= not <', () => {
        // This ensures 0.2 exactly DOES pass
        expect(isAuthenticVoice(0.2)).toBe(true);
        expect(isAuthenticVoice(0.2000001)).toBe(false);
    });

    it('CRITICAL: validateVoiceAlignment must check BOTH conditions', () => {
        // Ensure both checks are enforced
        const onlyVoicePass = validateVoiceAlignment(0.9, 0.3);
        const onlyAiPass = validateVoiceAlignment(0.7, 0.1);
        const bothPass = validateVoiceAlignment(0.9, 0.1);

        expect(onlyVoicePass.passes_gate).toBe(false);
        expect(onlyAiPass.passes_gate).toBe(false);
        expect(bothPass.passes_gate).toBe(true);
    });
});

/**
 * Edge Cases & Error Handling
 */
describe('Edge Cases (LOGIC-GATE-003)', () => {
    it('should handle floating point precision issues', () => {
        const result1 = validateVoiceAlignment(0.80000001, 0.1);
        const result2 = validateVoiceAlignment(0.7999999, 0.1);

        expect(result1.passes_gate).toBe(true);
        expect(result2.passes_gate).toBe(false);
    });

    it('should handle scores outside normal range', () => {
        // Scores should be 0-1, but handle edge cases
        const result1 = validateVoiceAlignment(1.5, 0.1); // Above 1
        const result2 = validateVoiceAlignment(-0.1, 0.1); // Below 0

        // Should still apply threshold logic
        expect(result1.passes_gate).toBe(true); // > 0.8
        expect(result2.passes_gate).toBe(false); // < 0.8
    });

    it('should handle NaN gracefully', () => {
        const result = validateVoiceAlignment(NaN, NaN);

        // NaN comparisons always return false
        expect(result.passes_gate).toBe(false);
    });
});
