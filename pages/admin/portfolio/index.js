import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthCheck } from '../../../utils/functions/authCheck';

export default function Index({ portfolio }) {
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
            axios.delete(`${process.env.URL_BASE}/api/portfolio/${id}`, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/portfolio`);
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
                <title>MotionBox | Все портфолио</title>
            </Head>

            <Table
                title={'Все портфолио'}
                data={portfolio}
                editable
                linkParam={'portfolio'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch(`${process.env.URL_BASE}/api/portfolio`);

    const { data } = await res.json();

    return { portfolio: data };
}