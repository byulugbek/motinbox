import styled from 'styled-components'
import Button from './button'
import { Logo } from './icons'

const Header_style = styled.div`
    display:flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 30px;
    .headerBox{
        display: grid;
        grid-auto-flow: column;
        width: 100%;
        height: 60px;
        background-color: var(--white50);
        color: var(--black100);
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 10px 20px;
        border-radius: 100px;
        box-shadow: var(--shadow);
        backdrop-filter: blur(30px);
        margin: 0 100px;
        .navigation{
            display: grid;
            grid-auto-flow: column;
            gap: 60px;
        }
    }
`

export default function Header() {
    return (
        <Header_style>
            <div className='headerBox'>
                
                <Logo fill='#000'/>

                <div className='navigation'>
                    <a className='navigationItem'>Кто мы такие</a>
                    <a className='navigationItem'>Наши проекты</a>
                    <a className='navigationItem'>Портфолио</a>
                </div>

                <Button
                    text='БЫТЬ С НАМИ'
                />
                
            </div>                
        </Header_style> 
    )
};