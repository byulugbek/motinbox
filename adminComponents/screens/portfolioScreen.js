
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../globals/input';
import TextEditor from '../globals/textEditor';
import Selector from '../globals/selector';
import Button from '../../components/button';
import { GetSelectorData } from '../../utils/functions/getData';
import axios from 'axios';
import { useRouter } from 'next/router';
import ImageImporter from '../globals/imageImporter';
import Switcher from '../globals/switcher';
import CustomDatePicker from '../globals/customDatePicker';
import { AuthCheck } from '../../utils/functions/authCheck';

const Container = styled.div`
    display: grid;
    width: 100%;
    max-width: 1000px;
    padding: 50px;
    border: 1px solid var(--black20);
    border-radius: 40px;
    
    form {
        display: grid;
        gap: 30px;
        grid-auto-flow: row;
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

export default function PortfolioScreen(props) {
    const { data } = props;
    const router = useRouter();
    const [headData, setHeadData] = useState('');

    // post abilities
    const [abilities, setAbilities] = useState([]);
    const [chosenAbility, setChosenAbility] = useState();
    // post title
    const [title, setTitle] = useState('');
    // post sort description
    const [shortDesc, setShortDesc] = useState('');
    // post description
    const [desc, setDesc] = useState('');
    // post socials
    const [socials, setSocials] = useState([]);
    const [chosenSocials, setChosenSocials] = useState([]);
    // post conclusion
    const [final, setFinal] = useState('');

    const [imageOne, setImageOne] = useState();
    const [imageTwo, setImageTwo] = useState();
    const [imageThree, setImageThree] = useState();
    const [imageFour, setImageFour] = useState();
    const [url, setUrl] = useState('');
    const [onMain, setOnMain] = useState(false);
    const [date, setDate] = useState();
    const [token, setToken] = useState();

    // get data (abilities/socials)
    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned);
        }

        getData('abilities', setAbilities);
        getData('socials', setSocials);

        if (data) {
            setHeadData('Изменение данных проекта');
            setChosenAbility(data.type);
            setTitle(data.title);
            setShortDesc(data.shortDesc);
            setDesc(data.description);
            setFinal(data.conclusion);
            setChosenSocials(data.socials);
            setImageOne(data.imageOne);
            setImageTwo(data.imageTwo);
            setImageThree(data.imageThree);
            setImageFour(data.imageFour);
            setUrl(data.url);
            setOnMain(data.onMain);
            setDate(new Date(data.date));
        } else {
            setHeadData('Добавление проекта');
        }
    }, [])

    /* Get data from server: abilities and socials*/
    const getData = (type, setter) => {
        GetSelectorData(type).then((res) => {
            if (res !== 'error') {
                const newArrayOfObj = res.data.map(({
                    title: value,
                    ...rest
                }) => ({
                    value,
                    label: value,
                    ...rest
                }));
                setter(newArrayOfObj);
            }
        });
    }

    const checkAllData = (e) => {
        e.preventDefault();
        if (
            chosenAbility && title && desc &&
            shortDesc && final && date && imageOne &&
            imageTwo && imageThree && imageFour &&
            chosenSocials.length > 0 && url && date
        ) {
            collectAllData();
        } else {
            alert('Заполните все поля!');
        }
    }

    const collectAllData = () => {
        const formData = new FormData();
        formData.append('type', chosenAbility);
        formData.append('title', title);
        formData.append('shortDesc', shortDesc)
        formData.append('description', desc);
        formData.append('conclusion', final);
        formData.append('socials', chosenSocials);
        formData.append('imageOne', imageOne);
        formData.append('imageTwo', imageTwo);
        formData.append('imageThree', imageThree);
        formData.append('imageFour', imageFour);
        formData.append('url', url);
        formData.append('onMain', onMain);
        formData.append('date', date);
        formData.append('postType', 'portfolio');

        sendData(formData);
    }

    const sendData = (formData) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': token
            },
        }
        if (!data) {
            axios.post(`${process.env.URL_BASE}/api/portfolio`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/portfolio`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/portfolio/${data._id}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/portfolio`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(error => {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <Container>
            <form onSubmit={checkAllData}>
                <h2>
                    {headData}
                </h2>

                <Selector
                    title='Выберите тип'
                    data={abilities}
                    choosenData={chosenAbility}
                    setChoosenData={setChosenAbility}
                />

                <Input
                    title='Введите заглавление'
                    text={title}
                    setText={setTitle}
                />

                <Input
                    title='Введите краткое описание'
                    text={shortDesc}
                    setText={setShortDesc}
                />

                <TextEditor
                    title='Введите описание'
                    text={desc}
                    setText={setDesc}
                />

                <ImageImporter
                    name='cover'
                    title='Загрузите первое фото'
                    folder='portfolio'
                    content={imageOne}
                    setContent={setImageOne}
                />

                <ImageImporter
                    name='image'
                    title='Загрузите второе фото'
                    folder='portfolio'
                    content={imageTwo}
                    setContent={setImageTwo}
                />

                <ImageImporter
                    name='image'
                    title='Загрузите третье фото'
                    folder='portfolio'
                    content={imageThree}
                    setContent={setImageThree}
                />

                <ImageImporter
                    name='image'
                    title='Загрузите четвертое фото'
                    folder='portfolio'
                    content={imageFour}
                    setContent={setImageFour}
                />

                <Input
                    title='Введите ссылку на вебсайт'
                    text={url}
                    setText={setUrl}
                />

                <TextEditor
                    title='Введите заключение'
                    text={final}
                    setText={setFinal}
                />

                <Selector
                    title='Выберите соцсеть'
                    data={socials}
                    choosenData={chosenSocials}
                    setChoosenData={setChosenSocials}
                    isMulti={true}
                />

                <Switcher
                    state={onMain}
                    setState={setOnMain}
                />

                <CustomDatePicker date={date} setDate={setDate} />

                <div className='bottom'>
                    <Button text='Отправить' />
                </div>
            </form>
        </Container>
    )
}