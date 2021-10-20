
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

export default function ProjectScreen(props) {
    const { data } = props;
    const router = useRouter();
    const [headData, setHeadData] = useState('');

    // post abilities
    const [abilities, setAbilities] = useState([]);
    const [chosenAbility, setChosenAbility] = useState();
    // post title
    const [title, setTitle] = useState('');
    // post description
    const [desc, setDesc] = useState('');
    // post socials
    const [socials, setSocials] = useState([]);
    const [chosenSocials, setChosenSocials] = useState();
    // post conclusion
    const [final, setFinal] = useState('');

    const [imageOne, setImageOne] = useState();
    const [imageTwo, setImageTwo] = useState();
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

        getData('headings', setAbilities);
        getData('socials', setSocials);

        if (data) {
            setHeadData('Изменение данных проекта');
            setChosenAbility(data.type);
            setTitle(data.title);
            setDesc(data.description);
            setFinal(data.conclusion);
            setChosenSocials(data.socials);
            setImageOne(data.imageOne);
            setImageTwo(data.imageTwo);
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
        if (data) {
            if (
                chosenAbility && title && desc &&
                final && date && imageOne && imageTwo &&
                chosenSocials.length > 0
            ) {
                collectAllData();
            }
            else {
                alert('Заполните все поля!')
            }
        } else {
            if (chosenAbility && title && desc &&
                final && chosenSocials.length > 0 &&
                imageOne && imageTwo && date
            ) {
                collectAllData();
            }
            else {
                alert('Заполните все поля!')
            }
        }

    }

    const collectAllData = () => {
        const formData = new FormData();
        formData.append('type', chosenAbility);
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('conclusion', final);
        formData.append('socials', chosenSocials);
        formData.append('imageOne', imageOne);
        formData.append('imageTwo', imageTwo);
        formData.append('url', url);
        formData.append('onMain', onMain);
        formData.append('date', date);
        formData.append('postType', 'projects');

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
            axios.post(`${process.env.URL_BASE}/api/projects`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/projects`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/projects/${data._id}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/projects`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <Container>
            <form onSubmit={checkAllData}>
                <span className='title'>
                    {headData}
                </span>

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

                <TextEditor
                    title='Введите описание'
                    text={desc}
                    setText={setDesc}
                />

                <ImageImporter
                    name='imageOne'
                    title='Загрузите обложку'
                    folder='projects'
                    content={imageOne}
                    setContent={setImageOne}
                />

                <ImageImporter
                    name='imageTwo'
                    title='Загрузите фотографию'
                    folder='projects'
                    content={imageTwo}
                    setContent={setImageTwo}
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