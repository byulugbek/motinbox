import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayer from "../../../../adminComponents/adminLayer";
import PortfolioScreen from '../../../../adminComponents/screens/portfolioScreen';
import Head from 'next/head';
export default function Id({ data, statusCode }) {
    const router = useRouter();
    useEffect(() => {
        if (statusCode === 400) {
            alert('Произошла ошибка! Нет поста с таким ID');
            router.push('/admin/portfolio');
        }
    }, [])

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Изменение: "{data.title}"</title>
            </Head>

            <PortfolioScreen
                data={data}
            />
        </AdminLayer>
    )
}

Id.getInitialProps = async (ctx) => {
    const { id } = ctx.query;

    const res = await fetch(`http://localhost:3000/api/portfolio/${id}`);

    const { data, statusCode } = await res.json();

    return { data, statusCode };
}