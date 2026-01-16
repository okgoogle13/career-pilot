import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';

const meta = {
    title: 'Shared/PageHeader',
    component: PageHeader,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        highlightedWord: { control: 'text' },
        description: { control: 'text' },
    },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default
export const Default: Story = {
    args: {
        title: 'Dashboard',
    },
};

// 2. With Highlighted Word
export const WithHighlight: Story = {
    args: {
        title: 'Career Copilot',
        highlightedWord: 'Copilot',
    },
};

// 3. With Description
export const WithDescription: Story = {
    args: {
        title: 'Settings',
        description: 'Manage your account preferences and application settings.',
    },
};

// 4. Full Complex Header
export const FullHeader: Story = {
    args: {
        title: 'Smart Ingestion',
        highlightedWord: 'Ingestion',
        description: 'Upload your resume and let our AI extract your skills and experience automatically.',
    },
};
