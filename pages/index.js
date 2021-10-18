import Head from 'next/head'
import MainLayer from '../components/mainLayer'
import HomePage from '../components/home'
export default function Index({ main, abilities }) {

    return (
        <MainLayer>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage data={{ main: main.data, abilities: abilities.data }} />
        </MainLayer>
    )
}

Index.getInitialProps = async () => {
    const mainRes = await fetch(`http://localhost:3000/api/main`);
    const main = await mainRes.json();

    const abilitiesRes = await fetch(`http://localhost:3000/api/abilities`);
    const abilities = await abilitiesRes.json();

    return {
        main, abilities
    }
}