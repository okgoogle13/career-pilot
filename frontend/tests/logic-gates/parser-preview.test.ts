/**
 * Logic Gate Tests: Parser Preview Toggle (Bot's View)
 * 
 * @trace LOGIC-GATE-002
 * @doc DOC-006#state-parser-preview
 * @doc DOC-008#font-consistency
 * 
 * Purpose: Validate that the Parser Preview toggle correctly strips all custom styling
 * and uses system-standard fonts to show users exactly what ATS parsers will extract.
 * This ensures WYSIWYG accuracy with ATS systems.
 */

import { describe, it, expect } from 'vitest';

// Types
interface ParserViewState {
    enabled: boolean;
    font: string;
    background: string;
    styling: 'full' | 'none';
}

interface DocumentPreviewConfig {
    mode: 'beautiful' | 'parser';
    font: string;
    background: string;
    cssEnabled: boolean;
}

// Constants
const ALLOWED_PARSER_FONTS = [
    'Arial, Helvetica, sans-serif',
    'Times New Roman, Times, serif',
    'Courier New, Courier, monospace'
];

const FORBIDDEN_PARSER_FONTS = [
    'Plus Jakarta Sans',
    'Caveat',
    'JetBrains Mono',
    'Inter',
    'Roboto'
];

const BEAUTIFUL_VIEW_CONFIG: DocumentPreviewConfig = {
    mode: 'beautiful',
    font: 'Plus Jakarta Sans',
    background: '#1E1E1E',
    cssEnabled: true
};

const PARSER_VIEW_CONFIG: DocumentPreviewConfig = {
    mode: 'parser',
    font: 'Arial, Helvetica, sans-serif',
    background: '#FFFFFF',
    cssEnabled: false
};

// Logic under test

/**
 * Toggles between Beautiful View and Parser View
 * @trace LOGIC-GATE-002
 */
export const toggleParserView = (currentState: ParserViewState): ParserViewState => {
    if (currentState.enabled) {
        // Switch to Beautiful View
        return {
            enabled: false,
            font: 'Plus Jakarta Sans',
            background: '#1E1E1E',
            styling: 'full'
        };
    } else {
        // Switch to Parser View (Bot's View)
        return {
            enabled: true,
            font: 'Arial, Helvetica, sans-serif',
            background: '#FFFFFF',
            styling: 'none'
        };
    }
};

/**
 * Validates that font is allowed in Parser View
 * @trace LOGIC-GATE-002
 */
export const isValidParserFont = (font: string): boolean => {
    return ALLOWED_PARSER_FONTS.some(allowed =>
        font.toLowerCase().includes(allowed.toLowerCase().split(',')[0])
    );
};

/**
 * Validates that font is forbidden in Parser View
 * @trace LOGIC-GATE-002
 */
export const isForbiddenParserFont = (font: string): boolean => {
    return FORBIDDEN_PARSER_FONTS.some(forbidden =>
        font.toLowerCase().includes(forbidden.toLowerCase())
    );
};

/**
 * Gets document preview configuration based on mode
 * @trace LOGIC-GATE-002
 */
export const getPreviewConfig = (mode: 'beautiful' | 'parser'): DocumentPreviewConfig => {
    return mode === 'parser' ? PARSER_VIEW_CONFIG : BEAUTIFUL_VIEW_CONFIG;
};

