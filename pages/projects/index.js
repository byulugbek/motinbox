import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';
import Projects from '../../models/Projects';
import dbConnect from '../../utils/dbConnect';
import HeadComponent from '../../components/head';

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
            <HeadComponent
                title={'MotionBox | Наше проекты'}
                metatitle={'MotionBox | Мы исполняем нечто невероятное, создаем лучший дизайн'}
                description={'Мы создаем наши проекты не только для вас, но и для себя, мы получаем действительно удовольствие от создания подобных проектов.'}
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

    return {
        props: {
            projects,
        }
    }
}