import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
        <NextNProgress
            color="#fc1100"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            showOnShallow={true}
        />
        <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=G-SV7L62HNPZ`} />
        <Script id="google-analytics" strategy='lazyOnload'>
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
            
                gtag('config', 'G-SV7L62HNPZ');
            `}
        </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
