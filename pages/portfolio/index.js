import Head from 'next/head';
import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';
import Portfolio from '../../models/Portfolio';
import dbConnect from '../../utils/dbConnect';


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
export default function PortfolioPage({ portfolio }) {
    return (
        <MainLayer>
            <Head>
                <title>MotionBox | Портфолио</title>
            </Head>
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

    return {
        props: {
            portfolio,
        }
    }
}