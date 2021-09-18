import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import VideoBlock from '../../../adminComponents/globals/videoBlock';

const data = [
    {
        _id: 0,
        title: 'Мобильное приложение',
        description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
    },
    {
        _id: 1,
        title: 'Мобильное приложение',
        description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
    },
    {
        _id: 2,
        title: 'Мобильное приложение',
        description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
    }
]

const video_data = {
    _id: 0,
    name: 'Преврвщаем\nСмелые идеи в\nЧистый дизайн',
    description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором. Мы верим, что компания реализует свой потенциал, если каждый человек в компании реализует свой потенциал. Свой талант. Творческий, стратегический, финансовый, управленческий, предпринимательский, любой.'
}

export default function index() {

    const onDeletePressed = (id) => {
        console.log('Pressed', id)
    }

    return (
        <AdminLayer>
            <VideoBlock
                title={'Видео блок'}
                data={video_data}
            />
            <Table
                title={'Вся команда'}
                data={data}
                editable
                linkParam={'team'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}