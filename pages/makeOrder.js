import { useEffect, useState } from "react";
import Head from 'next/head';
import styled from "styled-components";
import axios from 'axios';
import { useRouter } from 'next/router';
import Button from "../components/button";
import { Plus } from "../components/icons";
import MainLayer from '../components/mainLayer';
import ModalLayer from "../components/modalLayer";
import Modal from "../components/modal";
import dbConnect from "../utils/dbConnect";
import Abilities from "../models/Abilities";

const FormWrap = styled.form`
    display: grid;
    gap: 30px;
    grid-auto-flow: row;
    justify-self: center;
    justify-content: stretch; 
    justify-items: center;
    
    padding: 50px;
    width: 100%;
    max-width: 1000px;
    border-radius: 40px;
    border: 0.5px solid var(--black20);
    .theme{
        width: 100%;
    }
    .input{
        justify-self: stretch;
        display: grid;
        gap: 5px;
        label{
        color: var(--black50);    
        }
        textarea{
            display: grid;
            padding: 10px;
            height: 200px;
            border-radius: 10px;
            border: 0;
            background-color: var(--black05);
            width: 100%;
            resize: none;
            :focus{
                outline: 0;
            }
        }
        .selected{
            cursor: default;
            height: fit-content;
            min-height: 50px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            border-radius: 10px;
            border: 0;
            background-color: var(--black05);
            padding: 10px;
            
            .placeholder {
                color: var(--black50);
            }
        }
        input{
            padding: 10px;
            height: 50px;
            border-radius: 10px;
            border: 0;
            background-color: var(--black05);
            :focus{
                outline: 0;
            }
            :-internal-autofill-selected {
                appearance: menulist-button;
                background-color: rgb(232, 240, 254) !important;
                background-image: none !important;
                color: -internal-light-dark(black, white) !important;
            }
        }
    }
`
const Abilities_style = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    p {
        color: var(--black50);
        line-height: 30px;
    }
`
const Item = styled.div`
    width: fit-content;
    height: 30px;
    padding: 0 10px;
    border: 1px solid var(--black100);
    border-radius: 5px;
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    gap: 12px;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.selected ? 'var(--black100)' : 'var(--white100)'};
    user-select: none;
    
    p {
        color: ${props => props.selected ? 'var(--white100)' : 'var(--black100) !important'};
    }
    
    div {
        width: 16px;
        height: 16px;
        transform: ${props => props.selected ? 'rotate(45deg)' : 'rotate(0deg)'};
        svg {
            fill: var(--white100);
        }
    }
`

let arrayAdd = [];
export default function MakeOrder({ data }) {
    const router = useRouter();

    const [isModal, setModal] = useState(false);

    const [abilities, setAbilities] = useState([]);
    const [selected, setSelected] = useState([]);
    const [organization, setOrganization] = useState();
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [note, setNote] = useState();
    const [phone, setPhone] = useState();

    useEffect(() => {
        setAbilities(data);
    }, [])

    const onClick = (id) => {
        const res = data.find(i => i._id === id);
        arrayAdd.push(res);
        setSelected(arrayAdd);

        const afterClick = abilities.filter(i => i._id !== id);
        setAbilities(afterClick);
    }
    const deleteItem = (id) => {
        const afterClick = selected.filter(i => i._id !== id);
        setSelected(afterClick);
        arrayAdd = afterClick;

        let ability = abilities;
        const res = data.find(i => i._id === id);
        ability.push(res);
        setAbilities(ability);
    }

    const mapAbilities = abilities.map(item => {
        return (
            <div key={item._id}>
                <Item onClick={() => onClick(item._id)}>
                    <p>{item.title}</p>
                    <div><Plus fill='#000' /></div>
                </Item>
            </div>
        )
    })

    const mapSelectedAbilities = selected.map(item => {
        return (
            <div key={item._id} onClick={() => deleteItem(item._id)}>
                <Item selected >
                    <p>{item.title}</p>
                    <div><Plus fill='#000' /></div>
                </Item>
            </div>
        )
    })

    const chekAllData = async (e) => {
        e.preventDefault();
        if (selected.length > 0) {
            const body = {
                organization, name, note, selected, contact, phone
            };
            const res = await axios.post(`${process.env.URL_BASE}/api/order`, body);

            console.log(res.data);
            if (res.data.statusCode === 200) {
                setModal(true);
                setTimeout(() => {
                    router.push('/');
                    setModal(false);
                }, 4000);
            }
        } else {
            alert('Выберите услуги')
        }
    }

    return (
        <MainLayer>
            <Head>
                <title>MotionBox | Быть с нами</title>
            </Head>
            <FormWrap onSubmit={chekAllData}>
                <h2 className='theme'>Выбери нужную услугу</h2>
                <Abilities_style>
                    {abilities.length > 0 ?
                        <>{mapAbilities}</>
                        :
                        <p>Можешь написать в заметках если что ...</p>
                    }
                </Abilities_style>
                <div className='input'>
                    <label htmlFor="name">Выбранные услуги</label>
                    <div className='selected'>
                        {selected.length > 0 ?
                            <>{mapSelectedAbilities}</>
                            :
                            <p className='placeholder'>Выбранные</p>
                        }
                    </div>
                </div>
                <div className='input'>
                    <label htmlFor="name">Какая организация</label>
                    <input
                        placeholder='Например, OOO "MOTION BOX"'
                        id="organization"
                        type="text"
                        autoComplete="name"
                        onChange={(text) => setOrganization(text.target.value)}
                        required
                    />
                </div>
                <div className='input'>
                    <label htmlFor="name">Твое имя</label>
                    <input
                        placeholder='Например, Улугбек Алимов'
                        id="name"
                        type="text"
                        autoComplete="name"
                        onChange={(text) => setName(text.target.value)}
                        required
                    />
                </div>
                <div className='input'>
                    <label htmlFor="name">Твой телеграм</label>
                    <input
                        placeholder='Например, @motionbox'
                        id="contact"
                        type="text"
                        onChange={(text) => setContact(text.target.value)}
                        required
                    />
                </div>
                <div className='input'>
                    <label htmlFor="name">Твой телефон</label>
                    <input
                        placeholder='Например, +998 90 123 45 67'
                        id="phone"
                        type="text"
                        onChange={(text) => setPhone(text.target.value)}
                        required
                    />
                </div>
                <div className='input'>
                    <label htmlFor="name">Заметка</label>
                    <textarea
                        placeholder='Напиши свои пожелания'
                        id="note"
                        type="text"
                        maxLength='450'
                        onChange={(text) => setNote(text.target.value)}
                    // required
                    />
                </div>
                <Button text='ОТПРАВИТЬ' />
            </FormWrap>

            <ModalLayer isModal={isModal}>
                <Modal isModal={isModal} setModal={setModal} />
            </ModalLayer>

        </MainLayer>
    )
}

export async function getServerSideProps() {
    dbConnect();
    const abilities = JSON.parse(JSON.stringify(await Abilities.find({})));

    return {
        props: {
            data: abilities,
        }
    }
}