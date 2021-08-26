import styled, { css } from 'styled-components'
import Image from 'next/image'
import { Strelka, Instagram } from './icons'
import Link from 'next/link'

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
            gap: 10px;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.1) 100%);
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
                    gap: 20px;
                    width: 100%;
                    .title{
                        font-family: Bold;
                        font-size: 18px;
                        max-width: 50%;
                        color: var(--black100);
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
                            max-width: 50%;
                            color: var(--black100);
                        }
                        .instagram{
                            display: none;
                        }
                        .strelka{
                            display: block;
                        }
                    }
                }
            }
        }
    ${props => props.portfolio && css`
        padding-top: 100%;
        .filter{
            color: var(--white80);
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.01) 100%);
            }
            .info{
                .textBox{
                    .title{
                        font-family: Bold;
                        color: var(--white100) !important;
                        max-width: 100% !important;
                    }
                    .correct{
                        .descript{
                            color: var(--white80) !important;
                            max-width: 100% !important;
                        }
                    }
                }
            }
        }
        `}
        ${props => props.teamItem && css`
            padding-top: 150%;
            .filter{
                color: var(--white100);
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.01) 100%);
                }
                .info{
                    .textBox{
                        .title{
                            font-family: Bold;
                            color: var(--white100) !important;
                            max-width: 100% !important;
                        }
                        .correct{
                            align-items: stretch !important;
                            .descript{
                                color: var(--white80) !important;
                                max-width: 100% !important;
                            }
                            .instagram{
                                display: block !important;
                            }
                            .strelka{
                                display: none !important;
                            }
                        }
                    }
                }
            }
    `}
    @media only screen and (max-width: 500px) {
        padding-top: 100%;
        border-radius: 20px;
        .filter{
            padding: 20px;
            .info{
                .textBox{
                    gap: 10px; 
                    .title{
                        font-size: 14px;
                    }
                }
            }
        }
        ${props => props.teamItem && css`
            padding-top: 150%;
        `}
    }
`

export default function Card(props) {
    const {data} = props;
    return (
        <Card_style {...props}>
            <div className='filter'>
                <p>{data.theme}</p>
                <div className='info'>
                    <div className='textBox'>
                        <p className='title'>{data.title}</p>
                        <div className='correct'>
                            <p className='descript'>{data.descript}</p>
                            <Link href={`${data.link}`}>
                                <a className='strelka' target="_blank"><Strelka/></a>
                            </Link>
                            <Link href={`${data.url}`}>
                                <a className='instagram' target="_blank"><Instagram fill='#fff'/></a>
                            </Link>
                            
                        </div> 
                    </div>

                </div>
            </div>
            <Image src={`/${data.img}`} layout="fill"/>
        </Card_style> 
    )
};