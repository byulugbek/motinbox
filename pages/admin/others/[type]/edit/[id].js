import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import AdminLayer from "../../../../../adminComponents/adminLayer";
import OtherScreen from "../../../../../adminComponents/screens/otherScreen";
import Head from 'next/head';
import PartnerScreen from '../../../../../adminComponents/screens/partnerScreen';

export default function Id({ data }) {
    const router = useRouter();
    const { type, id } = router.query;
    const [headData, setHeadData] = useState('');

    useEffect(() => {
        if (type === 'abilities') {
            setHeadData('способности');
        } else if (type === 'headings') {
            setHeadData('заглавия проекта');
        } else {
            setHeadData('соц. сети');
        }
    }, [])

    if (type !== 'partners' && type !== 'abilities' && type !== 'headings' && type !== 'socials')
        return <ErrorPage statusCode={404} />

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Изменение: "{data.title}"</title>
            </Head>
            {type === 'partners' ?
                <PartnerScreen data={data} />
                :
                <OtherScreen type={type} headData={headData} data={data} />
            }
        </AdminLayer>
    )
}

Id.getInitialProps = async (ctx) => {
    const { type, id } = ctx.query;

    if (type !== 'partners' && type !== 'abilities' && type !== 'headings' && type !== 'socials') {
        return {};
    };

    const res = await fetch(`http://localhost:3000/api/${type}/${id}`);

    const { data } = await res.json();

    return { data: data };
}