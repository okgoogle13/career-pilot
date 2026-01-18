
import type { Meta, StoryObj } from '@storybook/react';
import { Stone } from '../../components/core/Stone';
import { Pebble } from '../../components/core/Pebble';
import { Leaf } from '../../components/core/Leaf';
import { Download, Send, ArrowRight } from 'lucide-react';

const meta = {
    title: 'Flows/Pollination (Output)',
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ApplicationReady: Story = {
    render: () => (
        <div className="min-h-screen p-8 bg-gallery-gradient grid place-items-center">
            <div className="max-w-3xl w-full">

                <div className="mb-12 text-center">
                    <Leaf role="hero" label="Success">POLLINATION</Leaf>
                    <Leaf role="body" className="mx-auto mt-4">
                        Your materials have been synthesized and optimized for the target environment.
                    </Leaf>
                </div>

                <Stone mode="gallery" elevation="floating" className="relative">
                    {/* Decorative "Stamp" */}
                    <div className="absolute -top-6 -right-6 bg-primary text-surface font-bold font-mono px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                        MATCH_98%
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Output 1: Cover Letter */}
                        <div className="space-y-4">
                            <Leaf role="title" as="h3" className="text-xl">Cover Letter</Leaf>
                            <div className="p-4 bg-black/20 rounded-stone h-48 overflow-hidden text-sm text-text-secondary leading-relaxed opacity-60">
                                <p>Dear Hiring Manager,</p>
                                <p className="mt-2">I am writing to express my strong interest in the Senior Frontend Engineer...</p>
                                <div className="mt-4 h-2 bg-white/10 w-full rounded"></div>
                                <div className="mt-2 h-2 bg-white/10 w-3/4 rounded"></div>
                            </div>
                            <div className="flex gap-2">
                                <Pebble variant="secondary" size="sm" iconLeft={<Download className="w-3 h-3" />}>PDF</Pebble>
                                <Pebble variant="secondary" size="sm" iconLeft={<FileText className="w-3 h-3" />}>DOCX</Pebble>
                            </div>
                        </div>

                        {/* Output 2: Resume */}
                        <div className="space-y-4">
                            <Leaf role="title" as="h3" className="text-xl">Optimized Resume</Leaf>
                            <div className="p-4 bg-black/20 rounded-stone h-48 overflow-hidden text-sm text-text-secondary leading-relaxed opacity-60">
                                <div className="flex justify-between font-bold text-white mb-2">
                                    <span>EXPERIENCE</span>
                                </div>
                                <p>Senior Engineer • Google Deepmind</p>
                                <div className="mt-4 h-2 bg-white/10 w-full rounded"></div>
                                <div className="mt-2 h-2 bg-white/10 w-3/4 rounded"></div>
                            </div>
                            <div className="flex gap-2">
                                <Pebble variant="secondary" size="sm" iconLeft={<Download className="w-3 h-3" />}>PDF</Pebble>
                                <Pebble variant="ghost" size="sm">Preview</Pebble>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                        <Leaf role="body" className="text-sm">Generated in 1.4s</Leaf>
                        <Pebble variant="primary" size="lg" iconRight={<Send className="w-4 h-4" />}>
                            Apply via LinkedIn
                        </Pebble>
                    </div>
                </Stone>

            </div>
        </div>
    ),
};

// Helper for icon
function FileText({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
    );
}
