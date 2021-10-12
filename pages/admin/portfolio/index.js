import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Index({ portfolio }) {
    const router = useRouter();
    const onDeletePressed = (id) => {
        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/portfolio/${id}`).then(res => {
                console.log(res);
                if (res.data.statusCode === 200) {
                    router.push(`/admin/portfolio`);
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
                title={'Все портфолио'}
                data={portfolio}
                editable
                linkParam={'portfolio'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/portfolio');

    const { data } = await res.json();

    return { portfolio: data };
}