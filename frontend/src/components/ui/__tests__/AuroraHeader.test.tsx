import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuroraHeader } from '../AuroraHeader';
import '@testing-library/jest-dom';

describe('AuroraHeader', () => {
    it('renders the title correctly', () => {
        render(<AuroraHeader title="Test Title" tag="TEST" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders the tag correctly', () => {
        render(<AuroraHeader title="Test Title" tag="TEST TAG" />);
        expect(screen.getByText('TEST TAG')).toBeInTheDocument();
    });

    it('renders the subtitle when provided', () => {
        render(
            <AuroraHeader
                title="Test Title"
                tag="TEST"
                wittySubtitle="A witty subtitle"
            />
        );
        expect(screen.getByText('A witty subtitle')).toBeInTheDocument();
    });

    it('does not render subtitle when not provided', () => {
        render(<AuroraHeader title="Test Title" tag="TEST" />);
        const subtitle = screen.queryByText('A witty subtitle');
        expect(subtitle).not.toBeInTheDocument();
    });
});
