import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayer from '../../../adminComponents/adminLayer';
import Table from '../../../adminComponents/Table';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthCheck } from '../../../utils/functions/authCheck';


export default function Index({ abilities, headings, socials }) {
    const router = useRouter();
    const [token, setToken] = useState();

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned);
        }
    }, [])


    const abilityDelete = async (id) => {
        deleteMethood('abilities', id);
    }
    const headingDelete = async (id) => {
        deleteMethood('headings', id);
    }
    const socialDelete = async (id) => {
        deleteMethood('socials', id);
    }

    const deleteMethood = async (type, id) => {
        const config = {
            headers: { 'Authorization': token }
        }
        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/${type}/${id}`, config).then(res => {
                console.log(res);
                if (res.data.statusCode === 200) {
                    router.push(`/admin/others`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <AdminLayer>
            <Head>
                <title>MotionBox | Другое</title>
            </Head>

            <Table
                title={'Все способности'}
                data={abilities}
                editable
                linkParam={'others/abilities'}
                onDelete={abilityDelete}
            />
            <Table
                title={'Все заглавия проектов'}
                data={headings}
                editable
                linkParam={'others/headings'}
                onDelete={headingDelete}
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

    const resHeading = await fetch('http://localhost:3000/api/headings');

    const dataHeading = await resHeading.json();

    const resSocial = await fetch('http://localhost:3000/api/socials');

    const dataSocial = await resSocial.json();

    return { abilities: dataAbility.data, headings: dataHeading.data, socials: dataSocial.data };
}