import type { Meta, StoryObj } from '@storybook/react';
import { ChartPane } from './ChartPane';

const meta = {
    title: 'Shared/ChartPane',
    component: ChartPane,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
    },
} satisfies Meta<typeof ChartPane>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default with Simple Content
export const Default: Story = {
    args: {
        title: 'Resume Visibility',
        children: (
            <div className="h-40 flex items-center justify-center text-gray-500 bg-white/50 rounded-leaf">
                [Chart Placeholder]
            </div>
        ),
    },
    render: (args) => (
        <div className="w-[500px]">
            <ChartPane {...args} />
        </div>
    ),
};

// 2. With Complex Content (Simulated Grid)
export const WithContent: Story = {
    args: {
        title: 'Market Trends',
        children: (
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-primary/10 rounded-leaf text-center">
                    <div className="text-2xl font-bold text-primary">High</div>
                    <div className="text-xs uppercase text-gray-500">Demand</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-leaf text-center">
                    <div className="text-2xl font-bold text-secondary">Top 10%</div>
                    <div className="text-xs uppercase text-gray-500">Salary</div>
                </div>
                <div className="p-4 bg-tertiary/10 rounded-leaf text-center">
                    <div className="text-2xl font-bold text-tertiary">Remote</div>
                    <div className="text-xs uppercase text-gray-500">Availability</div>
                </div>
            </div>
        ),
    },
    render: (args) => (
        <div className="w-[600px]">
            <ChartPane {...args} />
        </div>
    ),
};
