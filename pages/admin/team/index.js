import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import VideoBlock from '../../../adminComponents/globals/videoBlock';

const video_data = {
    _id: 0,
    name: 'Преврвщаем\nСмелые идеи в\nЧистый дизайн',
    description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором. Мы верим, что компания реализует свой потенциал, если каждый человек в компании реализует свой потенциал. Свой талант. Творческий, стратегический, финансовый, управленческий, предпринимательский, любой.'
}

export default function Index({ data }) {
    const router = useRouter();
    const [team, setTeam] = useState([]);

    useEffect(() => {
        if (data.length <= 0) return;

        const newArrayOfObj = data.map(({
            name: title,
            position: description,
            ...rest
        }) => ({
            title,
            description,
            ...rest
        }));
        setTeam(newArrayOfObj);
    }, [data])

    const onDeletePressed = (id) => {
        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/team/${id}`).then(res => {
                console.log(res);
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
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
            <VideoBlock
                title={'Видео блок'}
                data={video_data}
            />
            <Table
                title={'Вся команда'}
                data={team}
                editable
                linkParam={'team'}
                onDelete={onDeletePressed}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/team');

    const { data } = await res.json();

    return { data };
}