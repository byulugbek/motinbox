import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';
import Projects from '../../models/Projects';
import dbConnect from '../../utils/dbConnect';
import HeadComponent from '../../components/head';
import Meta from '../../models/Meta';

const Projects_style = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export default function ProjectsPage({ projects, meta }) {
    const mapProjectCards = projects.map((post) => {
        return (
            <Card
                key={post._id}
                data={post}
            />
        )
    })

    return (
        <MainLayer>
            <HeadComponent
                title={'MotionBox | Наши проекты'}
                metatitle={meta.title}
                description={meta.description}
            />
            <Title text='ЭТО НАШИ ПРОЕКТЫ' />
            <Projects_style>
                {mapProjectCards}
            </Projects_style>

        </MainLayer>
    )
}

export async function getServerSideProps() {
    dbConnect();
    const projects = JSON.parse(JSON.stringify(await Projects.find({}).sort({ date: -1 })));
    const meta = JSON.parse(JSON.stringify(await Meta.find({})));

    return {
        props: {
            projects,
            meta: {
                title: meta.length ? meta[0].projectsTitle : 'MotionBox | Наши проекты',
                description: meta.length ? meta[0].projectsDesc : 'MotionBox | Вдохновляйся нашими преоктами...'
            }
        }
    }
}