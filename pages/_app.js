import '../styles/globals.css';
import Head from 'next/head';
import { AnimatePresence } from "framer-motion";
import Script from 'next/script';

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALITICS}`}
      />
      <Script strategy='lazyOnload'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', '${process.env.GOOGLE_ANALITICS}');
      `}
      </Script>

      <Script strategy='lazyOnload'>
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
       
          ym(${process.env.YANDEX_METRICA}, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true
          });
        `}
      </Script>
      <noscript><div><img src={`https://mc.yandex.ru/watch/${process.env.YANDEX_METRICA}`} style={{ position: 'absolute', left: -9999 }} alt="" /></div></noscript>

      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0 })
          }
        }}
      >
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
