import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Switcher_style = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
    gap: 30px;
    align-items: center;
    color: var(--black50);

    div {
        width: 50px;
        height: 30px;
        border-radius: 30px;
        background-color: var(--black10);
    
        div {
            margin-left: 2.5px;
            margin-top: 2.5px;
            width: 24px;
            height: 24px;
            border-radius: 28px;
            background-color: red;
            transition: 0.3s ease-in-out;
        }
    }
`

export default function Switcher(props) {
    const { state, setState } = props;

    useEffect(() => {

    }, [])

    const handleClick = () => {
        setState(!state);
    }

    return (
        <Switcher_style>
            <p>Показать проект на главной:</p>
            <div onClick={handleClick}>
                <div style={{ marginLeft: state ? 23 : 3, backgroundColor: state ? 'black' : 'silver' }} />
            </div>
        </Switcher_style>
    )
}
