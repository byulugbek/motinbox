import styled, { css } from 'styled-components'

const Button_style = styled.button`
    font-family: Medium;
    font-size: 16px;
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
`

export default function Button(props) {
    return (
        <Button_style {...props}>
            {props.text}
        </Button_style> 
    )
};