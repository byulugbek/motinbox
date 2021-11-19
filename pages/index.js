import Head from 'next/head';
import MainLayer from '../components/mainLayer';
import HomePage from '../components/home';
import Projects from '../models/Projects';
import Portfolio from '../models/Portfolio';
import Partners from '../models/Partners';
import dbConnect from '../utils/dbConnect';
import Abilities from '../models/Abilities';


export default function Index(props) {
    return (
        <MainLayer>
            <Head>
                <title>MotionBox | Главная</title>
                <meta name='description' content='На главной странице собранны все информации' />
            </Head>
            <HomePage data={{ main: props.main, }} />
        </MainLayer>
    )
}

const fields = {
    _id: 1,
    title: 1,
    shortDesc: 1,
    type: 1,
    imageOneUrl: 1,
    date: 1,
    postType: 1,
}

export async function getServerSideProps() {
    dbConnect();

    const projects = JSON.parse(JSON.stringify(await Projects.find({ onMain: true, }, fields).sort({ date: -1 })));
    const portfolio = JSON.parse(JSON.stringify(await Portfolio.find({ onMain: true }, fields).sort({ date: -1 })));
    const partners = JSON.parse(JSON.stringify(await Partners.find({}).sort({ queue: 1 })));
    const abilities = JSON.parse(JSON.stringify(await Abilities.find({})));

    return {
        props: {
            main: {
                projects,
                portfolio,
                partners,
                abilities,
            }
        }
    }
}