import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Input from "../globals/input";
import Button from '../../components/button';
import axios from 'axios';
import { AuthCheck } from '../../utils/functions/authCheck';

const Screen_Style = styled.div`
    display: grid;
    width: 100%;
    max-width: 1000px;
    gap: 30px;
    border-radius: 40px;
    border: 1px solid var(--black20);
    padding: 50px;

    .bottom {
        display: grid;
        justify-content: center;
    }

    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

export default function OtherScreen(props) {
    const { data, type, headData } = props;
    const router = useRouter();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [token, setToken] = useState();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned);
        }

        if (data) {
            setTitle(data.title)
            setDesc(data.description);
        }
    }, [])

    const checkData = async () => {
        if (disabled) return;

        if (title && desc) {
            const body = {
                title: title,
                description: desc,
            };
            sendData(body);
        } else {
            alert('Заполните все поля!');
        }
    }

    const sendData = (body) => {
        setDisabled(true);
        const config = {
            headers: { 'Authorization': token }
        }
        if (!data) {
            axios.post(`${process.env.URL_BASE}/api/${type}`, body, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push('/admin/others');
                } else {
                    setDisabled(false);
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                setDisabled(false);
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/${type}/${data._id}`, body, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push('/admin/others');
                } else {
                    setDisabled(false);
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                setDisabled(false);
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <Screen_Style>
            <h2 className='title'>
                {`Добавление ${headData}`}
            </h2>
            <Input
                title={`Введите название ${headData}`}
                text={title}
                setText={setTitle}
            />
            <Input
                title={type === 'socials' ? 'Введите ссылку' : 'Введите описание'}
                text={desc}
                setText={setDesc}
            />
            <div className='bottom'>
                <Button aria-label="SEND" text='Отправить' onClick={checkData} />
            </div>
        </Screen_Style>
    )
}
