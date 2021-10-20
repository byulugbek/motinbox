import { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import axios from 'axios';
import { Logo } from '../../../components/icons';
import LittleInput from '../../../adminComponents/globals/littleInput';
import Button from '../../../components/button';
import { useRouter } from 'next/router';


const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100vh;
    padding: 50px;
    justify-content: center;
    align-items: center;
    grid-template-columns: minmax(250px, 500px);
    

    form {
        border: 1px solid var(--black20);
        border-radius: 40px;
        padding: 50px;
        display: grid;
        gap: 20px;
        grid-auto-flow: rows;

        .bottom {
            width: 100%;
            display: grid;
            justify-content: center;
        }
    }

    @media only screen and (max-width: 700px) {
        padding: 20px;
        form {
            padding: 20px;
        }
    }
`

export default function Index() {
    const rounter = useRouter();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }

        if (username.length > 0 && password.length > 0) {
            const body = JSON.stringify({ username, password });

            try {
                const res = await axios.post(`${process.env.URL_BASE}/api/login`, body, config);

                if (res.data.statusCode === 200) {
                    window.localStorage.setItem('token', res.data.data.token);
                    rounter.replace('/admin');
                } else {
                    alert('Ошибка: что-то пошло не так');
                }

            } catch (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            }
        } else {
            alert('Заполните поля');
        }
    }

    return (
        <Container>
            <Head>
                <title>MotionBox | Вход</title>
            </Head>

            <form onSubmit={submit}>
                <Logo fill='#000' width="100%" />

                <LittleInput
                    title='Введите логин'
                    ph='Джон Дое'
                    text={username}
                    setText={setUsername}
                />
                <LittleInput
                    title='Введите пароль'
                    ph='12345'
                    text={password}
                    setText={setPassword}
                    type="password"
                />

                <div className='bottom'>
                    <Button text='Войти' />
                </div>
            </form>
        </Container>
    )
}