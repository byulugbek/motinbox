import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthCheck } from '../../../utils/functions/authCheck';

export default function Index({ projects }) {
    const router = useRouter();
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
            },
        }

        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/projects/${id}`, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/projects`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Все проекты</title>
            </Head>
            <Table
                title={'Все проекты'}
                data={projects}
                editable
                linkParam={'projects'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/projects');

    const { data } = await res.json();

    return { projects: data };
}