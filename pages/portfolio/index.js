import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';
import Portfolio from '../../models/Portfolio';
import dbConnect from '../../utils/dbConnect';
import HeadComponent from '../../components/head';


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
            <HeadComponent
                title={'MotionBox | Наше портфолио'}
                metatitle={'MotionBox | Мы исполняем нечто невероятное, создаем лучший дизайн'}
                description={'Ваши проеткты, это наши проекты, мы беремся за них не только ради денег, но и для того что бы записать в портфолио такие замечательные проекты.'}
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

    return {
        props: {
            portfolio,
        }
    }
}