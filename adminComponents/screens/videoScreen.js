import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';
import axios from 'axios';
import VideoImporter from '../globals/videoImporter';
import Button from '../../components/button';
import { AuthCheck } from '../../utils/functions/authCheck';
import TextEditor from '../globals/textEditor';

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
    
    .bottom {
        width: 100%;
        display: grid;
        justify-content: center;
    }


    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

export default function VideoScreen(props) {
    const router = useRouter();
    const { data } = props;
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [video, setVideo] = useState();
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
            setDescription(data.description);
            setVideo(data.video);
        }
    }, [])

    const checkData = (e) => {
        e.preventDefault();
        if (title && description && video) {
            sendData();
        } else {
            alert('Заполните все поля!');
        }
    }

    const sendData = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': token
            },
        }

        if (!data) {
            axios.post(`${process.env.URL_BASE}/api/video`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/video/${data._id}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <Container>
            <form onSubmit={checkData}>
                <h2>{data ? 'Редактирование' : 'Добавление'} видео</h2>

                <TextEditor
                    title='Введите заглавие видео блока'
                    text={title}
                    setText={setTitle}
                />


                <TextEditor
                    title='Введите описание видео блока'
                    text={description}
                    setText={setDescription}
                />

                <VideoImporter
                    name='video'
                    content={video}
                    setContent={setVideo}
                />

                <div className='bottom'>
                    <Button
                        aria-label="SEND"
                        text='Отправить'
                    />
                </div>
            </form>
        </Container>
    )
}
