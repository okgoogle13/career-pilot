import { Plus, FileText, Gift, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { GardenLayout } from '@/components/layouts/GardenLayout';
import { AuroraHeader } from '../../legacy/ui/AuroraHeader';
import { GlassLeafCard } from '@/features/gallery/GlassLeafCard';
import { NativeAnchor } from '@/components/ui/NativeAnchor';
import { TechCard } from '@/features/analysis/TechCard';
import { SplitHeader } from '@/components/shared/SplitHeader';
import nativeGroup from '@/assets/images/native-group.png';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Profile {
  name: string;
  company: string;
  score: number;
  status: 'EXCELLENT' | 'GOOD' | 'FAIR';
}

// ============================================================================
// MOCK DATA
// ============================================================================

const PROFILES: Profile[] = [
  { name: 'Senior Software Engineer', company: 'TECHCORP', score: 92, status: 'EXCELLENT' },
  { name: 'UX Designer', company: 'DESIGNHUB', score: 85, status: 'GOOD' },
  { name: 'Product Manager', company: 'STARTUPXYZ', score: 78, status: 'FAIR' },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function Dashboard() {
  // Dotted pattern for cards - Figma spec
  const dottedPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23FFFFFF' fill-opacity='0.1'/%3E%3C/svg%3E")`;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 27,
      },
    },
  };

  return (
    <GardenLayout>
      {/* Plant Assets - Structural Integration */}
      <NativeAnchor variant="gum" anchor="hanging-right" blurIntensity="none" className="z-20" />
      <NativeAnchor variant="kangaroo" anchor="floor-left" blurIntensity="high" className="z-0 opacity-50" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 p-6 md:p-12"
      >
        {/* Hero Banner with TechCard and SplitHeader */}
        <TechCard title="Daily Overview" className="p-8 md:p-12 mb-8 relative overflow-hidden min-h-[280px]">
          <motion.div variants={item} className="relative z-10">
            <SplitHeader title="GOOD MORNING," highlight="Nishant!" />
            <p className="text-white/70 mt-4 text-lg">
              You have 3 upcoming interviews this week.
            </p>
          </motion.div>

          {/* Native Plant Group - Bottom Right */}
          <img
            src={nativeGroup}
            alt="Australian Native Plants"
            className="absolute bottom-0 right-0 w-[400px] h-auto opacity-80 pointer-events-none mix-blend-screen"
          />
        </TechCard>

        {/* Stats Grid - Figma Dotted Pattern */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Applications */}
          <GlassLeafCard
            className="p-6 relative overflow-hidden"
            style={{ backgroundImage: dottedPattern }}
          >
            <div className="relative z-10">
              <FileText className="w-12 h-12 text-tertiary mb-4" />
              <p className="text-[64px] font-black text-on-surface tabular-nums leading-none mb-2">8</p>
              <p className="text-on-surface-variant uppercase text-xs tracking-widest font-mono">
                ACTIVE APPLICATIONS
              </p>
            </div>
          </GlassLeafCard>

          {/* Offers Received */}
          <GlassLeafCard
            className="p-6 relative overflow-hidden"
            style={{ backgroundImage: dottedPattern }}
          >
            <div className="relative z-10">
              <Gift className="w-12 h-12 text-warning mb-4" />
              <p className="text-[64px] font-black text-on-surface tabular-nums leading-none mb-2">2</p>
              <p className="text-on-surface-variant uppercase text-xs tracking-widest font-mono">
                OFFERS RECEIVED
              </p>
            </div>
          </GlassLeafCard>

          {/* Connections */}
          <GlassLeafCard
            className="p-6 relative overflow-hidden"
            style={{ backgroundImage: dottedPattern }}
          >
            <div className="relative z-10">
              <TrendingUp className="w-12 h-12 text-secondary mb-4" />
              <p className="text-[64px] font-black text-on-surface tabular-nums leading-none mb-2">45</p>
              <p className="text-on-surface-variant uppercase text-xs tracking-widest font-mono">
                CONNECTIONS
              </p>
            </div>
          </GlassLeafCard>
        </motion.div>

        {/* Quick Actions - Pebble Shape Buttons */}
        <motion.div variants={item} className="flex gap-4 mb-12 flex-wrap">
          {/* Create New Document - Secondary (Terracotta) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 27 }}
            className="bg-secondary-container text-on-secondary-container py-4 px-8 rounded-[20px_20px_32px_32px] hover:bg-secondary transition-colors font-bold uppercase tracking-wide flex items-center gap-3 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Document</span>
          </motion.button>

          {/* View Analytics - Neutral */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 27 }}
            className="bg-surface-container-high text-on-surface border border-outline-variant py-4 px-8 rounded-[20px_20px_32px_32px] hover:bg-surface-bright transition-colors uppercase tracking-wide font-bold shadow-md"
          >
            View Analytics
          </motion.button>

          {/* CONNECT - Primary (Sage Green) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 27 }}
            className="bg-primary-container text-on-primary-container py-4 px-8 rounded-[20px_20px_32px_32px] hover:bg-primary transition-colors font-bold uppercase tracking-wide shadow-lg"
          >
            🔌 CONNECT
          </motion.button>
        </motion.div>

        {/* Application Profiles - Figma Spec */}
        <motion.div variants={item} className="mb-8">
          <h3 className="mb-6 text-[32px] uppercase font-black tracking-tight text-on-surface">
            YOUR APPLICATION <span className="text-primary">PROFILES</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFILES.map((profile, idx) => (
              <GlassLeafCard
                key={idx}
                className="p-6 relative overflow-hidden"
                style={{ backgroundImage: dottedPattern }}
              >
                <div className="relative z-10">
                  <div className="mb-4">
                    <p className="text-on-surface mb-1 font-bold text-lg">{profile.name}</p>
                    <p className="text-on-surface-variant uppercase text-xs tracking-wider font-mono">
                      {profile.company}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[48px] text-primary font-black tabular-nums leading-none">
                        {profile.score}
                      </p>
                      <p className="text-on-surface-variant uppercase text-xs tracking-wider font-mono">
                        ATS SCORE
                      </p>
                    </div>
                    <div
                      className={`
                        px-4 py-2 rounded-full uppercase text-xs tracking-wider font-mono font-bold
                        ${profile.status === 'EXCELLENT'
                          ? 'bg-primary-container text-on-primary-container'
                          : profile.status === 'GOOD'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-error-container text-on-error-container'
                        }
                      `}
                    >
                      {profile.status}
                    </div>
                  </div>
                </div>
              </GlassLeafCard>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </GardenLayout>
  );
}
