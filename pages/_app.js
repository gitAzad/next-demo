import Router from 'next/router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import Pages from '../components/Pages';

Router.events.on('routeChangeStart', () => {
  Nprogress.start();
});
Router.events.on('routeChangeComplete', () => {
  Nprogress.done();
});
Router.events.on('routeChangeError', () => {
  Nprogress.done();
});

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Pages>
        <Component {...pageProps} />
      </Pages>
    </>
  );
}

export default MyApp;
