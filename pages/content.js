import styled from 'styled-components'
import HomePage from '../screens/home'
const Content_Style = styled.div`
    display:flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 30px;
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