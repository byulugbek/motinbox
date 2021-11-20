import { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInSides } from './animations';

const PartnersCard = styled(motion.div)`
    display: grid;
    justify-content: center;
    align-items: center;
    width: fit-content;
    user-select: none;
    img {
        object-fit: cover;
        filter: grayscale(100%);
        transition: 0.3s ease-in-out;
        
        :hover {
            filter: grayscale(0%);
        }
    }
    @media only screen and (max-width: 500px) {
        svg{
            width: 100%;
        }
    }
`

export default function PartnerCard(props) {
    const { data } = props;

    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <PartnersCard ref={ref} initial="hidden" animate={controls} variants={fadeInSides(0, 60)}>
            <Link key={data._id} href={data.url}>
                <a
                    className='heardItem'
                    target='_blank'
                    rel="noopener"
                >
                    <Image src={data.imageOneUrl} width='250px' height='100px' alt={data.title} priority='true' />
                </a>
            </Link>
        </PartnersCard>
    )
}
