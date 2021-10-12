import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';


export default function Index({ abilities, socials }) {
    const router = useRouter();

    const abilityDelete = async (id) => {
        if (confirm('Вы уверены что хотите удалить?')) {
            const res = await fetch(`http://localhost:3000/api/abilities/${id}`, {
                method: 'DELETE'
            })

            const data = await res.json();

            if (data.statusCode === 200) {
                router.push('/admin/others');
            }
        }
    }
    const socialDelete = async (id, type) => {
        if (confirm('Вы уверены что хотите удалить?')) {
            const res = await fetch(`http://localhost:3000/api/socials/${id}`, {
                method: 'DELETE'
            })

            const data = await res.json();

            if (data.statusCode === 200) {
                router.push('/admin/others');
            }
        }
    }
    return (
        <AdminLayer>
            <Table
                title={'Все способности'}
                data={abilities}
                editable
                linkParam={'others/abilities'}
                onDelete={abilityDelete}
            />
            <Table
                title={'Все социальные сети'}
                data={socials}
                editable
                linkParam={'others/socials'}
                onDelete={socialDelete}
            />
        </AdminLayer>
    )
}

Index.getInitialProps = async () => {
    const resAbility = await fetch('http://localhost:3000/api/abilities');

    const dataAbility = await resAbility.json();

    const resSocial = await fetch('http://localhost:3000/api/socials');

    const dataSocial = await resSocial.json();

    return { abilities: dataAbility.data, socials: dataSocial.data };
}