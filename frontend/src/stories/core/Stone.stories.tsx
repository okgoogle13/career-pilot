
import type { Meta, StoryObj } from '@storybook/react';
import { Stone } from '../../components/core/Stone';
import { Pebble } from '../../components/core/Pebble';
import { Plus } from 'lucide-react';

const meta = {
    title: 'Core Components/Stone (Containers)',
    component: Stone,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        mode: {
            control: 'radio',
            options: ['gallery', 'laboratory'],
        },
        elevation: {
            control: 'select',
            options: ['flat', 'raised', 'floating'],
        },
    },
} satisfies Meta<typeof Stone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GalleryCard: Story = {
    args: {
        mode: 'gallery',
        elevation: 'raised',
        header: <h3 className="text-bloom text-xl">The Specimen</h3>,
        children: (
            <p className="text-body text-text-secondary">
                This is a standard "Stone" container in Gallery mode.
                It features the organic asymmetry and warm glass background.
            </p>
        ),
        footer: (
            <div className="flex justify-end">
                <Pebble size="sm" variant="ghost">View Details</Pebble>
            </div>
        ),
    },
};

export const LaboratoryPanel: Story = {
    args: {
        mode: 'laboratory',
        elevation: 'flat',
        header: (
            <div className="flex items-center justify-between">
                <h3 className="text-mono text-xs tracking-widest text-primary">DATA_INGEST_01</h3>
                <Pebble size="sm" variant="secondary" iconLeft={<Plus className="w-3 h-3" />}>ADD</Pebble>
            </div>
        ),
        children: (
            <div className="space-y-4">
                <div className="h-2 bg-white/5 rounded-seed w-3/4"></div>
                <div className="h-2 bg-white/5 rounded-seed w-1/2"></div>
                <p className="text-mono text-xs text-white/40 mt-4">System ready via port 3000.</p>
            </div>
        ),
    },
};
