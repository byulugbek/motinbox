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
    const { data } = props;
    return (
        <>
            <Card_style>
                <h2 className='title'>{data?.title}</h2>
                <div className='descript'>
                    <p>{data?.description}</p>
                    <Link href='/makeOrder'>
                        <a>
                            <Button text='ХОЧУ ЭТО' />
                        </a>
                    </Link>
                </div>
            </Card_style>
            <hr className='line' />
        </>
    )
}