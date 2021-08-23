import styled from 'styled-components'

const Title_style = styled.p`
    display: flex;
    height: 100px;
    width: 100%;
    font-family: Bold;
    font-size: 48px;
    text-align: center;
    align-items: center;
    justify-content: center;
`

export default function Title(props) {
    return (
        <>
            <Title_style>{props.text}</Title_style>
        </>
    )
};