import styled from 'styled-components'
import Card from '../../components/card'
import Title from '../../components/title'
import MainLayer from '../mainLayer'

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const projectCard = [
    {
        id: 1,
        type: 'projects',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 2,
        type: 'projects',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 3,
        type: 'projects',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 4,
        type: 'projects',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
]

export default function ProjectsPage() {
    const mapProjectCards = projectCard.map((post)=> {
        return(
            <Card
                key={post.id}
                data={post}
            />
        )
    })
    return (
        <MainLayer>
            <Title text='ЭТО НАШИ ПРОЕКТЫ'/>
            <Projects>
                {mapProjectCards}
            </Projects>

        </MainLayer>
    )
}
