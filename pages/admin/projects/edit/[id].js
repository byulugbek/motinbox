import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayer from '../../../../adminComponents/adminLayer';
import ProjectScreen from '../../../../adminComponents/screens/projectScreen';
import Head from 'next/head';

export default function Id({ data, statusCode }) {
    const router = useRouter();
    useEffect(() => {
        if (statusCode === 400) {
            alert('Произошла ошибка! Нет поста с таким ID');
            router.push('/admin/projects');
        }
    }, [])

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Изменение: "{data.title}"</title>
            </Head>

            <ProjectScreen
                data={data}
            />
        </AdminLayer>
    )
}

Id.getInitialProps = async (ctx) => {
    const { id } = ctx.query;

    const res = await fetch(`${process.env.URL_BASE}/api/projects/${id}`);

    const { data, statusCode } = await res.json();

    return { data, statusCode };
}