import styled from "styled-components";
import AHeader from '../adminComponents/aHeader';

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 50px;
    justify-items: center;
    @media only screen and (max-width: 1000px) {
        padding: 0 30px; 
    }
    @media only screen and (max-width: 500px) {
        gap: 20px;
        padding: 0 16px; 
    }
`

const Cert = styled.p`
    width: 100%;
    text-align: center;
    color: var(--black50);
    padding: 0 30px 30px;
    @media only screen and (max-width: 500px) {
        padding: 0 20px 20px; 
        font-size: 14px;
    }
`

export default function AdminLayer({ children }) {
    return (
        <div className='wrapper'>
            <AHeader />
            <Wrap>
                {children}
            </Wrap>
            <Cert>ВСЕ ПРАВА ЗАЩИЩЕНЫ © MOTION BOX / 2021</Cert>
        </div>
    )
}
