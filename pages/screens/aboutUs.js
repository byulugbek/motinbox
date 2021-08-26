import styled from 'styled-components'
import Title from '../../components/title'
import Button from '../../components/button'
import Card from '../../components/card'
import MainLayer from '../mainLayer'

const Animatin_screen = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 50px;
    align-content: space-between;
    border-radius: 40px;
    height: calc(100vh - 170px);
    background-color: var(--black100);
    .upBox{
        display: grid;
        gap: 20px;
        grid-auto-flow: column;
        color: var(--white100);
        justify-content: space-between;
        .boldText{
            margin-left: 5px;
            font-family: Bold;
        }
        .slogan{
            font-family: Bold;
            font-size: 24px;
        }
    }
    .bottomBox{
        display: grid;
        gap:30px;
        justify-content: space-between;
        color: var(--white100);
        .boldText{
            margin-left: 5px;
            font-family: Bold;
        }
        .story{
            display: grid;
            grid-auto-flow: column;
            justify-content: space-between;
            align-items: flex-end;
            gap:30px;
        }
    }
    @media only screen and (max-width: 500px) {
        border-radius: 20px;
        padding: 20px;
        padding-bottom: 30px;
        .upBox{
            display: grid;
            grid-auto-flow: row;
        }
        .bottomBox{
            .story{
                justify-content: space-around;
            }
            .creater{
                display: none;
            }
        }
    }
`
const Team = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    transition: 0.5s;

    @media only screen and (max-width: 1000px) {
        gap: 10px;
        grid-template-columns: repeat(2, 1fr);    
    }  
`

export default function AboutUs() {
    return (
        <MainLayer>
            <Animatin_screen>
                <div className='upBox'>
                    <p className='slogan'>Преврвщаем<br/>Смелые идеи в <br/>Чистый дизайн</p>
                    <p >Мы основаны:<span className='boldText'>2021</span></p>
                </div>
                <div className='bottomBox'>
                    <p>Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором. Мы верим, что компания реализует свой потенциал, если каждый человек в компании реализует свой потенциал. Свой талант. Творческий, стратегический, финансовый, управленческий, предпринимательский, любой.</p>
                    <div className='story'>
                        <Button lite
                            text='Наши проекты'
                        />
                        <p className='creater'> Основатель:<span className='boldText'>Ulugbek Alimov</span></p>
                    </div>
                </div>
            </Animatin_screen>
            <Title 
                text='Наша семья'
            />
            <Team>
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
                <Card teamItem 
                    img='cardPhoto2.webp'
                    title='Улугбек Алимов'
                    descript='CEO, Основатель'
                />
         
            </Team>
        </MainLayer>    
    )
};