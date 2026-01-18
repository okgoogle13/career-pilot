import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { M3Card, M3CardHeader, M3CardContent, M3CardActions } from './M3Card';
import { M3Button } from './M3Button';
import { MoreVertical, User, Star } from 'lucide-react';

const meta = {
    title: 'UI/M3Card',
    component: M3Card,
    subcomponents: { M3CardHeader, M3CardContent, M3CardActions } as any, // Type assertion for subcomponents
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['pebble', 'tech', 'leaf', 'gem'],
        },
        elevation: {
            control: { type: 'range', min: 0, max: 5 },
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
        },
        hoverable: {
            control: 'boolean',
        },
    },
    args: {
        variant: 'pebble',
        elevation: 1,
        padding: 'lg',
        hoverable: false,
    },
} satisfies Meta<typeof M3Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Simple Card
export const Simple: Story = {
    args: {
        children: (
            <M3CardContent>
                <h3 className="text-xl font-bold mb-2">Simple Card</h3>
                <p>This is a basic card with just content.</p>
            </M3CardContent>
        ),
    },
};

// 2. Full Complex Card
export const FullCard: Story = {
    render: (args) => (
        <M3Card {...args} className="w-[350px]">
            <M3CardHeader
                title="Jane Doe"
                subtitle="Software Engineer"
                icon={<div className="w-10 h-10 bg-primary/20 flex items-center justify-center" style={{ clipPath: 'var(--md-ref-shape-gem)' }}><User className="text-primary" /></div>}
                action={<MoreVertical className="text-gray-500" />}
            />
            <M3CardContent>
                <p>
                    Passionate about building scalable web applications and AI integration.
                    Currently working on CareerCopilot.
                </p>
            </M3CardContent>
            <M3CardActions>
                <M3Button variant="text">Dismiss</M3Button>
                <M3Button variant="filled">Connect</M3Button>
            </M3CardActions>
        </M3Card>
    ),
};

// 3. Tech Variant
export const TechVariant: Story = {
    args: {
        variant: 'tech',
        children: (
            <M3CardContent>
                <h3 className="font-mono text-lg mb-2">System Status</h3>
                <div className="flex justify-between items-center text-sm font-mono">
                    <span>CPU Usage</span>
                    <span className="text-green-600">45%</span>
                </div>
            </M3CardContent>
        ),
    },
};

// 4. Leaf Variant (Feature Highlight)
export const LeafVariant: Story = {
    args: {
        variant: 'leaf',
        elevation: 2,
        className: 'bg-primary-container text-on-primary-container',
        children: (
            <M3CardContent>
                <div className="flex items-center gap-2 mb-2">
                    <Star className="fill-current" />
                    <h3 className="text-lg font-bold">New Feature</h3>
                </div>
                <p>Smart ingestion is now live! Upload your resume today.</p>
            </M3CardContent>
        ),
    },
};

// 5. Gem Variant (High Emphasis)
export const GemVariant: Story = {
    args: {
        variant: 'gem',
        elevation: 3,
        padding: 'xl',
        children: (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
                <M3Button fullWidth>Upgrade Now</M3Button>
            </div>
        ),
    },
};

// 6. Interactive
export const Interactive: Story = {
    args: {
        hoverable: true,
        onClick: fn(),
        children: (
            <M3CardContent>
                <h3 className="font-bold">Click Me</h3>
                <p>I have hover effects and an onClick handler.</p>
            </M3CardContent>
        ),
    },
};
