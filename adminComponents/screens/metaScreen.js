import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Input from '../globals/input';
import { AuthCheck } from '../../utils/functions/authCheck';
import LittleInput from '../globals/littleInput';
import Button from '../../components/button';
import axios from 'axios';
import { Trash } from '../../components/icons';

const Screen_Style = styled.div`
    display: grid;
    width: 100%;
    max-width: 1000px;
    gap: 30px;
    border-radius: 40px;
    border: 1px solid var(--black20);
    padding: 50px;
    .titleCont {
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;   
    }

    .block {
        display: grid;
        gap: 15px;
        grid-auto-flow: row;
    }
    .bottom {
        display: grid;
        justify-content: center;
    }

    @media only screen and (max-width: 500px) {
        padding: 20px;
    }
`;

export default function MetaScreen(props) {
    const { data } = props;
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();
    const [token, setToken] = useState();
    const [mainTitle, setMainTitle] = useState();
    const [mainDesc, setMainDesc] = useState();
    const [aboutTitle, setAboutTitle] = useState();
    const [aboutDesc, setAboutDesc] = useState();
    const [projectsTitle, setProjectsTitle] = useState();
    const [projectsDesc, setProjectsDesc] = useState();
    const [portfolioTitle, setPortfolioTitle] = useState();
    const [portfolioDesc, setPortfolioDesc] = useState();
    const [contactTitle, setContactTitle] = useState();
    const [contactDesc, setContactDesc] = useState();

    const config = {
        headers: {
            'authorization': token
        },
    }

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
            return;
        } else {
            setToken(isLoginned);
        }
        if (data) {
            setMainTitle(data.mainTitle);
            setMainDesc(data.mainDesc);
            setAboutTitle(data.aboutTitle);
            setAboutDesc(data.aboutDesc);
            setProjectsTitle(data.projectsTitle);
            setProjectsDesc(data.projectsDesc);
            setPortfolioTitle(data.portfolioTitle);
            setPortfolioDesc(data.portfolioDesc);
            setContactTitle(data.contactTitle);
            setContactDesc(data.contactDesc);
        } else { }
    }, [])

    const checkAllData = () => {
        if (disabled) return;

        if (
            mainTitle && mainDesc &&
            aboutTitle && aboutDesc &&
            projectsTitle && projectsDesc &&
            portfolioTitle && portfolioDesc &&
            contactTitle && contactDesc
        ) {
            sendData();
        } else {
            alert('Заполните все поля!')
        }
    }

    const sendData = () => {
        setDisabled(true);
        const body = {
            mainTitle, mainDesc, aboutTitle, aboutDesc,
            projectsTitle, projectsDesc, portfolioTitle,
            portfolioDesc, contactTitle, contactDesc
        }

        if (!data) {
            axios.post(`${process.env.URL_BASE}/api/meta`, body, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin`);
                } else {
                    setDisabled(false);
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                setDisabled(false);
                alert(`Ошибка: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/meta/${data._id}`, body, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin`);
                } else {
                    setDisabled(false);
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                setDisabled(false);
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    const deleteItem = () => {
        if (data) {
            if (confirm('Вы уверены что хотите удалить?')) {
                axios.delete(`${process.env.URL_BASE}/api/meta/${data._id}`, config).then(res => {
                    if (res.data.statusCode === 200) {
                        router.push(`/admin`);
                    } else {
                        setDisabled(false);
                        alert('Ошибка: Что-то пошло не так');
                    }
                }).catch(function (error) {
                    setDisabled(false);
                    alert(`Ошибка: ${error.response.data.message}`);
                })
            }
        }
    }

    return (
        <Screen_Style>
            <div className='titleCont'>
                <h2 className='title'>
                    {`Мета данные для странниц`}
                </h2>
                {data && <Button text={<Trash />} onClick={deleteItem} />}
            </div>
            <div className="block">
                <h2>Главная страница</h2>
                <LittleInput
                    title='Введите заглавие'
                    text={mainTitle}
                    setText={setMainTitle}
                />
                <Input
                    title='Введите описание'
                    text={mainDesc}
                    setText={setMainDesc}
                />
            </div>
            <div className="block">
                <h2>О нас</h2>
                <LittleInput
                    title='Введите заглавие'
                    text={aboutTitle}
                    setText={setAboutTitle}
                />
                <Input
                    title='Введите описание'
                    text={aboutDesc}
                    setText={setAboutDesc}
                />
            </div>

            <div className="block">
                <h2>Проекты</h2>
                <LittleInput
                    title='Введите заглавие'
                    text={projectsTitle}
                    setText={setProjectsTitle}
                />
                <Input
                    title='Введите описание'
                    text={projectsDesc}
                    setText={setProjectsDesc}
                />
            </div>

            <div className="block">
                <h2>Портфолио</h2>
                <LittleInput
                    title='Введите заглавие'
                    text={portfolioTitle}
                    setText={setPortfolioTitle}
                />
                <Input
                    title='Введите описание'
                    text={portfolioDesc}
                    setText={setPortfolioDesc}
                />
            </div>

            <div className="block">
                <h2>Быть с нами</h2>
                <LittleInput
                    title='Введите заглавие'
                    text={contactTitle}
                    setText={setContactTitle}
                />
                <Input
                    title='Введите описание'
                    text={contactDesc}
                    setText={setContactDesc}
                />
            </div>

            <div className='bottom'>
                <Button text="Отправить" onClick={checkAllData} />
            </div>
        </Screen_Style>
    )
}