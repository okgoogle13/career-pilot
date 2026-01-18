import { useState } from 'react';
import {
  TrendingUp, Award, Target, Sparkles, Download, ExternalLink, Link2,
  Loader2, CheckCircle2, AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'sonner';
import pileaPlant from '../../assets/images/pilea-plant.jpg';
import nativeWaratahHanging from '../../assets/images/native-waratah-hanging.png';
import { MetricCard } from './MetricCard';
import { KeywordTag } from '../../components/shared/KeywordTag';
import { ImpactEnhancements } from './ImpactEnhancements';
import { NorthcoteButton } from '../../components/ui/NorthcoteButton';
import { M3TextArea } from '../../legacy/ui/M3TextField';
import { useAnalysis } from '../../hooks/useAnalysis';
import { useAuth } from '../../context/AuthContext';
import { exportToPdf } from '../../utils/exportEngine';
import { GardenLayout } from '@/components/layouts/GardenLayout';
import { AuroraHeader } from '../../legacy/ui/AuroraHeader';
import { GlassLeafCard } from '@/features/gallery/GlassLeafCard';
import { NativeAnchor } from '@/components/ui/NativeAnchor';
import { TechCard } from './TechCard';
import { SplitHeader } from '@/components/shared/SplitHeader';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ATSScoreDataPoint {
  month: string;
  score: number;
}

interface ApplicationStatusData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface KeywordMatchData {
  keyword: string;
  rate: number;
}

// ============================================================================
// MOCK DATA - Replace with API calls
// ============================================================================

const ATS_SCORE_DATA: ATSScoreDataPoint[] = [
  { month: 'Jan', score: 82 },
  { month: 'Feb', score: 83 },
  { month: 'Mar', score: 84 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 86 },
  { month: 'Jun', score: 87 },
];

// Map token colors for Recharts (must be hex)
const CHART_COLORS = {
  primary: '#D1C4E9',   // primary-80
  secondary: '#C7FFF4', // secondary-80
  tertiary: '#FFD9E8',  // tertiary-80
  error: '#FFB4AB',     // error-80
  surface: '#1C1B1F',   // surface-container-low
  onSurface: '#E6E1E5', // neutral-90
  grid: '#484649',      // neutral-30
  heroHighlight: '#9B8AAD', // Native Violet for hero moment
};

const APPLICATION_STATUS_DATA: ApplicationStatusData[] = [
  { name: 'Applied', value: 40, color: CHART_COLORS.primary },
  { name: 'Interviewing', value: 30, color: CHART_COLORS.secondary },
  { name: 'Rejected', value: 20, color: CHART_COLORS.error },
  { name: 'Offered', value: 10, color: '#FFD700' }, // Gold for offer
];

const KEYWORD_MATCH_DATA: KeywordMatchData[] = [
  { keyword: 'React.js', rate: 5 },
  { keyword: 'TypeScript', rate: 2 },
  { keyword: 'JavaScript', rate: 4 },
  { keyword: 'Node.js', rate: 3 },
  { keyword: 'Python', rate: 2 },
];

const MATCHED_KEYWORDS: string[] = [
  'Community Support',
  'Case Management',
  'Communication',
  'Market Health',
  'Documentation',
  'Accessibility',
  'Accommodation',
  'Data Monitoring',
];

const MISSING_KEYWORDS: string[] = [
  'React.js',
  'Typescript',
  'Learning Programs',
  'Node.js',
  'Data Analysis',
  'Jira',
  'Mentorship',
];

// ============================================================================
// COMPONENT
// ============================================================================

export function Analysis() {
  const { analyzeDocument, analyzeWithBackend, analyzeJobUrl, analyzing, result, jobAnalysis } = useAnalysis();
  const [documentText, setDocumentText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [showInputs, setShowInputs] = useState(true);
  const [loadingJobUrl, setLoadingJobUrl] = useState(false);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL (e.g., https://seek.com.au/job/...)');
      return false;
    }
  };

  const handleAnalyzeJobUrl = async () => {
    if (!jobUrl) {
      toast.error('Please provide a job URL');
      return;
    }

    if (!validateUrl(jobUrl)) {
      return;
    }

    setLoadingJobUrl(true);
    try {
      const analysis = await analyzeJobUrl(jobUrl);
      toast.success('Job analysis complete! Verified sources extracted.');
      // Auto-populate job description from analysis
      setJobDescription(analysis.keywords.join(', ') + '\n\n' +
        'Requirements: ' + analysis.minimumRequirements.join(', '));
    } catch (error) {
      toast.error('Failed to analyze job URL. Please try again.');
      console.error(error);
    } finally {
      setLoadingJobUrl(false);
    }
  };

  const { user } = useAuth(); // Import useAuth to get access to token

  const handleAnalyze = async () => {
    if (!documentText || !jobDescription) {
      toast.error('Please provide both resume and job description');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to perform analysis');
      return;
    }

    try {
      if (!user.getIdToken) {
        throw new Error('Missing auth token provider');
      }
      const token = await user.getIdToken();

      toast.promise(
        analyzeWithBackend(documentText, jobDescription, token),
        {
          loading: 'Analyzing with CareerCopilot Cloud Engine...',
          success: 'Analysis complete! Score updated from backend.',
          error: 'Analysis failed. Please try again.',
        }
      );
      setShowInputs(false);
    } catch (e) {
      console.error("Failed to get token or analyze", e);
      toast.error("Authentication error during analysis");
    }
  };

  const handleDownloadAnalysis = async () => {
    try {
      await exportToPdf('analysis-content', 'Career_Analysis_Report.pdf');
      toast.success('Analysis report downloaded!');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  // Get scores from result or use defaults
  const scores = result?.score || {
    overall: 87,
    hardSkills: 85,
    softSkills: 78,
    impact: 92,
    atsReadability: 88,
  };

  // Determine hero quadrant (highest score)
  const quadrantScores = [
    { name: 'Hard Skills', value: scores.hardSkills },
    { name: 'Soft Skills', value: scores.softSkills },
    { name: 'Impact', value: scores.impact },
    { name: 'ATS', value: scores.atsReadability },
  ];
  const heroQuadrant = quadrantScores.reduce((max, q) =>
    q.value > max.value ? q : max
  );

  return (
    <GardenLayout>
      {/* Structural Plant Asset - Kangaroo floor-right */}
      <NativeAnchor variant="kangaroo" anchor="floor-right" blurIntensity="low" className="z-0 opacity-50" />

      {/* Keep existing Pilea Plant Decoration - Bottom Left Corner */}
      <div className="fixed bottom-0 left-0 lg:left-[280px] md:left-[72px] pointer-events-none w-[300px] z-[1] opacity-55 scale-x-[-1]">
        <img
          src={pileaPlant}
          alt=""
          className="w-full h-auto mix-blend-screen"
          style={{
            WebkitMaskImage:
              'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.35) 8%, rgba(0,0,0,0.65) 18%, rgba(0,0,0,0.85) 28%, black 40%)',
            maskImage:
              'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.35) 8%, rgba(0,0,0,0.65) 18%, rgba(0,0,0,0.85) 28%, black 40%)',
          }}
        />
      </div>

      <div id="analysis-content" className="p-6 md:p-12 max-w-7xl relative z-10 animate-in fade-in zoom-in-95 duration-500 ease-spring">

        {/* Header with Actions + Waratah Anchor */}
        <div className="flex items-center justify-between mb-8 relative">
          {/* Hanging Waratah - Top Right Anchor */}
          <img
            src={nativeWaratahHanging}
            alt=""
            className="absolute top-[-60px] right-0 w-[200px] h-auto opacity-70 pointer-events-none mix-blend-screen z-20"
          />

          <SplitHeader
            title="PERFORMANCE"
            highlight="Analysis"
          />
          <NorthcoteButton
            onClick={handleDownloadAnalysis}
            variant="secondary"
            className="rounded-[20px_20px_32px_32px] px-6"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </NorthcoteButton>
        </div>

        {/* Intelligence Trigger UI */}
        {showInputs && (
          <GlassLeafCard className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2
                className="text-title-large text-on-surface"
                style={{
                  fontWeight: 'var(--sys-type-weight-display)',
                  fontVariationSettings: "var(--sys-type-axes-authoritative)",
                }}
              >
                Run Intelligence Audit
              </h2>
            </div>

            {/* Job URL Intelligence Extractor */}
            <div className="mb-6 bg-surface-container-low rounded-tech p-6 border border-outline">
              <label className="block text-label-large font-bold text-on-surface mb-3">
                🔗 Job URL (Optional - Australian Sector Intelligence)
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => {
                    setJobUrl(e.target.value);
                    if (urlError) setUrlError('');
                  }}
                  placeholder="https://seek.com.au/job/..."
                  className={`flex-1 bg-surface-container-high rounded-tech px-4 py-3 text-on-surface border focus:outline-none ${urlError ? 'border-tertiary focus:border-tertiary' : 'border-outline-variant focus:border-primary'}`}
                />
                <NorthcoteButton
                  onClick={handleAnalyzeJobUrl}
                  disabled={loadingJobUrl || !jobUrl}
                  className="bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary rounded-[20px_20px_32px_32px] px-6 font-bold min-w-[180px]"
                >
                  {loadingJobUrl ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    'Extract Intelligence'
                  )}
                </NorthcoteButton>
              </div>
              {urlError && (
                <p className="text-tertiary text-label-small mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {urlError}
                </p>
              )}
              {jobAnalysis && jobUrl && !urlError && !loadingJobUrl && (
                <div className="flex items-center gap-2 mt-2 text-secondary">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-label-small font-bold">
                    Intelligence extracted successfully
                  </span>
                </div>
              )}
              <p className="text-body-small text-on-surface-variant mt-2">
                Automatically extract keywords, requirements, and Australian sector compliance (APS, AASW, WWCC, NDIS) from job posting URLs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-label-large font-bold text-on-surface mb-3">
                  Your Resume / Profile
                </label>
                <M3TextArea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="min-h-[200px] bg-surface-container-high rounded-tech"
                />
              </div>
              <div>
                <label className="block text-label-large font-bold text-on-surface mb-3">
                  Target Job Description
                </label>
                <M3TextArea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="min-h-[200px] bg-surface-container-high rounded-tech"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <NorthcoteButton
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-[20px_20px_32px_32px] px-8 h-12 font-bold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {analyzing ? 'Analyzing...' : 'Analyze with AI'}
              </NorthcoteButton>
            </div>
          </GlassLeafCard>
        )}

        {/* 4-Quadrant Metric Cards with Hero Highlighting */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Award}
            label="Hard Skills Match"
            value={`${scores.hardSkills}%`}
            iconColor={heroQuadrant.name === 'Hard Skills' ? 'text-[#9B8AAD]' : 'text-primary'}
            variant={heroQuadrant.name === 'Hard Skills' ? 'filled' : 'outlined'}
          />
          <MetricCard
            icon={TrendingUp}
            label="Soft Skills & Verbs"
            value={`${scores.softSkills}%`}
            iconColor={heroQuadrant.name === 'Soft Skills' ? 'text-[#9B8AAD]' : 'text-secondary'}
            variant={heroQuadrant.name === 'Soft Skills' ? 'filled' : 'outlined'}
          />
          <MetricCard
            icon={Target}
            label="Quantifiable Impact"
            value={`${scores.impact}%`}
            iconColor={heroQuadrant.name === 'Impact' ? 'text-[#9B8AAD]' : 'text-tertiary'}
            variant={heroQuadrant.name === 'Impact' ? 'filled' : 'outlined'}
          />
          <MetricCard
            icon={Award}
            label="ATS Readability"
            value={`${scores.atsReadability}%`}
            iconColor={heroQuadrant.name === 'ATS' ? 'text-[#9B8AAD]' : 'text-error'}
            variant={heroQuadrant.name === 'ATS' ? 'filled' : 'outlined'}
          />
        </div>

        {/* ATS Score Over Time - TechCard wrapper */}
        <TechCard className="mb-8 p-6" title="ATS Score Over Time">
          <h3 className="text-title-large font-bold mb-4">ATS Score Over Time</h3>
          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <LineChart data={ATS_SCORE_DATA}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={CHART_COLORS.grid}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={CHART_COLORS.onSurface}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={CHART_COLORS.onSurface}
                axisLine={false}
                tickLine={false}
                domain={[75, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: CHART_COLORS.surface,
                  border: '1px solid #484649',
                  borderRadius: '12px',
                  color: CHART_COLORS.onSurface,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke={CHART_COLORS.primary}
                strokeWidth={3}
                dot={{ fill: CHART_COLORS.primary, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TechCard>

        {/* Bottom Row: Application Status + Keyword Match Rate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Status Donut Chart - TechCard */}
          <TechCard className="p-6" title="Application Status">
            <h3 className="text-title-large font-bold mb-4">Application Status</h3>
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <PieChart>
                {/* @ts-ignore */}
                <Pie
                  data={APPLICATION_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {APPLICATION_STATUS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(0,0,0,0)"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: CHART_COLORS.surface,
                    border: '1px solid #484649',
                    borderRadius: '12px',
                    color: CHART_COLORS.onSurface,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TechCard>

          {/* Keyword Match Rate Bar Chart - TechCard */}
          <TechCard className="p-6" title="Keyword Match Rate">
            <h3 className="text-title-large font-bold mb-4">Keyword Match Rate</h3>
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart data={KEYWORD_MATCH_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={CHART_COLORS.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="keyword"
                  stroke={CHART_COLORS.onSurface}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke={CHART_COLORS.onSurface}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: CHART_COLORS.surface,
                    border: '1px solid #484649',
                    borderRadius: '12px',
                    color: CHART_COLORS.onSurface,
                  }}
                />
                <Bar
                  dataKey="rate"
                  radius={[8, 8, 0, 0]}
                >
                  {KEYWORD_MATCH_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TechCard>
        </div>

        {/* Keyword Analysis Section */}
        <GlassLeafCard className="p-6">
          <h3 className="text-title-large font-bold mb-4">Keyword Analysis</h3>
          {/* Matched Keywords */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-on-surface-variant">Matched</span>
              <span className="text-xs text-on-secondary-container bg-secondary-container px-2 py-1 rounded-pebble uppercase tracking-wider font-mono font-bold">
                {MATCHED_KEYWORDS.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MATCHED_KEYWORDS.map((keyword, index) => (
                <KeywordTag
                  key={index}
                  keyword={keyword}
                  variant="matched"
                />
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-on-surface-variant">Missing</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MISSING_KEYWORDS.map((keyword, index) => (
                <KeywordTag
                  key={index}
                  keyword={keyword}
                  variant="missing"
                />
              ))}
            </div>
          </div>
        </GlassLeafCard>

        {/* Verified Sources - Citations from Google Search Grounding */}
        {jobAnalysis?.sources && (
          <GlassLeafCard className="mt-8 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Link2 className="w-6 h-6 text-tertiary" />
              <h2
                className="text-title-large text-on-surface"
                style={{
                  fontWeight: 'var(--sys-type-weight-display)',
                  fontVariationSettings: "var(--sys-type-axes-authoritative)",
                }}
              >
                Verified Sources
              </h2>
            </div>

            {jobAnalysis.sources.length > 0 ? (
              <>
                <p className="text-body-medium text-on-surface-variant mb-6">
                  These sources were automatically discovered via Google Search grounding and verified for Australian sector compliance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobAnalysis.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-surface-container-low rounded-tech p-4 border border-outline hover:border-primary hover:bg-surface-container transition-all duration-short-2 ease-spring group block"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded-pebble bg-primary-container text-on-primary-container text-label-small font-bold">
                              {source.uri.includes('seek.com.au') ? 'SEEK' :
                                source.uri.includes('linkedin.com') ? 'LinkedIn' :
                                  source.uri.includes('.gov.au') ? 'Government' : 'Web'}
                            </span>
                          </div>
                          <h3
                            className="text-body-large text-on-surface group-hover:text-primary mb-2 line-clamp-2"
                            style={{
                              fontWeight: 'var(--sys-type-weight-display)',
                              fontVariationSettings: "var(--sys-type-axes-hero)",
                            }}
                          >
                            {source.title}
                          </h3>
                          <p className="text-body-small text-on-surface-variant truncate">
                            {source.uri}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 bg-surface-container-low rounded-tech border border-outline-variant border-dashed">
                <Link2 className="w-12 h-12 text-on-surface-variant mx-auto mb-4 opacity-50" />
                <h3
                  className="text-title-medium text-on-surface mb-2"
                  style={{
                    fontWeight: 'var(--sys-type-weight-display)',
                    fontVariationSettings: "var(--sys-type-axes-hero)",
                  }}
                >
                  No Verified Sources Found
                </h3>
                <p className="text-body-medium text-on-surface-variant max-w-md mx-auto">
                  Google Search grounding analyzed the URL but couldn't verify specific external citations.
                </p>
              </div>
            )}

            {/* Australian Sector Insights */}
            {jobAnalysis.sectorInsights && (
              <div className="mt-6 bg-tertiary-container/20 rounded-pebble p-4 border-l-4 border-tertiary">
                <h4
                  className="text-label-large text-on-tertiary-container mb-3 flex items-center gap-2"
                  style={{
                    fontWeight: 'var(--sys-type-weight-caption)',
                    fontVariationSettings: "var(--sys-type-axes-data)",
                  }}
                >
                  🇦🇺 Australian Sector Intelligence
                </h4>

                {jobAnalysis.sectorInsights.framework && (
                  <div className="mb-2">
                    <span className="text-label-small font-bold text-on-tertiary-container uppercase tracking-wider">
                      Framework:
                    </span>
                    <span className="text-body-medium text-on-tertiary-container ml-2">
                      {jobAnalysis.sectorInsights.framework}
                    </span>
                  </div>
                )}

                {jobAnalysis.sectorInsights.compliance && jobAnalysis.sectorInsights.compliance.length > 0 && (
                  <div className="mb-2">
                    <span className="text-label-small font-bold text-on-tertiary-container uppercase tracking-wider">
                      Compliance:
                    </span>
                    <span className="text-body-medium text-on-tertiary-container ml-2">
                      {jobAnalysis.sectorInsights.compliance.join(', ')}
                    </span>
                  </div>
                )}

                {jobAnalysis.sectorInsights.standards && jobAnalysis.sectorInsights.standards.length > 0 && (
                  <div>
                    <span className="text-label-small font-bold text-on-tertiary-container uppercase tracking-wider">
                      Standards:
                    </span>
                    <span className="text-body-medium text-on-tertiary-container ml-2">
                      {jobAnalysis.sectorInsights.standards.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </GlassLeafCard>
        )}

        {/* Impact Enhancements Section - The Quantifier */}
        {result?.quantifiers && result.quantifiers.length > 0 && (
          <div className="mt-8">
            <ImpactEnhancements suggestions={result.quantifiers} />
          </div>
        )}
      </div>
    </GardenLayout>
  );
}
