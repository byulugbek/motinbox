import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Index({ projects }) {
    const router = useRouter();
    const onDeletePressed = (id) => {
        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/projects/${id}`).then(res => {
                console.log(res);
                if (res.data.statusCode === 200) {
                    router.push(`/admin/projects`);
                } else {
                    alert('Ошибка');
                }
            }).catch(function (error) {
                alert('Ошибка', error);
            })
        }
    }

    return (
        <AdminLayer>
            <Table
                title={'Все проекты'}
                data={projects}
                editable
                linkParam={'projects'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/projects');

    const { data } = await res.json();

    return { projects: data };
}