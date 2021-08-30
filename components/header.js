import styled from 'styled-components'
import Link from 'next/link'
import Button from './button'
import { Logo, Burger } from './icons'

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
        background-color: transparent;
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
            font-size: 18px;
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
    return (
        <>
            <Header_style> 
                    <Burger className='burger'/>
                    
                    <Link href='/'><a className='logo'><Logo fill='#000'/></a></Link>

                    <ul className='navigation'>
                        <li className='navigationItem'><Link href='/aboutUs'><a>Кто мы такие</a></Link></li>
                        <li className='navigationItem'><Link href='/projects'><a>Наши проекты</a></Link></li>
                        <li className='navigationItem'><Link href='/portfolio'><a>Портфолио</a></Link></li>
                    </ul>
                    <Button text='БЫТЬ С НАМИ'/>
            </Header_style> 
        </>
    )
};