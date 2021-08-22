import styled from 'styled-components'
import Image from 'next/image'
import { Strelka } from './icons'

const Card_style = styled.div`
        width: 100%;
        padding-top: 60%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
        position: relative; /* If you want text inside of it */
        height: fit-content;
        border-radius: 40px;
        overflow: hidden;

        background-color: var(--white50);
        color: var(--black100);
        box-shadow: var(--shadow);
        
        img{z-index: 1;
            object-fit: cover;
        }
        .filter{
            z-index: 2;
            display: grid;
            gap: 30px;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(270deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
            align-content: space-between;
            padding: 50px;
            .info{
                display: grid;
                gap: 30px;
                grid-auto-flow: column;
                align-items: flex-end;
                justify-content: space-between;
                .textBox{
                    display: grid;
                    gap: 30px;
                    width: 250px;
                    .title{
                        font-family: Bold;
                        font-size: 24px;
                    }
                    .descript{
                        color: var(--black80);
                    }
                }
            }
        }
`

export default function Button(props) {
    return (
        <Card_style>
            <div className='filter'>
                <p>Korzinka</p>
                <div className='info'>
                    <div className='textBox'>
                        <p className='title'>Преврвщаем Смелые идеи</p>
                        <p className='descript'>Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости</p>
                    </div>
                    <a><Strelka/></a>
                </div>
            </div>
            <Image src={require('../public/cardPhoto.png')} layout="fill"/>
        </Card_style> 
    )
};