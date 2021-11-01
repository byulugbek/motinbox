import styled from 'styled-components'

const Title_style = styled.h1`
    display: grid;
    grid-template-columns: 1fr;
    align-content: stretch;
    height: 150px;
    text-align: center;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 500px) {
        font-size: 32px;
    }
`

export default function Title(props) {
    return (
        <Title_style>{props.text}</Title_style>
    )
};