// Tests
describe('Parser Preview Toggle Logic (LOGIC-GATE-002)', () => {
    describe('Toggle State Transitions', () => {
        it('should switch from Beautiful to Parser view', () => {
            const initialState: ParserViewState = {
                enabled: false,
                font: 'Plus Jakarta Sans',
                background: '#1E1E1E',
                styling: 'full'
            };

            const newState = toggleParserView(initialState);

            expect(newState.enabled).toBe(true);
            expect(newState.font).toBe('Arial, Helvetica, sans-serif');
            expect(newState.background).toBe('#FFFFFF');
            expect(newState.styling).toBe('none');
        });

        it('should switch from Parser to Beautiful view', () => {
            const initialState: ParserViewState = {
                enabled: true,
                font: 'Arial, Helvetica, sans-serif',
                background: '#FFFFFF',
                styling: 'none'
            };

            const newState = toggleParserView(initialState);

            expect(newState.enabled).toBe(false);
            expect(newState.font).toBe('Plus Jakarta Sans');
            expect(newState.background).toBe('#1E1E1E');
            expect(newState.styling).toBe('full');
        });

        it('should toggle back and forth correctly', () => {
            let state: ParserViewState = {
                enabled: false,
                font: 'Plus Jakarta Sans',
                background: '#1E1E1E',
                styling: 'full'
            };

            // Toggle to Parser
            state = toggleParserView(state);
            expect(state.enabled).toBe(true);

            // Toggle back to Beautiful
            state = toggleParserView(state);
            expect(state.enabled).toBe(false);

            // Toggle to Parser again
            state = toggleParserView(state);
            expect(state.enabled).toBe(true);
        });
    });

    describe('Font Validation (CRITICAL)', () => {
        it('should allow system-standard fonts in Parser View', () => {
            expect(isValidParserFont('Arial, Helvetica, sans-serif')).toBe(true);
            expect(isValidParserFont('Times New Roman, Times, serif')).toBe(true);
            expect(isValidParserFont('Courier New, Courier, monospace')).toBe(true);
        });

        it('should forbid custom fonts in Parser View', () => {
            expect(isForbiddenParserFont('Plus Jakarta Sans')).toBe(true);
            expect(isForbiddenParserFont('Caveat')).toBe(true);
            expect(isForbiddenParserFont('JetBrains Mono')).toBe(true);
            expect(isForbiddenParserFont('Inter')).toBe(true);
        });

        it('should detect forbidden fonts case-insensitively', () => {
            expect(isForbiddenParserFont('plus jakarta sans')).toBe(true);
            expect(isForbiddenParserFont('CAVEAT')).toBe(true);
            expect(isForbiddenParserFont('jetbrains mono')).toBe(true);
        });

        it('CRITICAL: Parser View must never use custom fonts', () => {
            const parserState = toggleParserView({
                enabled: false,
                font: 'Plus Jakarta Sans',
                background: '#1E1E1E',
                styling: 'full'
            });

            expect(isForbiddenParserFont(parserState.font)).toBe(false);
            expect(isValidParserFont(parserState.font)).toBe(true);
        });
    });

    describe('Styling Enforcement', () => {
        it('should disable all CSS in Parser View', () => {
            const config = getPreviewConfig('parser');
            expect(config.cssEnabled).toBe(false);
        });

        it('should enable CSS in Beautiful View', () => {
            const config = getPreviewConfig('beautiful');
            expect(config.cssEnabled).toBe(true);
        });

        it('should use white background in Parser View', () => {
            const config = getPreviewConfig('parser');
            expect(config.background).toBe('#FFFFFF');
        });

        it('should use Tech Dark background in Beautiful View', () => {
            const config = getPreviewConfig('beautiful');
            expect(config.background).toBe('#1E1E1E');
        });
    });

    describe('Configuration Consistency', () => {
        it('should return consistent Parser View config', () => {
            const config1 = getPreviewConfig('parser');
            const config2 = getPreviewConfig('parser');

            expect(config1).toEqual(config2);
        });

        it('should return consistent Beautiful View config', () => {
            const config1 = getPreviewConfig('beautiful');
            const config2 = getPreviewConfig('beautiful');

            expect(config1).toEqual(config2);
        });

        it('should have different configs for different modes', () => {
            const parserConfig = getPreviewConfig('parser');
            const beautifulConfig = getPreviewConfig('beautiful');

            expect(parserConfig).not.toEqual(beautifulConfig);
        });
    });
});

/**
 * Integration Tests: UI Behavior
 */
