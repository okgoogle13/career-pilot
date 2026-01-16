/**
 * Quick Integration Guide for M3 Expressive Interactive Lab
 * 
 * This file shows exactly what to add to StyleGuide.tsx to enable 
 * the interactive M3 Expressive components.
 */

// ============================================================================
// STEP 1: The components are already imported in StyleGuide.tsx (line 9):
// ============================================================================
import { MorphPreviewer, AxisVisualizer, SlopAuditor } from './M3ExpressiveComponents';

// ============================================================================
// STEP 2: Update the tabs array (around line 30) to include 'm3-expressive':
// ============================================================================

// FIND THIS:
{
    ['overview', 'shapes', 'colors', 'typography', 'layout', 'components'].map((tab) => (

        // REPLACE WITH:
        {
            ['overview', 'm3-expressive', 'shapes', 'colors', 'typography', 'layout', 'components'].map((tab) => (

// AND UPDATE the tab display text:
// FIND THIS (around line 39):
                    >
                { tab }
                    </button >

// REPLACE WITH:
                    >
                { tab.replace(/-/g, ' ') }
                    </button >

                // ============================================================================
                // STEP 3: Add the M3 Expressive section RIGHT BEFORE the shapes section
                // INSERT this code after line 43 (after the </div> closing the tabs):
                // ============================================================================

                {/* SECTION: M3 EXPRESSIVE INTERACTIVE LAB */ }
            { activeTab === 'm3-expressive' && (
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

// ============================================================================
// DONE! The M3 Expressive tab should now appear in the StyleGuide
// ============================================================================

/**
 * To test:
 * 1. npm run dev
 * 2. Navigate to /style-guide
 * 3. Click the "M3 EXPRESSIVE" tab
 * 4. Interact with:
 *    - Morph Previewer: Toggle shapes and see clip-path values
 *    - Axis Visualizer: Hover to see typography axes change
 *    - Slop Auditor: Monitor for layout shifts
 */
