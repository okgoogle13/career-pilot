
import type { Meta, StoryObj } from '@storybook/react';
import { GlassLeafCard } from './GlassLeafCard';

const meta: Meta<typeof GlassLeafCard> = {
    title: 'UI/GlassLeafCard',
    component: GlassLeafCard,
    tags: ['autodocs'],
    argTypes: {
        intensity: {
            control: 'select',
            options: ['light', 'medium', 'heavy'],
        },
        variant: {
            control: 'select',
            options: ['default', 'interactive'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof GlassLeafCard>;

export const Default: Story = {
    args: {
        title: 'Botanical Analysis',
        subtitle: 'Specimen 084',
        intensity: 'medium',
        children: (
            <div className="p-4 text-sm text-secondary-flannel-flower">
                <p>The specimen exhibits unique characteristics consistent with the Banksia family. Note the serrated leaf margins and dense follicle formation.</p>
            </div>
        ),
    },
};

export const HeavyFrost: Story = {
    args: {
        ...Default.args,
        intensity: 'heavy',
        title: 'Cryo Preservation',
    },
};

export const Interactive: Story = {
    args: {
        ...Default.args,
        variant: 'interactive',
        className: 'w-[350px] h-[200px]',
    },
    parameters: {
        layout: 'centered',
    },
};
