import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import Content from './content'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='wrapper'>
          <Header/>
          <Content/>
          <Footer/>
      </div>
    </>
  )
}
