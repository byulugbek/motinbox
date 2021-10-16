import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayer from "../../../../adminComponents/adminLayer";
import ErrorPage from 'next/error';
import OtherScreen from "../../../../adminComponents/screens/otherScreen";
import Head from 'next/head';


export default function New() {
    const router = useRouter();
    const { type } = router.query;
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

    if (type !== 'abilities' && type !== 'headings' && type !== 'socials')
        return <ErrorPage statusCode={404} />

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Добавление {headData}</title>
            </Head>

            <OtherScreen type={type} headData={headData} />
        </AdminLayer>
    )
}