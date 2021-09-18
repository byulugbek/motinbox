import Head from 'next/head'
import MainLayer from '../components/mainLayer'
import HomePage from '../components/home'
export default function Index() {
    return (
        <MainLayer>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage />
        </MainLayer>
    )
}