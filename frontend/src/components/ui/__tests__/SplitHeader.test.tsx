import React from 'react';
import { render, screen } from '@testing-library/react';
import { SplitHeader } from '../SplitHeader';
import '@testing-library/jest-dom';

// Mock Framer Motion to avoid animation timing issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        h1: ({ children, className, style }: any) => (
            <h1 className={className} style={style}>{children}</h1>
        ),
        span: ({ children, className, style }: any) => (
            <span className={className} style={style}>{children}</span>
        ),
    },
}));

describe('SplitHeader', () => {
    it('renders the trunk text (Proclamation)', () => {
        render(<SplitHeader trunkText="TRUNK" vineText="Vine" />);
        expect(screen.getByText('TRUNK')).toBeInTheDocument();
    });

    it('renders the vine text (Bloom)', () => {
        render(<SplitHeader trunkText="TRUNK" vineText="Vine" />);
        expect(screen.getByText('Vine')).toBeInTheDocument();
    });

    it('applies rotation style to vine text', () => {
        render(
            <SplitHeader trunkText="TRUNK" vineText="Vine" vineRotation={12} />
        );
        const vineElement = screen.getByText('Vine');
        // With the mock, the style prop is passed directly to the span
        // The component logic puts transform: rotate(...) in style
        expect(vineElement).toHaveStyle('transform: rotate(12deg)');
    });
});
