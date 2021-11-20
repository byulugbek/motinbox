import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';
import Portfolio from '../../models/Portfolio';
import dbConnect from '../../utils/dbConnect';
import HeadComponent from '../../components/head';
import Meta from '../../models/Meta';


const Portfolio_Style = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
export default function PortfolioPage({ portfolio, meta }) {
    return (
        <MainLayer>
            <HeadComponent
                title={'MotionBox | Портфолио'}
                metatitle={meta.title}
                description={meta.description}
            />
            <Title text='ПОСЛЕДНИЕ РАБОТЫ' />
            <Portfolio_Style>
                {portfolio.map((post) => {
                    return (
                        <Card portfolio
                            key={post._id}
                            data={post}
                        />
                    )
                })}
            </Portfolio_Style>
        </MainLayer>
    )
}

export async function getServerSideProps() {
    dbConnect();
    const portfolio = JSON.parse(JSON.stringify(await Portfolio.find({}).sort({ date: -1 })));
    const meta = JSON.parse(JSON.stringify(await Meta.find({})));

    return {
        props: {
            portfolio,
            meta: {
                title: meta.length ? meta[0].portfolioTitle : 'MotionBox | Наши работы',
                description: meta.length ? meta[0].portfolioDesc : 'MotionBox | Любуйся нашими работами...'
            }
        }
    }
}