import Select from 'react-select';
import styled from "styled-components";
import { useRef } from 'react';

const Selector_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 5px;

    span {
        color: var(--black50);
    }

    select {
        height: 50px;
        outline: none;
        appearance: none;
        border: none;
        background-color: var(--black05);
        border-radius: 10px;
        padding: 15px;
    }
`

const data = [
    { value: 'p1', label: 'Top level - P1' },
    { value: 'p2', label: 'Mid level - P2' },
    { value: 'p3', label: 'Low level - P3' }
]

export default function Selector(props) {
    const { title, data, choosenData, isMulti } = props;
    const ref = useRef();

    return (
        <Selector_style>
            <span>{title}</span>
            <Select
                ref={ref}
                isMulti={isMulti}
                onChange={(items) => choosenData(items)}
                placeholder='Выберите из меню'
                options={data}
                className="basic-multi-select"
                id="long-value-select"
                instanceId="long-value-select"
                classNamePrefix="select"
            />
        </Selector_style>
    )
}
