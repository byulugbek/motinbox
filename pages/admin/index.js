import AdminLayer from '../../adminComponents/adminLayer';
import AHome from '../../adminComponents/aHome';
import Head from 'next/head';
import { useEffect } from 'react';
import { AuthCheck } from '../../utils/functions/authCheck';
import { useRouter } from 'next/router';

export default function AdminHome({ data, meta }) {
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
            <AHome data={{ data: data }} meta={meta} />
        </AdminLayer>
    )
}


AdminHome.getInitialProps = async () => {
    const mainRes = await fetch(`${process.env.URL_BASE}/api/main`);
    const metaRes = await fetch(`${process.env.URL_BASE}/api/meta`);

    const { data } = await mainRes.json();
    const metaData = await metaRes.json();

    const meta = metaData.data[0];

    const joinedMeta = metaData.data.length > 0 ? [{
        _id: meta._id,
        title: 'Все мета данные',
        description:
            `<strong>На главной:</strong> ${meta.mainTitle} <strong>/</strong> ${meta.mainDesc}<br/><br/>
            <strong>О нас:</strong> ${meta.aboutTitle} <strong>/</strong> ${meta.aboutDesc}<br/><br/>
            <strong>Проекты:</strong> ${meta.projectsTitle} <strong>/</strong> ${meta.projectsDesc}<br/><br/>
            <strong>Портфолио:</strong> ${meta.portfolioTitle} <strong>/</strong> ${meta.portfolioDesc}<br/><br/>
            <strong>Связь с нами:</strong> ${meta.contactTitle} <strong>/</strong> ${meta.contactDesc}<br/><br/>
            `
    }] : [];

    return { data, meta: joinedMeta };
}