import styled from "styled-components";

const ImageImporter_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 5px;

    span {
        color: var(--black50);
    }

    input {
        color: var(--black50);
    }
    input[type=file]::file-selector-button {
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        padding: 0 20px;
        outline: none;
        background-color: var(--black100);
        color: white;
        border: none;
    }
`


export default function ImageImporter(props) {
    const { title, setContent } = props;
    return (
        <ImageImporter_style>
            <span>{title}</span>
            <input
                type='file'
                onChange={item => setContent(item.target.value)}
            />
        </ImageImporter_style>
    )
}
