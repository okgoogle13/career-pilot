import { useState } from 'react';
import { Briefcase, Calendar, MapPin, Mail, Link as LinkIcon, Edit3 } from 'lucide-react';
import ResumeUploader from './ResumeUploader';
import { GardenLayout } from '@/components/layouts/GardenLayout';
import { AuroraHeader } from '@/components/ui/AuroraHeader';
import { GlassLeafCard } from '@/components/ui/GlassLeafCard';
import { NativeAnchor } from '@/components/ui/NativeAnchor';
import { motion } from 'framer-motion';

export function ProfileView() {
  const [careerData, setCareerData] = useState<any>(null);

  return (
    <GardenLayout>
      {/* Plant Asset - Structural Integration */}
      <NativeAnchor variant="banksia" anchor="floor-left" blurIntensity="low" className="z-0 opacity-50" />

      <div className="max-w-5xl mx-auto pb-12 w-full relative z-10">
        {/* Banner */}
        <div className="h-48 md:h-64 rounded-leaf bg-gradient-to-r from-[#21005D] to-[#381E72] overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-[url('/texture-pattern.png')] opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141218] via-transparent to-transparent opacity-60" />
        </div>

        <div className="px-4 md:px-8 relative -mt-16 md:-mt-24 z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-pebble border-4 border-background bg-gradient-to-br from-tertiary-container to-primary-container shadow-2xl flex items-center justify-center text-4xl transform transition-transform hover:scale-105 cursor-pointer">
              🧑‍💻
            </div>
            <div className="flex-1 pb-2 text-center md:text-left">
              <AuroraHeader
                title="Nishant J."
                tag="PROFILE"
                wittySubtitle="Senior Full Stack Engineer"
              />
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-on-surface-variant text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" /> San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-primary" /> nishant@example.com
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4 text-primary" /> github.com/nishant
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 500, damping: 27 }}
              className="flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-2.5 rounded-[20px_20px_32px_32px] font-bold hover:bg-primary hover:text-on-primary transition-all shadow-md"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column - Timeline */}
            <div className="lg:col-span-2 space-y-8">
              <GlassLeafCard className="p-8">
                <ResumeUploader onUploadSuccess={setCareerData} />
              </GlassLeafCard>

              <GlassLeafCard className="p-8">
                <h2
                  className="text-xl text-on-surface mb-6 flex items-center gap-2"
                  style={{
                    fontWeight: 'var(--sys-type-weight-display)',
                    fontVariationSettings: "var(--sys-type-axes-authoritative)",
                  }}
                >
                  <Briefcase className="w-5 h-5 text-primary" />
                  {careerData ? 'Extracted Career Path' : 'Experience'}
                </h2>

                <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#49454F]">
                  {careerData && careerData.entries && careerData.entries.length > 0 ? (
                    careerData.entries.map((entry: any, index: number) => (
                      <TimelineItem
                        key={index}
                        role={entry.title}
                        company={entry.employer}
                        date={entry.start_date ? `${entry.start_date} - ${entry.end_date || 'Present'}` : 'Date Unknown'}
                        description={entry.description}
                        achievements={entry.achievements_derived}
                      />
                    ))
                  ) : (
                    <>
                      <TimelineItem
                        role="Senior Frontend Engineer"
                        company="Tech Corp Inc."
                        date="2022 - Present"
                        description="Leading the frontend architecture migration to React 18 and Next.js. Improved performance by 40%."
                      />
                      <TimelineItem
                        role="Software Developer"
                        company="StartUp Studio"
                        date="2020 - 2022"
                        description="Built and shipped 3 major products. Managed a team of 4 junior developers."
                      />
                      <TimelineItem
                        role="Junior Developer"
                        company="Web Solutions"
                        date="2018 - 2020"
                        description="Full stack development using MERN stack. Implemented CI/CD pipelines."
                      />
                    </>
                  )}
                </div>
              </GlassLeafCard>
            </div>

            {/* Sidebar Column - Skills & Badges */}
            <div className="space-y-6">
              <GlassLeafCard className="p-6">
                <h3
                  className="text-lg text-[#E6E1E5] mb-4"
                  style={{
                    fontWeight: 'var(--sys-type-weight-display)',
                    fontVariationSettings: "var(--sys-type-axes-authoritative)",
                  }}
                >
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(careerData?.skills || [
                    'React',
                    'TypeScript',
                    'Node.js',
                    'Tailwind',
                    'GraphQL',
                    'AWS',
                    'Python',
                    'Figma',
                    'PostgreSQL',
                  ]).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-surface-container-high rounded-pebble text-sm text-primary font-mono border border-white/5 hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassLeafCard>

              <GlassLeafCard className="p-6">
                <h3
                  className="text-lg text-[#E6E1E5] mb-4"
                  style={{
                    fontWeight: 'var(--sys-type-weight-display)',
                    fontVariationSettings: "var(--sys-type-axes-authoritative)",
                  }}
                >
                  Badges
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <Badge
                    title="Early Adopter"
                    emoji="🚀"
                    bg="from-amber-500/20 to-orange-500/20"
                    border="border-amber-500/30"
                  />
                  <Badge
                    title="Code Ninja"
                    emoji="💻"
                    bg="from-blue-500/20 to-indigo-500/20"
                    border="border-blue-500/30"
                  />
                  <Badge
                    title="Bug Hunter"
                    emoji="🐛"
                    bg="from-emerald-500/20 to-green-500/20"
                    border="border-emerald-500/30"
                  />
                  <Badge
                    title="Mentor"
                    emoji="🎓"
                    bg="from-purple-500/20 to-pink-500/20"
                    border="border-purple-500/30"
                  />
                  <Badge
                    title="Writer"
                    emoji="✍️"
                    bg="from-rose-500/20 to-red-500/20"
                    border="border-rose-500/30"
                  />
                  <Badge
                    title="Team Player"
                    emoji="🤝"
                    bg="from-cyan-500/20 to-teal-500/20"
                    border="border-cyan-500/30"
                  />
                </div>
              </GlassLeafCard>
            </div>
          </div>
        </div>
      </div>
    </GardenLayout>
  );
}

function TimelineItem({
  role,
  company,
  date,
  description,
  achievements,
}: {
  role: string;
  company: string;
  date: string;
  description?: string;
  achievements?: string[];
}) {
  return (
    <div className="pl-8 relative group">
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />
      <h3
        className="text-lg text-on-surface"
        style={{
          fontWeight: 'var(--sys-type-weight-display)',
          fontVariationSettings: "var(--sys-type-axes-hero)",
        }}
      >
        {role}
      </h3>
      <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
        <span className="font-semibold">{company}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {date}
        </span>
      </div>
      {description && (
        <p className="text-on-surface-variant leading-relaxed text-sm mb-2">{description}</p>
      )}
      {achievements && achievements.length > 0 && (
        <ul className="list-disc list-outside ml-4 space-y-1">
          {achievements.map((item, index) => (
            <li key={index} className="text-on-surface-variant text-sm pl-1 marker:text-primary/70">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Badge({
  title,
  emoji,
  bg,
  border,
}: {
  title: string;
  emoji: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      className={`aspect-square rounded-pebble bg-gradient-to-br ${bg} border ${border} flex items-center justify-center text-3xl hover:scale-110 transition-transform cursor-help`}
      title={title}
    >
      {emoji}
    </div>
  );
}
