import AdminLayer from "../../../adminComponents/adminLayer";
import TeamScreen from "../../../adminComponents/screens/teamScreen";
import Head from 'next/head';


export default function New() {
    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Добавление в команду</title>
            </Head>

            <TeamScreen />
        </AdminLayer>
    )
}
