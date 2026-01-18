import React from 'react';
import { TechCard } from './TechCard';
import { figma } from '@figma/code-connect';

/**
 * Figma Code Connect - TechCard Component
 * Strict mapping following DS/TechCard specification
 */
figma.connect(TechCard, 'https://www.figma.com/file/IryuGDWixbuDc3RVhC6llE?node-id=NODE_ID', {
    props: {
        title: figma.string('title'),
        content: figma.children('content'),
        className: figma.string('className'),
    },
    example: (props) => (
        <TechCard title={props.title || 'Tech Card'} className={props.className}>
            {props.content}
        </TechCard>
    ),
});
