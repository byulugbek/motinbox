import styled from 'styled-components'

const Title_style = styled.p`
    display: grid;
    grid-template-columns: 1fr;
    align-content: stretch;
    height: 150px;
    font-family: Bold;
    font-size: 48px;
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