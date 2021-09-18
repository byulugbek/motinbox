import { useState } from 'react';
import styled from "styled-components";
import Button from '../../components/button';
import Input from "../globals/input";
import ImageImporter from '../globals/imageImporter';

const Team_style = styled.div`
    display: grid;
    gap: 30px;
    padding: 50px;
    border: 1px solid var(--black20);
    border-radius: 40px;

    .title {
        font-size: 24px;
        font-family: bold;
        color: var(--black100);
    }


    .bottom {
        display: grid;
        justify-content: center;
    }


    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

export default function TeamScreen() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState();
    const [link, setLink] = useState('');
    return (
        <Team_style>
            <span className='title'>
                Добавление участника
            </span>

            <Input
                title='Ввдите имя'
                setText={setName}
            />

            <Input
                title='Введите должность'
                setText={setPosition}
            />

            <ImageImporter
                title='Загрузите портрет'
                setContent={setImage}
            />

            <Input
                title='Введите ссылку на инстаграмм'
                setText={setLink}
            />

            <div className='bottom'>
                <Button
                    text='Отправить'
                />
            </div>
        </Team_style>
    )
}
