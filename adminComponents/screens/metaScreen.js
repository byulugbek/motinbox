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
            alert('?????????????????? ?????? ????????!')
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
                    alert('????????????: ??????-???? ?????????? ???? ??????');
                }
            }).catch(function (error) {
                setDisabled(false);
                alert(`????????????: ${error.response.data.message}`);
            })
        } else {
            axios.put(`${process.env.URL_BASE}/api/meta/${data._id}`, body, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin`);
                } else {
                    setDisabled(false);
                    alert('????????????: ??????-???? ?????????? ???? ??????');
                }
            }).catch(function (error) {
                setDisabled(false);
                alert(`????????????: ${error.response.data.message}`);
            })
        }
    }

    const deleteItem = () => {
        if (data) {
            if (confirm('???? ?????????????? ?????? ???????????? ???????????????')) {
                axios.delete(`${process.env.URL_BASE}/api/meta/${data._id}`, config).then(res => {
                    if (res.data.statusCode === 200) {
                        router.push(`/admin`);
                    } else {
                        setDisabled(false);
                        alert('????????????: ??????-???? ?????????? ???? ??????');
                    }
                }).catch(function (error) {
                    setDisabled(false);
                    alert(`????????????: ${error.response.data.message}`);
                })
            }
        }
    }

    return (
        <Screen_Style>
            <div className='titleCont'>
                <h2 className='title'>
                    {`???????? ???????????? ?????? ????????????????`}
                </h2>
                {data && <Button text={<Trash />} onClick={deleteItem} />}
            </div>
            <div className="block">
                <h2>?????????????? ????????????????</h2>
                <LittleInput
                    title='?????????????? ????????????????'
                    text={mainTitle}
                    setText={setMainTitle}
                />
                <Input
                    title='?????????????? ????????????????'
                    text={mainDesc}
                    setText={setMainDesc}
                />
            </div>
            <div className="block">
                <h2>?? ??????</h2>
                <LittleInput
                    title='?????????????? ????????????????'
                    text={aboutTitle}
                    setText={setAboutTitle}
                />
                <Input
                    title='?????????????? ????????????????'
                    text={aboutDesc}
                    setText={setAboutDesc}
                />
            </div>

            <div className="block">
                <h2>??????????????</h2>
                <LittleInput
                    title='?????????????? ????????????????'
                    text={projectsTitle}
                    setText={setProjectsTitle}
                />
                <Input
                    title='?????????????? ????????????????'
                    text={projectsDesc}
                    setText={setProjectsDesc}
                />
            </div>

            <div className="block">
                <h2>??????????????????</h2>
                <LittleInput
                    title='?????????????? ????????????????'
                    text={portfolioTitle}
                    setText={setPortfolioTitle}
                />
                <Input
                    title='?????????????? ????????????????'
                    text={portfolioDesc}
                    setText={setPortfolioDesc}
                />
            </div>

            <div className="block">
                <h2>???????? ?? ????????</h2>
                <LittleInput
                    title='?????????????? ????????????????'
                    text={contactTitle}
                    setText={setContactTitle}
                />
                <Input
                    title='?????????????? ????????????????'
                    text={contactDesc}
                    setText={setContactDesc}
                />
            </div>

            <div className='bottom'>
                <Button text="??????????????????" onClick={checkAllData} />
            </div>
        </Screen_Style>
    )
}