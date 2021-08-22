import styled from 'styled-components'

const Button_style = styled.button`
    border-radius: 100px;
    padding: 0 20px;
    height: 40px;
    font-family: Medium;
    font-size: 16px;
    transition: 0.3s;
    color: var(--white100);
    background-color: var(--black100);
    :hover{
        background-color: var(--black50); 
    }

`

export default function Button(props) {
    return (
        <Button_style>
            {props.text}
        </Button_style> 
    )
};