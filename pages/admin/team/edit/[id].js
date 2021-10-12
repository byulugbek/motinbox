import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayer from "../../../../adminComponents/adminLayer";
import TeamScreen from '../../../../adminComponents/screens/teamScreen';

export default function Id({ data, statusCode }) {
    const router = useRouter();
    useEffect(() => {
        if (statusCode === 400) {
            alert('Произошла ошибка! Нет поста с таким ID');
            router.push('/admin/projects');
        }
    }, [])
    return (
        <AdminLayer>
            <TeamScreen data={data} />
        </AdminLayer>
    )
}

Id.getInitialProps = async (ctx) => {
    const { id } = ctx.query;

    const res = await fetch(`http://localhost:3000/api/team/${id}`);

    const { data, statusCode } = await res.json();

    return { data, statusCode };
}