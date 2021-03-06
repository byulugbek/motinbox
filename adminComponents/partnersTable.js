import styled from 'styled-components';
import Link from 'next/link';
import Button from '../components/button';
import { Edit, Plus, Trash } from '../components/icons';

const Container = styled.div`
display: grid;
    grid-auto-flow: row;
    width: 100%;
    max-width: 1000px;
    gap: 30px;
    padding: 50px;
    border-radius: 40px;
    border: 1px solid var(--black20);
    @media only screen and (max-width: 700px) {
        padding: 30px;
    }

    .title {
        height: 40px;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        align-items: center;
        span {
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
                max-height: 150px;
                overflow: hidden;
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
            span{
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

export default function PartnersTable(props) {
    const { data, onDelete } = props;


    const mapItems = data.map(item => {
        return (
            <div key={item._id}>
                <div className='item'>
                    <h2>
                        {item.title}
                    </h2>
                    <div className='descript'>
                        <div>
                            <p className='text'>
                                {`??????????????: ${item.queue}`}
                            </p>
                            <p className='text'>
                                {`????????????: ${item.url}`}
                            </p>
                        </div>
                        <Link href={`/admin/others/partners/edit/${item._id}`}>
                            <a className='button1'>
                                <Button
                                    text={<Edit fill={'#fff'} />}
                                />
                            </a>
                        </Link>
                        <Button
                            className='button2'
                            text={<Trash />}
                            onClick={() => onDelete && onDelete(item._id)}
                        />
                    </div>
                </div>
                <hr className='line' />
            </div>
        )
    })

    return (
        <Container>
            <div className='title'>
                <h2>
                    ???????? ????????????????
                </h2>
                <Link href={`/admin/others/partners/new`}>
                    <button aria-label="ADD_NEW_PARTNER">
                        <Plus fill={'#000'} />
                    </button>
                </Link>
            </div>
            <hr className='line' />
            {mapItems}
        </Container>
    )
}
