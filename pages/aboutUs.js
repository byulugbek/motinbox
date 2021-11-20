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
import { motion } from 'framer-motion';
import { fadeInSides } from '../components/animations';
import HeadComponent from "../components/head";
import Meta from '../models/Meta';

const Animation_screen = styled.div`
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    padding: 50px;
    align-content: space-between;
    border-radius: 40px;
    height: calc(100vh - 170px);
    background-color: var(--black100);
    .creator {
        display: grid;
        gap: 5px;
        grid-auto-flow: column;
        justify-self: left;
        p, h4 {
            white-space: nowrap;
        }
    }

    .upBox{
        z-index: 1;
        display: grid;
        gap: 20px;
        grid-auto-flow: column;
        color: var(--white100);
        justify-content: space-between;
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
    @media only screen and (max-width: 700px) {
        height: fit-content;
        border-radius: 20px;
        padding: 20px 20px 40px 20px;
        .upBox{
            display: grid;
            grid-auto-flow: row;
        }
        video {
            position: relative;
        }
        .bottomBox{
            .story{
                justify-content: space-around;
            }
            .creator{
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

export default function AboutUs({ video, team, meta }) {

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
            <HeadComponent
                title={'MotionBox | Кто мы такие'}
                metatitle={meta.title}
                description={meta.description}
            />
            <motion.div initial='hidden' animate='visible' variants={fadeInSides(0, 60)}>
                <Animation_screen>
                    <div className='upBox'>
                        <div dangerouslySetInnerHTML={{ __html: video.title }} />
                        <div className='creator'>
                            <p >Мы основаны:</p>
                            <h4>2021</h4>
                        </div>
                    </div>
                    <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%' }}>
                        <source src={video.videoUrl} />
                    </video>
                    <div className='bottomBox'>
                        <div dangerouslySetInnerHTML={{ __html: video.description }} />
                        <div className='story'>
                            <Link href='/projects'>
                                <a>
                                    <Button lite text='Наши проекты' />
                                </a>
                            </Link>
                            <div className='creator'>
                                <p> Основатель:</p>
                                <h4>Ulugbek Alimov</h4>
                            </div>
                        </div>
                    </div>
                </Animation_screen>
            </motion.div>
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
    const meta = JSON.parse(JSON.stringify(await Meta.find({})));

    return {
        props: {
            video: video.length ? video[0] : { title: '<h2>Пусто</h2>', description: '<p>Пусто</p>' },
            team,
            meta: {
                title: meta.length ? meta[0].aboutTitle : 'MotionBox | Кто мы такие',
                description: meta.length ? meta[0].aboutDesc : 'MotionBox | Описание станицы команды'
            }
        }
    }
}