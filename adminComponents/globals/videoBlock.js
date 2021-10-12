import styled from "styled-components";
import Button from "../../components/button";
import Link from "next/link";
import { Edit } from '../../components/icons';

const VideoBlock_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 30px;
    padding: 50px;
    max-width: 1000px;
    border-radius: 40px;
    border: 1px solid var(--black20);

    .title {
        height: 40px;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        align-items: center;
        span {
            font-family: Bold;
            font-size: 24px;
        }
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
        span{
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
            span{
                grid-area: auto;
            }
            .descript{
                height:100%;
                grid-area: auto;
                grid-auto-flow: row;
            }
        }
    }
`

export default function VideoBlock(props) {
    const {
        title,
        data,
    } = props;

    return (
        <VideoBlock_style>
            <div className='title'>
                <span>
                    {title}
                </span>
                <Link href={`#`}>
                    <button>
                        <Edit fill={'#000'} />
                    </button>
                </Link>
            </div>
            <hr className='line' />
            <div className='item'>
                <span>
                    {data.name}
                </span>
                <div className='descript'>
                    <p>
                        {data.description}
                    </p>
                    <a href='https://google.com' target='_blank'>
                        <Button
                            text='Видео'
                        />
                    </a>
                </div>
            </div>
            <hr className='line' />
        </VideoBlock_style>
    )
}
