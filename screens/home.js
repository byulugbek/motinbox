import styled from 'styled-components'
import Card from '../components/card'
import Title from '../components/title'

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    margin-bottom: 30px;
`

export default function HomePage() {
    return (
        <>
            <Projects>
                <Card />
                <Card />
                <Card />
                <Card />
            </Projects>
            <Title text='Что мы можем сотворить'/>
        </>
    )
};