import { useState } from 'react';
import { M3TextField, M3TextArea } from '../../legacy/ui/M3TextField';
import { NorthcoteButton } from '../../components/ui/NorthcoteButton';
import { GardenLayout } from '@/components/layouts/GardenLayout';
import { AuroraHeader } from '@/components/ui/AuroraHeader';
import { GlassLeafCard } from '@/components/ui/GlassLeafCard';
import { NativeAnchor } from '@/components/ui/NativeAnchor';
import { motion } from 'framer-motion';

// Simple Toggle Component
const Toggle = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-surface-container-highest border border-outline'
      }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-surface transition duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'
        }`}
    />
  </button>
);

export function Settings() {
  const [firstName, setFirstName] = useState('Nishant');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('nishant@example.com');
  const [bio, setBio] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [applicationUpdates, setApplicationUpdates] = useState(true);
  const [jobMatches, setJobMatches] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Reusable card style
  const cardStyle = {
    backgroundImage: 'radial-gradient(circle, var(--sys-color-primary) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    backgroundBlendMode: 'overlay' as const,
    backgroundPosition: '0 0',
  };

  const tabs = ['Profile', 'Preferences', 'Notifications', 'Security'];

  return (
    <GardenLayout>
      {/* Plant Asset - Structural Integration */}
      <NativeAnchor variant="banksia" anchor="floor-left" blurIntensity="low" className="z-0 opacity-50" />

      <div className="p-6 md:p-12 max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <AuroraHeader
          title="Settings"
          tag="PREFERENCES"
          wittySubtitle="Manage your account preferences and settings"
        />

        {/* Tabs List */}
        <div className="w-full mb-8">
          <div className="bg-surface-container border border-outline-variant p-1 rounded-tech h-auto shadow-sm inline-flex">
            {tabs.map((tab) => {
              const tabId = tab.toLowerCase();
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabId)}
                  className={`
                    rounded-pebble px-6 py-2 transition-all ease-spring duration-300 font-medium text-sm
                    ${isActive
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-dim'
                    }
                  `}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <GlassLeafCard className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={cardStyle}>
              <h3 className="text-on-surface mb-6 text-headline-small font-bold">Profile Settings</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <M3TextField
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div>
                    <M3TextField
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </div>

                <div>
                  <M3TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <div>
                  <M3TextArea
                    label="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
                >
                  <NorthcoteButton className="bg-primary text-on-primary hover:bg-primary/90 rounded-[20px_20px_32px_32px] px-8 h-12 shadow-sm hover:shadow-elevation-1 transition-all ease-spring">
                    Save Changes
                  </NorthcoteButton>
                </motion.div>
              </div>
            </GlassLeafCard>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <GlassLeafCard className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={cardStyle}>
              <h3 className="text-on-surface mb-6 text-headline-small font-bold">Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-outline-variant">
                  <div>
                    <p className="text-on-surface font-medium">Dark Mode</p>
                    <p className="text-sm text-on-surface-variant">Use dark theme throughout the app</p>
                  </div>
                  <Toggle
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-outline-variant">
                  <div>
                    <p className="text-on-surface font-medium">Email Notifications</p>
                    <p className="text-sm text-on-surface-variant">Receive email updates and notifications</p>
                  </div>
                  <Toggle
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </div>
            </GlassLeafCard>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <GlassLeafCard className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={cardStyle}>
              <h3 className="text-on-surface mb-6 text-headline-small font-bold">Notification Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-outline-variant">
                  <div>
                    <p className="text-on-surface font-medium">Application Updates</p>
                    <p className="text-sm text-on-surface-variant">
                      Get notified about application status changes
                    </p>
                  </div>
                  <Toggle
                    checked={applicationUpdates}
                    onCheckedChange={setApplicationUpdates}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-outline-variant">
                  <div>
                    <p className="text-on-surface font-medium">Job Matches</p>
                    <p className="text-sm text-on-surface-variant">
                      Receive notifications for matching job opportunities
                    </p>
                  </div>
                  <Toggle
                    checked={jobMatches}
                    onCheckedChange={setJobMatches}
                  />
                </div>
              </div>
            </GlassLeafCard>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <GlassLeafCard className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={cardStyle}>
              <h3 className="text-on-surface mb-6 text-headline-small font-bold">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <M3TextField
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <div>
                  <M3TextField
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <div>
                  <M3TextField
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 27 }}
                >
                  <NorthcoteButton className="bg-primary text-on-primary hover:bg-primary/90 rounded-[20px_20px_32px_32px] px-8 h-12 shadow-sm hover:shadow-elevation-1 transition-all ease-spring">
                    Update Password
                  </NorthcoteButton>
                </motion.div>
              </div>
            </GlassLeafCard>
          )}
        </div>
      </div>
    </GardenLayout>
  );
}
