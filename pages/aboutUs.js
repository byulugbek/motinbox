import Head from 'next/head';
import styled from 'styled-components'
import Title from '../components/title'
import Button from '../components/button'
import Card from '../components/card'
import MainLayer from '../components/mainLayer'
import Link from 'next/link';
import Video from '../models/Video';
import Team from '../models/Team';
import dbConnect from '../utils/dbConnect';

const Animatin_screen = styled.div`
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    padding: 50px;
    align-content: space-between;
    border-radius: 40px;
    height: calc(100vh - 170px);
    background-color: var(--black100);
    .upBox{
        z-index: 1;
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
    video {
        position: absolute;
        z-index: 0;
    }
    .bottomBox{
        z-index: 1;
        display: grid;
        gap:30px;
        justify-content: stretch;
        color: var(--white100);
        .boldText{
            margin-left: 5px;
            font-family: Bold;
        }
        .about{
            max-width: 400px;
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
const Team_style = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    transition: 0.5s;

    @media only screen and (max-width: 1000px) {
        gap: 10px;
        grid-template-columns: repeat(2, 1fr);    
    }

    @media only screen and (max-width: 500px) {
        gap: 10px;
        grid-template-columns: repeat(1, 1fr);    
    }
`
export default function AboutUs({ video, team }) {

    const mapTeamCards = team.map((post) => {
        return (
            <Card teamItem
                key={post._id}
                data={post}
                type='teamItem'
            />
        )
    })

    return (
        <MainLayer>
            <Head>
                <title>MotionBox | Кто мы такие</title>
                <meta name='description' content='Это мы' />
            </Head>
            <Animatin_screen>
                <div className='upBox'>
                    <h1 className='slogan'>{video.title}</h1>
                    <p >Мы основаны:<span className='boldText'>2021</span></p>
                </div>
                <video autoPlay loop style={{ width: '100%', height: '100%' }}>
                    <source src={`uploads/video/${video.video}`} />
                </video>
                <div className='bottomBox'>
                    <p className='about'>{video.description}</p>
                    <div className='story'>
                        <Link href='/projects'>
                            <a>
                                <Button lite text='Наши проекты' />
                            </a>
                        </Link>
                        <p className='creater'> Основатель:<span className='boldText'>Ulugbek Alimov</span></p>
                    </div>
                </div>
            </Animatin_screen>
            <Title
                text='Наша семья'
            />
            <Team_style>
                {mapTeamCards}
            </Team_style>
        </MainLayer>
    )
};

export async function getServerSideProps() {
    dbConnect();

    const video = JSON.parse(JSON.stringify(await Video.find({})));
    const team = JSON.parse(JSON.stringify(await Team.find({})));

    return {
        props: {
            video: video[0], team
        }
    }
}