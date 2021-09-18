import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';

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

export default function index() {

    const onDeletePressed = (id) => {
        console.log('Pressed', id)
    }

    return (
        <AdminLayer>
            <Table
                title={'Все проекты'}
                data={data}
                editable
                linkParam={'projects'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}