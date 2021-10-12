import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Input from "../globals/input";
import Button from '../../components/button';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

const Screen_Style = styled.div`
    display: grid;
    width: 100%;
    max-width: 1000px;
    gap: 30px;
    border-radius: 40px;
    border: 1px solid var(--black20);
    padding: 50px;

    .title {
        font-size: 24px;
        font-family: bold;
        color: var(--black100)
    }

    .bottom {
        display: grid;
        justify-content: center;
    }

    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

const Error_style = styled.div`
    display: flex;
    flex: 1;
    height: 70vh;
    justify-content: center;
    align-items: center;

`

export default function AbilityScreen(props) {
    const { data } = props;
    const router = useRouter();
    const { type } = router.query;
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [method, setMethod] = useState();
    const { id } = router.query;


    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDesc(data.description);
            setMethod('PUT');
        } else {
            setMethod('POST');
        }
    }, [])

    const sendPress = async () => {
        if (title && desc) {
            const body = {
                title: title,
                description: desc,
            };
            let res;
            res = await fetch(
                `http://localhost:3000/api/${type === 'abilities' ? 'abilities' : 'socials'}${method === 'PUT' ? `/${id}` : ''}`,
                {
                    method: method,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const data = await res.json();

            if (data.statusCode === 200) {
                Router.push('/admin/others');
            } else {
                alert('Непредвиденная ошибка');
            }

        } else {
            alert('Заполните все поля!') //! Change it by modal
        }
    }

    return (
        <Screen_Style>
            <span className='title'>
                {`Добавление ${type === 'abilities' ? 'способности' : 'соц. сети'}`}
            </span>
            <Input
                title={`Введите название ${type === 'abilities' ? 'способности' : 'соц. сети'}`}
                text={title}
                setText={setTitle}
            />
            <Input
                title={type === 'abilities' ? 'Введите описание способности' : 'Введите ссылку'}
                text={desc}
                setText={setDesc}
            />
            <div className='bottom'>
                <Button text='Отправить' onClick={sendPress} />
            </div>
        </Screen_Style>
    )
}
