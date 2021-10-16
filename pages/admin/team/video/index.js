import AdminLayer from "../../../../adminComponents/adminLayer";
import VideoScreen from '../../../../adminComponents/screens/videoScreen';
import Head from 'next/head';

export default function Index({ data }) {
    return (
        <AdminLayer>
            <Head>
                <title>{`MotionBox | ${data.length > 0 ? 'Изменение видео' : 'Добавление видео'}`}</title>
            </Head>

            <VideoScreen data={data.length > 0 ? data[0] : null} />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/video');

    const { data } = await res.json();

    return { data };
}
