
import type { Meta, StoryObj } from '@storybook/react';
import { TechCard } from '../../features/analysis/components/TechCard';
import { Cloud, Code2, Database, Shield } from 'lucide-react';

const meta: Meta<typeof TechCard> = {
    title: 'UI/TechCard',
    component: TechCard,
    tags: ['autodocs'],
    argTypes: {
        level: {
            control: 'select',
            options: ['beginner', 'intermediate', 'advanced', 'expert'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof TechCard>;

export const Default: Story = {
    args: {
        title: 'Data Integration',
        description: 'Connect disparate data sources into a unified pipeline suitable for analysis.',
        icon: <Database className="h-6 w-6" />,
        tags: ['Pipeline', 'ETL', 'Real-time'],
        level: 'intermediate',
    },
};

export const GalleryMode: Story = {
    parameters: {
        layout: 'centered',
        backgrounds: { default: 'dark' },
    },
    args: {
        ...Default.args,
        className: 'w-[400px]',
    },
};

export const ExpertLevel: Story = {
    args: {
        title: 'Advanced Security',
        description: 'Implement zero-trust architecture and cryptographic verification for all data streams.',
        icon: <Shield className="h-6 w-6" />,
        tags: ['Security', 'Encryption', 'Zero-Trust'],
        level: 'expert',
    },
};
