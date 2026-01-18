

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { NorthcoteButton } from '../../components/ui/NorthcoteButton';
import { CodePreview } from '../../components/shared/CodePreview';
import { KeywordTag } from '../../components/shared/KeywordTag';
import { Leaf, Cpu, Shapes, Gem, Layers, Type, Palette, Ban, CheckCircle, Smartphone, Play, Pause, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { MorphPreviewer, AxisVisualizer, SlopAuditor } from './M3ExpressiveComponents';

export function StyleGuide() {
    const [activeTab, setActiveTab] = useState('overview');

    const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`;

    return (
        <div
            className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen bg-background text-on-background"
            style={{ backgroundImage: noiseOverlay }}
        >
            <div className="animate-in slide-in-from-top-4 fade-in duration-700 ease-spring-decelerate">
                <PageHeader
                    title="Living Style Guide"
                    description="The Golden Master definition of the Northcote Curio aesthetic (M3 Expressive)."
                    highlightedWord="Style Guide"
                />
            </div>

            <div className="flex gap-4 mb-12 overflow-x-auto pb-4 border-b border-outline-variant">
                {['overview', 'm3-expressive', 'shapes', 'colors', 'typography', 'layout', 'components'].map((tab) => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 font-bold uppercase tracking-wide text-sm whitespace-nowrap ${activeTab === tab
                            ? 'bg-primary-container text-on-primary-container shadow-elevation-1'
                            : 'hover:bg-surface-container-highest text-on-surface-variant'
                            }`}
                        style={{ clipPath: 'var(--md-ref-shape-pebble)' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 27 }}
                    >
                        {tab.replace(/-/g, ' ')}
                    </motion.button>
                ))}
            </div>

            {/* SECTION: M3 EXPRESSIVE INTERACTIVE LAB */}
            {activeTab === 'm3-expressive' && (
                <section className="animate-in slide-in-from-bottom-8 fade-in duration-500 space-y-8">
                    <div className="text-center mb-12">
                        <h2 className="text-display-small font-black uppercase mb-4 flex items-center justify-center gap-3">
                            <Cpu className="w-8 h-8 text-primary" />
                            M3 Expressive Interactive Lab
                        </h2>
                        <p className="text-lg text-on-surface-variant max-w-3xl mx-auto">
                            Live demonstrations of M3 Expressive principles: path-based shapes, parametric typography,
                            and the Anti-Slop Rule. Interact with each component to see the mathematics in action.
                        </p>
                    </div>

                    <MorphPreviewer />
                    <AxisVisualizer />
                    <SlopAuditor />

                    <div className="bg-primary/5 p-8 rounded-xl border-2 border-primary/20">
                        <h3 className="text-title-large font-bold mb-4 text-primary">Key Takeaways</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-bold mb-2">1. Polygon Shapes</h4>
                                <p className="text-sm text-on-surface-variant">
                                    Use <code className="text-primary">clip-path</code> polygons, not <code className="text-error">border-radius</code>.
                                    Shapes must be organic and morphable.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">2. Spring Physics</h4>
                                <p className="text-sm text-on-surface-variant">
                                    Always use <code className="text-primary">stiffness: 500, damping: 27</code> for M3 Expressive Default.
                                    Creates characteristic "bounce".
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">3. Anti-Slop Rule</h4>
                                <p className="text-sm text-on-surface-variant">
                                    <code className="text-error">font-weight</code> MUST stay constant.
                                    Use <code className="text-primary">GRAD</code> and <code className="text-primary">wdth</code> axes instead.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION: SHAPES (Core DNA) */}
            {activeTab === 'shapes' && (
                <section className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <h2 className="text-display-small font-black uppercase mb-8 flex items-center gap-3">
                        <Shapes className="w-8 h-8 text-primary" /> Shape System
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* The Pebble */}
                        <div className="p-8 bg-surface-container rounded-pebble border border-outline-variant">
                            <h3 className="text-headline-small font-bold mb-2">The Pebble</h3>
                            <p className="mb-4 text-on-surface-variant">Friendly, organic, touchable. Primary shape for interactives.</p>
                            <div className="h-24 bg-tertiary-container rounded-pebble mb-4 flex items-center justify-center text-on-tertiary-container font-mono">20px 20px 32px 32px</div>
                            <CodePreview code='className="rounded-pebble"' />
                        </div>

                        {/* The Gem */}
                        <div className="p-8 bg-surface-container rounded-gem border border-outline-variant">
                            <h3 className="text-headline-small font-bold mb-2">The Gem</h3>
                            <p className="mb-4 text-on-surface-variant">Sharp, precise, striking. For highlights and wow moments.</p>
                            <div className="h-24 bg-primary-container rounded-gem mb-4 flex items-center justify-center text-on-primary-container font-mono">40px 8px 40px 8px</div>
                            <CodePreview code='className="rounded-gem"' />
                        </div>

                        {/* The Leaf */}
                        <div className="p-8 bg-surface-container rounded-leaf border border-outline-variant">
                            <h3 className="text-headline-small font-bold mb-2">The Leaf</h3>
                            <p className="mb-4 text-on-surface-variant">Growth, asymmetry. For large content containers.</p>
                            <div className="h-24 bg-secondary-container rounded-leaf mb-4 flex items-center justify-center text-on-secondary-container font-mono">32px 12px 32px 12px</div>
                            <CodePreview code='className="rounded-leaf"' />
                        </div>

                        {/* The Tech Edge */}
                        <div className="p-8 bg-surface-container rounded-tech-edge border border-outline-variant">
                            <h3 className="text-headline-small font-bold mb-2">The Tech</h3>
                            <p className="mb-4 text-on-surface-variant">Digital precision. For data visualization and tools.</p>
                            <div className="h-24 bg-surface-dim rounded-tech-edge mb-4 flex items-center justify-center text-on-surface font-mono">24px 4px 24px 20px</div>
                            <CodePreview code='className="rounded-tech-edge"' />
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION: COLORS (Atmosphere) */}
            {activeTab === 'colors' && (
                <section className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <h2 className="text-display-small font-black uppercase mb-8 flex items-center gap-3">
                        <Palette className="w-8 h-8 text-secondary" /> Color Palette
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-title-large font-bold mb-4">Core Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { name: 'Primary', token: 'bg-primary', text: 'text-on-primary', shape: 'rounded-pebble' },
                                    { name: 'Secondary', token: 'bg-secondary', text: 'text-on-secondary', shape: 'rounded-leaf' },
                                    { name: 'Tertiary', token: 'bg-tertiary', text: 'text-on-tertiary', shape: 'rounded-gem' },
                                    { name: 'Error', token: 'bg-error', text: 'text-on-error', shape: 'rounded-tech-edge' },
                                ].map((c) => (
                                    <div key={c.name} className={`p-6 ${c.token} ${c.text} ${c.shape} shadow-elevation-1`}>
                                        <div className="font-black text-lg">{c.name}</div>
                                        <div className="text-xs opacity-70 font-mono mt-1">{c.token}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-title-large font-bold mb-4 flex items-center gap-2">
                                <Ban className="w-6 h-6 text-error" /> Anti-Slop: Do's & Don'ts
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 border border-error rounded-xl bg-error-container/10">
                                    <h4 className="font-bold text-error mb-2 uppercase tracking-wide">❌ SLOP (Don't)</h4>
                                    <div className="h-24 bg-gradient-to-r from-[#7C4DFF] to-[#9C27B0] rounded-md mb-2 flex items-center justify-center text-white font-bold">Purple Gradient on White</div>
                                    <p className="text-sm text-on-surface-variant">Avoid generic purple gradients.</p>
                                </div>
                                <div className="p-6 border border-green-500 rounded-xl bg-green-500/10">
                                    <h4 className="font-bold text-green-700 mb-2 uppercase tracking-wide">✅ EXPRESSIVE (Do)</h4>
                                    <div className="h-24 bg-atmospheric-vibrant rounded-md mb-2 flex items-center justify-center text-white font-black tracking-wider">LAYERED ATMOSPHERE</div>
                                    <p className="text-sm text-on-surface-variant">Use complex, layered gradients.</p>
                                    <CodePreview code='className="bg-atmospheric-vibrant"' />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION: TYPOGRAPHY (Voice) */}
            {activeTab === 'typography' && (
                <section className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <h2 className="text-display-small font-black uppercase mb-8 flex items-center gap-3">
                        <Type className="w-8 h-8 text-tertiary" /> Typography
                    </h2>
                    <div className="space-y-8 bg-surface-container p-8 rounded-leaf border border-outline-variant">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <p className="text-label-small uppercase tracking-widest text-on-surface-variant mb-1">Display Large</p>
                                    <h1 className="text-display-large font-black">Northcote Curio</h1>
                                    <CodePreview code='className="text-display-large font-black"' />
                                </div>
                                <hr className="border-outline-variant" />
                                <div>
                                    <p className="text-label-small uppercase tracking-widest text-on-surface-variant mb-1">Headline Medium</p>
                                    <h2 className="text-headline-medium font-bold">Responsive Design System</h2>
                                    <CodePreview code='className="text-headline-medium font-bold"' />
                                </div>
                            </div>

                            <div className="bg-surface-dim p-6 rounded-tech-edge space-y-4">
                                <h4 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> Pairing Rules
                                </h4>
                                <ul className="text-sm space-y-2 text-on-surface-variant">
                                    <li>• <strong>Display:</strong> Plus Jakarta Sans (Variable)</li>
                                    <li>• <strong>Mono:</strong> JetBrains Mono</li>
                                    <li>• <strong>Weight:</strong> Contrast 100 vs 900</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION: LAYOUT (Geometry) */}
            {activeTab === 'layout' && (
                <section className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <h2 className="text-display-small font-black uppercase mb-8 flex items-center gap-3">
                        <Layers className="w-8 h-8 text-primary" /> Layout & Grid
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="bg-surface-container p-8 rounded-tech-edge border border-outline-variant">
                            <h3 className="text-headline-small font-bold mb-4">4px Spatial Grid</h3>
                            <p className="mb-6 text-on-surface-variant">All margins and padding must be multiples of 4.</p>

                            <div className="flex flex-wrap items-end gap-4 font-mono text-xs text-center text-on-primary-container">
                                {[4, 8, 12, 16, 24, 32, 48, 64].map(size => (
                                    <div key={size} style={{ width: size, height: size * 2 }} className="bg-primary/20 border border-primary relative group">
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-on-surface">{size}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12">
                                <CodePreview code='className="p-4 gap-4 m-8" // Multiples of 4' />
                            </div>
                        </div>

                        <div className="bg-surface-container p-8 rounded-tech-edge border border-outline-variant">
                            <h3 className="text-headline-small font-bold mb-4">Elevation (Depth)</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="h-24 bg-surface rounded-pebble shadow-elevation-1 flex items-center justify-center font-bold">Level 1</div>
                                <div className="h-24 bg-surface rounded-pebble shadow-elevation-3 flex items-center justify-center font-bold">Level 3</div>
                                <div className="h-24 bg-surface rounded-pebble shadow-elevation-5 flex items-center justify-center font-bold">Level 5</div>
                                <div className="h-24 bg-surface rounded-pebble shadow-glow-primary flex items-center justify-center font-bold text-primary">Glow</div>
                            </div>
                            <CodePreview code='className="shadow-elevation-3"' />
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION: COMPONENTS (Gallery) */}
            {activeTab === 'components' && (
                <section className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-display-small font-black uppercase flex items-center gap-3">
                            <Smartphone className="w-8 h-8 text-tertiary" /> Components
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Buttons */}
                        <div className="p-8 bg-surface-container rounded-leaf border border-outline-variant space-y-6">
                            <h3 className="text-title-large font-bold">Interactive Buttons</h3>
                            <div className="flex flex-wrap gap-4">
                                <NorthcoteButton className="rounded-pebble px-8 py-6 font-bold shadow-lg bg-primary text-on-primary hover:scale-105 active:scale-95 transition-transform">
                                    Primary Action
                                </NorthcoteButton>
                                <NorthcoteButton variant="secondary" className="rounded-pebble px-8 py-6 font-bold bg-secondary-container text-on-secondary-container">
                                    Secondary
                                </NorthcoteButton>
                            </div>
                            <CodePreview code='<Button className="rounded-pebble hover:scale-105 active:scale-95" />' />
                        </div>

                        {/* Chips & Tags */}
                        <div className="p-8 bg-surface-container rounded-leaf border border-outline-variant space-y-6">
                            <h3 className="text-title-large font-bold">Chips & Tags</h3>
                            <div className="flex gap-3">
                                <KeywordTag keyword="React" className="rounded-gem hover:rotate-2 transition-transform" />
                                <KeywordTag keyword="TypeScript" className="rounded-gem hover:-rotate-2 transition-transform" />
                                <div className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-gem text-xs font-bold uppercase">
                                    New
                                </div>
                            </div>
                            <CodePreview code='className="rounded-gem" // Use for tags' />
                        </div>
                    </div>
                </section>
            )}

            {/* Default Landing (Overview) */}
            {activeTab === 'overview' && (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
                    <h2 className="text-[64px] md:text-[80px] font-black leading-none mb-6">
                        Northcote <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Curio</span>
                    </h2>
                    <p className="text-2xl text-on-surface-variant max-w-2xl mx-auto mb-12">
                        The M3 Expressive design system for Career Copilot.
                        Use the tabs above to explore the DNA of our aesthetic.
                    </p>
                    <button
                        onClick={() => setActiveTab('shapes')}
                        className="bg-primary text-on-primary px-8 py-4 rounded-pebble font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-glow-primary"
                    >
                        Start Exploring
                    </button>
                    <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-50">
                        <Leaf className="w-12 h-12 mx-auto" />
                        <Shapes className="w-12 h-12 mx-auto" />
                        <Gem className="w-12 h-12 mx-auto" />
                    </div>
                </div>
            )}
        </div>
    );
}