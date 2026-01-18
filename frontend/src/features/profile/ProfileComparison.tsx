/**
 * ELECTRIC ALCHEMIST: PROFILE COMPARISON FEATURE
 *
 * Side-by-side profile comparison with design system tokens.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight as SwapHoriz, Download, Share } from 'lucide-react';
import { NorthcoteButton } from '../../components/ui/NorthcoteButton';
import { GardenLayout } from '@/components/layouts/GardenLayout';
import { AuroraHeader } from '@/components/ui/AuroraHeader';
import { GlassLeafCard } from '@/components/ui/GlassLeafCard';
import { NativeAnchor } from '@/components/ui/NativeAnchor';

// Mock component to satisfy build until custom components are migrated
const ATSScoreCircle = ({ score, size }: { score: number; size?: string }) => (
  <motion.div
    className={`p-2 border-2 border-primary flex items-center justify-center font-bold ${size === 'small' ? 'w-10 h-10 text-xs' : 'w-20 h-20 text-lg'}`}
    style={{ clipPath: 'var(--md-ref-shape-gem)' }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 500, damping: 27 }}
  >
    {score}
  </motion.div>
);

interface ProfileData {
  id: string;
  name: string;
  role: string;
  activeApplications: number;
  atsScore: number;
  lastUpdated: string;
  avatarColor: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    highlights: string[];
  }[];
}

interface ProfileComparisonProps {
  leftProfile?: ProfileData;
  rightProfile?: ProfileData;
  onProfileSelect?: (position: 'left' | 'right') => void;
  onSwapProfiles?: () => void;
}

const sampleProfiles: ProfileData[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Software Engineer',
    activeApplications: 8,
    atsScore: 85,
    lastUpdated: '2024-01-15',
    avatarColor: 'tertiary',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL'],
    experience: [
      {
        company: 'TechCorp',
        position: 'Senior Software Engineer',
        duration: '2021-2023',
        highlights: [
          'Led development of scalable web applications',
          'Improved application performance by 40%',
          'Mentored junior developers',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Senior Software Engineer',
    activeApplications: 12,
    atsScore: 92,
    lastUpdated: '2024-01-20',
    avatarColor: 'primary',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    experience: [
      {
        company: 'TechCorp',
        position: 'Senior Software Engineer',
        duration: '2021-2023',
        highlights: [
          'Led cross-functional development of scalable web applications',
          'Improved application performance by 40% through optimization',
          'Mentored junior developers and conducted code reviews',
          'Implemented CI/CD pipeline reducing deployment time by 60%',
        ],
      },
    ],
  },
];

export function ProfileComparison({
  leftProfile = sampleProfiles[0],
  rightProfile = sampleProfiles[1],
  onProfileSelect,
  onSwapProfiles,
}: ProfileComparisonProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const renderBadge = (text: string, isActive: boolean, variant: 'default' | 'destructive' | 'secondary' = 'default') => {
    let bgClass = 'bg-surface-container';
    let textClass = 'text-on-surface';

    if (variant === 'destructive') {
      bgClass = 'bg-error-container';
      textClass = 'text-on-error-container';
    } else if (variant === 'secondary') {
      bgClass = 'bg-secondary-container';
      textClass = 'text-on-secondary-container';
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgClass} ${textClass}`}>
        {text}
      </span>
    );
  }

  const renderSkillsComparison = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <GlassLeafCard className="p-4">
        <h4
          className="text-hero text-base text-on-surface mb-2"
          style={{
            fontWeight: 'var(--sys-type-weight-display)',
            fontVariationSettings: "var(--sys-type-axes-authoritative)",
          }}
        >
          {leftProfile.name} - Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {leftProfile.skills.map((skill, index) => (
            <React.Fragment key={index}>
              {renderBadge(skill, true, !rightProfile.skills.includes(skill) ? 'destructive' : 'default')}
            </React.Fragment>
          ))}
        </div>
      </GlassLeafCard>

      <GlassLeafCard className="p-4">
        <h4
          className="text-hero text-base text-on-surface mb-2"
          style={{
            fontWeight: 'var(--sys-type-weight-display)',
            fontVariationSettings: "var(--sys-type-axes-authoritative)",
          }}
        >
          {rightProfile.name} - Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {rightProfile.skills.map((skill, index) => (
            <React.Fragment key={index}>
              {renderBadge(skill, true, !leftProfile.skills.includes(skill) ? 'secondary' : 'default')}
            </React.Fragment>
          ))}
        </div>
      </GlassLeafCard>
    </div>
  );

  const renderExperienceComparison = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <GlassLeafCard className="p-4">
        <h4
          className="text-hero text-base text-on-surface mb-2"
          style={{
            fontWeight: 'var(--sys-type-weight-display)',
            fontVariationSettings: "var(--sys-type-axes-authoritative)",
          }}
        >
          {leftProfile.name} - Experience
        </h4>
        <div className="space-y-4">
          {leftProfile.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-outline-variant pl-4">
              <h5
                className="text-hero text-sm text-on-surface"
                style={{
                  fontWeight: 'var(--sys-type-weight-display)',
                  fontVariationSettings: "var(--sys-type-axes-data)",
                }}
              >
                {exp.position}
              </h5>
              <p className="text-human text-xs text-on-surface-variant">
                {exp.company} • {exp.duration}
              </p>
              <ul className="mt-2 space-y-1 pl-4 list-disc">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="text-human text-xs text-on-surface-variant">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassLeafCard>

      <GlassLeafCard className="p-4">
        <h4
          className="text-hero text-base text-on-surface mb-2"
          style={{
            fontWeight: 'var(--sys-type-weight-display)',
            fontVariationSettings: "var(--sys-type-axes-authoritative)",
          }}
        >
          {rightProfile.name} - Experience
        </h4>
        <div className="space-y-4">
          {rightProfile.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-primary pl-4">
              <h5
                className="text-hero text-sm text-on-surface"
                style={{
                  fontWeight: 'var(--sys-type-weight-display)',
                  fontVariationSettings: "var(--sys-type-axes-data)",
                }}
              >
                {exp.position}
              </h5>
              <p className="text-human text-xs text-on-surface-variant">
                {exp.company} • {exp.duration}
              </p>
              <ul className="mt-2 space-y-1 pl-4 list-disc">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="text-human text-xs text-on-surface-variant">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassLeafCard>
    </div>
  );

  const renderOverview = () => (
    <GlassLeafCard className="p-8 text-center">
      <p className="text-hero text-base text-on-surface-variant">
        Select a section above to compare profile details
      </p>
    </GlassLeafCard>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', content: renderOverview() },
    { id: 'skills', label: 'Skills', content: renderSkillsComparison() },
    { id: 'experience', label: 'Experience', content: renderExperienceComparison() },
    { id: 'education', label: 'Education', content: <div className="p-4 text-center">Education comparison coming soon</div>, disabled: true },
    { id: 'certifications', label: 'Certifications', content: <div className="p-4 text-center">Certifications comparison coming soon</div>, disabled: true },
  ];

  return (
    <GardenLayout>
      {/* Plant Asset - Structural Integration */}
      <NativeAnchor variant="banksia" anchor="floor-left" blurIntensity="low" className="z-0 opacity-50" />

      <div className="w-full p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <AuroraHeader
            title="Profile Comparison"
            tag="ANALYSIS"
            wittySubtitle="Compare different versions of your profile side by side"
          />

          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 500, damping: 27 }}>
              <NorthcoteButton variant="secondary" onClick={onSwapProfiles} className="rounded-[20px_20px_32px_32px]">
                <SwapHoriz className="h-4 w-4 mr-2" />
                Swap Profiles
              </NorthcoteButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 500, damping: 27 }}>
              <NorthcoteButton variant="secondary" className="rounded-[20px_20px_32px_32px]">
                <Download className="h-4 w-4 mr-2" />
                Export Comparison
              </NorthcoteButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 500, damping: 27 }}>
              <NorthcoteButton className="rounded-[20px_20px_32px_32px]">
                <Share className="h-4 w-4 mr-2" />
                Share
              </NorthcoteButton>
            </motion.div>
          </div>
        </div>

        {/* Profile Cards Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-hero text-base text-on-surface"
                style={{
                  fontWeight: 'var(--sys-type-weight-display)',
                  fontVariationSettings: "var(--sys-type-axes-authoritative)",
                }}
              >
                Profile Version 1
              </h3>
              <NorthcoteButton variant="secondary" onClick={() => onProfileSelect?.('left')} className="rounded-[20px_20px_32px_32px] text-xs h-8 px-3">
                Change Profile
              </NorthcoteButton>
            </div>
            <GlassLeafCard className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="w-16 h-16 bg-primary-container flex items-center justify-center text-on-primary-container text-xl font-bold"
                  style={{ clipPath: 'var(--md-ref-shape-gem)' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
                >
                  {leftProfile.name[0]}
                </motion.div>
                <div>
                  <h4
                    className="text-hero text-lg text-on-surface"
                    style={{
                      fontWeight: 'var(--sys-type-weight-display)',
                      fontVariationSettings: "var(--sys-type-axes-hero)",
                    }}
                  >
                    {leftProfile.name}
                  </h4>
                  <p className="text-human text-sm text-on-surface-variant">{leftProfile.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-data text-xs text-on-surface-variant">Active Applications</p>
                  <p className="text-hero text-xl font-bold text-on-surface">
                    {leftProfile.activeApplications}
                  </p>
                </div>
                <ATSScoreCircle score={leftProfile.atsScore} size="small" />
              </div>
              <p className="text-human text-xs text-on-surface-variant">
                Last updated: {leftProfile.lastUpdated}
              </p>
            </GlassLeafCard>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-hero text-base text-on-surface"
                style={{
                  fontWeight: 'var(--sys-type-weight-display)',
                  fontVariationSettings: "var(--sys-type-axes-authoritative)",
                }}
              >
                Profile Version 2
              </h3>
              <NorthcoteButton variant="secondary" onClick={() => onProfileSelect?.('right')} className="rounded-[20px_20px_32px_32px] text-xs h-8 px-3">
                Change Profile
              </NorthcoteButton>
            </div>
            <GlassLeafCard className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="w-16 h-16 bg-secondary-container flex items-center justify-center text-on-secondary text-xl font-bold"
                  style={{ clipPath: 'var(--md-ref-shape-gem)' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
                >
                  {rightProfile.name[0]}
                </motion.div>
                <div>
                  <h4
                    className="text-hero text-lg text-on-surface"
                    style={{
                      fontWeight: 'var(--sys-type-weight-display)',
                      fontVariationSettings: "var(--sys-type-axes-hero)",
                    }}
                  >
                    {rightProfile.name}
                  </h4>
                  <p className="text-human text-sm text-on-surface-variant">{rightProfile.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-data text-xs text-on-surface-variant">Active Applications</p>
                  <p className="text-hero text-xl font-bold text-on-surface">
                    {rightProfile.activeApplications}
                  </p>
                </div>
                <ATSScoreCircle score={rightProfile.atsScore} size="small" />
              </div>
              <p className="text-human text-xs text-on-surface-variant">
                Last updated: {rightProfile.lastUpdated}
              </p>
            </GlassLeafCard>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="w-full">
          <div className="flex border-b border-outline-variant mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`
                            px-4 py-2 text-sm font-medium transition-colors relative
                            ${activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}
                            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {tabs.find(t => t.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </GardenLayout>
  );
}

export default ProfileComparison;
