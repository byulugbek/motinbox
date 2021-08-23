import styled from 'styled-components'
import AboutUs from '../screens/aboutUs'
import HomePage from '../screens/home'
const Content_Style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 30px;
    grid-template-columns: 1fr;
    width: 100%;
    align-items: center;
    justify-content: center;
`

export default function Content() {
    return (
        <Content_Style>
            <AboutUs/>
            {/* <HomePage/> */}
        </Content_Style>
    )
};