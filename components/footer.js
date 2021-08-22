import styled from 'styled-components'
import { Logo, Location, Mail, Phone } from './icons'

const Footer_style = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;


    .footerBox{
        display: grid;
        grid-auto-flow: row;
        width: 100%;
        border-radius: 40px;
        overflow: hidden;
        color: var(--white100);
        font-size: 18px;
        .verticalLine{
                height: 30px;
                width: 0.5px;
                background-color: var(--white50);
            }
        .upBox{
            display: grid;
            grid-auto-flow: column;
            padding: 0 50px;
            align-items: center;
            justify-content:space-between;
            width: 100%;
            height: 120px;
            background-color: var(--black100);
            border-bottom: 0.5px solid var(--white50);
            .logoBox{
                display: grid;
                grid-auto-flow: column;
                gap: 10px;
                align-items: center;
                height: 40px;
                font-size: 14px;
                color: var(--white50);
            }
            .projectBox{
                display: grid;
                grid-auto-flow: column;
                gap: 30px;
                align-items: center;
                height: 40px;
            }
        }
        .bottomBox{
            display: grid;
            grid-auto-flow: column;
            padding: 0 50px;
            align-items: center;
            justify-content:space-between;
            width: 100%;
            height: 120px;
            background-color: var(--black100);
            .informationBox{
                display: grid;
                grid-auto-flow: column;
                gap: 30px;
                align-items: center;
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
    }
`
const Cert = styled.p`
    width: 100%;
    text-align: center;
    color: var(--black50);
`

export default function Footer() {
    return (
        <>
            <Footer_style>
                <div className='footerBox'>
                    <div className='upBox'>
                        <div className='logoBox'>
                            <Logo fill='#fff'/>
                            <div className='verticalLine'/>
                            <span><p>Узбекистан, Ташкент</p><p>Яккасарай 5 дом</p></span>
                        </div>
                        <div className='projectBox'>
                            <a className='projectItem'>logist box</a>
                            <div className='verticalLine'/>
                            <a className='projectItem'>school box</a>
                            <div className='verticalLine'/>
                            <a className='projectItem'>market box</a>
                        </div>
                    </div>
                    <div className='bottomBox'>
                        <div className='informationBox'>
                            <a className='infoItem'><Location/> <span><p>Узбекистан, Ташкент</p><p>Яккасарай 5 дом</p></span> </a>
                            <a className='infoItem'><Mail/>support@motionbox.uz</a>
                            <a className='infoItem'><Phone/>+998 99 881 80 60</a>
                        </div>
                        <div className='socialBox'>
                            <a className='coxialItem'></a>
                            <a className='coxialItem'></a>
                            <a className='coxialItem'></a>
                        </div>

                    </div>
                    
                </div>
            </Footer_style>
            <Cert>ВСЕ ПРАВА ЗАЩИЩЕНЫ © MOTION BOX / 2021</Cert>
        </>
        
    )
};