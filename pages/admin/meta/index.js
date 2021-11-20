import Head from 'next/head';
import MetaScreen from "../../../adminComponents/screens/metaScreen";
import AdminLayer from '../../../adminComponents/adminLayer';

export default function Index({ meta }) {
    return (
        <>
            <Head>
                <title>MotionBox | Все мета данные</title>
            </Head>
            <AdminLayer>
                <MetaScreen data={meta} />
            </AdminLayer>
        </>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch(`${process.env.URL_BASE}/api/meta`);

    const { data } = await res.json();

    return { meta: data[0] };
}