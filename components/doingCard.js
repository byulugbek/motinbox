import styled, { css } from 'styled-components'
import Button from './button'
import Link from 'next/link'

const Card_style = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    grid-template-areas: "title descript";
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
    @media only screen and (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        grid-template-rows: none;
        grid-template-areas: none;
        .title{
            grid-area: auto;
        }
        .descript{
            height:100%;
            grid-area: auto;
            grid-auto-flow: row;
        }
    }

`

export default function DoingCard(props) {
    const {data} = props;
    return(
        <>
            <Card_style>
                <div className='title'>{data.title}</div>
                <div className='descript'> <p>{data.descript}</p>
                    <Button text='ХОЧУ ЭТО'/>
                </div>
            </Card_style>
            <hr className='line'/>
        </>
    )
}