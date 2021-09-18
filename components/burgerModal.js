import { useEffect } from 'react'
import ModalLayer from './modalLayer'
import Button from './button'
import Link from 'next/link'
import { Logo } from './icons'
import styled from 'styled-components'

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
            :active{
                transform: scale(1.1);
                color: var(--black50);
            }

        }
    }
`

export default function burgerModal(props) {
    const { isBurger, setBurger } = props;

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = (e) => {
        if (e.target.innerWidth > 1000)
            setBurger(false)
    }

    const buttonPressed = () => {
        setBurger(false)
    }


    return (
        <ModalLayer isModal={isBurger} setModal={setBurger}>
            <BurgerWrap>
                <Link href='/'><a className='logo'><Logo fill='#000' /></a></Link>

                <ul className='navigation'>
                    <li className='navigationItem'>
                        <Link onClick={buttonPressed} href='/aboutUs'>
                            <a>Кто мы такие</a>
                        </Link>
                    </li>
                    <li className='navigationItem'>
                        <Link onClick={buttonPressed} href='/projects'>
                            <a>Наши проекты</a>
                        </Link>
                    </li>
                    <li className='navigationItem'>
                        <Link onClick={buttonPressed} href='/portfolio'>
                            <a>Портфолио</a>
                        </Link>
                    </li>
                </ul>

                <Button onClick={buttonPressed} text='Закрыть' />
            </BurgerWrap>
        </ModalLayer>
    )
}
