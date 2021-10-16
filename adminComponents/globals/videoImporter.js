import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: grid;
    gap: 5px;

    span {
        color: var(--black50);
    }

    .video {
        width: 100%;
        padding-bottom: 56.56%;
        height: 0;
        position: relative;

        video {
            position: absolute;
        }
    }

    input {
        color: var(--black50);
        width: fit-content;
    }
    input[type=file]::file-selector-button {
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        padding: 0 20px;
        outline: none;
        background-color: var(--black100);
        color: white;
        border: none;
    }
`

export default function VideoImporter(props) {
    const { content, setContent } = props;

    const onChange = (e) => {
        if (e.target.files) {
            setContent(e.target.files[0]);
        } else {
            setContent(null);
        }
    }
    return (
        <Container>
            <span>Загрузите видео</span>

            <input
                type='file'
                onChange={item => onChange(item)}
                accept='video/*'
            />
        </Container>
    )
}
