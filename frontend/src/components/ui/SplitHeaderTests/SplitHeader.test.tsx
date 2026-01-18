import React from 'react';
import { render, screen } from '@testing-library/react';
import { SplitHeader } from '../SplitHeader';
import '@testing-library/jest-dom';

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
        const { container } = render(
            <SplitHeader trunkText="TRUNK" vineText="Vine" vineRotation={12} />
        );
        // Find the element with the vine text
        const vineElement = screen.getByText('Vine');
        // Check if the style contains the rotation.
        // Note: Framer Motion might apply styles inline or via transform matrix.
        // Simple check for inline style first.
        expect(vineElement).toHaveStyle('transform: rotate(12deg) translateZ(0)');
    });
});
