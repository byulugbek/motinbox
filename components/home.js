import styled from 'styled-components'
import Card from './card'
import Title from './title'
import DoingCard from './doingCard'
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
    justify-items: center;
    .heardItem{
        display: grid;
        justify-content: center;
        align-items: center;
        margin: 50px 0;
        width: fit-content;
        user-select: none;
        img {
            filter: grayscale(100%);
            transition: 0.3s ease-in-out;
            
            :hover {
                filter: grayscale(0%);
            }
        }
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

export default function HomePage({ data }) {
    const { main } = data;

    const mapProjectCards = main.projects.map((post) => {
        return (
            <Card
                key={post._id}
                data={post}
                type='projects'
            />
        )
    })

    const mapPortfolioCards = main.portfolio.map((post) => {
        return (
            <Card portfolio
                key={post._id}
                data={post}
                type='portfolio'
            />
        )
    })

    const mapDoingCards = main.abilities.map((post) => {
        return (
            <DoingCard
                key={post._id}
                data={post}
            />
        )
    })

    const mapInHeardCards = main.partners.map((post) => {
        return (
            <Link key={post._id} href={post.url}>
                <a
                    className='heardItem'
                    target='_blank'
                    rel="noopener"
                >
                    <Image src={`/uploads/partners/${post.imageOne}`} width='250px' height='100px' alt={post.imageOne} />
                </a>
            </Link>
        )
    })

    return (
        <>
            <Projects>
                {mapProjectCards}
            </Projects>
            <Title text='ЧТО МЫ МОЖЕМ СОТВОРИТЬ' />
            <CanDo>
                <hr className='line' />
                {mapDoingCards}
            </CanDo>
            <Title text='В НАШИХ СЕРДЦАХ' />
            <InHeard>
                {mapInHeardCards}
            </InHeard>
            <Title text='ПОСЛЕДНИЕ РАБОТЫ' />
            <Portfolio_Style>
                {mapPortfolioCards}
            </Portfolio_Style>
        </>
    )
};