import styled from "styled-components"

const Container = styled.div`
    display: grid;
    grid-auto-flow: rows;
    grid-template-rows: min-content min-content;
    gap: 5px;
    width: 100%;

    span {
        color: var(--black50);
        line-height: 20px;
    }
    input {
        border: 0;
        outline: none;
        height: 50px;
        background-color: var(--black05);
        border-radius: 10px;

        padding: 0 10px;
        font-size: 16px;
    }
`

export default function LittleInput(props) {
    const { title, text, setText, type, ph } = props;
    return (
        <Container>
            <span>{title}</span>
            <input
                type={type}
                defaultValue={text}
                placeholder={ph}
                onChange={e => setText(e.target.value)}
            />
        </Container>
    )
}
