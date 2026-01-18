
import { useState, useCallback } from 'react';
import { analysisService, AnalysisResult } from '../services/analysisService';

export const useAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const runAnalysis = useCallback(async (docId: string = 'mock-doc-id') => {
        setIsAnalyzing(true);
        setError(null);
        try {
            const data = await analysisService.analyzeDocument(docId);
            setResults(data);
        } catch (err) {
            setError('Failed to analyze document.');
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    }, []);

    const clearAnalysis = useCallback(() => {
        setResults(null);
        setError(null);
    }, []);

    return {
        isAnalyzing,
        results,
        error,
        runAnalysis,
        clearAnalysis
    };
};
