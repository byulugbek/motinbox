import styled from "styled-components";
import Link from "next/link";
import { Edit, Plus, Trash } from '../../components/icons';
import Button from '../../components/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthCheck } from '../../utils/functions/authCheck';

const VideoBlock_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 30px;
    padding: 50px;
    width: 100%;
    max-width: 1000px;
    border-radius: 40px;
    border: 1px solid var(--black20);

    .title {
        height: 40px;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        align-items: center;
        button {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .line{
        width:100%;
        height: 0.5px;
        border-width: 0;
        background-color: var(--black20);
    }

    .item {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: auto;
        grid-template-areas: "title descript";
        gap: 20px;
        width: 100%;
        margin-bottom: 30px;
        h1{
            grid-area: title;
        }
        .descript{
            height:100%;
            grid-area: descript;
            display: grid;
            gap: 20px;
            justify-content: space-between;
            grid-auto-flow: column;
            grid-template-columns: 1fr auto auto;
            grid-template-areas: 
                "text button1 button2";

            .text {
                grid-area: text;
            }
            .button1 {
                grid-area: button1; 
            }
            .button2 {
                grid-area: button2; 
            }
        }
        @media only screen and (max-width: 700px) {
            grid-template-columns: 1fr;
            grid-auto-flow: row;
            grid-template-rows: none;
            grid-template-areas: none;
            h1{
                grid-area: auto;
            }
            .descript{
                height:100%;
                grid-area: auto;
                grid-auto-flow: row;
                grid-template-areas: 
                "text text"
                "button1 button2";
            }
        }
    }
`

export default function VideoBlock(props) {
    const router = useRouter();
    const {
        title,
        data
    } = props;
    const [token, setToken] = useState();

    useEffect(() => {
        const isLoginned = AuthCheck();
        if (isLoginned === 'error') {
            router.replace('/admin/login');
        } else {
            setToken(isLoginned)
        }
    }, [])

    const onDelete = () => {
        const config = {
            headers: {
                'authorization': token
            },
        }
        if (confirm('Вы уверены что хотите удалить?')) {
            axios.delete(`api/video/${data._id}`, config).then(res => {
                if (res.data.statusCode === 200) {
                    router.push(`/admin/team`);
                } else {
                    alert('Ошибка: Что-то пошло не так');
                }
            }).catch(function (error) {
                alert(`Ошибка: ${error.response.data.message}`);
            })
        }
    }

    return (
        <VideoBlock_style>
            <div className='title'>
                <h2>
                    {title}
                </h2>
                {!data &&
                    <Link href={`/admin/team/video`}>
                        <button aria-label="ADD_NEW_VIDEO">
                            <Plus fill={'#000'} />
                        </button>
                    </Link>
                }
            </div>
            <hr className='line' />
            {data &&
                <>
                    <div className='item'>
                        <h2>
                            {data.title}
                        </h2>
                        <div className='descript'>
                            <p>
                                {data.description}
                            </p>
                            <Link href={`/admin/team/video`}>
                                <a className='button1' aria-label="EDIT_VIDEO">
                                    <Button
                                        text={<Edit fill={'#fff'} />}
                                    />
                                </a>
                            </Link>
                            <Button
                                aria-label="DELETE_VIDEO"
                                className='button2'
                                text={<Trash />}
                                onClick={() => onDelete && onDelete(data._id)}
                            />
                        </div>
                    </div>
                    <hr className='line' />
                </>
            }
        </VideoBlock_style>
    )
}
