import MainLayer from '../components/mainLayer';
import HomePage from '../components/home';
import Projects from '../models/Projects';
import Portfolio from '../models/Portfolio';
import Partners from '../models/Partners';
import dbConnect from '../utils/dbConnect';
import Abilities from '../models/Abilities';
import Meta from '../models/Meta';
import HeadComponent from '../components/head';


export default function Index(props) {
    return (
        <MainLayer>
            <HeadComponent
                title={'MotionBox | Главная'}
                metatitle={props.meta.title}
                description={props.meta.description}
            />
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
    const meta = JSON.parse(JSON.stringify(await Meta.find({})));

    return {
        props: {
            main: {
                projects,
                portfolio,
                partners,
                abilities,
            },
            meta: {
                title: meta.length ? meta[0].mainTitle : 'MotionBox | Главная',
                description: meta.length ? meta[0].mainDesc : 'MotionBox | Описание главной страницы'
            }
        }
    }
}