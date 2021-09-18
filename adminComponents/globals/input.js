import styled from 'styled-components';

const Input_style = styled.div`
    display: grid;
    gap: 5px;

    span {
        user-select: none;
        color: var(--black50);
    
    }
    
    textarea {
        width: 100%;
        min-height: 50px;
        height: 50px;
        resize: vertical;
        padding: 15px;
        border-radius: 10px;
        background-color: var(--black05);
        outline: none;
        appearance: none;
    }
`

export default function Input({ title, text, setText }) {

    return (
        <Input_style>
            <span>{title}</span>
            <textarea
                defaultValue={text}
                placeholder={'Далеко, далеко ...'}
                onBlur={(text) => setText(text.target.value)}
            />
        </Input_style>
    )
}
