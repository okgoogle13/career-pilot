import type { Meta, StoryObj } from '@storybook/react';
import { TechCard } from '@/features/analysis/TechCard';

const meta: Meta<typeof TechCard> = {
    title: 'Northcote/Shared/TechCard',
    component: TechCard,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'Specimen Night',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TechCard>;

export const Default: Story = {
    args: {
        children: <div className="text-parchment font-field-note">Basic Content Area</div>,
        className: 'w-64 h-32',
    },
};

export const WithHeader: Story = {
    args: {
        children: (
            <div className="space-y-4">
                <h3 className="text-wattle-gold font-bloom text-xl">System Status</h3>
                <p className="text-flannel-flower">All systems operational.</p>
            </div>
        ),
        className: 'w-80',
    },
};
