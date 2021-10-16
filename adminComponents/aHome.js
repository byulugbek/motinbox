import styled from 'styled-components';
import Table from './Table';

const Container_style = styled.div`
    display: grid;
    width: 100%;
    max-width: 1000px;
    display: grid;
    grid-auto-flow: row;
    gap: 30px;
`

export default function AHome(props) {
    const { data } = props.data;
    const { projects, portfolio } = data;

    return (
        <Container_style>
            <Table
                title={'Проекты на главной'}
                data={projects}
                linkParam={'projects'}
            />
            <Table
                title={'Портфолио на главной'}
                data={portfolio}
                linkParam={'abilities'}
            />
        </Container_style>
    )
}
