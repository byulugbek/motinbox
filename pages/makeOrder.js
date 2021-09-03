import styled from "styled-components";
import Button from "../components/button";
import MainLayer from "./mainLayer";

const FormWrap = styled.div`
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
        font-family: Bold;
        font-size: 24px;
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
            font-size: 16px;
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
            display: grid;
            height: 50px;
            border-radius: 10px;
            border: 0;
            background-color: var(--black05);
        }
        input{
            padding: 10px;
            height: 50px;
            border-radius: 10px;
            border: 0;
            font-size: 16px;
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

const Input = styled.div`

`

export default function MakeOrder() {
    return (
        <MainLayer>
            <FormWrap>
                    <p className='theme'>Выбери нужную услугу</p>

                    <div className='input'>
                        <label htmlFor="name">Выбранные услуги</label>
                        <div className='selected'>
                            
                        </div> 
                    </div>
                    <div className='input'>
                        <label htmlFor="name">Какая организация</label>
                        <input placeholder='Например, OOO "MOTION BOX"' id="organization" type="text" autoComplete="name" required /> 
                    </div>
                    <div className='input'>
                        <label htmlFor="name">Твое имя</label>
                        <input placeholder='Например, Улугбек Алимов' id="name" type="text" autoComplete="name" required  /> 
                    </div>
                    <div className='input'>
                        <label htmlFor="name">Заметка</label>
                        <textarea placeholder='Напиши свои пожелания' id="note" type="text" maxLength='450' /> 
                    </div>
                    <Button text='ОТПРАВИТЬ'/>
            </FormWrap>
            
        </MainLayer>
    )
}
