import styled, { css } from 'styled-components';

const Button_style = styled.button`
    height: 40px;
    padding: 0 20px;
    width: fit-content;
    border-radius: 100px;
    transition: 0.5s;
    white-space: nowrap;
    color: var(--white100);
    background-color: var(--black100);
    :hover{
        transform: scale(1.1);
        background-color: var(--black50); 
    }
    ${props => props.lite && css`
        color: var(--black100);
        background-color: var(--white100);
        :hover{
            background-color: var(--white50); 
        } 
    `}
    @media only screen and (max-width: 500px) {
        :hover{
            transform: scale(1);
            background-color: var(--black100); 
        }
        :active{
            transform: scale(1.1);
            background-color: var(--black50);  
        }
        ${props => props.lite && css`
            :hover{
                background-color: var(--white100); 
            } 
        `}
    }
`

export default function Button(props) {
    return (
        <Button_style {...props}>
            <p>
                {props.text}
            </p>
        </Button_style>
    )
};