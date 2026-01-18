
import { useState, useCallback } from 'react';
import type { AnalysisResult, JobAnalysis, QuantifierSuggestion } from '../services/analysisService';
import { analysisService } from '../services/analysisService';

export type { QuantifierSuggestion };

interface AnchorInsight {
    type: 'strength' | 'warning' | 'info';
    text: string;
}

interface AnchorResults {
    overall: number;
    ats: number;
    impact: number;
    insights: AnchorInsight[];
}

const buildAnchorResults = (analysis: AnalysisResult): AnchorResults => ({
    overall: analysis.score.overall,
    ats: analysis.score.atsReadability,
    impact: analysis.score.impact,
    insights: [
        { type: 'strength', text: 'Resume structure is clear and ATS-friendly.' },
        { type: 'info', text: 'Quantified impact highlights are showing well.' },
        { type: 'warning', text: 'Soft skills could be reinforced with verbs.' },
    ],
});

export const useAnalysis = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [results, setResults] = useState<AnchorResults | null>(null);
    const [jobAnalysis, setJobAnalysis] = useState<JobAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyzeDocument = useCallback(async (docId: string = 'mock-doc-id') => {
        setAnalyzing(true);
        setError(null);
        try {
            const data = await analysisService.analyzeDocument(docId);
            setResult(data);
            setResults(buildAnchorResults(data));
            return data;
        } catch (err) {
            setError('Failed to analyze document.');
            console.error(err);
            throw err;
        } finally {
            setAnalyzing(false);
        }
    }, []);

    const analyzeWithBackend = useCallback(async (
        resumeText: string,
        jobDescription?: string,
        token?: string
    ) => {
        setAnalyzing(true);
        setError(null);
        try {
            const data = await analysisService.analyzeWithBackend(resumeText, jobDescription, token);
            setResult(data);
            setResults(buildAnchorResults(data));
            return data;
        } catch (err) {
            setError('Failed to analyze with backend.');
            console.error(err);
            throw err;
        } finally {
            setAnalyzing(false);
        }
    }, []);

    const analyzeJobUrl = useCallback(async (url: string) => {
        setAnalyzing(true);
        setError(null);
        try {
            const data = await analysisService.analyzeJobUrl(url);
            setJobAnalysis(data);
            return data;
        } catch (err) {
            setError('Failed to analyze job URL.');
            console.error(err);
            throw err;
        } finally {
            setAnalyzing(false);
        }
    }, []);

    const runAnalysis = useCallback(async (docId: string = 'mock-doc-id') => {
        return analyzeDocument(docId);
    }, [analyzeDocument]);

    const clearAnalysis = useCallback(() => {
        setResult(null);
        setResults(null);
        setJobAnalysis(null);
        setError(null);
    }, []);

    return {
        analyzing,
        loading: analyzing,
        result,
        jobAnalysis,
        analyzeDocument,
        analyzeWithBackend,
        analyzeJobUrl,
        isAnalyzing: analyzing,
        results,
        error,
        runAnalysis,
        clearAnalysis,
    };
};
