import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import { Instagram } from '../../components/icons';
import Button from '../../components/button';
import MainLayer from '../../components/mainLayer';
import Link from 'next/link';
import ErrorPage from 'next/error';

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
    .bottom {
        display: grid;
        grid-auto-flow: rows;
        gap: 10px;
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
export default function Post({ data, socials }) {
    const metaDescription = data.data.description.split('<p>');

    if (data.statusCode !== 200) {
        return <ErrorPage statusCode={data.statusCode} />
    }

    const mapSocials = data.data.socials.map(item => {
        const social = socials.data.filter(i => i._id === item);
        return (
            <Link key={item} href={social[0].description}>
                <a target='_blank'>
                    <Instagram fill='#000' />
                </a>
            </Link>
        )
    });

    return (
        <MainLayer>
            <Head>
                <title>MotionBox | {data.data.title}</title>
                <meta name='description' content={metaDescription[1].slice(0, 200)} />
            </Head>
            <PostWrap>
                <p className='theme'>{data.data.type}</p>
                <p className='Title'>{data.data.title}</p>
                <div className='descript' dangerouslySetInnerHTML={{ __html: data.data.description }} />
                <div className='imageBox'>
                    <div className='picture'>
                        <Image src={`/uploads/portfolio/${data.data.imageOne}`} layout='fill' alt={data.data.imageOne} />
                    </div>
                    <div className='calaje'>
                        <div className='picture Litle'>
                            <Image src={`/uploads/portfolio/${data.data.imageTwo}`} layout='fill' alt={data.data.imageTwo} />
                        </div>
                        <div className='picture Litle'>
                            <Image src={`/uploads/portfolio/${data.data.imageThree}`} layout='fill' alt={data.data.imageThree} />
                        </div>
                        <div className='picture Litle'>
                            <Image src={`/uploads/portfolio/${data.data.imageFour}`} layout='fill' alt={data.data.imageFour} />
                        </div>
                    </div>
                </div>
                <div className='descript' dangerouslySetInnerHTML={{ __html: data.data.conclusion }} />
                <div className='bottom'>
                    <hr className='line' />
                    <div className='feedback'>
                        {<div className='social'>
                            {mapSocials}
                        </div>}
                        <Link href={data.data.url}>
                            <a target='_blank'>
                                <Button
                                    text='Перейти'
                                />
                            </a>
                        </Link>
                    </div>
                    <hr className='line' />
                </div>
            </PostWrap>
        </MainLayer>
    )
};

Post.getInitialProps = async ({ query }) => {
    const { id } = query;

    const res = await fetch(`${process.env.URL_BASE}/api/portfolio/${id}`);

    const data = await res.json();

    const resSocials = await fetch(`${process.env.URL_BASE}/api/socials`);
    const socialsData = await resSocials.json();

    return {
        data: data,
        socials: socialsData,
    }
}