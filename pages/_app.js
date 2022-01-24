import '../styles/scss/style.scss';
import { wrapper } from '../store';
import Layout from '../components/Layout';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
          />
          <Script id="analytics-script">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
              `}
          </Script>
        </>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
