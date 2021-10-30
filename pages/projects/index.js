import Head from 'next/head';
import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';
import Projects from '../../models/Projects';
import dbConnect from '../../utils/dbConnect';

const Projects_style = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export default function ProjectsPage({ projects }) {
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
            <Head>
                <title>MotionBox | Наши проекты</title>
                <meta name='description' content='Мы создаем наши проекты не только для вас, но и для себя, мы получаем действительно удовольствие от создания подобных проектов.' />
            </Head>
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

    return {
        props: {
            projects,
        }
    }
}