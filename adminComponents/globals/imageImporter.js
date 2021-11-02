import { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { Trash } from '../../components/icons';
import Image from 'next/image';

const ImageImporter_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 5px;
    
    p {
        color: var(--black50);
    }
    
    div {
        justify-content: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        border: 1px solid var(--black10);
        border-radius: 15px;
        overflow: hidden;
        position: relative;

        span {
            color: var(--black20);
            user-select: none;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        button {
            position: absolute;
            width: 100%;
            height: 100%;
            color: red;
            z-index: 1;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s;
            backdrop-filter: blur(30px);
            :hover {
                opacity: 1;
            }

            div {
                background-color: black;
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
        }
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


export default function ImageImporter(props) {
    const { title, folder, content, setContent } = props;
    const [url, setUrl] = useState();
    const [preImage, setPreImage] = useState();
    const ref = useRef();

    useEffect(() => {
        if (url) {
            setPreImage(null);
            return;
        }
        if (content) {
            setPreImage(content);
        }
    }, [content])

    const onChange = (e) => {
        if (e.target.files) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]));
        } else {
            setContent(null);
            setUrl(null);
        }
    }

    const clear = () => {
        setContent(null);
        setPreImage(null);
        setUrl(null);
        ref.current.value = null;
    }

    return (
        <ImageImporter_style>
            <p>{title}</p>
            <div>
                {preImage ?
                    <>
                        <Image src={`/uploads/${folder}/${preImage}`} layout='fill' />
                        <button onClick={clear}>
                            <div>
                                <Trash />
                            </div>
                        </button>
                    </>
                    :
                    <>

                        {!url ?
                            <span>Нет фото</span>
                            :
                            <>
                                <img src='/Team.png' src={url} />
                                <button onClick={clear}>
                                    <div>
                                        <Trash />
                                    </div>
                                </button>
                            </>
                        }
                    </>
                }
            </div>
            <input
                ref={ref}
                type='file'
                onChange={item => onChange(item)}
                accept='image/*'
            />
        </ImageImporter_style>
    )
}
