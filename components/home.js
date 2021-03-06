import styled from 'styled-components';
import Card from './card';
import Title from './title';
import DoingCard from './doingCard';
import PartnerCard from './partnerCard';

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
const CanDo = styled(Projects)`
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;

    @media only screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: 1fr;
    }

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
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
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
            <PartnerCard
                key={post._id}
                data={post}
            />
        )
    })

    return (
        <>
            <Projects>
                {mapProjectCards}
            </Projects>
            <Title text='?????? ???? ?????????? ??????????????????' />
            <CanDo>
                {mapDoingCards}
            </CanDo>
            <Title text='?? ?????????? ??????????????' />
            <InHeard>
                {mapInHeardCards}
            </InHeard>
            <Title text='?????????????????? ????????????' />
            <Portfolio_Style>
                {mapPortfolioCards}
            </Portfolio_Style>
        </>
    )
};