import styled from 'styled-components'
import { Logo, Location, Mail, Phone, Instagram } from './icons'

const Footer_style = styled.div`
    display: grid; 
    grid-auto-flow: row;
    justify-self: center;
    justify-content: stretch;   
    width: calc(100% - 100px);
    
    border-radius: 40px;
    color: var(--white100);
    background-color: var(--black100);
    .verticalLine{
        height: 30px;
        width: 0.5px;
        background-color: var(--white50);
    }
    .upBox{
        gap: 30px;
        width: 100%;
        display: grid;
        grid-auto-flow: column;
        padding: 0 50px;
        align-items: center;
        justify-content:space-between;
        grid-template-columns: 1fr;
        height: 120px;
        border-bottom: 0.5px solid var(--white50);
        .logoBox{
            display: grid;
            grid-auto-flow: column;
            gap: 10px;
            width: fit-content;
            align-items: center;
            color: var(--white50);
        }
        .projectBox{
            display: grid;
            grid-auto-flow: column;
            width: fit-content;
            gap: 30px;
            align-items: center;
            
        }
    }
    .bottomBox{
        gap: 30px;
        width: 100%;
        display: grid;
        grid-auto-flow: column;
        padding: 0 50px;
        align-items: center;
        justify-self: stretch;
        justify-content:space-between;

        height: 120px;
        .informationBox{
            width: fit-content;
            display: grid;
            grid-auto-flow: column;
            gap: 30px;
            align-items: center;
            align-items: flex-start;
            .infoItem{
                display: grid;
                grid-auto-flow: column;
                gap: 10px;
                align-items: center;
            }
        }
        .socialBox{
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: 3fr;
            gap: 30px;
            align-items: center;
            .socialItem{
                display: grid;
                grid-auto-flow: column;
                gap: 10px;
                align-items: center;
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        width: calc(100% - 60px);
        .upBox{
            padding: 30px;
            gap: 30px;
            height: fit-content;
            grid-auto-flow: row;
            justify-items: center;
        }
        .bottomBox{
            padding: 30px;
            gap: 30px;
            height: fit-content;
            grid-auto-flow: row; 
            justify-items: center;
            justify-content: stretch;
            .informationBox{
                width: 100%;
                grid-auto-flow: row;
                grid-template-columns: repeat(2, 1fr);
                .infoItem{
                    grid-auto-flow: row;
                    gap: 20px;
                    text-align: center;
                    justify-items: center;
                }
            }
        }
    }
    @media only screen and (max-width: 500px) {
        border-radius: 0;
        width: 100%;
        .verticalLine{
            display: none;
        }
        .upBox{
            padding: 40px;
            gap: 40px;
            .logoBox{
                gap: 0;
                span{display: none;}
            }
            .projectBox{
                height: fit-content;
                grid-auto-flow: row; 
                width: 100%;
                gap: 30px;
                padding:0 30px;
                justify-content: center;
                .projectItem{
                    display: grid;
                    justify-content: center;
                }
            }
        }
        .bottomBox{
            padding: 40px;
            gap: 40px;
            .informationBox{
                grid-template-columns: repeat(1, 1fr);
            }
            .socialBox{
                gap: 40px; 
                justify-content: center;
                justify-items: center;
            }
        }
    }
`
const Cert = styled.span`
    width: 100%;
    text-align: center;
    color: var(--black100);
    padding: 0 30px 30px;
    @media only screen and (max-width: 500px) {
        padding: 0 20px 20px;
        font-size: 12px;
    }
`

export default function Footer() {
    return (
        <>
            <Footer_style>
                <div className='upBox'>
                    <div className='logoBox'>
                        <Logo fill='#fff' />
                        <div className='verticalLine' />
                        <span>Преврвщаем Смелые <br />идеи в Чистый дизайн</span>
                    </div>
                    <div className='projectBox'>
                        <a href='#' aria-label="PROJECT" className='projectItem'>
                            <p>Logist Box</p>
                        </a>
                        <div className='verticalLine' />
                        <a href='#' aria-label="PROJECT" className='projectItem'>
                            <p>School Box</p>
                        </a>
                        <div className='verticalLine' />
                        <a href='#' aria-label="PROJECT" className='projectItem'>
                            <p>Market Box</p>
                        </a>
                    </div>
                </div>
                <div className='bottomBox'>
                    <div className='informationBox'>
                        <a href='#' className='infoItem'>
                            <Location />
                            <span>Узбекистан, Ташкент <br /> Яккасарай 5 дом</span>
                        </a>
                        <a href='#' aria-label="CONTACT" className='infoItem'>
                            <Mail />
                            <span>support@motionbox.uz</span>
                        </a>
                        <a href='#' aria-label="CONTACT" className='infoItem'>
                            <Phone />
                            <span>+998 99 881 80 60</span>
                        </a>
                    </div>
                    <div className='socialBox'>
                        <a href='#' aria-label="SOCIAL" className='coxialItem'><Instagram fill='#fff' /></a>
                        <a href='#' aria-label="SOCIAL" className='coxialItem'><Instagram fill='#fff' /></a>
                        <a href='#' aria-label="SOCIAL" className='coxialItem'><Instagram fill='#fff' /></a>
                    </div>

                </div>
            </Footer_style>
            <Cert>ВСЕ ПРАВА ЗАЩИЩЕНЫ © MOTION BOX / 2021</Cert>
        </>

    )
};