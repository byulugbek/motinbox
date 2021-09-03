import styled from 'styled-components'
import Card from '../components/card'
import Title from '../components/title'
import DoingCard from '../components/doingCard'
import Image from 'next/image'
import Link from 'next/link'

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
const CanDo = styled(Projects)`
    grid-template-columns: 1fr;
    gap: 30px;
    .line{
        width:100%;
        height: 0.5px;
        border-width: 0;
        background-color: var(--black20);
    }
`
const InHeard = styled(Projects)`
    grid-template-columns: repeat(4, 1fr);
    .heardItem{
        display: grid;
        justify-content: center;
        align-items: center;
        padding: 50px 0;
    }
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 500px) {
        .heardItem{
            svg{
                width: 100%;
            }
            padding: 30px 0;
        }
    }
`
const Portfolio_Style = styled(Projects)`
    grid-template-columns: repeat(3, 1fr);
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 700px) {
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
const portfolioCard = [
    {
        id: 1,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 2,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 3,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 4,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 5,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 6,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 7,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 8,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
    {
        id: 9,
        type: 'portfolio',
        img: 'cardPhoto2.webp',
        theme: 'Мобильное приложение',
        title: 'Мы создали выставку "DOSTUP" для МТС.',
        descript: 'В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin',
    },
]
const doingCard = [
    {
        id: 1,
        title: 'Мобильное приложение',
        descript: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.',
    },
    {
        id: 2,
        title: 'ВЕБ приложение',
        descript: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.',
    },
    {
        id: 3,
        title: 'Маркетинг',
        descript: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.',
    },
    {
        id: 4,
        title: 'Брендинг',
        descript: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.',
    },
    {
        id: 5,
        title: 'Медиа',
        descript: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.',
    },
]
const inHeardCard = [
    {
        id: 1,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 2,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 3,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 4,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 5,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 6,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 7,
        img: 'logo.png',
        link: '/'
    },
    {
        id: 8,
        img: 'logo.png',
        link: '/'
    },
]


export default function HomePage() {

    const mapProjectCards = projectCard.map((post)=> {
        return(
            <Card
                key={post.id}
                data={post}
            />
        )
    })

    const mapPortfolioCards = portfolioCard.map((post)=> {
        return(
            <Card portfolio
                key={post.id}
                data={post}
            />
        )
    })

    const mapDoingCards = doingCard.map((post)=> {
        return(
            <DoingCard
                key={post.id}
                data={post}
            />
        )
    })

    const mapInHeardCards = inHeardCard.map((post)=> {
        return(
            <Link key={post.id} href={post.link}>
                <a className='heardItem'><Image src={`/${post.img}`} width='250px' height='100px'/></a>
            </Link>
        )
    })

    return (
        <>
            <Projects>
                {mapProjectCards}
            </Projects>
            <Title text='ЧТО МЫ МОЖЕМ СОТВОРИТЬ'/>
            <CanDo>
                <hr className='line'/>
                {mapDoingCards}
            </CanDo>
            <Title text='В НАШИХ СЕРДЦАХ'/>
            <InHeard>
                {mapInHeardCards}
            </InHeard>
            <Title text='ПОСЛЕДНИЕ РАБОТЫ'/>
            <Portfolio_Style>
                {mapPortfolioCards}
            </Portfolio_Style>    
        </>
    )
};