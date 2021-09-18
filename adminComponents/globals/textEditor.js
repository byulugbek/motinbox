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

    span {
        color: var(--black50);
    }
`

export default function TextEditor(props) {
    const { title, setText } = props;
    const editor = useRef(null)
    // const [content, setContent] = useState('')

    const config = {
        readonly: false
    }

    return (
        <TextEditor_style>
            <span>{title}</span>
            <JoditEditor
                ref={editor}
                // value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setText(newContent)}
            />
        </TextEditor_style>
    )
}
