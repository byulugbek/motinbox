import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker_style = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5px;

    span {
        color: var(--black50);
    }

    input {
        padding: 15px;
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: 1px solid var(--black20);
        font-size: 16px;
        color: var(--black100)
    }
    
`

export default function CustomDatePicker(props) {
    const { date, setDate } = props;

    return (
        <DatePicker_style>
            <span>Выберите дату проекта</span>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </DatePicker_style>
    )
}
