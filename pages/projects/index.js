import styled from 'styled-components'
import Card from '../../components/card'
import Title from '../../components/title'
import MainLayer from '../mainLayer'

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

const portfolioLink = [
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
]

export default function PortfolioPage() {
    return (
        <MainLayer>
            <Title text='ПОСЛЕДНИЕ РАБОТЫ'/>
            <Portfolio_Style>
            {portfolioLink.map((post)=> {
                return(
                    <Card portfolio 
                        key={post.id}
                        data={post}
                    />
                )
            })}
            </Portfolio_Style>
        </MainLayer>
    )
}
