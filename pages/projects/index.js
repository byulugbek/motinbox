import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
export default function ProjectsPage({ projects }) {
    const mapProjectCards = projects.data.map((post) => {
        return (
            <Card
                key={post._id}
                data={post}
            />
        )
    })

    return (
        <MainLayer>
            <Title text='ЭТО НАШИ ПРОЕКТЫ' />
            <Projects>
                {mapProjectCards}
            </Projects>

        </MainLayer>
    )
}

ProjectsPage.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/projects');

    const data = await res.json();

    return {
        projects: data,
    }
}