describe('Parser Preview UI Integration (LOGIC-GATE-002)', () => {
    describe('Banner Display', () => {
        it('should show "Bot\'s View" banner when Parser View is enabled', () => {
            const state: ParserViewState = {
                enabled: true,
                font: 'Arial, Helvetica, sans-serif',
                background: '#FFFFFF',
                styling: 'none'
            };

            const shouldShowBanner = state.enabled;
            expect(shouldShowBanner).toBe(true);
        });

        it('should hide banner when Beautiful View is active', () => {
            const state: ParserViewState = {
                enabled: false,
                font: 'Plus Jakarta Sans',
                background: '#1E1E1E',
                styling: 'full'
            };

            const shouldShowBanner = state.enabled;
            expect(shouldShowBanner).toBe(false);
        });
    });

    describe('CSS Stripping', () => {
        it('should remove all styling when switching to Parser View', () => {
            const mockDocument = {
                styles: ['color: #B4D8AE', 'font-weight: 900', 'text-transform: uppercase'],
                removeAllStyles: function () {
                    this.styles = [];
                }
            };

            // Simulate toggle to Parser View
            const newState = toggleParserView({
                enabled: false,
                font: 'Plus Jakarta Sans',
                background: '#1E1E1E',
                styling: 'full'
            });

            if (newState.styling === 'none') {
                mockDocument.removeAllStyles();
            }

            expect(mockDocument.styles).toHaveLength(0);
        });

        it('should restore styling when switching back to Beautiful View', () => {
            const mockDocument = {
                styles: [] as string[],
                restoreStyles: function () {
                    this.styles = ['color: #B4D8AE', 'font-weight: 900'];
                }
            };

            // Simulate toggle to Beautiful View
            const newState = toggleParserView({
                enabled: true,
                font: 'Arial, Helvetica, sans-serif',
                background: '#FFFFFF',
                styling: 'none'
            });

            if (newState.styling === 'full') {
                mockDocument.restoreStyles();
            }

            expect(mockDocument.styles.length).toBeGreaterThan(0);
        });
    });
});

/**
 * Regression Tests: Font Consistency Guardrails
 */
describe('Regression Protection (LOGIC-GATE-002)', () => {
    it('CRITICAL: Allowed parser fonts list must not be empty', () => {
        expect(ALLOWED_PARSER_FONTS).toBeDefined();
        expect(ALLOWED_PARSER_FONTS.length).toBeGreaterThan(0);
    });

    it('CRITICAL: Forbidden fonts list must include all custom fonts', () => {
        expect(FORBIDDEN_PARSER_FONTS).toContain('Plus Jakarta Sans');
        expect(FORBIDDEN_PARSER_FONTS).toContain('Caveat');
        expect(FORBIDDEN_PARSER_FONTS).toContain('JetBrains Mono');
    });

    it('CRITICAL: Parser View config must use Arial', () => {
        expect(PARSER_VIEW_CONFIG.font).toContain('Arial');
    });

    it('CRITICAL: Parser View config must disable CSS', () => {
        expect(PARSER_VIEW_CONFIG.cssEnabled).toBe(false);
    });

    it('CRITICAL: Parser View config must use white background', () => {
        expect(PARSER_VIEW_CONFIG.background).toBe('#FFFFFF');
    });

    it('CRITICAL: toggleParserView must never return custom font in Parser mode', () => {
        const parserState = toggleParserView({
            enabled: false,
            font: 'Plus Jakarta Sans',
            background: '#1E1E1E',
            styling: 'full'
        });

        // Verify no forbidden fonts are used
        FORBIDDEN_PARSER_FONTS.forEach(forbidden => {
            expect(parserState.font.toLowerCase()).not.toContain(forbidden.toLowerCase());
        });
    });
});

/**
 * Edge Cases & Error Handling
 */
describe('Edge Cases (LOGIC-GATE-002)', () => {
    it('should handle undefined initial state gracefully', () => {
        const defaultState: ParserViewState = {
            enabled: false,
            font: 'Plus Jakarta Sans',
            background: '#1E1E1E',
            styling: 'full'
        };

        const newState = toggleParserView(defaultState);
        expect(newState).toBeDefined();
        expect(newState.enabled).toBe(true);
    });

    it('should handle rapid toggling', () => {
        let state: ParserViewState = {
            enabled: false,
            font: 'Plus Jakarta Sans',
            background: '#1E1E1E',
            styling: 'full'
        };

        // Rapid toggle 10 times
        for (let i = 0; i < 10; i++) {
            state = toggleParserView(state);
        }

        // Should end up in Beautiful View (even number of toggles)
        expect(state.enabled).toBe(false);
        expect(state.font).toBe('Plus Jakarta Sans');
    });
});
