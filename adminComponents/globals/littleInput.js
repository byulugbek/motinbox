import styled from "styled-components"

const Container = styled.div`
    display: grid;
    grid-auto-flow: rows;
    grid-template-rows: min-content min-content;
    gap: 5px;
    width: 100%;

    p {
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
    }
`

export default function LittleInput(props) {
    const { title, text, setText, type, ph } = props;
    return (
        <Container>
            <p>{title}</p>
            <input
                type={type}
                defaultValue={text}
                placeholder={ph}
                onBlur={e => setText(e.target.value)}
            />
        </Container>
    )
}
