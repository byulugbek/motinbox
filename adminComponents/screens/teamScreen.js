import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import axios from 'axios';
import Button from '../../components/button';
import Input from "../globals/input";
import ImageImporter from '../globals/imageImporter';
import { AuthCheck } from '../../utils/functions/authCheck';

const Team_style = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 50px;
    border: 1px solid var(--black20);
    border-radius: 40px;
    
    form {
        display: grid;
        gap: 30px;
    }
    .bottom {
        display: grid;
        justify-content: center;
    }


    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

export default function TeamScreen(props) {
    const { data } = props;
    const router = useRouter();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState();
    const [social, setSocial] = useState('');
    const [token, setToken] = useState();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned)
        }

        if (data) {
            setName(data.title);
            setPosition(data.description);
            setImage(data.imageOneUrl);
            setSocial(data.url);
        }

    }, [])

    const checkAllData = (e) => {
        e.preventDefault();
        if (disabled) return;

        if (name && position && social && image) {
            collectAllData();
        } else {
            alert('Заполните все поля!');
        }
    }

    const collectAllData = () => {
        const formData = new FormData();
        formData.append('title', name);
        formData.append('description', position);
        formData.append('url', social);
        formData.append('imageOne', image);
        formData.append('postType', 'team');

        sendData(formData);
    }

    const sendData = (formData) => {
        setDisabled(true);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': token
            },
        }

        if (!data) {
            axios.post(`${process.env.URL_BASE}/api/team`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
                } else {
                    setDisabled(false);
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/team/${data._id}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
                } else {
                    setDisabled(false);
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }


    return (
        <Team_style>
            <form onSubmit={checkAllData}>
                <h2>
                    {!data ? 'Добавление участника' : 'Изменение участника'}
                </h2>

                <Input
                    title='Ввдите имя'
                    text={name}
                    setText={setName}
                />

                <Input
                    title='Введите должность'
                    text={position}
                    setText={setPosition}
                />

                <ImageImporter
                    name='imageOne'
                    folder='team'
                    title='Загрузите портрет'
                    content={image}
                    setContent={setImage}
                />

                <Input
                    title='Введите ссылку на инстаграмм'
                    text={social}
                    setText={setSocial}
                />

                <div className='bottom' >
                    <Button
                        aria-label="SEND"
                        text='Отправить'
                    />
                </div>
            </form>
        </Team_style>
    )
}
