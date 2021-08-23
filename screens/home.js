import styled from 'styled-components'
import Card from '../components/card'
import Title from '../components/title'
import DoingCard from '../components/doingCard'
import { Logo } from '../components/icons'

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`
const Portfolio = styled(Projects)`
    grid-template-columns: repeat(3, 1fr);
`
const CanDo = styled(Projects)`
    grid-template-columns: 1fr;
    gap: 30px;
    .line{
        width:100%;
        height: 0.5px;
        border-width: 0;
        background-color: var(--black20);
    }
`
const InHeard = styled(Projects)`
    grid-template-columns: repeat(4, 1fr);
    .heardItem{
        display: grid;
        justify-content: center;
        align-items: center;
        padding: 50px 0;
    }
`

export default function HomePage() {
    return (
        <>
            <Projects>
                <Card 
                    img='cardPhoto.png'
                    theme='Мобильное приложение'
                    title='Мы создали выставку "DOSTUP" для МТС.'
                    descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card
                    img='cardPhoto.png' 
                    theme='Мобильное приложение'
                    title='Мы создали выставку "DOSTUP" для МТС.'
                    descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card 
                    img='cardPhoto.png'
                    theme='Мобильное приложение'
                    title='Мы создали выставку "DOSTUP" для МТС.'
                    descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card
                    img='cardPhoto.png'
                    theme='Мобильное приложение'
                    title='Мы создали выставку "DOSTUP" для МТС.'
                    descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
            </Projects>
            <Title text='ЧТО МЫ МОЖЕМ СОТВОРИТЬ'/>
            <CanDo>
                <hr className='line'/>
                <DoingCard 
                    title='Мобильное приложение'
                    descript='Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
                />
                <hr className='line'/>
                <DoingCard 
                    title='Мобильное приложение'
                    descript='Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
                />
                <hr className='line'/>
                <DoingCard 
                    title='Мобильное приложение'
                    descript='Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
                />
                <hr className='line'/>
                <DoingCard 
                    title='Мобильное приложение'
                    descript='Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
                />
                <hr className='line'/>
                <DoingCard 
                    title='Мобильное приложение'
                    descript='Агентство для неробких! Мы создали команду с чувством захватывающей неопределённости и с наивным романтическим задором.'
                />
                <hr className='line'/>
                
            </CanDo>
            <Title text='В НАШИХ СЕРДЦАХ'/>
            <InHeard>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>
                <a className='heardItem'><Logo fill='#000'/></a>

            </InHeard>
            <Title text='ПОСЛЕДНИЕ РАБОТЫ'/>
            <Portfolio>
                <Card portfolio 
                img='cardPhoto2.webp'
                theme='Мобильное приложение'
                title='Мы создали выставку "DOSTUP" для МТС.'
                descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card portfolio 
                img='cardPhoto2.webp'
                theme='Мобильное приложение'
                title='Мы создали выставку "DOSTUP" для МТС.'
                descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card portfolio 
                img='cardPhoto2.webp'
                theme='Мобильное приложение'
                title='Мы создали выставку "DOSTUP" для МТС.'
                descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card portfolio 
                img='cardPhoto2.webp'
                theme='Мобильное приложение'
                title='Мы создали выставку "DOSTUP" для МТС.'
                descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card portfolio 
                img='cardPhoto2.webp'
                theme='Мобильное приложение'
                title='Мы создали выставку "DOSTUP" для МТС.'
                descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
                <Card portfolio 
                img='cardPhoto2.webp'
                theme='Мобильное приложение'
                title='Мы создали выставку "DOSTUP" для МТС.'
                descript='В мае 2019 года Scazy был приглашен в Лондон в качестве специального гостя на презентацию нового сотрудничества коньячного дома Rémy Martin'
                />
            </Portfolio>    
        </>
    )
};