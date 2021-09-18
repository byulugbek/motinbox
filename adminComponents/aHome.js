import styled from 'styled-components';
import Table from './Table';

const Container_style = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 30px;
`

const data = [
    {
        _id: 0,
        title: 'Мобильное приложение',
        description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
    },
    {
        _id: 1,
        title: 'Мобильное приложение',
        description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
    },
    {
        _id: 2,
        title: 'Мобильное приложение',
        description: 'Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
    }
]

export default function AHome() {
    return (
        <Container_style>
            <Table
                title={'Проекты на главной'}
                data={data}
                linkParam={'projects'}
            />
            <Table
                title={'Способности на главной'}
                data={data}
                linkParam={'abilities'}
            />
            <Table
                title={'Портфолио на главной'}
                data={data}
                linkParam={'portfolio'}
            />
        </Container_style>
    )
}
