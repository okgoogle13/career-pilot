
import type { Meta, StoryObj } from '@storybook/react';
import { Stone } from '../../components/core/Stone';
import { Pebble } from '../../components/core/Pebble';
import { Leaf } from '../../components/core/Leaf';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

const meta = {
    title: 'Flows/Germination (Ingest)',
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const IngestionZone: Story = {
    render: () => (
        <div className="min-h-screen p-8 grid place-items-center bg-grid-major">
            <div className="max-w-4xl w-full space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <Leaf role="hero" label="Phase 01">GERMINATION</Leaf>
                    <Leaf role="body" className="mx-auto max-w-lg">
                        Begin the process by seeding the system with raw data.
                        Upload your Curriculum Vitae and target Job Description.
                    </Leaf>
                </div>

                {/* The Drop Zone (Composition of Stones) */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* CV Upload Status */}
                    <Stone
                        mode="gallery"
                        elevation="raised"
                        header={<Leaf role="title" as="h3">Specimen A: Profile</Leaf>}
                        className="h-64 flex flex-col"
                    >
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                            <Upload className="w-12 h-12 text-primary/50 group-hover:text-primary mb-4 transition-colors" />
                            <Leaf role="body" className="text-center">Drop PDF Resume Here</Leaf>
                            <Leaf role="data" className="mt-2 text-xs">AWAITING_INPUT</Leaf>
                        </div>
                    </Stone>

                    {/* JD Input Status */}
                    <Stone
                        mode="gallery"
                        elevation="raised"
                        header={<Leaf role="title" as="h3">Specimen B: Target</Leaf>}
                        className="h-64 flex flex-col"
                    >
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-success/30 bg-success/5 rounded-lg p-6">
                            <CheckCircle2 className="w-12 h-12 text-success mb-4" />
                            <Leaf role="body" className="text-center text-success">Job Description Parsed</Leaf>
                            <Leaf role="data" className="mt-2 text-xs text-success">READY_FOR_ANALYSIS</Leaf>
                        </div>
                    </Stone>
                </div>

                {/* Action Bar */}
                <div className="flex justify-center pt-8">
                    <Pebble
                        variant="primary"
                        size="lg"
                        iconRight={<FileText className="w-4 h-4" />}
                    >
                        Commence Analysis
                    </Pebble>
                </div>

            </div>
        </div>
    ),
};
