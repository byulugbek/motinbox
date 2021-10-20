import AdminLayer from '../../adminComponents/adminLayer';
import AHome from '../../adminComponents/aHome';
import Head from 'next/head';
import { useEffect } from 'react';
import { AuthCheck } from '../../utils/functions/authCheck';
import { useRouter } from 'next/router';

export default function AdminHome({ data }) {
    const router = useRouter();

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        }
    }, [])

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Админ панель</title>
            </Head>
            <AHome data={{ data: data }} />
        </AdminLayer>
    )
}


AdminHome.getInitialProps = async () => {
    const res = await fetch(`${process.env.URL_BASE}/api/main`);

    const { data } = await res.json();

    return { data };
}