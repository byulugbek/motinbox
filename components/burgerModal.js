import { useEffect } from 'react';
import ModalLayer from './modalLayer';
import Button from './button';
import Link from 'next/link';
import { Logo } from './icons';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const BurgerWrap = styled.div`
    display: grid;
    height: 100vh;
    align-items: center;
    justify-content: center;
    justify-items: center;
    align-content: space-evenly;

    .logo{
        margin-left: 10px;
        transition: 0.5s;
        cursor: pointer;
        :active{
            transform: scale(1.1);
        }
    }
    .navigation{
        display: grid;
        justify-self: stretch;
        grid-auto-flow: row;
        gap: 30px;
        transition: 0.5s;
        justify-items: center;

        .navigationItem{
            height: 40px;
            width: 100%;
            line-height: 40px;
            text-align: center;
            border-radius: 50px;
            border: solid 0.5px var(--black100);
            white-space: nowrap;
            color: var(--black100);
            cursor: pointer;
            transition: 0.5s;
            a {
                width: 100%;
            }
            :active{
                transform: scale(1.1);
                color: var(--black50);
            }

        }
    }
`

const opacity = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
}

export default function burgerModal(props) {
    const { isBurger, setBurger, onClick } = props;
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('open');
        }
    }, [controls, inView]);

    const closeBurger = () => {
        controls.start('closed');
        setTimeout(() => {
            onClick();
        }, 1000);
    }

    return (
        <motion.div initial='closed' animate={controls} variants={opacity}>
            <ModalLayer isModal={isBurger} setModal={setBurger}>
                <BurgerWrap>
                    <Link href='/'><a className='logo'><Logo fill='#000' /></a></Link>

                    <ul className='navigation'>
                        <li className='navigationItem' onClick={closeBurger}>
                            <Link href='/aboutUs'>
                                <a><p>Кто мы такие</p></a>
                            </Link>
                        </li>
                        <li className='navigationItem' onClick={closeBurger}>
                            <Link href='/projects'>
                                <a><p>Наши проекты</p></a>
                            </Link>
                        </li>
                        <li className='navigationItem' onClick={closeBurger}>
                            <Link href='/portfolio'>
                                <a><p>Портфолио</p></a>
                            </Link>
                        </li>
                    </ul>

                    <Button onClick={closeBurger} text='ЗАКРЫТЬ' />
                </BurgerWrap>
            </ModalLayer>
        </motion.div>
    )
}
