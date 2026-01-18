export interface AnalysisScore {
  overall: number;
  hardSkills: number;
  softSkills: number;
  impact: number;
  atsReadability: number;
}

export type QuantifierType = 'number' | 'percentage' | 'scale' | 'time';

export interface QuantifierSuggestion {
  original: string;
  suggestion: string;
  contextualWhy?: string;
  type: QuantifierType;
}

export interface AnalysisResult {
  score: AnalysisScore;
  quantifiers: QuantifierSuggestion[];
}

export interface JobAnalysisSource {
  title: string;
  uri: string;
}

export interface SectorInsights {
  framework?: string;
  compliance?: string[];
  standards?: string[];
}

export interface JobAnalysis {
  keywords: string[];
  minimumRequirements: string[];
  keyResponsibilities?: string[];
  valuedOutcomes?: string[];
  roleSpecificHardSkills?: string[];
  companyNicheAndValues?: string[];
  desirableAttributes?: string[];
  sources?: JobAnalysisSource[];
  sectorInsights?: SectorInsights;
}

const mockAnalysisResult: AnalysisResult = {
  score: {
    overall: 87,
    hardSkills: 85,
    softSkills: 78,
    impact: 92,
    atsReadability: 88,
  },
  quantifiers: [
    {
      original: 'Managed a team to improve service delivery.',
      suggestion: 'Improved service delivery by 18% by leading a 6-person team through a workflow redesign.',
      contextualWhy: 'Adds measurable impact and clarifies scope of leadership.',
      type: 'percentage',
    },
    {
      original: 'Handled stakeholder requests efficiently.',
      suggestion: 'Resolved 40+ stakeholder requests per month, reducing turnaround time by 3 days.',
      contextualWhy: 'Shows scale and speed improvements.',
      type: 'number',
    },
  ],
};

const mockJobAnalysis: JobAnalysis = {
  keywords: ['Stakeholder engagement', 'Policy analysis', 'Service design'],
  minimumRequirements: ['3+ years policy experience', 'Tertiary qualification'],
  keyResponsibilities: ['Deliver strategic advice', 'Coordinate cross-functional initiatives'],
  valuedOutcomes: ['Improved client outcomes', 'Operational efficiency'],
  roleSpecificHardSkills: ['Legislative drafting', 'Data interpretation'],
  companyNicheAndValues: ['Community-first', 'Evidence-led'],
  desirableAttributes: ['APS experience', 'Change management'],
  sources: [
    { title: 'APS Capability Framework', uri: 'https://www.apsc.gov.au/aps-capability-framework' },
  ],
  sectorInsights: {
    framework: 'APS Integrated Leadership System',
    compliance: ['WWCC', 'NDIS Worker Screening'],
    standards: ['AASW Practice Standards'],
  },
};

export const analysisService = {
  async analyzeDocument(_docId: string): Promise<AnalysisResult> {
    return mockAnalysisResult;
  },
  async analyzeWithBackend(
    _resumeText: string,
    _jobDescription?: string,
    _token?: string
  ): Promise<AnalysisResult> {
    return mockAnalysisResult;
  },
  async analyzeJobUrl(_url: string): Promise<JobAnalysis> {
    return mockJobAnalysis;
  },
};
