import React from 'react';
import { Link } from 'react-router-dom';
import { PlasmaBackground } from '../../components/shared/PlasmaBackground';
import { SplitHeader } from '../../legacy/ui/SplitHeader';
import { Button } from '../../legacy/ui/button';
import { TechCard } from '../../features/analysis/components/TechCard';

// Australian Native Flora (PNGs with transparency)
import nativeWaratahPot from '../../assets/images/native-waratah-pot.png';
import nativeWaratahHanging from '../../assets/images/native-waratah-hanging.png';
import nativeGumHanging from '../../assets/images/native-gum-hanging.png';
import nativeKangarooPaw from '../../assets/images/native-kangaroo-paw.png';

export function LandingPage(): React.ReactElement {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4">
      {/* LAYER 0: Plasma Background */}
      <PlasmaBackground />

      {/* LAYER 1: Plant Illustrations (Absolute Positioning) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <img
          src={nativeGumHanging}
          alt="Flowering Gum"
          className="absolute top-0 left-0 w-64 md:w-96 opacity-90 animate-shimmer"
        />
        <img
          src={nativeWaratahHanging}
          alt="Hanging Waratah"
          className="absolute top-0 right-0 w-48 md:w-72 opacity-90"
        />
        <img
          src={nativeWaratahPot}
          alt="Banksia Pot"
          className="absolute bottom-0 left-0 w-56 md:w-80 opacity-90"
        />
        <img
          src={nativeKangarooPaw}
          alt="Kangaroo Paw"
          className="absolute bottom-0 right-0 w-40 md:w-64 opacity-90"
        />
      </div>

      {/* LAYER 2: Hero Card */}
      <div className="relative z-20 max-w-2xl w-full">
        <TechCard title="Career Copilot" className="text-center space-y-8 backdrop-blur-md bg-opacity-90">
          <SplitHeader
            trunkText="Career"
            vineText="Copilot"
          />

          <p className="text-xl md:text-2xl text-parchment/80 font-field-note italic">
            Stop procrastinating and get a job ya knob
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full font-bold text-lg">
                Sign In
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full font-bold text-lg">
                Register
              </Button>
            </Link>
            <Link to="/dashboard?demo=true" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full opacity-70 hover:opacity-100">
                Explore as Guest
              </Button>
            </Link>
          </div>
        </TechCard>
      </div>
    </div>
  );
}

export default LandingPage;
