import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from './button';
import { Logo, Burger } from './icons';
import BurgerModal from './burgerModal';

const Header_style = styled.div`
    display: grid; 
    grid-auto-flow: column;
    gap: 30px;
    position: sticky;
    align-items: center;
    justify-self: center;
    justify-content: space-between;       
    
    z-index: 100;
    width: calc(100% - 80px);
    top: 30px;
    padding: 20px;
    margin-bottom: 30px;
    max-width: 920px;
 
    border-radius: 100px;
    color: var(--black100);
    box-shadow: var(--shadow);
    background-color: var(--white50);
    backdrop-filter: blur(30px);    
    .burger{
        justify-content: left;
        display: none;
        transition: 0.5s;
        cursor: pointer;
        :hover{
            opacity: 50%;
        }
    }
    .logo{
        margin-left: 10px;
        transition: 0.5s;
        cursor: pointer;
        :hover{
            transform: scale(1.1);
        }
    }
    .navigation{
        display: grid;
        grid-auto-flow: column;
        gap: 60px;
        transition: 0.5s;

        .navigationItem{
            white-space: nowrap;
            color: var(--black100);
            cursor: pointer;
            transition: 0.5s;
            :hover{
                transform: scale(1.1);
                color: var(--black50);
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        gap: 20px;
        .logo{ 
            width: 140px;
            margin-left: 10px; 
        }
        .burger{
            display: block;
            :hover{
                opacity: 100%;
            }
            :active{
                opacity: 50%;
            }
        }
        .navigation{
            display: none;
        }
    }
    @media only screen and (max-width: 500px) {
        top: 0px;
        gap: 20px;
        width: 100%;
        border-radius: 0;  
        margin-bottom: 0;      
        .logo{ display: none; }
    }
`
export default function Header() {
    const [isMobile, setMobile] = useState(false);
    const [isBurger, setBurger] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 1000) {
            setMobile(false);
        } else {
            setMobile(true);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = (e) => {
        if (e.target.innerWidth > 1000) {
            setBurger(false);
            setMobile(false);
        } else if (e.target.innerWidth < 1000) {
            setMobile(true);
        }
    }

    const buttonPressed = () => {
        setBurger(false);
    }

    return (
        <>
            <Header_style>
                {isMobile && <button aria-label="BURGER" onClick={() => setBurger(true)}><Burger className='burger' /></button>}

                <Link href='/' scroll={false}><a aria-label="LOGO" className='logo'><Logo fill='#000' /></a></Link>

                <ul className='navigation'>
                    <li className='navigationItem'>
                        <Link href='/aboutUs' scroll={false}>
                            <a><h3>Кто мы такие</h3></a>
                        </Link>
                    </li>
                    <li className='navigationItem'>
                        <Link href='/projects' scroll={false}>
                            <a><h3>Наши проекты</h3></a>
                        </Link>
                    </li>
                    <li className='navigationItem'>
                        <Link href='/portfolio' scroll={false}>
                            <a><h3>Портфолио</h3></a>
                        </Link>
                    </li>
                </ul>
                <Link href='/makeOrder' scroll={false}>
                    <a>
                        <Button text='БЫТЬ С НАМИ' />
                    </a>
                </Link>
            </Header_style>

            {isBurger && <BurgerModal isBurger={isBurger} setBurger={setBurger} onClick={buttonPressed} />}
        </>
    )
};

