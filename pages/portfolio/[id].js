import styled from 'styled-components';
import Image from 'next/image';
import { Instagram } from '../../components/icons';
import Button from '../../components/button';
import MainLayer from '../../components/mainLayer';

const PostWrap = styled.div`
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    justify-self: center;
    justify-content: space-between;  
    
    gap: 50px;
    top: 30px;   
    width: 100%;
    max-width: 1000px;
    border-radius: 40px;
    border: 0.5px solid var(--black20);
    padding: 50px;
    font-size: 18px;
    .line{
        width:100%;
        height: 0.5px;
        border-width: 0;
        background-color: var(--black20);
    }
    .theme{
        color: var(--black50)
    }
    .descript{
        color: var(--black80)
    }
    .Title{
        font-family: Bold;
        font-size: 24px;
    }
    .imageBox{
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
        img{
            z-index: 1;
            object-fit: cover;
        }
        .picture{
            width: 100%;
            padding-top: 60%;
            position: relative;
            height: fit-content;
            overflow: hidden;
            border-radius: 10px;
        }
        .calaje{    
            display: grid;
            grid-auto-flow: column;
            gap: 20px;
            .Litle{
                border-radius: 10px;
                width: 100%;
                padding-top: 100%;
                position: relative;
                height: fit-content;
                overflow: hidden;
            }
        }
    }
    .feedback{
        display: grid;
        grid-auto-flow: column;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
        .social{
            display: grid;
            grid-auto-flow: column;
            gap: 20px;
        }
    }

    @media only screen and (max-width: 500px) {
        gap: 30px;
        border-radius: 20px;
        padding: 20px;
        font-size: 14px;
        .imageBox{
            gap: 10px;
            .calaje{
                gap: 10px;
            }
        }

    }
`


export default function Post() {
    return (
        <MainLayer>
            <PostWrap>
                <p className='theme'>Мобильное приложение</p>
                <p className='Title'>Коллаборация SCAZY x ADIDAS в честь 70-летия бренда</p>
                <p className='descript'>Новая коллаборация от Scazy, в честь 70-летия бренда @adidas, которая основана на художественном стиле #Patternism, который говорит о том, что независимо от того, насколько богата и чрезмерна культурная среда, бренд Adidas никогда не потеряется в ней и займет свое особое место.</p>
                <p className='descript'>Новая коллаборация от Scazy, в честь 70-летия бренда @adidas, которая основана на художественном стиле #Patternism, который говорит о том, что независимо от того, насколько богата и чрезмерна культурная среда, бренд Adidas никогда не потеряется в ней и займет свое особое место.</p>
                <p className='descript'>Новая коллаборация от Scazy, в честь 70-летия бренда @adidas, которая основана на художественном стиле #Patternism, который говорит о том, что независимо от того, насколько богата и чрезмерна культурная среда, бренд Adidas никогда не потеряется в ней и займет свое особое место.</p>
                <p className='descript'>Новая коллаборация от Scazy, в честь 70-летия бренда @adidas, которая основана на художественном стиле #Patternism, который говорит о том, что независимо от того, насколько богата и чрезмерна культурная среда, бренд Adidas никогда не потеряется в ней и займет свое особое место.</p>
                <p className='descript'>Новая коллаборация от Scazy, в честь 70-летия бренда @adidas, которая основана на художественном стиле #Patternism, который говорит о том, что независимо от того, насколько богата и чрезмерна культурная среда, бренд Adidas никогда не потеряется в ней и займет свое особое место.</p>
                <div className='imageBox'>
                    <div className='picture'><Image src={`/cardPhoto2.webp`} layout='fill' /></div>
                    <div className='calaje'>
                        <div className='picture Litle'><Image src={`/cardPhoto2.webp`} layout='fill' /></div>
                        <div className='picture Litle'><Image src={`/cardPhoto2.webp`} layout='fill' /></div>
                        <div className='picture Litle'><Image src={`/cardPhoto2.webp`} layout='fill' /></div>
                    </div>
                </div>
                <p className='descript'>A brand that has gone far beyond sports, affecting the absolute diversity of the audience. </p>
                <p className='descript'>This pattern refers to a variety of subcultures, and even those sections of society that are not related to art and culture.</p>
                <hr className='line' />
                <div className='feedback'>
                    <div className='social'>
                        <a><Instagram fill='#000000' /></a>
                        <a><Instagram fill='#000000' /></a>
                        <a><Instagram fill='#000000' /></a>
                    </div>
                    <Button
                        text='Лайкнуть'
                    />
                </div>
                <hr className='line' />
            </PostWrap>
        </MainLayer>
    )
};