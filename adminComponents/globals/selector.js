import { useRef, useEffect, useState } from 'react';
import Select, { OnChangeValue } from 'react-select';
import styled from "styled-components";

const Selector_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 5px;

    p {
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
let changed = false;
export default function Selector(props) {
    const { title, data, choosenData, setChoosenData, isMulti } = props;
    const ref = useRef();
    const [values, setValues] = useState();

    useEffect(() => {
        if (choosenData && data) {
            if (!isMulti) {
                const value = data.find((item) => {
                    return item.value === choosenData
                });
                setValues(value);
                changed = true;
            } else {
                const mapedValues = choosenData.map((i) => {
                    return data.find((item) => {
                        return item._id === i;
                    })
                });
                setValues(mapedValues);
                changed = true;
            }
        }
    }, [choosenData, data]);

    const onChange = (selectedOptions) => {
        if (!isMulti) {
            setChoosenData(selectedOptions.value);
            return;
        }
        let ids = selectedOptions.map((item) => {
            return item._id;
        })
        setChoosenData(ids);
    }

    return (
        <Selector_style>
            <p>{title}</p>
            {data && <Select
                ref={ref}
                value={values}
                isMulti={isMulti}
                onChange={onChange}
                placeholder='Выберите из меню'
                options={data}
                className="basic-multi-select"
                id="long-value-select"
                instanceId="long-value-select"
                classNamePrefix="select"
            />}
        </Selector_style>
    )
}
