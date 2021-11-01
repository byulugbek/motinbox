import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthCheck } from '../../utils/functions/authCheck';
import Input from '../globals/input';
import ImageImporter from '../globals/imageImporter';
import Button from '../../components/button';
import axios from 'axios';

const Container = styled.div`
    display: grid;
    width: 100%;
    max-width: 1000px;
    padding: 50px;
    border: 1px solid var(--black20);
    border-radius: 40px;
    
    form {
        display: grid;
        gap: 30px;
        grid-auto-flow: row;
    }

    .title {
        font-size: 24px;
    }
    
    .bottom {
        width: 100%;
        display: grid;
        justify-content: center;
    }

    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

export default function PartnerScreen(props) {
    const { data } = props;
    const router = useRouter();
    const [title, setTitle] = useState();
    const [imageOne, setImageOne] = useState();
    const [url, setUrl] = useState();
    const [queue, setQueue] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned);
        }

        if (data) {
            setTitle(data.title);
            setImageOne(data.imageOne);
            setUrl(data.url);
            setQueue(data.queue);
        }
    }, [])

    const checkAllData = (e) => {
        e.preventDefault();

        if (title && imageOne && url) {
            collectAllData();
        } else {
            alert('Заполните все поля!');
        }
    }

    const collectAllData = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('url', url);
        formData.append('imageOne', imageOne);
        formData.append('queue', queue);

        sendData(formData);
    }
    const sendData = (formData) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': token
            },
        }

        if (!data) {
            axios.post(`${process.env.URL_BASE}/api/partners`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/others`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/partners/${data._id}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/others`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <Container>
            <form onSubmit={checkAllData}>
                <span className='title'>
                    {!data ? 'Добавление партнера' : 'Изменение партнера'}
                </span>

                <Input
                    inputType='input'
                    title='Введите ссылку'
                    title='Введите название компании'
                    text={title}
                    setText={setTitle}
                />

                <Input
                    inputType='input'
                    title='Введите ссылку'
                    text={url}
                    setText={setUrl}
                />

                <Input
                    inputType='input'
                    type='number'
                    title='Введите очередь'
                    text={queue}
                    setText={setQueue}
                />

                <ImageImporter
                    name='imageOne'
                    folder='partners'
                    title='Загрузите абложку'
                    content={imageOne}
                    setContent={setImageOne}
                />

                <div className='bottom'>
                    <Button
                        text='Отправить'
                    />
                </div>
            </form>
        </Container>
    )
}
