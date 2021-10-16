import AdminLayer from "../../../adminComponents/adminLayer";
import PortfolioScreen from '../../../adminComponents/screens/portfolioScreen';
import Head from 'next/head';


export default function New() {
    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Добавление портфолио</title>
            </Head>

            <PortfolioScreen />
        </AdminLayer>
    )
}
