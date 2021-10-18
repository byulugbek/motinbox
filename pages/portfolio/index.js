import styled from 'styled-components';
import Card from '../../components/card';
import Title from '../../components/title';
import MainLayer from '../../components/mainLayer';

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
            <Title text='ПОСЛЕДНИЕ РАБОТЫ' />
            <Portfolio_Style>
                {portfolio.data.map((post) => {
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

PortfolioPage.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/portfolio');
    const data = await res.json();

    return {
        portfolio: data,
    }
}