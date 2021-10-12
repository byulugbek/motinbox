import styled from 'styled-components';
import Link from 'next/link';
import { Burger, Logo } from '../components/icons';

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

export default function AHeader() {
    return (
        <Header_style>
            <button onClick={() => console.log('burger')}><Burger className='burger' /></button>

            <Link href='/admin'><a className='logo'><Logo fill='#000' /></a></Link>

            <ul className='navigation'>
                <li className='navigationItem'>
                    <Link href='/admin/team'>
                        <a>Команда</a>
                    </Link>
                </li>
                <li className='navigationItem'>
                    <Link href='/admin/projects'>
                        <a>Проекты</a>
                    </Link>
                </li>
                <li className='navigationItem'>
                    <Link href='/admin/portfolio'>
                        <a>Портфолио</a>
                    </Link>
                </li>
                <li className='navigationItem'>
                    <Link href='/admin/others'>
                        <a>Другие</a>
                    </Link>
                </li>
            </ul>

            <div />
        </Header_style>
    )
}
