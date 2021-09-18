
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ImageImporter from '../globals/imageImporter';
import Input from '../globals/input';
import TextEditor from '../globals/textEditor';
import Selector from '../globals/selector';
import Button from '../../components/button';

const Container = styled.div`
    display: grid;
    padding: 50px;
    border: 1px solid var(--black20);
    border-radius: 40px;
    gap: 30px;
    grid-auto-flow: row;

    .title {
        font-size: 24px;
        font-family: bold;
    }
    
    .bottom {
        width: 100%;
    display: grid;
    justify-content: center;
    }

    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

const types = [
    { value: 'mobile_app', label: 'Мобильное приложение' },
    { value: 'web_app', label: 'Web приложение' },
    { value: 'web_design', label: 'Web дизайн' },
]

const linksdata = [
    { value: 'inst', label: 'Instagram' },
    { value: 'fb', label: 'Facebook' },
    { value: 'tweet', label: 'Tweeter' },
    { value: 'linked', label: 'LinkedIn' }
]

export default function InputsContainer(props) {
    const { header } = props;
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [imageOne, setImageOne] = useState();
    const [imageTwo, setImageTwo] = useState();
    const [imageThree, setImageThree] = useState();
    const [mediaLinks, setMediaLinks] = useState();

    return (
        <Container>
            <span className='title'>
                {header}
            </span>

            <Selector
                title='Выберите тип'
                data={types}
                choosenData={setMediaLinks}
            />

            <Input
                title='Введите заглавление'
                setText={setTitle}
            />

            <TextEditor
                title='Введите описание'
                setText={setDesc}
            />

            <ImageImporter
                title='Загрузите фото: 1'
                setContent={setImageOne}
            />

            <ImageImporter
                title='Загрузите фото: 2'
                setContent={setImageTwo}
            />

            <ImageImporter
                title='Загрузите фото: 3'
                setContent={setImageThree}
            />

            <TextEditor
                title='Введите заключение'
                setText={setDesc}
            />

            <Selector
                title='Выберите соцсеть'
                data={linksdata}
                choosenData={setMediaLinks}
                isMulti
            />

            <div className='bottom'>
                <Button text='Отправить' />
            </div>
        </Container>
    )
}