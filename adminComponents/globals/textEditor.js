import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
    ssr: false,

});

const TextEditor_style = styled.div`
    display: grid;
    gap: 5px;
    grid-auto-flow: row;

    p {
        color: var(--black50);
    }
`

export default function TextEditor(props) {
    const { title, text, setText } = props;
    const editor = useRef(null)

    const config = {
        readonly: false
    }

    return (
        <TextEditor_style>
            <p>{title}</p>
            <JoditEditor
                ref={editor}
                value={text}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setText(newContent)}
            />
        </TextEditor_style>
    )
}
