
import type { Meta, StoryObj } from '@storybook/react';
import { Stone } from '../../components/core/Stone';
import { Pebble } from '../../components/core/Pebble';
import { Leaf } from '../../components/core/Leaf';
import { Activity, Zap, GitBranch } from 'lucide-react';

const meta = {
    title: 'Flows/Dissection (Analysis)',
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AnalysisDashboard: Story = {
    render: () => (
        <div className="min-h-screen p-6 bg-[#16141A]">
            {/* Laboratory Mode Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <Leaf role="data" className="text-xl">LAB_SESSION_884</Leaf>
                <div className="flex gap-2">
                    <Leaf role="data" className="text-primary">STATUS: ACTIVE</Leaf>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* Main Analysis Panel */}
                <div className="col-span-8 space-y-6">
                    <Stone mode="laboratory" elevation="flat">
                        <div className="flex items-center justify-between mb-6">
                            <Leaf role="title" as="h3">Role Alignment Matrix</Leaf>
                            <Pebble variant="ghost" size="sm">Export Data</Pebble>
                        </div>

                        <div className="space-y-4">
                            {/* Mock Data Bars */}
                            {[92, 78, 85].map((score, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-xs font-mono text-white/60">
                                        <span>CRITERIA_0{i + 1}</span>
                                        <span>{score}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${score}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Stone>

                    <div className="grid grid-cols-2 gap-6">
                        <Stone mode="laboratory" elevation="flat" className="p-4">
                            <Zap className="text-primary w-6 h-6 mb-2" />
                            <Leaf role="data">KEYWORD_MATCH</Leaf>
                            <div className="text-3xl font-mono text-white mt-2">14/16</div>
                        </Stone>
                        <Stone mode="laboratory" elevation="flat" className="p-4">
                            <GitBranch className="text-primary w-6 h-6 mb-2" />
                            <Leaf role="data">SKILL_GAP</Leaf>
                            <div className="text-3xl font-mono text-white mt-2">LOW</div>
                        </Stone>
                    </div>
                </div>

                {/* Sidebar: Recommendations */}
                <div className="col-span-4">
                    <Stone mode="laboratory" elevation="raised" className="h-full border-l border-white/10">
                        <Leaf role="title" as="h3" className="mb-4">Optimization Log</Leaf>
                        <div className="space-y-4">
                            <div className="p-3 bg-white/5 rounded-seed border-l-2 border-warning">
                                <Leaf role="data" className="text-warning text-[10px] mb-1">WARNING</Leaf>
                                <Leaf role="body" className="text-sm">Action verbs in Section 2 lack impact.</Leaf>
                            </div>
                            <div className="p-3 bg-white/5 rounded-seed border-l-2 border-success">
                                <Leaf role="data" className="text-success text-[10px] mb-1">PASSED</Leaf>
                                <Leaf role="body" className="text-sm">Education requirement met.</Leaf>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Pebble variant="primary" className="w-full">Generate Cover Letter</Pebble>
                        </div>
                    </Stone>
                </div>

            </div>
        </div>
    ),
};
