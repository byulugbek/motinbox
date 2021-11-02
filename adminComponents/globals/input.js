import styled from 'styled-components';

const Input_style = styled.div`
    display: grid;
    gap: 5px;

    p {
        user-select: none;
        color: var(--black50);
    
    }
    
    textarea, input {
        width: 100%;
        min-height: 50px;
        height: 50px;
        resize: vertical;
        padding: 15px;
        border-radius: 10px;
        background-color: var(--black05);
        outline: none;
        appearance: none;
        border: none;
        font-size: 16px;
    }
`

export default function Input(props) {
    const { title, text, setText, inputType, type } = props;

    return (
        <Input_style>
            <p>{title}</p>
            {inputType === 'input' ?
                <input
                    type={type}
                    defaultValue={text}
                    placeholder={'Далеко, далеко ...'}
                    onChange={(text) => setText(text.target.value)}
                />
                :
                <textarea
                    defaultValue={text}
                    placeholder={'Далеко, далеко ...'}
                    onChange={(text) => setText(text.target.value)}
                />
            }
        </Input_style>
    )
}
