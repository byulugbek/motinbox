import styled, { css } from 'styled-components'
import Button from './button'

const Card_style = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    grid-template-areas:
    "title descript";
    gap: 20px;
    width: 100%;
    .title{
        grid-area: title;
        font-family: Bold;
        font-size: 24px;
    }
    .descript{
        height:100%;
        grid-area: descript;
        display: grid;
        gap: 20px;
        justify-content: space-between;
        grid-auto-flow: column;
    }

`

export default function DoingCard(props) {
    return(
    <Card_style>
        <div className='title'>{props.title}</div>
        <div className='descript'>
            <p>{props.descript}</p>
            <Button 
                text='ХОЧУ ЭТО'
            />
        </div>
    </Card_style>
    )
}