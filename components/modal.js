import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;

    transition: 1s ease-in-out;
    opacity: ${props => props.isActive ? 1 : 0};
`
export default function Modal({ isModal }) {
    return (
        <Container isActive={isModal}>
            <h1>Мы приняли твою заявку</h1>
        </Container>
    )
}
