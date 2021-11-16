import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from './button';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInSides } from './animations';

const Card_style = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    grid-template-areas: "title descript";
    gap: 20px;
    width: 100%;
    cursor: default;
    .title{
        grid-area: title;
    }
    .descript{
        height:100%;
        grid-area: descript;
        display: grid;
        gap: 20px;
        justify-content: space-between;
        grid-auto-flow: column;
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        grid-template-rows: none;
        grid-template-areas: none;
        .title{
            grid-area: auto;
        }
        .descript{
            height:100%;
            grid-area: auto;
            grid-auto-flow: row;
        }
    }

`

export default function DoingCard(props) {
    const { data } = props;

    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <>
            <Card_style ref={ref} initial="hidden" animate={controls} variants={fadeInSides(0, 60)}>
                <h2 className='title'>{data?.title}</h2>
                <div className='descript'>
                    <p>{data?.description}</p>
                    <Link href='/makeOrder'>
                        <a>
                            <Button text='ХОЧУ ЭТО' />
                        </a>
                    </Link>
                </div>
            </Card_style>
            <hr className='line' />
        </>
    )
}