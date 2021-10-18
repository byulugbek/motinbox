import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import { Burger, Logo } from '../components/icons';
import Button from '../components/button';
import { AuthCheck } from '../utils/functions/authCheck';
import { useRouter } from 'next/router';
import ABurgerModal from './aBurgerModal';

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
            display: flex;
            align-items: center;
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
    const router = useRouter();
    const [token, setToken] = useState();
    const [isMobile, setMobile] = useState(false);
    const [isBurger, setBurger] = useState(false);

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned);
        }

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

    const logout = async () => {
        const config = {
            headers: {
                'authorization': token
            }
        }
        if (confirm('Вы уверены что хотите выйти?')) {
            try {
                const res = await axios.get('/api/login', config);
                if (res.data.statusCode === 200) {
                    window.localStorage.removeItem('token');
                    router.replace('admin/login');
                } else {
                    alert('Ошибка: что-то пошло не так');
                }
            } catch (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            }
        }
    }

    const handleResize = (e) => {
        if (e.target.innerWidth > 1000) {
            setBurger(false);
            setMobile(false);
        }
        else if (e.target.innerWidth < 1000)
            setMobile(true);
    }

    const buttonPressed = () => {
        setBurger(false)
    }

    return (
        <>
            <Header_style>
                {isMobile && <button onClick={() => setBurger(true)}><Burger className='burger' /></button>}

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

                <Button text='Выход' onClick={logout} />
            </Header_style>
            {isBurger && <ABurgerModal isBurger={isBurger} setBurger={setBurger} onClick={buttonPressed} />}
        </>
    )
}
