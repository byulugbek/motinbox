import AdminLayer from "../../../adminComponents/adminLayer";
import ProjectScreen from '../../../adminComponents/screens/projectScreen';
import Head from 'next/head';


export default function New() {
    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Добавление проекта</title>
            </Head>
            <ProjectScreen />
        </AdminLayer>
    )
}
