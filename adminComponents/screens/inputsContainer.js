
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../globals/input';
import TextEditor from '../globals/textEditor';
import Selector from '../globals/selector';
import Button from '../../components/button';
import { GetSelectorData } from '../../utils/functions/getData';
import axios from 'axios';
import { useRouter } from 'next/router';


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

    input {
        color: var(--black50);
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
        width: fit-content;
    }
    input[type=file]::file-selector-button {
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        padding: 0 20px;
        outline: none;
        background-color: var(--black100);
        color: white;
        border: none;
        cursor: pointer;
        transition: 0.3s;
    }
    input[type=file]::file-selector-button:hover {
        background-color: var(--black50);
    }

    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`

const ImageImport_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 5px;
    overflow: hidden;
    span {
        color: var(--black50);
    }
    input {
        color: var(--black50);
        width: fit-content;
    }
    input[type=file]::file-selector-button {
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        padding: 0 20px;
        outline: none;
        background-color: var(--black100);
        color: white;
        border: none;
    }
`

export default function InputsContainer(props) {
    const { header, data } = props;
    const router = useRouter();
    const projType = router.asPath.split('/');

    // post abilities
    const [abilities, setAbilities] = useState([]);
    const [chosenAbility, setChosenAbility] = useState();
    // post title
    const [title, setTitle] = useState('');
    // post description
    const [desc, setDesc] = useState('');
    // post images
    const imagesRef = useRef(null);
    // post socials
    const [socials, setSocials] = useState([]);
    const [chosenSocials, setChosenSocials] = useState();
    // post conclusion
    const [final, setFinal] = useState('');

    // get data (abilities/socials)
    useEffect(() => {
        getData('abilities', setAbilities);
        getData('socials', setSocials);

        if (data) {
            setChosenAbility(data.type);
            setTitle(data.title);
            setDesc(data.description);
            setFinal(data.conclusion);
            setChosenSocials(data.socials);
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
                final && chosenSocials.length > 0
            ) {
                collectAllData();
            }
            else {
                alert('Заполните все поля!')
            }
        } else {
            if (chosenAbility && title && desc &&
                final && chosenSocials.length > 0 &&
                imagesRef.current.files.length > 0
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
        Array.from(imagesRef.current.files).forEach((file) => {
            formData.append(imagesRef.current.name, file);
        });

        sendData(formData);
    }

    const sendData = (formData) => {
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        }
        if (!data) {
            axios.post(`api/${projType[2]}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/${projType[2]}`);
                } else {
                    alert('Ошибка')
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            axios.put(`api/${projType[2]}/${data._id}`, formData, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/${projType[2]}`);
                } else {
                    alert('Ошибка')
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }

    return (
        <Container>
            <form onSubmit={checkAllData}>
                <span className='title'>
                    {header}
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
                <ImageImport_style>
                    <span>Загрузите фотографии:</span>
                    <input
                        ref={imagesRef}
                        type='file'
                        name={'images'}
                        multiple
                        accept='image/jpeg, image/png, image/webp'
                    />
                </ImageImport_style>

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

                <div className='bottom'>
                    <Button text='Отправить' />
                </div>
            </form>
        </Container>
    )
}