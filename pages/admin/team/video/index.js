import AdminLayer from "../../../../adminComponents/adminLayer";
import VideoScreen from '../../../../adminComponents/screens/videoScreen';
import Head from 'next/head';

export default function Index({ data }) {
    return (
        <AdminLayer>
            <Head>
                <title>{`MotionBox | ${data ? 'Изменение видео' : 'Добавление видео'}`}</title>
            </Head>

            <VideoScreen data={data ? data : null} />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/video');

    const { data } = await res.json();

    return { data };
}
