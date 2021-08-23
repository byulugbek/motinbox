import styled from 'styled-components'
import Card from '../components/card'
import Title from '../components/title'
import DoingCard from '../components/doingCard'
import { Logo } from '../components/icons'
import Button from '../components/button'

const Animatin_screen = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 50px;
    align-content: space-between;
    border-radius: 40px;
    height: calc(100vh - 150px);
    background-color: var(--black100);
    .upBox{
        display: flex;
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
        display: flex;
        color: var(--white100);
        justify-content: space-between;
        align-items: flex-end;
        .boldText{
            margin-left: 5px;
            font-family: Bold;
        }
        .story{
            display: grid;
            gap:30px;
            max-width: 500px;
        }
    }
`

export default function AboutUs() {
    return (
        <>
            <Animatin_screen>
                
                <div className='upBox'>
                    <p className='slogan'>Преврвщаем<br/>Смелые идеи в <br/>Чистый дизайн</p>
                    <p >Мы основаны:<span className='boldText'>2021</span></p>
                </div>
                
                <div className='bottomBox'>
                    <div className='story'>
                        <p>Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором. Мы верим, что компания реализует свой потенциал, если каждый человек в компании реализует свой потенциал. Свой талант. Творческий, стратегический, финансовый, управленческий, предпринимательский, любой.</p>
                        <Button lite
                            text='Наши проекты'
                        />
                    </div>
                    <p >Основатель:<span className='boldText'>Ulugbek Alimov</span></p>
                </div>
            
            </Animatin_screen>

         
        </>
    )
};