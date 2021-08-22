import styled from 'styled-components'
import HomePage from '../screens/home'
const Content_Style = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    align-items: center;
    justify-content: center;
`

export default function Content() {
    return (
        <>
        <Content_Style>
            <HomePage/>
        </Content_Style>
        </>
    )
};