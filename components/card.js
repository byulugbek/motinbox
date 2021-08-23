import styled, { css } from 'styled-components'
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
                grid-template-columns: 1fr;
                gap: 30px;
                grid-auto-flow: column;
                align-items: flex-end;
                justify-content: space-between;
                height: 100%;
                .textBox{
                    display: grid;
                    gap: 30px;
                    width: 100%;
                    .title{
                        font-family: Bold;
                        font-size: 24px;
                        max-width: 250px;
                    }
                    .correct{
                        display: grid;
                        gap: 30px;
                        grid-auto-flow: column;
                        align-items: flex-end;
                        justify-content: space-between;
                        width: 100%;
                        .descript{
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            color: var(--black80);
                            max-width: 250px;
                        }
                    }
                }
            }
        }
    ${props => props.portfolio && css`
        padding-top: 100%;
        .filter{
            color: var(--white100);
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.01) 100%);
            }
            .info{
                .textBox{
                    .title{
                        font-family: Bold;
                        color: var(--white100) !important;
                        width: 100% !important;
                    }
                    .correct{
                        .descript{
                            color: var(--white100) !important;
                            width: 100% !important;
                        }
                    }
                }
            }
        }
    
    `}
`

export default function Card(props) {
    return (
        <Card_style {...props}>
            <div className='filter'>
                <p>{props.theme}</p>
                <div className='info'>
                    <div className='textBox'>
                        <p className='title'>{props.title}</p>
                        <div className='correct'>
                            <p className='descript'>{props.descript}</p>
                            <a><Strelka/></a>
                        </div> 
                    </div>

                </div>
            </div>
            <Image src={`/${props.img}`} layout="fill"/>
        </Card_style> 
    )
};