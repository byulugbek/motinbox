import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import VideoBlock from '../../../adminComponents/globals/videoBlock';
import Head from 'next/head';
import { AuthCheck } from '../../../utils/functions/authCheck';

export default function Index({ teamData, videoData }) {
    const router = useRouter();
    const [video, setVideo] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned);
        }
    }, [])

    const onDeletePressed = (id) => {
        const config = {
            headers: {
                'authorization': token
            }
        }
        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/team/${id}`, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Команда</title>
            </Head>

            <VideoBlock
                title={'Видео блок'}
                data={videoData.data}
            />
            <Table
                title={'Вся команда'}
                data={teamData.data}
                editable
                linkParam={'team'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const teamRes = await fetch('http://localhost:3000/api/team');
    const teamData = await teamRes.json();

    const videoRes = await fetch('http://localhost:3000/api/video');
    const videoData = await videoRes.json();

    return { teamData: teamData, videoData: videoData };
}